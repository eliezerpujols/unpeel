import ApplicationServices
import CoreGraphics
import Foundation
import ScreenCaptureKit

struct ComputerWindow: Encodable, Equatable {
    let id: CGWindowID
    let title: String
    let bounds: CGRect
    let app: ComputerTarget
    var onCurrentSpace = false

    enum CodingKeys: String, CodingKey {
        case id, title
        case bundleID = "bundle_id"
        case onCurrentSpace = "on_current_space"
    }

    func encode(to encoder: Encoder) throws {
        var values = encoder.container(keyedBy: CodingKeys.self)
        try values.encode(id, forKey: .id)
        try values.encode(title, forKey: .title)
        try values.encode(app.bundleID, forKey: .bundleID)
        try values.encode(onCurrentSpace, forKey: .onCurrentSpace)
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

    fileprivate func matchingRow(in rows: [[String: Any]]) -> [String: Any]? {
        guard let pid = app.pid else { return nil }
        return rows.first {
            $0[kCGWindowNumber as String] as? CGWindowID == id
                && $0[kCGWindowOwnerPID as String] as? pid_t == pid
        }
    }

    fileprivate func matchingBounds(in rows: [[String: Any]]) -> CGRect? {
        matchingRow(in: rows).flatMap(Self.bounds(in:))
    }

    fileprivate static func bounds(in row: [String: Any]) -> CGRect? {
        guard let raw = row[kCGWindowBounds as String] as? [String: Any],
              let rect = CGRect(dictionaryRepresentation: raw as CFDictionary),
              !rect.isEmpty, !rect.isInfinite else { return nil }
        return rect
    }

    func matchesFrame(_ frame: CGRect) -> Bool {
        abs(frame.minX - bounds.minX) <= 2 && abs(frame.minY - bounds.minY) <= 2
            && abs(frame.width - bounds.width) <= 2 && abs(frame.height - bounds.height) <= 2
    }
}

enum ComputerWindows {
    enum Space: Equatable {
        case current, other, minimized, unverified

        init(listed: Bool, onscreen: Bool?, minimized: Bool = false) {
            if minimized { self = .minimized }
            else if listed && onscreen != false { self = .current }
            else { self = .other }
        }

        func requireInput(to app: ComputerTarget) throws {
            switch self {
            case .current: return
            case .minimized:
                throw ComputerError("\(app.name)'s window is minimized. Restore it and retry.")
            case .other:
                throw ComputerError("\(app.name)'s window is on another desktop. Move it to this desktop (it can stay behind other windows) and retry.")
            case .unverified:
                throw ComputerError("Could not identify \(app.name)'s keyboard window on this desktop. Call get_app_state for the intended window and retry.")
            }
        }
    }

    private static func onscreenIDs() -> [CGWindowID] {
        let rows = CGWindowListCopyWindowInfo(.optionOnScreenOnly, kCGNullWindowID) as? [[String: Any]] ?? []
        return rows.compactMap { $0[kCGWindowNumber as String] as? CGWindowID }
    }

    /// Exact captured or AX target. Always query again before posting input.
    @MainActor
    static func requireInput(to window: ComputerWindow) throws {
        guard let row = window.matchingRow(in: ComputerWindow.windowInfo(window.id)),
              let bounds = ComputerWindow.bounds(in: row) else {
            throw ComputerError("The app window changed or closed. Refresh its screenshot or app state.")
        }
        let listed = onscreenIDs().contains(window.id)
        let onscreen = row[kCGWindowIsOnscreen as String] as? Bool
        if Space(listed: listed, onscreen: onscreen) == .current { return }
        let live = ComputerWindow(id: window.id, title: window.title, bounds: bounds, app: window.app)
        let minimized = (try? ComputerAXTree.windowElement(for: live)).map(isMinimized) ?? false
        try Space(listed: listed, onscreen: onscreen, minimized: minimized).requireInput(to: window.app)
    }

    @MainActor
    static func requireKeyboardInput(to app: ComputerTarget, captured: ComputerWindow?) throws {
        guard let pid = app.pid else { return }
        let application = AXUIElementCreateApplication(pid)
        AXUIElementSetMessagingTimeout(application, 0.25)
        let focused = ComputerAccessibility.elementAttribute(kAXFocusedWindowAttribute, of: application, in: pid)
            ?? ComputerAccessibility.elementAttribute(kAXMainWindowAttribute, of: application, in: pid)
        if let focused, isMinimized(focused) { try Space.minimized.requireInput(to: app) }
        let rows = CGWindowListCopyWindowInfo([.optionAll, .excludeDesktopElements], kCGNullWindowID)
            as? [[String: Any]] ?? []
        let onscreen = Set(onscreenIDs())
        let windows = rows.compactMap { row -> ComputerWindow? in
            guard row[kCGWindowOwnerPID as String] as? pid_t == pid,
                  row[kCGWindowLayer as String] as? Int == Int(CGWindowLevelForKey(.normalWindow)),
                  let id = row[kCGWindowNumber as String] as? CGWindowID, let bounds = ComputerWindow.bounds(in: row)
            else { return nil }
            let space = Space(listed: onscreen.contains(id), onscreen: row[kCGWindowIsOnscreen as String] as? Bool)
            return ComputerWindow(
                id: id, title: row[kCGWindowName as String] as? String ?? "", bounds: bounds,
                app: app, onCurrentSpace: space == .current
            )
        }
        let frame = focused.flatMap(ComputerAXTree.bounds(of:))
        let title = focused.flatMap { ComputerAccessibility.attribute(kAXTitleAttribute, of: $0) as? String }
        if let captured, captured.app.matches(app), focused == nil {
            try requireInput(to: captured)
            return
        }
        try keyboardSpace(frame: frame, title: title, windows: windows).requireInput(to: app)
    }

    static func keyboardSpace(frame: CGRect?, title: String?, windows: [ComputerWindow]) -> Space {
        let matching = frame.map { frame in windows.filter { $0.matchesFrame(frame) } } ?? []
        let titled = matching.filter { !$0.title.isEmpty && $0.title == title }
        let candidates = !titled.isEmpty ? titled : (!matching.isEmpty ? matching : windows)
        // A windowless app can still receive an app-level shortcut, such as
        // Command-N. When AX identifies a window, restrict the check to it.
        if candidates.allSatisfy(\.onCurrentSpace) { return .current }
        if candidates.allSatisfy({ !$0.onCurrentSpace }) { return .other }
        return .unverified
    }

    @MainActor
    private static func isMinimized(_ element: AXUIElement) -> Bool {
        ComputerAccessibility.attribute(kAXMinimizedAttribute, of: element) as? Bool == true
    }

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
        let windows = orderedWindows(candidates, onscreenIDs: onscreenIDs(), windowInfo: ComputerWindow.windowInfo)
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
        return candidates.compactMap { candidate -> ComputerWindow? in
            guard let row = candidate.matchingRow(in: windowInfo(candidate.id)),
                  ComputerWindow.bounds(in: row) != nil else { return nil }
            var window = candidate
            let space = Space(listed: order[window.id] != nil, onscreen: row[kCGWindowIsOnscreen as String] as? Bool)
            window.onCurrentSpace = space == .current
            return window
        }.sorted {
            (order[$0.id] ?? Int.max, $0.id) < (order[$1.id] ?? Int.max, $1.id)
        }
    }
}
