"use client";

import { useRef } from "react";
import { method } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { RotateCcw } from "lucide-react";
import { ArrowIcon } from "@/components/ui/icons";
import styles from "./Method.module.css";

const pad = (n: number) => String(n).padStart(2, "0");
const STEP_IMAGES = ["assess", "program", "checkin", "retest"].map((n) => `/img/rsf/step-${n}.jpg`);

export default function Method() {
  const root = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      if (reduce) { gsap.set(cards, { opacity: 1, clearProps: "transform" }); return; }

      gsap.from(cards, {
        opacity: 0, y: 48, scale: 0.96, duration: 0.6, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
      gsap.from(`.${styles.loopBack}`, {
        opacity: 0, y: 18, duration: 0.5, ease: "power3.out",
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
                  {/* image fills the top; the folder body sits over its lower half */}
                  <div className={styles.media}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={STEP_IMAGES[i]} alt="" />
                  </div>

                  <a className={`${styles.arrow} glass-backround inset-white backdrop-blur-lg`} href="#packages" aria-label={`Step ${s.n}: ${s.title}`}>
                    <ArrowIcon size={16} />
                  </a>

                  {/* the folder front panel (tab + number + body). It slides DOWN
                      on hover to reveal the image — like opening a folder. */}
                  <div className={styles.folder}>
                    <span className={styles.tab} aria-hidden="true" />
                    <span className={styles.num}>{pad(s.n)}</span>
                  </div>

                  {/* title + description are a SEPARATE layer pinned to the bottom,
                      so they stay put while the folder opens. */}
                  <div className={styles.text}>
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
