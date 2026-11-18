import AppKit
import XCTest
@testable import UnpeelNative

@MainActor
final class WindowPinTests: XCTestCase {
    func testPinIsRememberedAcrossLaunches() {
        let suite = "WindowPinTests.\(UUID().uuidString)"
        let defaults = UserDefaults(suiteName: suite)!
        defer { defaults.removePersistentDomain(forName: suite) }

        let first = WindowPinModel(defaults: defaults)
        XCTAssertFalse(first.isPinned)
        first.toggle()
        XCTAssertTrue(first.isPinned)
        XCTAssertTrue(WindowPinModel(defaults: defaults).isPinned)
        first.toggle()
        XCTAssertFalse(WindowPinModel(defaults: defaults).isPinned)
    }

    func testPinnedWindowJoinsEverySpaceAndUnpinRestores() {
        let start: NSWindow.CollectionBehavior = [.moveToActiveSpace, .fullScreenPrimary]
        let pinned = WindowPinModel.collectionBehavior(start, pinned: true)
        XCTAssertTrue(pinned.contains(.canJoinAllSpaces))
        XCTAssertFalse(pinned.contains(.moveToActiveSpace))
        XCTAssertTrue(pinned.contains(.fullScreenPrimary))

        let unpinned = WindowPinModel.collectionBehavior(pinned, pinned: false)
        XCTAssertFalse(unpinned.contains(.canJoinAllSpaces))
        XCTAssertTrue(unpinned.contains(.fullScreenPrimary))
    }
}
