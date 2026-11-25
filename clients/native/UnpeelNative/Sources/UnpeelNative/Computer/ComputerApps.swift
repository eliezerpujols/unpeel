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

        func open() async throws {
            try Task.checkCancellation()
            let configuration = NSWorkspace.OpenConfiguration()
            configuration.activates = true
            _ = try await NSWorkspace.shared.openApplication(at: url, configuration: configuration)
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
