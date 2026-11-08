"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Restrained reveal — used only on a few key moments, never on every section.
 * Lines/children clip up once. Honors reduced-motion (content stays visible).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 24,
  delay = 0,
  stagger = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const targets = stagger > 0 ? Array.from(el.children) : [el];
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
