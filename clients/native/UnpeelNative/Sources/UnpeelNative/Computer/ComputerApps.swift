import AppKit

@MainActor
enum ComputerApps {
    struct App: Encodable {
        let name: String
        let bundleID: String?

        enum CodingKeys: String, CodingKey {
            case name
            case bundleID = "bundle_id"
        }

        fileprivate init?(_ app: NSRunningApplication) {
            guard let name = app.localizedName ?? app.bundleIdentifier else { return nil }
            self.name = name
            bundleID = app.bundleIdentifier
        }
    }

    static var frontmost: App? {
        NSWorkspace.shared.frontmostApplication.flatMap(App.init)
    }

    static var running: [App] {
        NSWorkspace.shared.runningApplications.compactMap(App.init).sorted {
            $0.name.localizedStandardCompare($1.name) == .orderedAscending
        }
    }

    struct Launch {
        let target: ComputerTarget
        let url: URL

        @MainActor
        func open(activates: Bool) async throws {
            try Task.checkCancellation()
            let workspace = NSWorkspace.shared
            let previousApp = workspace.frontmostApplication
            let previousPID = previousApp?.processIdentifier
            let configuration = NSWorkspace.OpenConfiguration()
            configuration.activates = activates
            if #available(macOS 14, *), activates, NSApp?.isActive == true {
                NSApp.yieldActivation(toApplicationWithBundleIdentifier: target.bundleID)
            }
            let app = try await workspace.openApplication(at: url, configuration: configuration)
            guard app.bundleIdentifier?.caseInsensitiveCompare(target.bundleID) == .orderedSame else {
                throw ComputerError("The app opened with a different bundle identifier.")
            }
            guard activates else {
                // Some apps request activation themselves on startup.
                let restore = Task { @MainActor in
                    try await Task.sleep(for: .milliseconds(100))
                    try await ComputerApps.restoreForeground(previousApp, displacedBy: app.processIdentifier)
                }
                try await restore.value
                try Task.checkCancellation()
                return
            }

            let clock = ContinuousClock()
            let started = clock.now
            var retried = false
            try await ComputerApps.waitForFrontmost(app.processIdentifier, name: target.name) {
                let frontmostPID = workspace.frontmostApplication?.processIdentifier
                // Launch Services can complete before the first activation.
                // Retry once the app is running, while the original app still
                // has focus. A user switch should take precedence.
                if frontmostPID == previousPID, frontmostPID != app.processIdentifier,
                   !retried, app.isFinishedLaunching, started.duration(to: clock.now) >= .milliseconds(250)
                {
                    retried = true
                    if #available(macOS 14, *) {
                        if NSApp?.isActive == true { NSApp.yieldActivation(to: app) }
                        _ = app.activate(from: .current)
                    } else {
                        _ = app.activate(options: .activateIgnoringOtherApps)
                    }
                }
                return frontmostPID
            }
        }
    }

    static func restoreForeground(_ previousApp: NSRunningApplication?, displacedBy pid: pid_t) async throws {
        let workspace = NSWorkspace.shared
        guard let previousApp, !previousApp.isTerminated, previousApp.processIdentifier != pid,
              workspace.frontmostApplication?.processIdentifier == pid else { return }
        _ = previousApp.activate(options: [])
        do {
            try await waitForFrontmost(
                previousApp.processIdentifier, name: previousApp.localizedName ?? "The original app",
                timeout: .milliseconds(750)
            ) { workspace.frontmostApplication?.processIdentifier }
        } catch is ComputerError {
            throw ComputerError("macOS did not restore focus to \(previousApp.localizedName ?? "the previous app").")
        }
    }

    static func waitForFrontmost(
        _ pid: pid_t, name: String, timeout: Duration = .seconds(2), frontmostPID: () -> pid_t?
    ) async throws {
        let clock = ContinuousClock()
        let deadline = clock.now.advanced(by: timeout)
        while true {
            try Task.checkCancellation()
            if frontmostPID() == pid { return }
            guard clock.now < deadline else {
                throw ComputerError("\(name) opened but did not become the frontmost app.")
            }
            try await clock.sleep(until: min(deadline, clock.now.advanced(by: .milliseconds(25))))
        }
    }

    static func resolveLaunch(_ nameOrBundleID: String) throws -> Launch {
        let workspace = NSWorkspace.shared
        let running = workspace.runningApplications.first { app in
            app.bundleIdentifier?.caseInsensitiveCompare(nameOrBundleID) == .orderedSame
                || app.localizedName?.localizedCaseInsensitiveCompare(nameOrBundleID) == .orderedSame
        }
        guard let url = running?.bundleURL
            ?? workspace.urlForApplication(withBundleIdentifier: nameOrBundleID)
            ?? applicationURL(named: nameOrBundleID, workspace: workspace),
              let bundle = Bundle(url: url),
              let bundleID = bundle.bundleIdentifier
        else { throw ComputerError("Could not identify \(nameOrBundleID) by app name or bundle ID.") }
        let name = running?.localizedName
            ?? bundle.object(forInfoDictionaryKey: "CFBundleDisplayName") as? String
            ?? bundle.object(forInfoDictionaryKey: "CFBundleName") as? String
            ?? url.deletingPathExtension().lastPathComponent
        // The filesystem bundle is the recipient for a launch, even if the
        // app opens or closes before the request is performed.
        return Launch(target: ComputerTarget(name: name, bundleID: bundleID, pid: nil), url: url)
    }

    private static func applicationURL(named name: String, workspace: NSWorkspace) -> URL? {
        // Launch Services' name lookup also finds apps installed outside /Applications.
        workspace.fullPath(forApplication: name).map { URL(fileURLWithPath: $0, isDirectory: true) }
    }
}
