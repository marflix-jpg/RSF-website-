"use client";

import { useState } from "react";
import { results } from "@/lib/content";
import type { ResultPair } from "@/lib/content";
import styles from "./Results.module.css";

/* A drag-to-reveal before/after. The range input is the real control, so it
   works with keyboard, touch and screen readers. */
function Compare({ pair }: { pair: ResultPair }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className={styles.pair}>
      <div className={styles.stage} style={{ ["--pos" as string]: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.after} src={pair.after} alt={`After: ${pair.caption}`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.before} src={pair.before} alt={`Before: ${pair.caption}`} />
        <span className={`${styles.badge} ${styles.badgeL} backdrop-blur-md`}>Before</span>
        <span className={`${styles.badge} ${styles.badgeR} backdrop-blur-md`}>After</span>
        <span className={styles.handle} aria-hidden="true" />
        <input
          className={styles.range}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal before and after: ${pair.caption}`}
        />
      </div>
      <figcaption className={styles.cap}>
        <span className={styles.tag}>{pair.tag}</span>
        <span>{pair.caption}</span>
      </figcaption>
    </figure>
  );
}

export default function Results() {
  // No photos yet means no section: an empty gallery reads as broken.
  if (results.pairs.length === 0) return null;
  return (
    <section className={styles.section} id="results">
      <div className="shell">
        <header className={styles.head}>
          <span className={styles.marker}>{results.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>{results.heading}</h2>
        </header>
        <div className={styles.grid}>
          {results.pairs.map((p) => (
            <Compare key={p.before} pair={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
