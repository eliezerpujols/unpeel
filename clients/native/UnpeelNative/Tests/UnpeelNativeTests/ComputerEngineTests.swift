import Carbon.HIToolbox
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
import XCTest
@testable import UnpeelNative

final class ComputerEngineTests: XCTestCase {
    private let path = "/tmp/session/screenshots/test.png"

    func testComputerTiersByBundleID() {
        let cases: [(ComputerAppTier, [String])] = [
            (.read, ["com.apple.Safari", "com.google.Chrome", "company.thebrowser.Browser",
                     "org.mozilla.firefox", "org.mozilla.nightly", "org.mozilla.firefoxdeveloperedition",
                     "com.microsoft.edgemac", "com.google.Chrome.canary"]),
            (.click, ["com.apple.Terminal", "com.googlecode.iterm2", "com.mitchellh.ghostty",
                      "com.microsoft.VSCode", "com.microsoft.VSCodeInsiders",
                      "com.todesktop.230313mzl4w4u92", "co.anysphere.cursor.nightly",
                      "com.apple.dt.Xcode", "com.jetbrains.intellij", "com.unpeel.native", "com.unpeel.native.dev"]),
            (.full, ["com.apple.Notes", "com.microsoft.VSCodeOther"])
        ]
        for (tier, ids) in cases {
            for id in ids {
                XCTAssertEqual(ComputerAppTier(bundleID: id), tier, id)
                let app = ComputerTarget(name: id, bundleID: id, pid: 42)
                for action in ["left_click", "scroll", "double_click", "right_click", "type", "hold_key", "open_app"] {
                    let result = Result { try ComputerAppTier.require(action, in: app) }
                    if tier == .full || (tier == .click && ["left_click", "scroll"].contains(action)) {
                        XCTAssertNoThrow(try result.get(), "\(id) \(action)")
                    } else {
                        XCTAssertThrowsError(try result.get(), "\(id) \(action)") { error in
                            if tier == .read { XCTAssertTrue(error.localizedDescription.contains("Unpeel browser tool")) }
                        }
                    }
                }
            }
        }
    }

    func testStopStateDefaultsToRunningAndFailsClosedOnInvalidDiskState() throws {
        let home = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        try FileManager.default.createDirectory(at: home, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: home) }
        let file = home.appendingPathComponent("computer-control.json")
        XCTAssertEqual(ComputerControlSnapshot.load(from: file), .initial)

        let paused = ComputerControlSnapshot(paused: true, generation: "stopped")
        try JSONEncoder().encode(paused).write(to: file)
        XCTAssertEqual(ComputerControlSnapshot.load(from: file), paused)

        try Data("{".utf8).write(to: file)
        XCTAssertEqual(ComputerControlSnapshot.load(from: file), .unavailable)
    }

    func testCursorPositionEncodesRoundedIntegerPixels() throws {
        let coordinate = ComputerPixelCoordinate.rounded(CGPoint(x: 700.49, y: -23.50))
        let json = try JSONEncoder().encode(coordinate)
        XCTAssertEqual(String(decoding: json, as: UTF8.self), "[700,-24]")
    }

    func testKeyNameParsing() throws {
        let cases: [(String, Int, CGEventFlags)] = [
            ("cmd+c", kVK_ANSI_C, .maskCommand),
            ("Return", kVK_Return, []),
            ("shift+Tab", kVK_Tab, .maskShift),
            ("Escape", kVK_Escape, []),
            ("Up", kVK_UpArrow, []), ("Down", kVK_DownArrow, []),
            ("Left", kVK_LeftArrow, []), ("Right", kVK_RightArrow, []),
            ("F1", kVK_F1, []), ("F12", kVK_F12, []), ("F20", kVK_F20, []),
            ("Control_L+Alt+F5", kVK_F5, [.maskControl, .maskAlternate]),
            ("Super_L+plus", kVK_ANSI_Equal, [.maskCommand, .maskShift]),
            ("ISO_Left_Tab", kVK_Tab, .maskShift),
        ]
        for (name, code, modifiers) in cases {
            let parsed = try ComputerKey.parse(name)
            XCTAssertEqual(parsed.code, CGKeyCode(code), name)
            XCTAssertEqual(parsed.modifiers, modifiers, name)
            XCTAssertNil(parsed.modifierKey, name)
        }
        let standalone = try ComputerKey.parse("Shift_R")
        XCTAssertEqual(standalone.code, CGKeyCode(kVK_RightShift))
        XCTAssertEqual(standalone.modifierKey, .maskShift)
        for invalid in ["", "cmd+", "+Tab", "a+b", "cmd+super+c", "hyper+Return", "F21"] {
            XCTAssertThrowsError(try ComputerKey.parse(invalid), invalid)
        }
    }

    func testUnicodeChunksPreserveSurrogatesAndGraphemes() throws {
        let prefix = String(repeating: "a", count: 19)
        let family = "👩🏽‍💻"
        let longGrapheme = "e" + String(repeating: "\u{301}", count: 25)
        let text = prefix + family + "日本語" + longGrapheme
        var iterator = ComputerUnicodeChunks(text)
        var chunks: [[UInt16]] = []
        while let chunk = iterator.next() { chunks.append(chunk) }
        XCTAssertEqual(String(decoding: try XCTUnwrap(chunks.first), as: UTF16.self), prefix)
        XCTAssertTrue(String(decoding: try XCTUnwrap(chunks.dropFirst().first), as: UTF16.self).hasPrefix(family))
        XCTAssertTrue(chunks.allSatisfy { (1...20).contains($0.count) })
        XCTAssertEqual(chunks.flatMap { $0 }, Array(text.utf16))
        for chunk in chunks {
            XCTAssertEqual(Array(String(decoding: chunk, as: UTF16.self).utf16), chunk)
        }
    }

    func testCoordinateScalingAtOneAndTwoPixelsPerPoint() throws {
        let bounds = CGRect(x: -640, y: 50, width: 640, height: 360)
        for density in [1, 2] {
            let frame = geometry(bounds: bounds, width: 640 * density, height: 360 * density)
            let pixel = CGPoint(x: 102 * density, y: 55 * density)
            let screen = CGPoint(x: -538, y: 105)
            XCTAssertEqual(frame.scale, CGFloat(density))
            XCTAssertEqual(try frame.screenPoint(for: pixel), screen)
            XCTAssertEqual(frame.pixelPoint(for: screen), pixel)
            XCTAssertEqual(try frame.screenPoint(for: .zero), bounds.origin)
        }
    }

    func testImageScalingCapsTheLongEdgeWithoutUpsampling() {
        for (width, height, expectedWidth, expectedHeight) in [
            (2880, 1800, 1456, 910), (1800, 2880, 910, 1456),
            (3840, 2160, 1456, 819), (1456, 1000, 1456, 1000),
            (640, 480, 640, 480), (5000, 1, 1456, 1),
        ] {
            let size = ComputerScreenshot.scaledSize(width: width, height: height)
            XCTAssertEqual(size.width, expectedWidth)
            XCTAssertEqual(size.height, expectedHeight)
        }
    }

    func testWritesScaledAndCroppedPNGFromRetinaFrame() throws {
        let context = try XCTUnwrap(CGContext(
            data: nil, width: 1800, height: 1200, bitsPerComponent: 8, bytesPerRow: 0,
            space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
        ))
        let frame = try XCTUnwrap(context.makeImage())
        let bounds = CGRect(x: -900, y: 40, width: 900, height: 600)
        let output = FileManager.default.temporaryDirectory.appendingPathComponent("\(UUID().uuidString).png")
        defer { try? FileManager.default.removeItem(at: output) }

        let full = try ComputerScreenshot.writePNG(frame, displayID: 1, bounds: bounds, region: nil, to: output)
        let png = try XCTUnwrap(CGImageSourceCreateWithURL(output as CFURL, nil))
        XCTAssertEqual(CGImageSourceGetType(png) as String?, UTType.png.identifier)
        let image = try XCTUnwrap(CGImageSourceCreateImageAtIndex(png, 0, nil))
        XCTAssertEqual(image.width, 1456)
        XCTAssertEqual(image.height, 971)
        XCTAssertEqual(full.screenRect, bounds)
        XCTAssertEqual(full.scale, 1456.0 / 900.0, accuracy: 0.0001)

        let region = CGRect(x: -830, y: 150, width: 100, height: 50)
        let crop = try ComputerScreenshot.writePNG(frame, displayID: 1, bounds: bounds, region: region, to: output)
        let croppedPNG = try XCTUnwrap(CGImageSourceCreateWithURL(output as CFURL, nil))
        let croppedImage = try XCTUnwrap(CGImageSourceCreateImageAtIndex(croppedPNG, 0, nil))
        XCTAssertEqual(croppedImage.width, 200)
        XCTAssertEqual(croppedImage.height, 100)
        XCTAssertEqual(crop.screenRect, region)
        XCTAssertEqual(crop.scale, 2)
    }

    func testCoordinateValidationUsesTheActualFrameAndCropOrigin() throws {
        let bounds = CGRect(x: 0, y: 0, width: 1512, height: 982)
        let frame = geometry(bounds: bounds, width: 1456, height: 946)
        for invalid in [
            CGPoint(x: -1, y: 0), CGPoint(x: 1456, y: 0),
            CGPoint(x: 0, y: 946), CGPoint(x: 0, y: 3000),
        ] {
            XCTAssertThrowsError(try frame.screenPoint(for: invalid))
        }
        let point = CGPoint(x: 1455, y: 945)
        let roundTrip = frame.pixelPoint(for: try frame.screenPoint(for: point))
        XCTAssertEqual(roundTrip.x, point.x, accuracy: 0.0001)
        XCTAssertEqual(roundTrip.y, point.y, accuracy: 0.0001)
        XCTAssertEqual(try frame.screenRegion(for: CGRect(x: 0, y: 0, width: 1456, height: 946)), bounds)
        XCTAssertThrowsError(try frame.screenRegion(for: CGRect(x: 1440, y: 0, width: 17, height: 100)))

        let cropped = ComputerScreenshotGeometry(
            displayID: 1, displayBounds: bounds,
            screenRect: CGRect(x: 100, y: 200, width: 60, height: 40), width: 120, height: 80
        )
        XCTAssertEqual(try cropped.screenPoint(for: CGPoint(x: 40, y: 10)), CGPoint(x: 120, y: 205))
        XCTAssertEqual(cropped.pixelPoint(for: CGPoint(x: 80, y: 190)), CGPoint(x: -40, y: -20))
        XCTAssertThrowsError(try cropped.screenPoint(for: CGPoint(x: 120, y: 10)))
    }

    func testRequestValidationForAllActions() throws {
        let xy = CGPoint(x: 24, y: 42)
        let start = CGPoint(x: 2, y: 3)
        let key = try ComputerKey.parse("cmd+c")
        let unicode = "  你好 👩🏽‍💻\n"
        let cases: [(String, [String: Any], ComputerRequest.Action)] = [
            ("screenshot", ["screenshot_path": path], .screenshot),
            ("zoom", ["screenshot_path": path, "region": [2, 3, 24, 42]],
             .zoom(CGRect(x: 2, y: 3, width: 22, height: 39))),
            ("left_click", ["coordinate": [24, 42]], .click(.left, count: 1, at: xy)),
            ("right_click", ["coordinate": [24, 42]], .click(.right, count: 1, at: xy)),
            ("middle_click", ["coordinate": [24, 42]], .click(.center, count: 1, at: xy)),
            ("double_click", ["coordinate": [24, 42]], .click(.left, count: 2, at: xy)),
            ("triple_click", ["coordinate": [24, 42]], .click(.left, count: 3, at: xy)),
            ("mouse_move", ["coordinate": [24, 42]], .mouseMove(xy)),
            ("left_click_drag", ["start_coordinate": [2, 3], "coordinate": [24, 42]], .drag(from: start, to: xy)),
            ("left_mouse_down", ["coordinate": [24, 42]], .leftMouseDown(xy)),
            ("left_mouse_up", [:], .leftMouseUp(nil)),
            ("type", ["text": unicode], .type(unicode)),
            ("key", ["text": "cmd+c"], .key(key, duration: .zero)),
            ("hold_key", ["text": "cmd+c", "duration": 0.25], .key(key, duration: .milliseconds(250))),
            ("scroll", ["scroll_direction": "left", "scroll_amount": 3, "coordinate": [24, 42]],
             .scroll(.left, amount: 3, at: xy)),
            ("wait", ["duration": 30, "screenshot_path": path], .wait(.seconds(30))),
            ("cursor_position", ["screenshot_path": path], .cursorPosition),
            ("open_app", ["text": " com.apple.Notes "], .openApp("com.apple.Notes")),
        ]
        for (name, arguments, expected) in cases {
            let request = try parse(name, arguments).get()
            XCTAssertEqual(request.sessionID, "session-1")
            XCTAssertEqual(request.action, expected, name)
            let canCapture = name != "wait" && name != "cursor_position"
            XCTAssertEqual(request.screenshotPath, canCapture ? arguments["screenshot_path"] as? String : nil, name)
        }
        XCTAssertEqual(try parse("left_mouse_down").get().action, .leftMouseDown(nil))
        XCTAssertEqual(try parse("left_mouse_up", ["coordinate": [24, 42]]).get().action, .leftMouseUp(xy))
        XCTAssertEqual(try parse("type", ["text": "", "screenshot_path": path]).get().screenshotPath, path)
        for direction in ["up", "down", "left", "right"] {
            XCTAssertNoThrow(try parse("scroll", ["scroll_direction": direction, "scroll_amount": 1]).get())
        }
    }

    func testRequestRejectsMissingAndMalformedArguments() {
        for action in [
            "screenshot", "zoom", "left_click", "right_click", "middle_click", "double_click",
            "triple_click", "mouse_move", "left_click_drag", "type", "key", "hold_key",
            "scroll", "wait", "open_app", "unknown",
        ] {
            XCTAssertThrowsError(try parse(action).get(), action)
        }
        for invalid: [Any] in [[-1, 10], [10, 1457], [0], [1, 2, 3], [true, 3], [Double.infinity, 0]] {
            for action in ["left_click", "mouse_move", "left_mouse_down", "left_mouse_up"] {
                XCTAssertThrowsError(try parse(action, ["coordinate": invalid]).get(), action)
            }
        }
        let invalidCases: [(String, [String: Any])] = [
            ("screenshot", ["screenshot_path": "relative.png"]),
            ("screenshot", ["screenshot_path": "/tmp/"]),
            ("zoom", ["screenshot_path": path, "region": [1, 2, 1, 5]]),
            ("zoom", ["screenshot_path": path, "region": [0, 0, 100, 1457]]),
            ("zoom", ["screenshot_path": path]),
            ("left_click_drag", ["coordinate": [2, 3]]),
            ("left_click_drag", ["coordinate": [2, 3], "start_coordinate": [0, -1]]),
            ("type", ["text": true]),
            ("key", ["text": "cmd+nonsense"]),
            ("hold_key", ["text": "Return"]),
            ("hold_key", ["text": "Return", "duration": -1]),
            ("scroll", ["scroll_direction": "north", "scroll_amount": 3]),
            ("scroll", ["scroll_direction": "up", "scroll_amount": 0]),
            ("scroll", ["scroll_direction": "up", "scroll_amount": 2.5]),
            ("scroll", ["scroll_direction": "up", "scroll_amount": Int64(Int32.max) + 1]),
            ("scroll", ["scroll_direction": "up", "scroll_amount": 1, "coordinate": [9, -1]]),
            ("wait", ["duration": 30.01]),
            ("wait", ["duration": true]),
            ("open_app", ["text": " "]),
            ("open_app", ["text": "/tmp/Fake.app"]),
        ]
        for (action, arguments) in invalidCases {
            XCTAssertThrowsError(try parse(action, arguments).get(), "\(action) \(arguments)")
        }
        for invalid: [String: Any] in [
            ["action": "cursor_position"],
            ["action": "cursor_position", "session_id": ""],
            ["action": "cursor_position", "session_id": "../x"],
            ["session_id": "session-1"],
        ] {
            XCTAssertThrowsError(try ComputerRequest.parse(invalid).get())
        }
    }

    private func parse(
        _ action: String, _ arguments: [String: Any] = [:]
    ) -> Result<ComputerRequest, ComputerError> {
        ComputerRequest.parse(arguments.merging(["session_id": "session-1", "action": action]) { _, required in required })
    }

    private func geometry(bounds: CGRect, width: Int, height: Int) -> ComputerScreenshotGeometry {
        ComputerScreenshotGeometry(displayID: 1, displayBounds: bounds, screenRect: bounds, width: width, height: height)
    }
}
