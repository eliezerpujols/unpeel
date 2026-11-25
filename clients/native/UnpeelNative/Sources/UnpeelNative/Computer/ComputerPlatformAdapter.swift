import CoreGraphics
import Foundation

@MainActor
final class ComputerPlatformAdapter {
    enum Operation: String, CaseIterable {
        case perform = "computer.perform"
        case status = "computer.status"
        case apps = "computer.apps"
    }

    static let shared = ComputerPlatformAdapter()

    private let input = ComputerInput()
    private var frames: [String: ComputerScreenshotGeometry] = [:]
    private var actionInProgress = false

    private struct Success: Encodable {
        let ok = true
        var screenshotPath: String?
        var width: Int?
        var height: Int?
        var scale: CGFloat?
        var coordinate: [CGFloat]?
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

    func perform(_ parsed: Result<ComputerRequest, ComputerError>) async -> String {
        do {
            let request = try parsed.get()
            try Task.checkCancellation()
            return encode(try await run(request))
        } catch is CancellationError {
            return encode(Failure(error: "Computer action timed out."))
        } catch {
            return encode(Failure(error: error.localizedDescription))
        }
    }

    private func run(_ request: ComputerRequest) async throws -> Success {
        // Wait never touches the desktop. Other actions share a single input
        // device and must finish their screenshot before another can act.
        if case let .wait(duration) = request.action {
            try await Task.sleep(for: duration)
            return Success(frontmostApp: ComputerApps.frontmost)
        }
        guard !actionInProgress else {
            throw ComputerError("Another computer action is in progress. Try again when it finishes.")
        }
        actionInProgress = true
        defer { actionInProgress = false }

        if request.screenshotPath != nil, !ComputerPermissions.screenRecording {
            throw ComputerError(ComputerPermissions.screenRecordingMessage)
        }
        if request.action.needsAccessibility, !ComputerPermissions.accessibility {
            throw ComputerError(ComputerPermissions.accessibilityMessage)
        }

        var response = Success()
        var displayID = CGMainDisplayID()
        var region: CGRect?
        var actionChangedDesktop = true
        switch request.action {
        case .screenshot:
            actionChangedDesktop = false
        case let .zoom(pixels):
            let frame = try currentFrame(for: request.sessionID)
            region = try frame.screenRegion(for: pixels)
            displayID = frame.displayID
            actionChangedDesktop = false
        case let .click(button, count, pixel):
            try input.click(button, count: count, at: screenPoint(pixel, for: request.sessionID))
        case let .mouseMove(pixel):
            try input.move(to: screenPoint(pixel, for: request.sessionID))
        case let .drag(start, end):
            try await input.drag(
                from: screenPoint(start, for: request.sessionID),
                to: screenPoint(end, for: request.sessionID)
            )
        case let .leftMouseDown(pixel):
            try input.setLeftButton(down: true, at: optionalScreenPoint(pixel, for: request.sessionID))
        case let .leftMouseUp(pixel):
            try input.setLeftButton(down: false, at: optionalScreenPoint(pixel, for: request.sessionID))
        case let .type(text):
            try await input.type(text)
        case let .key(key, duration):
            try await input.key(key, duration: duration)
        case let .scroll(direction, amount, pixel):
            try input.scroll(direction, amount: amount, at: optionalScreenPoint(pixel, for: request.sessionID))
        case .cursorPosition:
            let frame = try currentFrame(for: request.sessionID)
            let pixel = try frame.pixelPoint(for: input.cursorPosition())
            response.coordinate = [pixel.x, pixel.y]
        case let .openApp(name):
            try await ComputerApps.open(name)
        case .wait:
            break
        }

        if let path = request.screenshotPath {
            do {
                if actionChangedDesktop {
                    // CGEvent delivery and the following frame are asynchronous.
                    try await Task.sleep(for: .milliseconds(125))
                }
                let geometry = try await ComputerScreenshot.capture(to: path, displayID: displayID, region: region)
                frames[request.sessionID] = geometry
                response.screenshotPath = path
                response.width = geometry.width
                response.height = geometry.height
                response.scale = geometry.scale
            } catch where actionChangedDesktop {
                throw ComputerError("The action completed, but the screenshot failed: \(error.localizedDescription)")
            }
        }
        response.frontmostApp = ComputerApps.frontmost
        return response
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

    private func optionalScreenPoint(_ pixel: CGPoint?, for sessionID: String) throws -> CGPoint? {
        try pixel.map { try screenPoint($0, for: sessionID) }
    }

    private func encode(_ response: some Encodable) -> String {
        guard let data = try? JSONEncoder().encode(response) else {
            return #"{"ok":false,"error":"Could not encode the computer response."}"#
        }
        return String(decoding: data, as: UTF8.self)
    }
}
