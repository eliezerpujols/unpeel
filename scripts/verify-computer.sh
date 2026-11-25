#!/usr/bin/env bash
# Live macOS check. Use a shell session from an isolated Unpeel Dev workspace.
# Setup: docs/agents/sessions-mcp.md#verify-on-an-isolated-unpeel-dev-workspace
set -euo pipefail

skip() { printf 'SKIP: %s\n' "$1"; exit 0; }
fail() { printf 'FAIL: %s\n' "$1" >&2; exit 1; }
pass() { printf 'PASS: %s\n' "$1"; }

[[ "$(uname -s)" == Darwin ]] || skip "Computer use requires macOS."
[[ -n "${UNPEEL_HOME:-}" ]] || skip "Set UNPEEL_HOME to the isolated Unpeel Dev workspace."
UNPEEL_HOME=$(cd -- "$UNPEEL_HOME" && pwd -P) || fail "Cannot resolve UNPEEL_HOME."
export UNPEEL_HOME
case "$UNPEEL_HOME" in
  /private/tmp/*) ;;
  *) fail "Use an isolated Unpeel Dev workspace created with mktemp -d /tmp/up-computer.XXXXXX." ;;
esac
[[ -O "$UNPEEL_HOME" && ! -L "$UNPEEL_HOME/app-state.json" ]] \
  || fail "Use a private Unpeel Dev workspace with its own app-state.json."
[[ -S "$UNPEEL_HOME/host.sock" ]] || skip "No workspace Host socket in $UNPEEL_HOME."
[[ "${UNPEEL_SESSION_ID:-}" =~ ^[[:alnum:]_-]+$ ]] \
  || skip "Set UNPEEL_SESSION_ID to a shell session in the isolated Unpeel Dev workspace."
command -v jq >/dev/null || fail "Install jq to read computer tool results."
jq -e '.computer_use == "allow"' "$UNPEEL_HOME/app-state.json" >/dev/null \
  || skip "Set Computer use to Allow in the isolated Unpeel Dev workspace."
jq -e '.computer_unrestricted != true' "$UNPEEL_HOME/app-state.json" >/dev/null \
  || skip "Turn off Let agents control any app to verify the default app tiers."

unpeel_bin=${UNPEEL_BIN:-}
if [[ -z "$unpeel_bin" && -n "${UNPEEL_HOST_BIN:-}" ]]; then
  unpeel_bin="$(dirname -- "$UNPEEL_HOST_BIN")/unpeel"
fi
if [[ ! -x "$unpeel_bin" ]]; then
  unpeel_bin=$(command -v unpeel) || fail "Set UNPEEL_BIN to the Unpeel Dev CLI."
fi
computer() { "$unpeel_bin" mcp computer "$@"; }

if ! status=$(computer status 2>&1); then
  case "$status" in
    *"connected computer adapter"*|*"Could not reach the workspace Host"*) skip "$status" ;;
    *) fail "computer status: $status" ;;
  esac
fi
jq -e '.ok == true and .available == true' <<< "$status" >/dev/null \
  || fail "Unexpected computer status: $status"
jq -e '.screen_recording == true and .accessibility == true' <<< "$status" >/dev/null \
  || skip "Grant Screen Recording and Accessibility to Unpeel Dev in Settings ▸ Computer use."

# Apple events independently check the scratch window and its contents. Only
# Unpeel sends mouse and keyboard input. Always scope cleanup to this file.
textedit() {
  osascript - "$1" "${document:-}" <<'APPLESCRIPT'
on run argv
    set operation to item 1 of argv
    set scratchPath to item 2 of argv
    if operation is "close" and application id "com.apple.TextEdit" is not running then return
    tell application id "com.apple.TextEdit"
        if operation is "probe" then return count of documents
        if operation is "close" then
            repeat with scratchDocument in (every document whose path is scratchPath)
                close (contents of scratchDocument) saving no
            end repeat
            return
        end if
        if not frontmost or (count of windows) is 0 then error "TextEdit is not frontmost with an open window."
        set scratchDocument to document of front window
        if (path of scratchDocument) is not scratchPath then error "The scratch document is not the front TextEdit window."
        if operation is "bounds" then return bounds of front window
        if operation is "contents" then return text of scratchDocument as text
    end tell
end run
APPLESCRIPT
}

screenshot_dir="$UNPEEL_HOME/app-sessions/$UNPEEL_SESSION_ID/artifacts/computer/screenshots"
frame() {
  local action=$1 result screenshot_path screenshot_parent
  shift
  result=$(computer "$action" "$@" 2>&1) || fail "computer $action: $result"
  screenshot_path=$(jq -er 'select(.ok == true and .width > 0 and .height > 0) | .screenshot_path | strings' <<< "$result") \
    || fail "computer $action did not return a screenshot: $result"
  [[ "$screenshot_path" == *.png && -s "$screenshot_path" ]] \
    || fail "Missing PNG screenshot: $screenshot_path"
  screenshot_parent=$(cd -- "$(dirname -- "$screenshot_path")" && pwd -P)
  [[ "$screenshot_parent" == "$screenshot_dir" ]] || fail "Unexpected screenshot path: $screenshot_path"
  printf '%s\n' "$result"
}

main_display=$(jq -er '.displays[] | select(.main == true) | .index' <<< "$status") \
  || fail "computer status did not list a main display."
default_frame=$(frame screenshot)
jq -e --argjson index "$main_display" '.display == $index' <<< "$default_frame" >/dev/null \
  || fail "The default screenshot did not capture the main display."
pass "default screenshot saved the main display as a session artifact"

while IFS= read -r index; do
  shot=$(frame screenshot "display=$index")
  jq -e --argjson index "$index" '.display == $index' <<< "$shot" >/dev/null \
    || fail "Expected a screenshot of display $index: $shot"
  pass "captured display $index"
done < <(jq -r '.displays[] | .index' <<< "$status")

# Test launch before AppleScript or opening the scratch document can start TextEdit.
previous_app=$(jq -er '.frontmost_app.bundle_id // empty' <<< "$status")
background=$(frame open_app text=com.apple.TextEdit)
jq -e --arg app "$previous_app" '.frontmost_app.bundle_id == $app' <<< "$background" >/dev/null \
  || fail "Background open changed the foreground app: $background"
pass "open_app left the foreground app unchanged"

opened=$(frame open_app text=com.apple.TextEdit activate=true)
jq -e '.frontmost_app.bundle_id == "com.apple.TextEdit"' <<< "$opened" >/dev/null \
  || fail "open_app did not activate TextEdit: $opened"
pass "open_app activated TextEdit"

if ! automation=$(textedit probe 2>&1); then
  case "$automation" in
    *"(-1743)"*) skip "Allow this shell to control TextEdit in macOS Privacy & Security ▸ Automation." ;;
    *) fail "Could not query TextEdit: $automation" ;;
  esac
fi


scratch=$(mktemp -d /private/tmp/up-computer-doc.XXXXXX)
document="$scratch/$(basename "$scratch").txt"
cleanup() {
  if ! textedit close >/dev/null; then
    fail "Could not close the scratch document without saving. Scratch file: $document"
  fi
  rm -f -- "$document"
  rmdir -- "$scratch"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
: > "$document"

open -g -b com.apple.TextEdit "$document"
frame open_app text=com.apple.TextEdit activate=true >/dev/null
# Opening the document and making its window key can finish on different turns.
for ((attempt = 0; attempt < 20; attempt++)); do
  if bounds=$(textedit bounds 2>/dev/null); then break; fi
  sleep 0.1
done
[[ -n "$bounds" ]] || fail "Could not locate the scratch TextEdit window."
# Choose the display with the largest portion of the editable window and use
# its Quartz origin and screenshot size to convert points to image pixels.
target=$(jq -ec --arg bounds "$bounds" '
  ($bounds | split(",") | map(tonumber)) as [$left, $top, $right, $bottom]
  | [.displays[]
     | ([.x, $left + 25] | max) as $x0 | ([.x + .width, $right - 25] | min) as $x1
     | ([.y, $top + 70] | max) as $y0 | ([.y + .height, $bottom - 30] | min) as $y1
     | select($x1 > $x0 and $y1 > $y0)
     | {index, area: (($x1 - $x0) * ($y1 - $y0)),
        fraction: [((($x0 + $x1) / 2 - .x) / .width),
                   ((($y0 + $y1) / 2 - .y) / .height)]}]
  | max_by(.area) | select(. != null)
' <<< "$status") || fail "The editable scratch window is outside the listed displays."
index=$(jq -er '.index' <<< "$target")
shot=$(frame screenshot "display=$index")
coordinate=$(jq -ec --argjson target "$target" '
  [((.width * $target.fraction[0]) | floor), ((.height * $target.fraction[1]) | floor)]
' <<< "$shot")
clicked=$(frame left_click "coordinate=$coordinate")
jq -e --argjson display "$index" '.display == $display and .frontmost_app.bundle_id == "com.apple.TextEdit"' \
  <<< "$clicked" >/dev/null || fail "left_click changed apps or the active screenshot display: $clicked"
pass "left_click kept the scratch window frontmost on display $index"

marker="Unpeel computer check 🙂"
contents=$(textedit contents) || fail "The scratch TextEdit document lost focus."
[[ -z "$contents" ]] || fail "The scratch document should be empty before typing."
# A previous shortcut must not leave Command set on the Unicode events.
frame key text=cmd+a app=com.apple.TextEdit >/dev/null
frame type app=com.apple.TextEdit "text=${marker}X" >/dev/null
[[ "$(textedit contents)" == "${marker}X" ]] || fail "TextEdit did not receive the typed text."
pass "type inserted the test text"
frame key text=BackSpace >/dev/null
[[ "$(textedit contents)" == "$marker" ]] || fail "BackSpace did not remove the final character."
pass "key removed the final character"

if refused=$(computer open_app text=com.apple.Safari 2>&1); then
  fail "computer open_app unexpectedly allowed Safari"
fi
[[ "$refused" == *"is read-only in computer use. Use the Unpeel browser tool"* ]] \
  || fail "Expected a browser read-only error: $refused"
pass "Safari is read-only through computer use"

trap - EXIT
cleanup
pass "closed the scratch TextEdit document without saving"
