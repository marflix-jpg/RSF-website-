"use client";

import { useEffect, useRef, useState } from "react";
import { results } from "@/lib/content";
import type { ResultPair } from "@/lib/content";
import styles from "./Results.module.css";

/* Local-preview stand-ins, so the slider can be judged before real photos
   arrive. They are plain labelled blocks and are never part of a production
   build: with no real pairs, the live site shows no section at all. */
const block = (label: string, from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs><rect width='800' height='1000' fill='url(#g)'/><text x='400' y='490' fill='#fff' font-family='sans-serif' font-size='54' font-weight='700' text-anchor='middle'>${label}</text><text x='400' y='550' fill='#fff' font-family='sans-serif' font-size='30' text-anchor='middle'>placeholder photo</text></svg>`,
  )}`;

const PREVIEW: ResultPair[] =
  process.env.NODE_ENV === "production"
    ? []
    : [1, 2, 3, 4, 5].map((n) => ({
        tag: `Client ${n}`,
        caption: "Goal and timeframe go here",
        before: block(`Before ${n}`, "#41595a", "#1c2b2b"),
        after: block(`After ${n}`, "#1bbcbc", "#0f5f60"),
      }));

export default function Results() {
  const pairs = results.pairs.length ? results.pairs : PREVIEW;
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const stage = useRef<HTMLDivElement>(null);
  const hint = useRef(0);
  const touched = useRef(false);

  const stopHint = () => {
    touched.current = true;
    cancelAnimationFrame(hint.current);
  };

  // one gentle left-right sweep the first time it is seen, to show it drags
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const k = Math.min((now - start) / 2200, 1);
          if (touched.current) return;
          setPos(50 + Math.sin(k * Math.PI * 2) * 28);
          if (k < 1) hint.current = requestAnimationFrame(tick);
        };
        hint.current = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(hint.current);
    };
  }, []);

  if (pairs.length === 0) return null;
  const pair = pairs[Math.min(active, pairs.length - 1)];

  const choose = (i: number) => {
    stopHint();
    setActive(i);
    setPos(50);
  };

  return (
    <section className={styles.section} id="results">
      <div className={`shell ${styles.layout}`}>
        <header className={styles.head}>
          <span className={styles.marker}>{results.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>{results.heading}</h2>
          <p className={styles.hint}>{results.hint}</p>
        </header>

        {/* the range input is the real control: keyboard, touch, screen readers */}
        <div className={styles.stage} ref={stage} style={{ ["--pos" as string]: `${pos}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pair.after} alt={`After: ${pair.caption}`} loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.before} src={pair.before} alt={`Before: ${pair.caption}`} loading="lazy" />
          <span className={`${styles.badge} ${styles.badgeL} backdrop-blur-md`}>Before</span>
          <span className={`${styles.badge} ${styles.badgeR} backdrop-blur-md`}>After</span>
          <span className={styles.handle} aria-hidden="true" />
          <input
            className={styles.range}
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={pos}
            onPointerDown={stopHint}
            onKeyDown={stopHint}
            onChange={(e) => {
              stopHint();
              setPos(Number(e.target.value));
            }}
            aria-label={`Reveal before and after: ${pair.tag}, ${pair.caption}`}
          />
        </div>

        <ul className={styles.list}>
          {pairs.map((p, i) => (
            <li key={p.before}>
              <button type="button" className={`${styles.item} ${i === active ? styles.on : ""}`} onClick={() => choose(i)} aria-pressed={i === active}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.after} alt="" loading="lazy" />
                <span>
                  <strong>{p.tag}</strong>
                  <em>{p.caption}</em>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
