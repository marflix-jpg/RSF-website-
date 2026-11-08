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
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
];

/* ── HERO ───────────────────────────────────────────────────────────────── */
export const hero = {
  // Short, centered. A word wrapped in *asterisks* renders in Playfair italic.
  headline: "Find the *cause*.",
  standfirst:
    "Rahul coaches people in Dubai out of pain and off plateaus. He works out why it's happening, then fixes it for good.",
  primaryCta: "Message Rahul",
  // Horizontal 16:9 VSL. Empty src shows the production state.
  vsl: {
    src: "", // ⚠ PLACEHOLDER — /video/vsl.mp4 or a Mux/YouTube URL
    poster: "", // ⚠ PLACEHOLDER — /img/hero-poster.jpg
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
      body: "Ankle, hip, core and shoulder screening to find the actual restriction behind your pain or plateau, not just where you feel it.",
    },
    {
      n: 2,
      title: "Custom program",
      body: "A plan built around your assessment, your goal and your schedule. Strength, mobility and rehab sequenced in the right order, not bolted together.",
    },
    {
      n: 3,
      title: "Weekly check-ins",
      body: "I track range, load and recovery and adjust the plan before a plateau or a flare-up happens, not after.",
    },
    {
      n: 4,
      title: "Re-test & progress",
      body: "Re-assessment on a set schedule, so progress is measured, not assumed. Same tests, same standards, tracked over time.",
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
// ⚠ PLACEHOLDER — real before/afters + outcomes replace these.
export const results = {
  lead: "Results",
  heading: "The chain, changed.",
  tiles: [
    { tag: "Rehab", outcome: "Knee pain gone", detail: "Twelve weeks, back to running pain-free", img: "" },
    { tag: "Recomposition", outcome: "Minus 9kg, stronger", detail: "Lost fat while every lift went up", img: "" },
    { tag: "Performance", outcome: "Deadlift up 40kg", detail: "No back flare-ups, the cause came first", img: "" },
    { tag: "Posture", outcome: "Desk neck resolved", detail: "Daily headaches stopped inside eight weeks", img: "" },
  ],
};

export const testimonials = {
  lead: "Client notes",
  heading: "What clients say after the *first month*.",
  // Real testimonials from Rahul's client notes.
  items: [
    {
      quote:
        "I'd been nursing the same knee for almost two years, stretching the exact spot that hurt. Turns out that wasn't the problem at all. Rahul found it in the first session. A few weeks later I was running again without even thinking about it, which I honestly didn't expect.",
      name: "David Wiles",
      meta: "Recreational runner · Rehab",
      duration: "6 weeks",
      rating: 5,
    },
    {
      quote:
        "Every coach I'd had just handed me a program on day one. Rahul actually watched me move first, and my overhead position was a mess. He rebuilt it properly instead of piling weight on top, and my snatch has never felt this solid.",
      name: "Mohammed Husain",
      meta: "CrossFit athlete · Strength",
      duration: "10 weeks",
      rating: 5,
    },
    {
      quote:
        "I was really nervous about lifting again after having my daughter. Rahul never rushed it. We started lighter than I expected and only added load when I was genuinely ready. Three months in and I feel stronger than I did before pregnancy.",
      name: "Sarah Ahmed",
      meta: "Postnatal recovery · Rehab & Recomp",
      duration: "12 weeks",
      rating: 5,
    },
  ],
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
