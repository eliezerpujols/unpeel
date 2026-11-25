import AppKit
import Foundation

/// One stop generation per Mac, shared by its registered workspaces. Blank
/// dev instances use their own home, just like the tools they run.
struct ComputerControlSnapshot: Codable, Equatable {
    let paused: Bool
    let generation: String

    static let initial = Self(paused: false, generation: "initial")
    static let unavailable = Self(paused: true, generation: "")

    static func load(from url: URL) -> Self {
        do {
            return try JSONDecoder().decode(Self.self, from: Data(contentsOf: url))
        } catch let error as CocoaError where error.code == .fileReadNoSuchFile {
            return .initial
        } catch {
            return .unavailable
        }
    }
}

@MainActor
final class ComputerControl: ObservableObject {
    struct Activity: Equatable {
        let sessionID: String
        let sessionName: String
        let appName: String
        let targetPoint: CGPoint?

        var message: String { "\(sessionName) is controlling \(appName)" }
    }

    static let shared = ComputerControl()
    static let change = "computer-control"
    static let pausedMessage = "Computer use was paused. Resume in the Unpeel pill or Settings ▸ Computer use."

    @Published private(set) var snapshot = ComputerControlSnapshot.initial
    @Published private(set) var activity: Activity?
    @Published private(set) var shortcutAvailable = false
    var onGenerationChange: (() -> Void)?

    private var localStop = false
    private var showsPausePill = false
    private var inputMonitor: Any?
    private var ownPort: UInt16?
    private let pill = ComputerControlPill()
    private let home = UnpeelWorkspaceContext.currentWorkspace() == nil
        ? LaunchConfig.unpeelDir : LaunchConfig.realUnpeelDir
    private var file: URL { home.appendingPathComponent("computer-control.json") }

    private init() {}

    func start(ownPort: UInt16?, hasPendingApprovals: @escaping () -> Bool) {
        self.ownPort = ownPort
        inputMonitor = NSEvent.addLocalMonitorForEvents(matching: [.leftMouseDown, .leftMouseUp, .scrollWheel]) { [weak self] event in
            guard event.cgEvent?.getIntegerValueField(.eventSourceUserData) == ComputerInput.eventTag else { return event }
            let windowNumber = event.windowNumber
            let blocked = MainActor.assumeIsolated {
                hasPendingApprovals() || self?.pill.panel?.windowNumber == windowNumber
            }
            return blocked ? nil : event
        }
        if UnpeelWorkspaceContext.isDefaultInstance {
            shortcutAvailable = GlobalHotKeys.shared.register(.computerStop, shortcut: .computerStop) { [weak self] in
                self?.setPaused(true)
            }
        }
        refresh()
    }

    func setPaused(_ paused: Bool) {
        refresh()
        if paused && snapshot.paused && !localStop { return }
        let updated = ComputerControlSnapshot(paused: paused, generation: UUID().uuidString)
        let saved = PresetStateFile.withExclusiveLock(on: file) {
            do {
                let data = try JSONEncoder().encode(updated)
                try data.write(to: file, options: .atomic)
                return true
            } catch {
                return false
            }
        } ?? false
        localStop = paused && !saved
        refresh()
        guard saved else {
            ToastCenter.shared.show("Couldn’t save the computer use pause setting", systemImage: "exclamationmark.triangle")
            return
        }
        let homes = [home] + (home == LaunchConfig.realUnpeelDir
            ? UnpeelWorkspaceRegistry.load().map { URL(fileURLWithPath: $0.home) } : [])
        for workspace in homes {
            UnpeelStore.announceStateChange(
                Self.change, registry: workspace.appendingPathComponent("app-ports"), ownPort: ownPort
            )
        }
    }

    func refresh() {
        let updated = localStop ? .unavailable : ComputerControlSnapshot.load(from: file)
        guard snapshot != updated else { return }
        snapshot = updated
        showsPausePill = updated.paused && (home != LaunchConfig.realUnpeelDir
            || UnpeelWorkspaceContext.isDefaultInstance
            || UnpeelWorkspaceLauncher.runningPid(home: home) == nil)
        onGenerationChange?()
        updatePill()
    }

    func requireRunning(generation: String? = nil) throws {
        try Task.checkCancellation()
        refresh()
        guard !snapshot.paused, generation == nil || snapshot.generation == generation else {
            throw ComputerError(Self.pausedMessage)
        }
    }

    func show(_ activity: Activity?) {
        guard self.activity != activity else { return }
        self.activity = activity
        updatePill()
    }

    private func updatePill() {
        let state: ComputerControlPill.State? = if snapshot.paused {
            showsPausePill ? .paused : nil
        } else {
            activity.map { .controlling($0) }
        }
        pill.update(state) { [weak self] paused in
            self?.setPaused(paused)
        }
    }
}
