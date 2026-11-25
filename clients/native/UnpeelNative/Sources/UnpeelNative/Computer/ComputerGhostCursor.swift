import AppKit

@MainActor
final class ComputerGhostCursor {
    private final class Panel: NSPanel {
        override var canBecomeKey: Bool { false }
        override var canBecomeMain: Bool { false }
    }

    private var panel: Panel?
    private var dismiss: Task<Void, Never>?

    var windowID: CGWindowID? { panel.flatMap { CGWindowID(exactly: $0.windowNumber) } }

    func show(at point: CGPoint, over window: CGWindowID?) {
        let screenTop = CGDisplayBounds(CGMainDisplayID()).maxY
        let destination = CGPoint(x: point.x, y: screenTop - point.y - 22)
        guard destination.x.isFinite, destination.y.isFinite else { return }
        dismiss?.cancel()
        let panel = self.panel ?? makePanel()
        self.panel = panel
        if !panel.isVisible {
            panel.setFrameOrigin(CGPoint(x: destination.x - 14, y: destination.y + 12))
        }
        panel.alphaValue = 0.76
        if let window {
            panel.order(.above, relativeTo: Int(window))
        } else {
            panel.orderFrontRegardless()
        }
        NSAnimationContext.runAnimationGroup { animation in
            animation.duration = 0.15
            panel.animator().setFrameOrigin(destination)
        }
        dismiss = Task { @MainActor [weak self, weak panel] in
            try? await Task.sleep(for: .milliseconds(310))
            guard !Task.isCancelled, let panel else { return }
            await NSAnimationContext.runAnimationGroup { animation in
                animation.duration = 0.22
                panel.animator().alphaValue = 0
            }
            guard !Task.isCancelled else { return }
            self?.clear()
        }
    }

    func clear() {
        dismiss?.cancel()
        dismiss = nil
        panel?.orderOut(nil)
    }

    private func makePanel() -> Panel {
        let frame = CGRect(x: 0, y: 0, width: 24, height: 24)
        let panel = Panel(contentRect: frame, styleMask: [.borderless, .nonactivatingPanel], backing: .buffered, defer: false)
        panel.isOpaque = false
        panel.backgroundColor = .clear
        panel.ignoresMouseEvents = true
        panel.hidesOnDeactivate = false
        panel.isExcludedFromWindowsMenu = true
        panel.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .ignoresCycle]
        panel.sharingType = .none
        let image = NSImageView(frame: frame)
        image.image = NSImage(systemSymbolName: "cursorarrow", accessibilityDescription: nil)?
            .withSymbolConfiguration(.init(pointSize: 18, weight: .semibold))
        image.contentTintColor = .systemOrange
        panel.contentView = image
        return panel
    }
}
