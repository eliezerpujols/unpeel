import Foundation
import XCTest
@testable import UnpeelNative

/// Files panes (picker ▸ Files): Mac-only view state on the pane tree.
final class FilesPaneTests: XCTestCase {
    private let paneA = "00000000-0000-4000-8000-00000000000a"
    private let paneB = "00000000-0000-4000-8000-00000000000b"
    private let paneL = "00000000-0000-4000-8000-00000000000c"
    private let groupID = "11111111-0000-4000-8000-000000000001"

    private func soloPlusLauncher() throws -> PaneLayoutState {
        var state = PaneLayoutState()
        try state.insertLauncher(
            projectID: "p1",
            beside: "s1",
            at: .right,
            newGroupID: groupID,
            newRepresentativePaneID: paneA,
            newPaneID: paneL
        )
        return state
    }

    func testLauncherBecomesFilesOfPrimaryFolder() throws {
        var state = try soloPlusLauncher()
        try state.bindLauncher(paneL, toFilesOf: "p1")
        let pane = try XCTUnwrap(state.groups.first?.root.leaf(id: paneL))
        XCTAssertEqual(pane.content, .files(projectID: "p1", folderPath: nil))
        XCTAssertFalse(state.groups[0].root.containsLauncher)
        XCTAssertTrue(state.groups[0].root.containsCompanion)
    }

    func testFolderDropdownRepointsThePane() throws {
        var state = try soloPlusLauncher()
        try state.bindLauncher(paneL, toFilesOf: "p1")
        try state.setFilesFolder(paneL, folderPath: "/work/api")
        XCTAssertEqual(
            state.groups[0].root.leaf(id: paneL)?.content,
            .files(projectID: "p1", folderPath: "/work/api")
        )
        XCTAssertThrowsError(try state.setFilesFolder(paneA, folderPath: "/x"))
    }

    func testFilesPaneKeepsOneSessionGroupedAndAllowsANewLauncher() throws {
        var state = try soloPlusLauncher()
        try state.bindLauncher(paneL, toFilesOf: "p1")
        // A Files pane is not a launcher: ⌘D can still open one beside it.
        try state.insertLauncher(projectID: "p1", splitting: paneA, edge: .down, newPaneID: paneB)
        try state.removeLauncher(paneB)
        XCTAssertEqual(state.groups.count, 1)
        XCTAssertEqual(state.groups[0].root.sessionLeaves.map(\.id), [paneA])
    }

    func testFilesPanesNeverReachTheSharedDurableLayout() throws {
        let group = PaneGroup(
            id: groupID,
            representativePaneID: paneA,
            root: .split(PaneSplit(
                direction: .horizontal,
                ratio: 0.5,
                left: .split(PaneSplit(
                    direction: .vertical,
                    ratio: 0.5,
                    left: .leaf(Pane(id: paneA, content: .session(id: "s1"))),
                    right: .leaf(Pane(id: paneB, content: .session(id: "s2")))
                )),
                right: .leaf(Pane(id: paneL, content: .files(projectID: "p1", folderPath: nil)))
            ))
        )
        let durable = try XCTUnwrap(DurablePaneGroup(group: group))
        let restored = durable.root.paneNode()
        XCTAssertEqual(restored.leaves.map(\.id), [paneA, paneB])
        XCTAssertFalse(restored.containsFiles)

        // One Session + Files is view state only: nothing durable.
        let solo = PaneGroup(
            id: groupID,
            representativePaneID: paneA,
            root: .split(PaneSplit(
                direction: .horizontal,
                ratio: 0.5,
                left: .leaf(Pane(id: paneA, content: .session(id: "s1"))),
                right: .leaf(Pane(id: paneL, content: .files(projectID: "p1", folderPath: nil)))
            ))
        )
        XCTAssertNil(DurablePaneGroup(group: solo))
    }

    func testListingPutsFoldersFirstAndSkipsGitInternals() throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("files-pane-\(UUID().uuidString)")
        defer { try? FileManager.default.removeItem(at: root) }
        let fm = FileManager.default
        try fm.createDirectory(at: root.appendingPathComponent("src"), withIntermediateDirectories: true)
        try fm.createDirectory(at: root.appendingPathComponent(".git"), withIntermediateDirectories: true)
        try Data().write(to: root.appendingPathComponent("b.swift"))
        try Data().write(to: root.appendingPathComponent("A.md"))
        try Data().write(to: root.appendingPathComponent(".DS_Store"))

        let entries = try XCTUnwrap(FileTreeListing.children(of: root.path))
        XCTAssertEqual(entries.map(\.name), ["src", "A.md", "b.swift"])
        XCTAssertNil(FileTreeListing.children(of: root.appendingPathComponent("missing").path))

        XCTAssertEqual(FileTreeListing.symbol(for: entries[0], expanded: false), "folder")
        XCTAssertEqual(FileTreeListing.symbol(for: entries[0], expanded: true), "folder.fill")
        XCTAssertEqual(FileTreeListing.symbol(for: entries[1], expanded: false), "doc.plaintext")
        XCTAssertEqual(FileTreeListing.symbol(for: entries[2], expanded: false), "swift")
    }
}
