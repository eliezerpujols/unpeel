// Workspace-dir adapter for project folders (`agent_folder_access`). Applied
// by the Host at exec time only, never to the stored launch command. Claude's
// `--add-dir <directories...>` is variadic, so the flags go at the end where
// they cannot swallow a positional prompt.
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
    fn each_dir_is_its_own_quoted_add_dir() {
        assert_eq!(
            extra_dirs("claude --resume 'a1' ", &["/src/my api".into(), "/it's".into()]),
            "claude --resume 'a1' --add-dir '/src/my api' --add-dir '/it'\"'\"'s'"
        );
    }
}
