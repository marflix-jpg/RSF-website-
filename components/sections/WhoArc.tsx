"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { RotateCcw, Gauge, TrendingUp, type LucideIcon } from "lucide-react";
import { who } from "@/lib/content";
import styles from "./WhoArc.module.css";

const ICONS: LucideIcon[] = [RotateCcw, Gauge, TrendingUp];
const SPACING = 26; // degrees between steps on the arc
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export default function WhoArc() {
  // Phones get a clean stacked list; the pinned scroll-arc is desktop only.
  // The arc's hooks live in DesktopArc so they never mount (and never warn
  // about an unhydrated scroll target) on mobile.
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => setMobile(window.matchMedia("(max-width: 899px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (mobile === null || mobile) return <WhoList />;
  return <DesktopArc />;
}

/* ── Mobile / pre-hydration: a clean stacked list ───────────────────────── */
function WhoList() {
  return (
    <section className={styles.section} id="who">
      <div className={`shell ${styles.mobile}`}>
        <h2 className={`t-h2 ${styles.heading}`}>
          Built for people <em className="ital">done guessing</em>.
        </h2>
        <ul className={styles.mList}>
          {who.cards.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={item.title} className={styles.mItem}>
                <div className={styles.mHead}>
                  <span className={styles.mNum}>{pad(i + 1)}</span>
                  <span className={styles.iconChip}>
                    <Icon size={20} strokeWidth={2} />
                  </span>
                </div>
                <h3 className={styles.mTitle}>{item.title}</h3>
                <p className={styles.desc}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── Desktop: scroll-pinned arc stepper ─────────────────────────────────── */
function DesktopArc() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const count = who.cards.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const rawPosition = useTransform(scrollYProgress, [0, 1], [0, Math.max(count - 1, 0)]);
  const springPosition = useSpring(rawPosition, { stiffness: 220, damping: 32, mass: 0.6 });
  const position = reduce ? rawPosition : springPosition;
  const wheelRotation = useTransform(position, (v) => -v * SPACING);
  const wheelTransform = useMotionTemplate`rotate(${wheelRotation}deg)`;

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  useMotionValueEvent(rawPosition, "change", (v) => {
    const next = Math.round(Math.min(Math.max(v, 0), count - 1));
    if (next === active) return;
    setDirection(next > active ? 1 : -1);
    setActive(next);
  });

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const range = track.offsetHeight - window.innerHeight;
    const top = track.offsetTop + (index / Math.max(count - 1, 1)) * range;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const step = who.cards[active];
  const ActiveIcon = ICONS[active % ICONS.length];
  const shift = reduce ? 0 : 24;

  return (
    <section className={styles.section} id="who">
      <div className={styles.track} ref={trackRef} style={{ height: `${count * 100}vh` }}>
        <div className={styles.sticky}>
          <div className={`shell ${styles.inner}`}>
            <div className={styles.lead}>
              <h2 className={`t-h2 ${styles.heading}`}>
                Built for people <em className="ital">done guessing</em>.
              </h2>
            </div>

            <div className={styles.stage} role="group" aria-label="Who this is for">
              <div aria-hidden className={styles.arc} />

              <motion.div className={styles.wheel} style={{ transform: wheelTransform }}>
                {who.cards.map((item, index) => (
                  <ArcMarker
                    key={item.title}
                    index={index}
                    position={position}
                    spacing={SPACING}
                    active={index === active}
                    onSelect={() => goTo(index)}
                    label={item.title}
                  />
                ))}
              </motion.div>

              <div aria-live="polite" className={styles.content}>
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={active}
                    className={styles.card}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, transform: `translateY(${d * shift}px)`, filter: "blur(4px)" }),
                      center: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
                      exit: (d: number) => ({ opacity: 0, transform: `translateY(${d * -shift}px)`, filter: "blur(4px)" }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  >
                    <span className={styles.iconChip}>
                      <ActiveIcon size={24} strokeWidth={2} />
                    </span>
                    <h3 className={styles.title}>{step.title}</h3>
                    <p className={styles.desc}>{step.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArcMarker({
  index,
  position,
  spacing,
  active,
  onSelect,
  label,
}: {
  index: number;
  position: MotionValue<number>;
  spacing: number;
  active: boolean;
  onSelect: () => void;
  label: string;
}) {
  const distance = useTransform(position, (v) => Math.min(Math.abs(v - index), 2));
  const scale = useTransform(distance, [0, 1, 2], [1, 0.52, 0.52]);
  const opacity = useTransform(distance, [0, 1, 2], [1, 0.2, 0]);
  const nodeTransform = useMotionTemplate`translateY(-50%) scale(${scale})`;

  return (
    <div
      className={styles.markerSlot}
      style={{ transform: `rotate(${index * spacing}deg) translateX(var(--arc-radius))` }}
    >
      <span aria-hidden className={`${styles.dot} ${active ? styles.dotActive : ""}`} />
      <motion.button
        type="button"
        onClick={onSelect}
        aria-current={active ? "step" : undefined}
        aria-label={`Step ${index + 1}: ${label}`}
        style={{ opacity, transform: nodeTransform }}
        className={`${styles.node} ${active ? styles.nodeActive : ""}`}
      >
        {pad(index + 1)}
      </motion.button>
    </div>
  );
}
