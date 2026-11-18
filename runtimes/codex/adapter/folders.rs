// Workspace-dir adapter for project folders (`agent_folder_access`). Applied
// by the Host at exec time only, never to the stored launch command. Codex
// accepts `--add-dir <DIR>` (repeatable) on the TUI and on `codex resume`.
use crate::integrations::shared::shell_quote;

pub(super) fn extra_dirs(command: &str, dirs: &[String]) -> String {
    let mut out = command.trim_end().to_string();
    for dir in dirs {
        out.push_str(" --add-dir ");
        out.push_str(&shell_quote(dir));
    }
    out
}

#[cfg(test)]
mod folder_tests {
    use super::*;

    #[test]
    fn resume_recipes_keep_their_subcommand() {
        assert_eq!(
            extra_dirs("codex resume 't1' --full-auto", &["/src/my api".into()]),
            "codex resume 't1' --full-auto --add-dir '/src/my api'"
        );
    }
}
