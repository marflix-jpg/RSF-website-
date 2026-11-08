# Rahul Sports Fitness — "Find the Cause"

A high-converting, award-caliber landing page for Rahul Sports Fitness (Dubai
performance & rehab coaching). One job: **turn visitors into WhatsApp inquiries.**

Concept: **"Find the Cause"** — crafted + clinical. Near-black editorial base,
one ice-teal accent, serif display with italic accent words, and a scroll-driven
**cause-chain** animation as the signature moment.

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Astro 7** (static output) | Ships as plain files → deploys straight to Hostinger, near-zero JS |
| Styling | **Tailwind v4** (`@theme` tokens) | Token-driven design system in CSS |
| Motion | **GSAP + ScrollTrigger + DrawSVG** + **Lenis** | Scroll choreography, the cause-chain line draw, smooth scroll |
| Fonts | **Fraunces** (display) + **Inter** (body), self-hosted via Fontsource | No external font requests |
| SEO | Sitemap, JSON-LD (`HealthAndBeautyBusiness`), OG image, canonical | Basic SEO + GEO base |

All motion respects `prefers-reduced-motion`. Mobile-first throughout.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site → ./dist
npm run preview    # preview the production build
```

---

## ✏️ Everything you edit lives in ONE file

Open **`src/data/content.ts`** — all copy, pricing, stats, and contact details
are there. Change them and the whole site updates. Nothing else needs touching.

Items tagged `// ⚠ PLACEHOLDER` are not yet confirmed. Before launch, confirm:

- [ ] **WhatsApp number** (`whatsapp.number`) — Rahul to confirm **+91 vs +971**.
      Format: international digits only, no `+` (e.g. `971501234567`). Every CTA
      deep-links here automatically.
- [ ] **Final price sheet** (`packages`) — placeholder AED prices are in place.
- [ ] **Hard stats** (`proof`, `hero.chip`) — swap any number Rahul can't stand behind.
- [ ] **Instagram handle / email** (`site.instagram`, `site.email`).

### Swapping in real photos & video

The site uses art-directed placeholders that look intentional (not broken), so it
can launch before assets arrive. To drop in the real thing — layout stays identical:

- **Training / before-after photos:** add the image to `public/img/…`, then set the
  `img:` / `src:` field on the relevant item in `content.ts` (`results.tiles`,
  `who.cards` use `PlaceholderMedia` — pass a `src`). Photos auto-render in B&W.
- **Hero VSL:** drop the file in `public/video/` and set `hero.vsl.src` (and
  `hero.vsl.poster`). The circular play button then opens it in the modal. Until
  then it shows a tasteful "in production" state.
- **Logo:** replace `public/favicon.svg` and the inline brand mark in
  `Header.astro` / `Footer.astro` if Rahul has a wordmark.

---

## Deploy to Hostinger

`npm run build` outputs a fully static site to **`dist/`**. Upload the **contents
of `dist/`** to your Hostinger `public_html/` (via hPanel File Manager or FTP).
No Node runtime is needed on the server.

Before launch: set the real domain in **`astro.config.mjs`** (`site:`), in the
JSON-LD/OG URLs (derived from it), and in `public/robots.txt`.

---

## Structure

```
src/
├─ data/content.ts        ← ★ all content & pricing (edit here)
├─ layouts/Base.astro     ← <head>, SEO, JSON-LD, font + style imports
├─ styles/global.css      ← design tokens (@theme) + base + components
├─ scripts/motion.ts      ← GSAP/Lenis: reveals, cause-chain, sticky CTA
├─ lib/whatsapp.ts        ← WhatsApp deep-link builder
├─ components/
│  ├─ Display.astro        (serif heading; *word* → italic teal accent)
│  ├─ PlaceholderMedia.astro (swappable B&W photo slot)
│  ├─ Header / Hero / ProofBar / ProblemPromise / Who
│  ├─ CauseChain.astro     ← the signature scroll animation
│  ├─ Method / Packages / Results / FinalCta / Footer / StickyCta
└─ pages/index.astro      ← assembles the page
```

See `docs/BRIEF.md` for the creative brief and `docs/DESIGN_SYSTEM.md` for tokens.
