use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

pub const APP_APPROVALS: &str = "computer_app_approvals";
const DESKTOP: &str = "@desktop";

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct AppTarget {
    pub name: String,
    pub bundle_id: String,
    pub pid: Option<i32>,
}

impl AppTarget {
    pub(super) fn is_valid(&self) -> bool {
        !self.name.is_empty()
            && self.name.len() <= 512
            && !self.bundle_id.is_empty()
            && self.bundle_id.len() <= 255
            && self
                .bundle_id
                .bytes()
                .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'-' | b'_'))
            && self.pid.is_none_or(|pid| pid > 0)
    }
}

#[derive(Debug, PartialEq, Eq)]
enum Tier {
    Read,
    Click,
    Full,
}

fn app_tier(bundle_id: &str) -> Tier {
    let id = bundle_id.to_ascii_lowercase();
    match id.as_str() {
        "com.apple.safari"
        | "com.apple.safaritechnologypreview"
        | "company.thebrowser.browser"
        | "company.thebrowser.browser.beta"
        | "company.thebrowser.arc"
        | "org.mozilla.firefoxdeveloperedition"
        | "org.mozilla.nightly"
        | "org.mozilla.nightlydebug" => Tier::Read,
        "com.apple.terminal"
        | "com.googlecode.iterm2"
        | "com.mitchellh.ghostty"
        | "com.todesktop.230313mzl4w4u92"
        | "co.anysphere.cursor.nightly"
        | "com.apple.dt.xcode"
        | "com.apple.dt.xcode-beta"
        | "com.visualstudio.code.oss"
        | "com.microsoft.vscodeinsiders" => Tier::Click,
        _ if family(&id, "com.google.chrome")
            || family(&id, "org.mozilla.firefox")
            || family(&id, "com.microsoft.edgemac") =>
        {
            Tier::Read
        }
        _ if family(&id, "com.microsoft.vscode")
            || family(&id, "com.jetbrains")
            || family(&id, "com.unpeel.native") =>
        {
            Tier::Click
        }
        _ => Tier::Full,
    }
}

fn family(id: &str, root: &str) -> bool {
    id == root
        || id
            .strip_prefix(root)
            .is_some_and(|suffix| suffix.starts_with('.'))
}

pub(super) fn check_tier(action: &str, target: &AppTarget) -> Result<(), String> {
    match app_tier(&target.bundle_id) {
        Tier::Read => Err(format!(
            "{} is read-only in computer use. Use the Unpeel browser tool to interact with it.",
            target.name
        )),
        Tier::Click if !matches!(action, "left_click" | "scroll") => Err(format!(
            "Computer use only allows left-click and scroll in {}.",
            target.name
        )),
        Tier::Click | Tier::Full => Ok(()),
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Decision {
    Allow,
    Deny,
}

fn approval_key(target: Option<&AppTarget>) -> String {
    target.map_or_else(|| DESKTOP.into(), |app| app.bundle_id.to_ascii_lowercase())
}

pub(super) fn decision(
    state: &Value,
    session_id: &str,
    target: Option<&AppTarget>,
) -> Option<Decision> {
    match state[APP_APPROVALS][session_id][approval_key(target)].as_str() {
        Some("allow") => Some(Decision::Allow),
        Some("deny") => Some(Decision::Deny),
        _ if target.is_none()
            && state["computer_approvals"]
                .as_array()
                .is_some_and(|ids| ids.iter().any(|id| id.as_str() == Some(session_id))) =>
        {
            Some(Decision::Allow)
        }
        _ => None,
    }
}

pub(super) fn remember(
    state: &mut serde_json::Map<String, Value>,
    session_id: &str,
    target: Option<&AppTarget>,
    decision: Decision,
) -> Result<(), String> {
    let sessions = state
        .entry(APP_APPROVALS)
        .or_insert_with(|| json!({}))
        .as_object_mut()
        .ok_or("Invalid computer app approvals in app-state.json")?;
    let apps = sessions
        .entry(session_id)
        .or_insert_with(|| json!({}))
        .as_object_mut()
        .ok_or("Invalid computer session approvals in app-state.json")?;
    apps.insert(approval_key(target), json!(decision));
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn tier_covers_browsers_terminals_ides_and_both_unpeel_builds() {
        for id in [
            "com.apple.Safari",
            "com.google.Chrome",
            "company.thebrowser.Browser",
            "org.mozilla.firefox",
            "org.mozilla.firefoxdeveloperedition",
            "org.mozilla.nightly",
            "com.microsoft.edgemac",
            "com.google.Chrome.canary",
            "com.apple.SafariTechnologyPreview",
        ] {
            assert_eq!(app_tier(id), Tier::Read, "{id}");
        }
        for id in [
            "com.apple.Terminal",
            "com.googlecode.iterm2",
            "com.mitchellh.ghostty",
            "com.microsoft.VSCode",
            "com.microsoft.VSCodeInsiders",
            "com.todesktop.230313mzl4w4u92",
            "com.apple.dt.Xcode",
            "com.jetbrains.intellij",
            "com.jetbrains.pycharm",
            "com.unpeel.native",
            "com.unpeel.native.dev",
        ] {
            assert_eq!(app_tier(id), Tier::Click, "{id}");
        }
        for id in [
            "com.apple.Notes",
            "com.microsoft.VSCodeOther",
            "com.jetbrainsx.foo",
        ] {
            assert_eq!(app_tier(id), Tier::Full, "{id}");
        }
    }

    #[test]
    fn decisions_are_scoped_to_app_and_session_and_legacy_only_grants_desktop() {
        let notes = AppTarget {
            name: "Notes".into(),
            bundle_id: "com.apple.Notes".into(),
            pid: Some(1),
        };
        let mut mail = notes.clone();
        mail.bundle_id = "com.apple.mail".into();
        let mut state = json!({"computer_approvals": ["first"]});
        let root = state.as_object_mut().unwrap();
        remember(root, "first", Some(&notes), Decision::Allow).unwrap();
        remember(root, "first", Some(&mail), Decision::Deny).unwrap();
        assert_eq!(decision(&state, "first", None), Some(Decision::Allow));
        assert_eq!(
            decision(&state, "first", Some(&notes)),
            Some(Decision::Allow)
        );
        assert_eq!(decision(&state, "first", Some(&mail)), Some(Decision::Deny));
        assert_eq!(decision(&state, "other", Some(&notes)), None);
        let mut notes_relaunched = notes;
        notes_relaunched.bundle_id.make_ascii_lowercase();
        notes_relaunched.pid = Some(2);
        assert_eq!(
            decision(&state, "first", Some(&notes_relaunched)),
            Some(Decision::Allow)
        );
        assert_eq!(
            decision(
                &json!({"computer_approvals": ["first"]}),
                "first",
                Some(&mail)
            ),
            None
        );
    }
}
