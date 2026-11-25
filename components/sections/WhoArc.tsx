"use client";

import { useRef } from "react";
import { Gauge, RotateCcw, TrendingUp, type LucideIcon } from "lucide-react";
import { who } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import styles from "./WhoArc.module.css";

// one per card, in order: pain returning, stuck, back to performance
const ICONS: LucideIcon[] = [RotateCcw, Gauge, TrendingUp];
const pad = (n: number) => String(n).padStart(2, "0");

/* Pinned, scroll-scrubbed video accordion. One panel per problem: as you
   scroll, the next panel opens (widens on desktop, deepens on phone) and its
   clip plays while the others shrink. Each title and number appears once. */
export default function WhoArc() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = who.cards.length;

  useGSAP(
    () => {
      // still images are only fetched once the section is close
      const stills = new IntersectionObserver(
        (entries, io) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          root.current?.querySelectorAll("video").forEach((v) => { v.poster = v.dataset.poster ?? ""; });
          io.disconnect();
        },
        { rootMargin: "1200px 0px" },
      );
      if (root.current) stills.observe(root.current);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.current?.setAttribute("data-static", "true");
        return () => stills.disconnect();
      }

      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);
      const videos = panels.map((el) => el.querySelector("video"));
      let current = 0;
      let inView = false;

      const sync = () => {
        videos.forEach((v, i) => {
          if (!v) return;
          if (inView && i === current) v.play().catch(() => {});
          else v.pause();
        });
      };

      // each panel holds fully open for a while, then hands over smoothly
      const render = (progress: number) => {
        const raw = progress * (count - 1);
        const base = Math.floor(raw);
        const t = gsap.utils.clamp(0, 1, (raw - base - 0.22) / 0.56);
        const p = base + t * t * (3 - 2 * t);
        panels.forEach((el, i) => {
          el.style.setProperty("--o", gsap.utils.clamp(0, 1, 1 - Math.abs(p - i)).toFixed(4));
        });
        const next = Math.round(p);
        if (next !== current) {
          current = next;
          sync();
        }
      };

      render(0);
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => render(self.progress),
      });
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          inView = self.isActive;
          sync();
        },
      });
      return () => stills.disconnect();
    },
    { scope: root },
  );

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const start = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + (index / Math.max(count - 1, 1)) * range, behavior: "smooth" });
  };

  return (
    <div className={styles.section} id="who" ref={root}>
      <div className={styles.track} ref={trackRef} style={{ height: `${count * 100}vh` }}>
        <div className={styles.sticky}>
          <div className={`shell ${styles.inner}`}>
            <header>
              <span className={styles.eyebrow}>{who.lead}</span>
              <h2 className={`t-h2 ${styles.heading}`}>
                Built for people <em className="ital">done guessing</em>.
              </h2>
            </header>

            <div className={styles.panels}>
              {who.cards.map((c, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                <article
                  className={styles.panel}
                  key={c.title}
                  style={{ "--o": i === 0 ? 1 : 0, "--focus": c.focus } as React.CSSProperties}
                  onClick={() => goTo(i)}
                >
                  <video className={styles.media} src={c.video} data-poster={c.poster} muted loop playsInline preload="none" aria-hidden="true" />
                  <span className={styles.scrim} aria-hidden="true" />
                  <span className={`${styles.icon} glass-backround inset-white-icon backdrop-blur-md`} aria-hidden="true">
                    <Icon strokeWidth={2.2} />
                  </span>
                  <span className={`${styles.num} glass-backround inset-white-icon backdrop-blur-md`}>{pad(i + 1)}</span>
                  <div className={styles.copy}>
                    <h3 className={styles.title}>{c.title}</h3>
                    <p className={styles.desc}>{c.body}</p>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
