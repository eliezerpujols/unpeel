//! One DevTools connection to the user's own Chrome, shared by every Unpeel
//! Session.
//!
//! Chrome's remote-debugging switch (chrome://inspect/#remote-debugging)
//! asks the user to approve every new DevTools connection, and each Session's
//! engine daemon opens its own. The browser engine also pulls every tab it
//! opens or switches to in front of the user (`Target.createTarget` in the
//! foreground, `Page.bringToFront`, `Target.activateTarget`).
//!
//! So in "Use my Chrome" mode one long-lived helper
//! (`unpeel-host __browser_csp_keeper__ <state-dir>` with a broker record)
//! holds the single approved connection and serves engines a private loopback
//! endpoint, guarded by a random path token:
//!
//! - commands are multiplexed (ids rewritten per client) and session events
//!   routed to the client that owns the CDP session;
//! - tabs open in the background, and requests to focus a tab or close the
//!   browser are answered locally, never sent to Chrome;
//! - a client can only use its own CDP sessions and close tabs Unpeel opened;
//! - pages Unpeel opened get `Page.setBypassCSP` on attach (before the
//!   engine's first navigation), so Agentation can reach the Host bridge on
//!   strict-CSP sites; the user's own tabs are never touched.
//!
//! The helper exits when Chrome closes the connection.

use std::collections::{HashMap, VecDeque};
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::path::{Path, PathBuf};
use std::sync::mpsc;
use std::time::{Duration, Instant};

use serde_json::{json, Value};

use crate::browser_csp_keeper::CdpSocket;

pub const BROKER_RECORD: &str = "broker.json";
/// An auto-attached tab nobody claims within this window belongs to the user:
/// it is resumed and released.
const UNCLAIMED_AFTER: Duration = Duration::from_millis(1500);
const INTERNAL: u64 = 0;

enum Input {
    Upstream(String),
    UpstreamClosed(String),
    Joined(u64, CdpSocket),
    Message(u64, String),
    Left(u64),
}

/// Run the broker until Chrome goes away.
pub fn run(upstream_endpoint: &str, state_dir: &Path) -> Result<(), String> {
    let record_path = state_dir.join(BROKER_RECORD);
    let _ = std::fs::remove_file(&record_path);
    // Connecting is what makes Chrome ask the user; allow time to answer.
    let upstream = CdpSocket::connect_with_timeout(upstream_endpoint, Duration::from_secs(120))?;
    let upstream_writer = upstream.writer()?;
    let listener =
        TcpListener::bind(("127.0.0.1", 0)).map_err(|e| format!("broker listen: {e}"))?;
    let port = listener.local_addr().map_err(|e| e.to_string())?.port();
    let token: String = crate::relay_crypto::random_bytes(16)
        .iter()
        .map(|b| format!("{b:02x}"))
        .collect();
    let path = format!("/devtools/browser/{token}");

    let (tx, rx) = mpsc::channel::<Input>();
    {
        let tx = tx.clone();
        let mut upstream = upstream;
        std::thread::spawn(move || loop {
            match upstream.read_text() {
                Ok(text) => {
                    if tx.send(Input::Upstream(text)).is_err() {
                        return;
                    }
                }
                Err(error) => {
                    let _ = tx.send(Input::UpstreamClosed(error));
                    return;
                }
            }
        });
    }
    {
        let tx = tx.clone();
        let path = path.clone();
        std::thread::spawn(move || accept_loop(listener, &path, tx));
    }
    write_record(
        &record_path,
        &json!({
            "endpoint": format!("ws://127.0.0.1:{port}{path}"),
            "upstream": upstream_endpoint,
            "pid": std::process::id(),
        }),
    )?;

    let mut broker = Broker::new(upstream_writer, log_file());
    let result = loop {
        match rx.recv_timeout(Duration::from_millis(250)) {
            Ok(Input::Upstream(text)) => broker.on_upstream_message(&text),
            Ok(Input::UpstreamClosed(error)) => break Err(error),
            Ok(Input::Joined(id, writer)) => {
                broker.clients.insert(id, writer);
            }
            Ok(Input::Message(id, text)) => broker.on_client_message(id, &text),
            Ok(Input::Left(id)) => broker.client_left(id),
            Err(mpsc::RecvTimeoutError::Timeout) => {}
            Err(mpsc::RecvTimeoutError::Disconnected) => break Ok(()),
        }
        broker.release_unclaimed();
        if broker.upstream_failed {
            break Err("Chrome connection lost".into());
        }
    };
    if std::fs::read_to_string(&record_path)
        .ok()
        .and_then(|raw| serde_json::from_str::<Value>(&raw).ok())
        .and_then(|v| v.get("pid").and_then(Value::as_u64))
        == Some(u64::from(std::process::id()))
    {
        let _ = std::fs::remove_file(&record_path);
    }
    result
}

fn write_record(path: &Path, value: &Value) -> Result<(), String> {
    use std::os::unix::fs::OpenOptionsExt;
    let tmp = path.with_extension("json.tmp");
    let mut file = std::fs::OpenOptions::new()
        .create(true)
        .write(true)
        .truncate(true)
        .mode(0o600)
        .open(&tmp)
        .map_err(|e| e.to_string())?;
    file.write_all(value.to_string().as_bytes())
        .map_err(|e| e.to_string())?;
    std::fs::rename(&tmp, path).map_err(|e| e.to_string())
}

fn log_file() -> Option<std::fs::File> {
    let path = std::env::var_os("UNPEEL_CDP_BROKER_LOG").filter(|p| !p.is_empty())?;
    std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(PathBuf::from(path))
        .ok()
}

fn accept_loop(listener: TcpListener, path: &str, tx: mpsc::Sender<Input>) {
    let mut next_client = 0u64;
    for stream in listener.incoming() {
        let Ok(stream) = stream else { continue };
        next_client += 1;
        let id = next_client;
        let tx = tx.clone();
        let path = path.to_string();
        std::thread::spawn(move || {
            let Ok(mut reader) = CdpSocket::accept(stream, &path) else {
                return;
            };
            let Ok(writer) = reader.writer() else { return };
            if tx.send(Input::Joined(id, writer)).is_err() {
                return;
            }
            while let Ok(text) = reader.read_text() {
                if tx.send(Input::Message(id, text)).is_err() {
                    return;
                }
            }
            let _ = tx.send(Input::Left(id));
        });
    }
}

struct Pending {
    client: u64,
    original_id: Value,
    method: String,
    target: Option<String>,
}

struct Unclaimed {
    since: Instant,
    target: String,
    session: String,
    waiting: bool,
    event: String,
}

struct Broker {
    upstream: CdpSocket,
    upstream_failed: bool,
    clients: HashMap<u64, CdpSocket>,
    next_id: u64,
    pending: HashMap<u64, Pending>,
    /// CDP session id → owning client (INTERNAL for the broker's own).
    sessions: HashMap<String, u64>,
    /// Tabs Unpeel opened → the client that opened them (it may have left).
    created: HashMap<String, u64>,
    /// Outstanding `Target.attachToTarget` per target, oldest first.
    attaching: HashMap<String, VecDeque<u64>>,
    /// Auto-attached sessions not yet claimed by a `createTarget` reply.
    unclaimed: Vec<Unclaimed>,
    log: Option<std::fs::File>,
}

impl Broker {
    fn new(upstream: CdpSocket, log: Option<std::fs::File>) -> Self {
        Self {
            upstream,
            upstream_failed: false,
            clients: HashMap::new(),
            next_id: 0,
            pending: HashMap::new(),
            sessions: HashMap::new(),
            created: HashMap::new(),
            attaching: HashMap::new(),
            unclaimed: Vec::new(),
            log,
        }
    }

    fn trace(&mut self, direction: &str, text: &str) {
        if let Some(log) = self.log.as_mut() {
            let short: String = text.chars().take(400).collect();
            let _ = writeln!(log, "{direction} {short}");
        }
    }

    fn send_upstream(&mut self, message: &Value) {
        let text = message.to_string();
        self.trace("U<", &text);
        if self.upstream.send_text(&text).is_err() {
            self.upstream_failed = true;
        }
    }

    fn send_client(&mut self, client: u64, text: &str) {
        if client == INTERNAL {
            return;
        }
        let failed = match self.clients.get_mut(&client) {
            Some(socket) => socket.send_text(text).is_err(),
            None => false,
        };
        if failed {
            self.client_left(client);
        }
    }

    fn reply(&mut self, client: u64, id: &Value, result: Value) {
        self.send_client(client, &json!({ "id": id, "result": result }).to_string());
    }

    fn reply_error(&mut self, client: u64, id: &Value, message: &str) {
        self.send_client(
            client,
            &json!({ "id": id, "error": { "code": -32000, "message": message } }).to_string(),
        );
    }

    /// Send a command on the broker's own behalf (reply discarded).
    fn internal(&mut self, method: &str, params: Value, session: Option<&str>) {
        self.next_id += 1;
        let id = self.next_id;
        self.pending.insert(
            id,
            Pending {
                client: INTERNAL,
                original_id: Value::Null,
                method: method.to_string(),
                target: None,
            },
        );
        let mut message = json!({ "id": id, "method": method, "params": params });
        if let Some(session) = session {
            message["sessionId"] = json!(session);
        }
        self.send_upstream(&message);
    }

    fn on_client_message(&mut self, client: u64, text: &str) {
        self.trace(&format!("C{client}>"), text);
        let Ok(mut message) = serde_json::from_str::<Value>(text) else {
            return;
        };
        let Some(original_id) = message.get("id").cloned() else {
            return;
        };
        let method = message
            .get("method")
            .and_then(Value::as_str)
            .unwrap_or("")
            .to_string();
        if let Some(session) = message.get("sessionId").and_then(Value::as_str) {
            if self.sessions.get(session) != Some(&client) {
                self.reply_error(client, &original_id, "Session with given id not found.");
                return;
            }
        }
        let mut target = None;
        match method.as_str() {
            // Never pull Chrome or a tab in front of the user, and never
            // close or crash the user's browser.
            "Page.bringToFront"
            | "Target.activateTarget"
            | "Browser.close"
            | "Browser.crash"
            | "Browser.crashGpuProcess" => {
                self.reply(client, &original_id, json!({}));
                return;
            }
            "Target.createTarget" => {
                if let Some(params) = message.get_mut("params").and_then(Value::as_object_mut) {
                    params.insert("background".into(), json!(true));
                    params.insert("newWindow".into(), json!(false));
                }
            }
            "Target.closeTarget" => {
                let id = message.pointer("/params/targetId").and_then(Value::as_str);
                if !id.is_some_and(|id| self.created.contains_key(id)) {
                    self.reply_error(client, &original_id, "Unpeel only closes tabs it opened.");
                    return;
                }
            }
            "Target.attachToTarget" => {
                if let Some(id) = message.pointer("/params/targetId").and_then(Value::as_str) {
                    self.attaching
                        .entry(id.to_string())
                        .or_default()
                        .push_back(client);
                    target = Some(id.to_string());
                }
            }
            _ => {}
        }
        self.next_id += 1;
        let id = self.next_id;
        message["id"] = json!(id);
        self.pending.insert(
            id,
            Pending {
                client,
                original_id,
                method,
                target,
            },
        );
        self.send_upstream(&message);
    }

    fn client_left(&mut self, client: u64) {
        if self.clients.remove(&client).is_none() {
            return;
        }
        self.pending.retain(|_, p| p.client != client);
        for queue in self.attaching.values_mut() {
            queue.retain(|c| *c != client);
        }
        let owned: Vec<String> = self
            .sessions
            .iter()
            .filter(|(_, owner)| **owner == client)
            .map(|(session, _)| session.clone())
            .collect();
        for session in owned {
            self.sessions.remove(&session);
            self.internal(
                "Target.detachFromTarget",
                json!({ "sessionId": session }),
                None,
            );
        }
    }

    fn on_upstream_message(&mut self, text: &str) {
        self.trace("U>", text);
        let Ok(mut message) = serde_json::from_str::<Value>(text) else {
            return;
        };
        if let Some(id) = message.get("id").and_then(Value::as_u64) {
            let Some(pending) = self.pending.remove(&id) else {
                return;
            };
            self.on_reply(&pending, &message);
            if pending.client != INTERNAL {
                message["id"] = pending.original_id.clone();
                self.send_client(pending.client, &message.to_string());
            }
            return;
        }
        let method = message
            .get("method")
            .and_then(Value::as_str)
            .unwrap_or("")
            .to_string();
        if let Some(parent) = message
            .get("sessionId")
            .and_then(Value::as_str)
            .map(str::to_string)
        {
            let owner = self.sessions.get(&parent).copied();
            if let Some(child) = message.pointer("/params/sessionId").and_then(Value::as_str) {
                match (method.as_str(), owner) {
                    ("Target.attachedToTarget", Some(owner)) => {
                        self.sessions.insert(child.to_string(), owner);
                    }
                    ("Target.detachedFromTarget", _) => {
                        self.sessions.remove(child);
                    }
                    _ => {}
                }
            }
            if let Some(owner) = owner {
                self.send_client(owner, text);
            }
            return;
        }
        match method.as_str() {
            "Target.attachedToTarget" => self.on_attached(&message, text),
            "Target.detachedFromTarget" => {
                let session = message
                    .pointer("/params/sessionId")
                    .and_then(Value::as_str)
                    .unwrap_or("")
                    .to_string();
                self.unclaimed.retain(|u| u.session != session);
                if let Some(owner) = self.sessions.remove(&session) {
                    self.send_client(owner, text);
                }
            }
            _ => {
                if method == "Target.targetDestroyed" {
                    if let Some(id) = message.pointer("/params/targetId").and_then(Value::as_str) {
                        self.created.remove(id);
                        self.attaching.remove(id);
                    }
                }
                let clients: Vec<u64> = self.clients.keys().copied().collect();
                for client in clients {
                    self.send_client(client, text);
                }
            }
        }
    }

    fn on_reply(&mut self, pending: &Pending, message: &Value) {
        match pending.method.as_str() {
            "Target.createTarget" => {
                if let Some(target) = message.pointer("/result/targetId").and_then(Value::as_str) {
                    self.created.insert(target.to_string(), pending.client);
                    self.claim(target, pending.client);
                }
            }
            "Target.attachToTarget" => {
                if let Some(target) = &pending.target {
                    if let Some(queue) = self.attaching.get_mut(target) {
                        if let Some(pos) = queue.iter().position(|c| *c == pending.client) {
                            queue.remove(pos);
                        }
                    }
                }
                if let Some(session) = message.pointer("/result/sessionId").and_then(Value::as_str)
                {
                    self.sessions
                        .entry(session.to_string())
                        .or_insert(pending.client);
                }
            }
            _ => {}
        }
    }

    /// A browser-level attach: decide whose session it is.
    fn on_attached(&mut self, message: &Value, text: &str) {
        let params = &message["params"];
        let session = params["sessionId"].as_str().unwrap_or("").to_string();
        let info = &params["targetInfo"];
        let target = info["targetId"].as_str().unwrap_or("").to_string();
        let is_page = info["type"].as_str() == Some("page");
        let waiting = params["waitingForDebugger"].as_bool() == Some(true);

        let requested = self
            .attaching
            .get_mut(&target)
            .and_then(|queue| queue.front().copied());
        let creator = self
            .created
            .get(&target)
            .copied()
            .filter(|c| self.clients.contains_key(c));
        let opener = info["openerId"]
            .as_str()
            .and_then(|opener| self.created.get(opener).copied())
            .filter(|c| self.clients.contains_key(c));
        let owner = requested.or(creator).or(opener);
        match owner {
            Some(owner) => {
                if opener.is_some() && creator.is_none() {
                    self.created.insert(target.clone(), owner);
                }
                self.adopt(owner, &session, &target, is_page, text);
            }
            None => self.unclaimed.push(Unclaimed {
                since: Instant::now(),
                target,
                session,
                waiting,
                event: text.to_string(),
            }),
        }
    }

    fn adopt(&mut self, owner: u64, session: &str, target: &str, is_page: bool, event: &str) {
        self.sessions.insert(session.to_string(), owner);
        if owner != INTERNAL && is_page && self.created.contains_key(target) {
            // Queued before the engine's own commands on this session, so
            // the first navigation is covered.
            self.internal(
                "Page.setBypassCSP",
                json!({ "enabled": true }),
                Some(session),
            );
        }
        self.send_client(owner, event);
    }

    /// A `createTarget` reply names its tab: hand over its pending attach.
    fn claim(&mut self, target: &str, client: u64) {
        let (mine, rest): (Vec<Unclaimed>, Vec<Unclaimed>) = std::mem::take(&mut self.unclaimed)
            .into_iter()
            .partition(|u| u.target == target);
        self.unclaimed = rest;
        for item in mine {
            let is_page = serde_json::from_str::<Value>(&item.event)
                .ok()
                .and_then(|v| v.pointer("/params/targetInfo/type").cloned())
                == Some(json!("page"));
            self.adopt(client, &item.session, &item.target, is_page, &item.event);
        }
    }

    /// Tabs nobody claimed are the user's: let them run and let go of them.
    fn release_unclaimed(&mut self) {
        let now = Instant::now();
        let (expired, rest): (Vec<Unclaimed>, Vec<Unclaimed>) = std::mem::take(&mut self.unclaimed)
            .into_iter()
            .partition(|u| now.duration_since(u.since) >= UNCLAIMED_AFTER);
        self.unclaimed = rest;
        for item in expired {
            if item.waiting {
                self.internal(
                    "Runtime.runIfWaitingForDebugger",
                    json!({}),
                    Some(&item.session),
                );
            }
            self.internal(
                "Target.detachFromTarget",
                json!({ "sessionId": item.session }),
                None,
            );
        }
    }
}

/// The server half of `CdpSocket`: accept one engine connection whose request
/// path carries the broker's token. Browser pages (which send `Origin`) are
/// refused outright.
pub(crate) fn accept_handshake(stream: &mut TcpStream, path: &str) -> Result<Vec<u8>, String> {
    stream.set_read_timeout(Some(Duration::from_secs(10))).ok();
    let mut buffer = Vec::new();
    let mut chunk = [0u8; 4096];
    let head_end = loop {
        if let Some(pos) = buffer.windows(4).position(|w| w == b"\r\n\r\n") {
            break pos + 4;
        }
        if buffer.len() > 16 * 1024 {
            return Err("oversized handshake".into());
        }
        let n = stream.read(&mut chunk).map_err(|e| e.to_string())?;
        if n == 0 {
            return Err("closed during handshake".into());
        }
        buffer.extend_from_slice(&chunk[..n]);
    };
    let head = String::from_utf8_lossy(&buffer[..head_end]).into_owned();
    let mut lines = head.split("\r\n");
    let request = lines.next().unwrap_or("");
    let mut key = None;
    let mut has_origin = false;
    for line in lines {
        if let Some((name, value)) = line.split_once(':') {
            match name.trim().to_ascii_lowercase().as_str() {
                "sec-websocket-key" => key = Some(value.trim().to_string()),
                "origin" => has_origin = true,
                _ => {}
            }
        }
    }
    let requested = request.split(' ').nth(1).unwrap_or("");
    let authorized = constant_time_eq(requested.as_bytes(), path.as_bytes());
    let Some(key) = key.filter(|_| authorized && !has_origin && request.starts_with("GET ")) else {
        let _ = stream.write_all(b"HTTP/1.1 403 Forbidden\r\nContent-Length: 0\r\n\r\n");
        return Err("unauthorized DevTools client".into());
    };
    use base64::Engine as _;
    use sha1::Digest as _;
    let mut hasher = sha1::Sha1::new();
    hasher.update(key.as_bytes());
    hasher.update(b"258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
    let accept = base64::engine::general_purpose::STANDARD.encode(hasher.finalize());
    stream
        .write_all(
            format!(
                "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\n\
                 Connection: Upgrade\r\nSec-WebSocket-Accept: {accept}\r\n\r\n"
            )
            .as_bytes(),
        )
        .map_err(|e| e.to_string())?;
    stream.set_read_timeout(None).ok();
    Ok(buffer.split_off(head_end))
}

fn constant_time_eq(a: &[u8], b: &[u8]) -> bool {
    a.len() == b.len() && a.iter().zip(b).fold(0u8, |acc, (x, y)| acc | (x ^ y)) == 0
}

/// The broker's endpoint, when one is running for `upstream`.
pub fn live_endpoint(state_dir: &Path, upstream: &str) -> Option<String> {
    let record: Value =
        serde_json::from_str(&std::fs::read_to_string(state_dir.join(BROKER_RECORD)).ok()?).ok()?;
    if record.get("upstream").and_then(Value::as_str) != Some(upstream) {
        return None;
    }
    let pid = record.get("pid").and_then(Value::as_i64)? as i32;
    if pid <= 0 || unsafe { libc::kill(pid, 0) } != 0 {
        return None;
    }
    record
        .get("endpoint")
        .and_then(Value::as_str)
        .map(str::to_string)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn handshake_requires_the_token_and_no_origin() {
        let listener = TcpListener::bind(("127.0.0.1", 0)).unwrap();
        let port = listener.local_addr().unwrap().port();
        let attempt = |path: &str, origin: bool| {
            let mut client = TcpStream::connect(("127.0.0.1", port)).unwrap();
            let origin = if origin {
                "Origin: https://evil.test\r\n"
            } else {
                ""
            };
            write!(
                client,
                "GET {path} HTTP/1.1\r\nHost: x\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n\
                 Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\n{origin}Sec-WebSocket-Version: 13\r\n\r\n"
            )
            .unwrap();
            let (mut server, _) = listener.accept().unwrap();
            let ok = accept_handshake(&mut server, "/devtools/browser/secret").is_ok();
            let mut response = [0u8; 256];
            let n = client.read(&mut response).unwrap();
            (ok, String::from_utf8_lossy(&response[..n]).into_owned())
        };
        let (ok, response) = attempt("/devtools/browser/secret", false);
        assert!(ok);
        assert!(
            response.contains("s3pPLMBiTxaQ9kYGzzhZRbK+xOo="),
            "{response}"
        );
        assert!(!attempt("/devtools/browser/guess", false).0);
        assert!(!attempt("/devtools/browser/secret", true).0);
    }
}
