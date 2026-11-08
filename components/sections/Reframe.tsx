"use client";

import { useRef } from "react";
import { reframe } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./Reframe.module.css";

/* Split the statement into words; a *word* becomes the blue accent. */
function buildWords(line: string) {
  return line.split(" ").map((w, i) => {
    const m = w.match(/^(.*)\*([^*]+)\*(.*)$/);
    const inner = m ? (
      <>
        {m[1]}
        <span className={styles.accent}>{m[2]}</span>
        {m[3]}
      </>
    ) : (
      w
    );
    return (
      <span className={styles.word} key={i}>
        {inner}
      </span>
    );
  });
}

export default function Reframe() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const words = q(`.${styles.word}`);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 65%",
          scrub: 0.6,
        },
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.section} id="why" ref={root}>
      <div className={`shell ${styles.inner}`}>
        <span className={styles.marker}>{reframe.lead}</span>
        <p className={styles.statement}>{buildWords(reframe.line)}</p>
        <span className={styles.kicker}>{reframe.kicker}</span>
      </div>
    </section>
  );
}
