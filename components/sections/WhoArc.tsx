"use client";

import { useRef, useState } from "react";
import { RotateCcw, Gauge, TrendingUp, type LucideIcon } from "lucide-react";
import { who } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./WhoArc.module.css";

const ICONS: LucideIcon[] = [RotateCcw, Gauge, TrendingUp];
const pad = (n: number) => String(n).padStart(2, "0");

/* One pinned, scroll-scrubbed sequence — identical on every width. The track
   is (count)x tall; the stage sticks for its height and the active card
   cross-fades with the next as you scroll. No arc, no overlap. */
export default function WhoArc() {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const count = who.cards.length;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      if (cards.length < 2) return;

      // reduced motion: everything visible, no pin, no scrub
      if (reduce) {
        gsap.set(cards, { opacity: 1, yPercent: 0 });
        root.current?.setAttribute("data-static", "true");
        return;
      }

      const op = cards.map((c) => gsap.quickSetter(c, "opacity"));
      const ty = cards.map((c) => gsap.quickSetter(c, "yPercent"));
      cards.forEach((_, i) => { op[i](i === 0 ? 1 : 0); ty[i](i === 0 ? 0 : 6); });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress * (count - 1); // 0 .. count-1
            // fade THROUGH blank: each card holds a plateau, then clears out
            // before the next fades in, so two cards never overlap.
            cards.forEach((_, i) => {
              const d = p - i;
              const o = gsap.utils.clamp(0, 1, 1 - (Math.abs(d) - 0.12) / 0.34);
              op[i](o);
              ty[i](gsap.utils.clamp(-14, 14, d * -14));
            });
            if (fillRef.current) fillRef.current.style.transform = `scaleY(${self.progress})`;
            setActive(Math.round(p));
          },
        },
      });
      // a throwaway tween gives the timeline a length so scrub has something to track
      tl.to({}, { duration: 1 });
    },
    { scope: root },
  );

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const range = track.offsetHeight - window.innerHeight;
    const top = track.offsetTop + (index / Math.max(count - 1, 1)) * range;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className={styles.section} id="who" ref={root}>
      <div className={styles.track} ref={trackRef} style={{ height: `${count * 100}vh` }}>
        <div className={styles.sticky}>
          <div className={`shell ${styles.inner}`}>
            <div className={styles.lead}>
              <span className={styles.eyebrow}>{who.lead}</span>
              <h2 className={`t-h2 ${styles.heading}`}>
                Built for people <em className="ital">done guessing</em>.
              </h2>

              <ol className={styles.rail} aria-label="Who this is for">
                <span className={styles.railTrack} aria-hidden="true">
                  <span className={styles.railFill} ref={fillRef} />
                </span>
                {who.cards.map((c, i) => (
                  <li key={c.title}>
                    <button
                      type="button"
                      className={`${styles.tick} ${i === active ? styles.tickOn : ""}`}
                      onClick={() => goTo(i)}
                      aria-current={i === active ? "step" : undefined}
                    >
                      <span className={styles.tickNum}>{pad(i + 1)}</span>
                      <span className={styles.tickLabel}>{c.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.stage}>
              <span className={styles.ghost} aria-hidden="true">{pad(active + 1)}</span>
              {who.cards.map((c, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <article className={styles.card} key={c.title}>
                    <span className={styles.chip}><Icon size={24} strokeWidth={2} /></span>
                    <h3 className={styles.title}>{c.title}</h3>
                    <p className={styles.desc}>{c.body}</p>
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
