"use client";

import { useRef, useState } from "react";
import { diagnostic } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./Diagnostic.module.css";

/* Stylised body, viewBox 360 x 560. Joint nodes sit on the figure's right
   side (and the spine), labels hang in a clean gutter at x = 240. */
const NODES = [
  { x: 158, y: 500 }, // 0 Ankle
  { x: 160, y: 388 }, // 1 Knee
  { x: 156, y: 282 }, // 2 Hip
  { x: 130, y: 226 }, // 3 Lower back
  { x: 130, y: 162 }, // 4 Mid-back
  { x: 172, y: 116 }, // 5 Shoulder
];
const LABEL_X = 240;

type P = { x: number; y: number };
// a curve from the cause to the symptom, bowing out to the right of the body
const link = (a: P, b: P) => {
  const bow = 46;
  const x = Math.max(a.x, b.x) + bow;
  return `M ${a.x} ${a.y} C ${x} ${a.y}, ${x} ${b.y}, ${b.x} ${b.y}`;
};

function headingParts(s: string) {
  return s.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, i) =>
    seg.startsWith("*") && seg.endsWith("*") ? <em key={i}>{seg.slice(1, -1)}</em> : <span key={i}>{seg}</span>,
  );
}

export default function Diagnostic() {
  const root = useRef<HTMLElement>(null);
  const linkRef = useRef<SVGPathElement>(null);
  const [selected, setSelected] = useState(0);
  const sym = diagnostic.symptoms[selected];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const path = linkRef.current;
      if (path && !reduce) {
        const len = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" });
      }
      if (!reduce) {
        gsap.from(`.${styles.readout} > *`, { y: 10, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" });
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
          <p className={styles.sub}>{diagnostic.sub}</p>

          <div className={styles.picker} role="tablist" aria-label="Where does it hurt?">
            {diagnostic.symptoms.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={i === selected}
                className={`${styles.pill} ${i === selected ? styles.pillActive : ""}`}
                onClick={() => setSelected(i)}
              >
                <span className={styles.pillNum}>{i + 1}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.scene}>
          <span className={styles.tag}>Kinetic chain</span>
          <svg
            className={styles.svg}
            viewBox="0 0 360 560"
            role="img"
            aria-label={`${sym.label}: the real cause is ${sym.causeLabel}.`}
          >
            {/* body — a real front-facing render when provided, else the silhouette.
                Drop a transparent-background PNG in public/img/ and set
                diagnostic.bodyImage; the joint coords below are tuned to it. */}
            {diagnostic.bodyImage ? (
              <image
                href={diagnostic.bodyImage}
                className={styles.bodyImage}
                x={6}
                y={4}
                width={256}
                height={552}
                preserveAspectRatio="xMidYMid meet"
              />
            ) : (
              <g className={styles.body}>
                <circle cx="130" cy="48" r="24" />
                <path d="M130 72 V98" className={styles.limb} strokeWidth="14" />
                <path d="M88 116 H172" className={styles.limb} strokeWidth="24" />
                <path d="M92 116 L168 116 L158 282 L102 282 Z" className={styles.torso} />
                <path d="M82 124 L70 228 L74 318" className={styles.limb} strokeWidth="16" />
                <path d="M178 124 L190 228 L186 318" className={styles.limb} strokeWidth="16" />
                <path d="M104 282 L100 388 L102 500" className={styles.limb} strokeWidth="28" />
                <path d="M156 282 L160 388 L158 500" className={styles.limb} strokeWidth="28" />
                <path d="M90 514 H118 M142 514 H172" className={styles.limb} strokeWidth="12" />
              </g>
            )}

            {/* the cause -> symptom link */}
            <path ref={linkRef} d={link(NODES[sym.cause], NODES[sym.feel])} className={styles.link} />

            {NODES.map((n, i) => {
              const isFeel = i === sym.feel;
              const isCause = i === sym.cause;
              const on = isFeel || isCause;
              return (
                <g key={i}>
                  <path
                    d={`M ${n.x + 12} ${n.y} H ${LABEL_X - 8}`}
                    className={`${styles.leader} ${on ? styles.leaderOn : ""}`}
                  />
                  {isCause && <circle cx={n.x} cy={n.y} r="15" className={styles.causeRing} />}
                  {isFeel && <circle cx={n.x} cy={n.y} r="15" className={styles.feelRing} />}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={on ? 8 : 5.5}
                    className={isFeel ? styles.feelDot : isCause ? styles.causeDot : styles.dot}
                  />
                  <text x={LABEL_X} y={n.y + 5} className={`${styles.label} ${on ? styles.labelOn : ""}`}>
                    {diagnostic.joints[i]}
                  </text>
                </g>
              );
            })}
          </svg>

          <ul className={styles.legend} aria-hidden="true">
            <li><i className={styles.keyFeel} />You feel it</li>
            <li><i className={styles.keyCause} />The real cause</li>
          </ul>
        </div>

        <div className={styles.readout} key={selected} aria-live="polite">
          <div className={styles.rRow}>
            <span className={styles.rKey}><i className={styles.keyFeel} />You feel it</span>
            <span className={styles.rVal}>{diagnostic.joints[sym.feel]}</span>
          </div>
          <div className={styles.rRow}>
            <span className={styles.rKey}><i className={styles.keyCause} />The real cause</span>
            <span className={`${styles.rVal} ${styles.rCause}`}>{sym.causeLabel}</span>
          </div>
          <p className={styles.rNote}>{sym.note}</p>
        </div>
      </div>
    </section>
  );
}
