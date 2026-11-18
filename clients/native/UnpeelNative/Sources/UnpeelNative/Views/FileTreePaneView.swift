//
//  FileTreePaneView.swift
//  UnpeelNative
//
//  Native file tree shown in a pane (picker ▸ Files). It browses ONE of the
//  project's folders: the primary by default, switchable from the folder
//  dropdown at the top. Folders expand in place (lazy, one level per open);
//  every row carries an icon. Activating a file is intentionally a no-op for
//  now — rows only select.
//

import AppKit
import SwiftUI

/// The registry mark of the Files App (`protocol/app-registry.json`,
/// `unpeel.app.filetree`), reused so the native pane reads as "Files".
enum FilesAppMark {
    static let svg = ##"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="#FFFFFF"><path d="M160,136v-8H88v64a8,8,0,0,0,8,8h64v-8a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16v32a16,16,0,0,1-16,16H176a16,16,0,0,1-16-16v-8H96a24,24,0,0,1-24-24V80H64A16,16,0,0,1,48,64V32A16,16,0,0,1,64,16H96a16,16,0,0,1,16,16V64A16,16,0,0,1,96,80H88v32h72v-8a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16v32a16,16,0,0,1-16,16H176A16,16,0,0,1,160,136Z"/></svg>"##

    @MainActor private static var cached: NSImage?

    @MainActor
    static var image: NSImage? {
        if let cached { return cached }
        guard let image = NSImage(data: Data(svg.utf8)) else { return nil }
        image.isTemplate = true
        image.size = NSSize(width: 16, height: 16)
        cached = image
        return image
    }
}

struct FilesAppMarkView: View {
    var size: CGFloat = 16

    var body: some View {
        if let image = FilesAppMark.image {
            Image(nsImage: image)
                .resizable()
                .renderingMode(.template)
                .aspectRatio(contentMode: .fit)
                .frame(width: size, height: size)
        } else {
            Image(systemName: "folder")
                .font(.system(size: size * 0.85))
                .frame(width: size, height: size)
        }
    }
}

struct FileTreeEntry: Identifiable, Equatable {
    let path: String
    let name: String
    let isDirectory: Bool

    var id: String { path }
    var isHidden: Bool { name.hasPrefix(".") }
}

enum FileTreeListing {
    /// Never shown: VCS internals and Finder litter.
    static let skipped: Set<String> = [".git", ".DS_Store"]

    /// One directory level, folders first, then Finder-style name order.
    static func children(of directory: String) -> [FileTreeEntry]? {
        let url = URL(fileURLWithPath: directory, isDirectory: true)
        guard let urls = try? FileManager.default.contentsOfDirectory(
            at: url,
            includingPropertiesForKeys: [.isDirectoryKey],
            options: []
        ) else { return nil }
        return urls
            .filter { !skipped.contains($0.lastPathComponent) }
            .map { url in
                let isDirectory = (try? url.resourceValues(forKeys: [.isDirectoryKey]))?
                    .isDirectory ?? false
                return FileTreeEntry(
                    path: url.path,
                    name: url.lastPathComponent,
                    isDirectory: isDirectory
                )
            }
            .sorted { lhs, rhs in
                if lhs.isDirectory != rhs.isDirectory { return lhs.isDirectory }
                return lhs.name.localizedStandardCompare(rhs.name) == .orderedAscending
            }
    }

    /// SF Symbol per row: folders open/closed, files by kind.
    static func symbol(for entry: FileTreeEntry, expanded: Bool) -> String {
        if entry.isDirectory { return expanded ? "folder.fill" : "folder" }
        let lower = entry.name.lowercased()
        if lower == "dockerfile" { return "shippingbox" }
        if lower.hasPrefix(".env") { return "key" }
        if lower == "license" || lower.hasPrefix("license.") { return "checkmark.seal" }
        switch (lower as NSString).pathExtension {
        case "swift": return "swift"
        case "js", "jsx", "ts", "tsx", "mjs", "cjs", "vue", "svelte": return "curlybraces"
        case "json", "jsonc": return "curlybraces.square"
        case "rs", "go", "py", "rb", "java", "kt", "c", "h", "cc", "cpp", "hpp", "m", "mm", "cs", "php", "zig":
            return "chevron.left.forwardslash.chevron.right"
        case "md", "mdx", "markdown", "txt", "rtf": return "doc.plaintext"
        case "html", "htm": return "globe"
        case "css", "scss", "sass", "less": return "paintbrush"
        case "png", "jpg", "jpeg", "gif", "webp", "svg", "ico", "heic", "icns", "bmp", "tiff": return "photo"
        case "mp4", "mov", "m4v", "webm", "avi": return "film"
        case "mp3", "wav", "m4a", "aac", "flac", "ogg": return "waveform"
        case "sh", "zsh", "bash", "fish", "command": return "terminal"
        case "yml", "yaml", "toml", "ini", "conf", "cfg", "plist", "xcconfig": return "gearshape"
        case "lock", "lockb": return "lock"
        case "zip", "tar", "gz", "tgz", "bz2", "xz", "7z", "rar", "dmg": return "archivebox"
        case "pdf": return "doc.richtext"
        case "csv", "tsv", "xls", "xlsx", "numbers": return "tablecells"
        case "sql", "db", "sqlite", "sqlite3": return "cylinder"
        case "ttf", "otf", "woff", "woff2": return "textformat"
        default: return "doc"
        }
    }
}

struct FileTreePaneView: View {
    @ObservedObject var store: UnpeelStore
    let projectID: String
    /// nil = the project's primary folder.
    let folderPath: String?
    /// Bumped by the pane header's More ▸ Refresh.
    var refreshCount = 0
    let onChooseFolder: (String?) -> Void

    @State private var expanded: Set<String> = []
    @State private var childrenByPath: [String: [FileTreeEntry]] = [:]
    @State private var unreadable: Set<String> = []
    @State private var selectedPath: String?
    @State private var hoveredPath: String?
    /// Folder path → current git branch (multi-folder projects only; nil
    /// entry = resolved, not a git checkout / detached).
    @State private var branchesByFolder: [String: String?] = [:]

    private var folders: [ProjectFolder] {
        store.effectiveProjectFolders(projectID)
    }

    /// The folder on screen. A stale choice (folder removed from the
    /// project) falls back to the primary.
    private var currentFolder: ProjectFolder? {
        if let folderPath, let match = folders.first(where: { $0.path == folderPath }) {
            return match
        }
        return folders.first
    }

    private var rootPath: String? { currentFolder?.path }

    var body: some View {
        VStack(spacing: 0) {
            toolbar
            Rectangle()
                .fill(Theme.foreground.opacity(0.07))
                .frame(height: 1)
            if let rootPath {
                tree(rootPath: rootPath)
            } else {
                placeholder("This project has no folder")
            }
        }
        .onAppear {
            if let rootPath { load(rootPath) }
            resolveBranches()
        }
        .onChange(of: folders.map(\.path)) { _ in resolveBranches() }
        .onChange(of: refreshCount) { _ in reload() }
        .onChange(of: rootPath) { newRoot in
            expanded = []
            childrenByPath = [:]
            unreadable = []
            selectedPath = nil
            if let newRoot { load(newRoot) }
        }
    }

    // MARK: Toolbar

    private var toolbar: some View {
        HStack(spacing: 6) {
            if folders.count > 1 {
                Menu {
                    ForEach(Array(folders.enumerated()), id: \.element.path) { index, folder in
                        Button {
                            onChooseFolder(index == 0 ? nil : folder.path)
                        } label: {
                            if folder.path == rootPath {
                                Label(menuTitle(folder, index: index), systemImage: "checkmark")
                            } else {
                                Text(menuTitle(folder, index: index))
                            }
                            if let branch = branch(of: folder) {
                                Text(branch)
                            }
                        }
                    }
                } label: {
                    folderLabel(showsChevron: true)
                }
                .menuStyle(.borderlessButton)
                .menuIndicator(.hidden)
                .fixedSize()
                .help("Choose which of the project's folders to browse")
            } else {
                folderLabel(showsChevron: false)
            }
            Spacer(minLength: 4)
        }
        .padding(.horizontal, 8)
        .frame(height: 30)
    }

    private func menuTitle(_ folder: ProjectFolder, index: Int) -> String {
        index == 0 ? "\(folder.displayName) (primary)" : folder.displayName
    }

    /// A folder's branch, shown only for multi-folder projects (a single
    /// folder's branch is already in the titlebar).
    private func branch(of folder: ProjectFolder) -> String? {
        guard folders.count > 1 else { return nil }
        return branchesByFolder[folder.path] ?? nil
    }

    private func folderLabel(showsChevron: Bool) -> some View {
        HStack(spacing: 5) {
            ProjectFolderIconView(icon: currentFolder?.parsedIcon, size: 10.5)
                .foregroundStyle(Theme.mutedForeground)
            Text(currentFolder?.displayName ?? "")
                .font(.system(size: 12, weight: .semibold))
                .foregroundStyle(Theme.foreground)
                .lineLimit(1)
                .truncationMode(.middle)
            // Same compact suffix as the titlebar branch.
            if let currentFolder, let branch = branch(of: currentFolder) {
                HStack(spacing: 3) {
                    ChromeIconView(icon: .gitBranch, size: 11)
                    Text(branch)
                        .font(.system(size: 11, weight: .medium))
                        .lineLimit(1)
                        .truncationMode(.middle)
                }
                .foregroundStyle(Theme.mutedForeground)
                .opacity(0.55)
            }
            if showsChevron {
                Image(systemName: "chevron.down")
                    .font(.system(size: 9, weight: .semibold))
                    .foregroundStyle(Theme.mutedForeground)
            }
        }
        .padding(.horizontal, 6)
        .frame(height: 24)
        .contentShape(Rectangle())
    }

    // MARK: Tree

    private struct VisibleRow: Identifiable {
        let entry: FileTreeEntry
        let depth: Int
        var id: String { entry.path }
    }

    private func visibleRows(under root: String) -> [VisibleRow] {
        var rows: [VisibleRow] = []
        func walk(_ directory: String, depth: Int) {
            for entry in childrenByPath[directory] ?? [] {
                rows.append(VisibleRow(entry: entry, depth: depth))
                if entry.isDirectory, expanded.contains(entry.path) {
                    walk(entry.path, depth: depth + 1)
                }
            }
        }
        walk(root, depth: 0)
        return rows
    }

    @ViewBuilder
    private func tree(rootPath: String) -> some View {
        if unreadable.contains(rootPath) {
            placeholder("Can’t read this folder")
        } else if let top = childrenByPath[rootPath], top.isEmpty {
            placeholder("This folder is empty")
        } else {
            ScrollView {
                LazyVStack(spacing: 0) {
                    ForEach(visibleRows(under: rootPath)) { row in
                        rowView(row)
                    }
                }
                .padding(.horizontal, 6)
                .padding(.vertical, 6)
            }
        }
    }

    private func rowView(_ row: VisibleRow) -> some View {
        let entry = row.entry
        let isOpen = entry.isDirectory && expanded.contains(entry.path)
        let isSelected = selectedPath == entry.path
        let isHovered = hoveredPath == entry.path
        return HStack(spacing: 5) {
            Group {
                if entry.isDirectory {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 8, weight: .bold))
                        .rotationEffect(.degrees(isOpen ? 90 : 0))
                        .foregroundStyle(Theme.mutedForeground.opacity(0.8))
                } else {
                    Color.clear
                }
            }
            .frame(width: 10)
            Image(systemName: FileTreeListing.symbol(for: entry, expanded: isOpen))
                .font(.system(size: 11))
                .foregroundStyle(entry.isDirectory ? Theme.foreground.opacity(0.75) : Theme.mutedForeground)
                .frame(width: 16)
            Text(entry.name)
                .font(.system(size: 12))
                .foregroundStyle(isSelected ? Theme.foreground : Theme.foreground.opacity(0.85))
                .lineLimit(1)
                .truncationMode(.middle)
            Spacer(minLength: 0)
        }
        .opacity(entry.isHidden ? 0.55 : 1)
        .padding(.leading, CGFloat(row.depth) * 14 + 4)
        .padding(.trailing, 6)
        .frame(height: 24)
        .background(
            RoundedRectangle(cornerRadius: 5, style: .continuous)
                .fill(Theme.foreground.opacity(isSelected ? 0.1 : (isHovered ? 0.05 : 0)))
        )
        .contentShape(Rectangle())
        .onHover { hovering in
            if hovering { hoveredPath = entry.path }
            else if hoveredPath == entry.path { hoveredPath = nil }
        }
        .onTapGesture {
            selectedPath = entry.path
            if entry.isDirectory { toggle(entry.path) }
            // Files: selection only for now.
        }
        .help(entry.path)
        .contextMenu {
            Button("Reveal in Finder") {
                NSWorkspace.shared.activateFileViewerSelecting([URL(fileURLWithPath: entry.path)])
            }
            Button("Copy Path") {
                NSPasteboard.general.clearContents()
                NSPasteboard.general.setString(entry.path, forType: .string)
            }
        }
    }

    private func placeholder(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 12))
            .foregroundStyle(Theme.mutedForeground)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    // MARK: Loading

    private func toggle(_ path: String) {
        if expanded.contains(path) {
            expanded.remove(path)
        } else {
            load(path)
            expanded.insert(path)
        }
    }

    private func load(_ directory: String) {
        if let entries = FileTreeListing.children(of: directory) {
            childrenByPath[directory] = entries
            unreadable.remove(directory)
        } else {
            childrenByPath[directory] = []
            unreadable.insert(directory)
        }
    }

    /// Each folder's current branch, read off the main thread (git runs
    /// once per folder per appear / refresh / folder-list change).
    private func resolveBranches() {
        let paths = folders.map(\.path)
        guard paths.count > 1 else {
            branchesByFolder = [:]
            return
        }
        DispatchQueue.global(qos: .userInitiated).async {
            var resolved: [String: String?] = [:]
            for path in paths {
                resolved[path] = UnpeelStore.isGitRepo(path: path)
                    ? WorktreeGit.currentBranch(repoPath: path)
                    : nil
            }
            DispatchQueue.main.async { branchesByFolder = resolved }
        }
    }

    /// Re-read the root and every open folder; folders that vanished close.
    private func reload() {
        resolveBranches()
        guard let rootPath else { return }
        childrenByPath = [:]
        load(rootPath)
        for path in expanded.sorted(by: { $0.count < $1.count }) {
            if FileManager.default.fileExists(atPath: path) {
                load(path)
            } else {
                expanded.remove(path)
            }
        }
    }
}
