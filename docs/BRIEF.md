# Creative Brief — Rahul Sports Fitness (Phase 1)

## Positioning
Rahul is a Dubai performance & rehab coach (MSc Sports Science, NSCA-CSCS, 12.2K
IG). Where other coaches sell the promise ("get shredded"), Rahul sells the
**mechanism**: *find the cause, not just the pain.* That is the whole site.

- **Is:** clinical, editorial, confident.
- **Is never:** hype-y, generic "fitness", crypto/SaaS-generic.
- **One conversion goal:** a WhatsApp message.

## Concept — "Find the Cause"
The site is built like a diagnosis. Lead with the mechanism, prove it with the
cause-chain animation, then earn the WhatsApp message.

**Homepage arc:** Hero + VSL → Proof bar → the reframe (pain is a symptom) → who
it's for → the cause-chain (signature) → the method (Assess → Program → Progress →
Re-test) → packages (10-session pack highlighted) → results & testimonials → final
WhatsApp CTA → footer.

## Art direction
- **Colour:** near-black base, warm off-white, **one ice-teal accent** (ownable;
  leans into the rehab/clinical positioning). Pricing flips to a warm light band.
- **Type:** 2 fonts — **Fraunces** serif display with an *italic accent word*, and
  **Inter** for body/UI.
- **Imagery:** B&W athletic photography (placeholders until Rahul sends assets).
- **Nav:** glass pill — logo left, links centre, solid WhatsApp pill.
- **Signature moment:** the scroll-driven **cause chain** (ankle → knee → hip →
  pain) drawn in SVG + GSAP DrawSVG — proves "find the cause" without a word.
- **Motion:** restrained; scroll reveals + the one line-draw. No scroll-jacking.
  Full `prefers-reduced-motion` path.

## Still pending from Rahul
WhatsApp number (+91 vs +971), final price sheet, hard stats, real photos /
before-afters / testimonials / logo, and the VSL. All are clearly-marked
placeholders in `src/data/content.ts` — the build does not stall waiting on them.
