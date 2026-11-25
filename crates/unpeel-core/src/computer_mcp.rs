//! Computer MCP validation and transport. The workspace Host owns access,
//! callback registration, and screenshot paths. The Mac app owns input and capture.

use std::os::unix::net::UnixStream;
use std::path::Path;
use std::sync::Mutex;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use base64::Engine;
use serde_json::{json, Map, Value};

use crate::session_host::{self, HostedSessionManifest, HostedSessionState};
use crate::state::ComputerAccess;
use crate::{app_paths, app_state, relay_wire, remote_stdio, session_artifacts};

pub const LOCAL_COMPUTER_PATH: &str = "/_unpeel/computer";
pub const PERFORM_OPERATION: &str = "computer.perform";
pub const STATUS_OPERATION: &str = "computer.status";

pub const OFF_MESSAGE: &str = "Computer use is turned off in Unpeel Settings ▸ Computer use";
const MAX_DURATION_SECS: f64 = 30.0;
// Leave room under the Host frame ceiling for JSON escaping and base64.
const MAX_TEXT_BYTES: usize = 60 * 1024;
const MAX_APP_NAME_BYTES: usize = 512;
const MAX_KEY_BYTES: usize = 128;
const HOST_TIMEOUT: Duration = Duration::from_secs(40);
// Base64 expands every three bytes to four. Bound the encoded MCP payload.
const MAX_INLINE_PNG_BYTES: usize = 1_500_000 / 4 * 3;
const PNG_SIGNATURE: &[u8] = b"\x89PNG\r\n\x1a\n";

const ACTIONS: &[(&str, &str)] = &[
    ("screenshot", "Capture the current display."),
    ("left_click", "Click at coordinate."),
    ("right_click", "Right-click at coordinate."),
    ("middle_click", "Middle-click at coordinate."),
    ("double_click", "Double-click at coordinate."),
    ("triple_click", "Triple-click at coordinate."),
    ("mouse_move", "Move to coordinate."),
    (
        "left_click_drag",
        "Drag from start_coordinate to coordinate.",
    ),
    (
        "left_mouse_down",
        "Press the left button at the current cursor position.",
    ),
    (
        "left_mouse_up",
        "Release the left button at the current cursor position.",
    ),
    ("type", "Type literal Unicode text."),
    (
        "key",
        "Press a key or a combo in text, such as Return or cmd+c.",
    ),
    (
        "hold_key",
        "Hold the key or combo in text for duration seconds.",
    ),
    (
        "scroll",
        "Scroll by scroll_amount ticks in scroll_direction. Optionally set coordinate.",
    ),
    ("wait", "Wait for duration seconds."),
    ("zoom", "Capture region at full resolution."),
    (
        "cursor_position",
        "Return the cursor position in screenshot pixels.",
    ),
    (
        "open_app",
        "Open or activate the app named in text, by name or bundle ID.",
    ),
    ("status", "Check Mac permissions and the frontmost app."),
    ("help", "List actions or describe one with help_for."),
];

pub(crate) fn tool_definition() -> Value {
    json!({
        "name": "computer",
        "description": "See and control the Mac desktop through Unpeel. Call help for action details, status for permissions, and screenshot for the current display.",
        "inputSchema": {
            "type": "object",
            "required": ["action"],
            "properties": {
                "action": {"type": "string", "enum": ACTIONS.iter().map(|(name, _)| name).collect::<Vec<_>>()},
                "coordinate": {"type": "array", "items": {"type": "integer", "minimum": 0}, "minItems": 2, "maxItems": 2},
                "start_coordinate": {"type": "array", "items": {"type": "integer", "minimum": 0}, "minItems": 2, "maxItems": 2},
                "text": {"type": "string"},
                "scroll_direction": {"type": "string", "enum": ["up", "down", "left", "right"]},
                "scroll_amount": {"type": "integer", "minimum": 1},
                "duration": {"type": "number", "exclusiveMinimum": 0, "maximum": MAX_DURATION_SECS},
                "region": {"type": "array", "items": {"type": "integer", "minimum": 0}, "minItems": 4, "maxItems": 4},
                "help_for": {"type": "string"}
            }
        }
    })
}

fn help(arguments: &Value) -> Result<String, String> {
    let actions = if let Some(value) = arguments.get("help_for") {
        let name = value.as_str().ok_or("'help_for' must be an action name")?;
        let index = ACTIONS
            .iter()
            .position(|(action, _)| *action == name)
            .ok_or_else(|| format!("Unknown computer action: {name}"))?;
        &ACTIONS[index..=index]
    } else {
        ACTIONS
    };
    let mut lines = vec![
        "Coordinates use the latest full screenshot's pixel space, with origin at the top left. Region is [x0, y0, x1, y1]. Wait and hold_key accept up to 30 seconds.".to_owned(),
    ];
    lines.extend(
        actions
            .iter()
            .map(|(name, description)| format!("{name}: {description}")),
    );
    Ok(lines.join("\n"))
}

fn action_name(arguments: &Value) -> Result<&str, String> {
    let name = arguments
        .get("action")
        .and_then(Value::as_str)
        .map(str::trim)
        .filter(|name| !name.is_empty())
        .ok_or("Computer requires an 'action'. Call with action 'help' for the list.")?;
    if !ACTIONS.iter().any(|(action, _)| *action == name) {
        return Err(format!(
            "Unknown computer action: {name}. Call with action 'help' for the list."
        ));
    }
    Ok(name)
}

/// Rebuild each command from its permitted fields. Unknown fields have no
/// effect, including session_id, operation, and screenshot_path.
fn validate_arguments(action: &str, arguments: &Value) -> Result<Value, String> {
    let mut request = Map::new();
    request.insert("action".into(), json!(action));
    match action {
        "left_click" | "right_click" | "middle_click" | "double_click" | "triple_click"
        | "mouse_move" => {
            request.insert(
                "coordinate".into(),
                json!(pixels::<2>(arguments, "coordinate")?),
            );
        }
        "left_click_drag" => {
            request.insert(
                "coordinate".into(),
                json!(pixels::<2>(arguments, "coordinate")?),
            );
            request.insert(
                "start_coordinate".into(),
                json!(pixels::<2>(arguments, "start_coordinate")?),
            );
        }
        "scroll" => {
            let direction = arguments
                .get("scroll_direction")
                .and_then(Value::as_str)
                .filter(|direction| matches!(*direction, "up" | "down" | "left" | "right"))
                .ok_or("'scroll_direction' must be up, down, left, or right")?;
            let amount = positive_integer(arguments, "scroll_amount")?;
            request.insert("scroll_direction".into(), json!(direction));
            request.insert("scroll_amount".into(), json!(amount));
            if arguments.get("coordinate").is_some() {
                request.insert(
                    "coordinate".into(),
                    json!(pixels::<2>(arguments, "coordinate")?),
                );
            }
        }
        "zoom" => {
            let [x0, y0, x1, y1] = pixels::<4>(arguments, "region")?;
            if x0 >= x1 || y0 >= y1 {
                return Err("'region' must have positive width and height".into());
            }
            request.insert("region".into(), json!([x0, y0, x1, y1]));
        }
        "type" => {
            request.insert(
                "text".into(),
                json!(required_text(arguments, MAX_TEXT_BYTES)?),
            );
        }
        "open_app" => {
            let app = required_text(arguments, MAX_APP_NAME_BYTES)?.trim();
            if app.is_empty() || app.chars().any(char::is_control) {
                return Err("'text' must contain an app name or bundle ID".into());
            }
            request.insert("text".into(), json!(app));
        }
        "key" | "hold_key" => {
            let keys = required_text(arguments, MAX_KEY_BYTES)?;
            if keys.split('+').any(|key| {
                key.is_empty()
                    || !key
                        .bytes()
                        .all(|byte| byte.is_ascii_alphanumeric() || byte == b'_')
            }) {
                return Err("'text' must contain an xdotool-style key or key combo".into());
            }
            request.insert("text".into(), json!(keys));
        }
        "screenshot" | "left_mouse_down" | "left_mouse_up" | "wait" | "cursor_position"
        | "status" => {}
        _ => return Err(format!("Unknown computer operation: {action}")),
    }
    if matches!(action, "wait" | "hold_key") {
        let duration = arguments
            .get("duration")
            .and_then(Value::as_f64)
            .filter(|value| *value > 0.0 && *value <= MAX_DURATION_SECS)
            .ok_or("'duration' must be greater than 0 and at most 30 seconds")?;
        request.insert("duration".into(), json!(duration));
    }
    Ok(Value::Object(request))
}

fn pixels<const N: usize>(arguments: &Value, key: &str) -> Result<[i32; N], String> {
    let values = arguments
        .get(key)
        .and_then(Value::as_array)
        .filter(|values| values.len() == N);
    let mut result = [0; N];
    if let Some(values) = values {
        for (target, value) in result.iter_mut().zip(values) {
            let Some(pixel) = value.as_u64().and_then(|value| i32::try_from(value).ok()) else {
                return Err(format!(
                    "'{key}' must contain {N} nonnegative pixel integers"
                ));
            };
            *target = pixel;
        }
        return Ok(result);
    }
    Err(format!(
        "'{key}' must contain {N} nonnegative pixel integers"
    ))
}

fn required_text(arguments: &Value, max_len: usize) -> Result<&str, String> {
    arguments
        .get("text")
        .and_then(Value::as_str)
        .filter(|text| !text.is_empty() && text.len() <= max_len && !text.contains('\0'))
        .ok_or_else(|| {
            format!("'text' must be a nonempty string of at most {max_len} UTF-8 bytes without NUL")
        })
}

fn positive_integer(arguments: &Value, key: &str) -> Result<i32, String> {
    arguments
        .get(key)
        .and_then(Value::as_u64)
        .and_then(|value| i32::try_from(value).ok())
        .filter(|value| *value > 0)
        .ok_or_else(|| format!("'{key}' must be a positive 32-bit integer"))
}

fn require_access(state: &Value) -> Result<(), String> {
    let mode = state
        .get("computer_use")
        .and_then(Value::as_str)
        .map(ComputerAccess::from_state_str)
        .unwrap_or(ComputerAccess::Off);
    match mode {
        ComputerAccess::Off => Err(OFF_MESSAGE.into()),
        // TODO(RAN-3): Ask for per-session approval before executing.
        ComputerAccess::Ask | ComputerAccess::Allow => Ok(()),
    }
}

/// Computer use rides the existing unified integration. The new live setting
/// is the opt-in, so retired launch grants cannot activate computer use.
pub(crate) fn session_has_integration(manifest: &HostedSessionManifest) -> bool {
    manifest.sessions_mcp_enabled() || manifest.browser_mcp_enabled()
}

fn require_session(session_id: &str) -> Result<(), String> {
    if session_id.is_empty()
        || !session_id
            .bytes()
            .all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'-' | b'_'))
    {
        return Err("Computer use requires an Unpeel terminal session".into());
    }
    let running = session_host::load_manifest(session_id).is_some_and(|manifest| {
        manifest.state == HostedSessionState::Running
            && manifest.session.id == session_id
            && session_has_integration(&manifest)
    });
    if !running {
        return Err("Computer use requires a running session with Unpeel MCP enabled".into());
    }
    Ok(())
}

fn screenshot_filename() -> String {
    // Give simultaneous calls distinct timestamp names even on a coarse clock.
    static LAST_TIMESTAMP: Mutex<u128> = Mutex::new(0);
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_nanos();
    let mut last = LAST_TIMESTAMP
        .lock()
        .unwrap_or_else(std::sync::PoisonError::into_inner);
    *last = now.max(*last + 1);
    format!("{last}.png")
}

fn takes_screenshot(action: &str) -> bool {
    !matches!(action, "wait" | "cursor_position" | "status")
}

/// Serve the same-user workspace socket route. Access and validation are
/// repeated here so a raw local request cannot bypass the MCP dispatcher.
pub fn handle_local_call(
    request: &Value,
    call_adapter: impl FnOnce(&str, Value) -> Result<Value, String>,
) -> Result<Value, String> {
    require_access(&app_state::load()?)?;
    let session_id = request
        .get("session_id")
        .and_then(Value::as_str)
        .ok_or("Computer use requires an Unpeel terminal session")?;
    require_session(session_id)?;
    let arguments = &request["arguments"];
    let action = action_name(arguments)?;
    let mut body = validate_arguments(action, arguments)?;
    if action == "status" {
        return call_adapter(STATUS_OPERATION, json!({}));
    }
    body["session_id"] = json!(session_id);
    let path = if takes_screenshot(action) {
        let path = session_artifacts::create_computer_screenshot_dir(session_id)?
            .join(screenshot_filename());
        body["screenshot_path"] = json!(path
            .to_str()
            .ok_or("Computer screenshot path must be UTF-8")?);
        Some(path)
    } else {
        None
    };
    let result = call_adapter(PERFORM_OPERATION, body)?;
    perform_result(action, result, path.as_deref())
}

fn perform_result(action: &str, result: Value, path: Option<&Path>) -> Result<Value, String> {
    if result["ok"].as_bool() != Some(true) {
        return Err(adapter_error(&result));
    }
    let mut metadata = json!({ "ok": true, "frontmost_app": result["frontmost_app"] });
    if let Some(path) = path {
        if result["screenshot_path"].as_str() != path.to_str() {
            return Err("Mac app did not return the requested screenshot".into());
        }
        metadata["screenshot_path"] = json!(path);
        metadata["width"] = json!(positive_integer(&result, "width")?);
        metadata["height"] = json!(positive_integer(&result, "height")?);
        metadata["scale"] = json!(result["scale"]
            .as_f64()
            .filter(|scale| *scale > 0.0)
            .ok_or("Mac app did not return a valid screenshot scale")?);
    }
    if action == "cursor_position" {
        // A real cursor can be on a secondary display outside the capture.
        let valid = result["coordinate"].as_array().is_some_and(|coordinate| {
            coordinate.len() == 2 && coordinate.iter().all(|pixel| pixel.as_i64().is_some())
        });
        if !valid {
            return Err("Mac app did not return a valid cursor position".into());
        }
        metadata["coordinate"] = result["coordinate"].clone();
    }
    Ok(metadata)
}

pub fn adapter_error(response: &Value) -> String {
    response["error"]
        .as_str()
        .filter(|message| !message.is_empty())
        .unwrap_or("The Mac app could not complete the computer action")
        .to_owned()
}

pub(crate) fn tool_content(arguments: &Value) -> Result<Vec<Value>, String> {
    let action = action_name(arguments)?;
    if action == "help" {
        return Ok(vec![json!({"type": "text", "text": help(arguments)?})]);
    }
    require_access(&app_state::load()?)?;
    let session_id = crate::mcp_host::self_session_id()
        .ok_or("Computer use requires an Unpeel terminal session")?;
    let arguments = validate_arguments(action, arguments)?;
    let mut result = call_host(&json!({ "session_id": session_id, "arguments": arguments }))?;
    let image = if let Some(path) = result["screenshot_path"]
        .as_str()
        .filter(|_| takes_screenshot(action))
    {
        let image = screenshot_content(&session_id, Path::new(path))?;
        if image.is_none() {
            result["image_omitted"] = json!("PNG exceeds the inline image size limit");
        }
        image
    } else {
        None
    };
    let mut content = vec![json!({"type": "text", "text": result.to_string()})];
    content.extend(image);
    Ok(content)
}

fn screenshot_content(session_id: &str, path: &Path) -> Result<Option<Value>, String> {
    let name = path
        .file_name()
        .and_then(|name| name.to_str())
        .ok_or("Invalid computer screenshot filename")?;
    let png =
        session_artifacts::read_local_chunk(session_id, "computer", name, 0, MAX_INLINE_PNG_BYTES)
            .map_err(|error| format!("Could not read computer screenshot: {}", error.message))?;
    if !png.bytes.starts_with(PNG_SIGNATURE) {
        return Err("Mac app did not save a PNG screenshot".into());
    }
    if png.total_size > MAX_INLINE_PNG_BYTES as u64 {
        return Ok(None);
    }
    if png.next_offset != png.total_size {
        return Err("Computer screenshot changed during read".into());
    }
    Ok(Some(json!({
        "type": "image",
        "mimeType": "image/png",
        "data": base64::engine::general_purpose::STANDARD.encode(&png.bytes),
    })))
}

fn call_host(body: &Value) -> Result<Value, String> {
    let socket = remote_stdio::local_host_socket_path(&app_paths::unpeel_home());
    let mut stream = UnixStream::connect(socket)
        .map_err(|error| format!("Could not reach the workspace Host for computer use: {error}"))?;
    stream
        .set_read_timeout(Some(HOST_TIMEOUT))
        .map_err(|error| error.to_string())?;
    stream
        .set_write_timeout(Some(HOST_TIMEOUT))
        .map_err(|error| error.to_string())?;
    let request = relay_wire::TunnelRequest {
        id: 1,
        method: "POST".into(),
        path: LOCAL_COMPUTER_PATH.into(),
        query: Vec::new(),
        auth: None,
        content_type: Some("application/json".into()),
        body: serde_json::to_vec(body).map_err(|error| error.to_string())?,
    };
    remote_stdio::write_frame(
        &mut stream,
        remote_stdio::FRAME_KIND_REQUEST,
        &relay_wire::encode_tunnel_request(&request),
    )?;
    let frame = remote_stdio::read_frame(&mut stream)?
        .filter(|frame| frame.kind == remote_stdio::FRAME_KIND_RESPONSE)
        .ok_or("Workspace Host did not return a computer response")?;
    let response = relay_wire::parse_tunnel_response(&frame.payload)?;
    if response.id != request.id {
        return Err("Workspace Host returned the wrong computer response id".into());
    }
    let result =
        serde_json::from_slice::<Value>(&response.body).map_err(|error| error.to_string())?;
    if response.status != 200 || result["ok"].as_bool() == Some(false) {
        return Err(adapter_error(&result));
    }
    Ok(result)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::state::AppState;

    #[test]
    fn computer_whitelists_fields_for_every_action() {
        let supplied = json!({
            "session_id": "someone-else",
            "operation": "computer.status",
            "screenshot_path": "/injected.png",
            "coordinate": [12, 34],
            "start_coordinate": [2, 3],
            "region": [0, 1, 10, 11],
            "text": "cmd+c",
            "scroll_direction": "down",
            "scroll_amount": 3,
            "duration": 1.5,
            "repeat": 100,
            "help_for": "zoom",
        });
        let actions: &[(&str, &[&str])] = &[
            ("screenshot", &[]),
            ("left_click", &["coordinate"]),
            ("right_click", &["coordinate"]),
            ("middle_click", &["coordinate"]),
            ("double_click", &["coordinate"]),
            ("triple_click", &["coordinate"]),
            ("mouse_move", &["coordinate"]),
            ("left_click_drag", &["start_coordinate", "coordinate"]),
            ("left_mouse_down", &[]),
            ("left_mouse_up", &[]),
            ("type", &["text"]),
            ("key", &["text"]),
            ("hold_key", &["text", "duration"]),
            (
                "scroll",
                &["scroll_direction", "scroll_amount", "coordinate"],
            ),
            ("wait", &["duration"]),
            ("zoom", &["region"]),
            ("cursor_position", &[]),
            ("open_app", &["text"]),
            ("status", &[]),
        ];
        assert_eq!(actions.len() + 1, ACTIONS.len()); // Help is local.
        for (action, fields) in actions {
            let mut expected = json!({"action": action});
            for field in *fields {
                expected[*field] = supplied[*field].clone();
            }
            assert_eq!(
                validate_arguments(action, &supplied).unwrap(),
                expected,
                "{action}"
            );
        }
        assert!(help(&supplied).unwrap().contains("zoom:"));
        assert!(help(&json!({"help_for": 1})).is_err());
        assert!(help(&json!({"help_for": "teleport"})).is_err());
        assert!(action_name(&json!({"action": "teleport"})).is_err());
    }

    #[test]
    fn computer_rejects_invalid_action_arguments() {
        for action in [
            "left_click",
            "right_click",
            "middle_click",
            "double_click",
            "triple_click",
            "mouse_move",
            "left_click_drag",
            "type",
            "key",
            "hold_key",
            "scroll",
            "wait",
            "zoom",
            "open_app",
        ] {
            assert!(validate_arguments(action, &json!({})).is_err(), "{action}");
        }
        for (action, args) in [
            ("mouse_move", json!({"coordinate": [1]})),
            ("mouse_move", json!({"coordinate": [-1, 0]})),
            ("mouse_move", json!({"coordinate": [0, 1.5]})),
            ("mouse_move", json!({"coordinate": [i64::MAX, 1]})),
            (
                "left_click_drag",
                json!({"start_coordinate": [0, 1], "coordinate": [0, false]}),
            ),
            ("left_click_drag", json!({"coordinate": [10, 20]})),
            ("zoom", json!({"region": [1, 0, 1, 3]})),
            ("zoom", json!({"region": [1, 3, 2, 0]})),
            (
                "scroll",
                json!({"scroll_direction": "diagonal", "scroll_amount": 1}),
            ),
            (
                "scroll",
                json!({"scroll_direction": "down", "scroll_amount": 0}),
            ),
            (
                "scroll",
                json!({"scroll_direction": "up", "scroll_amount": -1}),
            ),
            (
                "scroll",
                json!({"scroll_direction": "up", "scroll_amount": 1, "coordinate": null}),
            ),
            ("wait", json!({"duration": 0})),
            ("wait", json!({"duration": 31})),
            ("wait", json!({"duration": "1"})),
            (
                "hold_key",
                json!({"text": "ctrl+shift+Tab", "duration": -1}),
            ),
            ("key", json!({"text": "cmd+"})),
            ("key", json!({"text": "cmd + c"})),
            ("type", json!({"text": ""})),
            ("type", json!({"text": "x".repeat(MAX_TEXT_BYTES + 1)})),
            ("open_app", json!({"text": "  "})),
        ] {
            assert!(
                validate_arguments(action, &args).is_err(),
                "{action} {args}"
            );
        }
        assert!(validate_arguments("type", &json!({"text": " 🙂\n"})).is_ok());
        assert!(validate_arguments("wait", &json!({"duration": 30})).is_ok());
        assert!(validate_arguments(
            "scroll",
            &json!({"scroll_direction": "left", "scroll_amount": 3})
        )
        .is_ok());
    }

    #[test]
    fn computer_access_defaults_off_and_ignores_legacy_grants() {
        assert_eq!(AppState::default().computer_use, ComputerAccess::Off);
        let legacy = json!({
            "computer_default_access": "allow",
            "experimental_features": {"computer_use": true},
        });
        let state: AppState = serde_json::from_value(legacy.clone()).unwrap();
        assert_eq!(state.computer_use, ComputerAccess::Off);
        assert_eq!(state.computer_default_access, ComputerAccess::Allow);
        for state in [
            legacy,
            json!({"computer_use": "off"}),
            json!({"computer_use": "unknown"}),
            json!({"computer_use": true}),
        ] {
            assert_eq!(require_access(&state).unwrap_err(), OFF_MESSAGE);
        }
        for state in [
            json!({"computer_use": "allow"}),
            json!({"computer_use": "ask"}),
        ] {
            assert!(require_access(&state).is_ok());
        }
    }

    #[test]
    fn computer_screenshot_names_are_unique_and_timestamped() {
        let first = screenshot_filename();
        let second = screenshot_filename();
        assert_ne!(first, second);
        for name in [first, second] {
            assert!(name.strip_suffix(".png").unwrap().parse::<u128>().is_ok());
        }
    }

    #[test]
    fn computer_results_only_report_the_requested_image() {
        let path = Path::new("/app-sessions/test/artifacts/computer/screenshots/123.png");
        let response = json!({
            "ok": true,
            "screenshot_path": path,
            "width": 1456,
            "height": 816,
            "scale": 2.0,
            "frontmost_app": {"name": "Notes", "bundle_id": "com.apple.Notes"},
        });
        assert_eq!(
            perform_result("screenshot", response.clone(), Some(path)).unwrap(),
            response
        );
        assert!(perform_result("screenshot", response, Some(Path::new("/unrelated.png"))).is_err());
        assert_eq!(
            perform_result(
                "cursor_position",
                json!({"ok": true, "coordinate": [-20, 30]}),
                None
            )
            .unwrap()["coordinate"],
            json!([-20, 30]),
        );
        assert_eq!(
            perform_result(
                "wait",
                json!({"ok": false, "error": "Permission denied"}),
                None
            )
            .unwrap_err(),
            "Permission denied",
        );
    }
}
