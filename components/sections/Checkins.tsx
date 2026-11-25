"use client";

import { useEffect, useRef } from "react";
import { checkins } from "@/lib/content";
import { ArrowIcon } from "@/components/ui/icons";
import { Check } from "lucide-react";
import styles from "./Checkins.module.css";

const WEEK = ["M", "T", "W", "T", "F", "S", "S"];

/* Illustrative graph shapes (viewBox 400 x 180). No values: there is no client
   data behind them, they only show the idea. MARK is where Rahul steps in. */
const HISTORY = "M0 150 C40 140 60 104 105 102 S160 118 190 95 S235 52 260 55";
const FORECAST = "M260 55 C295 70 305 128 335 130 S380 108 398 94";
const ADJUSTED = "M260 55 C292 60 316 48 345 36 S384 22 398 16";

/* Bento where every tile acts out its line. The loops run only while the
   section is on screen; without that (or with reduced motion) each tile rests
   in its finished state. */
export default function Checkins() {
  const t = checkins.tiles;
  const bento = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bento.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.toggleAttribute("data-live", entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} id="checkins">
      <div className="shell">
        <div className={styles.bento} ref={bento}>
          {/* lime feature tile: the form filling itself in */}
          <article className={`${styles.tile} ${styles.lime}`}>
            <span className={styles.kicker}>{checkins.lead}</span>
            <h2 className={styles.title}>{checkins.heading.replace("check-in", "check‑in")}</h2>
            <p className={styles.copy}>{checkins.body}</p>

            <div className={`${styles.form} backdrop-blur-md`} aria-hidden="true">
              {t.form.fields.map((f, i) => (
                <div className={styles.field} key={f.label} style={{ "--v": f.fill, "--d": `${i * 0.7}s` } as React.CSSProperties}>
                  <span>{f.label}</span>
                  <span className={styles.rail}>
                    <span className={styles.fill} />
                    <span className={styles.carriage}><span className={styles.knob} /></span>
                  </span>
                </div>
              ))}
              <span className={styles.sent}>
                <i><Check size={14} strokeWidth={3} /></i>
                {t.form.sent}
              </span>
            </div>

            <div className={styles.actions}>
              <a className="btn btn--dark" href={checkins.formUrl} target="_blank" rel="noopener">
                {checkins.cta}
                <ArrowIcon size={16} />
              </a>
              <span className={styles.note}>{checkins.ctaNote}</span>
            </div>
          </article>

          {/* stopwatch + week */}
          <article className={`${styles.tile} ${styles.tint}`}>
            <div className={styles.watch}>
              <svg viewBox="0 0 120 132" aria-hidden="true">
                <rect x="52" y="2" width="16" height="8" rx="2" className={styles.crown} />
                <rect x="57" y="9" width="6" height="9" className={styles.crown} />
                <circle cx="60" cy="72" r="52" className={styles.ringBase} />
                <circle cx="60" cy="72" r="52" className={styles.ringRun} pathLength={100} transform="rotate(-90 60 72)" />
              </svg>
              <p>
                <strong>{t.time.value}</strong>
                <span>{t.time.unit}</span>
              </p>
            </div>
            <span className="sr-only">{t.time.label}</span>
            <div className={styles.week} aria-hidden="true">
              {WEEK.map((d, i) => (
                <span key={i} className={i === 4 ? styles.dayOn : styles.day} style={{ "--d": `${i * 0.35}s` } as React.CSSProperties}>{d}</span>
              ))}
            </div>
          </article>

          {/* a question, typing, the reply */}
          <article className={`${styles.tile} ${styles.chat}`}>
            <header className={styles.who}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.chat.avatar} alt="" loading="lazy" />
              <span>
                <strong>{t.chat.name}</strong>
                <em>{t.personal}</em>
              </span>
            </header>
            <div className={styles.thread} aria-hidden="true">
              <p className={`${styles.msg} ${styles.ask}`}>{t.chat.question}</p>
              <div className={styles.answer}>
                <span className={styles.typing}><i /><i /><i /></span>
                <p className={`${styles.msg} ${styles.reply}`}>{t.chat.reply}</p>
              </div>
              <p className={`${styles.msg} ${styles.ask} ${styles.thanks}`}>{t.chat.thanks}</p>
            </div>
          </article>

          {/* the plan bending back up */}
          <article className={`${styles.tile} ${styles.line}`}>
            <h3 className={styles.h3}>{t.adjust.title}</h3>
            <p className={styles.small}>{t.adjust.body}</p>
            <div className={styles.graph} aria-hidden="true">
              <svg className={styles.hist} viewBox="0 0 400 180" preserveAspectRatio="none">
                <path d={`${HISTORY} V180 H0 Z`} className={styles.area} />
                <path d={HISTORY} className={styles.stroke} />
              </svg>
              <svg className={styles.fore} viewBox="0 0 400 180" preserveAspectRatio="none">
                <path d={FORECAST} className={styles.dashed} />
              </svg>
              <svg className={styles.adj} viewBox="0 0 400 180" preserveAspectRatio="none">
                <path d={ADJUSTED} className={styles.stroke} />
              </svg>
              <span className={styles.mark} />
            </div>
            <div className={styles.legend} aria-hidden="true">
              <span><i className={styles.keyDash} />{t.adjust.forecast}</span>
              <span><i className={styles.keySolid} />{t.adjust.adjusted}</span>
            </div>
          </article>

          {/* first test vs re-test */}
          <article className={`${styles.tile} ${styles.dark}`}>
            <h3 className={styles.h3}>{t.measured.title}</h3>
            <p className={styles.small}>{t.measured.body}</p>
            <div className={styles.bars} aria-hidden="true">
              {t.measured.joints.map((j, i) => (
                <div className={styles.joint} key={j.label} style={{ "--a": j.first, "--b": j.retest, "--d": `${i * 0.18}s` } as React.CSSProperties}>
                  <span className={styles.pair}><i className={styles.barA} /><i className={styles.barB} /></span>
                  <span>{j.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.legend} aria-hidden="true">
              <span><i className={styles.keyA} />{t.measured.first}</span>
              <span><i className={styles.keyB} />{t.measured.retest}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
