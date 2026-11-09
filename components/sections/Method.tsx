"use client";

import { useRef } from "react";
import { method } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./Method.module.css";

export default function Method() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: `.${styles.steps}`, start: "top 78%", end: "bottom 80%", scrub: 0.6 },
      });
      tl.to(`.${styles.fill}`, { scaleX: 1, ease: "none", duration: 4 }, 0);
      q(`.${styles.num}`).forEach((n, i) => {
        tl.to(n, { color: "#1bbcbc", duration: 0.6 }, i * 1 + 0.4);
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.section} id="method" ref={root}>
      <div className="shell">
        <header className={styles.head}>
          <span className={styles.marker}>{method.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>{method.heading}</h2>
          <p className={`t-lead ${styles.standfirst}`}>{method.standfirst}</p>
        </header>

        <div className={styles.track}>
          <div className={styles.fill} />
        </div>

        <div className={styles.steps}>
          {method.steps.map((s) => (
            <div className={styles.step} key={s.n}>
              <span className={styles.num}>{String(s.n).padStart(2, "0")}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
