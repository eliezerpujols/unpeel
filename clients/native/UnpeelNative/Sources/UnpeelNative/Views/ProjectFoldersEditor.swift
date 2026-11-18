import AppKit
import SwiftUI

// Multi-folder projects (`project.folders`): the New Project / Edit Folders
// dialog, the folder icon, and the project row's right-click ▸ Folders menu.
// Folders are not sidebar rows; sessions and groups stay project-wide, and a
// session starts in the folder picked here (primary by default).

/// What a project row's Folders menu can ask the store to do.
enum ProjectFolderAction {
    case launch(Preset, folderPath: String)
    case rename(path: String)
    case setIcon(path: String, ProjectFolderIcon?)
    case chooseEmoji(path: String)
    case makePrimary(path: String)
    case remove(path: String)
    case reveal(path: String)
    case add
    case edit
    case setAgentAccess(Bool)
}

/// A folder's icon at a given size: its emoji, its glyph, or the plain
/// folder symbol.
struct ProjectFolderIconView: View {
    let icon: ProjectFolderIcon?
    var size: CGFloat = 14

    var body: some View {
        switch icon {
        case .emoji(let text):
            Text(text)
                .font(.system(size: size))
                .frame(width: size + 4, height: size + 4)
        case .glyph(let glyph):
            Image(systemName: glyph.systemImage)
                .font(.system(size: size * 0.9))
                .frame(width: size + 4, height: size + 4)
        case nil:
            Image(systemName: "folder")
                .font(.system(size: size * 0.9))
                .frame(width: size + 4, height: size + 4)
        }
    }
}

/// Menu label image for an NSMenu-backed SwiftUI context menu: menus render
/// `Image` reliably but not arbitrary views, so emoji become text labels.
private func folderMenuLabel(_ folder: ProjectFolder, isPrimary: Bool) -> some View {
    let title = isPrimary ? "\(folder.displayName) (primary)" : folder.displayName
    return Group {
        switch folder.parsedIcon {
        case .emoji(let text):
            Text("\(text)  \(title)")
        case .glyph(let glyph):
            Label(title, systemImage: glyph.systemImage)
        case nil:
            Label(title, systemImage: "folder")
        }
    }
}

/// Icon submenu shared by the context menu and the dialog's per-row menu.
struct ProjectFolderIconMenu: View {
    let current: ProjectFolderIcon?
    let onSet: (ProjectFolderIcon?) -> Void
    let onChooseEmoji: () -> Void

    var body: some View {
        Button("Emoji…") { onChooseEmoji() }
        Divider()
        ForEach(ProjectFolderGlyph.allCases, id: \.self) { glyph in
            Button {
                onSet(.glyph(glyph))
            } label: {
                Label(
                    current == .glyph(glyph) ? "\(glyph.title) ✓" : glyph.title,
                    systemImage: glyph.systemImage
                )
            }
        }
        if current != nil {
            Divider()
            Button("Remove icon") { onSet(nil) }
        }
    }
}

/// Right-click ▸ Folders on a project row (also on its groups, which share
/// the parent's folders). Each folder opens a submenu: start a session
/// there, rename, icon, make primary, reveal, remove.
struct ProjectFoldersMenu: View {
    let folders: [ProjectFolder]
    let presets: [Preset]
    let canEdit: Bool
    let showsFilesystemVerbs: Bool
    /// Agents get every folder as a workspace dir (runtime flags at launch).
    var agentAccess = false
    let onAction: (ProjectFolderAction) -> Void

    var body: some View {
        Menu("Folders") {
            ForEach(Array(folders.enumerated()), id: \.element.path) { index, folder in
                Menu {
                    Menu("New session here") {
                        Button("Terminal") { onAction(.launch(.newTerminal, folderPath: folder.path)) }
                        let agents = presets.filter { !$0.command.isEmpty }
                        if !agents.isEmpty {
                            Divider()
                            ForEach(agents) { preset in
                                Button(preset.label) {
                                    onAction(.launch(preset, folderPath: folder.path))
                                }
                            }
                        }
                    }
                    if canEdit {
                        Divider()
                        Button("Rename…") { onAction(.rename(path: folder.path)) }
                        Menu("Icon") {
                            ProjectFolderIconMenu(
                                current: folder.parsedIcon,
                                onSet: { onAction(.setIcon(path: folder.path, $0)) },
                                onChooseEmoji: { onAction(.chooseEmoji(path: folder.path)) }
                            )
                        }
                        if index > 0 {
                            Button("Make primary") { onAction(.makePrimary(path: folder.path)) }
                        }
                    }
                    if showsFilesystemVerbs {
                        Divider()
                        Button("Reveal in Finder") { onAction(.reveal(path: folder.path)) }
                    }
                    if canEdit, folders.count > 1 {
                        Divider()
                        Button("Remove from project", role: .destructive) {
                            onAction(.remove(path: folder.path))
                        }
                    }
                } label: {
                    folderMenuLabel(folder, isPrimary: index == 0 && folders.count > 1)
                }
            }
            if canEdit {
                Divider()
                Toggle("Give agents access to all folders", isOn: Binding(
                    get: { agentAccess },
                    set: { onAction(.setAgentAccess($0)) }
                ))
                Divider()
                Button("Add folder…") { onAction(.add) }
                Button("Edit folders…") { onAction(.edit) }
            }
        }
    }
}

/// New Project / Edit Folders dialog: pick several folders that together
/// make up one project, name the project, and give each folder an optional
/// name and icon. The first folder is the primary (sessions start there by
/// default).
struct ProjectFoldersEditorSheet: View {
    let request: UnpeelStore.ProjectFoldersEditorRequest
    let onFinish: (_ name: String, _ folders: [ProjectFolder]?, _ agentAccess: Bool) -> Void

    @State private var name: String
    @State private var folders: [ProjectFolder]
    @State private var agentAccess: Bool
    @State private var selection: String?

    init(
        request: UnpeelStore.ProjectFoldersEditorRequest,
        onFinish: @escaping (_ name: String, _ folders: [ProjectFolder]?, _ agentAccess: Bool) -> Void
    ) {
        self.request = request
        self.onFinish = onFinish
        _name = State(initialValue: request.name)
        _folders = State(initialValue: request.folders)
        _agentAccess = State(initialValue: request.agentFolderAccess)
    }

    private var isNew: Bool { request.projectID == nil }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text(isNew ? "New Project" : "Edit Project Folders")
                .font(.title3.weight(.semibold))

            VStack(alignment: .leading, spacing: 6) {
                Text("Name").font(.callout).foregroundStyle(.secondary)
                TextField(
                    folders.first?.folderName ?? "Project name",
                    text: $name
                )
                .textFieldStyle(.roundedBorder)
            }

            VStack(alignment: .leading, spacing: 6) {
                Text("Folders").font(.callout).foregroundStyle(.secondary)
                folderList
                HStack(spacing: 8) {
                    Button {
                        addFolders()
                    } label: {
                        Label("Add Folders…", systemImage: "plus")
                    }
                    Spacer()
                }
            }

            if folders.count > 1 {
                VStack(alignment: .leading, spacing: 3) {
                    Toggle("Give agents access to all folders", isOn: $agentAccess)
                    Text("""
                    Claude Code and Codex start with --add-dir for the other folders, \
                    Gemini with --include-directories. Claude Code is also told about them.
                    """)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
                }
            }

            HStack {
                Spacer()
                Button("Cancel") { onFinish(name, nil, agentAccess) }
                    .keyboardShortcut(.cancelAction)
                Button(isNew ? "Create Project" : "Save") { onFinish(name, folders, agentAccess) }
                    .keyboardShortcut(.defaultAction)
                    .disabled(folders.isEmpty)
            }
        }
        .padding(20)
        .frame(width: 560)
        .onAppear {
            if isNew && folders.isEmpty { addFolders() }
        }
    }

    private var folderList: some View {
        List(selection: $selection) {
            ForEach(Array(folders.enumerated()), id: \.element.path) { index, folder in
                FolderEditorRow(
                    folder: binding(for: folder.path),
                    isPrimary: index == 0,
                    canRemove: true,
                    onMakePrimary: { makePrimary(folder.path) },
                    onRemove: { folders.removeAll { $0.path == folder.path } }
                )
                .tag(folder.path)
            }
            .onMove { from, to in folders.move(fromOffsets: from, toOffset: to) }
        }
        .listStyle(.bordered(alternatesRowBackgrounds: true))
        .frame(minHeight: 160, maxHeight: 280)
        .overlay {
            if folders.isEmpty {
                Text("Add one or more folders")
                    .foregroundStyle(.secondary)
            }
        }
        .onDrop(of: [.fileURL], isTargeted: nil) { providers in
            for provider in providers {
                _ = provider.loadObject(ofClass: URL.self) { url, _ in
                    guard let url else { return }
                    var isDirectory = ObjCBool(false)
                    guard FileManager.default.fileExists(atPath: url.path, isDirectory: &isDirectory),
                          isDirectory.boolValue else { return }
                    Task { @MainActor in append([url]) }
                }
            }
            return true
        }
    }

    private func binding(for path: String) -> Binding<ProjectFolder> {
        Binding(
            get: { folders.first(where: { $0.path == path }) ?? ProjectFolder(path: path) },
            set: { updated in
                if let index = folders.firstIndex(where: { $0.path == path }) {
                    folders[index] = updated
                }
            }
        )
    }

    private func makePrimary(_ path: String) {
        guard let index = folders.firstIndex(where: { $0.path == path }), index > 0 else { return }
        withAnimation(.easeInOut(duration: 0.2)) {
            let folder = folders.remove(at: index)
            folders.insert(folder, at: 0)
        }
    }

    private func addFolders() {
        let panel = NSOpenPanel()
        panel.canChooseDirectories = true
        panel.canChooseFiles = false
        panel.allowsMultipleSelection = true
        panel.title = isNew ? "Choose the project's folders" : "Add folders to project"
        panel.prompt = "Add"
        guard panel.runModal() == .OK else { return }
        append(panel.urls)
    }

    private func append(_ urls: [URL]) {
        for url in urls {
            let path = url.standardizedFileURL.resolvingSymlinksInPath().path
            guard !folders.contains(where: { $0.path == path }), folders.count < 32 else { continue }
            folders.append(ProjectFolder(path: path))
        }
    }
}

private struct FolderEditorRow: View {
    @Binding var folder: ProjectFolder
    let isPrimary: Bool
    let canRemove: Bool
    let onMakePrimary: () -> Void
    let onRemove: () -> Void

    @State private var emojiPrompt = false
    @State private var emojiText = ""

    var body: some View {
        HStack(spacing: 10) {
            Menu {
                ProjectFolderIconMenu(
                    current: folder.parsedIcon,
                    onSet: { folder.icon = $0?.wire },
                    onChooseEmoji: {
                        if case .emoji(let text)? = folder.parsedIcon { emojiText = text }
                        emojiPrompt = true
                    }
                )
            } label: {
                ProjectFolderIconView(icon: folder.parsedIcon, size: 15)
            }
            .menuStyle(.borderlessButton)
            .menuIndicator(.hidden)
            .fixedSize()
            .help("Folder icon")
            .popover(isPresented: $emojiPrompt) {
                HStack {
                    TextField("Emoji", text: $emojiText)
                        .frame(width: 80)
                        .onSubmit(applyEmoji)
                    Button("Set", action: applyEmoji)
                }
                .padding(10)
            }

            VStack(alignment: .leading, spacing: 2) {
                TextField(
                    folder.folderName,
                    text: Binding(
                        get: { folder.name ?? "" },
                        set: { folder.name = $0.isEmpty ? nil : $0 }
                    )
                )
                .textFieldStyle(.plain)
                Text(SessionTitleDefaults.abbreviatedPath(folder.path))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
                    .truncationMode(.middle)
            }

            Spacer(minLength: 6)

            if isPrimary {
                Text("Primary")
                    .font(.caption.weight(.medium))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(Capsule().fill(Color.accentColor.opacity(0.18)))
                    .help("New sessions start in this folder")
            } else {
                Button("Make primary", action: onMakePrimary)
                    .buttonStyle(.bordered)
                    .controlSize(.small)
            }
            if canRemove {
                Button(action: onRemove) {
                    Image(systemName: "minus.circle")
                }
                .buttonStyle(.borderless)
                .help("Remove from project")
            }
        }
        .padding(.vertical, 3)
    }

    private func applyEmoji() {
        let text = emojiText.trimmingCharacters(in: .whitespacesAndNewlines)
        folder.icon = text.isEmpty ? nil : ProjectFolderIcon.emoji(String(text.prefix(1))).wire
        emojiPrompt = false
    }
}

/// "3 folders" badge beside a multi-folder project's name; hover lists them.
struct ProjectFolderCountBadge: View {
    let folders: [ProjectFolder]

    var body: some View {
        HStack(spacing: 2) {
            ForEach(Array(folders.prefix(3).enumerated()), id: \.offset) { _, folder in
                if folder.parsedIcon != nil {
                    ProjectFolderIconView(icon: folder.parsedIcon, size: 9)
                }
            }
            Text("\(folders.count)")
                .font(.system(size: 10, weight: .medium))
        }
        .foregroundStyle(Theme.mutedForeground)
        .padding(.horizontal, 5)
        .padding(.vertical, 1)
        .background(Capsule().fill(Theme.mutedForeground.opacity(0.12)))
        .help(folders.map(\.displayName).joined(separator: " · "))
    }
}

/// Which folder is being renamed inline, and under which sidebar row.
struct ProjectFolderRenameTarget: Equatable {
    /// The project or group row the rename was started from.
    let rowID: String
    /// The top-level project that owns the folder list.
    let rootProjectID: String
    let folder: ProjectFolder
}

/// Transient sidebar row under a project: the folder's icon plus the same
/// inline field session rename uses.
struct ProjectFolderRenameRow: View {
    let folder: ProjectFolder
    let depth: Int
    let onCommit: (String) -> Void
    let onCancel: () -> Void

    var body: some View {
        HStack(spacing: 7) {
            ProjectFolderIconView(icon: folder.parsedIcon, size: 12)
                .foregroundStyle(Theme.mutedForeground)
            SessionRowRenameField(
                initialLabel: folder.displayName,
                onCommit: onCommit,
                onCancel: onCancel
            )
        }
        .padding(.leading, 9 + CGFloat(depth + 1) * 14)
        .padding(.trailing, 9)
        .frame(height: 28)
    }
}
