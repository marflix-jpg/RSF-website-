"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { ArrowIcon, WhatsAppIcon } from "./icons";
import styles from "./Nav.module.css";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the menu is open; Escape closes it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Never leave the menu open when the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={styles.wrap}>
      <div className={cn("backdrop-blur-lg", styles.bar, stuck && styles.stuck)}>
        <a href="#top" className={styles.brand} aria-label={`${site.name}, home`} onClick={() => setOpen(false)}>
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
          <a className={cn("btn", styles.cta)} href={waLink()} target="_blank" rel="noopener">
            <span>Get started</span>
          </a>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* sits UNDER the bar (z-index) so the brand and close button stay usable */}
      <div id="mobile-menu" className={cn(styles.overlay, open && styles.overlayOpen)} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile" className={styles.sheet}>
          {nav.map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}>
              <span className={styles.idx}>{String(i + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
              <ArrowIcon size={18} />
            </a>
          ))}
        </nav>
        <a className={cn("btn", styles.sheetCta)} href={waLink()} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
          <WhatsAppIcon />
          Message Rahul on WhatsApp
        </a>
      </div>
    </header>
  );
}
