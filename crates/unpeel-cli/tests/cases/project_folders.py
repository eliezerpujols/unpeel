"""Multi-folder projects through a real PTY launch.

A fake `claude` (the runtime is recognized from the command head) prints its
argv and the project-folder environment, then runs the real Claude
SessionStart reporter and prints that hook's stdout. With the project's
`agent_folder_access` on, the EXEC command carries `--add-dir` for the other
folders while the stored manifest command stays exactly as the preset.
Turning the toggle off removes the flags on the next launch.
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from harness import CRATES, run, run_cli  # noqa: E402


def body(case):
    home = case.home
    primary = home.path("pa")
    second = home.path("pb with space")
    third = home.path("pc")
    for folder in (primary, second, third):
        os.makedirs(folder, exist_ok=True)

    state = home.state()
    state.setdefault("projects", []).append(
        {
            "id": "p",
            "name": "multi",
            "path": primary,
            "folders": [{"path": primary}, {"path": second, "name": "API"}, {"path": third}],
            "agent_folder_access": True,
        }
    )
    with open(home.path("app-state.json"), "w") as handle:
        json.dump(state, handle, indent=2)

    binary_dir = home.path("bin")
    os.makedirs(binary_dir, exist_ok=True)
    fake = os.path.join(binary_dir, "claude")
    reporter = os.path.join(
        os.path.dirname(CRATES), "runtimes", "claude-code", "assets", "hooks", "lifecycle.sh"
    )
    with open(fake, "w") as handle:
        handle.write(f"#!{sys.executable}\nREPORTER = {reporter!r}\n" + '''
import json, os, subprocess, sys, time
print("FOLDERS_ARGV=" + json.dumps(sys.argv[1:]), flush=True)
print("FOLDERS_CWD=" + json.dumps(os.getcwd()), flush=True)
print("FOLDERS_ENV=" + json.dumps([os.environ.get("UNPEEL_PROJECT_FOLDERS"), os.environ.get("UNPEEL_PROJECT_FOLDERS_ACCESS")]), flush=True)
env = dict(os.environ, UNPEEL_APP_PORT="", UNPEEL_APP_PORT_REGISTRY_FILE=os.path.join(os.environ["HOME"], "no-ports"))
hook = subprocess.run(["bash", REPORTER], input=json.dumps({"hook_event_name": "SessionStart", "session_id": "x"}), text=True, capture_output=True, env=env)
print("FOLDERS_HOOK=" + json.dumps(hook.stdout.strip()), flush=True)
time.sleep(120)
''')
    os.chmod(fake, 0o755)
    if " " in fake:
        case.check("test home path has no spaces", False, fake)
        return
    environment = {"HOME": home.root, "SHELL": "/bin/bash"}
    home.preset(label="fakeclaude", command=fake + " --model x", preset_id="fake")

    service = case.serve(env=environment)
    ready = service.ready(timeout=20)
    case.check("isolated Host starts", bool(ready), service.log())
    if not ready:
        return

    def launch():
        launched = run_cli(home, ["new", "--preset", "fakeclaude", "--project", "p", "--cwd", primary], env=environment)
        ids = re.findall(r"[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}", launched.stdout)
        if launched.returncode == 0 and ids:
            return ids[0]
        case.note("unpeel new: " + (launched.stdout + launched.stderr).strip()[-600:])
        return None

    def reported(session_id):
        found = {}

        def done():
            try:
                with open(home.path("app-sessions", session_id, "output.bin"), "rb") as output:
                    text = output.read().decode("utf-8", "replace")
            except OSError:
                return False
            for key in ("ARGV", "CWD", "ENV", "HOOK"):
                match = re.search(r"FOLDERS_" + key + r"=(.*?)\r?\n", text)
                if match:
                    found[key] = json.loads(match.group(1))
            return len(found) == 4

        service.wait_for(done, timeout=30)
        return found

    on = launch()
    case.check("fake claude launches with folder access on", bool(on))
    if not on:
        return
    seen = reported(on)
    case.check("fake claude reported argv, cwd, env and hook", len(seen) == 4, str(seen))
    argv = seen.get("ARGV", [])
    case.check(
        "exec command carries --add-dir for the other folders",
        argv == ["--model", "x", "--add-dir", second, "--add-dir", third],
        str(argv),
    )
    case.check("session starts in the primary folder", os.path.realpath(seen.get("CWD") or "") == os.path.realpath(primary), str(seen.get("CWD")))
    case.check(
        "folder env lists every folder and marks access",
        seen.get("ENV") == ["\n".join([primary, second, third]), "1"],
        str(seen.get("ENV")),
    )
    stored = home.manifests().get(on, {}).get("session", {}).get("command")
    case.check("stored command never carries the flags", stored == fake + " --model x", str(stored))
    try:
        context = json.loads(seen.get("HOOK") or "{}")["hookSpecificOutput"]["additionalContext"]
    except (ValueError, KeyError, TypeError):
        context = ""
    case.check(
        "SessionStart hook tells Claude about the folders",
        second in context and "You can read and edit all of them." in context,
        repr(seen.get("HOOK")),
    )

    state = home.state()
    for project in state["projects"]:
        if project["id"] == "p":
            project.pop("agent_folder_access", None)
    with open(home.path("app-state.json"), "w") as handle:
        json.dump(state, handle, indent=2)

    off = launch()
    case.check("fake claude launches with folder access off", bool(off))
    if not off:
        return
    seen = reported(off)
    case.check("toggle off: no flags", seen.get("ARGV") == ["--model", "x"], str(seen.get("ARGV")))
    case.check(
        "toggle off: folders still listed, access unset",
        seen.get("ENV") == ["\n".join([primary, second, third]), None],
        str(seen.get("ENV")),
    )
    try:
        context = json.loads(seen.get("HOOK") or "{}")["hookSpecificOutput"]["additionalContext"]
    except (ValueError, KeyError, TypeError):
        context = ""
    case.check(
        "toggle off: hook notes that approval may be needed",
        "may require the user's approval" in context,
        repr(seen.get("HOOK")),
    )
    for session_id in (on, off):
        run_cli(home, ["rm", session_id], env=environment)


if __name__ == "__main__":
    run("project_folders", body)
