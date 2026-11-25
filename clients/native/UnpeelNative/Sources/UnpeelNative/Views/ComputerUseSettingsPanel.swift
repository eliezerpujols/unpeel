import AppKit
import SwiftUI

struct ComputerUseSettingsPanel: View {
    @ObservedObject var store: UnpeelStore
    @State private var screenRecording = false
    @State private var accessibility = false

    var body: some View {
        Form {
            Section {} header: {
                SettingsPaneHeader(
                    title: "Computer use",
                    description: "Agents can see the screen and control apps on this Mac. Browsers stay read-only."
                )
            }
            Section {
                Picker("Access", selection: Binding(
                    get: { store.computerUseAccess },
                    set: { store.setComputerUseAccess($0) }
                )) {
                    ForEach(ComputerAccess.allCases) { access in
                        Text(access.label).tag(access)
                    }
                }
            } footer: {
                Text(store.computerUseAccess.detail)
                    .foregroundStyle(Theme.mutedForeground)
            }
            Section {
                permissionRow("Screen Recording", granted: screenRecording) {
                    ComputerPermissions.requestScreenRecording()
                    NSWorkspace.shared.open(ComputerPermissions.screenRecordingSettingsURL)
                }
                permissionRow("Accessibility", granted: accessibility) {
                    ComputerPermissions.requestAccessibility()
                    NSWorkspace.shared.open(ComputerPermissions.accessibilitySettingsURL)
                }
            } header: {
                SettingsSectionHeader(title: "macOS permissions")
            }
        }
        .formStyle(.grouped)
        .onAppear(perform: refreshPermissions)
        .onReceive(NotificationCenter.default.publisher(for: NSApplication.didBecomeActiveNotification)) { _ in
            refreshPermissions()
        }
    }

    private func permissionRow(
        _ name: String, granted: Bool, grant: @escaping () -> Void
    ) -> some View {
        LabeledContent(name) {
            HStack(spacing: 12) {
                Text(granted ? "Granted" : "Not granted")
                    .foregroundStyle(Theme.mutedForeground)
                Button("Grant…") {
                    grant()
                    refreshPermissions()
                }
                .accessibilityLabel("Grant \(name)")
                .disabled(granted)
            }
        }
    }

    private func refreshPermissions() {
        screenRecording = ComputerPermissions.screenRecording
        accessibility = ComputerPermissions.accessibility
    }
}
