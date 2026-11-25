import AppKit
import SwiftUI

@MainActor
final class ComputerControlPill {
    enum State {
        case controlling(ComputerControl.Activity)
        case paused

        var message: String {
            switch self {
            case let .controlling(activity): activity.message
            case .paused: "Computer use paused"
            }
        }

        var targetPoint: CGPoint? {
            if case let .controlling(activity) = self { return activity.targetPoint }
            return nil
        }

        var paused: Bool {
            if case .paused = self { return true }
            return false
        }
    }

    private(set) var panel: NSPanel?

    func update(_ state: State?, setPaused: @escaping (Bool) -> Void) {
        guard let state else {
            panel?.orderOut(nil)
            return
        }
        let panel = self.panel ?? NonactivatingPromptPanel()
        self.panel = panel
        let content = NonactivatingPromptHostingView(rootView: pill(state, setPaused: setPaused))
        panel.contentView = content
        let size = content.fittingSize
        panel.setContentSize(size)
        let anchor = state.targetPoint.map {
            NSPoint(x: $0.x, y: (NSScreen.screens.first?.frame.maxY ?? 0) - $0.y)
        } ?? NSEvent.mouseLocation
        let screen = NSScreen.screens.first { $0.frame.contains(anchor) } ?? NSScreen.main
        if let screen {
            let visible = screen.visibleFrame
            let top = visible.maxY - size.height - 10
            let bottom = visible.minY + 10
            let left = visible.midX - size.width / 2
            let topFrame = NSRect(x: left, y: top, width: size.width, height: size.height)
            panel.setFrameOrigin(NSPoint(x: left, y: topFrame.contains(anchor) ? bottom : top))
        }
        panel.orderFrontRegardless()
    }

    private func pill(_ state: State, setPaused: @escaping (Bool) -> Void) -> some View {
        HStack(spacing: 10) {
            Image(systemName: state.paused ? "pause.circle.fill" : "cursorarrow.rays")
                .foregroundStyle(.orange)
            Text(state.message)
                .font(.system(size: 13, weight: .semibold))
                .lineLimit(1)
                .frame(maxWidth: 390)
            Button(state.paused ? "Resume" : "Stop") { setPaused(!state.paused) }
                .controlSize(.small)
        }
        .fixedSize()
        .padding(.leading, 13)
        .padding(.trailing, 8)
        .padding(.vertical, 6)
        .background(.regularMaterial, in: Capsule())
        .overlay { Capsule().strokeBorder(.primary.opacity(0.14)) }
        .padding(4)
    }
}

struct ComputerControlRowMark: View {
    @ObservedObject private var control = ComputerControl.shared
    let sessionID: String
    let paneIDs: [String]

    var body: some View {
        if let activity = control.activity, activity.sessionID == sessionID || paneIDs.contains(activity.sessionID) {
            Image(systemName: "cursorarrow.rays")
                .font(.system(size: 11, weight: .semibold))
                .foregroundStyle(.orange)
                .help(activity.message)
                .accessibilityLabel(activity.message)
        }
    }
}
