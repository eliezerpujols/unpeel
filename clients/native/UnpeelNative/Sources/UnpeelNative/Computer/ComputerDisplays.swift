import CoreGraphics

/// Indices describe a snapshot of the active display layout. Captured frames
/// keep the underlying Quartz display ID so indices can change on a re-layout.
enum ComputerDisplays {
    struct Display: Encodable {
        let id: CGDirectDisplayID
        let index: Int
        let bounds: CGRect
        let main: Bool

        private enum CodingKeys: String, CodingKey {
            case index, x, y, width, height, main
        }

        func encode(to encoder: Encoder) throws {
            var container = encoder.container(keyedBy: CodingKeys.self)
            try container.encode(index, forKey: .index)
            try container.encode(bounds.minX, forKey: .x)
            try container.encode(bounds.minY, forKey: .y)
            try container.encode(bounds.width, forKey: .width)
            try container.encode(bounds.height, forKey: .height)
            try container.encode(main, forKey: .main)
        }
    }

    static func active() -> [Display] {
        var count: UInt32 = 0
        guard CGGetActiveDisplayList(0, nil, &count) == .success, count > 0 else { return [] }
        var ids = [CGDirectDisplayID](repeating: 0, count: Int(count))
        guard CGGetActiveDisplayList(count, &ids, &count) == .success else { return [] }
        return indexed(ids.prefix(Int(count)).map { ($0, CGDisplayBounds($0)) }, mainID: CGMainDisplayID())
    }

    static func indexed(
        _ displays: [(id: CGDirectDisplayID, bounds: CGRect)], mainID: CGDirectDisplayID
    ) -> [Display] {
        displays.sorted { lhs, rhs in
            if lhs.id == mainID || rhs.id == mainID { return lhs.id == mainID && rhs.id != mainID }
            return (lhs.bounds.minX, lhs.bounds.minY, lhs.id) < (rhs.bounds.minX, rhs.bounds.minY, rhs.id)
        }.enumerated().map { index, display in
            Display(id: display.id, index: index, bounds: display.bounds, main: display.id == mainID)
        }
    }

    static func select(_ explicitIndex: Int?, previousID: CGDirectDisplayID?, from displays: [Display]) throws -> Display {
        if let explicitIndex {
            guard displays.indices.contains(explicitIndex) else {
                throw ComputerError("Display \(explicitIndex) is unavailable. Call computer status for current display indices.")
            }
            return displays[explicitIndex]
        }
        guard let display = displays.first(where: { $0.id == previousID }) ?? displays.first else {
            throw ComputerError("No active display is available.")
        }
        return display
    }
}
