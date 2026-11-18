//
//  WindowPin.swift
//  UnpeelNative
//
//  "Keep on Top" (titlebar pin, Window ▸ Keep on Top ⌥⌘P): the main window
//  floats above other apps' windows and joins every Desktop (Space), so it
//  is already there when you switch Desktops. Per-Mac preference, restored
//  on launch.
//

import AppKit
import Combine

@MainActor
final class WindowPinModel: ObservableObject {
    static let shared = WindowPinModel()
    nonisolated static let defaultsKey = "window_keep_on_top"

    @Published private(set) var isPinned: Bool

    init(defaults: UserDefaults = AppDefaults.machine) {
        self.defaults = defaults
        isPinned = defaults.bool(forKey: Self.defaultsKey)
    }

    private let defaults: UserDefaults

    func toggle() { setPinned(!isPinned) }

    func setPinned(_ pinned: Bool) {
        guard pinned != isPinned else { return }
        isPinned = pinned
        defaults.set(pinned, forKey: Self.defaultsKey)
        applyToAllWindows()
    }

    /// Every main Unpeel window (drag cards, panels and popovers are other
    /// window classes and stay untouched).
    func applyToAllWindows() {
        for window in NSApp.windows where window is TerminalPaneWindow {
            apply(to: window)
        }
    }

    func apply(to window: NSWindow) {
        window.level = isPinned ? .floating : .normal
        window.collectionBehavior = Self.collectionBehavior(
            window.collectionBehavior, pinned: isPinned
        )
    }

    /// Pinned: on every Space (and never yanked to the active one, which
    /// `.canJoinAllSpaces` makes moot and AppKit rejects in combination).
    nonisolated static func collectionBehavior(
        _ current: NSWindow.CollectionBehavior,
        pinned: Bool
    ) -> NSWindow.CollectionBehavior {
        var behavior = current
        if pinned {
            behavior.remove(.moveToActiveSpace)
            behavior.insert(.canJoinAllSpaces)
        } else {
            behavior.remove(.canJoinAllSpaces)
        }
        return behavior
    }
}
