import AppKit
import Foundation

@MainActor
final class ComputerInput {
    // Local approval and stop controls ignore events posted by this engine.
    nonisolated static let eventTag: Int64 = 0x554E_504C_4355

    nonisolated static func isSynthetic(_ event: NSEvent) -> Bool {
        event.cgEvent?.getIntegerValueField(.eventSourceUserData) == eventTag
    }

    private let source = CGEventSource(stateID: .privateState)
    private var pendingLeftRelease: (point: CGPoint, delivery: ComputerPointerDelivery, number: Int)?
    private var mouseNumber = 0

    func cursorPosition() throws -> CGPoint {
        guard let position = CGEvent(source: nil)?.location else {
            throw ComputerError("Could not read the cursor position.")
        }
        return position
    }

    func move(to point: CGPoint, delivery: ComputerPointerDelivery) throws {
        let active = pendingLeftRelease?.delivery ?? delivery
        let event = try mouseEvent(
            pendingLeftRelease != nil ? .leftMouseDragged : .mouseMoved,
            at: point, delivery: active, number: pendingLeftRelease?.number ?? nextMouseNumber()
        )
        active.post(event)
        pendingLeftRelease?.point = point
    }

    func click(
        _ button: CGMouseButton, count: Int, at point: CGPoint, delivery: ComputerPointerDelivery, windowScoped: Bool = false
    ) throws {
        let types: (down: NSEvent.EventType, up: NSEvent.EventType)
        switch button {
        case .left: types = (.leftMouseDown, .leftMouseUp)
        case .right: types = (.rightMouseDown, .rightMouseUp)
        default: types = (.otherMouseDown, .otherMouseUp)
        }
        let clicks = try (1...count).map { index in
            let number = nextMouseNumber()
            let down = try mouseEvent(
                types.down, at: point, delivery: delivery, number: number,
                button: button, clickCount: index, windowScoped: windowScoped
            )
            let up = try mouseEvent(
                types.up, at: point, delivery: delivery, number: number,
                button: button, clickCount: index, windowScoped: windowScoped
            )
            return (down, up)
        }
        for (down, up) in clicks {
            delivery.post(down)
            delivery.post(up)
        }
    }

    func pressLeftButton(at point: CGPoint, delivery: ComputerPointerDelivery) throws {
        let number = nextMouseNumber()
        let down = try mouseEvent(.leftMouseDown, at: point, delivery: delivery, number: number, clickCount: 1)
        delivery.post(down)
        pendingLeftRelease = (point, delivery, number)
    }

    func liftLeftButton(at point: CGPoint, delivery: ComputerPointerDelivery) throws {
        let active = pendingLeftRelease?.delivery ?? delivery
        let event = try mouseEvent(
            .leftMouseUp, at: point, delivery: active, number: pendingLeftRelease?.number ?? nextMouseNumber(), clickCount: 1
        )
        active.post(event)
        pendingLeftRelease = nil
    }

    func releaseLeftButton() {
        guard let release = pendingLeftRelease else { return }
        pendingLeftRelease = nil
        if let event = try? mouseEvent(
            .leftMouseUp, at: release.point, delivery: release.delivery, number: release.number, clickCount: 1
        ) {
            release.delivery.post(event)
        }
    }

    func drag(
        from start: CGPoint, to end: CGPoint, delivery: ComputerPointerDelivery, checkPoint: (CGPoint) throws -> Void
    ) async throws {
        try pressLeftButton(at: start, delivery: delivery)
        defer { releaseLeftButton() }
        for step in 1...10 {
            try await Task.sleep(for: .milliseconds(16))
            let fraction = CGFloat(step) / 10
            let point = CGPoint(
                x: start.x + (end.x - start.x) * fraction,
                y: start.y + (end.y - start.y) * fraction
            )
            try checkPoint(point)
            try move(to: point, delivery: delivery)
        }
        try liftLeftButton(at: end, delivery: delivery)
    }

    func scroll(
        _ direction: ComputerRequest.ScrollDirection, amount: Int32, at point: CGPoint, delivery: ComputerPointerDelivery
    ) throws {
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
        event.flags = []
        event.setIntegerValueField(.eventSourceUserData, value: Self.eventTag)
        event.location = point
        delivery.post(event)
    }

    func key(_ key: ComputerKey, duration: Duration, to pid: pid_t) async throws {
        let (down, up) = try keyboardEvents(key.code, flags: key.modifiers)
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

    func type(_ text: String, to pid: pid_t, checkTarget: () throws -> Void) async throws {
        var chunks = ComputerUnicodeChunks(text)
        while let chunk = chunks.next() {
            try checkTarget()
            let (down, up) = try unicodeEvents(chunk)
            down.postToPid(pid)
            up.postToPid(pid)
            await Task.yield()
        }
    }

    func unicodeEvents(_ units: [UInt16]) throws -> (down: CGEvent, up: CGEvent) {
        // Quartz seeds flags from the event source. After Cmd+N, inherited
        // Command turns Unicode input into a key equivalent in TextEdit.
        let (down, up) = try keyboardEvents(0, flags: [])
        units.withUnsafeBufferPointer {
            down.keyboardSetUnicodeString(stringLength: $0.count, unicodeString: $0.baseAddress)
            up.keyboardSetUnicodeString(stringLength: $0.count, unicodeString: $0.baseAddress)
        }
        return (down, up)
    }

    private func nextMouseNumber() -> Int {
        mouseNumber &+= 1
        return mouseNumber
    }

    private func mouseEvent(
        _ type: NSEvent.EventType, at point: CGPoint, delivery: ComputerPointerDelivery,
        number: Int, button: CGMouseButton = .left, clickCount: Int = 0, windowScoped: Bool = false
    ) throws -> CGEvent {
        let location = windowScoped ? delivery.window.appKitLocation(of: point) :
            ComputerPointerDelivery.windowMouseLocation(
                point, in: delivery.window, screenTop: CGDisplayBounds(CGMainDisplayID()).maxY
            )
        let isDown = [NSEvent.EventType.leftMouseDown, .rightMouseDown, .otherMouseDown, .leftMouseDragged].contains(type)
        guard let event = NSEvent.mouseEvent(
            with: type, location: location, modifierFlags: [], timestamp: ProcessInfo.processInfo.systemUptime,
            windowNumber: Int(delivery.window.id), context: nil, eventNumber: number, clickCount: clickCount,
            pressure: isDown ? 1 : 0
        )?.cgEvent else { throw ComputerError("Could not create a mouse event.") }
        event.setIntegerValueField(.eventSourceUserData, value: Self.eventTag)
        // A previous shortcut must not turn a plain click into a Command-click.
        event.flags = []
        if windowScoped { try delivery.setScopedLocation(event, at: point) }
        event.setIntegerValueField(.mouseEventNumber, value: Int64(number))
        event.setIntegerValueField(.mouseEventButtonNumber, value: Int64(button.rawValue))
        event.setIntegerValueField(.mouseEventClickState, value: Int64(clickCount))
        return event
    }

    private func keyboardEvents(_ code: CGKeyCode, flags: CGEventFlags) throws -> (CGEvent, CGEvent) {
        guard let down = CGEvent(keyboardEventSource: source, virtualKey: code, keyDown: true),
              let up = CGEvent(keyboardEventSource: source, virtualKey: code, keyDown: false)
        else { throw ComputerError("Could not create a keyboard event.") }
        down.flags = flags
        up.flags = flags
        down.setIntegerValueField(.eventSourceUserData, value: Self.eventTag)
        up.setIntegerValueField(.eventSourceUserData, value: Self.eventTag)
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
