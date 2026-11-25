import CoreGraphics
import Foundation

@MainActor
final class ComputerInput {
    // Local approval and stop controls ignore events posted by this engine.
    static let eventTag: Int64 = 0x554E_504C_4355

    private let source = CGEventSource(stateID: .privateState)
    private var pendingLeftRelease: CGEvent?

    func cursorPosition() throws -> CGPoint {
        guard let position = CGEvent(source: nil)?.location else {
            throw ComputerError("Could not read the cursor position.")
        }
        return position
    }

    func move(to point: CGPoint) throws {
        let event = try mouseEvent(pendingLeftRelease != nil ? .leftMouseDragged : .mouseMoved, at: point)
        event.post(tap: .cghidEventTap)
        pendingLeftRelease?.location = point
    }

    func click(_ button: CGMouseButton, count: Int, at point: CGPoint) throws {
        let types: (down: CGEventType, up: CGEventType)
        switch button {
        case .left: types = (.leftMouseDown, .leftMouseUp)
        case .right: types = (.rightMouseDown, .rightMouseUp)
        default: types = (.otherMouseDown, .otherMouseUp)
        }
        let clicks = try (1...count).map { index in
            let down = try mouseEvent(types.down, at: point, button: button, clickCount: index)
            let up = try mouseEvent(types.up, at: point, button: button, clickCount: index)
            return (down, up)
        }
        try move(to: point)
        for (down, up) in clicks {
            down.post(tap: .cghidEventTap)
            up.post(tap: .cghidEventTap)
        }
    }

    func pressLeftButton(at point: CGPoint) throws {
        let down = try mouseEvent(.leftMouseDown, at: point, clickCount: 1)
        let up = try mouseEvent(.leftMouseUp, at: point, clickCount: 1)
        try move(to: point)
        down.post(tap: .cghidEventTap)
        pendingLeftRelease = up
    }

    func liftLeftButton(at point: CGPoint) throws {
        let event = try mouseEvent(.leftMouseUp, at: point, clickCount: 1)
        try move(to: point)
        event.post(tap: .cghidEventTap)
        pendingLeftRelease = nil
    }

    func releaseLeftButton(to pid: pid_t) {
        guard let release = pendingLeftRelease else { return }
        pendingLeftRelease = nil
        release.timestamp = DispatchTime.now().uptimeNanoseconds
        // Cancellation must release the button without clicking whichever
        // app may now occupy the last point.
        release.postToPid(pid)
    }

    func drag(
        from start: CGPoint, to end: CGPoint, pid: pid_t, checkPoint: (CGPoint) throws -> Void
    ) async throws {
        try pressLeftButton(at: start)
        defer { releaseLeftButton(to: pid) }
        for step in 1...10 {
            try await Task.sleep(for: .milliseconds(16))
            let fraction = CGFloat(step) / 10
            let point = CGPoint(
                x: start.x + (end.x - start.x) * fraction,
                y: start.y + (end.y - start.y) * fraction
            )
            try checkPoint(point)
            try move(to: point)
        }
        try liftLeftButton(at: end)
    }

    func scroll(_ direction: ComputerRequest.ScrollDirection, amount: Int32, at point: CGPoint) throws {
        let delta: (vertical: Int32, horizontal: Int32)
        switch direction {
        case .up: delta = (amount, 0)
        case .down: delta = (-amount, 0)
        case .left: delta = (0, amount)
        case .right: delta = (0, -amount)
        }
        guard let event = CGEvent(
            scrollWheelEvent2Source: source, units: .line, wheelCount: 2,
            wheel1: delta.vertical, wheel2: delta.horizontal, wheel3: 0
        ) else { throw ComputerError("Could not create a scroll event.") }
        event.setIntegerValueField(.eventSourceUserData, value: Self.eventTag)
        try move(to: point)
        event.location = point
        event.post(tap: .cghidEventTap)
    }

    func key(_ key: ComputerKey, duration: Duration, to pid: pid_t) async throws {
        let (down, up) = try keyboardEvents(key.code)
        down.flags = key.modifiers
        up.flags = key.modifiers
        if let modifier = key.modifierKey {
            down.type = .flagsChanged
            up.type = .flagsChanged
            down.flags.insert(modifier)
        }
        down.postToPid(pid)
        defer {
            up.timestamp = DispatchTime.now().uptimeNanoseconds
            up.postToPid(pid)
        }
        if duration > .zero { try await Task.sleep(for: duration) }
    }

    func type(_ text: String, to pid: pid_t, checkFocus: () throws -> Void) async throws {
        var chunks = ComputerUnicodeChunks(text)
        while let chunk = chunks.next() {
            try checkFocus()
            let (down, up) = try keyboardEvents(0)
            chunk.withUnsafeBufferPointer { units in
                down.keyboardSetUnicodeString(stringLength: units.count, unicodeString: units.baseAddress)
                up.keyboardSetUnicodeString(stringLength: units.count, unicodeString: units.baseAddress)
            }
            down.postToPid(pid)
            up.postToPid(pid)
            await Task.yield()
        }
    }

    private func mouseEvent(
        _ type: CGEventType, at point: CGPoint, button: CGMouseButton = .left, clickCount: Int = 0
    ) throws -> CGEvent {
        guard let event = CGEvent(mouseEventSource: source, mouseType: type, mouseCursorPosition: point, mouseButton: button)
        else { throw ComputerError("Could not create a mouse event.") }
        event.setIntegerValueField(.eventSourceUserData, value: Self.eventTag)
        event.setIntegerValueField(.mouseEventClickState, value: Int64(clickCount))
        return event
    }

    private func keyboardEvents(_ code: CGKeyCode) throws -> (CGEvent, CGEvent) {
        guard let down = CGEvent(keyboardEventSource: source, virtualKey: code, keyDown: true),
              let up = CGEvent(keyboardEventSource: source, virtualKey: code, keyDown: false)
        else { throw ComputerError("Could not create a keyboard event.") }
        return (down, up)
    }
}

/// Quartz events carry short UTF-16 strings. Keep graphemes together when
/// they fit and split exceptionally long graphemes only at scalar boundaries.
struct ComputerUnicodeChunks: IteratorProtocol {
    private static let limit = 20
    private let text: String
    private var index: String.Index
    private var characterEnd: String.Index

    init(_ text: String) {
        self.text = text
        index = text.startIndex
        characterEnd = text.startIndex
    }

    mutating func next() -> [UInt16]? {
        guard index < text.endIndex else { return nil }
        var chunk: [UInt16] = []
        while index < text.endIndex, chunk.count < Self.limit {
            if index == characterEnd { characterEnd = text.index(after: index) }
            let grapheme = text.utf16[index..<characterEnd]
            let length = grapheme.prefix(Self.limit + 1).count
            if length <= Self.limit {
                guard chunk.count + length <= Self.limit else { break }
                chunk.append(contentsOf: grapheme)
                index = characterEnd
            } else {
                let next = text.unicodeScalars.index(after: index)
                let scalar = text.utf16[index..<next]
                guard chunk.count + scalar.count <= Self.limit else { break }
                chunk.append(contentsOf: scalar)
                index = next
            }
        }
        return chunk
    }
}
