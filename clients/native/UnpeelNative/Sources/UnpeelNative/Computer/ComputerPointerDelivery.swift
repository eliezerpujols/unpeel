import AppKit
import Darwin

struct ComputerPointerDelivery: Equatable {
    struct Window: Equatable {
        let id: CGWindowID
        let bounds: CGRect

        func appKitLocation(of point: CGPoint) -> CGPoint {
            CGPoint(x: point.x - bounds.minX, y: bounds.maxY - point.y)
        }
    }

    let pid: pid_t
    let window: Window

    private typealias SetWindowLocation = @convention(c) (CGEvent, CGPoint) -> Void

    private static let setWindowLocation: SetWindowLocation? = {
        guard let library = dlopen("/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics", RTLD_LAZY),
              let symbol = dlsym(library, "CGEventSetWindowLocation") else { return nil }
        return unsafeBitCast(symbol, to: SetWindowLocation.self)
    }()

    func setScopedLocation(_ event: CGEvent, at point: CGPoint) throws {
        guard let setter = Self.setWindowLocation else {
            throw ComputerError("macOS does not expose window-local mouse positioning for this click.")
        }
        // AppKit creates the window number, but converting its NSEvent to
        // CGEvent does not preserve a usable local position for a foreign
        // window. Core Graphics stores this position in top-left points.
        event.location = point
        setter(event, CGPoint(x: point.x - window.bounds.minX, y: point.y - window.bounds.minY))
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
        usesBrowserEngine: Bool, isForeground: Bool, capturedDelivery: ComputerPointerDelivery? = nil
    ) {
        if let action = candidate?.action {
            self = .accessibility(action)
        } else if let capturedDelivery, candidate?.isDisabled != true {
            self = .process(capturedDelivery)
        } else if let delivery, isForeground || (!usesBrowserEngine && candidate?.acceptsBackgroundEvents != false) {
            self = .process(delivery)
        } else {
            self = .unavailable
        }
    }
}

extension ComputerClickRoute: Equatable where Element: Equatable {}
