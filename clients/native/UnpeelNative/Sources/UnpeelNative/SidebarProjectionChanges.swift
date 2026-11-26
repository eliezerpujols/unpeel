import Foundation
import UnpeelShared

enum SidebarSessionAge {
    private static let visibleInterval: TimeInterval = 7 * 24 * 60 * 60

    static func cutoff(for session: SessionEntry) -> Date? {
        guard !session.runtimeLaunchPending else { return nil }
        switch session.status {
        case .idle, .exited:
            let latest = max(session.createdAt, session.lifecycleAtMs ?? 0)
            return Date(timeIntervalSince1970: Double(latest) / 1_000 + visibleInterval)
        case .starting, .busy, .attention:
            return nil
        }
    }
}

enum SidebarProjectionChanges {
    /// Cache inputs are per-project rows, mixed order, and pin/unread
    /// flags. A status change in one folder must not evict every other list.
    static func affectedProjects(
        previous: [ProjectNode], next: [ProjectNode],
        previousSummaries: [String: RemoteSessionSummary],
        nextSummaries: [String: RemoteSessionSummary],
        previousProjects: [String: RemoteProjectSummary],
        nextProjects: [String: RemoteProjectSummary],
        previousOrder: [String: [String]], nextOrder: [String: [String]]
    ) -> Set<String> {
        func index(_ roots: [ProjectNode]) -> [String: ProjectNode] {
            var result: [String: ProjectNode] = [:]
            var pending = roots
            while let node = pending.popLast() {
                result[node.id] = node
                pending.append(contentsOf: node.worktrees)
            }
            return result
        }
        let old = index(previous)
        let new = index(next)
        var changed = Set(old.keys).symmetricDifference(new.keys)
        for (id, node) in new {
            guard let prior = old[id] else { continue }
            if prior.project != node.project || prior.sessions != node.sessions
                || prior.worktrees.map(\.id) != node.worktrees.map(\.id)
                || previousProjects[id] != nextProjects[id]
                || previousOrder[id] != nextOrder[id] {
                changed.insert(id)
                continue
            }
            for session in node.sessions {
                let lhs = previousSummaries[session.id]
                let rhs = nextSummaries[session.id]
                if lhs?.pinned != rhs?.pinned || lhs?.unread != rhs?.unread {
                    changed.insert(id)
                    break
                }
            }
        }
        return changed
    }
}
