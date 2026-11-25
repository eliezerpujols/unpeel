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
DISPLAYS = [
    {"index": 0, "width": 1728, "height": 1117, "x": 0, "y": 0, "main": True},
    {"index": 1, "width": 2560, "height": 1440, "x": -2560, "y": -128, "main": False},
]
OFF = "Computer use is turned off in Unpeel Settings ▸ Computer use"
TOKEN = "test-computer-callback-token-long-enough"


def large_png():
    data = b"Comment\0" + b"x" * 1_500_000
    chunk = b"tEXt" + data
    return PNG[:-12] + struct.pack(">I", len(data)) + chunk + struct.pack(">I", zlib.crc32(chunk)) + PNG[-12:]


def exercise_approvals(case, mcp, session_id, client, calls, phone_port, token, select_app):
    home = case.home
    pause_file = Path(home.path("computer-control.json"))

    def dispatches():
        return sum(call["operation"] == "computer.perform" for call in calls)

    def begin(arguments):
        result = {}
        thread = threading.Thread(target=lambda: result.update(mcp.call("computer", arguments)), daemon=True)
        thread.start()
        deadline = time.monotonic() + 8
        while time.monotonic() < deadline and thread.is_alive():
            status, boot = mobile_request(phone_port, "/mobile/bootstrap", token)
            if status == 200 and boot.get("pendingApprovals"):
                return thread, result, boot["pendingApprovals"][0]
            time.sleep(0.05)
        return thread, result, None

    for choice, app_name, bundle_id, answer in [
        ("Deny", "Mail", "com.apple.mail", {"approved": False}),
        ("Allow", "Calendar", "com.apple.iCal", {"approved": True}),
        ("Stop", "Reminders", "com.apple.reminders", None),
    ]:
        select_app({"name": app_name, "bundle_id": bundle_id})
        before = dispatches()
        arguments = {"action": "type", "text": "a private message"}
        thread, result, pending = begin(arguments)
        if not case.check(f"{choice}: phone sees the app-specific approval before input",
                          pending is not None and pending["kind"] == "computer"
                          and pending["callerSessionID"] == session_id
                          and app_name in pending["title"] and not pending.get("allowsOnce")
                          and dispatches() == before, str(pending or result)):
            return
        _, local = client.call(4, "GET", "/mobile/bootstrap")
        case.check(f"{choice}: the local Controller sees the same prompt",
                   pending in local.get("pendingApprovals", []), str(local.get("pendingApprovals")))
        case.check(f"{choice}: target resolution does not receive the typed text",
                   calls[-1]["operation"] == "computer.resolve"
                   and arguments["text"] not in json.dumps(calls[-1]["request"]), str(calls[-1]))
        if answer is None:
            pause_file.write_text(json.dumps({"paused": True, "generation": "stopped"}))
        else:
            status, response = mobile_request(
                phone_port, "/mobile/approvals/answer", token, method="POST",
                body={"id": pending["id"], **answer},
            )
            case.check(f"{choice}: phone answer accepted", status == 200, str(response))
        thread.join(timeout=8)
        if not case.check(f"{choice}: pending MCP call completed", not thread.is_alive() and "result" in result, str(result)):
            return
        decisions = home.state()["computer_app_approvals"][session_id]
        if choice == "Allow":
            case.check("session grant dispatches input", not result["result"]["isError"]
                       and dispatches() == before + 1 and decisions[bundle_id.lower()] == "allow", str(result))
            again = mcp.call("computer", arguments)
            case.check("previously granted app skips the next prompt",
                       not again["result"]["isError"] and dispatches() == before + 2, str(again))
        elif choice == "Deny":
            again = mcp.call("computer", arguments)
            case.check("denial blocks the current and next action in this app",
                       result["result"]["isError"] and again["result"]["isError"]
                       and "denied access to Mail" in mcp.text(again)
                       and decisions[bundle_id] == "deny" and dispatches() == before, str(again))
        else:
            case.check("stop cancels a pending approval before dispatch",
                       result["result"]["isError"] and "paused" in mcp.text(result)
                       and bundle_id not in decisions and dispatches() == before, str(result))
            pause_file.write_text(json.dumps({"paused": False, "generation": "resumed"}))

    home.write_state({**home.state(), "computer_use": "ask"})
    arguments = {"action": "cursor_position"}
    before = dispatches()
    for remember in [False, True]:
        thread, result, pending = begin(arguments)
        if not case.check("Ask prompts before screen access",
                          pending is not None and pending.get("allowsOnce") is True and dispatches() == before,
                          str(pending or result)):
            return
        status, _ = mobile_request(phone_port, "/mobile/approvals/answer", token, method="POST",
                                   body={"id": pending["id"], "approved": True, "remember": remember})
        thread.join(timeout=8)
        before += 1
        decision = home.state()["computer_app_approvals"][session_id].get("@desktop")
        case.check("screen approval honors Allow once and Allow for this session",
                   status == 200 and not thread.is_alive() and not result.get("result", {}).get("isError", True)
                   and dispatches() == before and decision == ("allow" if remember else None), str(result))
    reply = mcp.call("computer", arguments)
    case.check("the screen grant skips the next prompt",
               not reply["result"]["isError"] and json.loads(mcp.text(reply))["coordinate"] == [10, 20], str(reply))

    for app, revoke in [
        ({"name": "Safari", "bundle_id": "com.apple.Safari"}, False),
        ({"name": "Chrome", "bundle_id": "com.google.Chrome"}, True),
    ]:
        select_app(app)
        home.write_state({**home.state(), "computer_unrestricted": True})
        before = dispatches()
        thread, result, pending = begin({"action": "type", "text": "browser input", "app": app["bundle_id"]})
        if not case.check(f"unrestricted Ask still prompts for {app['name']}",
                          pending is not None and app["name"] in pending["title"]
                          and pending["kind"] == "computer" and dispatches() == before,
                          str(pending or result)):
            return
        if revoke:
            home.write_state({**home.state(), "computer_unrestricted": False})
        status, _ = mobile_request(phone_port, "/mobile/approvals/answer", token, method="POST",
                                   body={"id": pending["id"], "approved": True, "remember": True})
        thread.join(timeout=8)
        if revoke:
            case.check("turning off unrestricted access during approval blocks dispatch",
                       status == 200 and not thread.is_alive() and result.get("result", {}).get("isError")
                       and "Unpeel browser tool" in mcp.text(result) and dispatches() == before, str(result))
        else:
            case.check("unrestricted Ask dispatches only after approval",
                       status == 200 and not thread.is_alive() and not result.get("result", {}).get("isError", True)
                       and dispatches() == before + 1 and calls[-1]["request"]["computer_unrestricted"] is True,
                       str(result))

    log = Path(home.path("app-sessions", session_id, "artifacts", "computer", "actions.jsonl")).read_text()
    typed = [entry for entry in map(json.loads, log.splitlines()) if entry["action"] == "type"]
    case.check("the action log stores the app and text length without typed text",
               any(entry["app"]["name"] == "Calendar" and entry["text_length"] == 17 for entry in typed)
               and "a private message" not in log, str(typed))


def exercise_adapter(case, mcp, session_id, client, phone_port, token):
    calls = []
    target = FRONTMOST_APP

    def select_app(app):
        nonlocal target
        target = app

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
                value.update(screen_recording=True, accessibility=True, displays=DISPLAYS)
            elif envelope["operation"] == "computer.resolve":
                control = Path(case.home.path("computer-control.json"))
                value["control_generation"] = json.loads(control.read_text())["generation"] if control.exists() else "initial"
                if args["action"] in {"left_click", "type"}:
                    value["target"] = {**target, "pid": 42}
                if args["action"] == "open_app":
                    value["target"] = {**target, "pid": None}
                if "coordinate" in args:
                    value["screen_coordinate"] = args["coordinate"]
            elif args["action"] == "cursor_position":
                value["coordinate"] = [10.1, 19.5]
            elif args["action"] == "wait":
                time.sleep(args["duration"])
            else:
                path = Path(args["screenshot_path"])
                path.write_bytes(large_png() if args["action"] == "zoom" else PNG)
                value.update(screenshot_path=str(path), width=1, height=1, scale=1.0)
                if args["action"] == "open_app" and args.get("activate") is True:
                    value["frontmost_app"] = target
                if args["action"] == "screenshot":
                    value["display"] = args.get("display", 0) if args.get("display", 0) < len(DISPLAYS) else 0
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
                    "capabilities": ["computer.apps", "computer.status", "computer.resolve", "computer.perform"],
                }},
            )
            case.check("callback registration accepted", code == 200, str(registration))

            reply = mcp.call("computer", {"action": "status"})
            metadata = json.loads(mcp.text(reply))
            case.check("status returns permission state, app and displays", not reply["result"]["isError"]
                       and metadata["frontmost_app"] == FRONTMOST_APP
                       and metadata["screen_recording"] and metadata["displays"] == DISPLAYS, str(reply))
            case.check("status uses the existing empty request contract", calls[-1] == {
                "version": 1, "operation": "computer.status", "request": {}
            }, str(calls[-1]))

            reply = mcp.call("computer", {"action": "screenshot", "display": 1})
            case.check("display selection reaches both adapter stages and returns with the image",
                       not reply["result"]["isError"] and json.loads(mcp.text(reply))["display"] == 1
                       and [call["request"]["display"] for call in calls[-2:]] == [1, 1], str(reply))
            reply = mcp.call("computer", {"action": "screenshot", "display": 9})
            case.check("Host rejects a screenshot when the adapter returned a different display",
                       reply["result"]["isError"] and "did not capture the requested display" in mcp.text(reply),
                       str(reply))

            select_app({"name": "Safari", "bundle_id": "com.apple.Safari"})
            reply = mcp.call("computer", {
                "action": "left_click", "coordinate": [0, 1], "computer_unrestricted": True,
            })
            case.check("browser clicks stay read-only despite a caller-supplied unrestricted flag",
                       reply["result"]["isError"] and "Unpeel browser tool" in mcp.text(reply)
                       and calls[-1]["operation"] == "computer.resolve"
                       and "computer_unrestricted" not in calls[-1]["request"], str(reply))
            select_app({"name": "Terminal", "bundle_id": "com.apple.Terminal"})
            reply = mcp.call("computer", {"action": "type", "text": "disallowed"})
            case.check("terminal typing is rejected before dispatch",
                       reply["result"]["isError"] and "left-click and scroll" in mcp.text(reply)
                       and calls[-1]["operation"] == "computer.resolve", str(reply))
            case.home.write_state({**case.home.state(), "computer_unrestricted": True})
            for app in [
                {"name": "Terminal", "bundle_id": "com.apple.Terminal"},
                {"name": "Safari", "bundle_id": "com.apple.Safari"},
                {"name": "Unpeel Dev", "bundle_id": "com.unpeel.native.dev"},
            ]:
                select_app(app)
                reply = mcp.call("computer", {"action": "type", "text": "test", "computer_unrestricted": False})
                case.check(f"unrestricted Allow types into {app['name']} without grants or prompts",
                           not reply["result"]["isError"] and calls[-1]["operation"] == "computer.perform"
                           and calls[-1]["request"]["computer_unrestricted"] is True
                           and not case.home.state().get("computer_app_approvals", {}).get(session_id),
                           str(reply))
            case.home.write_state({**case.home.state(), "computer_unrestricted": False})
            select_app(FRONTMOST_APP)
            case.home.write_state({**case.home.state(), "computer_app_approvals": {
                session_id: {"com.apple.notes": "allow"}
            }})

            reply = mcp.call("computer", {
                "action": "left_click", "coordinate": [0, 1],
                "start_coordinate": [10, 20], "text": "extraneous",
                "session_id": "injected", "operation": "computer.status",
                "screenshot_path": "/injected.png", "target": {"bundle_id": "fake.app"},
                "screen_coordinate": [400, 500], "control_generation": "fake",
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
                            "session_id": session_id, "screenshot_path": str(path),
                            "session_name": calls[-1]["request"]["session_name"],
                            "target": {**FRONTMOST_APP, "pid": 42}, "screen_coordinate": [0, 1],
                            "control_generation": "initial", "computer_unrestricted": False},
            }, str(calls[-1]))

            background = {"name": "TextEdit", "bundle_id": "com.apple.TextEdit"}
            select_app(background)
            case.home.write_state({**case.home.state(), "computer_app_approvals": {
                session_id: {"com.apple.notes": "allow", "com.apple.textedit": "allow"}
            }})
            typed = mcp.call("computer", {"action": "type", "text": "background input", "app": background["bundle_id"]})
            case.check("explicit keyboard app routes by bundle instead of foreground metadata",
                       not typed["result"]["isError"] and json.loads(mcp.text(typed))["frontmost_app"] == FRONTMOST_APP
                       and calls[-1]["request"]["target"]["bundle_id"] == background["bundle_id"]
                       and all(call["request"]["app"] == background["bundle_id"] for call in calls[-2:]), str(typed))
            wrong = mcp.call("computer", {"action": "type", "text": "hello", "app": "com.apple.Calendar"})
            case.check("Host rejects an adapter resolving a different keyboard app",
                       wrong["result"]["isError"] and "did not resolve the requested keyboard app" in mcp.text(wrong)
                       and calls[-1]["operation"] == "computer.resolve", str(wrong))
            for activate in [None, True]:
                args = {"action": "open_app", "text": background["bundle_id"]}
                if activate is True:
                    args["activate"] = True
                opened = mcp.call("computer", args)
                case.check(f"open_app activates only when requested ({activate})",
                           not opened["result"]["isError"]
                           and calls[-1]["request"].get("activate") == activate
                           and json.loads(mcp.text(opened))["frontmost_app"] == (background if activate else FRONTMOST_APP),
                           str(opened))
            select_app(FRONTMOST_APP)

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

            exercise_approvals(case, mcp, session_id, client, calls, phone_port, token, select_app)

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
