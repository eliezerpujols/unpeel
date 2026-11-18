// Bundles src/overlay.jsx (Agentation + React + the session picker) into one
// IIFE the Host wraps with its bridge config and hands to agent-browser as a
// page init script. Output is committed so the Rust crate can embed it.
import { build } from "esbuild";

await build({
  entryPoints: ["src/overlay.jsx"],
  bundle: true,
  format: "iife",
  minify: true,
  target: ["chrome120"],
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  legalComments: "eof",
  outfile: "../../crates/unpeel-core/assets/browser/agentation-overlay.js",
});
console.log("built crates/unpeel-core/assets/browser/agentation-overlay.js");
