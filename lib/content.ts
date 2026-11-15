/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — all copy, pricing, stats, contact.
 *  Items tagged  // ⚠ PLACEHOLDER  are not yet confirmed by Rahul.
 *  Pending: WhatsApp number (+91 vs +971), final prices, hard stats,
 *  real photos / before-afters / testimonials / logo, the VSL.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Rahul Sports Fitness",
  shortName: "RSF",
  domain: "rahulsportsfitness.com",
  url: "https://rahulsportsfitness.com",
  tagline: "Find the cause, not the pain.",
  description:
    "Dubai performance and rehabilitation coaching. We assess the whole kinetic chain, locate the real cause of your pain or plateau, and build the programme that fixes it. MSc Sports Science, NSCA-CSCS.",
  city: "Dubai",
  coachName: "Rahul Chauhan",
  instagram: { handle: "rahul__4.00", url: "https://instagram.com/rahul__4.00" },
  email: "rahulchauhan141296@gmail.com",
};

export const whatsapp = {
  number: "971566439823", // +971 56 643 9823 (confirmed from Rahul's live page)
  defaultMessage:
    "Hi Rahul, I found your site. I want to find the cause of what's been holding me back. Can we talk?",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Method", href: "#method" },
  { label: "Check-ins", href: "#checkins" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
];

/* ── HERO ───────────────────────────────────────────────────────────────── */
export const hero = {
  // A word wrapped in *asterisks* renders in the teal accent.
  headline: "Find the *cause*.",
  standfirst:
    "Rahul coaches people in Dubai out of pain and off plateaus. He works out why it's happening, then fixes it for good.",
  primaryCta: "Message Rahul",
  // Silent looping background for the hero card. Put the compressed clip in
  // /public/video/ and set the path. Empty = the still photo is used.
  loop: "/video/hero-loop.mp4",
  still: "/img/hero-poster.jpg",
  // Horizontal 16:9 VSL. Empty src shows the production state.
  vsl: {
    heading: "See how Rahul works",
    sub: "A short film on how he finds the cause before he writes a single exercise.",
    src: "", // PLACEHOLDER /video/vsl.mp4 (compressed)
    poster: "/img/hero-poster.jpg",
    runtime: "90 sec",
    label: "Watch Rahul explain",
  },
};

/* ── CREDENTIALS (woven, not a generic stat grid) ──────────────────────── */
export const credentials = [
  { k: "MSc", v: "Sports Science" },
  { k: "NSCA-CSCS", v: "Certified strength & conditioning" },
  { k: "12.2K", v: "Coaching a Dubai community" },
];

/* ── REFRAME ────────────────────────────────────────────────────────────── */
export const reframe = {
  lead: "The reframe",
  // One statement, revealed word by word on scroll. *word* = the blue accent.
  line: "Where it hurts is rarely where it starts. Find the *cause*, and it stops.",
  kicker: "Assess first. Guess never.",
};

/* ── WHO IT'S FOR ───────────────────────────────────────────────────────── */
export const who = {
  lead: "Who this is for",
  cards: [
    {
      title: "Pain that keeps returning",
      body: "Knee, back or shoulder pain that rest and stretching never truly settle.",
    },
    {
      title: "Stuck despite the work",
      body: "Training hard but plateaued. Strength, physique or performance that won't move.",
    },
    {
      title: "Back to full performance",
      body: "Past an injury and ready to train hard again, without re-breaking what healed.",
    },
  ],
};

/* ── THE METHOD (a real sequence — numbering earns its place) ───────────── */
export const method = {
  lead: "The method",
  heading: "A loop, not a guess.",
  standfirst:
    "We measure, build, coach and re-measure. Progress you can see on paper, not just feel.",
  steps: [
    {
      n: 1,
      title: "Movement assessment",
      body: "Ankle, hip, core and shoulder screening to find the real restriction.",
    },
    {
      n: 2,
      title: "Custom program",
      body: "Built around your assessment, goal and schedule, in the right order.",
    },
    {
      n: 3,
      title: "Weekly check-ins",
      body: "I adjust the plan before a plateau or a flare-up, not after.",
    },
    {
      n: 4,
      title: "Re-test & progress",
      body: "Re-assessment on a schedule, so progress is measured, not assumed.",
    },
  ],
};

/* ── CAUSE CHAIN (supporting scroll moment) ─────────────────────────────── */
export const causeChain = {
  lead: "One example",
  heading: "The ankle that became knee pain.",
  body: "A stiff ankle can't bend over the foot, so the knee absorbs load it was never meant to carry. The pain shows up last, furthest from where it began.",
  nodes: [
    { id: "ankle", label: "Ankle", note: "Loses range. Can't travel over the foot." },
    { id: "knee", label: "Knee", note: "Takes the load the ankle refused. Starts to ache." },
    { id: "hip", label: "Hip", note: "Compensates to protect the knee. Tightens." },
    { id: "pain", label: "The pain you feel", note: "Shows up last, furthest from the cause." },
  ],
  caption: "Illustrative. Your assessment maps your own chain.",
};

/* ── INTERACTIVE DIAGNOSTIC (signature) ─────────────────────────────────── */
export const diagnostic = {
  lead: "Find the cause",
  heading: "Where it hurts isn't where it *starts*.",
  sub: "Pick what's bothering you. Watch the chain trace back to the real cause.",
  // A front-facing 3D body render (transparent PNG) in public/img/ shows instead
  // of the silhouette, with the joints overlaid. Empty = silhouette.
  bodyImage: "/img/body.png",
  // kinetic chain, bottom → top
  joints: ["Ankle", "Knee", "Hip", "Lower back", "Mid-back", "Shoulder"],
  symptoms: [
    {
      label: "Knee pain",
      feel: 1,
      cause: 0,
      causeLabel: "a stiff ankle",
      note: "A stiff ankle can't travel over the foot, so the knee absorbs load it was never built for. Free the ankle and the knee quietens down.",
    },
    {
      label: "Lower-back pain",
      feel: 3,
      cause: 2,
      causeLabel: "locked hips",
      note: "When the hips stop rotating, the lower back twists to make up for it. Restore hip range and the back stops compensating.",
    },
    {
      label: "Shoulder pain",
      feel: 5,
      cause: 4,
      causeLabel: "a stuck mid-back",
      note: "A mid-back that won't extend pushes the shoulder past its safe range every rep. Mobilise the mid-back and the shoulder has room again.",
    },
  ],
};

/* ── PACKAGES ───────────────────────────────────────────────────────────── */
// ⚠ PLACEHOLDER PRICES — confirm the full sheet with Rahul.
export const packages = {
  lead: "Pricing",
  heading: "Start where you need to.",
  standfirst: "Every path begins with the assessment. Most people change the chain on the ten-session block.",
  currency: "AED",
  cards: [
    {
      name: "The Assessment",
      price: "350",
      unit: "one-off",
      blurb: "Find the cause before you commit to anything.",
      features: [
        "Full movement and posture screen",
        "Your personal chain, mapped",
        "A clear plan of what to fix first",
        "No obligation to continue",
      ],
      cta: "Book the assessment",
      featured: false,
      waMessage: "Hi Rahul, I'd like to book the movement assessment. When are you free?",
    },
    {
      name: "Ten-Session Block",
      price: "2,600",
      unit: "10 sessions",
      blurb: "Enough runway to re-test and prove the change.",
      features: [
        "Everything in the assessment",
        "Ten coached one-to-one sessions",
        "A programme built to your chain",
        "A re-test that proves progress",
        "Direct WhatsApp support throughout",
      ],
      cta: "Start the block",
      featured: true,
      badge: "Where most people change",
      waMessage: "Hi Rahul, I'm interested in the ten-session block. Can you walk me through it?",
    },
    {
      name: "Partner & Self-Guided",
      price: "from 180",
      unit: "per person",
      blurb: "Train with a partner, or follow a programme on your own.",
      features: [
        "Partner training, split the cost two ways",
        "Self-guided programmes",
        "Built on the same assessment logic",
        "Move up to one-to-one any time",
      ],
      cta: "Ask about options",
      featured: false,
      waMessage: "Hi Rahul, tell me about partner training and the self-guided programmes.",
    },
  ],
  footnote: "Prices indicative while the final sheet is confirmed. In person in Dubai, or online.",
};

/* ── RESULTS & TESTIMONIALS ─────────────────────────────────────────────── */
// Before/after pairs. Drop the photos in /assets/before-after/ and tell Claude:
// it compresses them into /public/img/results/ and fills this list. The
// Results section does not render at all while this list is empty.
export type ResultPair = { tag: string; caption: string; before: string; after: string };
export const results = {
  lead: "Results",
  heading: "The chain, changed.",
  pairs: [] as ResultPair[],
};


/* ── MEET RAHUL (about) ─────────────────────────────────────────────────── */
export const about = {
  lead: "Meet Rahul",
  heading: "I coach the joint, not just the *goal*.",
  body: [
    "I work with people who are tired of guessing: chasing a “tight” spot for years, training around a pain that never resolves, or grinding through a template that ignores how their body actually moves.",
    "Every client starts with a movement assessment: ankle, hip, core and shoulder. I find the real restriction, then load exactly enough to fix it, no more and no less. Rehab, mobility and strength sequenced in the right order, adjusted every week based on how you respond.",
  ],
  stats: [
    { k: "12+", v: "Years in sports science & coaching" },
    { k: "MSc", v: "Sports Science" },
    { k: "NSCA-CSCS", v: "Certified strength coach" },
    { k: "Dubai", v: "In-person or online" },
  ],
  name: "Rahul Chauhan",
  role: "MSc Sports Science, NSCA-CSCS",
};

/* ── FINAL CTA ──────────────────────────────────────────────────────────── */
export const finalCta = {
  heading: "Let's find what's actually *limiting* you.",
  body: "Fifteen minutes, no obligation. Tell me what's bothering you or what you're training for, and I'll tell you exactly where to start.",
  cta: "Message Rahul",
  reassurance: "Free movement assessment · replies personally · Dubai time",
};

/* ── FOOTER ─────────────────────────────────────────────────────────────── */
export const footer = {
  blurb: "Performance and rehabilitation coaching in Dubai. Find the cause, then fix it.",
  credentials: ["MSc Sports Science", "NSCA-CSCS", "Dubai, UAE"],
  copyright: `© ${new Date().getFullYear()} Rahul Sports Fitness.`,
};

/* ── WEEKLY CHECK-INS (existing clients) ────────────────────────────────── */
// Copy is lifted from Rahul's own forms.app check-in and the Method steps.
export const checkins = {
  lead: "Weekly check-ins",
  heading: "A weekly check-in that keeps the plan honest.",
  body: "Take a moment to reflect on your progress this week. This check-in helps me better support you in reaching your goals.",
  cta: "Start this week's check-in",
  ctaNote: "For current clients",
  formUrl: "https://go.forms.app/form/6adcb66a6ce5d988c1671edd",
  tiles: {
    time: { big: "3 min", label: "Takes about three minutes." },
    adjust: {
      title: "Adjusted before it goes wrong",
      body: "I track range, load and recovery and adjust the plan before a plateau or a flare-up happens, not after.",
    },
    measured: {
      title: "Measured, not assumed",
      body: "Re-assessment on a set schedule, so progress is measured, not assumed. Same tests, same standards, tracked over time.",
    },
    personal: "Replies personally",
  },
};
