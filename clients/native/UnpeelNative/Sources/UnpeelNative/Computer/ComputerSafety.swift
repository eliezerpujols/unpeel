import AppKit
import ApplicationServices

struct ComputerTarget: Codable, Equatable {
    let name: String
    let bundleID: String
    let pid: pid_t?

    enum CodingKeys: String, CodingKey {
        case name, pid
        case bundleID = "bundle_id"
    }

    func matches(_ other: Self) -> Bool {
        bundleID.caseInsensitiveCompare(other.bundleID) == .orderedSame && pid == other.pid
    }
}

enum ComputerAppTier: Equatable {
    case read, click, full

    // Keep these bundle families aligned with computer_mcp/safety.rs.
    init(bundleID: String, unrestricted: Bool = false) {
        if unrestricted {
            self = .full
            return
        }
        let id = bundleID.lowercased()
        func belongs(to family: String) -> Bool {
            id == family || id.hasPrefix(family + ".")
        }
        switch id {
        case "com.apple.safari", "com.apple.safaritechnologypreview",
             "company.thebrowser.browser", "company.thebrowser.browser.beta", "company.thebrowser.arc",
             "org.mozilla.firefoxdeveloperedition", "org.mozilla.nightly", "org.mozilla.nightlydebug":
            self = .read
        case "com.apple.terminal", "com.googlecode.iterm2", "com.mitchellh.ghostty",
             "com.todesktop.230313mzl4w4u92", "co.anysphere.cursor.nightly",
             "com.apple.dt.xcode", "com.apple.dt.xcode-beta",
             "com.visualstudio.code.oss", "com.microsoft.vscodeinsiders":
            self = .click
        case _ where ["com.google.chrome", "org.mozilla.firefox", "com.microsoft.edgemac"].contains(where: belongs):
            self = .read
        case _ where ["com.microsoft.vscode", "com.jetbrains", "com.unpeel.native"].contains(where: belongs):
            self = .click
        default:
            self = .full
        }
    }

    static func require(_ action: String, in app: ComputerTarget, unrestricted: Bool) throws {
        switch Self(bundleID: app.bundleID, unrestricted: unrestricted) {
        case .read:
            throw ComputerError("\(app.name) is read-only in computer use. Use the Unpeel browser tool to interact with it.")
        case .click where action != "left_click" && action != "scroll":
            throw ComputerError("Computer use only allows left-click and scroll in \(app.name).")
        case .click, .full:
            break
        }
    }
}

enum ComputerAppAuthorization {
    static func allowsInput(mode: ComputerAccess, unrestricted: Bool, decision: String?) -> Bool {
        mode != .off && ((mode == .allow && unrestricted) || decision == "allow")
    }
}

@MainActor
enum ComputerTargetLookup {
    static func frontmost() throws -> ComputerTarget {
        try target(NSWorkspace.shared.frontmostApplication)
    }

    static func keyboard(app bundleID: String?) throws -> ComputerTarget {
        guard let bundleID else { return try frontmost() }
        let workspace = NSWorkspace.shared
        let matches = workspace.runningApplications.filter {
            !$0.isTerminated && $0.bundleIdentifier?.caseInsensitiveCompare(bundleID) == .orderedSame
        }
        let preferred = try preferredKeyboardPID(
            matching: matches.map(\.processIdentifier), frontmost: workspace.frontmostApplication?.processIdentifier
        )
        return try target(matches.first { $0.processIdentifier == preferred })
    }

    static func preferredKeyboardPID(matching pids: [pid_t], frontmost: pid_t?) throws -> pid_t {
        if let frontmost, pids.contains(frontmost) { return frontmost }
        if pids.count == 1 { return pids[0] }
        if pids.isEmpty { throw ComputerError("The requested keyboard app is not running.") }
        throw ComputerError("Multiple copies of that app are running. Choose the intended copy in the foreground.")
    }

    static func pointer(at point: CGPoint) throws -> ComputerPointerTarget {
        let window = try frontWindow(at: point)
        let hit = ComputerAccessibility.hit(at: point)
        if let window, window.usesBrowserEngine {
            // Renderer helpers do not have their own app grant. If the
            // system-wide hit differs, ask the verified window owner and
            // only keep an AX element attributed to that process.
            let appHit = hit?.pid == window.pid ? hit : ComputerAccessibility.hit(at: point, in: window.pid)
            return ComputerPointerTarget(
                app: window.app, window: window.info, hit: appHit, usesBrowserEngine: true
            )
        }
        guard let hit else { throw ComputerError("Could not identify the app at that point.") }
        let application = NSRunningApplication(processIdentifier: hit.pid)
        let app = try target(application)
        guard window?.app.matches(app) != false else {
            throw ComputerError("Could not confirm which app would receive input at that point.")
        }
        return ComputerPointerTarget(
            app: app, window: window?.info, hit: hit, usesBrowserEngine: window?.usesBrowserEngine ?? usesBrowserEngine(app, application)
        )
    }

    private static func usesBrowserEngine(_ app: ComputerTarget, _ application: NSRunningApplication?) -> Bool {
        // Classify browsers independently of the current permission mode.
        if ComputerAppTier(bundleID: app.bundleID) == .read { return true }
        guard let bundle = application?.bundleURL else { return false }
        let framework = bundle.appendingPathComponent("Contents/Frameworks/Electron Framework.framework")
        return FileManager.default.fileExists(atPath: framework.path)
    }

    private static func frontWindow(at point: CGPoint) throws -> (
        app: ComputerTarget, pid: pid_t, info: ComputerPointerDelivery.Window?, usesBrowserEngine: Bool
    )? {
        guard let windows = CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements], kCGNullWindowID)
            as? [[String: Any]]
        else { throw ComputerError("Could not read the windows on this display.") }
        for window in windows {
            guard (window[kCGWindowAlpha as String] as? Double ?? 0) > 0,
                  let bounds = window[kCGWindowBounds as String] as? [String: Any],
                  let rect = CGRect(dictionaryRepresentation: bounds as CFDictionary),
                  rect.contains(point),
                  let pid = window[kCGWindowOwnerPID as String] as? pid_t
            else { continue }
            let info: ComputerPointerDelivery.Window? = (window[kCGWindowNumber as String] as? CGWindowID).flatMap {
                $0 == kCGNullWindowID ? nil : ComputerPointerDelivery.Window(id: $0, bounds: rect)
            }
            let application = NSRunningApplication(processIdentifier: pid)
            let app = try target(application)
            return (app, pid, info, usesBrowserEngine(app, application))
        }
        return nil
    }

    private static func target(_ app: NSRunningApplication?) throws -> ComputerTarget {
        guard let app, let id = app.bundleIdentifier, !id.isEmpty, !app.isTerminated else {
            throw ComputerError("Could not identify the target app’s bundle.")
        }
        return ComputerTarget(name: app.localizedName ?? id, bundleID: id, pid: app.processIdentifier)
    }
}
