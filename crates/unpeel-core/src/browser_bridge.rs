//! Browser bridge: lets the Agentation overlay that the project browser
//! injects into every page (`clients/browser-overlay`) list the user's open
//! Sessions and paste feedback into the one they pick.
//!
//! - The machine `unpeel serve` supervisor serves it on loopback
//!   (`crates/unpeel-serve/src/browser_bridge_listener.rs`), so one endpoint
//!   covers every local workspace and survives worker restarts.
//! - `~/.unpeel/browser/bridge.json` (0600) holds `{port, token}`. The port
//!   and token are reused across supervisor restarts so an already-open
//!   browser keeps working.
//! - The project browser bakes `{port, token, projectId, projectName, home}`
//!   into its page init script; the overlay keeps the token in a closure.
//! - A send is a user action from the browser: it is pasted (bracketed
//!   paste, never Enter), the same as the user pasting into that terminal.

use std::io::{BufRead, BufReader, Write};
use std::os::unix::net::UnixStream;
use std::path::{Path, PathBuf};
use std::time::Duration;

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

use crate::app_paths;
use crate::session_host::{HostedSessionManifest, HostedSessionState, SessionHostCommand};
use crate::session_input;

/// First choice for the bridge port (any free port is used when taken).
pub const PREFERRED_PORT: u16 = 47_801;
/// Largest feedback text a send accepts (Agentation output is a few KB).
pub const MAX_TEXT_BYTES: usize = 256 * 1024;
/// The overlay bundle, built by `clients/browser-overlay` (`npm run build`).
pub const OVERLAY_BUNDLE: &str = include_str!("../assets/browser/agentation-overlay.js");

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct BridgeConfig {
    pub port: u16,
    pub token: String,
}

pub fn config_path() -> PathBuf {
    app_paths::real_unpeel_home().join("browser").join("bridge.json")
}

pub fn read_config() -> Option<BridgeConfig> {
    let text = std::fs::read_to_string(config_path()).ok()?;
    let config: BridgeConfig = serde_json::from_str(&text).ok()?;
    (config.port != 0 && config.token.len() >= 32).then_some(config)
}

pub fn write_config(config: &BridgeConfig) -> std::io::Result<()> {
    use std::os::unix::fs::OpenOptionsExt;
    let path = config_path();
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent)?;
    }
    let tmp = path.with_extension(format!("json.{}.tmp", std::process::id()));
    let mut file = std::fs::OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .mode(0o600)
        .open(&tmp)?;
    file.write_all(serde_json::to_string(config)?.as_bytes())?;
    file.sync_all()?;
    std::fs::rename(&tmp, &path)
}

pub fn new_token() -> String {
    format!(
        "{}{}",
        uuid::Uuid::new_v4().simple(),
        uuid::Uuid::new_v4().simple()
    )
}

/// Constant-time token comparison.
fn token_matches(expected: &str, given: &str) -> bool {
    expected.len() == given.len()
        && expected
            .bytes()
            .zip(given.bytes())
            .fold(0u8, |acc, (a, b)| acc | (a ^ b))
            == 0
}

// MARK: - Workspaces and sessions

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct WorkspaceHome {
    pub name: String,
    pub home: PathBuf,
}

/// The machine home plus every registered workspace home.
pub fn workspace_homes() -> Vec<WorkspaceHome> {
    let real = app_paths::real_unpeel_home();
    let mut homes = vec![WorkspaceHome {
        name: crate::host_name::machine_display_name(),
        home: real.clone(),
    }];
    for record in app_paths::read_workspace_registry(&real) {
        if homes.iter().any(|known| same_path(&known.home, &record.home)) {
            continue;
        }
        homes.push(WorkspaceHome {
            name: record.name,
            home: record.home,
        });
    }
    homes
}

fn same_path(a: &Path, b: &Path) -> bool {
    let canon = |p: &Path| std::fs::canonicalize(p).unwrap_or_else(|_| p.to_path_buf());
    canon(a) == canon(b)
}

fn valid_session_id(id: &str) -> bool {
    !id.is_empty()
        && id.len() <= 128
        && id
            .bytes()
            .all(|b| b.is_ascii_alphanumeric() || b == b'-' || b == b'_')
}

/// Same rule as `session_host::socket_path`, for an explicit home.
fn socket_path_at(home: &Path, session_id: &str) -> PathBuf {
    let preferred = home
        .join("app-sessions")
        .join(session_id)
        .join("session.sock");
    if preferred.as_os_str().len() <= 100 {
        return preferred;
    }
    let uid = unsafe { libc::getuid() };
    PathBuf::from("/tmp")
        .join(format!("unpeel-{uid}"))
        .join(format!("{session_id}.sock"))
}

fn process_alive(pid: u32) -> bool {
    pid > 0 && unsafe { libc::kill(pid as libc::pid_t, 0) } == 0
}

#[derive(Debug, Clone, Default)]
struct ProjectInfo {
    id: String,
    name: String,
    parent: Option<String>,
}

fn projects_at(home: &Path) -> Vec<ProjectInfo> {
    let Ok(text) = std::fs::read_to_string(home.join("app-state.json")) else {
        return Vec::new();
    };
    let Ok(state) = serde_json::from_str::<Value>(&text) else {
        return Vec::new();
    };
    state
        .get("projects")
        .and_then(Value::as_array)
        .map(|projects| {
            projects
                .iter()
                .filter_map(|p| {
                    Some(ProjectInfo {
                        id: p.get("id")?.as_str()?.to_owned(),
                        name: p.get("name").and_then(Value::as_str).unwrap_or("").to_owned(),
                        parent: p
                            .get("parent_project_id")
                            .and_then(Value::as_str)
                            .filter(|s| !s.is_empty())
                            .map(str::to_owned),
                    })
                })
                .collect()
        })
        .unwrap_or_default()
}

fn root_project<'a>(projects: &'a [ProjectInfo], id: &str) -> Option<&'a ProjectInfo> {
    let mut current = projects.iter().find(|p| p.id == id)?;
    for _ in 0..16 {
        match current
            .parent
            .as_deref()
            .and_then(|parent| projects.iter().find(|p| p.id == parent))
        {
            Some(parent) => current = parent,
            None => break,
        }
    }
    Some(current)
}

/// One open (running) Session, as the overlay's picker shows it.
#[derive(Debug, Clone, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OpenSession {
    pub id: String,
    pub title: String,
    pub project: String,
    pub workspace: String,
    pub home: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub agent: Option<String>,
    pub in_this_project: bool,
    #[serde(skip)]
    pub created_at: u64,
}

fn title_for(manifest: &HostedSessionManifest) -> String {
    let label = manifest.session.label.trim();
    if !label.is_empty() {
        return label.to_owned();
    }
    let command = manifest.session.command.trim();
    if !command.is_empty() {
        return command.split_whitespace().next().unwrap_or(command).to_owned();
    }
    manifest.session.id.chars().take(8).collect()
}

/// Running Sessions in one home. `browser_root` is the browser's own root
/// project id when `home` is the browser's workspace.
fn open_sessions_at(
    workspace: &WorkspaceHome,
    browser_root: Option<&str>,
) -> Vec<OpenSession> {
    let projects = projects_at(&workspace.home);
    let Ok(entries) = std::fs::read_dir(workspace.home.join("app-sessions")) else {
        return Vec::new();
    };
    let mut sessions = Vec::new();
    for entry in entries.flatten() {
        let Ok(text) = std::fs::read_to_string(entry.path().join("manifest.json")) else {
            continue;
        };
        let Ok(manifest) = serde_json::from_str::<HostedSessionManifest>(&text) else {
            continue;
        };
        if manifest.state != HostedSessionState::Running
            || !valid_session_id(&manifest.session.id)
        {
            continue;
        }
        let alive = manifest
            .pid
            .or(manifest.host_pid)
            .is_some_and(process_alive);
        if !alive {
            continue;
        }
        let root = root_project(&projects, &manifest.session.project_id);
        let in_this_project = match (browser_root, root) {
            (Some(browser_root), Some(root)) => root.id == browser_root,
            _ => false,
        };
        sessions.push(OpenSession {
            id: manifest.session.id.clone(),
            title: title_for(&manifest),
            project: projects
                .iter()
                .find(|p| p.id == manifest.session.project_id)
                .map(|p| p.name.clone())
                .unwrap_or_default(),
            workspace: workspace.name.clone(),
            home: workspace.home.to_string_lossy().into_owned(),
            agent: crate::session_host::active_runtime_id(&manifest).map(str::to_owned),
            in_this_project,
            created_at: manifest.session.created_at,
        });
    }
    sessions
}

/// Every open Session across all local workspaces, newest first.
pub fn open_sessions(browser_home: Option<&Path>, browser_project: Option<&str>) -> Vec<OpenSession> {
    let mut all = Vec::new();
    for workspace in workspace_homes() {
        let is_browser_home = browser_home.is_some_and(|home| same_path(home, &workspace.home));
        let root = if is_browser_home { browser_project } else { None };
        all.extend(open_sessions_at(&workspace, root));
    }
    all.sort_by_key(|s| std::cmp::Reverse(s.created_at));
    all
}

/// Paste `text` into a running Session in `home` (no Enter).
pub fn paste(home: &Path, session_id: &str, text: &str) -> Result<(), String> {
    if !valid_session_id(session_id) {
        return Err("invalid session".into());
    }
    if !workspace_homes().iter().any(|w| same_path(&w.home, home)) {
        return Err("unknown workspace".into());
    }
    let sanitized = session_input::sanitize_paste_text(text);
    if sanitized.trim().is_empty() {
        return Err("nothing to send".into());
    }
    let socket = socket_path_at(home, session_id);
    write_session(&socket, &session_input::encode_bracketed_paste(&sanitized))?;
    // Submit like `deliver_prompt`: let the TUI settle the paste, press
    // Enter, then once more in case the first was absorbed by the paste.
    let settle = if session_input::looks_like_it_contains_a_path(&sanitized) {
        session_input::TEXT_SETTLE_DELAY_PATH_MS
    } else {
        session_input::TEXT_SETTLE_DELAY_MS
    };
    std::thread::sleep(Duration::from_millis(settle));
    write_session(&socket, "\r")?;
    std::thread::sleep(Duration::from_millis(session_input::ENTER_FOLLOWUP_DELAY_MS));
    write_session(&socket, "\r")
}

/// One `Write` over a Session's control socket (path built for its own home).
fn write_session(socket: &Path, data: &str) -> Result<(), String> {
    let command = SessionHostCommand::Write { data: data.to_owned(), write_id: None };
    let line = serde_json::to_string(&command).map_err(|e| e.to_string())?;
    let mut stream = UnixStream::connect(socket)
        .map_err(|_| "that session isn't running anymore".to_owned())?;
    let timeout = Some(Duration::from_secs(3));
    let _ = stream.set_read_timeout(timeout);
    let _ = stream.set_write_timeout(timeout);
    stream
        .write_all(format!("{line}\n").as_bytes())
        .map_err(|e| format!("send failed: {e}"))?;
    let mut reply = String::new();
    BufReader::new(&stream)
        .read_line(&mut reply)
        .map_err(|e| format!("no reply from session: {e}"))?;
    let reply: Value = serde_json::from_str(reply.trim()).unwrap_or(Value::Null);
    if reply.get("ok").and_then(Value::as_bool) == Some(true) {
        Ok(())
    } else {
        Err(reply
            .get("error")
            .and_then(Value::as_str)
            .unwrap_or("the session refused the message")
            .to_owned())
    }
}

// MARK: - HTTP handlers (routing lives with the listener)

/// Handle one bridge request body. Returns `(status, json)`.
pub fn handle(path: &str, body: &[u8], config: &BridgeConfig) -> (u16, Value) {
    let request: Value = serde_json::from_slice(body).unwrap_or(Value::Null);
    let field = |key: &str| request.get(key).and_then(Value::as_str).unwrap_or("");
    if !token_matches(&config.token, field("token")) {
        return (401, json!({ "error": "unauthorized" }));
    }
    match path {
        "/browser-bridge/sessions" => {
            let home = Some(field("home")).filter(|h| !h.is_empty()).map(PathBuf::from);
            let project = Some(field("projectId")).filter(|p| !p.is_empty());
            let sessions = open_sessions(home.as_deref(), project);
            (200, json!({ "sessions": sessions }))
        }
        "/browser-bridge/send" => {
            let text = field("text");
            if text.len() > MAX_TEXT_BYTES {
                return (413, json!({ "error": "feedback is too long" }));
            }
            match paste(Path::new(field("home")), field("sessionId"), text) {
                Ok(()) => (200, json!({ "ok": true })),
                Err(error) => (409, json!({ "error": error })),
            }
        }
        _ => (404, json!({ "error": "not found" })),
    }
}

// MARK: - Page init script

/// Opt-out: `UNPEEL_BROWSER_AGENTATION=0`.
pub fn overlay_enabled() -> bool {
    std::env::var("UNPEEL_BROWSER_AGENTATION").map_or(true, |v| v != "0")
}

/// Write the project browser's page init script (bundle wrapped with its
/// bridge config) into `dir` and return its path. None while the bridge
/// has never run or the overlay is disabled.
pub fn write_init_script(dir: &Path, project_id: &str) -> Option<PathBuf> {
    if !overlay_enabled() {
        return None;
    }
    let config = read_config()?;
    let home = app_paths::unpeel_home();
    let projects = projects_at(&home);
    let root = root_project(&projects, project_id);
    let bridge = json!({
        "port": config.port,
        "token": config.token,
        "projectId": root.map(|p| p.id.as_str()).unwrap_or(project_id),
        "projectName": root.map(|p| p.name.as_str()).unwrap_or(""),
        "home": home.to_string_lossy(),
    });
    let script = format!(
        "(function(){{const UNPEEL_BRIDGE={bridge};\n{OVERLAY_BUNDLE}\n}})();\n"
    );
    std::fs::create_dir_all(dir).ok()?;
    let path = dir.join("agentation-init.js");
    let current = std::fs::read_to_string(&path).ok();
    if current.as_deref() != Some(script.as_str()) {
        use std::os::unix::fs::PermissionsExt;
        std::fs::write(&path, &script).ok()?;
        let _ = std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o600));
    }
    Some(path)
}

/// Chrome flags the overlay needs: let pages reach the loopback bridge
/// without Chrome's per-site "local network access" prompt.
pub const CHROME_ARGS: &str = "--disable-features=LocalNetworkAccessChecks";

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn token_compare_is_exact() {
        assert!(token_matches("abc", "abc"));
        assert!(!token_matches("abc", "abd"));
        assert!(!token_matches("abc", "ab"));
        assert!(!token_matches("abc", ""));
    }

    #[test]
    fn session_ids_reject_paths() {
        assert!(valid_session_id("0a1b-2c_3"));
        for bad in ["", "../x", "a/b", "a b", r"a\b"] {
            assert!(!valid_session_id(bad), "{bad:?}");
        }
    }

    #[test]
    fn socket_path_uses_home_and_short_fallback() {
        let short = socket_path_at(Path::new("/h"), "s1");
        assert_eq!(short, PathBuf::from("/h/app-sessions/s1/session.sock"));
        let deep = "/x".repeat(60);
        let long = socket_path_at(Path::new(&deep), "s1");
        assert!(long.starts_with("/tmp"));
        assert!(long.ends_with("s1.sock"));
    }

    #[test]
    fn unauthorized_requests_are_refused() {
        let config = BridgeConfig { port: 1, token: "t".repeat(64) };
        let (status, _) = handle("/browser-bridge/sessions", br#"{"token":"nope"}"#, &config);
        assert_eq!(status, 401);
        let (status, _) = handle("/browser-bridge/send", b"not json", &config);
        assert_eq!(status, 401);
    }

    #[test]
    fn root_project_walks_parents() {
        let projects = vec![
            ProjectInfo { id: "root".into(), name: "App".into(), parent: None },
            ProjectInfo { id: "child".into(), name: "wt".into(), parent: Some("root".into()) },
        ];
        assert_eq!(root_project(&projects, "child").map(|p| p.id.as_str()), Some("root"));
        assert!(root_project(&projects, "missing").is_none());
    }

    #[test]
    fn init_script_wraps_bundle_in_a_closure() {
        // Without a bridge config there is nothing to point the overlay at.
        assert!(OVERLAY_BUNDLE.len() > 1000);
        let wrapped = format!("(function(){{const UNPEEL_BRIDGE={{}};\n{OVERLAY_BUNDLE}\n}})();\n");
        assert!(wrapped.starts_with("(function(){const UNPEEL_BRIDGE="));
    }
}
