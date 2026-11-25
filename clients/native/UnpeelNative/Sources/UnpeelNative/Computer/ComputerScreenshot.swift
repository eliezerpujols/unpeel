import AppKit
import CoreGraphics
import Foundation
import ImageIO
import ScreenCaptureKit
import UniformTypeIdentifiers

struct ComputerScreenshotGeometry: Equatable {
    let displayID: CGDirectDisplayID?
    let displayBounds: CGRect
    let screenRect: CGRect
    let width: Int
    let height: Int
    var window: ComputerWindow? = nil
    var availableWindows: [ComputerWindow]? = nil
    var warning: String? = nil

    private var pixelsPerPointX: CGFloat { CGFloat(width) / screenRect.width }
    private var pixelsPerPointY: CGFloat { CGFloat(height) / screenRect.height }

    /// Pixels per screen point on the longer image axis. The actual mapping
    /// uses both axes to account for rounding to whole pixels.
    var scale: CGFloat { width >= height ? pixelsPerPointX : pixelsPerPointY }

    func screenPoint(for pixel: CGPoint) throws -> CGPoint {
        guard CGRect(x: 0, y: 0, width: width, height: height).contains(pixel) else {
            throw ComputerError("coordinate is outside the latest screenshot (\(width) × \(height) pixels).")
        }
        return mapToScreen(pixel)
    }

    func screenRegion(for pixels: CGRect) throws -> CGRect {
        guard pixels.width > 0, pixels.height > 0, pixels.minX >= 0, pixels.minY >= 0,
              pixels.maxX <= CGFloat(width), pixels.maxY <= CGFloat(height)
        else {
            throw ComputerError("region is outside the latest screenshot (\(width) × \(height) pixels).")
        }
        return CGRect(
            origin: mapToScreen(pixels.origin),
            size: CGSize(width: pixels.width / pixelsPerPointX, height: pixels.height / pixelsPerPointY)
        )
    }

    func pixelPoint(for screenPoint: CGPoint) -> CGPoint {
        CGPoint(
            x: (screenPoint.x - screenRect.minX) * pixelsPerPointX,
            y: (screenPoint.y - screenRect.minY) * pixelsPerPointY
        )
    }

    private func mapToScreen(_ pixel: CGPoint) -> CGPoint {
        CGPoint(
            x: screenRect.minX + pixel.x / pixelsPerPointX,
            y: screenRect.minY + pixel.y / pixelsPerPointY
        )
    }
}

enum ComputerScreenshot {
    static let maximumEdge = 1456

    static func scaledSize(width: Int, height: Int) -> (width: Int, height: Int) {
        let factor = min(1, Double(maximumEdge) / Double(max(width, height)))
        return (max(1, Int((Double(width) * factor).rounded())),
                max(1, Int((Double(height) * factor).rounded())))
    }

    /// The optional region is in global Quartz points on this display.
    static func capture(
        to path: String,
        displayID: CGDirectDisplayID = CGMainDisplayID(),
        region: CGRect? = nil
    ) async throws -> ComputerScreenshotGeometry {
        try Task.checkCancellation()
        guard CGDisplayIsActive(displayID) != 0 else {
            throw ComputerError("The requested display is no longer active.")
        }
        let bounds = CGDisplayBounds(displayID)
        let frame: CGImage
        if #available(macOS 14, *) {
            frame = try await captureWithScreenCaptureKit(displayID, atNativeResolution: region != nil)
        } else {
            guard let image = CGDisplayCreateImage(displayID) else {
                throw ComputerError("Could not capture the requested display.")
            }
            frame = image
        }
        guard bounds == CGDisplayBounds(displayID) else {
            throw ComputerError("The display layout changed during capture. Take a new screenshot.")
        }
        try Task.checkCancellation()

        return try writePNG(
            frame, displayID: displayID, bounds: bounds, region: region, to: URL(fileURLWithPath: path)
        )
    }

    /// Encode a captured display frame, retaining the exact rectangle the PNG represents.
    static func writePNG(
        _ frame: CGImage, displayID: CGDirectDisplayID?, bounds: CGRect, region: CGRect?,
        window: ComputerWindow? = nil, availableWindows: [ComputerWindow]? = nil, to url: URL
    ) throws -> ComputerScreenshotGeometry {
        let cropped: (image: CGImage, screenRect: CGRect)
        if let region {
            cropped = try crop(frame, to: region, in: bounds)
        } else {
            cropped = (frame, bounds)
        }
        let image = try resize(cropped.image)
        try savePNG(image, to: url)
        return ComputerScreenshotGeometry(
            displayID: displayID, displayBounds: bounds, screenRect: cropped.screenRect,
            width: image.width, height: image.height, window: window, availableWindows: availableWindows
        )
    }

    @MainActor
    static func captureWindow(
        to path: String, app: ComputerTarget, id: CGWindowID?, region: CGRect? = nil,
        stream: (ComputerWindowStream, sessionID: String)? = nil
    ) async throws -> ComputerScreenshotGeometry {
        try Task.checkCancellation()
        let (window, shareableWindow, windows) = try await ComputerWindows.select(for: app, id: id)
        let hiddenSafari = app.isSafari && (!shareableWindow.isOnScreen
            || app.pid != NSWorkspace.shared.frontmostApplication?.processIdentifier)
        let frame: CGImage
        if #available(macOS 14, *) {
            let filter = SCContentFilter(desktopIndependentWindow: shareableWindow)
            let configuration = configuration(for: filter, atNativeResolution: region != nil, showsCursor: false)
            configuration.ignoreShadowsSingleWindow = true
            configuration.ignoreGlobalClipSingleWindow = true
            var streamImage: CGImage?
            if app.isSafari, let (capture, sessionID) = stream {
                do {
                    streamImage = try await capture.frame(
                        sessionID: sessionID, window: window, filter: filter,
                        configuration: configuration, waitsForPage: hiddenSafari
                    )
                } catch is CancellationError {
                    throw CancellationError()
                } catch {
                    // Use a one-shot capture if macOS declines a live stream.
                    try Task.checkCancellation()
                }
            }
            if let streamImage {
                frame = streamImage
            } else {
                frame = try await SCScreenshotManager.captureImage(contentFilter: filter, configuration: configuration)
            }
        } else {
            guard let image = CGWindowListCreateImage(
                .null, .optionIncludingWindow, window.id, [.boundsIgnoreFraming, .bestResolution]
            ) else { throw ComputerError("Could not capture the requested app window.") }
            frame = image
        }
        guard try window.liveBounds() == window.bounds else {
            throw ComputerError("The app window moved or resized during capture. Take a new screenshot.")
        }
        try Task.checkCancellation()
        var result = try writePNG(
            frame, displayID: nil, bounds: window.bounds, region: region,
            window: window, availableWindows: windows, to: URL(fileURLWithPath: path)
        )
        if hiddenSafari, pageAreaLooksBlank(frame, windowHeight: window.bounds.height) {
            result.warning = "The page area is blank. Safari may not have rendered the window while hidden. Use the Accessibility tree when available."
        }
        return result
    }

    static func pageAreaLooksBlank(_ image: CGImage, windowHeight: CGFloat) -> Bool {
        guard windowHeight > 0 else { return false }
        // Exclude Safari's toolbar, window margins, and scrollbars. A page
        // can also be intentionally white, so the result is only a warning.
        let top = min(0.55, max(0.20, 125 / windowHeight))
        let region = CGRect(
            x: Double(image.width) * 0.06, y: Double(image.height) * top,
            width: Double(image.width) * 0.88, height: Double(image.height) * (0.94 - top)
        ).integral
        guard let page = image.cropping(to: region) else { return false }
        let side = 32
        var pixels = [UInt8](repeating: 0, count: side * side * 4)
        return pixels.withUnsafeMutableBytes { bytes in
            guard let context = CGContext(
                data: bytes.baseAddress, width: side, height: side, bitsPerComponent: 8,
                bytesPerRow: side * 4, space: CGColorSpaceCreateDeviceRGB(),
                bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
            ) else { return false }
            context.interpolationQuality = .high
            context.draw(page, in: CGRect(x: 0, y: 0, width: side, height: side))
            return stride(from: 0, to: bytes.count, by: 4).allSatisfy { offset in
                min(bytes[offset], bytes[offset + 1], bytes[offset + 2]) >= 248
            }
        }
    }

    @available(macOS 14, *)
    private static func captureWithScreenCaptureKit(
        _ displayID: CGDirectDisplayID, atNativeResolution: Bool
    ) async throws -> CGImage {
        let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: true)
        guard let display = content.displays.first(where: { $0.displayID == displayID }) else {
            throw ComputerError("The requested display is unavailable to ScreenCaptureKit.")
        }
        let filter = SCContentFilter(display: display, excludingWindows: [])
        let configuration = configuration(for: filter, atNativeResolution: atNativeResolution, showsCursor: true)
        try Task.checkCancellation()
        return try await SCScreenshotManager.captureImage(contentFilter: filter, configuration: configuration)
    }

    @available(macOS 14, *)
    private static func configuration(
        for filter: SCContentFilter, atNativeResolution: Bool, showsCursor: Bool
    ) -> SCStreamConfiguration {
        let scale = CGFloat(filter.pointPixelScale)
        let width = Int((filter.contentRect.width * scale).rounded())
        let height = Int((filter.contentRect.height * scale).rounded())
        let size = atNativeResolution ? (width: width, height: height) : scaledSize(width: width, height: height)
        let configuration = SCStreamConfiguration()
        configuration.width = size.width
        configuration.height = size.height
        configuration.preservesAspectRatio = false
        configuration.showsCursor = showsCursor
        return configuration
    }

    private static func crop(
        _ image: CGImage, to region: CGRect, in bounds: CGRect
    ) throws -> (CGImage, CGRect) {
        let xScale = CGFloat(image.width) / bounds.width
        let yScale = CGFloat(image.height) / bounds.height
        let nativeRect = CGRect(
            x: (region.minX - bounds.minX) * xScale, y: (region.minY - bounds.minY) * yScale,
            width: region.width * xScale, height: region.height * yScale
        ).integral.intersection(CGRect(x: 0, y: 0, width: image.width, height: image.height))
        guard !nativeRect.isEmpty, let cropped = image.cropping(to: nativeRect) else {
            throw ComputerError("Could not crop the requested screenshot region.")
        }
        let screenRect = CGRect(
            x: bounds.minX + nativeRect.minX / xScale, y: bounds.minY + nativeRect.minY / yScale,
            width: nativeRect.width / xScale, height: nativeRect.height / yScale
        )
        return (cropped, screenRect)
    }

    private static func resize(_ image: CGImage) throws -> CGImage {
        let size = scaledSize(width: image.width, height: image.height)
        guard size.width != image.width || size.height != image.height else { return image }
        guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB),
              let context = CGContext(
                data: nil, width: size.width, height: size.height, bitsPerComponent: 8, bytesPerRow: 0,
                space: colorSpace, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue
              )
        else { throw ComputerError("Could not allocate the scaled screenshot.") }
        context.interpolationQuality = .high
        context.draw(image, in: CGRect(x: 0, y: 0, width: size.width, height: size.height))
        guard let scaled = context.makeImage() else { throw ComputerError("Could not scale the screenshot.") }
        return scaled
    }

    private static func savePNG(_ image: CGImage, to url: URL) throws {
        let data = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(data, UTType.png.identifier as CFString, 1, nil)
        else { throw ComputerError("Could not create a PNG encoder.") }
        CGImageDestinationAddImage(destination, image, nil)
        guard CGImageDestinationFinalize(destination) else {
            throw ComputerError("Could not encode the screenshot as PNG.")
        }
        try Task.checkCancellation()
        try (data as Data).write(to: url, options: .atomic)
    }
}
