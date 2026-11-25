import AppKit

enum ComputerPointerDelivery: Equatable {
    struct Window: Equatable {
        let id: CGWindowID
        let bounds: CGRect
    }

    case window(pid_t, Window)
    case hid(pid_t, requiresActivation: Bool = false)

    init(pid: pid_t, window: Window?, role: String?, bundleID: String, isClick: Bool, isForeground: Bool) {
        let systemMenus = [kAXMenuBarRole, kAXMenuBarItemRole, kAXMenuRole, kAXMenuItemRole]
        let usesSystemMenu = role.map(systemMenus.contains) ?? false
        // TextEdit accepts window-targeted clicks when key, but its text
        // view discards them in the background. Use one compensated HID click.
        let needsActiveTextEdit = isClick && !isForeground && role == kAXTextAreaRole
            && bundleID.caseInsensitiveCompare("com.apple.TextEdit") == .orderedSame
        if let window, !usesSystemMenu, !needsActiveTextEdit {
            self = .window(pid, window)
        } else {
            self = .hid(pid, requiresActivation: needsActiveTextEdit)
        }
    }

    var targetsWindow: Bool {
        if case .window = self { return true }
        return false
    }

    /// AppKit must build the event with a window number. The public Quartz
    /// window-under-pointer fields alone leave NSEvent.windowNumber at zero.
    @MainActor
    static func windowMouseLocation(_ point: CGPoint, in window: Window, screenTop: CGFloat) -> CGPoint {
        if let nativeWindow = NSApp?.window(withWindowNumber: Int(window.id)) {
            return nativeWindow.convertPoint(fromScreen: CGPoint(x: point.x, y: screenTop - point.y))
        }
        // A foreign window has no NSWindow in the sender. AppKit interprets
        // its event location against the primary screen and the window's
        // height, so remove the Quartz origin and flip against that screen.
        return CGPoint(x: point.x - window.bounds.minX, y: screenTop - (point.y - window.bounds.minY))
    }

    func post(_ event: CGEvent) {
        switch self {
        case let .window(pid, window):
            event.setIntegerValueField(.eventTargetUnixProcessID, value: Int64(pid))
            event.setIntegerValueField(.mouseEventWindowUnderMousePointer, value: Int64(window.id))
            event.setIntegerValueField(.mouseEventWindowUnderMousePointerThatCanHandleThisEvent, value: Int64(window.id))
            event.postToPid(pid)
        case .hid:
            event.post(tap: .cghidEventTap)
        }
    }
}

struct ComputerPointerTarget {
    let app: ComputerTarget
    let window: ComputerPointerDelivery.Window?
    let delivery: ComputerPointerDelivery
}
