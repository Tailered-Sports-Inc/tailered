# DESIGN.md — Tailered brand & interface system

The single source of truth for how Tailered looks and moves. Brand law beats any skill suggestion;
where a generated palette or font recommendation disagrees with the tokens below, these win.

---

## Logos

Three app-icon marks — a **three-bar chart with a rising arrow** (measured growth, upward edge),
rounded-square tile. Board: `brand/tailered-logos.jpg`.

| Variant | Tile | Bars | Arrow | Use |
|---------|------|------|-------|-----|
| Light | `#FFFFFF` | `#45E0A8` mint | `#0B0B0B` black | on dark / photographic backgrounds; favicons on dark |
| Dark | `#0B0B0B` | `#FFFFFF` white | `#45E0A8` mint | default app icon; on light or mint backgrounds |
| Mint | `#45E0A8` | `#0B0B0B` black | `#FFFFFF` white | accent moments, splash, marketing hero |

Inversion logic (carry it anywhere the mark appears): the arrow is always the highest-contrast
element against its tile. Never recolor the mark outside these three combinations. Never add
gradients, shadows-as-fill, or a fourth color inside the mark.

---

## Palette — one accent, exactly three colors

Board: `brand/tailered-palette.png`.

| Token | Hex | Name | Role |
|-------|-----|------|------|
| `--accent` | `#45E0A8` | Tailered AI Green | The **only** accent. Edges/picks, live indicators, active nav, focus rings, the brand mark. |
| `--black` | `#0B0B0B` | Pure Black | Page background (dark), primary text on light. |
| `--white` | `#FFFFFF` | Pure White | Page background (light), primary text on dark, surfaces. |

**Discipline:**
- Mint is signal, not decoration. Anything without signal stays neutral (tints of black/white).
- **No** gradients, purple, gold, neon green (`#39FF14` is banned legacy), or red-for-emphasis.
- Mint **text on white fails contrast** (~1.9:1). Never render raw mint text on white. Use the
  tinted-cell pattern instead: mint surface + mint border + high-contrast foreground, always
  paired with a text label — readability comes from contrast/size/weight/shape, never color alone.
- Mint **fills** (dots, rails, pills, the mark) may sit on white with a `#0B0B0B` hairline keyline
  where edge definition is needed.
- Negative / no-edge / PASS states are **neutral grey**, never red; de-emphasize whole PASS rows.
- Neutral tiers are tonal steps of black/white (surfaces, borders, text body/secondary/muted) —
  they are not new colors, they are the two anchors at reduced contrast.

---

## Typography

- **Familjen Grotesk**, single face across the product (weight axis only; `font-optical-sizing:
  auto` is a correct no-op). No second typeface.
- Fluid clamp scale, rem-based (honors zoom): caption 11→12, label 12→13 (uppercase, 0.08em
  tracking), body 14→16, h1 30→48, **display 40→76 (hard cap 76px — no oversized hero)**.
- Type owns size/rhythm/measure/wrap; the palette owns color. Keep them orthogonal.

---

## Motion

- Subtle. ~160ms default. Animate **only** `transform` and `opacity`.
- Restrained dimensional motion on interactive cards/controls: 1–2px lift, small shadow expansion,
  a compressed pressed state, a non-bouncing spring return. **Tables and body text never move.**
- `prefers-reduced-motion` collapses all motion to static. This is non-negotiable.

---

## Folded-in design doctrine

These skills are the standing quality bar for any interface work here. Invoke them; the concrete
rules below are what they mean in this repo.

### antislop — kill the AI-slop tells
No generic hero-blob gradients, no three-identical-feature-card rows, no lorem cadence, no
emoji-as-icon, no center-everything default. Real hierarchy, intentional asymmetry, specific copy.
Every element earns its place or it is deleted (see AGENTS.md LAW 1).

### ui-ux-pro-max — dials & fundamentals
Density 8/10 (dense, dashboard-grade — this is a data product), Motion 2/10 (subtle). Strong
visual hierarchy, honest data density, accessible by default (contrast, focus, keyboard, states).
Charts and tables follow one system, not per-page one-offs.

### apple-design — physical, fluid, restrained
Motion is physical and interruptible, never decorative. Depth via materials and elevation, not
chrome. Spatial consistency across states. Restraint: remove until it breaks, then add back one
thing. Optical sizing/tracking/leading tuned, not defaulted.

### emil-design-eng — the invisible details
The polish nobody names but everybody feels: correct focus rings, honest loading/empty/error
states, no layout shift, precise spacing rhythm, hover/active that match press physics, content
that never jumps. Ship the details that make it feel inevitable.

### impeccable — deterministic quality
Treat the interface against a deterministic checklist: hierarchy, alignment, cognitive load,
responsive behavior, a11y, edge/empty states, i18n, motion. Nothing bland-by-default and nothing
loud-for-its-own-sake. If a detector rule fails, it is a defect, not a preference.

---

## Enforcement
UI that violates these tokens is a defect. The three hex values (`#45E0A8`, `#0B0B0B`, `#FFFFFF`),
the single typeface, and the motion rules are law across every viewport and every surface —
frontend and any brand-bearing output (emails, share cards, prerender).
