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
                XCTAssertEqual(ComputerAppTier(bundleID: id, unrestricted: true), .full, id)
                let app = ComputerTarget(name: id, bundleID: id, pid: 42)
                for action in ["left_click", "scroll", "double_click", "right_click", "type", "hold_key", "open_app"] {
                    XCTAssertNoThrow(try ComputerAppTier.require(action, in: app, unrestricted: true))
                    let result = Result { try ComputerAppTier.require(action, in: app, unrestricted: false) }
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

    func testHostSuppliedUnrestrictedPolicyRequiresABoolean() throws {
        XCTAssertFalse(try parse("type", ["text": "test"]).get().unrestricted)
        XCTAssertTrue(try parse("type", ["text": "test", "computer_unrestricted": true]).get().unrestricted)
        for raw: Any in [false, 1, "true", NSNull()] {
            XCTAssertFalse(try parse("type", ["text": "test", "computer_unrestricted": raw]).get().unrestricted)
        }
    }

    func testUnrestrictedModeSkipsAppGrantsOnlyInAllow() {
        for decision in [nil, "allow", "deny"] {
            XCTAssertFalse(ComputerAppAuthorization.allowsInput(mode: .off, unrestricted: true, decision: decision))
            XCTAssertEqual(
                ComputerAppAuthorization.allowsInput(mode: .ask, unrestricted: true, decision: decision),
                decision == "allow"
            )
            XCTAssertTrue(ComputerAppAuthorization.allowsInput(mode: .allow, unrestricted: true, decision: decision))
            XCTAssertEqual(
                ComputerAppAuthorization.allowsInput(mode: .allow, unrestricted: false, decision: decision),
                decision == "allow"
            )
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

    func testKeyboardAppAndBackgroundLaunchValidation() throws {
        let textEdit = "com.apple.TextEdit"
        for action in ["key", "hold_key", "type"] {
            let request = try parse(action, ["text": "space", "app": textEdit, "duration": 1]).get()
            XCTAssertEqual(request.keyboardApp, textEdit)
        }
        XCTAssertNil(try parse("left_click", ["app": textEdit, "coordinate": [3, 5]]).get().keyboardApp)
        XCTAssertThrowsError(try parse("type", ["app": "Text Edit", "text": "test"]).get())
        XCTAssertEqual(try parse("open_app", ["text": textEdit]).get().action, .openApp(textEdit))
        XCTAssertEqual(try parse("open_app", ["text": textEdit, "activate": false]).get().action, .openApp(textEdit))
        XCTAssertThrowsError(try parse("open_app", ["text": textEdit, "activate": true]).get())
        XCTAssertThrowsError(try parse("open_app", ["text": textEdit, "activate": "true"]).get())
        XCTAssertThrowsError(try parse("open_app", ["text": textEdit, "activate": 1]).get())
    }

    @MainActor
    func testKeyboardAppRoutingPrefersAnExactOrUnambiguousProcess() throws {
        XCTAssertEqual(try ComputerTargetLookup.preferredKeyboardPID(matching: [42], frontmost: 25), 42)
        XCTAssertEqual(try ComputerTargetLookup.preferredKeyboardPID(matching: [42, 51], frontmost: 51), 51)
        XCTAssertThrowsError(try ComputerTargetLookup.preferredKeyboardPID(matching: [42, 51], frontmost: 25))
        XCTAssertThrowsError(try ComputerTargetLookup.preferredKeyboardPID(matching: [], frontmost: 25))
    }

    @MainActor
    func testAccessibilityFindsTheNearestActionableControl() {
        func candidate(
            _ roles: [String], pressable: Set<Int> = [], focusable: Set<Int> = [], disabled: Set<Int> = [],
            singleLeftClick: Bool = true, isTextEdit: Bool = false
        ) -> ComputerAccessibility.ClickCandidate<Int> {
            ComputerAccessibility.clickCandidate(
                at: 0, allowsAXAction: singleLeftClick, isTextEdit: isTextEdit, roleOf: { roles[$0] },
                parentOf: { roles.indices.contains($0 + 1) ? $0 + 1 : nil },
                isEnabled: { !disabled.contains($0) }, canFocus: focusable.contains, canPress: pressable.contains
            )
        }
        XCTAssertEqual(candidate(["AXStaticText", "AXLink", "AXGroup"], pressable: [1, 2]).action, .press(1))
        XCTAssertEqual(candidate(["AXImage", "AXGroup", "AXButton"], pressable: [2]).action, .press(2))
        XCTAssertEqual(candidate(["AXMenuItem", "AXMenu"], pressable: [0]).action, .press(0))
        XCTAssertEqual(candidate(["AXCheckBox"], pressable: [0]).action, .press(0))
        XCTAssertEqual(candidate(["AXStaticText", "AXTextField"], pressable: [1], focusable: [1]).action, .focus(1))
        XCTAssertEqual(candidate(["AXTextArea", "AXWindow"], focusable: [0], isTextEdit: true).action, .focus(0))
        XCTAssertNil(candidate(["AXButton", "AXGroup"], pressable: [0, 1], disabled: [0]).action)
        XCTAssertNil(candidate(["AXGroup", "AXWindow"], pressable: [1]).action)
        XCTAssertNil(candidate(["AXLink"], pressable: [0], singleLeftClick: false).action)
        XCTAssertFalse(candidate(["AXGroup", "AXWebArea"], singleLeftClick: false).acceptsBackgroundEvents)
        XCTAssertFalse(candidate(["AXTextArea", "AXWindow"], isTextEdit: true).acceptsBackgroundEvents)
    }

    func testClickRoutingPrefersAccessibilityAndRejectsUnsupportedBackgroundClicks() {
        let window = ComputerPointerDelivery.Window(id: 76, bounds: CGRect(x: -800, y: 50, width: 640, height: 360))
        let delivery = ComputerPointerDelivery(pid: 42, window: window)
        func route(
            _ action: ComputerAccessibility.Click<Int>? = nil, hasWindow: Bool = true,
            browser: Bool = false, backgroundEvents: Bool = true, foreground: Bool = false
        ) -> ComputerClickRoute<Int> {
            ComputerClickRoute(
                candidate: .init(action: action, acceptsBackgroundEvents: backgroundEvents),
                delivery: hasWindow ? delivery : nil, usesBrowserEngine: browser, isForeground: foreground
            )
        }
        XCTAssertEqual(route(.press(1), browser: true), .accessibility(.press(1)))
        XCTAssertEqual(route(.focus(0), backgroundEvents: false), .accessibility(.focus(0)))
        XCTAssertEqual(route(.press(0), hasWindow: false), .accessibility(.press(0)))
        XCTAssertEqual(route(), .process(delivery))
        XCTAssertEqual(route(browser: true, foreground: true), .process(delivery))
        XCTAssertEqual(route(browser: true), .unavailable)
        XCTAssertEqual(route(backgroundEvents: false), .unavailable)
        XCTAssertEqual(route(hasWindow: false), .unavailable)
    }

    @MainActor
    func testComputerPanelsCannotBecomeKeyOrMain() {
        let panel = NonactivatingPromptPanel()
        XCTAssertTrue(panel.styleMask.contains(.nonactivatingPanel))
        XCTAssertFalse(panel.canBecomeKey)
        XCTAssertFalse(panel.canBecomeMain)
    }

    @MainActor
    func testWindowMouseEventLocationUsesTheTargetWindowsQuartzOrigin() {
        let window = ComputerPointerDelivery.Window(id: 76, bounds: CGRect(x: -800, y: -40, width: 640, height: 360))
        let location = ComputerPointerDelivery.windowMouseLocation(
            CGPoint(x: -700, y: 20), in: window, screenTop: 1117
        )
        XCTAssertEqual(location, CGPoint(x: 100, y: 1057))
    }

    func testWindowAndElementRequestsMatchTheDesktopProtocol() throws {
        let directory: URL
        if let override = ProcessInfo.processInfo.environment["UNPEEL_PROTOCOL_DIR"] {
            directory = URL(fileURLWithPath: override)
        } else {
            var root = URL(fileURLWithPath: #filePath)
            for _ in 0..<6 { root.deleteLastPathComponent() }
            directory = root.appendingPathComponent("protocol")
        }
        let data = try Data(contentsOf: directory.appendingPathComponent("computer-use-v1.json"))
        let fixture = try XCTUnwrap(JSONSerialization.jsonObject(with: data) as? [String: Any])
        for fields in try XCTUnwrap(fixture["valid"] as? [[String: Any]]) {
            let name = try XCTUnwrap(fields["action"] as? String)
            let request = fields.merging(["screenshot_path": path]) { first, _ in first }
            XCTAssertNoThrow(try parse(name, request).get(), "\(fields)")
        }
        for fields in try XCTUnwrap(fixture["invalid"] as? [[String: Any]]) {
            let name = try XCTUnwrap(fields["action"] as? String)
            let request = fields.merging(["screenshot_path": path]) { first, _ in first }
            XCTAssertThrowsError(try parse(name, request).get(), "\(fields)")
        }
        let app = "com.apple.Safari"
        let state = try parse("get_app_state", ["app": app, "window": 76, "screenshot_path": path]).get()
        XCTAssertEqual(state.action, .appState(.init(app: app, id: 76)))
        let click = try parse("click", ["app": app, "element": 3]).get()
        XCTAssertEqual(click.action, .element(.init(app: app, id: 3, operation: .press)))
        XCTAssertNil(click.screenshotPath)
        XCTAssertEqual(ComputerAXActions.pressAction(from: ["AXPick", "AXPress"]), "AXPress")
        XCTAssertEqual(ComputerAXActions.pressAction(from: ["AXPick"]), "AXPick")
        XCTAssertNil(ComputerAXActions.pressAction(from: ["AXRaise"]))
        XCTAssertFalse(ComputerAXActions.isAllowed("AXRaise"))
    }

    func testElementIDsAreScopedAndNeverReusedAfterRefreshOrStop() throws {
        let safari = ComputerTarget(name: "Safari", bundleID: "com.apple.Safari", pid: 42)
        let chrome = ComputerTarget(name: "Chrome", bundleID: "com.google.Chrome", pid: 51)
        let bounds = CGRect(x: -800, y: 50, width: 640, height: 360)
        let first = ComputerWindow(id: 76, title: "Instagram", bounds: bounds, app: safari)
        let second = ComputerWindow(id: 77, title: "Another tab", bounds: bounds, app: safari)
        let other = ComputerWindow(id: 78, title: "Chrome", bounds: bounds, app: chrome)
        var cache = ComputerElementCache<String>()
        cache.replace(session: "one", window: first, elements: ["window", "Explore"])
        cache.replace(session: "one", window: other, elements: ["window"])
        XCTAssertEqual(try cache.element(session: "one", bundleID: "COM.APPLE.SAFARI", id: 1).1, "Explore")
        XCTAssertThrowsError(try cache.element(session: "two", bundleID: safari.bundleID, id: 1))
        XCTAssertThrowsError(try cache.element(session: "one", bundleID: chrome.bundleID, id: 1))
        cache.replace(session: "one", window: second, elements: ["second window"])
        XCTAssertThrowsError(try cache.element(session: "one", bundleID: safari.bundleID, id: 1))
        XCTAssertEqual(try cache.element(session: "one", bundleID: safari.bundleID, id: 3).0, second)
        XCTAssertEqual(try cache.element(session: "one", bundleID: chrome.bundleID, id: 2).0, other)
        cache.clear()
        XCTAssertThrowsError(try cache.element(session: "one", bundleID: safari.bundleID, id: 3))
        XCTAssertEqual(cache.nextID, 4)
    }

    func testAccessibilityRowsSerializeIndentedStableIDsAndEscapeNewlines() {
        let row = ComputerAXRow(
            depth: 2, role: "AXLink", title: "Explore\nInstagram", detail: "Open Explore",
            value: nil, url: "https://www.instagram.com/explore/", actions: ["AXPress", "AXShowMenu"]
        )
        XCTAssertEqual(
            row.line(id: 12),
            #"    12 AXLink "Explore\nInstagram" Description: "Open Explore" URL: "https://www.instagram.com/explore/" Actions: AXPress, AXShowMenu"#
        )
    }

    func testElementScrollHandlesNormalizedWebKitBarsAndExplicitRanges() {
        XCTAssertEqual(ComputerAXActions.scrollValue(0, minimum: 0, maximum: 0, steps: 2, increasing: true), 0.1)
        XCTAssertEqual(ComputerAXActions.scrollValue(35, minimum: 10, maximum: 110, steps: 10, increasing: false), 10)
        XCTAssertEqual(ComputerAXActions.scrollValue(0.9, minimum: nil, maximum: nil, steps: 4, increasing: true), 1)
        XCTAssertNil(ComputerAXActions.scrollValue(35, minimum: 0, maximum: 0, steps: 2, increasing: true))
    }

    func testWindowCoordinatesUseCapturedFrameOnAnotherDisplay() throws {
        let bounds = CGRect(x: -1400, y: -240, width: 800, height: 600)
        let window = ComputerWindow(
            id: 76, title: "Instagram", bounds: bounds,
            app: ComputerTarget(name: "Safari", bundleID: "com.apple.Safari", pid: 42)
        )
        let frame = ComputerScreenshotGeometry(
            displayID: nil, displayBounds: bounds, screenRect: bounds, width: 1200, height: 900, window: window
        )
        XCTAssertEqual(try frame.screenPoint(for: CGPoint(x: 600, y: 450)), CGPoint(x: -1000, y: 60))
        XCTAssertEqual(frame.pixelPoint(for: CGPoint(x: -1000, y: 60)), CGPoint(x: 600, y: 450))
        XCTAssertThrowsError(try frame.screenPoint(for: CGPoint(x: 1200, y: 450)))
    }

    func testWindowSelectionSkipsSafariSurfacesMissingAnExactQuartzMatch() {
        let safari = ComputerTarget(name: "Safari", bundleID: "com.apple.Safari", pid: 677)
        let menu = ComputerWindow(id: 89, title: "", bounds: CGRect(x: 0, y: 0, width: 1728, height: 33), app: safari)
        let wrongOwner = ComputerWindow(id: 95, title: "", bounds: menu.bounds, app: safari)
        let document = ComputerWindow(
            id: 113, title: "(1) Instagram", bounds: CGRect(x: 0, y: 33, width: 1728, height: 1084), app: safari
        )
        func row(for window: ComputerWindow, pid: pid_t = 677) -> [String: Any] {
            [
                kCGWindowNumber as String: window.id,
                kCGWindowOwnerPID as String: pid,
                kCGWindowBounds as String: window.bounds.dictionaryRepresentation,
            ]
        }
        let quartz: [CGWindowID: [[String: Any]]] = [
            menu.id: [],
            wrongOwner.id: [row(for: menu), row(for: wrongOwner, pid: 42)],
            document.id: [row(for: menu), row(for: document)],
        ]
        for onscreen in [[menu.id, document.id], []] {
            let windows = ComputerWindows.orderedWindows(
                [menu, wrongOwner, document], onscreenIDs: onscreen, windowInfo: { quartz[$0] ?? [] }
            )
            XCTAssertEqual(windows, [document])
        }
    }

    @MainActor
    func testAccessibilityMatchesSafariMainWindowWhenAXWindowsIsEmpty() {
        let frame = CGRect(x: 0, y: 33, width: 1728, height: 1084)
        let window = ComputerWindow(
            id: 113, title: "(1) Instagram", bounds: frame,
            app: ComputerTarget(name: "Safari", bundleID: "com.apple.Safari", pid: 677)
        )
        let frames = ["main": frame, "focused": frame.offsetBy(dx: -2000, dy: 0), "alsoMain": frame]
        func match(listed: [String], fallback: [String]) -> String? {
            ComputerAXTree.matchingWindow(
                for: window, windows: listed, bounds: { frames[$0] },
                title: { $0 == "main" ? "(1) Instagram" : "Another window" },
                fallback: { fallback }
            )
        }
        XCTAssertEqual(match(listed: [], fallback: ["focused", "main"]), "main")
        XCTAssertNil(match(listed: [], fallback: ["focused"]))
        XCTAssertEqual(match(listed: [], fallback: ["alsoMain", "main"]), "main")
        XCTAssertEqual(match(listed: ["alsoMain"], fallback: ["main"]), "alsoMain")
    }

    @MainActor
    func testUnicodeEventsCarryExactTextAndNoModifiers() throws {
        let input = ComputerInput()
        let units = Array("Hello 🙂".utf16)
        let (down, up) = try input.unicodeEvents(units)
        for event in [down, up] {
            var length = 0
            var buffer = [UInt16](repeating: 0, count: units.count)
            event.keyboardGetUnicodeString(maxStringLength: buffer.count, actualStringLength: &length, unicodeString: &buffer)
            XCTAssertEqual(Array(buffer.prefix(length)), units)
            XCTAssertTrue(event.flags.isEmpty)
            XCTAssertEqual(event.getIntegerValueField(.eventSourceUserData), ComputerInput.eventTag)
        }
    }

    func testDisplayOrderSelectionAndExternalCoordinates() throws {
        let main = CGRect(x: 0, y: 0, width: 1728, height: 1117)
        let external = CGRect(x: -2560, y: -128, width: 2560, height: 1440)
        let displays = ComputerDisplays.indexed([(7, external), (4, main)], mainID: 4)
        XCTAssertEqual(displays.map(\.id), [4, 7])
        XCTAssertEqual(displays.map(\.index), [0, 1])
        XCTAssertEqual(displays.map(\.main), [true, false])
        XCTAssertEqual(try ComputerDisplays.select(nil, previousID: nil, from: displays).id, 4)
        XCTAssertEqual(try ComputerDisplays.select(1, previousID: 4, from: displays).id, 7)
        XCTAssertEqual(try ComputerDisplays.select(nil, previousID: 7, from: displays).id, 7)
        XCTAssertThrowsError(try ComputerDisplays.select(2, previousID: 7, from: displays))

        let frame = geometry(bounds: displays[1].bounds, width: 1280, height: 720)
        let pixel = CGPoint(x: 500, y: 100)
        let point = CGPoint(x: -1560, y: 72)
        XCTAssertEqual(try frame.screenPoint(for: pixel), point)
        XCTAssertEqual(frame.pixelPoint(for: point), pixel)

        let json = try JSONSerialization.jsonObject(with: JSONEncoder().encode(displays)) as? [[String: Any]]
        XCTAssertEqual(json?[1]["x"] as? CGFloat, -2560)
        XCTAssertEqual(json?[1]["height"] as? CGFloat, 1440)
        XCTAssertEqual(json?[1]["main"] as? Bool, false)
    }

    func testScreenshotValidatesOptionalDisplayIndex() throws {
        XCTAssertNil(try parse("screenshot", ["screenshot_path": path]).get().displayIndex)
        XCTAssertEqual(try parse("screenshot", ["screenshot_path": path, "display": 1]).get().displayIndex, 1)
        for invalid: Any in [-1, true, 1.5, "1", NSNull(), Int64.max] {
            XCTAssertThrowsError(try parse("screenshot", ["screenshot_path": path, "display": invalid]).get())
        }
        XCTAssertNil(try parse("zoom", ["screenshot_path": path, "display": 1, "region": [0, 0, 1, 1]]).get().displayIndex)
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
