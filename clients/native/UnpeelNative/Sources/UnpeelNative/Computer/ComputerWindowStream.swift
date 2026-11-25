import CoreGraphics
import CoreMedia
import Foundation
import ScreenCaptureKit
import VideoToolbox

/// Retains one window stream briefly so consecutive captures use live frames.
@MainActor
final class ComputerWindowStream {
    private struct Identity: Equatable {
        let sessionID: String
        let windowID: CGWindowID
        let pid: pid_t?
        let width: Int
        let height: Int
    }

    private final class Output: NSObject, SCStreamOutput, @unchecked Sendable {
        private let lock = NSLock()
        private var latest: (number: UInt64, pixels: CVPixelBuffer)?

        func stream(_ stream: SCStream, didOutputSampleBuffer buffer: CMSampleBuffer, of type: SCStreamOutputType) {
            guard type == .screen, CMSampleBufferIsValid(buffer), let pixels = buffer.imageBuffer,
                  let info = (CMSampleBufferGetSampleAttachmentsArray(buffer, createIfNecessary: false)
                              as? [[SCStreamFrameInfo: Any]])?.first,
                  info[.status] as? Int == SCFrameStatus.complete.rawValue else { return }
            lock.withLock {
                latest = ((latest?.number ?? 0) &+ 1, pixels)
            }
        }

        func frame() -> (number: UInt64, pixels: CVPixelBuffer)? {
            lock.withLock { latest }
        }
    }

    private final class Entry {
        let identity: Identity
        let stream: SCStream
        let output: Output

        init(identity: Identity, stream: SCStream, output: Output) {
            self.identity = identity
            self.stream = stream
            self.output = output
        }
    }

    private let queue = DispatchQueue(label: "com.unpeel.computer.window-stream")
    private var active: Entry?
    private var stopWhenIdle: Task<Void, Never>?

    func frame(
        sessionID: String, window: ComputerWindow, filter: SCContentFilter, configuration: SCStreamConfiguration,
        waitsForPage: Bool
    ) async throws -> CGImage? {
        let key = Identity(
            sessionID: sessionID, windowID: window.id, pid: window.app.pid,
            width: configuration.width, height: configuration.height
        )
        stopWhenIdle?.cancel()
        let entry: Entry
        if let active, active.identity == key {
            entry = active
        } else {
            stop()
            configuration.pixelFormat = kCVPixelFormatType_32BGRA
            configuration.minimumFrameInterval = CMTime(value: 1, timescale: 8)
            configuration.queueDepth = 3
            let output = Output()
            let stream = SCStream(filter: filter, configuration: configuration, delegate: nil)
            try stream.addStreamOutput(output, type: .screen, sampleHandlerQueue: queue)
            entry = Entry(identity: key, stream: stream, output: output)
            active = entry
            do {
                try await stream.startCapture()
                guard active === entry, !Task.isCancelled else { throw CancellationError() }
            } catch {
                if active === entry { active = nil }
                try? await stream.stopCapture()
                throw error
            }
        }
        defer {
            if active === entry, Task.isCancelled {
                stop()
            } else if active === entry {
                stopWhenIdle = Task { [weak self] in
                    try? await Task.sleep(for: .seconds(5))
                    guard !Task.isCancelled else { return }
                    self?.stop()
                }
            }
        }
        let clock = ContinuousClock()
        let start = clock.now
        let deadline = start.advanced(by: .milliseconds(1250))
        var lastNumber: UInt64?
        var image: CGImage?
        var looksBlank = false
        while clock.now < deadline {
            try Task.checkCancellation()
            guard active === entry else { throw CancellationError() }
            if let frame = entry.output.frame(), frame.number != lastNumber {
                lastNumber = frame.number
                var result: CGImage?
                if VTCreateCGImageFromCVPixelBuffer(frame.pixels, options: nil, imageOut: &result) == noErr, let result {
                    image = result
                    looksBlank = waitsForPage && ComputerScreenshot.pageAreaLooksBlank(result, windowHeight: window.bounds.height)
                }
            }
            // A reused stream gets a chance to deliver the next frame. A
            // hidden WebKit page gets the rest of the budget to start painting.
            if let image, start.duration(to: clock.now) >= .milliseconds(125), !looksBlank {
                return image
            }
            try await clock.sleep(until: min(deadline, clock.now.advanced(by: .milliseconds(50))))
        }
        if image == nil { stop() }
        return image
    }

    func stop() {
        stopWhenIdle?.cancel()
        stopWhenIdle = nil
        let stream = active?.stream
        active = nil
        stream?.stopCapture { _ in }
    }
}
