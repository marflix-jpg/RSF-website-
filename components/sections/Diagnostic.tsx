"use client";

import { useRef, useState } from "react";
import { diagnostic } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./Diagnostic.module.css";

const NODES = [
  { x: 118, y: 495 }, // 0 Ankle
  { x: 168, y: 405 }, // 1 Knee
  { x: 138, y: 315 }, // 2 Hip
  { x: 188, y: 225 }, // 3 Lower back
  { x: 150, y: 135 }, // 4 Mid-back
  { x: 200, y: 50 },  // 5 Shoulder
];

type P = { x: number; y: number };
const seg = (a: P, b: P) => {
  const my = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
};
const spine = () => {
  let d = `M ${NODES[0].x} ${NODES[0].y}`;
  for (let i = 1; i < NODES.length; i++) {
    const p0 = NODES[i - 1], p1 = NODES[i], my = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${my}, ${p1.x} ${my}, ${p1.x} ${p1.y}`;
  }
  return d;
};

function headingParts(s: string) {
  return s.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, i) =>
    seg.startsWith("*") && seg.endsWith("*") ? <em key={i}>{seg.slice(1, -1)}</em> : <span key={i}>{seg}</span>,
  );
}

export default function Diagnostic() {
  const root = useRef<HTMLElement>(null);
  const segRef = useRef<SVGPathElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const sym = diagnostic.symptoms[selected];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const path = segRef.current;
      if (path) {
        const len = path.getTotalLength();
        if (reduce) {
          gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
        } else {
          gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" });
        }
      }
      if (readoutRef.current && !reduce) {
        gsap.from(readoutRef.current.children, { y: 12, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
      }
    },
    { scope: root, dependencies: [selected] },
  );

  return (
    <section className={styles.section} id="cause" ref={root}>
      <div className={`shell ${styles.grid}`}>
        <div className={styles.copy}>
          <span className={styles.marker}>{diagnostic.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>{headingParts(diagnostic.heading)}</h2>
          <p className={`t-lead ${styles.sub}`}>{diagnostic.sub}</p>

          <div className={styles.picker} role="tablist" aria-label="Symptom">
            {diagnostic.symptoms.map((s, i) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={i === selected}
                className={`${styles.pill} ${i === selected ? styles.pillActive : ""}`}
                onClick={() => setSelected(i)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className={styles.readout} ref={readoutRef} key={selected}>
            <div className={styles.rLine}>
              <span className={styles.rKey}>You feel it</span>
              <span className={styles.rFeel}>{diagnostic.joints[sym.feel]}</span>
            </div>
            <div className={styles.rLine}>
              <span className={styles.rKey}>The real cause</span>
              <span className={styles.rCause}>{sym.causeLabel}</span>
            </div>
            <p className={styles.rNote}>{sym.note}</p>
          </div>
        </div>

        <div className={styles.scene}>
          <span className={styles.tag}>Kinetic chain</span>
          <svg className={styles.svg} viewBox="0 0 340 540" role="img" aria-label={`${sym.label}: the cause is ${sym.causeLabel}.`}>
            <defs>
              <linearGradient id="segGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="var(--color-signal-deep)" />
                <stop offset="0.5" stopColor="var(--color-signal)" />
                <stop offset="1" stopColor="var(--color-signal-bright)" />
              </linearGradient>
            </defs>

            <path d={spine()} className={styles.spine} />
            <path ref={segRef} d={seg(NODES[sym.cause], NODES[sym.feel])} className={styles.seg} />

            {NODES.map((n, i) => {
              const isFeel = i === sym.feel;
              const isCause = i === sym.cause;
              const dim = !isFeel && !isCause;
              return (
                <g key={i} className={`${styles.node} ${dim ? styles.nodeDim : ""}`} transform={`translate(${n.x} ${n.y})`}>
                  {isFeel && <circle r="9" className={styles.feelPulse} />}
                  {isCause && <circle r="15" className={styles.causeRing} />}
                  <circle r={isFeel || isCause ? 7 : 6} className={isFeel ? styles.feelDot : isCause ? styles.causeDot : styles.dot} />
                  <text
                    x="18"
                    y="5"
                    className={`${styles.label} ${isFeel ? styles.feelLabel : ""} ${isCause ? styles.causeLabel : ""}`}
                  >
                    {diagnostic.joints[i]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
