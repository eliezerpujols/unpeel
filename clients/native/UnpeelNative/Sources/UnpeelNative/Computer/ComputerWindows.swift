import CoreGraphics
import Foundation
import ScreenCaptureKit

struct ComputerWindow: Encodable, Equatable {
    let id: CGWindowID
    let title: String
    let bounds: CGRect
    let app: ComputerTarget

    enum CodingKeys: String, CodingKey {
        case id, title
        case bundleID = "bundle_id"
    }

    func encode(to encoder: Encoder) throws {
        var values = encoder.container(keyedBy: CodingKeys.self)
        try values.encode(id, forKey: .id)
        try values.encode(title, forKey: .title)
        try values.encode(app.bundleID, forKey: .bundleID)
    }

    func liveBounds() throws -> CGRect {
        guard let bounds = matchingBounds(in: Self.windowInfo(id)) else {
            throw ComputerError("The app window changed or closed. Refresh its screenshot or app state.")
        }
        return bounds
    }

    fileprivate static func windowInfo(_ id: CGWindowID) -> [[String: Any]] {
        CGWindowListCopyWindowInfo(.optionIncludingWindow, id) as? [[String: Any]] ?? []
    }

    fileprivate func matchingBounds(in rows: [[String: Any]]) -> CGRect? {
        guard let pid = app.pid,
              let row = rows.first(where: {
                  $0[kCGWindowNumber as String] as? CGWindowID == id
                      && $0[kCGWindowOwnerPID as String] as? pid_t == pid
              }),
              let raw = row[kCGWindowBounds as String] as? [String: Any],
              let rect = CGRect(dictionaryRepresentation: raw as CFDictionary),
              !rect.isEmpty, !rect.isInfinite else { return nil }
        return rect
    }
}

enum ComputerWindows {
    static func select(for app: ComputerTarget, id: CGWindowID?) async throws -> (
        selected: ComputerWindow, shareable: SCWindow, windows: [ComputerWindow]
    ) {
        let content = try await SCShareableContent.excludingDesktopWindows(true, onScreenWindowsOnly: false)
        let matches = content.windows.filter { window in
            window.owningApplication?.processID == app.pid
                && window.owningApplication?.bundleIdentifier.caseInsensitiveCompare(app.bundleID) == .orderedSame
                && window.windowLayer == 0 && window.frame.width > 0 && window.frame.height > 0
        }
        let candidates = matches.map { window in
            ComputerWindow(
                id: window.windowID, title: String((window.title ?? "").unicodeScalars.prefix(400)),
                bounds: window.frame, app: app
            )
        }
        let onscreen = CGWindowListCopyWindowInfo(.optionOnScreenOnly, kCGNullWindowID) as? [[String: Any]] ?? []
        let ids = onscreen.compactMap { $0[kCGWindowNumber as String] as? CGWindowID }
        let windows = orderedWindows(candidates, onscreenIDs: ids, windowInfo: ComputerWindow.windowInfo)
        let selected = if let id { windows.first { $0.id == id } } else { windows.first }
        guard let selected, let source = matches.first(where: { $0.windowID == selected.id }) else {
            throw ComputerError("No matching window is available in \(app.name).")
        }
        return (selected, source, Array(windows.prefix(20)))
    }

    static func orderedWindows(
        _ candidates: [ComputerWindow], onscreenIDs: [CGWindowID], windowInfo: (CGWindowID) -> [[String: Any]]
    ) -> [ComputerWindow] {
        // ScreenCaptureKit can list layer-zero auxiliary surfaces, including
        // Safari's menu bars. Validate each ID with a targeted Quartz query
        // before including it in the catalog or choosing it for capture.
        let order = Dictionary(onscreenIDs.enumerated().map { ($0.element, $0.offset) }, uniquingKeysWith: { first, _ in first })
        return candidates.filter { $0.matchingBounds(in: windowInfo($0.id)) != nil }.sorted {
            (order[$0.id] ?? Int.max, $0.id) < (order[$1.id] ?? Int.max, $1.id)
        }
    }
}
