"use client";

import { useRef } from "react";
import { method } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { RotateCcw } from "lucide-react";
import styles from "./Method.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Method() {
  const root = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.step}`);
      if (reduce) { gsap.set(cards, { opacity: 1, y: 0 }); return; }

      // the connecting rail draws as the row scrolls through
      gsap.fromTo(
        flowRef.current,
        { "--p": 0 },
        {
          "--p": 1,
          ease: "none",
          scrollTrigger: { trigger: flowRef.current, start: "top 72%", end: "bottom 78%", scrub: 0.5 },
        },
      );

      // cards rise and the loop-back chip lands last
      gsap.from([...cards, `.${styles.loopBack}`], {
        opacity: 0,
        y: 26,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: flowRef.current, start: "top 72%" },
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

        <div className={styles.flow} ref={flowRef}>
          <span className={styles.rail} aria-hidden="true"><span className={styles.railFill} /></span>

          {method.steps.map((s) => (
            <article className={styles.step} key={s.n}>
              <span className={styles.badge}>{pad(s.n)}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </article>
          ))}

          <div className={styles.loopBack}>
            <span className={styles.loopIcon}><RotateCcw size={18} strokeWidth={2.2} /></span>
            <span>Re-measure, then round the loop again</span>
          </div>
        </div>
      </div>
    </section>
  );
}
