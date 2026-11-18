## Multi-folder projects (protocol minor 25, `project.folders`)

A project can span several folders. Each folder has an optional display name
and an optional icon. The first folder is the **primary** and always equals
the project's `path`, so everything keyed on `path` (sessions, worktrees,
hooks, dedupe) keeps working. Sessions start in a chosen folder (the primary
by default). Groups stay project-wide: a group launches in a folder of its
parent project. Worktree children are a single checkout and ignore folders.

### Record (`app-state.json`)

`Project.folders` (`crates/unpeel-core/src/state.rs`, `ProjectFolder`):

```json
{ "id": "p1", "name": "App", "path": "/src/app",
  "folders": [
    { "path": "/src/app", "name": "Web", "icon": "glyph:globe" },
    { "path": "/src/api", "icon": "emoji:🛠" }
  ] }
```

- Absent or empty means a single-folder project at `path`. The key is
  omitted when empty.
- When non-empty, `folders[0].path == path`. Every writer that sets folders
  also sets `path`.
- Writers that do not know about folders must keep the key. The Rust JSON
  editors (`app_state::edit`) and the typed `AppState` both keep it.
- A malformed list costs the reader only that field. The row and the
  document still load.

There is one shared validator, `state::validate_project_folders` (also
`parse_project_folders_value` for JSON input). Every Host route uses it:

- Paths must be absolute, non-empty, at most 16 KiB, and contain no control
  characters (the session environment joins them with newlines).
  Trailing slashes are stripped (`/` stays `/`). Duplicate paths are
  rejected.
- A name is trimmed and must be 1..=200 bytes with no control characters.
  An empty name counts as absent.
- An icon is `emoji:<text>` (1..=32 bytes, no control characters) or
  `glyph:<id>` (`^[a-z0-9-]{1,32}$`). Unknown glyph ids are allowed, and
  clients fall back to their default icon. An empty icon counts as absent.
- A project can have at most 32 folders.

`Project.agent_folder_access` (bool, omitted when false) is the opt-in that
lets agents work in every folder without per-folder approval (see
[Agents](#agents)). It is meaningful only on a top-level, non-worktree
project; a plain group uses its parent's value
(`state::effective_agent_folder_access`), and worktree children never have it.

### Wire

- **Bootstrap** `projects[]` rows carry `folders: [{path, name?, icon?}]`
  only when the record has at least one folder. Groups and worktree children
  carry only their own record's folders, which are normally none. Clients
  resolve a group's folders through `parentProjectID`. Top-level,
  non-worktree rows also carry `agentFolderAccess: true` when the toggle is
  on (the key is omitted otherwise, and never sent on groups or children). Rust mirror:
  `RemoteProjectSummary.folders` / `RemoteProjectFolderEntry`.
- **Create** (`POST /mobile/sessions`) accepts an optional `folderPath`.
  The Host builds each catalog row's effective folder list:
  1. the project's own folders;
  2. otherwise, for a plain group, its parent's folders;
  3. otherwise empty.

  A `folderPath` must equal one of those folders (or `path` when the list is
  empty), after trailing-slash normalization. Otherwise the Host returns
  400 `folder does not belong to project`. A worktree child always rejects
  `folderPath`. The request can never introduce a path. The working
  directory is, in order: `folderPath`, then the first effective folder,
  then the worktree checkout, then `path`. For a group with a multi-folder
  parent, the default is the parent's primary, not the group's stale copied
  path. A Controller that sends `folderPath` needs `project.folders`; the
  Rust backend checks for it.
- **project.add** (`POST /mobile/projects/add`) accepts an optional `name`
  and `folders`. Each folder is proven inside the Host resource scope, just
  like `path`. With folders, `path` may be omitted (or `""`) and becomes
  `folders[0].path`. If both are given they must match. Dedupe still
  compares the primary path only. An optional boolean `agentFolderAccess`
  sets the toggle on the new project (the bridge's string resource
  parameter takes `"true"`/`"false"`; a non-boolean is 400).
- **project.organization.set** (`POST /mobile/project-organization`) accepts
  `folders`, which replaces the list wholesale. This is allowed only for a
  top-level project that is not a worktree or a group. It sets
  `path = folders[0].path` and moves every plain group child whose `path`
  equaled the old primary. `[]` clears the list and keeps the current path.
  Validation runs before any write, and folders apply first in a compound
  patch (`session_ops::set_project_folders`). A project known only to the
  desktop overlay (not in `app-state.json`) fails with 500 before anything
  applies.
  It also accepts `agentFolderAccess: Bool` (on/off) under the same
  top-level-only rule: a group, a child, or a worktree gets 400, and so does
  a non-boolean. Both fields are gated by `project.folders`.

### Agents

A Session whose project has two or more effective folders gets
`UNPEEL_PROJECT_FOLDERS` in the generic session environment
(`integrations::configure_host_command`). It holds the folders separated by
newlines, primary first, and is read from `app-state.json` at every launch,
restart, and resume. Otherwise it is unset.

**Agent folder access (the one exception to plain launches).** When the
project's effective `agent_folder_access` is on, the project has two or more
effective folders, the command is one simple command (no unquoted
`; & | < > ( ) $ \``, comment, newline, or `--`), and its head resolves to a
runtime whose adapter declares `extra_dirs`, the Host appends that runtime's
workspace-dir flags for every effective folder except the Session's cwd,
shell-quoted, at EXEC time only:

| Runtime | Flags (`runtimes/<slug>/adapter/folders.rs`) |
| --- | --- |
| claude-code | `--add-dir <dir>` per folder |
| codex | `--add-dir <dir>` per folder (also valid after `codex resume`) |
| gemini | `--include-directories <d1>,<d2>` (folders containing a comma are skipped) |

`integrations::folder_access_exec_command` decides; `session_host::run_host`
applies it to the initial launch and `folder_access_relaunch_command` to the
in-place agent restart/resume (which also re-exports both variables for the
long-lived shell). The stored Session command, the manifest, history, and
resume recipes never carry the flags, so turning the toggle off takes effect
on the next launch. When the flags were appended the Session also gets
`UNPEEL_PROJECT_FOLDERS_ACCESS=1`; otherwise that variable is unset.

Claude Code's SessionStart hook (`runtimes/claude-code/assets/hooks/
lifecycle.sh`) prints `{"hookSpecificOutput":{"hookEventName":"SessionStart",
"additionalContext":"…"}}` when `UNPEEL_PROJECT_FOLDERS` is set: the folder
list (primary first) plus "You can read and edit all of them." with access
on, or "Access outside the current folder may require the user's approval."
otherwise. Gemini and Codex hooks do not add context yet; their agents see
only the flags and the environment.

Agents can also discover the folders in two other places:

- `sessions current` (MCP) reports `project_folders` (full entries).
- The App Kit context (`/app-context` `project.folders`) reports them too.
  A group reports its parent's list there.

`unpeel projects list` prints the extra folders indented under the primary.
