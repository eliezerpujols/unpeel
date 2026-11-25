import AppKit

struct ComputerPointerDelivery: Equatable {
    struct Window: Equatable {
        let id: CGWindowID
        let bounds: CGRect
    }

    let pid: pid_t
    let window: Window

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
        event.setIntegerValueField(.eventTargetUnixProcessID, value: Int64(pid))
        event.setIntegerValueField(.mouseEventWindowUnderMousePointer, value: Int64(window.id))
        event.setIntegerValueField(.mouseEventWindowUnderMousePointerThatCanHandleThisEvent, value: Int64(window.id))
        event.postToPid(pid)
    }
}

struct ComputerPointerTarget {
    let app: ComputerTarget
    let window: ComputerPointerDelivery.Window?
    let hit: ComputerAccessibility.Hit?
    let usesBrowserEngine: Bool
    var canDeliverToWindow = true

    var delivery: ComputerPointerDelivery? {
        let menus = [kAXMenuBarRole, kAXMenuBarItemRole, kAXMenuRole, kAXMenuItemRole]
        guard canDeliverToWindow, let window, let pid = app.pid, hit?.role.map(menus.contains) != true else { return nil }
        return ComputerPointerDelivery(pid: pid, window: window)
    }
}

enum ComputerClickRoute<Element> {
    case accessibility(ComputerAccessibility.Click<Element>)
    case process(ComputerPointerDelivery)
    case unavailable

    init(
        candidate: ComputerAccessibility.ClickCandidate<Element>?, delivery: ComputerPointerDelivery?,
        usesBrowserEngine: Bool, isForeground: Bool
    ) {
        if let action = candidate?.action {
            self = .accessibility(action)
        } else if let delivery, isForeground || (!usesBrowserEngine && candidate?.acceptsBackgroundEvents != false) {
            self = .process(delivery)
        } else {
            self = .unavailable
        }
    }
}

extension ComputerClickRoute: Equatable where Element: Equatable {}
