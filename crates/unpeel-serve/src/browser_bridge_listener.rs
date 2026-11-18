//! Loopback HTTP listener for the browser bridge (see
//! `unpeel_core::browser_bridge`). Runs in the machine `unpeel serve`
//! supervisor only — the lease winner — so one endpoint serves every local
//! workspace. Hand-rolled like the other Host listeners; answers CORS
//! (including Private Network Access preflights) because callers are pages
//! on arbitrary origins. Authorization is the bridge token in the body.

use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::time::Duration;

use unpeel_core::browser_bridge::{self, BridgeConfig};

const MAX_BODY: usize = browser_bridge::MAX_TEXT_BYTES + 16 * 1024;

/// Bind (reusing the saved port and token so open browsers keep working),
/// publish `bridge.json`, and serve until `should_stop` returns true.
pub fn spawn(should_stop: fn() -> bool) -> Result<u16, String> {
    let saved = browser_bridge::read_config();
    let preferred = saved.as_ref().map_or(browser_bridge::PREFERRED_PORT, |c| c.port);
    let listener = TcpListener::bind(("127.0.0.1", preferred))
        .or_else(|_| TcpListener::bind(("127.0.0.1", browser_bridge::PREFERRED_PORT)))
        .or_else(|_| TcpListener::bind(("127.0.0.1", 0)))
        .map_err(|error| format!("browser bridge bind: {error}"))?;
    let port = listener
        .local_addr()
        .map_err(|error| format!("browser bridge addr: {error}"))?
        .port();
    let config = BridgeConfig {
        port,
        token: saved
            .map(|c| c.token)
            .unwrap_or_else(browser_bridge::new_token),
    };
    browser_bridge::write_config(&config)
        .map_err(|error| format!("browser bridge config: {error}"))?;
    listener
        .set_nonblocking(true)
        .map_err(|error| format!("browser bridge nonblocking: {error}"))?;
    std::thread::Builder::new()
        .name("browser-bridge".into())
        .spawn(move || {
            while !should_stop() {
                match listener.accept() {
                    Ok((stream, _)) => {
                        let config = config.clone();
                        std::thread::spawn(move || handle_connection(stream, &config));
                    }
                    Err(error) if error.kind() == std::io::ErrorKind::WouldBlock => {
                        std::thread::sleep(Duration::from_millis(50));
                    }
                    Err(_) => std::thread::sleep(Duration::from_millis(200)),
                }
            }
        })
        .map_err(|error| format!("browser bridge thread: {error}"))?;
    Ok(port)
}

fn respond(stream: &mut TcpStream, status: u16, body: &str) {
    let reason = match status {
        200 => "OK",
        204 => "No Content",
        400 => "Bad Request",
        401 => "Unauthorized",
        404 => "Not Found",
        405 => "Method Not Allowed",
        409 => "Conflict",
        413 => "Payload Too Large",
        _ => "Error",
    };
    let response = format!(
        "HTTP/1.1 {status} {reason}\r\n\
         Content-Type: application/json\r\n\
         Content-Length: {}\r\n\
         Access-Control-Allow-Origin: *\r\n\
         Access-Control-Allow-Methods: POST, OPTIONS\r\n\
         Access-Control-Allow-Headers: content-type\r\n\
         Access-Control-Allow-Private-Network: true\r\n\
         Cache-Control: no-store\r\n\
         Connection: close\r\n\r\n{body}",
        body.len()
    );
    let _ = stream.write_all(response.as_bytes());
}

fn handle_connection(mut stream: TcpStream, config: &BridgeConfig) {
    let _ = stream.set_nonblocking(false);
    let _ = stream.set_read_timeout(Some(Duration::from_secs(5)));
    let _ = stream.set_write_timeout(Some(Duration::from_secs(5)));
    let mut buffer = Vec::new();
    let mut chunk = [0u8; 8192];
    let header_end = loop {
        match stream.read(&mut chunk) {
            Ok(0) | Err(_) => return,
            Ok(n) => buffer.extend_from_slice(&chunk[..n]),
        }
        if let Some(index) = buffer.windows(4).position(|w| w == b"\r\n\r\n") {
            break index + 4;
        }
        if buffer.len() > 32 * 1024 {
            return respond(&mut stream, 400, r#"{"error":"bad request"}"#);
        }
    };
    let head = String::from_utf8_lossy(&buffer[..header_end]).into_owned();
    let mut lines = head.split("\r\n");
    let mut request_line = lines.next().unwrap_or("").split_whitespace();
    let method = request_line.next().unwrap_or("").to_owned();
    let path = request_line
        .next()
        .unwrap_or("")
        .split('?')
        .next()
        .unwrap_or("")
        .to_owned();
    let content_length = lines
        .filter_map(|line| line.split_once(':'))
        .find(|(name, _)| name.trim().eq_ignore_ascii_case("content-length"))
        .and_then(|(_, value)| value.trim().parse::<usize>().ok())
        .unwrap_or(0);
    if method == "OPTIONS" {
        return respond(&mut stream, 204, "");
    }
    if method != "POST" {
        return respond(&mut stream, 405, r#"{"error":"method not allowed"}"#);
    }
    if content_length > MAX_BODY {
        return respond(&mut stream, 413, r#"{"error":"feedback is too long"}"#);
    }
    let mut body = buffer[header_end..].to_vec();
    while body.len() < content_length {
        match stream.read(&mut chunk) {
            Ok(0) | Err(_) => break,
            Ok(n) => body.extend_from_slice(&chunk[..n]),
        }
    }
    body.truncate(content_length);
    let (status, json) = browser_bridge::handle(&path, &body, config);
    respond(&mut stream, status, &json.to_string());
}
