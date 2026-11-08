# Rahul Sports Fitness — project notes for Claude Code

**What:** Single-page, award-tier landing page. Goal = WhatsApp inquiries for a
Dubai performance & rehab coach. Humanised, confident voice — not clinical/doctor-y.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
(`@theme` + tokens in `app/globals.css`) · GSAP + ScrollTrigger + `@gsap/react` +
Lenis (motion) · next-themes (dark/light) · CSS Modules per component. Deploys to **Vercel**.
No CMS — content in `lib/content.ts`.

## Design system (current)
- **Fonts:** PRIMARY = Geist (clean sans, used for body + all headings via
  `--font-display`); ACCENT = Playfair Display italic, applied only to `em` /
  `.ital` (the "Find the *cause*." treatment). Self-hosted via Fontsource.
- **Colour:** royal electric blue `--color-signal` (#2b6bff) as the one accent,
  used like Sensia uses neon green. White text on near-black (dark) / near-black on
  white (light).
- **Dark/light:** next-themes, class on `<html>` (`.dark` default, `.light`).
  Tokens for both live in `app/globals.css`; most surfaces flip via tokens — keep
  new colours as `color-mix(... var(--color-ink/bone/signal))`, never hardcoded hex.
- **Liquid glass:** Apple-style frosted glass with REAL rim refraction via
  `lib/liquidGlass.js` (from the `liquid-glass` skill) + `useLiquidGlass` hook.
  `.liquid` class = the frosted dressing; the hook adds SVG-displacement refraction
  (Chromium) with a blur fallback. Applied to the nav bar and the hero VSL box.

## Where things live
- `lib/content.ts` — ★ all copy, pricing, stats, contact. `⚠ PLACEHOLDER` = awaiting Rahul. Never hardcode copy in components.
- `lib/whatsapp.ts` — `waLink()`; every CTA uses it.
- `lib/liquidGlass.js` / `components/ui/useLiquidGlass.ts` — the glass.
- `components/sections/` — one file + `.module.css` per section.
- `components/ui/` — Nav, ThemeToggle, Magnetic, StickyCta, icons (Lucide), Reveal.
- `components/providers/` — ThemeProvider, SmoothScroll.

## Rules
- Headings = sans; one Playfair-italic accent phrase per heading (the reference look).
- Icons = Lucide (web icons), never emoji. WhatsApp = brand SVG in `icons.tsx`.
- Motion: one orchestrated hero load + scroll-tied moments. Full `prefers-reduced-motion`.
- `npm run build` must pass (TS strict) before shipping. Mobile-first, Lighthouse ≥ 95.

## Skills installed (`.agents/skills/`) — use them
liquid-glass, frontend-design, impeccable, GSAP, Three.js, Emil Kowalski, Vercel.
