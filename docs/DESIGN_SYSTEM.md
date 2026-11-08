# Design System — "Find the Cause"

Tokens live in `src/styles/global.css` under `@theme` (Tailwind v4) and `:root`.

## Colour
| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#0a0b0d` | Page background |
| `--color-ink-2` | `#101317` | Raised surfaces |
| `--color-ink-3` | `#161a1f` | Cards |
| `--color-bone` | `#f4f1ea` | Primary text (warm off-white) |
| `--color-sand` | `#e9e2d4` | Warm light band (pricing) |
| `--color-sand-ink` | `#15120c` | Ink on the light band |
| `--color-teal` | `#5ee6d3` | **The single accent** — lines, accents, CTAs |
| `--color-teal-bright` | `#c6fff5` | Ice highlight |
| `--color-teal-deep` | `#0fb4a7` | Accent on the light band |

Derived vars: `--line`, `--line-strong`, `--bone-dim`, `--bone-faint`,
`--teal-glow` (all `color-mix` off the above).

## Type
- **Display:** Fraunces Variable (`--font-display`). `opsz`/`SOFT`/`WONK` axes tuned
  per use; accent words are italic + teal.
- **Body/UI:** Inter Variable (`--font-sans`).
- **Fluid scale:** `.text-hero`, `.text-h2`, `.text-h3`, `.text-lead` (clamp-based).

## Motion
- Easing: `--ease-out-expo` `cubic-bezier(.16,1,.3,1)`, `--ease-in-out-quint`.
- Reveals: `expo.out`, ~0.9–1.1s, small `y`/`yPercent` only.
- UI transitions 150–400ms. Animate transform/opacity only.
- Full reduced-motion path in `motion.ts` (`initReducedMotion`) + CSS guards.

## Primitives
- `.glass` — translucent blur panel (nav, chips).
- `.btn` / `.btn--ghost` / `.btn--on-sand` — pill buttons.
- `.eyebrow` — uppercase teal kicker with leading rule.
- `.grain` — subtle SVG noise overlay.
- `.shell` — centred content column (`min(1200px, 92vw)`), `--gutter` side padding.

## Breakpoints
Mobile-first. Key jumps: 520, 720, 760, 820, 880, 900, 980, 1040px (per component).
