import Foundation
import UnpeelShared
import XCTest
@testable import UnpeelNative

final class SessionSortModeTests: XCTestCase {
    func testStoredValuesAndLegacyProjectSummaries() throws {
        for mode in SessionSortMode.allCases {
            XCTAssertEqual(SessionSortMode(storedValue: mode.storedValue), mode)
        }
        XCTAssertEqual(SessionSortMode(storedValue: "date"), .updated)
        XCTAssertEqual(SessionSortMode(storedValue: "updated"), .manual)
        XCTAssertEqual(SessionSortMode(storedValue: "future"), .manual)

        let state = try JSONDecoder().decode(
            AppStateFile.self,
            from: Data(#"{"projects":[],"session_sort_modes":{"old":"date","new":"created","unknown":true}}"#.utf8)
        )
        XCTAssertEqual(SessionSortMode(storedValue: state.sessionSortModes["old"]), .updated)
        XCTAssertEqual(SessionSortMode(storedValue: state.sessionSortModes["new"]), .created)
        XCTAssertEqual(SessionSortMode(storedValue: state.sessionSortModes["unknown"]), .manual)

        func mode(_ fields: String) throws -> SessionSortMode {
            let json = "{\"id\":\"p\",\"name\":\"Folder\",\"path\":\"/tmp\",\"mcpBlocked\":false\(fields)}"
            return try JSONDecoder().decode(RemoteProjectSummary.self, from: Data(json.utf8))
                .resolvedSessionSortMode
        }
        XCTAssertEqual(try mode(""), .manual)
        XCTAssertEqual(try mode(",\"dateSorted\":false"), .manual)
        XCTAssertEqual(try mode(",\"dateSorted\":true"), .updated)
        XCTAssertEqual(try mode(",\"dateSorted\":true,\"sessionSortMode\":\"created\""), .created)
        XCTAssertEqual(try mode(",\"dateSorted\":true,\"sessionSortMode\":\"future\""), .manual)
    }

    func testSidebarOrdersBothSectionsAndUsesTheMatchingAge() {
        func entry(_ id: String, status: SessionStatus, created: Int64, activity: Int64?) -> SessionEntry {
            var session = SessionEntry(
                id: id, projectID: "p", label: id, command: "claude",
                createdAt: created, status: status
            )
            session.lifecycleAtMs = activity
            return session
        }
        let busy = entry("busy-old", status: .busy, created: 1, activity: 10)
        let live = entry("idle-new", status: .idle, created: 20, activity: nil)
        let old = entry("stopped-old", status: .exited, created: 2, activity: 50)
        let new = entry("stopped-new", status: .exited, created: 30, activity: nil)
        let rows = [old, live, busy, new]
        let saved = [busy.id, live.id, new.id, old.id]

        for (mode, expected) in [
            (SessionSortMode.updated, [busy.id, live.id, old.id, new.id]),
            (.created, [live.id, busy.id, new.id, old.id]),
            (.manual, saved),
        ] {
            let sections = mode.sidebarSections(rows, manualOrder: saved)
            XCTAssertEqual((sections.live + sections.stopped).map(\.id), expected)
        }
        XCTAssertEqual(SessionSortMode.updated.ageTimestampMs(for: old), 50)
        XCTAssertEqual(SessionSortMode.updated.ageTimestampMs(for: new), 30)
        XCTAssertEqual(SessionSortMode.created.ageTimestampMs(for: old), 2)
        XCTAssertNil(SessionSortMode.manual.ageTimestampMs(for: old))
    }
}
