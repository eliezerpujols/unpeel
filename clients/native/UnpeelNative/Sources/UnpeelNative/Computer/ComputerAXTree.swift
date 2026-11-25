import ApplicationServices
import Foundation

struct ComputerAXRow {
    let depth: Int
    let role: String
    let title: String?
    let detail: String?
    let value: String?
    let url: String?
    let actions: [String]

    func line(id: Int) -> String {
        var line = String(repeating: "  ", count: depth) + "\(id) " + role
        if let title { line += " " + String(reflecting: title) }
        if let detail, detail != title { line += " Description: " + String(reflecting: detail) }
        if let value { line += " Value: " + String(reflecting: value) }
        if let url { line += " URL: " + String(reflecting: url) }
        let labels = actions.compactMap(Self.actionLabel).prefix(16)
        if !labels.isEmpty { line += " Actions: " + labels.joined(separator: ", ") }
        return line
    }

    static func actionLabel(_ action: String) -> String? {
        let lines = action.split(whereSeparator: \.isNewline)
        let name: Substring
        if let descriptor = lines.first(where: { $0.hasPrefix("Name:") }) {
            name = descriptor.dropFirst("Name:".count)
        } else if lines.count == 1, let first = lines.first {
            name = first
        } else {
            return nil
        }
        let label = name.trimmingCharacters(in: .whitespaces)
        guard !label.isEmpty, !["move next", "move previous", "remove from toolbar"].contains(label.lowercased()) else {
            return nil
        }
        return String(label.unicodeScalars.prefix(200))
    }
}

enum ComputerWebAccessibility {
    static let manual = "AXManualAccessibility"
    static let enhanced = "AXEnhancedUserInterface"

    /// Returns true only when the caller needs to restore enhanced mode.
    static func prepare(read: (String) -> Bool?, set: (String, Bool) -> Bool) -> Bool {
        if read(manual) == true || set(manual, true) { return false }
        // Only change enhanced mode when its original value is known.
        guard read(enhanced) == false else { return false }
        return set(enhanced, true)
    }
}

struct ComputerElementCache<Element> {
    private struct Key: Hashable {
        let session: String
        let bundleID: String
    }

    private struct Snapshot {
        let window: ComputerWindow
        let firstID: Int
        let elements: [Element]
    }

    private var snapshots: [Key: Snapshot] = [:]
    private(set) var nextID = 0

    mutating func replace(session: String, window: ComputerWindow, elements: [Element]) {
        let key = Key(session: session, bundleID: window.app.bundleID.lowercased())
        if snapshots[key] == nil, snapshots.count >= 32,
           let oldest = snapshots.min(by: { $0.value.firstID < $1.value.firstID })?.key {
            snapshots.removeValue(forKey: oldest)
        }
        snapshots[key] = Snapshot(window: window, firstID: nextID, elements: elements)
        nextID += elements.count
    }

    func element(session: String, bundleID: String, id: Int) throws -> (ComputerWindow, Element) {
        let key = Key(session: session, bundleID: bundleID.lowercased())
        guard let snapshot = snapshots[key], id >= snapshot.firstID,
              snapshot.elements.indices.contains(id - snapshot.firstID) else {
            throw ComputerError("Element is unavailable. Call get_app_state for this app and use a current element ID.")
        }
        return (snapshot.window, snapshot.elements[id - snapshot.firstID])
    }

    mutating func clear() { snapshots.removeAll() }
}

@MainActor
enum ComputerAXTree {
    struct Capture {
        let text: String
        let elements: [AXUIElement]
        fileprivate let includesWebArea: Bool
    }

    private static let maximumNodes = 180
    private static let maximumDepth = 20
    private static let maximumBytes = 30 * 1024
    private static let fields = [
        kAXRoleAttribute, kAXSubroleAttribute, kAXTitleAttribute, kAXDescriptionAttribute, kAXValueAttribute, kAXURLAttribute,
    ]

    static func capture(window: ComputerWindow, firstID: Int) async throws -> Capture {
        guard window.app.isSafari, let pid = window.app.pid else {
            return try read(window: window, firstID: firstID)
        }
        let app = AXUIElementCreateApplication(pid)
        AXUIElementSetMessagingTimeout(app, 0.25)
        func set(_ attribute: String, _ value: Bool) -> Bool {
            AXUIElementSetAttributeValue(app, attribute as CFString, NSNumber(value: value)) == .success
        }
        let restore = ComputerWebAccessibility.prepare(
            read: { ComputerAccessibility.attribute($0, of: app) as? Bool }, set: set
        )
        defer {
            let flag = ComputerWebAccessibility.enhanced
            if restore, !set(flag, false), !set(flag, false) {
                NSLog("[Unpeel] Could not restore Safari’s Accessibility mode")
            }
        }
        var tree = try read(window: window, firstID: firstID)
        for delay in [Duration.milliseconds(150), .milliseconds(350)] where !tree.includesWebArea {
            try await Task.sleep(for: delay)
            tree = try read(window: window, firstID: firstID)
        }
        return tree
    }

    private static func read(window: ComputerWindow, firstID: Int) throws -> Capture {
        guard firstID <= Int(Int32.max) - maximumNodes else {
            throw ComputerError("Accessibility element IDs have been exhausted. Restart Unpeel to start a new capture.")
        }
        let root = try windowElement(for: window)
        let deadline = ContinuousClock.now.advanced(by: .seconds(5))
        var lines = ["Window: \(String(reflecting: window.title)), App: \(String(reflecting: window.app.name))"]
        var bytes = lines[0].utf8.count
        var elements: [AXUIElement] = []
        var includesWebArea = false
        var truncated = false
        func visit(_ element: AXUIElement, depth: Int) throws {
            try Task.checkCancellation()
            guard depth <= maximumDepth, elements.count < maximumNodes, ContinuousClock.now < deadline else {
                truncated = true
                return
            }
            guard let row = row(for: element, depth: depth) else { return }
            let line = row.line(id: firstID + elements.count)
            guard bytes + line.utf8.count + 1 <= maximumBytes else {
                truncated = true
                return
            }
            elements.append(element)
            includesWebArea = includesWebArea || row.role == "AXWebArea"
            lines.append(line)
            bytes += line.utf8.count + 1
            let limit = maximumNodes - elements.count
            var count = 0
            guard AXUIElementGetAttributeValueCount(element, kAXChildrenAttribute as CFString, &count) == .success,
                  count > 0 else { return }
            if depth == maximumDepth || count > limit { truncated = true }
            guard depth < maximumDepth, limit > 0 else { return }
            var children: CFArray?
            if AXUIElementCopyAttributeValues(element, kAXChildrenAttribute as CFString, 0, min(count, limit), &children) == .success,
               let children = children as? [AXUIElement] {
                for child in children {
                    if elements.count >= maximumNodes || ContinuousClock.now >= deadline {
                        truncated = true
                        break
                    }
                    try visit(child, depth: depth + 1)
                }
            }
        }
        try visit(root, depth: 0)
        guard !elements.isEmpty else { throw ComputerError("Could not read this window’s Accessibility tree.") }
        if truncated { lines.append("… Accessibility tree truncated.") }
        return Capture(text: lines.joined(separator: "\n"), elements: elements, includesWebArea: includesWebArea)
    }

    static func windowElement(for window: ComputerWindow) throws -> AXUIElement {
        guard let pid = window.app.pid else { throw ComputerError("The target app has no process.") }
        let app = AXUIElementCreateApplication(pid)
        AXUIElementSetMessagingTimeout(app, 0.25)
        let windows = ComputerAccessibility.attribute(kAXWindowsAttribute, of: app) as? [AXUIElement] ?? []
        let match = matchingWindow(for: window, windows: windows, bounds: bounds(of:), title: { element in
            ComputerAccessibility.attribute(kAXTitleAttribute, of: element) as? String
        }) {
            // Safari can omit the document from AXWindows while still
            // exposing it through both window attributes.
            let main = ComputerAccessibility.elementAttribute(kAXMainWindowAttribute, of: app, in: pid)
            let focused = ComputerAccessibility.elementAttribute(kAXFocusedWindowAttribute, of: app, in: pid)
            if let main, let focused, CFEqual(main, focused) { return [main] }
            return [main, focused].compactMap { $0 }
        }
        guard let match else {
            throw ComputerError("Could not match the captured window to its Accessibility tree.")
        }
        return match
    }

    static func matchingWindow<Element>(
        for window: ComputerWindow, windows: [Element], bounds: (Element) -> CGRect?, title: (Element) -> String?,
        fallback: () -> [Element]
    ) -> Element? {
        func matchesFrame(_ element: Element) -> Bool {
            guard let frame = bounds(element) else { return false }
            return abs(frame.minX - window.bounds.minX) <= 2 && abs(frame.minY - window.bounds.minY) <= 2
                && abs(frame.width - window.bounds.width) <= 2 && abs(frame.height - window.bounds.height) <= 2
        }
        let listed = windows.filter(matchesFrame)
        let candidates = listed.isEmpty ? fallback().filter(matchesFrame) : listed
        if candidates.count == 1 { return candidates.first }
        let titled = candidates.filter { title($0) == window.title }
        return titled.count == 1 ? titled.first : nil
    }

    static func contains(_ element: AXUIElement, in window: ComputerWindow) -> Bool {
        guard let pid = window.app.pid, let root = try? windowElement(for: window) else { return false }
        if let owner = ComputerAccessibility.elementAttribute(kAXWindowAttribute, of: element, in: pid) {
            return CFEqual(root, owner)
        }
        var current: AXUIElement? = element
        for _ in 0..<32 {
            guard let candidate = current else { break }
            if CFEqual(root, candidate) { return true }
            current = ComputerAccessibility.parent(of: candidate, in: pid)
        }
        return false
    }

    static func bounds(of element: AXUIElement) -> CGRect? {
        guard let position = ComputerAccessibility.attribute(kAXPositionAttribute, of: element),
              let size = ComputerAccessibility.attribute(kAXSizeAttribute, of: element),
              CFGetTypeID(position) == AXValueGetTypeID(), CFGetTypeID(size) == AXValueGetTypeID() else { return nil }
        var origin = CGPoint.zero
        var dimensions = CGSize.zero
        guard AXValueGetValue(unsafeDowncast(position, to: AXValue.self), .cgPoint, &origin),
              AXValueGetValue(unsafeDowncast(size, to: AXValue.self), .cgSize, &dimensions),
              origin.x.isFinite, origin.y.isFinite, dimensions.width > 0, dimensions.height > 0 else { return nil }
        return CGRect(origin: origin, size: dimensions)
    }

    private static func row(for element: AXUIElement, depth: Int) -> ComputerAXRow? {
        var raw: CFArray?
        guard AXUIElementCopyMultipleAttributeValues(element, fields as CFArray, [], &raw) == .success,
              let values = raw as? [Any], values.count == fields.count,
              let role = values[0] as? String else { return nil }
        func text(_ value: Any) -> String? {
            let string = (value as? String) ?? (value as? NSNumber)?.stringValue ?? (value as? URL)?.absoluteString
            guard let string, !string.isEmpty else { return nil }
            return String(string.unicodeScalars.prefix(200))
        }
        let secure = values[1] as? String == kAXSecureTextFieldSubrole
        return ComputerAXRow(
            depth: depth, role: text(role) ?? "AXUnknown", title: text(values[2]), detail: text(values[3]),
            value: secure ? nil : text(values[4]), url: text(values[5]),
            actions: ComputerAccessibility.actions(on: element)
        )
    }
}
