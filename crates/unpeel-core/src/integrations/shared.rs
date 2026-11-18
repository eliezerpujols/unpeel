use std::path::Path;

pub fn command_head(command: &str) -> &str {
    let head = command.split_whitespace().next().unwrap_or_default();
    Path::new(head)
        .file_name()
        .and_then(|value| value.to_str())
        .unwrap_or(head)
}

/// Whether `command` is one plain POSIX simple command: no unquoted control
/// operators, redirections, substitutions, comments, line breaks, or a `--`
/// end-of-options marker. Only such a command can take appended flags without
/// changing what else it runs.
pub fn is_simple_command(command: &str) -> bool {
    let mut single = false;
    let mut double = false;
    let mut escaped = false;
    let mut at_word_start = true;
    let mut word = String::new();
    for ch in command.chars() {
        if escaped {
            escaped = false;
            word.push(ch);
            at_word_start = false;
            continue;
        }
        if single {
            if ch == '\'' {
                single = false;
            }
            continue;
        }
        if double {
            match ch {
                '"' => double = false,
                '\\' => escaped = true,
                '$' | '`' => return false,
                _ => {}
            }
            continue;
        }
        match ch {
            '\'' => {
                single = true;
                at_word_start = false;
            }
            '"' => {
                double = true;
                at_word_start = false;
            }
            '\\' => escaped = true,
            ';' | '&' | '|' | '<' | '>' | '(' | ')' | '`' | '$' | '\n' | '\r' => return false,
            '#' if at_word_start => return false,
            ' ' | '\t' => {
                if word == "--" {
                    return false;
                }
                word.clear();
                at_word_start = true;
            }
            _ => {
                word.push(ch);
                at_word_start = false;
            }
        }
    }
    !single && !double && !escaped && word != "--"
}

pub fn shell_quote(value: &str) -> String {
    format!("'{}'", value.replace('\'', r#"'"'"'"#))
}

pub fn shell_name(shell_path: &str) -> String {
    Path::new(shell_path)
        .file_name()
        .and_then(|name| name.to_str())
        .unwrap_or(shell_path)
        .to_ascii_lowercase()
}
