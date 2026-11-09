# Rahul Sports Fitness — project notes for Claude Code

**What:** Single-page, award-tier landing page. Goal = WhatsApp inquiries for a
Dubai performance & rehab coach. Humanised, confident voice — not clinical/doctor-y.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
(`@theme` + tokens in `app/globals.css`) · GSAP + ScrollTrigger + `@gsap/react` +
Lenis (motion) · next-themes (dark/light) · CSS Modules per component. Deploys to **Vercel**.
No CMS — content in `lib/content.ts`.

## Design system (current) — Enhance Fitness visual language
Rahul chose https://www.enhancefitness.com/en as the reference. Every token was
MEASURED off that site, not eyeballed: the blueprint lives at
`.replica/enhance/ref/blueprint.md` (regenerate with the `replica` skill).
Do not "improve" these values by eye.

- **Font:** Inter only, weights 300–800, **letter-spacing `normal` everywhere**
  (no negative tracking). Headings are Inter extrabold (800); the hero h1 is 700.
  No serif — Playfair has been removed.
- **Type scale:** 72 / 56 / 42 / 24 / 18 / 16 / 14 → `.t-mega .t-h1 .t-h2 .t-h3 .t-lead`.
- **Colour:** white canvas, black type. Primary teal `--color-signal` #1BBCBC with
  `--surface-tint` #EDFCFC as its tint and the text colour on teal. Lime
  `--color-lime` #D5FF00 for the one highlighted feature card (ink #7B9300).
  Secondary copy `--bone-dim` #5A7272, hairline `--line` #C6D2D2, band #C6D2D2,
  footer #E2E9E9, idle/unfilled words `--bone-faint` #D1D5DB.
- **Accent words:** `em` / `.ital` recolour to teal in the same typeface. They are
  NOT italic and NOT a different family.
- **Light only.** `ThemeProvider` passes `forcedTheme="light"`; the theme toggle is
  out of the nav. next-themes stays installed if dark is ever wanted back.
- **Radii:** pill for every button/chip/nav, 40px feature cards + hero, 24px cards,
  16px step cards, 12px photo tiles (`--r-pill/-xl/-lg/-md/-sm`).
- **Glass:** white frost over photography — `rgba(255,255,255,.2)`, 1px
  `rgba(255,255,255,.8)` top+bottom borders, `inset 0 0 40px rgba(255,255,255,.2)`,
  `blur(12px)`. That is the `.liquid` class. The SVG rim-refraction hook is no
  longer applied (Enhance uses plain backdrop-blur).
- **Layout:** `--shell` = min(1136px, 100vw − 2×gutter), gutter 16px → 152px.
  Note: a CSS module must not set `width:100%` on an element that also carries
  `.shell` — it overrides the shell and the section goes full-bleed.

## Where things live
- `lib/content.ts` — ★ all copy, pricing, stats, contact. `⚠ PLACEHOLDER` = awaiting Rahul. Never hardcode copy in components.
- `lib/whatsapp.ts` — `waLink()`; every CTA uses it.
- `lib/liquidGlass.js` / `components/ui/useLiquidGlass.ts` — the glass.
- `components/sections/` — one file + `.module.css` per section.
- `components/ui/` — Nav, ThemeToggle, Magnetic, StickyCta, icons (Lucide), Reveal.
- `components/providers/` — ThemeProvider, SmoothScroll.

## Rules
- Headings = Inter extrabold; one teal accent phrase per heading (`*word*` in content.ts).
- Icons = Lucide (web icons), never emoji. WhatsApp = brand SVG in `icons.tsx`.
- Motion: one orchestrated hero load + scroll-tied moments. Full `prefers-reduced-motion`.
- `npm run build` must pass (TS strict) before shipping. Mobile-first, Lighthouse ≥ 95.

## Skills installed (`.agents/skills/`) — use them
liquid-glass, frontend-design, impeccable, GSAP, Three.js, Emil Kowalski, Vercel.
