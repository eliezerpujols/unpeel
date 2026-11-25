import CoreFoundation
import CoreGraphics
import Foundation

struct ComputerError: LocalizedError, Equatable {
    let message: String

    init(_ message: String) { self.message = message }

    var errorDescription: String? { message }
}

struct ComputerRequest: Equatable {
    enum ScrollDirection: String {
        case up, down, left, right
    }

    struct WindowRequest: Equatable {
        let app: String
        let id: CGWindowID?
    }

    struct ElementRequest: Equatable {
        enum Operation: Equatable {
            case press
            case setValue(String)
            case focus
            case scroll(ScrollDirection, Int32)
            case perform(String)
        }

        let app: String
        let id: Int
        let operation: Operation
    }

    enum Action: Equatable {
        case screenshot
        case windowScreenshot(WindowRequest)
        case appState(WindowRequest)
        case element(ElementRequest)
        case zoom(CGRect)
        case click(CGMouseButton, count: Int, at: CGPoint)
        case mouseMove(CGPoint)
        case drag(from: CGPoint, to: CGPoint)
        case leftMouseDown(CGPoint?)
        case leftMouseUp(CGPoint?)
        case type(String)
        case key(ComputerKey, duration: Duration)
        case scroll(ScrollDirection, amount: Int32, at: CGPoint?)
        case wait(Duration)
        case cursorPosition
        case openApp(String)
        case status

        var needsAccessibility: Bool {
            switch self {
            case .click, .mouseMove, .drag, .leftMouseDown, .leftMouseUp, .type, .key, .scroll, .appState, .element:
                return true
            case .screenshot, .windowScreenshot, .zoom, .wait, .cursorPosition, .openApp, .status:
                return false
            }
        }
    }

    let name: String
    let sessionID: String
    let sessionName: String?
    let target: ComputerTarget?
    let controlGeneration: String?
    let unrestricted: Bool
    let screenPoint: CGPoint?
    let screenEndPoint: CGPoint?
    let action: Action
    let screenshotPath: String?
    let displayIndex: Int?
    let keyboardApp: String?

    static func parse(_ fields: [String: Any], resolving: Bool = false) -> Result<Self, ComputerError> {
        do {
            return .success(try Self(fields, resolving: resolving))
        } catch {
            return .failure(ComputerError(error.localizedDescription))
        }
    }

    private init(_ fields: [String: Any], resolving: Bool) throws {
        guard let session = fields["session_id"] as? String,
              !session.isEmpty, session.utf8.count <= 128,
              !session.contains("/"), !session.contains("\0"), session != ".", session != ".."
        else { throw ComputerError("A valid session_id is required.") }
        sessionID = session

        guard let name = fields["action"] as? String else {
            throw ComputerError("An action is required.")
        }
        self.name = name
        sessionName = fields["session_name"] as? String
        controlGeneration = fields["control_generation"] as? String
        // This is an internal Host policy field. Agent arguments are rebuilt
        // before the Host adds it. Missing or malformed values stay restricted.
        let flag = fields["computer_unrestricted"] as? NSNumber
        unrestricted = flag.map { CFGetTypeID($0) == CFBooleanGetTypeID() && $0.boolValue } ?? false
        screenPoint = try Self.resolvedPoint(fields, "screen_coordinate")
        screenEndPoint = try Self.resolvedPoint(fields, "screen_end_coordinate")
        if let raw = fields["target"], !(raw is NSNull) {
            target = try JSONDecoder().decode(ComputerTarget.self, from: JSONSerialization.data(withJSONObject: raw, options: .fragmentsAllowed))
        } else {
            target = nil
        }
        let path: String?
        if let value = fields["screenshot_path"] {
            guard let string = value as? String, string.hasPrefix("/"), !string.hasSuffix("/"), !string.contains("\0")
            else { throw ComputerError("screenshot_path must be an absolute file path.") }
            path = string
        } else {
            path = nil
        }

        if ["key", "hold_key", "type"].contains(name), let raw = fields["app"] {
            keyboardApp = try Self.bundleID(raw)
        } else {
            keyboardApp = nil
        }
        if name == "open_app", let raw = fields["activate"] {
            guard let flag = raw as? NSNumber, CFGetTypeID(flag) == CFBooleanGetTypeID()
            else { throw ComputerError("activate must be a boolean.") }
            guard !flag.boolValue else {
                throw ComputerError("Computer use opens apps in the background. Bring the app forward manually if needed.")
            }
        }

        if name == "screenshot", let raw = fields["display"] {
            guard fields["app"] == nil, fields["window"] == nil else {
                throw ComputerError("Choose a display or an app window.")
            }
            guard let value = Self.number(raw), let index = Int32(exactly: value), index >= 0 else {
                throw ComputerError("display must be a nonnegative integer index from computer status.")
            }
            displayIndex = Int(index)
        } else {
            displayIndex = nil
        }

        func window() throws -> WindowRequest {
            let id: CGWindowID?
            if let value = fields["window"] {
                guard let number = Self.number(value), let window = CGWindowID(exactly: number), window > 0 else {
                    throw ComputerError("window must be a positive window ID.")
                }
                id = window
            } else {
                id = nil
            }
            return WindowRequest(app: try Self.bundleID(fields["app"]), id: id)
        }

        func element(_ operation: ElementRequest.Operation) throws -> Action {
            guard let value = Self.number(fields["element"]), let index = Int32(exactly: value), index >= 0 else {
                throw ComputerError("element must be an ID from the latest get_app_state for app.")
            }
            return .element(ElementRequest(app: try Self.bundleID(fields["app"]), id: Int(index), operation: operation))
        }

        switch name {
        case "screenshot", "get_app_state", "zoom":
            guard resolving || path != nil else { throw ComputerError("\(name) requires screenshot_path.") }
            if name == "zoom" {
                let values = try Self.pixels(fields["region"], count: 4, field: "region")
                guard values[0] < values[2], values[1] < values[3] else {
                    throw ComputerError("region must have positive width and height.")
                }
                action = .zoom(CGRect(
                    x: values[0], y: values[1], width: values[2] - values[0], height: values[3] - values[1]
                ))
            } else if name == "get_app_state" {
                guard fields["display"] == nil else { throw ComputerError("Choose a display or an app window.") }
                action = .appState(try window())
            } else if fields["app"] != nil || fields["window"] != nil {
                action = .windowScreenshot(try window())
            } else {
                action = .screenshot
            }
        case "left_click", "right_click", "middle_click", "double_click", "triple_click":
            let button: CGMouseButton = switch name {
            case "right_click": .right
            case "middle_click": .center
            default: .left
            }
            let count = name == "triple_click" ? 3 : (name == "double_click" ? 2 : 1)
            action = .click(button, count: count, at: try Self.point(fields))
        case "mouse_move":
            action = .mouseMove(try Self.point(fields))
        case "left_click_drag":
            action = .drag(from: try Self.point(fields, field: "start_coordinate"), to: try Self.point(fields))
        case "left_mouse_down":
            action = .leftMouseDown(try Self.optionalPoint(fields))
        case "left_mouse_up":
            action = .leftMouseUp(try Self.optionalPoint(fields))
        case "type":
            guard let text = resolving ? "" : fields["text"] as? String else {
                throw ComputerError("type requires text.")
            }
            action = .type(text)
        case "press", "click":
            action = try element(.press)
        case "set_value":
            guard let text = resolving ? "" : fields["text"] as? String,
                  text.utf8.count <= 60 * 1024, !text.contains("\0") else {
                throw ComputerError("set_value requires text of at most 61440 UTF-8 bytes without NUL.")
            }
            action = try element(.setValue(text))
        case "focus":
            action = try element(.focus)
        case "perform_action":
            guard let actionName = fields["ax_action"] as? String, ComputerAXActions.isAllowed(actionName) else {
                throw ComputerError("That Accessibility action is unavailable for background computer use.")
            }
            action = try element(.perform(actionName))
        case "key", "hold_key":
            guard let text = resolving ? "space" : fields["text"] as? String else {
                throw ComputerError("\(name) requires a key name in text.")
            }
            action = .key(try ComputerKey.parse(text), duration: name == "key" ? .zero : try Self.duration(fields))
        case "scroll":
            guard let rawDirection = fields["scroll_direction"] as? String,
                  let direction = ScrollDirection(rawValue: rawDirection)
            else { throw ComputerError("scroll_direction must be up, down, left, or right.") }
            guard let value = Self.number(fields["scroll_amount"]),
                  let amount = Int32(exactly: value), amount > 0
            else { throw ComputerError("scroll_amount must be a positive integer.") }
            if fields["element"] != nil {
                guard fields["coordinate"] == nil else { throw ComputerError("Choose an element or a scroll coordinate.") }
                guard amount <= 20 else { throw ComputerError("Element scrolling accepts 1 to 20 steps per call.") }
                action = try element(.scroll(direction, amount))
            } else {
                action = .scroll(direction, amount: amount, at: try Self.optionalPoint(fields))
            }
        case "wait":
            action = .wait(try Self.duration(fields))
        case "status" where resolving:
            action = .status
        case "cursor_position":
            action = .cursorPosition
        case "open_app":
            guard let text = (fields["text"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines),
                  !text.isEmpty, !text.contains("/"), !text.contains("\0")
            else { throw ComputerError("open_app requires an app name or bundle ID in text.") }
            action = .openApp(text)
        default:
            throw ComputerError("Unknown computer action.")
        }

        // These actions never produce a screenshot, even if the caller supplies a path.
        switch action {
        case .wait, .cursorPosition, .status, .element: screenshotPath = nil
        default: screenshotPath = path
        }
    }

    private static func bundleID(_ raw: Any?) throws -> String {
        guard let app = raw as? String, !app.isEmpty, app.utf8.count <= 255,
              app.utf8.allSatisfy({ (48...57).contains($0) || (65...90).contains($0)
                  || (97...122).contains($0) || [45, 46, 95].contains($0) })
        else { throw ComputerError("app must be a running app’s bundle ID.") }
        return app
    }

    private static func resolvedPoint(_ fields: [String: Any], _ field: String) throws -> CGPoint? {
        guard let raw = fields[field] else { return nil }
        guard let pair = raw as? [Any], pair.count == 2,
              let x = number(pair[0]), let y = number(pair[1])
        else { throw ComputerError("Invalid resolved screen coordinate.") }
        return CGPoint(x: x, y: y)
    }

    private static func point(_ fields: [String: Any], field: String = "coordinate") throws -> CGPoint {
        let values = try pixels(fields[field], count: 2, field: field)
        return CGPoint(x: values[0], y: values[1])
    }

    private static func optionalPoint(_ fields: [String: Any]) throws -> CGPoint? {
        try fields["coordinate"].map { _ in try point(fields) }
    }

    private static func pixels(_ raw: Any?, count: Int, field: String) throws -> [Double] {
        guard let values = raw as? [Any], values.count == count else {
            throw ComputerError("\(field) must contain \(count) pixel values.")
        }
        return try values.map { value in
            guard let pixel = number(value), (0...Double(ComputerScreenshot.maximumEdge)).contains(pixel) else {
                throw ComputerError("\(field) contains an out-of-range pixel value.")
            }
            return pixel
        }
    }

    private static func duration(_ fields: [String: Any]) throws -> Duration {
        guard let value = number(fields["duration"]), (0...30).contains(value) else {
            throw ComputerError("duration must be between 0 and 30 seconds.")
        }
        return .seconds(value)
    }

    private static func number(_ raw: Any?) -> Double? {
        guard let number = raw as? NSNumber,
              CFGetTypeID(number) != CFBooleanGetTypeID(), number.doubleValue.isFinite
        else { return nil }
        return number.doubleValue
    }
}
