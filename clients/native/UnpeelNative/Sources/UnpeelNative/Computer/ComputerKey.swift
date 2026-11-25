import Carbon.HIToolbox
import CoreGraphics
import Foundation

struct ComputerKey: Equatable {
    let code: CGKeyCode
    let modifiers: CGEventFlags
    let modifierKey: CGEventFlags?

    static func parse(_ combo: String) throws -> Self {
        let names = combo.split(separator: "+", omittingEmptySubsequences: false).map {
            $0.trimmingCharacters(in: .whitespaces).lowercased()
        }
        let error = ComputerError("Invalid key combo. Use a key name such as Return or cmd+c.")
        guard let name = names.last, !name.isEmpty else { throw error }
        var flags: CGEventFlags = []
        for token in names.dropLast() {
            guard let modifier = modifierKeys[token], !flags.contains(modifier.flag) else { throw error }
            flags.insert(modifier.flag)
        }
        if let modifier = modifierKeys[name] {
            guard !flags.contains(modifier.flag) else { throw error }
            return Self(code: modifier.code, modifiers: flags, modifierKey: modifier.flag)
        }
        if let shiftedKey = shiftedKeys[name], let code = keys[shiftedKey] {
            return Self(code: CGKeyCode(code), modifiers: flags.union(.maskShift), modifierKey: nil)
        }
        guard let code = keys[name] else { throw error }
        return Self(code: CGKeyCode(code), modifiers: flags, modifierKey: nil)
    }

    private static let modifierKeys: [String: (code: CGKeyCode, flag: CGEventFlags)] = [
        "cmd": (CGKeyCode(kVK_Command), .maskCommand),
        "command": (CGKeyCode(kVK_Command), .maskCommand),
        "super": (CGKeyCode(kVK_Command), .maskCommand),
        "super_l": (CGKeyCode(kVK_Command), .maskCommand),
        "super_r": (CGKeyCode(kVK_RightCommand), .maskCommand),
        "meta": (CGKeyCode(kVK_Command), .maskCommand),
        "meta_l": (CGKeyCode(kVK_Command), .maskCommand),
        "meta_r": (CGKeyCode(kVK_RightCommand), .maskCommand),
        "ctrl": (CGKeyCode(kVK_Control), .maskControl),
        "control": (CGKeyCode(kVK_Control), .maskControl),
        "control_l": (CGKeyCode(kVK_Control), .maskControl),
        "control_r": (CGKeyCode(kVK_RightControl), .maskControl),
        "alt": (CGKeyCode(kVK_Option), .maskAlternate),
        "alt_l": (CGKeyCode(kVK_Option), .maskAlternate),
        "alt_r": (CGKeyCode(kVK_RightOption), .maskAlternate),
        "option": (CGKeyCode(kVK_Option), .maskAlternate),
        "shift": (CGKeyCode(kVK_Shift), .maskShift),
        "shift_l": (CGKeyCode(kVK_Shift), .maskShift),
        "shift_r": (CGKeyCode(kVK_RightShift), .maskShift),
    ]

    private static let shiftedKeys: [String: String] = [
        "asciitilde": "grave", "exclam": "1", "at": "2", "numbersign": "3",
        "dollar": "4", "percent": "5", "asciicircum": "6", "ampersand": "7",
        "asterisk": "8", "parenleft": "9", "parenright": "0",
        "underscore": "minus", "plus": "equal", "braceleft": "bracketleft",
        "braceright": "bracketright", "bar": "backslash", "colon": "semicolon",
        "quotedbl": "apostrophe", "less": "comma", "greater": "period", "question": "slash",
        "iso_left_tab": "tab",
    ]

    private static let keys: [String: Int] = [
        "a": kVK_ANSI_A, "b": kVK_ANSI_B, "c": kVK_ANSI_C, "d": kVK_ANSI_D,
        "e": kVK_ANSI_E, "f": kVK_ANSI_F, "g": kVK_ANSI_G, "h": kVK_ANSI_H,
        "i": kVK_ANSI_I, "j": kVK_ANSI_J, "k": kVK_ANSI_K, "l": kVK_ANSI_L,
        "m": kVK_ANSI_M, "n": kVK_ANSI_N, "o": kVK_ANSI_O, "p": kVK_ANSI_P,
        "q": kVK_ANSI_Q, "r": kVK_ANSI_R, "s": kVK_ANSI_S, "t": kVK_ANSI_T,
        "u": kVK_ANSI_U, "v": kVK_ANSI_V, "w": kVK_ANSI_W, "x": kVK_ANSI_X,
        "y": kVK_ANSI_Y, "z": kVK_ANSI_Z,
        "0": kVK_ANSI_0, "1": kVK_ANSI_1, "2": kVK_ANSI_2, "3": kVK_ANSI_3,
        "4": kVK_ANSI_4, "5": kVK_ANSI_5, "6": kVK_ANSI_6, "7": kVK_ANSI_7,
        "8": kVK_ANSI_8, "9": kVK_ANSI_9,
        "minus": kVK_ANSI_Minus, "-": kVK_ANSI_Minus, "equal": kVK_ANSI_Equal, "=": kVK_ANSI_Equal,
        "bracketleft": kVK_ANSI_LeftBracket, "[": kVK_ANSI_LeftBracket,
        "bracketright": kVK_ANSI_RightBracket, "]": kVK_ANSI_RightBracket,
        "backslash": kVK_ANSI_Backslash, "\\": kVK_ANSI_Backslash,
        "semicolon": kVK_ANSI_Semicolon, ";": kVK_ANSI_Semicolon,
        "apostrophe": kVK_ANSI_Quote, "'": kVK_ANSI_Quote,
        "comma": kVK_ANSI_Comma, ",": kVK_ANSI_Comma, "period": kVK_ANSI_Period, ".": kVK_ANSI_Period,
        "slash": kVK_ANSI_Slash, "/": kVK_ANSI_Slash, "grave": kVK_ANSI_Grave,
        "return": kVK_Return, "enter": kVK_Return, "kp_enter": kVK_ANSI_KeypadEnter,
        "tab": kVK_Tab, "space": kVK_Space,
        "escape": kVK_Escape, "esc": kVK_Escape,
        "backspace": kVK_Delete, "delete": kVK_ForwardDelete,
        "home": kVK_Home, "end": kVK_End, "insert": kVK_Help,
        "prior": kVK_PageUp, "page_up": kVK_PageUp, "pageup": kVK_PageUp,
        "next": kVK_PageDown, "page_down": kVK_PageDown, "pagedown": kVK_PageDown,
        "up": kVK_UpArrow, "down": kVK_DownArrow, "left": kVK_LeftArrow, "right": kVK_RightArrow,
        "f1": kVK_F1, "f2": kVK_F2, "f3": kVK_F3, "f4": kVK_F4,
        "f5": kVK_F5, "f6": kVK_F6, "f7": kVK_F7, "f8": kVK_F8,
        "f9": kVK_F9, "f10": kVK_F10, "f11": kVK_F11, "f12": kVK_F12,
        "f13": kVK_F13, "f14": kVK_F14, "f15": kVK_F15, "f16": kVK_F16,
        "f17": kVK_F17, "f18": kVK_F18, "f19": kVK_F19, "f20": kVK_F20,
    ]
}
