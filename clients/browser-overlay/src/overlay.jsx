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

// MARK: - Session picker
//
// Opens upward from Agentation's toolbar like its own Settings panel: same
// anchor (right-aligned, 8px above), same card, colors, and type. Light DOM
// on purpose — Agentation skips clicks inside [data-feedback-toolbar] (no
// markers behind the panel) and skips its shortcuts while an INPUT is the
// event target, which a shadow root would hide. Styles are scoped and reset.

/* global __AGENT_ICONS__ */
const AGENT_ICONS = typeof __AGENT_ICONS__ === "object" ? __AGENT_ICONS__ : {};
const TERMINAL_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>';
const SEARCH_ICON = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>';

const PICKER_CSS = `
[data-unpeel-send], [data-unpeel-send] *:not(svg):not(svg *) { all: revert; box-sizing: border-box; }
[data-unpeel-send] svg { display: block; overflow: visible; }
[data-unpeel-send] { position: fixed; z-index: 2147483647; width: 300px;
  background: #1a1a1a; color: #fff; border-radius: 1rem; padding: 13px 0 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.08);
  font: 13px/1.35 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased; cursor: default; user-select: none;
  transform-origin: bottom right; animation: unpeel-send-in .22s cubic-bezier(.19,1,.22,1); }
[data-unpeel-send].below { transform-origin: top right; }
@keyframes unpeel-send-in { from { opacity: 0; transform: scale(.94) translateY(6px); } }
[data-unpeel-send] .us-head { display: flex; align-items: center; justify-content: space-between;
  min-height: 24px; margin: 0 16px 8px; padding-bottom: 9px; border-bottom: 1px solid rgba(255,255,255,.07); }
[data-unpeel-send] .us-title { font-size: .8125rem; font-weight: 600; letter-spacing: -.0094em; }
[data-unpeel-send] .us-hint { font-size: 11px; color: rgba(255,255,255,.45); }
[data-unpeel-send] .us-search { display: flex; align-items: center; gap: 7px; margin: 0 10px 6px;
  padding: 0 10px; height: 30px; border-radius: 8px; background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.45); }
[data-unpeel-send] .us-search input { all: unset; flex: 1; min-width: 0; font: inherit;
  color: #fff; caret-color: #fff; }
[data-unpeel-send] .us-search input::placeholder { color: rgba(255,255,255,.4); }
[data-unpeel-send] .us-list { max-height: 300px; overflow-y: auto; padding: 0 6px; scrollbar-width: thin; }
[data-unpeel-send] .us-section { padding: 8px 10px 4px; font-size: 11px; font-weight: 500;
  color: rgba(255,255,255,.4); }
[data-unpeel-send] .us-row { display: flex; align-items: center; gap: 9px; padding: 6px 10px;
  border-radius: 8px; cursor: pointer; }
[data-unpeel-send] .us-row.active { background: rgba(255,255,255,.08); }
[data-unpeel-send] .us-icon { flex: none; width: 24px; height: 24px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.08); color: rgba(255,255,255,.85); }
[data-unpeel-send] .us-icon svg { display: block; }
[data-unpeel-send] .us-text { min-width: 0; flex: 1; }
[data-unpeel-send] .us-name { font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
[data-unpeel-send] .us-meta { font-size: 11.5px; color: rgba(255,255,255,.5); white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis; }
[data-unpeel-send] .us-empty { padding: 18px 16px; text-align: center; color: rgba(255,255,255,.5); }
[data-unpeel-send] .us-foot { margin: 6px 16px 0; padding-top: 8px; border-top: 1px solid rgba(255,255,255,.07);
  font-size: 11px; color: rgba(255,255,255,.4); }
[data-unpeel-send].light { background: #fff; color: rgba(0,0,0,.85);
  box-shadow: 0 2px 8px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06), 0 0 0 1px rgba(0,0,0,.04); }
[data-unpeel-send].light .us-head, [data-unpeel-send].light .us-foot { border-color: rgba(0,0,0,.07); }
[data-unpeel-send].light .us-hint, [data-unpeel-send].light .us-section,
[data-unpeel-send].light .us-foot, [data-unpeel-send].light .us-meta { color: rgba(0,0,0,.45); }
[data-unpeel-send].light .us-search { background: rgba(0,0,0,.05); color: rgba(0,0,0,.4); }
[data-unpeel-send].light .us-search input { color: rgba(0,0,0,.85); caret-color: rgba(0,0,0,.85); }
[data-unpeel-send].light .us-search input::placeholder { color: rgba(0,0,0,.35); }
[data-unpeel-send].light .us-row.active { background: rgba(0,0,0,.05); }
[data-unpeel-send].light .us-icon { background: rgba(0,0,0,.06); color: rgba(0,0,0,.75); }
`;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function icon(svg) {
  const span = el("span", "us-icon");
  span.innerHTML = svg; // build-time constants only, never page or session data
  return span;
}

function ensureStyle() {
  if (document.getElementById("unpeel-send-style")) return;
  const style = el("style");
  style.id = "unpeel-send-style";
  style.textContent = PICKER_CSS;
  (document.head || document.documentElement).appendChild(style);
}

/** Agentation's toolbar pill, to anchor the panel on. */
function toolbarRect() {
  const bar = document.querySelector('[data-feedback-toolbar] [class*="toolbarContainer"]')
    || document.querySelector("[data-feedback-toolbar]");
  return bar ? { rect: bar.getBoundingClientRect(), bar } : null;
}

function isLightToolbar(bar) {
  const match = getComputedStyle(bar).backgroundColor.match(/\d+/g);
  return !!match && Number(match[0]) > 200;
}

let openPanel = null;

/** Resolves with the chosen session, or rejects when dismissed. */
function pickSession(sessions) {
  openPanel?.cancel();
  return new Promise((resolve, reject) => {
    ensureStyle();
    const panel = el("div");
    panel.setAttribute("data-unpeel-send", "");
    panel.setAttribute("data-feedback-toolbar", "");
    const head = el("div", "us-head");
    head.append(el("span", "us-title", "Send to session"), el("span", "us-hint", "Sends right away"));
    const searchBox = el("label", "us-search");
    const searchIcon = el("span");
    searchIcon.innerHTML = SEARCH_ICON;
    const search = el("input");
    search.placeholder = "Search open sessions";
    search.spellcheck = false;
    searchBox.append(searchIcon, search);
    const list = el("div", "us-list");
    const foot = el("div", "us-foot", "↑↓ move · ↵ send · esc close");
    panel.append(head, searchBox, list, foot);

    const anchor = toolbarRect();
    if (anchor) {
      const { rect, bar } = anchor;
      if (isLightToolbar(bar)) panel.classList.add("light");
      panel.style.right = `${Math.max(8, window.innerWidth - rect.right)}px`;
      if (rect.top > 380) {
        panel.style.bottom = `${window.innerHeight - rect.top + 8}px`;
      } else {
        panel.classList.add("below");
        panel.style.top = `${rect.bottom + 8}px`;
      }
    } else {
      panel.style.right = "20px";
      panel.style.bottom = "80px";
    }

    let visible = [];
    let active = 0;
    const onOutside = (event) => { if (!panel.contains(event.target)) cancel(); };
    const close = () => {
      panel.remove();
      document.removeEventListener("mousedown", onOutside, true);
      openPanel = null;
    };
    const choose = (session) => { close(); resolve(session); };
    const cancel = () => { close(); reject(new Error("cancelled")); };
    openPanel = { cancel };

    function row(session, index) {
      const node = el("div", "us-row" + (index === active ? " active" : ""));
      node.appendChild(icon(AGENT_ICONS[session.agent] || TERMINAL_ICON));
      const text = el("div", "us-text");
      text.append(
        el("div", "us-name", session.title),
        el("div", "us-meta", [session.project, session.workspace].filter(Boolean).join(" · "))
      );
      node.appendChild(text);
      node.title = session.agent ? `${session.agent} — ${session.title}` : session.title;
      node.addEventListener("mouseenter", () => { active = index; mark(); });
      node.addEventListener("click", (event) => { event.stopPropagation(); choose(session); });
      return node;
    }

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
        list.appendChild(el("div", "us-empty", sessions.length ? "No matching sessions" : "No open sessions"));
        return;
      }
      if (here.length) {
        list.appendChild(el("div", "us-section", bridge?.projectName || "This project"));
        here.forEach((s, i) => list.appendChild(row(s, i)));
      }
      if (others.length) {
        list.appendChild(el("div", "us-section", here.length ? "Other sessions" : "Open sessions"));
        others.forEach((s, i) => list.appendChild(row(s, here.length + i)));
      }
    }
    function mark() {
      const rows = list.querySelectorAll(".us-row");
      rows.forEach((node, i) => node.classList.toggle("active", i === active));
      rows[active]?.scrollIntoView({ block: "nearest" });
    }

    search.addEventListener("input", () => { active = 0; render(); });
    panel.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Escape") cancel();
      else if (event.key === "ArrowDown") { active = Math.min(active + 1, visible.length - 1); mark(); event.preventDefault(); }
      else if (event.key === "ArrowUp") { active = Math.max(active - 1, 0); mark(); event.preventDefault(); }
      else if (event.key === "Enter" && visible[active]) { choose(visible[active]); event.preventDefault(); }
    });
    // Don't let a click inside reach the page (or Agentation) at all.
    for (const type of ["mousedown", "mouseup", "click", "pointerdown", "pointerup"]) {
      panel.addEventListener(type, (event) => event.stopPropagation());
    }
    document.documentElement.appendChild(panel);
    setTimeout(() => document.addEventListener("mousedown", onOutside, true), 0);
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
