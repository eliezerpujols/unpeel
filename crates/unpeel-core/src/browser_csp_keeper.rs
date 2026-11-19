//! Keeps the Agentation overlay working on sites with a strict
//! Content-Security-Policy.
//!
//! The overlay runs in the page and talks to the Host's loopback bridge
//! (`browser_bridge`). A site whose CSP limits `connect-src` (or sets
//! `upgrade-insecure-requests`) blocks that request, so "Send to session"
//! fails there. Isolated worlds don't escape the page CSP; the only switch is
//! CDP `Page.setBypassCSP`, which holds only while the CDP session that set it
//! stays attached — the engine's own daemons never set it.
//!
//! So one small helper per Unpeel-managed browser
//! (`unpeel-host __browser_csp_keeper__ <state-dir>`) attaches to the
//! browser's DevTools endpoint, auto-attaches to every page (paused until the
//! bypass is set, so the first load is covered too), and exits when the
//! browser goes away. Against the user's own Chrome ("Use my Chrome" mode)
//! the same helper runs `browser_cdp_broker` instead, which only touches the
//! tabs Unpeel opened.

use std::io::{Read, Write};
use std::net::TcpStream;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};
use std::time::Duration;

use base64::Engine as _;
use serde_json::{json, Value};

pub const CSP_KEEPER_ARG: &str = "__browser_csp_keeper__";
const PID_FILE: &str = "csp-keeper.pid";
const MAX_FRAME: usize = 64 * 1024 * 1024;

/// Start the keeper for the browser whose record lives in `state_dir`
/// (`browser.json`), unless one is already running for that endpoint.
pub fn ensure_running(state_dir: &Path, endpoint: &str) {
    if crate::browser_bridge::overlay_enabled() {
        spawn_unless_running(state_dir, endpoint, KEEPER_KIND);
    }
}

/// Start the shared connection to the user's Chrome (`browser_cdp_broker`;
/// `browser.json` already says so), needed even without the overlay.
pub fn ensure_broker_running(state_dir: &Path, endpoint: &str) {
    spawn_unless_running(state_dir, endpoint, BROKER_KIND);
}

/// Recorded in the pid file, so a helper of another kind (or from a build
/// that predates the broker) is replaced rather than trusted.
const KEEPER_KIND: &str = "keeper";
const BROKER_KIND: &str = "broker";

/// Whether the helper recorded in `state_dir` is alive.
pub fn is_running(state_dir: &Path) -> bool {
    std::fs::read_to_string(state_dir.join(PID_FILE))
        .ok()
        .and_then(|raw| {
            raw.lines()
                .next()
                .and_then(|p| p.trim().parse::<i32>().ok())
        })
        .is_some_and(|pid| keeper_is_alive(pid, state_dir))
}

fn spawn_unless_running(state_dir: &Path, endpoint: &str, kind: &str) {
    let pid_file = state_dir.join(PID_FILE);
    if let Ok(raw) = std::fs::read_to_string(&pid_file) {
        let mut lines = raw.lines();
        let pid = lines.next().and_then(|p| p.trim().parse::<i32>().ok());
        let recorded = lines.next().unwrap_or("").trim();
        let recorded_kind = lines.next().unwrap_or(KEEPER_KIND).trim();
        if let Some(pid) = pid.filter(|pid| keeper_is_alive(*pid, state_dir)) {
            if recorded == endpoint && recorded_kind == kind {
                return;
            }
            // Ours (identity checked) but stale: never leave two helpers
            // holding connections to the same browser.
            unsafe { libc::kill(pid, libc::SIGTERM) };
        }
    }
    let Ok(exe) = std::env::current_exe() else {
        return;
    };
    let mut command = Command::new(exe);
    command
        .arg(CSP_KEEPER_ARG)
        .arg(state_dir)
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::null());
    #[cfg(unix)]
    {
        use std::os::unix::process::CommandExt;
        // Outlive the short-lived MCP call that started it.
        command.process_group(0);
    }
    if let Ok(child) = command.spawn() {
        let _ = std::fs::write(&pid_file, format!("{}\n{endpoint}\n{kind}\n", child.id()));
    }
}

fn keeper_is_alive(pid: i32, state_dir: &Path) -> bool {
    if pid <= 0 || unsafe { libc::kill(pid, 0) } != 0 {
        return false;
    }
    // Identity before trust: pids recycle quickly under agent load.
    Command::new("ps")
        .args(["-o", "command=", "-p", &pid.to_string()])
        .output()
        .ok()
        .map(|out| String::from_utf8_lossy(&out.stdout).into_owned())
        .is_some_and(|cmd| {
            cmd.contains(CSP_KEEPER_ARG) && cmd.contains(&*state_dir.to_string_lossy())
        })
}

/// `unpeel-host __browser_csp_keeper__ <state-dir>`: run until the browser
/// closes.
pub fn run(args: &[String]) -> Result<(), String> {
    let state_dir = PathBuf::from(
        args.first()
            .filter(|a| !a.trim().is_empty())
            .ok_or("Usage: unpeel-host __browser_csp_keeper__ <state-dir>")?,
    );
    let record: Value = serde_json::from_str(
        &std::fs::read_to_string(state_dir.join("browser.json"))
            .map_err(|e| format!("no browser record: {e}"))?,
    )
    .map_err(|e| e.to_string())?;
    let endpoint = record
        .get("endpoint")
        .and_then(Value::as_str)
        .ok_or("browser record has no endpoint")?
        .to_string();
    let owned_only = record.get("ownedOnly").and_then(Value::as_bool) == Some(true);
    let result = if owned_only {
        crate::browser_cdp_broker::run(&endpoint, &state_dir)
    } else {
        keep(&endpoint)
    };
    // Leave the pid file only if it still names us.
    let pid_file = state_dir.join(PID_FILE);
    if std::fs::read_to_string(&pid_file)
        .ok()
        .and_then(|raw| raw.lines().next().map(|l| l.trim().to_string()))
        == Some(std::process::id().to_string())
    {
        let _ = std::fs::remove_file(pid_file);
    }
    result
}

fn keep(endpoint: &str) -> Result<(), String> {
    let mut ws = CdpSocket::connect(endpoint)?;
    let mut next_id = 0u64;
    let mut send = |ws: &mut CdpSocket, method: &str, params: Value, session: Option<&str>| {
        next_id += 1;
        let mut message = json!({ "id": next_id, "method": method, "params": params });
        if let Some(session) = session {
            message["sessionId"] = json!(session);
        }
        ws.send_text(&message.to_string())
    };
    // New pages: attach paused, set the bypass, then let them run.
    send(
        &mut ws,
        "Target.setAutoAttach",
        json!({ "autoAttach": true, "waitForDebuggerOnStart": true, "flatten": true }),
        None,
    )?;
    // Pages that already exist (their next load is covered).
    send(
        &mut ws,
        "Target.setDiscoverTargets",
        json!({ "discover": true }),
        None,
    )?;
    send(&mut ws, "Target.getTargets", json!({}), None)?;
    let mut attached: std::collections::HashSet<String> = Default::default();

    loop {
        let text = ws.read_text()?;
        let Ok(message) = serde_json::from_str::<Value>(&text) else {
            continue;
        };
        let method = message.get("method").and_then(Value::as_str).unwrap_or("");
        let params = message.get("params").cloned().unwrap_or(Value::Null);
        match method {
            "Target.attachedToTarget" => {
                let session = params
                    .get("sessionId")
                    .and_then(Value::as_str)
                    .unwrap_or("");
                let info = params.get("targetInfo").cloned().unwrap_or(Value::Null);
                let kind = info.get("type").and_then(Value::as_str).unwrap_or("");
                if let Some(target) = info.get("targetId").and_then(Value::as_str) {
                    attached.insert(target.to_string());
                }
                if kind == "page" {
                    send(
                        &mut ws,
                        "Page.setBypassCSP",
                        json!({ "enabled": true }),
                        Some(session),
                    )?;
                }
                if params.get("waitingForDebugger").and_then(Value::as_bool) == Some(true) {
                    send(
                        &mut ws,
                        "Runtime.runIfWaitingForDebugger",
                        json!({}),
                        Some(session),
                    )?;
                }
            }
            "Target.detachedFromTarget" => {
                if let Some(target) = params.get("targetId").and_then(Value::as_str) {
                    attached.remove(target);
                }
            }
            "Target.targetCreated" | "Target.targetInfoChanged" => {
                let info = params.get("targetInfo").cloned().unwrap_or(Value::Null);
                attach_existing(&mut ws, &mut send, &mut attached, &info)?;
            }
            "" => {
                // Reply to Target.getTargets: attach to the pages already open.
                if let Some(infos) = message
                    .pointer("/result/targetInfos")
                    .and_then(Value::as_array)
                {
                    for info in infos.clone() {
                        attach_existing(&mut ws, &mut send, &mut attached, &info)?;
                    }
                }
            }
            _ => {}
        }
    }
}

fn attach_existing(
    ws: &mut CdpSocket,
    send: &mut impl FnMut(&mut CdpSocket, &str, Value, Option<&str>) -> Result<(), String>,
    attached: &mut std::collections::HashSet<String>,
    info: &Value,
) -> Result<(), String> {
    if info.get("type").and_then(Value::as_str) != Some("page") {
        return Ok(());
    }
    let Some(target) = info.get("targetId").and_then(Value::as_str) else {
        return Ok(());
    };
    if attached.insert(target.to_string()) {
        send(
            ws,
            "Target.attachToTarget",
            json!({ "targetId": target, "flatten": true }),
            None,
        )?;
    }
    Ok(())
}

/// Minimal blocking WebSocket for loopback DevTools traffic: the client side
/// toward Chrome, and (`accept`) the server side the broker offers engines.
pub(crate) struct CdpSocket {
    stream: TcpStream,
    buffer: Vec<u8>,
    /// Clients mask their frames; servers must not.
    masked: bool,
}

impl CdpSocket {
    fn connect(endpoint: &str) -> Result<Self, String> {
        Self::connect_with_timeout(endpoint, Duration::from_secs(10))
    }

    /// Accept one engine connection (see `browser_cdp_broker`).
    pub(crate) fn accept(mut stream: TcpStream, path: &str) -> Result<Self, String> {
        stream.set_nodelay(true).ok();
        let buffer = crate::browser_cdp_broker::accept_handshake(&mut stream, path)?;
        Ok(Self {
            stream,
            buffer,
            masked: false,
        })
    }

    /// A second handle on the same connection for writing from another thread.
    pub(crate) fn writer(&self) -> Result<Self, String> {
        Ok(Self {
            stream: self.stream.try_clone().map_err(|e| e.to_string())?,
            buffer: Vec::new(),
            masked: self.masked,
        })
    }

    pub(crate) fn connect_with_timeout(endpoint: &str, timeout: Duration) -> Result<Self, String> {
        let rest = endpoint
            .strip_prefix("ws://")
            .ok_or("only a ws:// loopback endpoint is supported")?;
        let (authority, path) = rest.split_once('/').unwrap_or((rest, ""));
        let host = authority
            .rsplit_once(':')
            .map(|(h, _)| h)
            .unwrap_or(authority);
        if !matches!(host, "127.0.0.1" | "localhost" | "[::1]") {
            return Err("refusing a non-loopback DevTools endpoint".into());
        }
        let mut stream = TcpStream::connect(authority).map_err(|e| format!("connect: {e}"))?;
        stream.set_nodelay(true).ok();
        let key =
            base64::engine::general_purpose::STANDARD.encode(crate::relay_crypto::random_bytes(16));
        let request = format!(
            "GET /{path} HTTP/1.1\r\nHost: {authority}\r\nUpgrade: websocket\r\n\
             Connection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n"
        );
        stream
            .write_all(request.as_bytes())
            .map_err(|e| e.to_string())?;
        let mut buffer = Vec::new();
        let mut chunk = [0u8; 4096];
        stream.set_read_timeout(Some(timeout)).ok();
        let head_end = loop {
            if let Some(pos) = buffer.windows(4).position(|w| w == b"\r\n\r\n") {
                break pos + 4;
            }
            let n = stream
                .read(&mut chunk)
                .map_err(|e| format!("handshake: {e}"))?;
            if n == 0 {
                return Err("DevTools closed during the handshake".into());
            }
            buffer.extend_from_slice(&chunk[..n]);
        };
        let head = String::from_utf8_lossy(&buffer[..head_end]).into_owned();
        if !head.starts_with("HTTP/1.1 101") {
            return Err(format!(
                "DevTools refused: {}",
                head.lines().next().unwrap_or("")
            ));
        }
        buffer.drain(..head_end);
        // Block indefinitely between events; the socket closing ends the keeper.
        stream.set_read_timeout(None).ok();
        Ok(Self {
            stream,
            buffer,
            masked: true,
        })
    }

    pub(crate) fn send_text(&mut self, text: &str) -> Result<(), String> {
        let payload = text.as_bytes();
        let mut frame = vec![0x81u8];
        let len = payload.len();
        let mask_bit = if self.masked { 0x80 } else { 0 };
        if len < 126 {
            frame.push(mask_bit | len as u8);
        } else if len < 65_536 {
            frame.push(mask_bit | 126);
            frame.extend_from_slice(&(len as u16).to_be_bytes());
        } else {
            frame.push(mask_bit | 127);
            frame.extend_from_slice(&(len as u64).to_be_bytes());
        }
        if self.masked {
            let mask: [u8; 4] = crate::relay_crypto::random_bytes(4)
                .try_into()
                .map_err(|_| "mask")?;
            frame.extend_from_slice(&mask);
            frame.extend(payload.iter().enumerate().map(|(i, b)| b ^ mask[i % 4]));
        } else {
            frame.extend_from_slice(payload);
        }
        self.stream
            .write_all(&frame)
            .map_err(|e| format!("write: {e}"))
    }

    /// The next complete text message (fragments joined; pings answered).
    pub(crate) fn read_text(&mut self) -> Result<String, String> {
        let mut message = Vec::new();
        loop {
            let (fin, opcode, payload) = self.read_frame()?;
            match opcode {
                0x0..=0x2 => {
                    message.extend_from_slice(&payload);
                    if message.len() > MAX_FRAME {
                        return Err("oversized DevTools message".into());
                    }
                    if fin {
                        return Ok(String::from_utf8_lossy(&message).into_owned());
                    }
                }
                0x8 => return Err("DevTools closed".into()),
                0x9 => self.send_pong(&payload)?,
                _ => {}
            }
        }
    }

    fn send_pong(&mut self, payload: &[u8]) -> Result<(), String> {
        let mask: [u8; 4] = crate::relay_crypto::random_bytes(4)
            .try_into()
            .map_err(|_| "mask")?;
        let payload = &payload[..payload.len().min(125)];
        if !self.masked {
            let mut frame = vec![0x8A, payload.len() as u8];
            frame.extend_from_slice(payload);
            return self.stream.write_all(&frame).map_err(|e| e.to_string());
        }
        let mut frame = vec![0x8A, 0x80 | payload.len() as u8];
        frame.extend_from_slice(&mask);
        frame.extend(payload.iter().enumerate().map(|(i, b)| b ^ mask[i % 4]));
        self.stream.write_all(&frame).map_err(|e| e.to_string())
    }

    fn read_frame(&mut self) -> Result<(bool, u8, Vec<u8>), String> {
        loop {
            if let Some((fin, opcode, payload, used)) = parse_frame(&self.buffer)? {
                self.buffer.drain(..used);
                return Ok((fin, opcode, payload));
            }
            let mut chunk = [0u8; 65536];
            let n = self
                .stream
                .read(&mut chunk)
                .map_err(|e| format!("read: {e}"))?;
            if n == 0 {
                return Err("DevTools connection closed".into());
            }
            self.buffer.extend_from_slice(&chunk[..n]);
        }
    }
}

#[allow(clippy::type_complexity)]
fn parse_frame(buffer: &[u8]) -> Result<Option<(bool, u8, Vec<u8>, usize)>, String> {
    if buffer.len() < 2 {
        return Ok(None);
    }
    let fin = buffer[0] & 0x80 != 0;
    let opcode = buffer[0] & 0x0f;
    let masked = buffer[1] & 0x80 != 0;
    let (length, mut header) = match buffer[1] & 0x7f {
        126 => {
            if buffer.len() < 4 {
                return Ok(None);
            }
            (u16::from_be_bytes([buffer[2], buffer[3]]) as usize, 4)
        }
        127 => {
            if buffer.len() < 10 {
                return Ok(None);
            }
            let mut bytes = [0u8; 8];
            bytes.copy_from_slice(&buffer[2..10]);
            (u64::from_be_bytes(bytes) as usize, 10)
        }
        small => (small as usize, 2),
    };
    if length > MAX_FRAME {
        return Err("oversized DevTools frame".into());
    }
    let mask = if masked {
        if buffer.len() < header + 4 {
            return Ok(None);
        }
        let m = [
            buffer[header],
            buffer[header + 1],
            buffer[header + 2],
            buffer[header + 3],
        ];
        header += 4;
        Some(m)
    } else {
        None
    };
    if buffer.len() < header + length {
        return Ok(None);
    }
    let mut payload = buffer[header..header + length].to_vec();
    if let Some(mask) = mask {
        for (i, byte) in payload.iter_mut().enumerate() {
            *byte ^= mask[i % 4];
        }
    }
    Ok(Some((fin, opcode, payload, header + length)))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_small_extended_and_partial_frames() {
        assert!(parse_frame(&[0x81]).unwrap().is_none());
        let (fin, op, payload, used) = parse_frame(&[0x81, 2, b'h', b'i']).unwrap().unwrap();
        assert!(fin);
        assert_eq!((op, payload.as_slice(), used), (1, &b"hi"[..], 4));
        let mut big = vec![0x01, 126, 0x01, 0x00];
        big.extend(vec![b'x'; 256]);
        let (fin, _, payload, used) = parse_frame(&big).unwrap().unwrap();
        assert!(!fin);
        assert_eq!((payload.len(), used), (256, 260));
        assert!(parse_frame(&big[..100]).unwrap().is_none());
    }

    #[test]
    fn refuses_non_loopback_endpoints() {
        assert!(CdpSocket::connect("ws://example.com:9222/devtools/browser/x").is_err());
        assert!(CdpSocket::connect("wss://127.0.0.1:9222/x").is_err());
    }
}
