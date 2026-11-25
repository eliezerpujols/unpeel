import AppKit
import SwiftUI

struct ComputerUseSettingsPanel: View {
    @ObservedObject var store: UnpeelStore
    @ObservedObject private var control = ComputerControl.shared
    @State private var screenRecording = false
    @State private var accessibility = false

    var body: some View {
        Form {
            Section {} header: {
                SettingsPaneHeader(
                    title: "Computer use",
                    description: "Agents can see the screen and control apps on this Mac."
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
                Text(store.computerUseAccess.detail(unrestricted: store.computerUnrestricted))
                    .foregroundStyle(Theme.mutedForeground)
            }
            Section {
                Toggle("Let agents control any app", isOn: Binding(
                    get: { store.computerUnrestricted },
                    set: store.setComputerUnrestricted
                ))
            } footer: {
                Text("Includes browsers with your signed-in accounts, terminals, and Unpeel itself.")
                    .foregroundStyle(Theme.mutedForeground)
            }
            Section {
                LabeledContent("Computer control") {
                    if control.snapshot.paused {
                        Button("Resume") { control.setPaused(false) }
                    } else {
                        Button("Pause") { control.setPaused(true) }
                    }
                }
                LabeledContent("Stop shortcut") {
                    Text(GlobalShortcut.computerStop.displayString)
                }
            } footer: {
                Text(UnpeelWorkspaceContext.isDefaultInstance && !control.shortcutAvailable
                     ? "macOS couldn’t register the shortcut. Use Pause here or Stop on the floating pill."
                     : "Stops running computer actions and pauses computer use across local workspaces.")
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
        .scrollContentBackground(.hidden)
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
        control.refresh()
        screenRecording = ComputerPermissions.screenRecording
        accessibility = ComputerPermissions.accessibility
    }
}
