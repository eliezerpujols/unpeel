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

    static func open(_ nameOrBundleID: String) async throws {
        let workspace = NSWorkspace.shared
        let running = workspace.runningApplications.first { app in
            app.bundleIdentifier?.caseInsensitiveCompare(nameOrBundleID) == .orderedSame
                || app.localizedName?.localizedCaseInsensitiveCompare(nameOrBundleID) == .orderedSame
        }
        if running?.isActive == true { return }
        guard let url = running?.bundleURL
            ?? workspace.urlForApplication(withBundleIdentifier: nameOrBundleID)
            ?? applicationURL(named: nameOrBundleID, workspace: workspace)
        else { throw ComputerError("Could not find \(nameOrBundleID) by app name or bundle ID.") }
        try Task.checkCancellation()
        let configuration = NSWorkspace.OpenConfiguration()
        configuration.activates = true
        _ = try await workspace.openApplication(at: url, configuration: configuration)
    }

    private static func applicationURL(named name: String, workspace: NSWorkspace) -> URL? {
        // Launch Services' name lookup also finds apps installed outside /Applications.
        workspace.fullPath(forApplication: name).map { URL(fileURLWithPath: $0, isDirectory: true) }
    }
}
