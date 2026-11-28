import UnpeelShared

extension SessionEntry {
    var lifecycleSortTimestampMs: Int64 {
        max(createdAt, lifecycleAtMs ?? 0)
    }
}

extension SessionSortMode {
    init(storedValue: String?) {
        switch storedValue {
        case "date": self = .updated
        case "created": self = .created
        default: self = .manual
        }
    }

    var storedValue: String? {
        switch self {
        case .updated: return "date"
        case .created: return "created"
        case .manual: return nil
        }
    }

    func ageTimestampMs(for session: SessionEntry) -> Int64? {
        switch self {
        case .updated: return session.lifecycleSortTimestampMs
        case .created: return session.createdAt
        case .manual: return nil
        }
    }

    func sortedByDate(
        _ sessions: [SessionEntry],
        restartingSessionIDs: Set<String> = []
    ) -> [SessionEntry] {
        func isWorking(_ session: SessionEntry) -> Bool {
            session.status == .starting || session.status == .busy
                || restartingSessionIDs.contains(session.id)
        }
        return sessions.sorted { lhs, rhs in
            if self == .updated, isWorking(lhs) != isWorking(rhs) {
                return isWorking(lhs)
            }
            let a = ageTimestampMs(for: lhs) ?? lhs.lifecycleSortTimestampMs
            let b = ageTimestampMs(for: rhs) ?? rhs.lifecycleSortTimestampMs
            return a == b ? lhs.id < rhs.id : a > b
        }
    }

    /// Pins are handled separately. Live rows stay ahead of the stopped
    /// section, including while a session is being restarted.
    func sidebarSections(
        _ sessions: [SessionEntry],
        manualOrder: [String],
        restartingSessionIDs: Set<String> = []
    ) -> (live: [SessionEntry], stopped: [SessionEntry]) {
        let live = sessions.filter { $0.isLive || restartingSessionIDs.contains($0.id) }
        let stopped = sessions.filter { !$0.isLive && !restartingSessionIDs.contains($0.id) }
        guard self == .manual else {
            return (
                sortedByDate(live, restartingSessionIDs: restartingSessionIDs),
                sortedByDate(stopped)
            )
        }

        let ranks = Dictionary(
            manualOrder.enumerated().map { ($0.element, $0.offset) },
            uniquingKeysWith: { first, _ in first }
        )
        func byManualRank(_ lhs: SessionEntry, _ rhs: SessionEntry) -> Bool {
            // New sessions without a saved rank lead the hand-ordered block.
            let a = ranks[lhs.id] ?? -1
            let b = ranks[rhs.id] ?? -1
            if a != b { return a < b }
            if lhs.createdAt != rhs.createdAt { return lhs.createdAt > rhs.createdAt }
            return lhs.id < rhs.id
        }
        return (
            live.sorted(by: byManualRank),
            ranks.isEmpty ? sortedByDate(stopped) : stopped.sorted(by: byManualRank)
        )
    }
}
