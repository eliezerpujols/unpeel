// Bundles src/overlay.jsx (Agentation + React + the session picker) into one
// IIFE the Host wraps with its bridge config and hands to agent-browser as a
// page init script. Output is committed so the Rust crate can embed it.
import { build } from "esbuild";
import { existsSync, readdirSync, readFileSync } from "node:fs";

// Agent marks from runtimes/<slug>/assets/icon.svg, recolored to follow the
// panel text color, keyed by slug and its short name (claude-code → claude).
const runtimes = new URL("../../runtimes/", import.meta.url);
const agentIcons = {};
for (const slug of readdirSync(runtimes)) {
  const file = new URL(`${slug}/assets/icon.svg`, runtimes);
  if (!existsSync(file)) continue;
  const svg = readFileSync(file, "utf8")
    .replace(/#fff(fff)?\b/gi, "currentColor")
    .replace(/\s(width|height)="[^"]*"/g, "")
    .replace("<svg", '<svg width="14" height="14"');
  agentIcons[slug] = svg;
  agentIcons[slug.split("-")[0]] ??= svg;
}

await build({
  entryPoints: ["src/overlay.jsx"],
  bundle: true,
  format: "iife",
  minify: true,
  target: ["chrome120"],
  jsx: "automatic",
  define: {
    "process.env.NODE_ENV": '"production"',
    __AGENT_ICONS__: JSON.stringify(agentIcons),
  },
  legalComments: "eof",
  outfile: "../../crates/unpeel-core/assets/browser/agentation-overlay.js",
});
console.log("built crates/unpeel-core/assets/browser/agentation-overlay.js");
