"use client";

import { useRef } from "react";
import { method } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { RotateCcw } from "lucide-react";
import { ArrowIcon } from "@/components/ui/icons";
import styles from "./Method.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Method() {
  const root = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      if (reduce) { gsap.set(cards, { opacity: 1, clearProps: "transform" }); return; }

      // fan out: cards start stacked, tilted and low, then deal into place
      gsap.set(cards, { transformOrigin: "bottom center" });
      gsap.from(cards, {
        opacity: 0,
        y: 70,
        rotateZ: (i: number) => (i - (cards.length - 1) / 2) * -5,
        scale: 0.92,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
      });
      gsap.from(`.${styles.loopBack}`, {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 60%" },
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.section} id="method" ref={root}>
      <div className="shell">
        <header className={styles.head}>
          <span className={styles.eyebrow}>{method.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>{method.heading}</h2>
          <p className={styles.standfirst}>{method.standfirst}</p>
        </header>

        <div className={styles.grid} ref={gridRef}>
          {method.steps.map((s, i) => {
            const featured = i === method.steps.length - 1;
            return (
              <article className={`${styles.card} ${featured ? styles.featured : ""}`} key={s.n}>
                <div className={styles.inner}>
                  {/* folder "cover": gradient top with the glass number tab + arrow */}
                  <div className={styles.cover}>
                    <span className={`${styles.tab} backdrop-blur-md`}>
                      <span className={styles.num}>{pad(s.n)}</span>
                    </span>
                    <span className={styles.arrow} aria-hidden="true"><ArrowIcon size={16} /></span>
                  </div>
                  {/* folder "sheet": the body that the tab rises out of */}
                  <div className={styles.sheet}>
                    <h3 className={styles.title}>{s.title}</h3>
                    <p className={styles.body}>{s.body}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.loopBack}>
          <span className={styles.loopIcon}><RotateCcw size={18} strokeWidth={2.2} /></span>
          <span>Re-measure, then round the loop again</span>
        </div>
      </div>
    </section>
  );
}
