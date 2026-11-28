//! Per-folder session ordering, shared by Host projections and Controllers.

use serde::{Deserialize, Serialize};
use std::cmp::Reverse;

#[derive(Clone, Copy, Debug, Default, Eq, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum SessionSortMode {
    #[default]
    Manual,
    Updated,
    Created,
}

impl SessionSortMode {
    pub fn from_stored(value: Option<&str>) -> Self {
        match value {
            Some("date") => Self::Updated,
            Some("created") => Self::Created,
            _ => Self::Manual,
        }
    }

    pub fn stored_value(self) -> Option<&'static str> {
        match self {
            Self::Manual => None,
            Self::Updated => Some("date"),
            Self::Created => Some("created"),
        }
    }

    pub fn from_legacy(date_sorted: bool) -> Self {
        if date_sorted {
            Self::Updated
        } else {
            Self::Manual
        }
    }

    /// The caller partitions pins and live/stopped rows before applying this
    /// key. Only Updated gives working rows priority.
    pub fn date_key(
        self,
        created_at: u64,
        lifecycle_at: u64,
        working: bool,
    ) -> (bool, Reverse<u64>) {
        match self {
            Self::Created => (false, Reverse(created_at)),
            Self::Updated | Self::Manual => (
                self == Self::Updated && !working,
                Reverse(created_at.max(lifecycle_at)),
            ),
        }
    }

    #[cfg(feature = "native-host")]
    pub fn write_summary(self, project: &mut serde_json::Map<String, serde_json::Value>) {
        project.insert("sessionSortMode".into(), serde_json::json!(self));
        if self != Self::Manual {
            project.insert("dateSorted".into(), true.into());
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn stored_values_round_trip_and_unknown_defaults_to_manual() {
        for mode in [
            SessionSortMode::Manual,
            SessionSortMode::Updated,
            SessionSortMode::Created,
        ] {
            assert_eq!(SessionSortMode::from_stored(mode.stored_value()), mode);
        }
        for unknown in ["", "updated", "future"] {
            assert_eq!(
                SessionSortMode::from_stored(Some(unknown)),
                SessionSortMode::Manual
            );
        }
    }
}
