# AGENTS.md — Tailered (public shell)

Operating doctrine for any AI agent working in this repository. This is the **public** Tailered
repository: the app shell, UI, and API *plumbing* only. The engine (models, scrapers, data, edge
math, infrastructure, secrets) lives privately and is never mirrored here.

Read this file top to bottom before your first action. Its rules override default behavior.

---

## LAW 0 — Nothing valuable, nothing exposed

Nothing in this repo may be front-facing-valuable, obtainable, proprietary, exposed, traceable,
trackable, or a reusable resource for others. **Source code is acceptable only where it does not
give the edge away and benefits AI agents / models / machine execution — not more than that.**

Never commit, reference, or reconstruct: credentials, tokens, secrets, `.env` values (only
`VITE_*` placeholders in `.env.example`); live infrastructure identifiers (account/project/
service/cluster/workspace/database IDs); security topology (origin IPs, WAF/bypass details,
edge-secret ceremonies); internal audits, evidence ledgers, incident records; owner/session
telemetry (spend, tokens, timings tied to a person); proprietary model math, edge/gating logic,
backtest data; or scraper implementations. If you are unsure whether something is safe, it is not.

**Enforcement:** `.gitignore` is deny-all / allow-known-safe. CI runs gitleaks, a
no-server/schema-import guard, and a no-dead-weight scan on every PR and push. Do not weaken them.

## LAW 1 — No dead weight, ever

The repo — every directory, and Tailered as a whole — carries **zero** superseded, outdated,
unnecessary, duplicate, or unreferenced files, artifacts, or references. Every file must be
reachable from an import, route, config, or documented purpose. When you supersede something,
delete the thing it replaced in the same change. Deletion is a feature. Run the ponytail passes
below on every task; leave the tree lighter than you found it.

## LAW 2 — Public/private boundary

Public here = React/Vite SPA + shared **display/DTO types** + tRPC **client** + generic build
config. The UI calls the private API over the network via `VITE_API_BASE_URL`. Never add
`server/`, drizzle schema, business logic, model/edge math, or scrapers. Edge verdicts
(Pass / Monitor / Edge Detected) arrive **pre-computed** from the private API — the client only
displays them; it never computes the edge.

---

## Standing skill posture — always on

Invoke a skill **before acting** if there is even a 1% chance it applies (superpowers:
using-superpowers). Process skills first, then implementation skills. The following are **on for
every task, every scope, every execution** — not opt-in:

| Skill | Mode | When |
|-------|------|------|
| `ponytail-audit` | **ultra** | Standing. Whole-repo over-engineering + dead-weight sweep; nothing bloated makes the trip. |
| `ponytail-review` | **ultra** | **Every** task/diff/execution. Hunt reinvented stdlib, unneeded deps, speculative abstractions, dead flexibility. |
| `ponytail` | full | Every coding decision. Laziest solution that actually works; stdlib/native before deps; one line before fifty. |
| `unlazy` | on | Enforce **strict boundaries, clear gates, targets, scopes, checkpoints** — each with explicit objectives and finish-items. Nothing is "done" until its gate is met and verified. |
| `superpowers:using-superpowers` | max | Skill-first reflex before any response or action, including clarifying questions. |
| `gstack` | on | Session lifecycle (below). |

### gstack session lifecycle
On every session start: refresh gstack + the repo skill index, and **wipe outdated/superseded
skills** so only current skills remain. Run `node scripts/skills-refresh.mjs` (dry-run with
`--dry-run`); it prints a one-line `added / updated / wiped` summary. Never carry a stale skill.

---

## Cloudflare skill map — pick the skill for the scope

This product re-platforms onto Cloudflare Workers. Map task → skill and invoke it before executing:

| Scope / task | Skill |
|--------------|-------|
| Worker runtime, request/response, routing, fetch handlers | `cloudflare:workers-best-practices` |
| `wrangler.jsonc`/config, bindings, dev, deploy, secrets | `cloudflare:wrangler` |
| Stateful coordination, single-writer, sessions, locks, rate limits | `cloudflare:durable-objects` |
| SQL data layer (D1) — schema, migrations, queries | `cloudflare:wrangler` + D1 docs |
| Agentic/LLM services on Workers, tool use | `cloudflare:agents-sdk` |
| Bot/abuse challenge on forms/auth | `cloudflare:turnstile-spin` |
| Latency, bundle, caching, Core Web Vitals | `cloudflare:web-perf` |
| Email sending from Workers | `cloudflare:cloudflare-email-service` |
| Access / zero-trust for the team surface | `cloudflare:cloudflare-one` |
| General Cloudflare platform questions | `cloudflare:cloudflare` |

When unsure which applies, search the Cloudflare docs skill before guessing.

---

## Ultra mode — the default operating contract

When work is scoped as a project or invoked in **Ultra mode**, execute the planning, brainstorming,
blueprint build, and execution with **maximum granularity, depth, debugging, logging, and articulate
pinpointed print statements** (`/unlazy`). Every stage runs to its gate.

**Zero hallucination. Zero oversight. Zero lapse in focus or attention to detail.**

**Test, timestamp, track, log, store, and take notes on everything:**
- Speed · Cost · Tokens · Pass/Fail · Accuracy · Depth

**The 10x goals — the bar for every scope:**
- 10x speed · 10x accuracy · 10x parallelization · 10x streamlined execution · 10x optimization ·
  10x focus and attention to detail · 10x trimmed work · 10x thoroughness and completeness.

Measurement is not optional. If a run cannot be measured against these, it is not finished.

---

## Verify before claiming
Never claim a result, a passing build, or a completed task without running the check fresh and
reading its actual output (superpowers:verification-before-completion). Evidence before assertions.
