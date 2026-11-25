//
//  MCPApprovalPanel.swift
//  UnpeelNative
//
//  Desktop surfaces for pending MCP approvals and the computer-permissions
//  nudge. Grants have an in-pane card on the Session they belong to.
//  Computer-use prompts also show the card without taking focus
//  from the foreground app. All prompts are nonmodal.
//

import AppKit
import SwiftUI

/// A floating approval or permission panel that preserves the user's focus.
@MainActor
final class FloatingPromptPanelController {
    private var panel: NonactivatingPromptPanel?

    func show<Content: View>(_ root: Content) {
        let panel = self.panel ?? NonactivatingPromptPanel()
        self.panel = panel
        let content = NonactivatingPromptHostingView(rootView: root)
        panel.contentView = content
        let size = content.fittingSize
        panel.setContentSize(size)
        let mouse = NSEvent.mouseLocation
        let screen = NSScreen.screens.first { $0.frame.contains(mouse) } ?? NSScreen.main
        if let visible = screen?.visibleFrame {
            panel.setFrameOrigin(NSPoint(x: visible.maxX - size.width - 16, y: visible.maxY - size.height - 16))
        }
        panel.orderFrontRegardless()
    }

    func dismiss() {
        panel?.orderOut(nil)
        panel?.contentView = nil
    }
}

final class NonactivatingPromptPanel: NSPanel {
    override var canBecomeKey: Bool { false }
    override var canBecomeMain: Bool { false }

    init() {
        super.init(contentRect: .zero, styleMask: [.borderless, .nonactivatingPanel], backing: .buffered, defer: true)
        isOpaque = false
        backgroundColor = .clear
        isFloatingPanel = true
        level = .floating
        hidesOnDeactivate = false
        isReleasedWhenClosed = false
        collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .transient, .ignoresCycle]
    }
}

final class NonactivatingPromptHostingView<Content: View>: NSHostingView<Content> {
    override func acceptsFirstMouse(for event: NSEvent?) -> Bool { true }
}

/// In-pane card for one pending MCP approval. Return and Escape are
/// swallowed while focused so they never reach the terminal underneath.
struct McpApprovalPaneOverlay: View {
    @ObservedObject var store: UnpeelStore
    let approval: PendingMcpApproval
    let capturesKeys: Bool

    var body: some View {
        let message = store.mcpApprovalMessage(approval)
        let moreWaiting = max(
            0,
            store.pendingMcpApprovalCount(forSessionID: approval.presentationSessionID(
                knownIDs: store.mcpApprovalKnownSessionIDs
            )) - 1
        )
        ZStack {
            Color.black.opacity(0.12)
                .contentShape(Rectangle())
            McpApprovalCard(approval: approval, title: message.title, message: message.body, moreWaiting: moreWaiting) {
                store.answerMcpApproval(id: approval.id, approved: $0, remember: $1)
            }
        }
        .background(
            McpApprovalKeyMonitor(
                enabled: capturesKeys,
                onAllow: {
                    store.answerMcpApproval(id: approval.id, approved: true, remember: !approval.allowsOnce)
                },
                onDeny: { store.answerMcpApproval(id: approval.id, approved: false) }
            )
        )
    }
}

struct McpApprovalCard: View {
    let approval: PendingMcpApproval
    let title: String
    let message: String
    var moreWaiting = 0
    let answer: (Bool, Bool) -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top, spacing: 10) {
                AttentionDot(color: Theme.attention)
                    .padding(.top, 3)
                Text(title)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(Theme.foreground)
                    .fixedSize(horizontal: false, vertical: true)
            }
            Text(message)
                .font(.system(size: 12))
                .foregroundStyle(Theme.mutedForeground)
                .fixedSize(horizontal: false, vertical: true)
            if moreWaiting > 0 {
                Text("\(moreWaiting) more waiting")
                    .font(.system(size: 11))
                    .foregroundStyle(Theme.mutedForeground.opacity(0.7))
            }
            HStack(spacing: 8) {
                Spacer()
                McpApprovalDialogButton(label: approval.kind == .computer ? "Deny" : "Don’t Allow", prominent: false) {
                    answer(false, true)
                }
                if approval.allowsOnce {
                    McpApprovalDialogButton(label: "Allow once", prominent: true) {
                        answer(true, false)
                    }
                }
                McpApprovalDialogButton(
                    label: approval.kind == .computer ? "Allow for this session" : "Allow",
                    prominent: !approval.allowsOnce
                ) {
                    answer(true, true)
                }
            }
            .padding(.top, 6)
        }
        .padding(20)
        .frame(width: 360)
        .mcpApprovalGlassCard()
    }
}

private struct McpApprovalGlassCard: ViewModifier {
    var cornerRadius: CGFloat = 20

    func body(content: Content) -> some View {
        let shape = RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
        if #available(macOS 26.0, *) {
            content
                .glassEffect(.regular, in: shape)
                .shadow(color: .black.opacity(0.28), radius: 28, y: 10)
        } else {
            content
                .background(
                    ZStack {
                        VisualEffectBackground(
                            material: .popover, blendingMode: .withinWindow
                        )
                        Theme.contentTint
                    }
                    .clipShape(shape)
                    .shadow(color: .black.opacity(0.32), radius: 28, y: 10)
                )
                .overlay(shape.strokeBorder(Theme.foreground.opacity(0.10)))
        }
    }
}

private extension View {
    func mcpApprovalGlassCard(cornerRadius: CGFloat = 20) -> some View {
        modifier(McpApprovalGlassCard(cornerRadius: cornerRadius))
    }
}

private struct McpApprovalDialogButton: View {
    let label: String
    let prominent: Bool
    let action: () -> Void

    var body: some View {
        styled(
            Button(label, action: action)
                .controlSize(.regular)
        )
    }

    @ViewBuilder
    private func styled(_ button: some View) -> some View {
        if #available(macOS 26.0, *) {
            if prominent {
                button.buttonStyle(.glassProminent).tint(Theme.ctaTint)
            } else {
                // `.glass` reads brighter than glassProminent on dark
                // vibrancy and inverts the hierarchy — same choice as
                // EditorButton in Settings.
                button.buttonStyle(.bordered)
            }
        } else {
            if prominent {
                button.buttonStyle(.borderedProminent).tint(Theme.ctaTint)
            } else {
                button.buttonStyle(.bordered)
            }
        }
    }
}

/// Return allows, Escape denies. Installed only on the focused pane so two
/// visible overlays cannot both consume the same key.
private struct McpApprovalKeyMonitor: NSViewRepresentable {
    let enabled: Bool
    let onAllow: () -> Void
    let onDeny: () -> Void

    func makeNSView(context: Context) -> MonitorView {
        let view = MonitorView()
        view.onAllow = onAllow
        view.onDeny = onDeny
        view.enabled = enabled
        return view
    }

    func updateNSView(_ view: MonitorView, context: Context) {
        view.onAllow = onAllow
        view.onDeny = onDeny
        view.enabled = enabled
        view.syncMonitors()
    }

    static func dismantleNSView(_ view: MonitorView, coordinator _: ()) {
        view.removeMonitor()
    }

    final class MonitorView: NSView {
        var onAllow: (() -> Void)?
        var onDeny: (() -> Void)?
        var enabled = false
        private var monitor: Any?

        override func hitTest(_: NSPoint) -> NSView? { nil }

        override func viewDidMoveToWindow() {
            super.viewDidMoveToWindow()
            syncMonitors()
        }

        func syncMonitors() {
            removeMonitor()
            guard enabled, window != nil else { return }
            monitor = NSEvent.addLocalMonitorForEvents(matching: .keyDown) { [weak self] event in
                guard let self, self.enabled else { return event }
                guard !ComputerInput.isSynthetic(event) else { return nil }
                let modifiers = event.modifierFlags.intersection(.deviceIndependentFlagsMask)
                if modifiers.contains(.command) || modifiers.contains(.option)
                    || modifiers.contains(.control)
                {
                    return event
                }
                switch event.keyCode {
                case 36, 76:
                    self.onAllow?()
                    return nil
                case 53:
                    self.onDeny?()
                    return nil
                default:
                    return event
                }
            }
        }

        func removeMonitor() {
            if let monitor {
                NSEvent.removeMonitor(monitor)
                self.monitor = nil
            }
        }
    }
}
