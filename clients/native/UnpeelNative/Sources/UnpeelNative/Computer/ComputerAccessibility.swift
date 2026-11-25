import ApplicationServices
import Foundation

@MainActor
enum ComputerAccessibility {
    struct Hit {
        let element: AXUIElement
        let pid: pid_t
        let role: String?
    }

    enum Click<Element> {
        case press(Element)
        case focus(Element)
    }

    struct ClickCandidate<Element> {
        var action: Click<Element>?
        var acceptsBackgroundEvents = true
        var isDisabled = false
    }

    private static let desktop = {
        let element = AXUIElementCreateSystemWide()
        AXUIElementSetMessagingTimeout(element, 0.25)
        return element
    }()

    static func hit(at point: CGPoint, in pid: pid_t? = nil) -> Hit? {
        let root = pid.map(AXUIElementCreateApplication) ?? desktop
        var element: AXUIElement?
        var hitPID: pid_t = 0
        guard AXUIElementCopyElementAtPosition(root, Float(point.x), Float(point.y), &element) == .success,
              let element, AXUIElementGetPid(element, &hitPID) == .success, hitPID > 0,
              pid == nil || pid == hitPID
        else { return nil }
        return Hit(element: element, pid: hitPID, role: role(of: element))
    }

    static func clickCandidate(
        at hit: Hit, allowsAXAction: Bool, isTextEdit: Bool
    ) -> ClickCandidate<AXUIElement> {
        clickCandidate(
            at: hit.element, allowsAXAction: allowsAXAction, isTextEdit: isTextEdit,
            roleOf: { CFEqual($0, hit.element) ? hit.role : role(of: $0) },
            parentOf: { parent(of: $0, in: hit.pid) },
            isEnabled: { attribute(kAXEnabledAttribute, of: $0) as? Bool != false },
            canFocus: { isSettable(kAXFocusedAttribute, on: $0) },
            canPress: { actions(on: $0).contains(kAXPressAction) }
        )
    }

    static func clickCandidate<Element>(
        at hit: Element, allowsAXAction: Bool, isTextEdit: Bool, roleOf: (Element) -> String?,
        parentOf: (Element) -> Element?, isEnabled: (Element) -> Bool,
        canFocus: (Element) -> Bool, canPress: (Element) -> Bool
    ) -> ClickCandidate<Element> {
        var candidate = ClickCandidate<Element>()
        var element = hit
        // A label or icon often sits inside the actual actionable control.
        // Bound the number of AX requests and never walk above the window.
        for _ in 0..<16 {
            guard let role = roleOf(element), role != kAXWindowRole, role != kAXApplicationRole,
                  role != kAXMenuBarRole else { break }
            if role == "AXWebArea" || (isTextEdit && role == kAXTextAreaRole) {
                candidate.acceptsBackgroundEvents = false
            }
            guard isEnabled(element) else {
                candidate.acceptsBackgroundEvents = false
                candidate.isDisabled = true
                break
            }
            if allowsAXAction {
                if [kAXTextFieldRole, kAXTextAreaRole, kAXComboBoxRole].contains(role), canFocus(element) {
                    candidate.action = .focus(element)
                    break
                }
                if canPress(element) {
                    candidate.action = .press(element)
                    break
                }
            }
            guard let parent = parentOf(element) else { break }
            element = parent
        }
        return candidate
    }

    static func perform(_ click: Click<AXUIElement>) -> AXError {
        switch click {
        case let .press(element): AXUIElementPerformAction(element, kAXPressAction as CFString)
        case let .focus(element): AXUIElementSetAttributeValue(element, kAXFocusedAttribute as CFString, kCFBooleanTrue)
        }
    }

    static func role(of element: AXUIElement) -> String? {
        attribute(kAXRoleAttribute, of: element) as? String
    }

    static func pid(of element: AXUIElement) -> pid_t? {
        var pid: pid_t = 0
        return AXUIElementGetPid(element, &pid) == .success && pid > 0 ? pid : nil
    }

    static func parent(of element: AXUIElement, in pid: pid_t) -> AXUIElement? {
        elementAttribute(kAXParentAttribute, of: element, in: pid)
    }

    static func webArea(containing element: AXUIElement, in pid: pid_t) -> AXUIElement? {
        var current: AXUIElement? = element
        for _ in 0..<24 {
            guard let node = current else { break }
            switch role(of: node) {
            case "AXWebArea": return node
            case kAXWindowRole, kAXApplicationRole: return nil
            default: current = parent(of: node, in: pid)
            }
        }
        return nil
    }

    static func elementAttribute(_ name: String, of element: AXUIElement, in pid: pid_t) -> AXUIElement? {
        guard let value = attribute(name, of: element), CFGetTypeID(value) == AXUIElementGetTypeID() else { return nil }
        let result = unsafeDowncast(value, to: AXUIElement.self)
        return Self.pid(of: result) == pid ? result : nil
    }

    static func isSettable(_ name: String, on element: AXUIElement) -> Bool {
        var settable: DarwinBoolean = false
        return AXUIElementIsAttributeSettable(element, name as CFString, &settable) == .success && settable.boolValue
    }

    static func actions(on element: AXUIElement) -> [String] {
        var raw: CFArray?
        guard AXUIElementCopyActionNames(element, &raw) == .success else { return [] }
        return raw as? [String] ?? []
    }

    static func attribute(_ name: String, of element: AXUIElement) -> CFTypeRef? {
        var value: CFTypeRef?
        guard AXUIElementCopyAttributeValue(element, name as CFString, &value) == .success else { return nil }
        return value
    }
}

extension ComputerAccessibility.Click: Equatable where Element: Equatable {}
