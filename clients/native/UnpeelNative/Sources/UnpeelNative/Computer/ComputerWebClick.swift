import ApplicationServices
import Foundation

enum ComputerClickMethod: String, Encodable {
    case axPress = "ax_press"
    case pidClick = "pid_click"
}

@MainActor
enum ComputerWebClick {
    private struct Observation: Equatable {
        let tree: String
        let url: String?
        let value: String?
        var focused: CFHashCode?
    }

    static func press(
        _ operation: ComputerRequest.ElementRequest.Operation, element: AXUIElement, window: ComputerWindow,
        check: () throws -> Void, click: (CGPoint, ComputerPointerDelivery) throws -> Void
    ) async throws -> ComputerClickMethod {
        guard let pid = window.app.pid else { throw ComputerError("The element has no target process.") }
        let frame = ComputerAXTree.bounds(of: element)
        let document = ComputerAccessibility.webArea(containing: element, in: pid)
        let baseline = document.flatMap { observation(window: window, document: $0, element: element, pid: pid) }
        try check()
        try ComputerAXActions.perform(operation, on: element, in: pid)
        guard let document, let baseline, let frame, !frame.isEmpty else { return .axPress }
        func observe() -> Observation? {
            guard var snapshot = observation(window: window, document: document, element: element, pid: pid) else {
                return nil
            }
            // WebKit may focus the control without invoking its handler.
            if snapshot.focused == CFHash(element) { snapshot.focused = baseline.focused }
            return snapshot
        }
        guard try await showsNoEffect(before: baseline, observe: observe) else { return .axPress }
        try check()
        try Task.checkCancellation()
        let point = CGPoint(x: frame.midX, y: frame.midY)
        guard window.bounds.contains(point), try window.liveBounds() == window.bounds,
              ComputerAXTree.bounds(of: element) == frame, ComputerAXTree.contains(element, in: window),
              ComputerAccessibility.attribute(kAXEnabledAttribute, of: element) as? Bool != false else {
            throw ComputerError("The web element moved or changed after AXPress. Refresh its app state before clicking again.")
        }
        try click(point, ComputerPointerDelivery(pid: pid, window: .init(id: window.id, bounds: window.bounds)))
        if try await showsNoEffect(before: baseline, observe: observe) {
            throw ComputerError("The web control did not respond to AXPress or the window-targeted click.")
        }
        return .pidClick
    }

    static func showsNoEffect<State: Equatable>(
        before: State, observe: () -> State?,
        pause: (Duration) async throws -> Void = { try await Task.sleep(for: $0) }
    ) async throws -> Bool {
        // Check more than once so a queued web update has time to appear.
        // A failed observation is inconclusive and must not replay the input.
        for delay in [Duration.milliseconds(160), .milliseconds(330)] {
            try await pause(delay)
            guard let after = observe(), after == before else { return false }
        }
        return true
    }

    private static func observation(window: ComputerWindow, document: AXUIElement, element: AXUIElement, pid: pid_t) -> Observation? {
        guard ComputerAccessibility.role(of: document) == "AXWebArea",
              let tree = try? ComputerAXTree.read(window: window, firstID: 0), tree.includesWebArea else { return nil }
        func text(_ attribute: String, from node: AXUIElement) -> String? {
            let value = ComputerAccessibility.attribute(attribute, of: node)
            return (value as? URL)?.absoluteString ?? (value as? String) ?? (value as? NSNumber)?.stringValue
        }
        let app = AXUIElementCreateApplication(pid)
        let focused = ComputerAccessibility.elementAttribute(kAXFocusedUIElementAttribute, of: app, in: pid)
        return Observation(
            tree: tree.text, url: text(kAXURLAttribute, from: document), value: text(kAXValueAttribute, from: element),
            focused: focused.map { CFHash($0) }
        )
    }
}
