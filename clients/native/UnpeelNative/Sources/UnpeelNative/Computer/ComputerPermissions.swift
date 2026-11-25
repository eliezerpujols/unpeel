import ApplicationServices
import Foundation

enum ComputerPermissions {
    static var screenRecording: Bool { CGPreflightScreenCaptureAccess() }
    static var accessibility: Bool { AXIsProcessTrusted() }

    static let screenRecordingSettingsURL = URL(
        string: "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture"
    )!
    static let accessibilitySettingsURL = URL(
        string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility"
    )!

    static let screenRecordingMessage =
        "Unpeel needs Screen Recording permission. Grant it in Unpeel Settings ▸ Computer use."
    static let accessibilityMessage =
        "Unpeel needs Accessibility permission. Grant it in Unpeel Settings ▸ Computer use."

    @MainActor
    @discardableResult
    static func requestScreenRecording() -> Bool {
        CGRequestScreenCaptureAccess()
    }

    @MainActor
    @discardableResult
    static func requestAccessibility() -> Bool {
        AXIsProcessTrustedWithOptions(["AXTrustedCheckOptionPrompt": true] as CFDictionary)
    }
}
