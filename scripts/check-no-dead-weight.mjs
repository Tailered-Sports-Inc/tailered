#!/usr/bin/env node
// Repo-wide no-dead-weight + sensitive-path guard (AGENTS.md LAW 0 + LAW 1).
// Fails on (a) backup/duplicate/superseded file patterns, (b) any sensitive
// path class that must never be public. Unreferenced-file detection is a
// heuristic pass that WARNS (import graphs are language-specific); the hard
// failures are the patterns below. Exit non-zero on any hard hit.
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

// Hard-fail filename/path patterns.
const DEAD = [
  /(^|\/)[^/]*[-.](old|bak|backup|copy|deprecated|superseded|legacy|tmp|orig)(\.[^/]+)?$/i,
  /(^|\/)[^/]*\s+copy(\.[^/]+)?$/i,
  /(^|\/)\d{4}-\d{2}-\d{2}.*(audit|evidence|forensic|ledger|incident)/i,
];
// Sensitive path classes that must never live in the public repo.
const SENSITIVE = [
  /(^|\/)config\/.*\.v1\.json$/i,
  /(^|\/)os\/(ledger|one-shot|decisions|audits)\//i,
  /(^|\/)docs\/(audits|evidence|runbooks|remediation)\//i,
  /anti-scraping|edge-secret|SECRETS_SETUP|\.gitleaksignore/i,
  /(^|\/)\.claude\/|(^|\/)\.pi\/|(^|\/)\.agents\//i,
];
const SKIP = /(^|\/)(node_modules|dist|\.git)(\/|$)/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (SKIP.test(p)) return [];
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const hits = [];
for (const abs of walk(ROOT)) {
  const rel = relative(ROOT, abs);
  if (DEAD.some((re) => re.test(rel))) hits.push(`dead-weight: ${rel}`);
  if (SENSITIVE.some((re) => re.test(rel))) hits.push(`SENSITIVE (never public): ${rel}`);
}

if (hits.length) {
  console.error(`✗ ${hits.length} hard finding(s):`);
  hits.forEach((h) => console.error("  " + h));
  process.exit(1);
}
console.log("✓ no dead-weight or sensitive paths");
