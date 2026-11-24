//
//  GlobalPalette.swift
//  UnpeelNative
//
//  System-wide shortcut for the ⌘K palette. A Carbon hot key (no
//  Accessibility permission needed) opens the palette in a floating panel
//  on whatever desktop / Space is active, over any app. Picking a row runs
//  it and brings the main window forward.
//
//  Only the default workspace instance registers the key: the palette
//  already lists every workspace's sessions, and two processes holding the
//  same hot key would fight over it.
//

import AppKit
import Carbon.HIToolbox
import SwiftUI

// MARK: - Shortcut model

struct GlobalShortcut: Codable, Equatable {
    /// Virtual key code (kVK_*).
    var keyCode: UInt32
    /// NSEvent.ModifierFlags raw value, limited to ⌘⌥⌃⇧.
    var modifiers: UInt

    static let `default` = GlobalShortcut(
        keyCode: UInt32(kVK_Space),
        modifiers: NSEvent.ModifierFlags.option.rawValue
    )

    var modifierFlags: NSEvent.ModifierFlags { NSEvent.ModifierFlags(rawValue: modifiers) }

    var carbonModifiers: UInt32 {
        var result: UInt32 = 0
        let flags = modifierFlags
        if flags.contains(.command) { result |= UInt32(cmdKey) }
        if flags.contains(.option) { result |= UInt32(optionKey) }
        if flags.contains(.control) { result |= UInt32(controlKey) }
        if flags.contains(.shift) { result |= UInt32(shiftKey) }
        return result
    }

    /// "⌥Space", "⌃⌥K" …
    var displayString: String {
        let flags = modifierFlags
        var text = ""
        if flags.contains(.control) { text += "⌃" }
        if flags.contains(.option) { text += "⌥" }
        if flags.contains(.shift) { text += "⇧" }
        if flags.contains(.command) { text += "⌘" }
        return text + Self.keyName(keyCode)
    }

    static func keyName(_ code: UInt32) -> String {
        switch Int(code) {
        case kVK_Space: return "Space"
        case kVK_Return: return "↩"
        case kVK_Tab: return "⇥"
        case kVK_Escape: return "⎋"
        case kVK_Delete: return "⌫"
        case kVK_ForwardDelete: return "⌦"
        case kVK_LeftArrow: return "←"
        case kVK_RightArrow: return "→"
        case kVK_UpArrow: return "↑"
        case kVK_DownArrow: return "↓"
        case kVK_Home: return "↖"
        case kVK_End: return "↘"
        case kVK_PageUp: return "⇞"
        case kVK_PageDown: return "⇟"
        case kVK_F1: return "F1"
        case kVK_F2: return "F2"
        case kVK_F3: return "F3"
        case kVK_F4: return "F4"
        case kVK_F5: return "F5"
        case kVK_F6: return "F6"
        case kVK_F7: return "F7"
        case kVK_F8: return "F8"
        case kVK_F9: return "F9"
        case kVK_F10: return "F10"
        case kVK_F11: return "F11"
        case kVK_F12: return "F12"
        default: break
        }
        // Printable keys: ask the current keyboard layout.
        guard let source = TISCopyCurrentKeyboardLayoutInputSource()?.takeRetainedValue(),
              let raw = TISGetInputSourceProperty(source, kTISPropertyUnicodeKeyLayoutData)
        else { return "Key \(code)" }
        let data = Unmanaged<CFData>.fromOpaque(raw).takeUnretainedValue() as Data
        var deadKeys: UInt32 = 0
        var chars = [UniChar](repeating: 0, count: 4)
        var length = 0
        let status = data.withUnsafeBytes { buffer -> OSStatus in
            guard let layout = buffer.baseAddress?.assumingMemoryBound(to: UCKeyboardLayout.self)
            else { return -1 }
            return UCKeyTranslate(
                layout, UInt16(code), UInt16(kUCKeyActionDisplay), 0,
                UInt32(LMGetKbdType()), OptionBits(kUCKeyTranslateNoDeadKeysBit),
                &deadKeys, chars.count, &length, &chars
            )
        }
        guard status == noErr, length > 0 else { return "Key \(code)" }
        return String(utf16CodeUnits: chars, count: length).uppercased()
    }

    /// A global shortcut needs ⌘, ⌥ or ⌃ (⇧ alone would eat typing),
    /// except function keys.
    static func isAcceptable(keyCode: UInt32, modifiers: NSEvent.ModifierFlags) -> Bool {
        let functionKeys: Set<Int> = [
            kVK_F1, kVK_F2, kVK_F3, kVK_F4, kVK_F5, kVK_F6,
            kVK_F7, kVK_F8, kVK_F9, kVK_F10, kVK_F11, kVK_F12,
        ]
        if functionKeys.contains(Int(keyCode)) { return true }
        return !modifiers.intersection([.command, .option, .control]).isEmpty
    }
}

// MARK: - Controller

@MainActor
final class GlobalPaletteController: ObservableObject {
    static let shared = GlobalPaletteController()

    private static let enabledKey = "globalPaletteShortcutEnabled"
    private static let shortcutKey = "globalPaletteShortcut"

    /// Whether this process may own the hot key at all.
    static var isAvailable: Bool { UnpeelWorkspaceContext.isDefaultInstance }

    @Published private(set) var enabled: Bool
    @Published private(set) var shortcut: GlobalShortcut
    /// Set when macOS refused the key (another app holds it).
    @Published private(set) var registrationFailed = false

    private weak var store: UnpeelStore?
    private var onReveal: (() -> Void)?
    private var hotKeyRef: EventHotKeyRef?
    private var handlerRef: EventHandlerRef?
    private var panel: GlobalPalettePanel?
    private var resignObserver: NSObjectProtocol?
    /// While the Settings recorder listens, the hot key must not fire.
    private var suspended = false

    private init() {
        let defaults = UserDefaults.standard
        enabled = defaults.object(forKey: Self.enabledKey) as? Bool ?? true
        if let data = defaults.data(forKey: Self.shortcutKey),
           let saved = try? JSONDecoder().decode(GlobalShortcut.self, from: data) {
            shortcut = saved
        } else {
            shortcut = .default
        }
    }

    /// `onReveal` brings the main window forward after a row runs.
    func start(store: UnpeelStore, onReveal: @escaping () -> Void) {
        self.store = store
        self.onReveal = onReveal
        guard Self.isAvailable else { return }
        installHandler()
        register()
    }

    func setEnabled(_ value: Bool) {
        enabled = value
        UserDefaults.standard.set(value, forKey: Self.enabledKey)
        register()
    }

    func setShortcut(_ value: GlobalShortcut) {
        shortcut = value
        if let data = try? JSONEncoder().encode(value) {
            UserDefaults.standard.set(data, forKey: Self.shortcutKey)
        }
        register()
    }

    func setSuspended(_ value: Bool) {
        suspended = value
        register()
    }

    // MARK: Hot key

    private func installHandler() {
        guard handlerRef == nil else { return }
        var spec = EventTypeSpec(
            eventClass: OSType(kEventClassKeyboard),
            eventKind: UInt32(kEventHotKeyPressed)
        )
        InstallEventHandler(
            GetApplicationEventTarget(),
            { _, _, _ -> OSStatus in
                DispatchQueue.main.async {
                    MainActor.assumeIsolated { GlobalPaletteController.shared.hotKeyPressed() }
                }
                return noErr
            },
            1, &spec, nil, &handlerRef
        )
    }

    private func register() {
        if let hotKeyRef {
            UnregisterEventHotKey(hotKeyRef)
            self.hotKeyRef = nil
        }
        registrationFailed = false
        guard Self.isAvailable, handlerRef != nil, enabled, !suspended else { return }
        var ref: EventHotKeyRef?
        let id = EventHotKeyID(signature: OSType(0x554E_504C), id: 1) // "UNPL"
        let status = RegisterEventHotKey(
            shortcut.keyCode, shortcut.carbonModifiers, id,
            GetApplicationEventTarget(), 0, &ref
        )
        if status == noErr {
            hotKeyRef = ref
        } else {
            registrationFailed = true
        }
    }

    private func hotKeyPressed() {
        guard let store else { return }
        if panel?.isVisible == true {
            hidePanel()
            return
        }
        // Unpeel already in front on this desktop: use the in-window palette.
        if NSApp.isActive,
           let key = NSApp.keyWindow, key.isOnActiveSpace,
           !(key is NSPanel) {
            store.toggleCommandPalette()
            return
        }
        showPanel(store: store)
    }

    // MARK: Panel

    private func showPanel(store: UnpeelStore) {
        let size = NSSize(width: 600, height: 470)
        let panel = self.panel ?? GlobalPalettePanel(size: size)
        self.panel = panel
        let content = CommandPaletteOverlay(
            store: store,
            floating: true,
            onClose: { [weak self] in self?.hidePanel() },
            onRan: { [weak self] in self?.onReveal?() }
        )
        .frame(width: size.width, height: size.height, alignment: .top)
        panel.contentView = NSHostingView(rootView: content)
        panel.appearance = NSApp.windows.first { $0.isVisible && !($0 is NSPanel) }?.effectiveAppearance
            ?? NSApp.effectiveAppearance

        // Center on the screen under the pointer, upper third.
        let mouse = NSEvent.mouseLocation
        let screen = NSScreen.screens.first { $0.frame.contains(mouse) } ?? NSScreen.main
        if let visible = screen?.visibleFrame {
            let origin = NSPoint(
                x: visible.midX - size.width / 2,
                y: visible.maxY - visible.height * 0.18 - size.height
            )
            panel.setFrameOrigin(origin)
        }
        panel.makeKeyAndOrderFront(nil)
        if resignObserver == nil {
            resignObserver = NotificationCenter.default.addObserver(
                forName: NSWindow.didResignKeyNotification, object: panel, queue: .main
            ) { [weak self] _ in
                MainActor.assumeIsolated { self?.hidePanel() }
            }
        }
    }

    private func hidePanel() {
        guard let panel, panel.isVisible else { return }
        panel.orderOut(nil)
        // Drop the SwiftUI tree so its key monitor goes away with it.
        panel.contentView = nil
    }
}

/// Borderless, transparent, joins every Space and full-screen app, and can
/// take keyboard focus without activating Unpeel (so the current desktop
/// stays put until a row is picked).
final class GlobalPalettePanel: NSPanel {
    init(size: NSSize) {
        super.init(
            contentRect: NSRect(origin: .zero, size: size),
            styleMask: [.borderless, .nonactivatingPanel],
            backing: .buffered,
            defer: true
        )
        isOpaque = false
        backgroundColor = .clear
        hasShadow = false
        level = .floating
        isFloatingPanel = true
        hidesOnDeactivate = false
        becomesKeyOnlyIfNeeded = false
        isReleasedWhenClosed = false
        collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .transient, .ignoresCycle]
    }

    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { false }
}

// MARK: - Settings

/// Settings row: on/off plus a click-to-record shortcut field.
struct GlobalPaletteShortcutSection: View {
    @ObservedObject private var controller = GlobalPaletteController.shared
    @State private var recording = false
    @State private var monitor: Any?

    var body: some View {
        Section {
            Toggle("Open the palette from anywhere", isOn: Binding(
                get: { controller.enabled },
                set: { controller.setEnabled($0) }
            ))
            LabeledContent("Shortcut") {
                HStack(spacing: 8) {
                    Button(recording ? "Type a shortcut…" : controller.shortcut.displayString) {
                        recording ? stopRecording() : startRecording()
                    }
                    .frame(minWidth: 120)
                    if controller.shortcut != .default && !recording {
                        Button("Reset") { controller.setShortcut(.default) }
                    }
                }
            }
            .disabled(!controller.enabled)
            if controller.registrationFailed && controller.enabled {
                Text("macOS didn't accept \(controller.shortcut.displayString). Another app may be using it; pick a different one.")
                    .font(.system(size: 11))
                    .foregroundStyle(.orange)
            }
        } header: {
            SettingsSectionHeader(
                title: "Global shortcut",
                description: "Opens the session palette on any desktop, over any app. Picking a session brings Unpeel forward."
            )
        }
        .onDisappear { stopRecording() }
    }

    private func startRecording() {
        recording = true
        controller.setSuspended(true)
        monitor = NSEvent.addLocalMonitorForEvents(matching: .keyDown) { event in
            let code = UInt32(event.keyCode)
            let flags = event.modifierFlags.intersection([.command, .option, .control, .shift])
            MainActor.assumeIsolated {
                if code == UInt32(kVK_Escape) {
                    stopRecording()
                } else if GlobalShortcut.isAcceptable(keyCode: code, modifiers: flags) {
                    controller.setShortcut(GlobalShortcut(keyCode: code, modifiers: flags.rawValue))
                    stopRecording()
                } else {
                    NSSound.beep()
                }
            }
            return nil
        }
    }

    private func stopRecording() {
        if let monitor { NSEvent.removeMonitor(monitor) }
        monitor = nil
        if recording {
            recording = false
            controller.setSuspended(false)
        }
    }
}
