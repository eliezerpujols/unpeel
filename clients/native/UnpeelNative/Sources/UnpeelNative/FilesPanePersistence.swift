//
//  FilesPanePersistence.swift
//  UnpeelNative
//
//  Files panes are Mac-only pane content: the shared `pane-layouts.json`
//  (also read by the Rust Host and the TUI) never carries them. This
//  companion file remembers every group that holds a Files pane, with its
//  full tree, and overlays it back onto the shared layout on load:
//
//  - a shared group with the same id and the same Session panes gets its
//    full tree back (Files leaves included);
//  - a group the shared file can't hold (one Session + Files) is recreated
//    when none of its Sessions is grouped elsewhere;
//  - anything another frontend has since changed is dropped, never forced.
//

import Foundation

indirect enum MacPaneNode: Codable, Equatable, Sendable {
    case session(paneID: String, sessionID: String)
    case files(paneID: String, projectID: String, folderPath: String?)
    case split(direction: SplitDirection, ratio: Double, left: MacPaneNode, right: MacPaneNode)

    /// nil when the tree holds something this file never stores (launchers).
    init?(_ node: PaneNode) {
        switch node {
        case let .leaf(pane):
            switch pane.content {
            case let .session(id):
                self = .session(paneID: pane.id, sessionID: id)
            case let .files(projectID, folderPath):
                self = .files(paneID: pane.id, projectID: projectID, folderPath: folderPath)
            case .launcher:
                return nil
            }
        case let .split(split):
            guard let left = MacPaneNode(split.left),
                  let right = MacPaneNode(split.right)
            else { return nil }
            self = .split(direction: split.direction, ratio: split.ratio, left: left, right: right)
        }
    }

    var paneNode: PaneNode {
        switch self {
        case let .session(paneID, sessionID):
            return .leaf(Pane(id: paneID, content: .session(id: sessionID)))
        case let .files(paneID, projectID, folderPath):
            return .leaf(Pane(id: paneID, content: .files(projectID: projectID, folderPath: folderPath)))
        case let .split(direction, ratio, left, right):
            return .split(PaneSplit(
                direction: direction, ratio: ratio,
                left: left.paneNode, right: right.paneNode
            ))
        }
    }

    private enum CodingKeys: String, CodingKey {
        case kind, paneID, sessionID, projectID, folderPath, direction, ratio, left, right
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        switch try c.decode(String.self, forKey: .kind) {
        case "session":
            self = .session(
                paneID: try c.decode(String.self, forKey: .paneID),
                sessionID: try c.decode(String.self, forKey: .sessionID)
            )
        case "files":
            self = .files(
                paneID: try c.decode(String.self, forKey: .paneID),
                projectID: try c.decode(String.self, forKey: .projectID),
                folderPath: try c.decodeIfPresent(String.self, forKey: .folderPath)
            )
        case "split":
            let raw = try c.decode(String.self, forKey: .direction)
            guard let direction = SplitDirection(rawValue: raw) else {
                throw DecodingError.dataCorruptedError(
                    forKey: .direction, in: c, debugDescription: "Unknown direction \(raw)"
                )
            }
            self = .split(
                direction: direction,
                ratio: try c.decode(Double.self, forKey: .ratio),
                left: try c.decode(MacPaneNode.self, forKey: .left),
                right: try c.decode(MacPaneNode.self, forKey: .right)
            )
        case let other:
            throw DecodingError.dataCorruptedError(
                forKey: .kind, in: c, debugDescription: "Unknown pane kind \(other)"
            )
        }
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: CodingKeys.self)
        switch self {
        case let .session(paneID, sessionID):
            try c.encode("session", forKey: .kind)
            try c.encode(paneID, forKey: .paneID)
            try c.encode(sessionID, forKey: .sessionID)
        case let .files(paneID, projectID, folderPath):
            try c.encode("files", forKey: .kind)
            try c.encode(paneID, forKey: .paneID)
            try c.encode(projectID, forKey: .projectID)
            try c.encodeIfPresent(folderPath, forKey: .folderPath)
        case let .split(direction, ratio, left, right):
            try c.encode("split", forKey: .kind)
            try c.encode(direction.rawValue, forKey: .direction)
            try c.encode(ratio, forKey: .ratio)
            try c.encode(left, forKey: .left)
            try c.encode(right, forKey: .right)
        }
    }
}

struct FilesPaneGroupRecord: Codable, Equatable, Sendable {
    let id: String
    let representativePaneID: String
    let root: MacPaneNode

    /// Only groups that actually hold a Files pane are recorded. A live
    /// launcher interaction records the tree without the launcher.
    init?(group: PaneGroup) {
        guard group.root.containsFiles else { return nil }
        var root: PaneNode? = group.root
        for pane in group.root.leaves where pane.content.isLauncher {
            root = root?.removingLeaf(pane.id)
        }
        guard let root, !root.sessionLeaves.isEmpty, root.containsFiles,
              let mac = MacPaneNode(root)
        else { return nil }
        id = group.id
        representativePaneID = root.leaf(id: group.representativePaneID)?.content.sessionID != nil
            ? group.representativePaneID
            : root.sessionLeaves[0].id
        self.root = mac
    }
}

enum FilesPanePersistence {
    nonisolated static let fileName = "native-files-panes.json"

    struct StorageFile: Codable, Equatable {
        var version = 1
        /// window id → scope id → recorded groups.
        var windows: [String: [String: [FilesPaneGroupRecord]]] = [:]
    }

    static func url(nextTo layoutFileURL: URL) -> URL {
        layoutFileURL.deletingLastPathComponent().appendingPathComponent(fileName)
    }

    static func records(in state: PaneLayoutState) -> [FilesPaneGroupRecord] {
        state.groups.compactMap(FilesPaneGroupRecord.init(group:))
    }

    static func load(_ url: URL) -> StorageFile {
        guard let data = try? Data(contentsOf: url),
              let file = try? JSONDecoder().decode(StorageFile.self, from: data),
              file.version == 1
        else { return StorageFile() }
        return file
    }

    static func load(_ url: URL, windowID: String, scopeID: String) -> [FilesPaneGroupRecord] {
        load(url).windows[windowID]?[scopeID] ?? []
    }

    /// Replace one window/scope slot; an empty slot is removed.
    static func save(
        _ records: [FilesPaneGroupRecord],
        to url: URL,
        windowID: String,
        scopeID: String
    ) {
        var file = load(url)
        var scopes = file.windows[windowID] ?? [:]
        let previous = scopes[scopeID] ?? []
        guard previous != records else { return }
        scopes[scopeID] = records.isEmpty ? nil : records
        file.windows[windowID] = scopes.isEmpty ? nil : scopes
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        guard let data = try? encoder.encode(file) else { return }
        try? FileManager.default.createDirectory(
            at: url.deletingLastPathComponent(), withIntermediateDirectories: true
        )
        try? data.write(to: url, options: .atomic)
    }
}
