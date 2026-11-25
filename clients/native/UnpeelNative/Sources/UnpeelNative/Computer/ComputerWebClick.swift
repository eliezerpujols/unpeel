import ApplicationServices
import Foundation

enum ComputerClickMethod: String, Encodable {
    case axPress = "ax_press"
    case pidClick = "pid_click"
}

@MainActor
enum ComputerWebClick {
    enum Effect: Equatable {
        case changed, unchanged, unobserved
    }

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
        guard try await effect(since: baseline, observe: observe) == .unchanged else { return .axPress }
        try check()
        try Task.checkCancellation()
        let point = CGPoint(x: frame.midX, y: frame.midY)
        guard window.bounds.contains(point), try window.liveBounds() == window.bounds,
              ComputerAXTree.bounds(of: element) == frame, ComputerAXTree.contains(element, in: window),
              ComputerAccessibility.attribute(kAXEnabledAttribute, of: element) as? Bool != false else {
            throw ComputerError("The web element moved or changed after AXPress. Refresh its app state before clicking again.")
        }
        try click(point, ComputerPointerDelivery(pid: pid, window: .init(id: window.id, bounds: window.bounds)))
        return try await confirmProcessClick(since: baseline, observe: observe)
    }

    static func processClick(
        in window: ComputerWindow, at element: AXUIElement?, dispatch: () throws -> Void
    ) async throws -> ComputerClickMethod {
        guard let pid = window.app.pid else { throw ComputerError("The window has no target process.") }
        func observe() -> Observation? {
            observation(window: window, document: nil, element: element, pid: pid)
        }
        guard let baseline = observe() else {
            throw ComputerError("Could not read this window’s state to verify the click.")
        }
        try dispatch()
        return try await confirmProcessClick(since: baseline) {
            guard var snapshot = observe() else { return nil }
            if let element, snapshot.focused == CFHash(element) { snapshot.focused = baseline.focused }
            return snapshot
        }
    }

    static func confirmProcessClick<State: Equatable>(
        since baseline: State, observe: () -> State?,
        pause: (Duration) async throws -> Void = { try await Task.sleep(for: $0) }
    ) async throws -> ComputerClickMethod {
        guard try await effect(since: baseline, observe: observe, pause: pause) == .changed else {
            throw ComputerError("The page did not respond to the click")
        }
        return .pidClick
    }

    static func effect<State: Equatable>(
        since baseline: State, observe: () -> State?,
        pause: (Duration) async throws -> Void = { try await Task.sleep(for: $0) }
    ) async throws -> Effect {
        var observedBoth = true
        for delay in [Duration.milliseconds(160), .milliseconds(330)] {
            try await pause(delay)
            if let after = observe() {
                if after != baseline { return .changed }
            } else {
                observedBoth = false
            }
        }
        return observedBoth ? .unchanged : .unobserved
    }

    private static func observation(
        window: ComputerWindow, document: AXUIElement?, element: AXUIElement?, pid: pid_t
    ) -> Observation? {
        guard let tree = try? ComputerAXTree.read(window: window, firstID: 0),
              document == nil || tree.includesWebArea else { return nil }
        func text(_ attribute: String, from node: AXUIElement) -> String? {
            let value = ComputerAccessibility.attribute(attribute, of: node)
            return (value as? URL)?.absoluteString ?? (value as? String) ?? (value as? NSNumber)?.stringValue
        }
        let url = document.flatMap { text(kAXURLAttribute, from: $0) } ?? tree.elements.lazy
            .first { ComputerAccessibility.role(of: $0) == "AXWebArea" }
            .flatMap { text(kAXURLAttribute, from: $0) }
        let app = AXUIElementCreateApplication(pid)
        let focused = ComputerAccessibility.elementAttribute(kAXFocusedUIElementAttribute, of: app, in: pid)
        return Observation(
            tree: tree.text, url: url, value: element.flatMap { text(kAXValueAttribute, from: $0) },
            focused: focused.map { CFHash($0) }
        )
    }
}
