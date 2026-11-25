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
        guard let info = CGWindowListCopyWindowInfo(.optionIncludingWindow, id) as? [[String: Any]],
              let row = info.first, row[kCGWindowOwnerPID as String] as? pid_t == app.pid,
              let raw = row[kCGWindowBounds as String] as? [String: Any],
              let rect = CGRect(dictionaryRepresentation: raw as CFDictionary), !rect.isEmpty else {
            throw ComputerError("The app window changed or closed. Refresh its screenshot or app state.")
        }
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
        // Keep the Z order for windows on any active display, then list
        // remaining shareable windows such as those in another Space.
        let onscreen = CGWindowListCopyWindowInfo(.optionOnScreenOnly, kCGNullWindowID) as? [[String: Any]] ?? []
        let ids = onscreen.compactMap { $0[kCGWindowNumber as String] as? CGWindowID }
        let order = Dictionary(ids.enumerated().map { ($0.element, $0.offset) }, uniquingKeysWith: { first, _ in first })
        let ordered = matches.sorted {
            (order[$0.windowID] ?? Int.max, $0.windowID) < (order[$1.windowID] ?? Int.max, $1.windowID)
        }
        let window = if let id { matches.first { $0.windowID == id } } else { ordered.first }
        guard let window else { throw ComputerError("No matching window is available in \(app.name).") }
        func describe(_ window: SCWindow) -> ComputerWindow {
            ComputerWindow(
                id: window.windowID, title: String((window.title ?? "").unicodeScalars.prefix(400)),
                bounds: window.frame, app: app
            )
        }
        return (describe(window), window, ordered.prefix(20).map(describe))
    }
}
