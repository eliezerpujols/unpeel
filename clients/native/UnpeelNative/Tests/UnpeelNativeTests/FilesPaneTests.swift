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

    // MARK: - Persistence (Mac-only companion file)

    private func soloFilesGroup(folder: String? = "/work/api") -> PaneGroup {
        PaneGroup(
            id: groupID,
            representativePaneID: paneA,
            root: .split(PaneSplit(
                direction: .horizontal,
                ratio: 0.6,
                left: .leaf(Pane(id: paneA, content: .session(id: "s1"))),
                right: .leaf(Pane(id: paneL, content: .files(projectID: "p1", folderPath: folder)))
            ))
        )
    }

    @MainActor
    func testFilesPaneSurvivesRelaunch() throws {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("fp-\(UUID().uuidString.prefix(8))")
        defer { try? FileManager.default.removeItem(at: dir) }
        let layoutURL = dir.appendingPathComponent(PaneLayoutController.storageFileName)

        let first = PaneLayoutController(fileURL: layoutURL)
        try first.mutate { state in
            try state.insertLauncher(
                projectID: "p1", beside: "s1", at: .right,
                newGroupID: groupID, newRepresentativePaneID: paneA, newPaneID: paneL
            )
            try state.bindLauncher(paneL, toFilesOf: "p1")
            try state.setFilesFolder(paneL, folderPath: "/work/api")
        }

        // The shared file stays free of Files leaves …
        let shared = try String(contentsOf: layoutURL, encoding: .utf8)
        XCTAssertFalse(shared.contains("files"))

        // … and a fresh controller (relaunch) restores the pane and folder.
        let second = PaneLayoutController(fileURL: layoutURL)
        XCTAssertEqual(
            second.state.groups.first?.root.leaf(id: paneL)?.content,
            .files(projectID: "p1", folderPath: "/work/api")
        )
        XCTAssertEqual(second.state.groups.first?.root.sessionLeaves.map(\.id), [paneA])

        // Closing the Files pane forgets it.
        try second.mutate { state in state = PaneLayoutState() }
        XCTAssertTrue(PaneLayoutController(fileURL: layoutURL).state.groups.isEmpty)
    }

    func testOverlayRestoresFilesIntoMatchingSharedGroup() throws {
        let full = PaneGroup(
            id: groupID,
            representativePaneID: paneA,
            root: .split(PaneSplit(
                direction: .horizontal, ratio: 0.5,
                left: .split(PaneSplit(
                    direction: .vertical, ratio: 0.5,
                    left: .leaf(Pane(id: paneA, content: .session(id: "s1"))),
                    right: .leaf(Pane(id: paneB, content: .session(id: "s2")))
                )),
                right: .leaf(Pane(id: paneL, content: .files(projectID: "p1", folderPath: nil)))
            ))
        )
        let record = try XCTUnwrap(FilesPaneGroupRecord(group: full))
        let durable = try XCTUnwrap(DurablePaneGroup(group: full))
        let base = PaneLayoutState(groups: [PaneGroup(
            id: groupID, representativePaneID: paneA, root: durable.root.paneNode()
        )])
        XCTAssertEqual(base.overlayingFilesPanes([record]).groups.first?.root, full.root)
    }

    func testOverlayNeverOverridesAnotherFrontendsChange() throws {
        let record = try XCTUnwrap(FilesPaneGroupRecord(group: soloFilesGroup()))
        // s1 got grouped with s2 elsewhere since: the Files record is dropped.
        let other = PaneGroup(
            id: "other",
            representativePaneID: paneB,
            root: .split(PaneSplit(
                direction: .horizontal, ratio: 0.5,
                left: .leaf(Pane(id: paneB, content: .session(id: "s1"))),
                right: .leaf(Pane(id: "pz", content: .session(id: "s2")))
            ))
        )
        let base = PaneLayoutState(groups: [other])
        XCTAssertEqual(base.overlayingFilesPanes([record]), base)
        // Nothing grouped: the one-Session + Files group comes back.
        XCTAssertEqual(
            PaneLayoutState().overlayingFilesPanes([record]).groups.first?.root,
            soloFilesGroup().root
        )
    }

    func testRecordCodableRoundTrip() throws {
        let record = try XCTUnwrap(FilesPaneGroupRecord(group: soloFilesGroup(folder: nil)))
        let data = try JSONEncoder().encode(record)
        XCTAssertEqual(try JSONDecoder().decode(FilesPaneGroupRecord.self, from: data), record)
    }

    func testSearchFindsNamesRanksBestFirstAndSkipsDependencies() throws {
        let root = FileManager.default.temporaryDirectory
            .appendingPathComponent("files-search-\(UUID().uuidString)")
        defer { try? FileManager.default.removeItem(at: root) }
        let fm = FileManager.default
        for dir in ["src/deep", "node_modules/router", ".git/router"] {
            try fm.createDirectory(at: root.appendingPathComponent(dir), withIntermediateDirectories: true)
        }
        try Data().write(to: root.appendingPathComponent("src/deep/app-router.ts"))
        try Data().write(to: root.appendingPathComponent("src/Router.swift"))
        try Data().write(to: root.appendingPathComponent("router"))

        let names = FileTreeListing.search(root: root.path, query: "router").map(\.name)
        XCTAssertEqual(names, ["router", "Router.swift", "app-router.ts"])
        XCTAssertTrue(FileTreeListing.search(root: root.path, query: "  ").isEmpty)
    }
}
