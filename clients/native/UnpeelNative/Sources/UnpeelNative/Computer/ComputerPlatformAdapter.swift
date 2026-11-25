import AppKit
import ApplicationServices
import CoreGraphics
import Foundation

@MainActor
final class ComputerPlatformAdapter {
    enum Operation: String, CaseIterable {
        case resolve = "computer.resolve"
        case perform = "computer.perform"
        case status = "computer.status"
        case apps = "computer.apps"
    }

    static let shared = ComputerPlatformAdapter()

    private let input = ComputerInput()
    private let ghost = ComputerGhostCursor()
    private let windowStream = ComputerWindowStream()
    private var elements = ComputerElementCache<AXUIElement>()
    private var frames: [String: ComputerScreenshotGeometry] = [:]
    private var cursorPoints: [String: CGPoint] = [:]
    private var actionInProgress = false
    private var tasks: [UUID: Task<Success, Error>] = [:]
    private var buttonHold: (target: ComputerTarget, activity: ComputerControl.Activity)?
    private let control = ComputerControl.shared

    private init() {
        control.onGenerationChange = { [weak self] in self?.stop() }
    }

    private func stop() {
        for task in tasks.values { task.cancel() }
        input.releaseLeftButton()
        ghost.clear()
        windowStream.stop()
        elements.clear()
        buttonHold = nil
        control.show(nil)
    }

    private struct Resolution: Encodable {
        let ok = true
        let target: ComputerTarget?
        let frontmostApp: ComputerApps.App?
        let screenCoordinate: [CGFloat]?
        let screenEndCoordinate: [CGFloat]?
        let controlGeneration: String

        enum CodingKeys: String, CodingKey {
            case ok, target
            case frontmostApp = "frontmost_app"
            case screenCoordinate = "screen_coordinate"
            case screenEndCoordinate = "screen_end_coordinate"
            case controlGeneration = "control_generation"
        }
    }

    private enum Recipient {
        case keyboard(ComputerTarget)
        case pointer(ComputerPointerTarget, CGPoint, end: CGPoint? = nil)
        case launch(ComputerApps.Launch)
        case window(ComputerTarget, id: CGWindowID?, includesTree: Bool)
        case element(ComputerWindow, AXUIElement)

        var target: ComputerTarget {
            switch self {
            case let .keyboard(target), let .window(target, _, _): target
            case let .pointer(target, _, _): target.app
            case let .launch(launch): launch.target
            case let .element(window, _): window.app
            }
        }

        var points: (start: CGPoint, end: CGPoint?)? {
            if case let .pointer(_, point, end) = self { return (point, end) }
            return nil
        }

        var sendsInput: Bool {
            if case .window = self { return false }
            return true
        }
    }

    private struct Success: Encodable {
        let ok = true
        var screenshotPath: String?
        var width: Int?
        var height: Int?
        var scale: CGFloat?
        var display: Int?
        var window: ComputerWindow?
        var windows: [ComputerWindow]?
        var screenshotWarning: String?
        var deliveredVia: ComputerClickMethod?
        var axTree: String?
        var coordinate: [Int]?
        var frontmostApp: ComputerApps.App?

        enum CodingKeys: String, CodingKey {
            case ok, width, height, scale, coordinate, display, window, windows
            case axTree = "ax_tree"
            case screenshotPath = "screenshot_path"
            case screenshotWarning = "screenshot_warning"
            case deliveredVia = "delivered_via"
            case frontmostApp = "frontmost_app"
        }
    }

    private struct Status: Encodable {
        let ok = true
        let available = true
        let ready: Bool
        let reason: String?
        let screenRecording: Bool
        let accessibility: Bool
        let displays: [ComputerDisplays.Display]
        let frontmostApp: ComputerApps.App?

        enum CodingKeys: String, CodingKey {
            case ok, available, ready, reason, accessibility, displays
            case screenRecording = "screen_recording"
            case frontmostApp = "frontmost_app"
        }
    }

    private struct AppList: Encodable {
        let ok = true
        let apps: [ComputerApps.App]
    }

    private struct Failure: Encodable {
        let ok = false
        let error: String
    }

    func status() -> String {
        let screenRecording = ComputerPermissions.screenRecording
        let accessibility = ComputerPermissions.accessibility
        let missing = [
            screenRecording ? nil : ComputerPermissions.screenRecordingMessage,
            accessibility ? nil : ComputerPermissions.accessibilityMessage,
        ].compactMap { $0 }
        return encode(Status(
            ready: missing.isEmpty,
            reason: missing.isEmpty ? nil : missing.joined(separator: " "),
            screenRecording: screenRecording,
            accessibility: accessibility,
            displays: ComputerDisplays.active(),
            frontmostApp: ComputerApps.frontmost
        ))
    }

    func apps() -> String {
        encode(AppList(apps: ComputerApps.running))
    }

    func resolve(_ parsed: Result<ComputerRequest, ComputerError>) -> String {
        do {
            let request = try parsed.get()
            try control.requireRunning()
            if let index = request.displayIndex {
                _ = try ComputerDisplays.select(index, previousID: nil, from: ComputerDisplays.active())
            }
            let recipient = try recipient(for: request)
            return encode(Resolution(
                target: recipient?.target,
                frontmostApp: ComputerApps.frontmost,
                screenCoordinate: recipient?.points.map { [$0.start.x, $0.start.y] },
                screenEndCoordinate: recipient?.points?.end.map { [$0.x, $0.y] },
                controlGeneration: control.snapshot.generation
            ))
        } catch {
            return encode(Failure(error: error.localizedDescription))
        }
    }

    func perform(_ parsed: Result<ComputerRequest, ComputerError>) async -> String {
        do {
            let request = try parsed.get()
            guard let generation = request.controlGeneration else {
                throw ComputerError("The workspace Host must authorize the computer action.")
            }
            try control.requireRunning(generation: generation)
            let id = UUID()
            let task = Task { try await run(request, generation: generation) }
            tasks[id] = task
            defer { tasks.removeValue(forKey: id) }
            return try await withTaskCancellationHandler {
                encode(try await task.value)
            } onCancel: {
                task.cancel()
            }
        } catch is CancellationError {
            return encode(Failure(error: control.snapshot.paused
                ? ComputerControl.pausedMessage : "Computer action was cancelled."))
        } catch {
            return encode(Failure(error: error.localizedDescription))
        }
    }

    private func run(_ request: ComputerRequest, generation: String) async throws -> Success {
        try control.requireRunning(generation: generation)
        if case let .wait(duration) = request.action {
            try await Task.sleep(for: duration)
            try control.requireRunning(generation: generation)
            return Success(frontmostApp: ComputerApps.frontmost)
        }
        guard !actionInProgress else {
            throw ComputerError("Another computer action is in progress. Try again when it finishes.")
        }
        actionInProgress = true
        defer {
            actionInProgress = false
            control.show(buttonHold?.activity)
        }

        if request.screenshotPath != nil, !ComputerPermissions.screenRecording {
            throw ComputerError(ComputerPermissions.screenRecordingMessage)
        }
        let recipient = try recipient(for: request, performing: true)
        let postingPointerInput = recipient?.points != nil
        if postingPointerInput { control.setPointerDelivery(true) }
        defer { if postingPointerInput { control.setPointerDelivery(false) } }
        var response = Success()
        var region: CGRect?
        if case let .zoom(pixels) = request.action {
            let frame = try currentFrame(for: request.sessionID)
            region = try frame.screenRegion(for: pixels)
        }
        if let recipient {
            try authorize(request, target: recipient.target)
            if recipient.sendsInput {
                let activity = ComputerControl.Activity(
                    sessionID: request.sessionID,
                    sessionName: request.sessionName.flatMap { $0.isEmpty ? nil : $0 } ?? String(request.sessionID.prefix(8)),
                    appName: recipient.target.name,
                    targetPoint: recipient.points?.start
                )
                control.show(activity)
                response.deliveredVia = try await post(request, to: recipient, generation: generation, activity: activity)
            }
        } else {
            guard request.target == nil else { throw ComputerError("The computer action target changed.") }
            switch request.action {
            case .cursorPosition:
                let frame = try currentFrame(for: request.sessionID)
                response.coordinate = ComputerPixelCoordinate.rounded(
                    frame.pixelPoint(for: try cursorPoint(for: request.sessionID))
                )
            default:
                break
            }
        }

        if let path = request.screenshotPath {
            do {
                if recipient?.sendsInput == true {
                    // Input delivery and the following frame are asynchronous.
                    try await Task.sleep(for: .milliseconds(125))
                }
                if postingPointerInput { control.setPointerDelivery(false) }
                try control.requireRunning(generation: generation)
                let geometry = try await capture(
                    path: path, request: request, recipient: recipient, region: region, response: &response
                )
                try control.requireRunning(generation: generation)
                if case .window(_, _, true) = recipient, let window = geometry.window {
                    let tree = try await ComputerAXTree.capture(window: window, firstID: elements.nextID)
                    try control.requireRunning(generation: generation)
                    elements.replace(session: request.sessionID, window: window, elements: tree.elements)
                    response.axTree = tree.text
                }
                frames[request.sessionID] = geometry
                response.screenshotPath = path
                response.width = geometry.width
                response.height = geometry.height
                response.scale = geometry.scale
                response.window = geometry.window
                response.windows = geometry.availableWindows
                response.screenshotWarning = geometry.warning
            } catch let error where recipient?.sendsInput == true && !(error is CancellationError) {
                throw ComputerError("The action completed, but the screenshot failed: \(error.localizedDescription)")
            }
        }
        response.frontmostApp = ComputerApps.frontmost
        return response
    }

    private func capture(
        path: String, request: ComputerRequest, recipient: Recipient?, region: CGRect?, response: inout Success
    ) async throws -> ComputerScreenshotGeometry {
        if case let .window(app, id, _) = recipient {
            return try await ComputerScreenshot.captureWindow(
                to: path, app: app, id: id, region: region, stream: (windowStream, request.sessionID)
            )
        }
        let previous = request.action == .screenshot ? nil : frames[request.sessionID]
        if let window = previous?.window, recipient == nil || recipient?.target.matches(window.app) == true {
            return try await ComputerScreenshot.captureWindow(
                to: path, app: window.app, id: window.id, region: region, stream: (windowStream, request.sessionID)
            )
        }
        let display = try ComputerDisplays.select(
            request.displayIndex, previousID: previous?.displayID, from: ComputerDisplays.active()
        )
        if region != nil, display.id != previous?.displayID {
            throw ComputerError("The zoom display is no longer active. Take a new screenshot.")
        }
        response.display = display.index
        return try await ComputerScreenshot.capture(to: path, displayID: display.id, region: region)
    }

    private func recipient(for request: ComputerRequest, performing: Bool = false) throws -> Recipient? {
        if request.action.needsAccessibility, !ComputerPermissions.accessibility {
            throw ComputerError(ComputerPermissions.accessibilityMessage)
        }
        func point(_ pixel: CGPoint?, resolved: CGPoint?) throws -> CGPoint {
            // Recheck explicit pixels against the current frame. Pin implicit
            // cursor actions to the approved point even if the cursor moved
            // while the approval prompt was on screen.
            let mapped = try pixel.map { try screenPoint($0, for: request.sessionID) }
            if performing {
                guard let resolved, mapped == nil || mapped == resolved else {
                    throw ComputerError("The resolved coordinates changed. Take a new screenshot and retry.")
                }
                return resolved
            }
            return try mapped ?? cursorPoint(for: request.sessionID)
        }
        switch request.action {
        case let .windowScreenshot(window), let .appState(window):
            let app = try ComputerTargetLookup.keyboard(app: window.app)
            return .window(app, id: window.id, includesTree: request.name == "get_app_state")
        case let .element(action):
            let (window, element) = try elements.element(session: request.sessionID, bundleID: action.app, id: action.id)
            let app = try ComputerTargetLookup.keyboard(app: action.app)
            guard window.app.matches(app) else { throw ComputerError("The app relaunched. Call get_app_state again.") }
            return .element(window, element)
        case .zoom:
            guard let window = frames[request.sessionID]?.window else { return nil }
            let app = try ComputerTargetLookup.keyboard(app: window.app.bundleID)
            guard app.matches(window.app) else { throw ComputerError("The app relaunched. Take a new screenshot.") }
            return .window(app, id: window.id, includesTree: false)
        case .type, .key:
            return .keyboard(try ComputerTargetLookup.keyboard(app: request.keyboardApp))
        case let .openApp(name):
            return .launch(try ComputerApps.resolveLaunch(name))
        case let .click(_, _, pixel), let .mouseMove(pixel):
            let position = try point(pixel, resolved: request.screenPoint)
            return .pointer(try pointer(at: position, session: request.sessionID), position)
        case let .leftMouseDown(pixel), let .leftMouseUp(pixel), let .scroll(_, _, pixel):
            let position = try point(pixel, resolved: request.screenPoint)
            return .pointer(try pointer(at: position, session: request.sessionID), position)
        case let .drag(start, end):
            let first = try point(start, resolved: request.screenPoint)
            let last = try point(end, resolved: request.screenEndPoint)
            let target = try pointer(at: first, session: request.sessionID)
            guard target.app.matches(try pointer(at: last, session: request.sessionID).app) else {
                throw ComputerError("Computer use can only drag within the same app.")
            }
            return .pointer(target, first, end: last)
        case .screenshot, .cursorPosition, .wait, .status:
            return nil
        }
    }

    private func authorize(_ request: ComputerRequest, target: ComputerTarget) throws {
        try ComputerAppTier.require(request.name, in: target, unrestricted: request.unrestricted)
        guard let approvedTarget = request.target, target.matches(approvedTarget) else {
            throw ComputerError("The target app changed. Bring the app into view and retry the action.")
        }
        let state = try? JSONSerialization.jsonObject(with: Data(contentsOf: LaunchConfig.appStateFile)) as? [String: Any]
        let mode = (state?["computer_use"] as? String).map(ComputerAccess.fromStateString) ?? .off
        let approvals = state?["computer_app_approvals"] as? [String: [String: String]]
        let decision = approvals?[request.sessionID]?[target.bundleID.lowercased()]
        guard ComputerAppAuthorization.allowsInput(mode: mode, unrestricted: request.unrestricted, decision: decision)
        else { throw ComputerError("The session does not have computer access to \(target.name).") }

        if let hold = buttonHold {
            guard hold.activity.sessionID == request.sessionID,
                  hold.target.matches(target),
                  ["mouse_move", "left_mouse_up"].contains(request.name)
            else { throw ComputerError("A session is holding the left mouse button. Release it before acting in another app.") }
        }
    }

    private func post(
        _ request: ComputerRequest, to recipient: Recipient, generation: String, activity: ComputerControl.Activity
    ) async throws -> ComputerClickMethod? {
        func check(_ actual: ComputerTarget) throws {
            try control.requireRunning(generation: generation)
            try ComputerAppTier.require(request.name, in: actual, unrestricted: request.unrestricted)
            guard actual.matches(recipient.target) else {
                throw ComputerError("The target app changed. Bring the app into view and retry the action.")
            }
        }
        var method: ComputerClickMethod?
        switch recipient {
        case let .launch(launch):
            try check(launch.target)
            try await launch.open()
        case .window:
            break
        case let .element(window, element):
            guard case let .element(action) = request.action, let pid = window.app.pid else {
                throw ComputerError("The element has no target process.")
            }
            let liveWindow = ComputerWindow(id: window.id, title: window.title, bounds: try window.liveBounds(), app: window.app)
            guard ComputerAXTree.contains(element, in: liveWindow) else {
                throw ComputerError("The element is no longer in this window. Call get_app_state again.")
            }
            func checkElement() throws {
                let current = try ComputerTargetLookup.keyboard(app: action.app)
                try check(current)
                try authorize(request, target: current)
            }
            try checkElement()
            let bounds = ComputerAXTree.bounds(of: element)?.intersection(liveWindow.bounds)
            if action.operation == .press || action.operation == .perform(kAXPressAction) {
                method = try await ComputerWebClick.press(
                    action.operation, element: element, window: liveWindow, check: checkElement
                ) { point, delivery in
                    try input.click(.left, count: 1, at: point, delivery: delivery, windowScoped: true)
                }
            } else {
                try ComputerAXActions.perform(action.operation, on: element, in: pid)
            }
            if let bounds, !bounds.isEmpty {
                let point = CGPoint(x: bounds.midX, y: bounds.midY)
                cursorPoints[request.sessionID] = point
                ghost.show(at: point, over: window.id)
            }
        case let .keyboard(target):
            guard let pid = target.pid else { throw ComputerError("The target app has no process.") }
            let checkKeyboard = { try check(ComputerTargetLookup.keyboard(app: request.keyboardApp)) }
            switch request.action {
            case let .type(text): try await input.type(text, to: pid, checkTarget: checkKeyboard)
            case let .key(key, duration):
                try checkKeyboard()
                try await input.key(key, duration: duration, to: pid)
            default: break
            }
        case let .pointer(target, point, end):
            func checkPoint(_ position: CGPoint) throws {
                try check(pointer(at: position, session: request.sessionID).app)
            }
            let actual = try pointer(at: point, session: request.sessionID)
            try check(actual.app)
            guard actual.window == target.window else {
                throw ComputerError("The window under the point changed. Take a new screenshot and retry.")
            }
            method = try await postPointer(
                request, target: actual, point: point, end: end, activity: activity, checkPoint: checkPoint
            )
            cursorPoints[request.sessionID] = end ?? point
            ghost.show(at: end ?? point, over: target.window?.id)
        }
        try control.requireRunning(generation: generation)
        return method
    }

    private func pointer(at point: CGPoint, session: String) throws -> ComputerPointerTarget {
        try ComputerTargetLookup.pointer(at: point, in: frames[session]?.window, excluding: ghost.windowID)
    }

    private func postPointer(
        _ request: ComputerRequest, target: ComputerPointerTarget, point: CGPoint, end: CGPoint?,
        activity: ComputerControl.Activity, checkPoint: (CGPoint) throws -> Void
    ) async throws -> ComputerClickMethod? {
        let delivery = target.delivery
        switch request.action {
        case .mouseMove:
            // A point on a system surface can still establish the session's
            // cursor without moving the physical pointer.
            if let delivery { try input.move(to: point, delivery: delivery) }
        case .drag, .leftMouseDown, .leftMouseUp:
            guard let delivery else {
                throw ComputerError("Dragging or holding a button requires a target window.")
            }
            switch request.action {
            case .drag:
                if let end {
                    try await input.drag(from: point, to: end, delivery: delivery, checkPoint: checkPoint)
                }
            case .leftMouseDown:
                try input.pressLeftButton(at: point, delivery: delivery)
                buttonHold = (target.app, activity)
            case .leftMouseUp:
                try input.liftLeftButton(at: point, delivery: delivery)
                buttonHold = nil
            default: break
            }
        case let .click(button, count, _):
            let simpleLeft = button == .left && count == 1
            let captured = frames[request.sessionID]?.window.flatMap {
                $0.id == target.window?.id && $0.app.matches(target.app) ? $0 : nil
            }
            let capturedDelivery = simpleLeft ? captured.flatMap { window in
                window.app.pid.map { ComputerPointerDelivery(pid: $0, window: .init(id: window.id, bounds: window.bounds)) }
            } : nil
            func clickCandidate(_ hit: ComputerAccessibility.Hit) -> ComputerAccessibility.ClickCandidate<AXUIElement> {
                ComputerAccessibility.clickCandidate(
                    at: hit, allowsAXAction: simpleLeft,
                    isTextEdit: target.app.bundleID.caseInsensitiveCompare("com.apple.TextEdit") == .orderedSame
                )
            }
            var candidate = target.hit.map(clickCandidate)
            if simpleLeft, target.usesBrowserEngine, candidate?.action == nil, candidate?.isDisabled != true,
               let captured, let hit = ComputerAXTree.clickHit(at: point, in: captured) {
                candidate = clickCandidate(hit)
            }
            let isForeground = NSWorkspace.shared.frontmostApplication?.processIdentifier == target.app.pid
            try Task.checkCancellation()
            switch ComputerClickRoute(
                candidate: candidate, delivery: delivery, usesBrowserEngine: target.usesBrowserEngine,
                isForeground: isForeground, capturedDelivery: capturedDelivery
            ) {
            case let .accessibility(.press(element)) where captured != nil:
                guard let captured else { break }
                return try await ComputerWebClick.press(.perform(kAXPressAction), element: element, window: captured, check: {
                    try checkPoint(point)
                    try authorize(request, target: target.app)
                }) { center, delivery in
                    try input.click(.left, count: 1, at: center, delivery: delivery, windowScoped: true)
                }
            case let .accessibility(click):
                // AX can time out after dispatch. Never send a second click.
                let result = ComputerAccessibility.perform(click)
                guard result == .success else {
                    throw ComputerError("Accessibility could not confirm the click in \(target.app.name). Check the app before retrying.")
                }
                if case .press = click { return .axPress }
            case let .process(delivery):
                try input.click(button, count: count, at: point, delivery: delivery, windowScoped: captured != nil)
                return .pidClick
            case .unavailable:
                if !isForeground {
                    throw ComputerError("This click needs the app in front. Bring \(target.app.name) forward manually and retry.")
                }
                throw ComputerError("This click needs an accessible control or a window that accepts targeted input.")
            }
        case let .scroll(direction, amount, _):
            guard let delivery else {
                throw ComputerError("Scrolling requires a window that accepts targeted input.")
            }
            try input.scroll(direction, amount: amount, at: point, delivery: delivery)
        default: break
        }
        return nil
    }

    private func cursorPoint(for sessionID: String) throws -> CGPoint {
        try cursorPoints[sessionID] ?? input.cursorPosition()
    }

    private func currentFrame(for sessionID: String) throws -> ComputerScreenshotGeometry {
        guard let frame = frames[sessionID] else {
            throw ComputerError("Take a screenshot first to establish this session's coordinates.")
        }
        if let window = frame.window {
            guard try window.liveBounds() == window.bounds else {
                frames.removeValue(forKey: sessionID)
                throw ComputerError("The captured window moved or resized. Take a new screenshot.")
            }
            return frame
        }
        guard let displayID = frame.displayID,
              CGDisplayIsActive(displayID) != 0, CGDisplayBounds(displayID) == frame.displayBounds else {
            frames.removeValue(forKey: sessionID)
            throw ComputerError("The display layout changed. Take a new screenshot.")
        }
        return frame
    }

    private func screenPoint(_ pixel: CGPoint, for sessionID: String) throws -> CGPoint {
        try currentFrame(for: sessionID).screenPoint(for: pixel)
    }

    private func encode(_ response: some Encodable) -> String {
        guard let data = try? JSONEncoder().encode(response) else {
            return #"{"ok":false,"error":"Could not encode the computer response."}"#
        }
        return String(decoding: data, as: UTF8.self)
    }
}


// Pixel coordinates outside the captured display can be negative.
enum ComputerPixelCoordinate {
    static func rounded(_ point: CGPoint) -> [Int] {
        [Int(point.x.rounded()), Int(point.y.rounded())]
    }
}
