# Apple-Style Glass (Glassmorphism) — Build Spec / Skill File

A self-contained recipe for the frosted "liquid glass" panel used by Apple
(control center, widgets, menu bars). Hand this file to any agent or person.
It works in **web/CSS, canvas, Remotion/JS video, and ffmpeg**. Follow the exact
values — the look lives in the details, not the idea.

---

## 1. What the effect actually is

Glass is **not a color or a filter you slap on a shape**. It is a stack of layers,
in this order (bottom → top):

1. A **blurred copy of whatever is behind the panel** (the single most important layer).
2. A **translucent white tint** over the blur.
3. A **very slight darken** so it doesn't wash out on bright content.
4. A **soft inner white glow** (light pooling inside the panel).
5. **Thin white edge highlights on the top and bottom only.**
6. Dark, high-contrast **text/icons** on top.

If any one of layers 1, 4, or 5 is missing, it stops looking like glass and
starts looking like a flat gray box. Those three are non-negotiable.

---

## 2. Exact values (the whole recipe)

| Layer | Value |
|---|---|
| **Backdrop blur** | Gaussian/box blur **16px** of the background *behind the panel only* |
| **White tint** | `rgba(255, 255, 255, 0.30)` flat fill over the blur |
| **Darken** | `rgba(0, 0, 0, 0.05)` flat fill over the tint |
| **Inner glow** | inset shadow, **white 20%**, size ~**60px**, no offset (`inset 0 0 60px rgba(255,255,255,0.20)`) |
| **Top edge** | **1px** line, `rgba(255, 255, 255, 0.5)` |
| **Bottom edge** | **1px** line, `rgba(255, 255, 255, 0.5)` |
| **Side edges** | none |
| **Corners** | **pill / fully rounded** for bars & buttons · **24–40px** for cards |
| **Text & icons** | near-**black** (`#000`) for light glass |
| **Drop shadow (optional, for lift)** | `0 8px 30px rgba(0,0,0,0.18)` under the panel |

**Rules of thumb**
- Blur strength scales with panel size: 16px for bars/cards; go 20–28px for big hero panels, 10–12px for tiny chips.
- More blur = more premium, up to a point. Under ~10px it looks like cheap translucency.
- The tint is **white**, not gray. Gray tint kills the glass feel.
- Keep the two edge lines only on top and bottom. This fakes the rounded "lip" of real glass catching light.

---

## 3. Web / CSS (drop-in)

```css
.glass {
  /* 1. blur the content behind the panel */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  /* 2 + 3. white tint + slight darken, stacked */
  background:
    linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    linear-gradient(rgba(255, 255, 255, 0.30), rgba(255, 255, 255, 0.30));

  /* 4. inner white glow */
  box-shadow: inset 0 0 60px rgba(255, 255, 255, 0.20);

  /* 5. top + bottom edge highlights only */
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);

  /* 6. shape */
  border-radius: 9999px;   /* pill — use 24–40px for cards */
  color: #000;             /* dark text reads through the frost */
}
```

> **Gotcha:** some build pipelines (Lightning CSS / Next.js) silently strip a
> hand-written `backdrop-filter`. If the blur doesn't show, apply it with a
> utility class instead — e.g. Tailwind's `backdrop-blur-lg` (= 16px) — or inline
> the property. `backdrop-filter` also needs *something behind the element* to
> blur; over a plain white background it looks like nothing.

**Card variant** (softer, for content tiles): blur **12px**, white tint **20%**,
edges `rgba(255,255,255,0.8)`, inner glow size **40px**, corners **24px**.

---

## 4. Remotion / canvas / HTML-to-video (JS, Claude as video editor)

If frames are rendered from HTML/CSS (Remotion, Puppeteer, satori, canvas with
CSS), **use the CSS block in §3 as-is** — place the `.glass` element over the
footage layer and `backdrop-filter` samples it automatically. One caveat for
video: if the footage behind the panel moves, the blur updates per frame for
free (it re-samples every frame), so nothing extra is needed.

Pure `<canvas>` (no CSS backdrop-filter) — do it manually per frame:

```
1. Draw the background/footage frame.
2. Copy the panel's rectangle region into an offscreen canvas.
3. ctx.filter = "blur(16px)"  → draw that region back, clipped to a rounded rect.
4. Fill the rounded rect: white @ 0.30, then black @ 0.05.
5. Inner glow: a large, soft white radial-gradient (center ~0.20 → edge 0),
   composited inside the clip.
6. Stroke a 1px white @ 0.5 line along the top and bottom edges only.
7. Draw text/icons in #000 on top.
```

---

## 5. ffmpeg (if rendering without a DOM)

Per panel region (x, y, w, h):

```
1. crop that region from the base video
2. boxblur=16  (or gblur=sigma=16)
3. overlay a white rectangle at 30% + a black rectangle at 5%
4. overlay a 1px white (50%) line on the TOP and BOTTOM edges of the rect
5. (inner glow) multiply a large soft white radial (~20%) inside the rect
6. overlay the finished panel back at (x, y)
```

The blur must be of the **cropped region of the real video**, not a separate
asset — that's what makes it read as glass sitting on the footage.

---

## 6. Checklist before you ship it

- [ ] Is there a **real blur of the content behind** the panel? (not a solid fill)
- [ ] Is the tint **white**, ~30%?
- [ ] Is there a **soft white inner glow**?
- [ ] Are there **white 1px lines on top and bottom only**?
- [ ] Is the text **dark and readable** through the frost?
- [ ] Corners: **pill** for bars/buttons, **rounded** for cards?
- [ ] On moving video, does the blur **track** the content behind it?

Hit all seven and it looks like Apple glass. Miss the blur, the inner glow, or
the edge lines and it looks like a flat gray box.

---

## 7. Dark glass (optional variant)

For glass over bright footage where you want a dark panel instead:
- Blur **16px** (same).
- Tint: black `rgba(0, 0, 0, 0.35)` instead of white.
- Inner glow: white **10%**.
- Edges: top/bottom **1px white 14%**.
- Text/icons: **white**.

Everything else identical.
