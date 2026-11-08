"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { useLiquidGlass } from "./useLiquidGlass";
import { ArrowIcon } from "./icons";
import styles from "./Nav.module.css";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  useLiquidGlass(barRef, { radius: 20, scale: -52, chroma: 4, blur: 9, border: 0.16, saturate: 1.5 });

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.wrap}>
      <div ref={barRef} className={cn("liquid", styles.bar, stuck && styles.stuck)}>
        <a href="#top" className={styles.brand} aria-label={`${site.name}, home`}>
          <svg className={styles.monogram} viewBox="0 0 48 48" fill="none" aria-hidden>
            <path d="M8 36 L19 25 L28 31 L41 15" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="41" cy="15" r="3.6" fill="currentColor" />
          </svg>
          <span className={styles.brandName}>
            Rahul<span> Sports Fitness</span>
          </span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <Magnetic strength={0.5}>
            <a className={cn("btn", styles.cta)} href={waLink()} target="_blank" rel="noopener">
              <span>Get started</span>
              <ArrowIcon size={16} />
            </a>
          </Magnetic>
          <button
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={cn(styles.overlay, open && styles.overlayOpen)}>
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn" href={waLink()} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
          Get started
          <ArrowIcon size={17} />
        </a>
      </div>
    </header>
  );
}
