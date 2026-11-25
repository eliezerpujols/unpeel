import ApplicationServices
import Foundation

enum ComputerAXActions {
    static func isAllowed(_ action: String) -> Bool {
        // Keep this allow-list aligned with the Host's computer_mcp/safety.rs.
        [
            "AXPress", "AXPick", "AXShowMenu", "AXIncrement", "AXDecrement", "AXConfirm",
            "AXCancel", "AXDismiss", "AXScrollUp", "AXScrollDown", "AXScrollLeft", "AXScrollRight",
            "AXScrollToVisible", "AXShowDefaultUI", "AXShowAlternateUI",
        ].contains(action)
    }

    static func pressAction(from actions: [String]) -> String? {
        [kAXPressAction, kAXPickAction].first { actions.contains($0) }
    }

    static func scrollValue(
        _ value: Double, minimum: Double?, maximum: Double?, steps: Int32, increasing: Bool
    ) -> Double? {
        guard value.isFinite else { return nil }
        let range: ClosedRange<Double>
        if let minimum, let maximum, minimum.isFinite, maximum.isFinite, minimum < maximum {
            range = minimum...maximum
        } else {
            // WebKit scroll bars report a normalized AXValue and may report
            // zero for both range attributes.
            guard (0...1).contains(value) else { return nil }
            range = 0...1
        }
        let delta = Double(steps) * (range.upperBound - range.lowerBound) / 20
        guard delta.isFinite else { return nil }
        return min(range.upperBound, max(range.lowerBound, value + (increasing ? delta : -delta)))
    }

    @MainActor
    static func perform(
        _ operation: ComputerRequest.ElementRequest.Operation, on element: AXUIElement, in pid: pid_t
    ) throws {
        guard ComputerAccessibility.pid(of: element) == pid,
              let role = ComputerAccessibility.role(of: element) else {
            throw ComputerError("The element has changed. Call get_app_state again.")
        }
        try Task.checkCancellation()
        switch operation {
        case .press:
            guard let action = pressAction(from: ComputerAccessibility.actions(on: element)) else {
                throw ComputerError("This element does not expose a press action.")
            }
            try perform(action, on: element)
        case let .setValue(text):
            guard [kAXTextFieldRole, kAXTextAreaRole, kAXComboBoxRole].contains(role) else {
                throw ComputerError("set_value requires a writable text element.")
            }
            try set(kAXValueAttribute, to: text as CFString, on: element)
        case .focus:
            guard ![kAXWindowRole, kAXApplicationRole, kAXMenuBarRole, kAXMenuRole].contains(role) else {
                throw ComputerError("Focus a control within the window.")
            }
            try set(kAXFocusedAttribute, to: kCFBooleanTrue, on: element)
        case let .scroll(direction, amount):
            try scroll(direction, amount: amount, from: element, in: pid)
        case let .perform(action):
            guard isAllowed(action), ComputerAccessibility.actions(on: element).contains(action) else {
                throw ComputerError("This element does not expose that background Accessibility action.")
            }
            try perform(action, on: element)
        }
    }

    @MainActor
    private static func scroll(
        _ direction: ComputerRequest.ScrollDirection, amount: Int32, from element: AXUIElement, in pid: pid_t
    ) throws {
        guard (1...20).contains(amount) else { throw ComputerError("Element scrolling accepts 1 to 20 steps per call.") }
        let action = "AXScroll" + direction.rawValue.capitalized
        let bar = direction == .up || direction == .down ? kAXVerticalScrollBarAttribute : kAXHorizontalScrollBarAttribute
        let step = direction == .down || direction == .right ? kAXIncrementAction : kAXDecrementAction
        var current: AXUIElement? = element
        for _ in 0..<16 {
            guard let candidate = current else { break }
            if ComputerAccessibility.actions(on: candidate).contains(action) {
                for _ in 0..<amount { try perform(action, on: candidate) }
                return
            }
            if let scrollbar = ComputerAccessibility.elementAttribute(bar, of: candidate, in: pid) {
                if ComputerAccessibility.actions(on: scrollbar).contains(step) {
                    for _ in 0..<amount { try perform(step, on: scrollbar) }
                    return
                }
                if let value = ComputerAccessibility.attribute(kAXValueAttribute, of: scrollbar) as? NSNumber,
                   ComputerAccessibility.isSettable(kAXValueAttribute, on: scrollbar) {
                    let minValue = (ComputerAccessibility.attribute(kAXMinValueAttribute, of: scrollbar) as? NSNumber)?.doubleValue
                    let maxValue = (ComputerAccessibility.attribute(kAXMaxValueAttribute, of: scrollbar) as? NSNumber)?.doubleValue
                    guard let next = scrollValue(
                        value.doubleValue, minimum: minValue, maximum: maxValue, steps: amount, increasing: step == kAXIncrementAction
                    ) else {
                        throw ComputerError("This scroll bar has no usable range.")
                    }
                    try set(kAXValueAttribute, to: NSNumber(value: next), on: scrollbar)
                    return
                }
            }
            if [kAXWindowRole, kAXApplicationRole].contains(ComputerAccessibility.role(of: candidate) ?? "") { break }
            current = ComputerAccessibility.parent(of: candidate, in: pid)
        }
        throw ComputerError("No Accessibility scroll control was found. Try a visible scroll area with a coordinate.")
    }

    @MainActor
    private static func perform(_ action: String, on element: AXUIElement) throws {
        try Task.checkCancellation()
        guard AXUIElementPerformAction(element, action as CFString) == .success else {
            throw ComputerError("Accessibility did not confirm \(action). Refresh the app state before retrying.")
        }
    }

    @MainActor
    private static func set(_ attribute: String, to value: CFTypeRef, on element: AXUIElement) throws {
        guard ComputerAccessibility.isSettable(attribute, on: element) else {
            throw ComputerError("This element does not allow changing \(attribute).")
        }
        try Task.checkCancellation()
        guard AXUIElementSetAttributeValue(element, attribute as CFString, value) == .success else {
            throw ComputerError("Accessibility did not confirm changing \(attribute). Refresh the app state before retrying.")
        }
    }
}
