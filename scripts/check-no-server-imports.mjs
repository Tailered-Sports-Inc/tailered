#!/usr/bin/env node
// Fail if any src/** file imports the private engine (server, drizzle schema)
// or escapes the repo. Public shell talks to the API only via the tRPC client
// pointed at VITE_API_BASE_URL. Exit non-zero on any violation.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
// import/from specifiers that mean "reaching into the private engine"
const BANNED = [
  /['"](?:\.\.\/)+server(?:\/|['"])/, // relative into a sibling server/
  /['"]@?server\//,
  /['"](?:\.\.\/)+drizzle(?:\/|['"])/,
  /['"]@shared\/schema/,
  /['"]drizzle-orm/,
  /['"]mysql2/,
];
const EXT = /\.(ts|tsx|js|jsx|mjs)$/;

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : EXT.test(p) ? [p] : [];
  });
}

const violations = [];
for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");
  text.split("\n").forEach((line, i) => {
    if (!/\b(import|from|require)\b/.test(line)) return;
    for (const re of BANNED) {
      if (re.test(line)) violations.push(`${file}:${i + 1}  ${line.trim()}`);
    }
  });
}

if (violations.length) {
  console.error(`✗ ${violations.length} forbidden private-engine import(s):`);
  violations.forEach((v) => console.error("  " + v));
  process.exit(1);
}
console.log("✓ no server/schema imports in src/");
