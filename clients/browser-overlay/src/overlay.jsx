// Runs as an agent-browser init script in every top-level page of the Unpeel
// project browser. The Host wraps this bundle in a function that defines
// `UNPEEL_BRIDGE` ({ port, token, projectId, projectName }) as a local — it
// is never put on `window`, so page scripts cannot read the token.
/* global UNPEEL_BRIDGE */
import { createRoot } from "react-dom/client";
import { Agentation } from "agentation";

const bridge = typeof UNPEEL_BRIDGE === "object" && UNPEEL_BRIDGE ? UNPEEL_BRIDGE : null;
// Captured before any page script runs, so a page can't intercept sends.
const nativeFetch = window.fetch.bind(window);
const base = bridge ? `http://127.0.0.1:${bridge.port}/browser-bridge` : null;

async function bridgeCall(path, payload) {
  // text/plain keeps this a "simple" request (no CORS preflight); the token
  // rides in the body, never in a header or the page.
  const response = await nativeFetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ token: bridge.token, ...payload }),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json.error || `Unpeel answered ${response.status}`);
  return json;
}

// MARK: - Session picker (closed shadow root: page CSS/JS can't reach it)

const PICKER_CSS = `
:host { all: initial; }
.backdrop { position: fixed; inset: 0; z-index: 2147483647; background: rgba(0,0,0,.28);
  display: flex; align-items: center; justify-content: center;
  font: 13px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; }
.panel { width: min(440px, calc(100vw - 32px)); max-height: min(520px, calc(100vh - 64px));
  display: flex; flex-direction: column; background: #1c1c1e; color: #f2f2f7;
  border: 1px solid rgba(255,255,255,.1); border-radius: 14px;
  box-shadow: 0 24px 64px rgba(0,0,0,.45); overflow: hidden; }
@media (prefers-color-scheme: light) {
  .panel { background: #fff; color: #1c1c1e; border-color: rgba(0,0,0,.1); }
  .row:hover, .row.active { background: rgba(0,0,0,.06) !important; }
  .search { background: rgba(0,0,0,.05) !important; }
}
.head { padding: 14px 16px 10px; font-weight: 600; font-size: 14px; }
.sub { font-weight: 400; opacity: .6; font-size: 12px; margin-top: 2px; }
.search { margin: 0 12px 8px; padding: 8px 10px; border-radius: 8px; border: 0; outline: none;
  background: rgba(255,255,255,.07); color: inherit; font: inherit; }
.list { overflow-y: auto; padding: 4px 6px 8px; }
.section { padding: 8px 10px 4px; font-size: 11px; font-weight: 600; opacity: .5;
  text-transform: uppercase; letter-spacing: .04em; }
.row { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 8px;
  cursor: pointer; }
.row:hover, .row.active { background: rgba(255,255,255,.08); }
.title { font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.meta { font-size: 11.5px; opacity: .55; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.empty { padding: 24px 16px; text-align: center; opacity: .6; }
.foot { padding: 8px 16px 12px; font-size: 11.5px; opacity: .5; }
`;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

/** Resolves with the chosen session, or rejects when dismissed. */
function pickSession(sessions) {
  return new Promise((resolve, reject) => {
    const host = document.createElement("unpeel-session-picker");
    const root = host.attachShadow({ mode: "closed" });
    const style = el("style");
    style.textContent = PICKER_CSS;
    const backdrop = el("div", "backdrop");
    const panel = el("div", "panel");
    const head = el("div", "head", "Send to session");
    head.appendChild(el("div", "sub", "Pasted into the session's prompt — press Enter there to send."));
    const search = el("input", "search");
    search.placeholder = "Search open sessions";
    const list = el("div", "list");
    const foot = el("div", "foot", "↑↓ to move · Enter to paste · Esc to cancel");
    panel.append(head, search, list, foot);
    backdrop.appendChild(panel);
    root.append(style, backdrop);

    let visible = [];
    let active = 0;
    const close = () => host.remove();
    const choose = (session) => { close(); resolve(session); };
    const cancel = () => { close(); reject(new Error("cancelled")); };

    function render() {
      const q = search.value.trim().toLowerCase();
      const match = (s) => !q || [s.title, s.project, s.workspace, s.agent]
        .some((v) => v && v.toLowerCase().includes(q));
      const here = sessions.filter((s) => s.inThisProject && match(s));
      const others = sessions.filter((s) => !s.inThisProject && match(s));
      visible = [...here, ...others];
      active = Math.min(active, Math.max(visible.length - 1, 0));
      list.replaceChildren();
      if (!visible.length) {
        list.appendChild(el("div", "empty", sessions.length ? "No matching sessions" : "No open sessions"));
        return;
      }
      const section = (label, items, offset) => {
        if (!items.length) return;
        list.appendChild(el("div", "section", label));
        items.forEach((s, i) => {
          const row = el("div", "row" + (offset + i === active ? " active" : ""));
          row.appendChild(el("div", "title", s.title));
          row.appendChild(el("div", "meta",
            [s.agent, s.project, s.workspace].filter(Boolean).join(" · ")));
          row.addEventListener("mouseenter", () => { active = offset + i; mark(); });
          row.addEventListener("click", () => choose(s));
          list.appendChild(row);
        });
      };
      section(bridge?.projectName ? `In ${bridge.projectName}` : "This project", here, 0);
      section(here.length ? "Other sessions" : "Open sessions", others, here.length);
    }
    function mark() {
      list.querySelectorAll(".row").forEach((row, i) => row.classList.toggle("active", i === active));
      list.querySelectorAll(".row")[active]?.scrollIntoView({ block: "nearest" });
    }

    search.addEventListener("input", () => { active = 0; render(); });
    root.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Escape") cancel();
      else if (event.key === "ArrowDown") { active = Math.min(active + 1, visible.length - 1); mark(); event.preventDefault(); }
      else if (event.key === "ArrowUp") { active = Math.max(active - 1, 0); mark(); event.preventDefault(); }
      else if (event.key === "Enter" && visible[active]) { choose(visible[active]); event.preventDefault(); }
    });
    backdrop.addEventListener("mousedown", (event) => { if (event.target === backdrop) cancel(); });
    document.documentElement.appendChild(host);
    render();
    search.focus();
  });
}

async function sendToSession(output) {
  if (!bridge) throw new Error("Unpeel bridge unavailable");
  const { sessions = [] } = await bridgeCall("/sessions", { projectId: bridge.projectId });
  const session = await pickSession(sessions);
  await bridgeCall("/send", { sessionId: session.id, home: session.home, text: output });
}

// MARK: - Mount (top-level documents only, once)

function mount() {
  if (window.top !== window || window.__unpeelAgentationMounted) return;
  window.__unpeelAgentationMounted = true;
  const container = document.createElement("div");
  container.setAttribute("data-unpeel-agentation", "");
  document.documentElement.appendChild(container);
  createRoot(container).render(
    <Agentation onSubmit={(output) => sendToSession(output)} />
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
  mount();
}
