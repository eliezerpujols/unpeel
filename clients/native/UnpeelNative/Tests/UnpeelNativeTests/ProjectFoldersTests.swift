import XCTest
import UnpeelShared
@testable import UnpeelNative

/// Multi-folder projects (`project.folders`): the folder list round-trips
/// through app-state.json, icons parse defensively, and the store's
/// sanitizer keeps the list absolute, unique, and bounded.
final class ProjectFoldersTests: XCTestCase {
    func testProjectDecodesFoldersFromAppState() throws {
        let json = """
        {"id":"p1","name":"Acme","path":"/src/web",
         "folders":[{"path":"/src/web","name":"Web app","icon":"glyph:globe"},
                    {"path":"/src/api","icon":"emoji:⚙️"}]}
        """
        let project = try JSONDecoder().decode(Project.self, from: Data(json.utf8))
        XCTAssertTrue(project.hasMultipleFolders)
        XCTAssertEqual(project.ownFolders.map(\.path), ["/src/web", "/src/api"])
        XCTAssertEqual(project.ownFolders[0].displayName, "Web app")
        XCTAssertEqual(project.ownFolders[1].displayName, "api")
        XCTAssertEqual(project.ownFolders[0].parsedIcon, .glyph(.globe))
        XCTAssertEqual(project.ownFolders[1].parsedIcon, .emoji("⚙️"))
    }

    func testSingleFolderProjectWithoutFoldersKey() throws {
        let json = #"{"id":"p1","name":"Acme","path":"/src/web"}"#
        let project = try JSONDecoder().decode(Project.self, from: Data(json.utf8))
        XCTAssertFalse(project.hasMultipleFolders)
        XCTAssertEqual(project.ownFolders, [ProjectFolder(path: "/src/web")])
    }

    func testIconParsingFallsBackForUnknownValues() {
        XCTAssertNil(ProjectFolderIcon(wire: "glyph:not-a-glyph"))
        XCTAssertNil(ProjectFolderIcon(wire: "emoji:"))
        XCTAssertNil(ProjectFolderIcon(wire: "folder"))
        XCTAssertEqual(ProjectFolderIcon(wire: "glyph:server")?.wire, "glyph:server")
        XCTAssertEqual(ProjectFolderIcon.emoji("🧪").wire, "emoji:🧪")
    }

    func testSanitizerDropsRelativeAndDuplicatePathsAndBlankNames() {
        let tmp = NSTemporaryDirectory()
        let sanitized = UnpeelStore.sanitizedProjectFolders([
            ProjectFolder(path: tmp, name: "  "),
            ProjectFolder(path: tmp + "/"),
            ProjectFolder(path: "relative/path"),
            ProjectFolder(path: "/usr", name: " Usr ", icon: ""),
        ])
        XCTAssertEqual(sanitized.count, 2)
        XCTAssertNil(sanitized[0].name)
        XCTAssertEqual(sanitized[1].name, "Usr")
        XCTAssertNil(sanitized[1].icon)
    }

    func testSanitizerCapsAtThirtyTwoFolders() {
        let folders = (0..<40).map { ProjectFolder(path: "/tmp/unpeel-folder-\($0)") }
        XCTAssertEqual(UnpeelStore.sanitizedProjectFolders(folders).count, 32)
    }

    func testSharedStateShapeOmitsEmptyFields() {
        let entries = UnpeelStore.sharedStateFolders([
            ProjectFolder(path: "/a"),
            ProjectFolder(path: "/b", name: "B", icon: "glyph:code"),
        ])
        XCTAssertEqual(entries[0].keys.sorted(), ["path"])
        XCTAssertEqual(entries[1]["name"] as? String, "B")
        XCTAssertEqual(entries[1]["icon"] as? String, "glyph:code")
    }

    func testSummaryCarriesFoldersOnlyForMultiFolderProjects() {
        let single = Project(
            id: "p", name: "P", path: "/a", parentProjectID: nil, sortOrder: nil,
            isFolder: nil, worktreeBranch: nil, workspacesEnabled: nil, mcpBlocked: nil
        )
        XCTAssertNil(single.remoteProjectSummary().folders)
        var multi = single
        multi.folders = [ProjectFolder(path: "/a"), ProjectFolder(path: "/b", name: "B")]
        XCTAssertEqual(
            multi.remoteProjectSummary().folders,
            [RemoteProjectFolder(path: "/a"), RemoteProjectFolder(path: "/b", name: "B")]
        )
    }

    func testAgentFolderAccessDecodesAndOnlyTravelsWhenOn() throws {
        let json = #"{"id":"p","name":"P","path":"/a","agent_folder_access":true}"#
        let on = try JSONDecoder().decode(Project.self, from: Data(json.utf8))
        XCTAssertEqual(on.agentFolderAccess, true)
        XCTAssertEqual(on.remoteProjectSummary().agentFolderAccess, true)

        var off = on
        off.agentFolderAccess = false
        XCTAssertNil(off.remoteProjectSummary().agentFolderAccess)
    }
}
