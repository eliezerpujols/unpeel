// Workspace-dir adapter for project folders (`agent_folder_access`). Applied
// by the Host at exec time only, never to the stored launch command. Gemini
// CLI takes one comma-separated `--include-directories` list; a folder whose
// path contains a comma cannot be expressed and is left out.
use crate::integrations::shared::shell_quote;

pub(super) fn extra_dirs(command: &str, dirs: &[String]) -> String {
    let dirs: Vec<&str> = dirs
        .iter()
        .map(String::as_str)
        .filter(|dir| !dir.contains(','))
        .collect();
    if dirs.is_empty() {
        return command.to_string();
    }
    format!(
        "{} --include-directories {}",
        command.trim_end(),
        shell_quote(&dirs.join(","))
    )
}

#[cfg(test)]
mod folder_tests {
    use super::*;

    #[test]
    fn dirs_are_one_quoted_comma_list() {
        assert_eq!(
            extra_dirs("gemini", &["/src/my api".into(), "/a,b".into(), "/docs".into()]),
            "gemini --include-directories '/src/my api,/docs'"
        );
        assert_eq!(extra_dirs("gemini", &["/a,b".into()]), "gemini");
    }
}
