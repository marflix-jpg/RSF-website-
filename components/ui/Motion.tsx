"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/* One place for the page's quiet scroll motion, so timing and easing match
   everywhere. Sections with their own choreography (hero, reframe, the video
   panels, the method cards) are left alone. */

const REVEAL = [
  "#about .shell > figure",
  "#about .shell > div > *",
  "#method header > *",
  "#cause .shell > div:first-child > *",
  "#cause .shell > div:not(:first-child)",
  "#checkins article",
  "#results header > *",
  "#results header + div",
  "#results li",
  "#pricing .shell > div:first-child > *",
  "#pricing article",
  "#pricing .shell > p",
  "#reviews > div:first-child > *",
  "#contact .shell > *",
  "footer .shell:first-of-type > *",
].join(",");

export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(REVEAL);
      // CSS transitions on transform would fight the tween, so they pause for it
      gsap.set(items, { opacity: 0, y: 20, transition: "none" });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "expo.out",
            stagger: 0.06,
            overwrite: true,
            clearProps: "opacity,transform,transition",
          }),
      });
    });

    // slow depth on the big photographs, desktop only
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
      [
        { target: "#about figure img", scale: 1.1 },
        { target: "#contact img", scale: 1.1 },
        { target: "#reviews img", scale: 1.18 },
      ].forEach(({ target, scale }) => {
        const el = document.querySelector<HTMLElement>(target);
        if (!el) return;
        gsap.fromTo(
          el,
          { yPercent: -4, scale },
          {
            yPercent: 4,
            scale,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
    });

    // lazy media changes heights after first paint
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  });

  return null;
}
