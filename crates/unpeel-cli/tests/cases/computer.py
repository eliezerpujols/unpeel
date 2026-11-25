"""Computer MCP routes through the local Host to an authenticated Mac adapter."""

import base64
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
import struct
import sys
import threading
import time
from unittest.mock import patch
import zlib

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from harness import McpClient, mobile_request, run, run_cli, wait_running
from host_launch_conformance import LocalHostClient

PNG = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgZGL+DwABFAEG1rmmRQAAAABJRU5ErkJggg=="
)
FRONTMOST_APP = {"name": "Notes", "bundle_id": "com.apple.Notes"}
OFF = "Computer use is turned off in Unpeel Settings ▸ Computer use"
TOKEN = "test-computer-callback-token-long-enough"


def large_png():
    data = b"Comment\0" + b"x" * 1_500_000
    chunk = b"tEXt" + data
    return PNG[:-12] + struct.pack(">I", len(data)) + chunk + struct.pack(">I", zlib.crc32(chunk)) + PNG[-12:]


def exercise_approvals(case, mcp, session_id, client, calls, phone_port, token):
    home = case.home
    home.write_state({**home.state(), "computer_use": "ask"})

    def resolve(choice, answer, turn_off=False):
        count = len(calls)
        result = {}

        def ask():
            result.update(mcp.call("computer", {"action": "cursor_position"}))

        thread = threading.Thread(target=ask, daemon=True)
        thread.start()
        pending = None
        deadline = time.monotonic() + 8
        while time.monotonic() < deadline:
            status, boot = mobile_request(phone_port, "/mobile/bootstrap", token)
            pending = next(iter(boot.get("pendingApprovals", [])), None) if status == 200 else None
            if pending or not thread.is_alive():
                break
            time.sleep(0.1)
        case.check(
            f"{choice}: phone sees a computer approval before the adapter runs",
            pending is not None and pending["kind"] == "computer"
            and pending["callerSessionID"] == session_id and pending.get("allowsOnce") is True
            and len(calls) == count, str(pending or result),
        )
        if pending is None:
            return None
        _, local = client.call(4, "GET", "/mobile/bootstrap")
        case.check(f"{choice}: the local Controller sees the same prompt",
                   pending in local.get("pendingApprovals", []), str(local.get("pendingApprovals")))
        if choice == "Allow once":
            _, concurrent = client.call(5, "POST", "/_unpeel/computer", body={
                "session_id": session_id, "arguments": {"action": "cursor_position"},
            })
            case.check("another action cannot use the pending one-time answer",
                       concurrent.get("ok") is False
                       and "already has a computer access approval pending" in concurrent.get("error", "")
                       and len(calls) == count, str(concurrent))
        if turn_off:
            home.write_state({**home.state(), "computer_use": "off"})
        status, response = mobile_request(
            phone_port, "/mobile/approvals/answer", token, method="POST",
            body={"id": pending["id"], **answer},
        )
        thread.join(timeout=10)
        case.check(
            f"{choice}: phone answer resolves the pending MCP call",
            status == 200 and not thread.is_alive() and "result" in result,
            str((response, result)),
        )
        if "result" not in result:
            return None
        return result, len(calls) - count

    for choice, answer, turn_off, expected in [
        ("Deny", {"approved": False}, False, "denied computer access"),
        ("Allow once", {"approved": True, "remember": False}, False, None),
        ("Off while pending", {"approved": True}, True, OFF),
        ("Allow for this session", {"approved": True}, False, None),
    ]:
        outcome = resolve(choice, answer, turn_off)
        if outcome is None:
            return
        result, adapter_calls = outcome
        if expected:
            case.check(f"{choice}: blocks the action",
                       result["result"]["isError"] and expected in mcp.text(result)
                       and adapter_calls == 0, str(result))
        else:
            case.check(f"{choice}: runs just the pending action",
                       not result["result"]["isError"] and adapter_calls == 1, str(result))
        remembered = home.state().get("computer_approvals", [])
        case.check(f"{choice}: only a session grant is remembered",
                   remembered == ([session_id] if choice == "Allow for this session" else []),
                   str(remembered))
        if turn_off:
            home.write_state({**home.state(), "computer_use": "ask"})

    reply = mcp.call("computer", {"action": "cursor_position"})
    case.check("a remembered session grant skips the next prompt",
               not reply["result"]["isError"] and json.loads(mcp.text(reply))["coordinate"] == [10, 20],
               str(reply))


def exercise_adapter(case, mcp, session_id, client, phone_port, token):
    calls = []

    class Callback(BaseHTTPRequestHandler):
        def log_message(self, *_):
            pass

        def do_POST(self):
            if (self.path != "/_unpeel/platform-adapter/call"
                    or self.headers.get("Authorization") != f"Bearer {TOKEN}"):
                self.send_error(403)
                return
            envelope = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
            calls.append(envelope)
            args = envelope["request"]
            value = {"ok": True, "frontmost_app": FRONTMOST_APP}
            if envelope["operation"] == "computer.status":
                value.update(screen_recording=True, accessibility=True)
            elif args["action"] == "cursor_position":
                value["coordinate"] = [10, 20]
            elif args["action"] == "wait":
                time.sleep(args["duration"])
            else:
                path = Path(args["screenshot_path"])
                path.write_bytes(large_png() if args["action"] == "zoom" else PNG)
                value.update(screenshot_path=str(path), width=1, height=1, scale=1.0)
            data = json.dumps(value).encode()
            self.send_response(200)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

    with HTTPServer(("127.0.0.1", 0), Callback) as callback:
        thread = threading.Thread(target=callback.serve_forever, daemon=True)
        thread.start()
        try:
            code, registration = client.call(
                1, "POST", "/_unpeel/platform-adapter",
                body={"action": "register", "registration": {
                    "version": 1,
                    "instanceID": "test-mac-adapter",
                    "callbackPort": callback.server_port,
                    "callbackToken": TOKEN,
                    "capabilities": ["computer.apps", "computer.status", "computer.perform"],
                }},
            )
            case.check("callback registration accepted", code == 200, str(registration))

            reply = mcp.call("computer", {"action": "status"})
            case.check("status returns permission state and app", not reply["result"]["isError"]
                       and json.loads(mcp.text(reply))["frontmost_app"] == FRONTMOST_APP
                       and json.loads(mcp.text(reply))["screen_recording"], str(reply))
            case.check("status uses the existing empty request contract", calls[-1] == {
                "version": 1, "operation": "computer.status", "request": {}
            }, str(calls[-1]))

            reply = mcp.call("computer", {
                "action": "left_click", "coordinate": [0, 1],
                "start_coordinate": [10, 20], "text": "extraneous",
                "session_id": "injected", "operation": "computer.status",
                "screenshot_path": "/injected.png",
            })
            result = reply["result"]
            content = result["content"]
            metadata = json.loads(content[0]["text"])
            path = Path(metadata["screenshot_path"])
            gallery = Path(case.home.path("app-sessions", session_id, "artifacts", "computer", "screenshots"))
            case.check("screenshot saved in the Session gallery", path.parent == gallery
                       and path.stem.isdecimal() and path.suffix == ".png" and path.read_bytes() == PNG,
                       str(path))
            case.check("MCP returns metadata and an inline PNG", not result["isError"]
                       and metadata["width"] == metadata["height"] == 1
                       and metadata["frontmost_app"] == FRONTMOST_APP
                       and content[1] == {"type": "image", "mimeType": "image/png",
                                          "data": base64.b64encode(PNG).decode()}, str(result))
            case.check("adapter receives only action fields and Host-owned values", calls[-1] == {
                "version": 1, "operation": "computer.perform",
                "request": {"action": "left_click", "coordinate": [0, 1],
                            "session_id": session_id, "screenshot_path": str(path)},
            }, str(calls[-1]))

            code, listing = client.call(2, "GET", "/mobile/artifacts", query={"session_id": session_id})
            case.check("Host gallery lists the computer screenshot", code == 200
                       and any(item["kind"] == "computer" and item["name"] == path.name
                               for item in listing.get("artifacts", [])), str(listing))

            reply = mcp.call("computer", {"action": "zoom", "region": [0, 0, 1, 1]})
            metadata = json.loads(mcp.text(reply))
            case.check("oversized PNG remains available by artifact path", not reply["result"]["isError"]
                       and bool(metadata.get("image_omitted"))
                       and Path(metadata["screenshot_path"]).stat().st_size > 1_500_000
                       and len(reply["result"]["content"]) == 1, str(reply))

            reply = mcp.call("computer", {"action": "cursor_position"})
            case.check("cursor position has no screenshot", not reply["result"]["isError"]
                       and json.loads(mcp.text(reply))["coordinate"] == [10, 20]
                       and "screenshot_path" not in calls[-1]["request"], str(reply))
            reply = mcp.call("computer", {"action": "wait", "duration": 5.2})
            case.check("long actions can outlast the standard callback timeout",
                       not reply["result"]["isError"] and "screenshot_path" not in calls[-1]["request"],
                       str(reply))

            exercise_approvals(case, mcp, session_id, client, calls, phone_port, token)

            # The same-user Host route enforces policy independently of stdio.
            case.home.write_state({**case.home.state(), "computer_use": "off"})
            count = len(calls)
            _, denied = client.call(3, "POST", "/_unpeel/computer", body={
                "session_id": session_id, "arguments": {"action": "screenshot"},
            })
            case.check("turning Off immediately blocks raw and MCP calls",
                       denied == {"ok": False, "error": OFF}
                       and mcp.text(mcp.call("computer", {"action": "screenshot"})) == OFF
                       and len(calls) == count, str(denied))
        finally:
            callback.shutdown()
            thread.join()


def body(case):
    home = case.home
    home.write_state({
        "experimental_features": {"computer_use": True},
        "computer_default_access": "allow",
    })
    home.project("p", "unpeel", "/tmp")
    token = home.pair_device()
    port = home.reserve_mobile_port()
    driver = home.path("old-driver")
    marker = home.path("driver-was-run")
    Path(driver).write_text(f"#!/bin/sh\ntouch {marker}\nexit 1\n")
    os.chmod(driver, 0o700)
    with patch.dict(os.environ, {"UNPEEL_CUA_DRIVER_BIN": driver, "UNPEEL_COMPUTER_ENGINE_INSTALL": "1"}):
        service = case.serve()
        ready = service.ready(timeout=20.0)
        case.check("Host starts with saved computer settings", bool(ready), str(ready))
        if not ready:
            return
        status, boot = mobile_request(port, "/mobile/bootstrap", token)
        settings = boot.get("workspaceSettings", {}).get("experimentalSettings", {})
        case.check("legacy bootstrap stays compatible", status == 200
                   and settings.get("computerUseAvailable") is False
                   and settings.get("computerUseReady") is False
                   and settings.get("computerUse") is False, str(settings))
        started = run_cli(home, ["new", "--command", "", "--project", "p"], timeout=40)
        session_id = started.stdout.strip().split()[-1] if started.stdout.strip() else ""
        ok = started.returncode == 0 and len(session_id) == 36 and wait_running(home, session_id)
        case.check("new Session starts normally", ok, started.stdout + started.stderr)
        if not ok:
            return

        mcp = case.track(McpClient(home, session_id, host_args=("__mcp_gate__", "unified")))
        names = mcp.tool_names()
        case.check("the unified integration advertises computer", "computer" in names, str(names))
        case.check("legacy settings leave access Off",
                   mcp.text(mcp.call("computer", {"action": "screenshot"})) == OFF)
        home.write_state({**home.state(), "computer_use": "allow"})
        reply = mcp.call("computer", {"action": "screenshot"})
        case.check("missing Mac adapter produces a tool error", reply["result"]["isError"]
                   and "connected computer adapter" in mcp.text(reply), str(reply))

        socket_path = json.loads(Path(home.path("serve.json")).read_text())["localSocket"]
        client = case.track(LocalHostClient(socket_path))
        exercise_adapter(case, mcp, session_id, client, port, token)

        result = run_cli(home, ["computer", "install", "--json"], timeout=10)
        case.check("old installer gives a retirement diagnostic", result.returncode != 0
                   and json.loads(result.stdout).get("state") == "removed", result.stdout)
        case.check("Host and CLI never run an old engine", not os.path.exists(marker))


run("computer", body)
