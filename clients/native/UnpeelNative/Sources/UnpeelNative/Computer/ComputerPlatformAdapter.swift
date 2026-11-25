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
    private var frames: [String: ComputerScreenshotGeometry] = [:]
    private var actionInProgress = false
    private var tasks: [UUID: Task<Success, Error>] = [:]
    private var buttonHold: (target: ComputerTarget, activity: ComputerControl.Activity)?
    private let control = ComputerControl.shared

    private init() {
        control.onGenerationChange = { [weak self] in self?.stop() }
    }

    private func stop() {
        for task in tasks.values { task.cancel() }
        if let pid = buttonHold?.target.pid {
            input.releaseLeftButton(to: pid)
        }
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
        case pointer(ComputerTarget, CGPoint, end: CGPoint? = nil)
        case launch(ComputerApps.Launch)

        var target: ComputerTarget {
            switch self {
            case let .keyboard(target), let .pointer(target, _, _): target
            case let .launch(launch): launch.target
            }
        }

        var points: (start: CGPoint, end: CGPoint?)? {
            if case let .pointer(_, point, end) = self { return (point, end) }
            return nil
        }
    }

    private struct Success: Encodable {
        let ok = true
        var screenshotPath: String?
        var width: Int?
        var height: Int?
        var scale: CGFloat?
        var coordinate: [Int]?
        var frontmostApp: ComputerApps.App?

        enum CodingKeys: String, CodingKey {
            case ok, width, height, scale, coordinate
            case screenshotPath = "screenshot_path"
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
        let frontmostApp: ComputerApps.App?

        enum CodingKeys: String, CodingKey {
            case ok, available, ready, reason, accessibility
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
        var response = Success()
        var displayID = CGMainDisplayID()
        var region: CGRect?
        if let recipient {
            try authorize(request, target: recipient.target)
            let activity = ComputerControl.Activity(
                sessionID: request.sessionID,
                sessionName: request.sessionName.flatMap { $0.isEmpty ? nil : $0 } ?? String(request.sessionID.prefix(8)),
                appName: recipient.target.name,
                targetPoint: recipient.points?.start
            )
            control.show(activity)
            try await post(request, to: recipient, generation: generation, activity: activity)
        } else {
            guard request.target == nil else { throw ComputerError("The computer action target changed.") }
            switch request.action {
            case let .zoom(pixels):
                let frame = try currentFrame(for: request.sessionID)
                region = try frame.screenRegion(for: pixels)
                displayID = frame.displayID
            case .cursorPosition:
                let frame = try currentFrame(for: request.sessionID)
                response.coordinate = ComputerPixelCoordinate.rounded(frame.pixelPoint(for: try input.cursorPosition()))
            default:
                break
            }
        }

        if let path = request.screenshotPath {
            do {
                if recipient != nil {
                    // CGEvent delivery and the following frame are asynchronous.
                    try await Task.sleep(for: .milliseconds(125))
                }
                try control.requireRunning(generation: generation)
                let geometry = try await ComputerScreenshot.capture(to: path, displayID: displayID, region: region)
                try control.requireRunning(generation: generation)
                frames[request.sessionID] = geometry
                response.screenshotPath = path
                response.width = geometry.width
                response.height = geometry.height
                response.scale = geometry.scale
            } catch let error where recipient != nil && !(error is CancellationError) {
                throw ComputerError("The action completed, but the screenshot failed: \(error.localizedDescription)")
            }
        }
        response.frontmostApp = ComputerApps.frontmost
        return response
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
            return try mapped ?? input.cursorPosition()
        }
        switch request.action {
        case .type, .key:
            return .keyboard(try ComputerTargetLookup.frontmost())
        case let .openApp(name):
            return .launch(try ComputerApps.resolveLaunch(name))
        case let .click(_, _, pixel), let .mouseMove(pixel):
            let position = try point(pixel, resolved: request.screenPoint)
            return .pointer(try ComputerTargetLookup.at(position), position)
        case let .leftMouseDown(pixel), let .leftMouseUp(pixel), let .scroll(_, _, pixel):
            let position = try point(pixel, resolved: request.screenPoint)
            return .pointer(try ComputerTargetLookup.at(position), position)
        case let .drag(start, end):
            let first = try point(start, resolved: request.screenPoint)
            let last = try point(end, resolved: request.screenEndPoint)
            let target = try ComputerTargetLookup.at(first)
            guard target.matches(try ComputerTargetLookup.at(last)) else {
                throw ComputerError("Computer use can only drag within the same app.")
            }
            return .pointer(target, first, end: last)
        case .screenshot, .zoom, .cursorPosition, .wait, .status:
            return nil
        }
    }

    private func authorize(_ request: ComputerRequest, target: ComputerTarget) throws {
        try ComputerAppTier.require(request.name, in: target)
        guard let approvedTarget = request.target, target.matches(approvedTarget) else {
            throw ComputerError("The target app changed. Bring the app into view and retry the action.")
        }
        let state = try? JSONSerialization.jsonObject(with: Data(contentsOf: LaunchConfig.appStateFile)) as? [String: Any]
        guard let state, let mode = state["computer_use"] as? String,
              ComputerAccess.fromStateString(mode) != .off,
              let approvals = state["computer_app_approvals"] as? [String: [String: String]],
              approvals[request.sessionID]?[target.bundleID.lowercased()] == "allow"
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
    ) async throws {
        func check(_ actual: ComputerTarget) throws {
            try control.requireRunning(generation: generation)
            try ComputerAppTier.require(request.name, in: actual)
            guard actual.matches(recipient.target) else {
                throw ComputerError("The target app changed. Bring the app into view and retry the action.")
            }
        }
        switch recipient {
        case let .launch(launch):
            try check(launch.target)
            try await launch.open()
        case let .keyboard(target):
            guard let pid = target.pid else { throw ComputerError("The target app has no process.") }
            let checkFocus = { try check(ComputerTargetLookup.frontmost()) }
            switch request.action {
            case let .type(text): try await input.type(text, to: pid, checkFocus: checkFocus)
            case let .key(key, duration):
                try checkFocus()
                try await input.key(key, duration: duration, to: pid)
            default: break
            }
        case let .pointer(target, point, end):
            guard let pid = target.pid else { throw ComputerError("The target app has no process.") }
            let checkPoint = { position in try check(ComputerTargetLookup.at(position)) }
            try checkPoint(point)
            switch request.action {
            case let .click(button, count, _): try input.click(button, count: count, at: point)
            case .mouseMove: try input.move(to: point)
            case .drag:
                if let end {
                    try await input.drag(from: point, to: end, pid: pid, checkPoint: checkPoint)
                }
            case .leftMouseDown:
                try input.pressLeftButton(at: point)
                buttonHold = (target, activity)
            case .leftMouseUp:
                try input.liftLeftButton(at: point)
                buttonHold = nil
            case let .scroll(direction, amount, _):
                try input.scroll(direction, amount: amount, at: point)
            default: break
            }
        }
        try control.requireRunning(generation: generation)
    }

    private func currentFrame(for sessionID: String) throws -> ComputerScreenshotGeometry {
        guard let frame = frames[sessionID] else {
            throw ComputerError("Take a screenshot first to establish this session's coordinates.")
        }
        guard CGDisplayIsActive(frame.displayID) != 0, CGDisplayBounds(frame.displayID) == frame.displayBounds else {
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
