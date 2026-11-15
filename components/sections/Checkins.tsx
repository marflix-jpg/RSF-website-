import { checkins } from "@/lib/content";
import { ArrowIcon } from "@/components/ui/icons";
import styles from "./Checkins.module.css";

const WEEK = ["M", "T", "W", "T", "F", "S", "S"];

/* Hand-built glyphs so the bento doesn't read as stock icons. Each animates
   with CSS (and holds still under prefers-reduced-motion). */

function LoopGlyph() {
  return (
    <svg className={styles.gLoop} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M38 24a14 14 0 1 1-4.1-9.9" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M34 6v9h-9" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseGlyph() {
  return (
    <svg className={styles.gPulse} viewBox="0 0 64 32" fill="none" aria-hidden="true">
      <path className={styles.gPulseLine} d="M2 16h12l5-11 8 22 5-14 4 7h22" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TargetGlyph() {
  return (
    <svg className={styles.gTarget} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle className={styles.gRing} cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.4" opacity="0.4" />
      <circle className={styles.gRing} cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2.4" opacity="0.7" />
      <path d="M18 24l4.5 4.5L31 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Checkins() {
  const t = checkins.tiles;
  return (
    <section className={styles.section} id="checkins">
      <div className="shell">
        <div className={styles.bento}>
          {/* lime feature tile */}
          <article className={`${styles.tile} ${styles.lime}`}>
            <span className={styles.loopBadge} aria-hidden="true"><LoopGlyph /></span>
            <span className={styles.kicker}>{checkins.lead}</span>
            <h2 className={styles.title}>{checkins.heading}</h2>
            <p className={styles.copy}>{checkins.body}</p>
            <div className={styles.actions}>
              <a className="btn btn--dark" href={checkins.formUrl} target="_blank" rel="noopener">
                {checkins.cta}
                <ArrowIcon size={16} />
              </a>
              <span className={styles.note}>{checkins.ctaNote}</span>
            </div>
          </article>

          {/* time tile with a week strip */}
          <article className={`${styles.tile} ${styles.tint}`}>
            <div className={styles.week} aria-hidden="true">
              {WEEK.map((d, i) => (
                <span key={i} className={i === 4 ? styles.dayOn : styles.day}>{d}</span>
              ))}
            </div>
            <span className={styles.big}>{t.time.big}</span>
            <p className={styles.small}>{t.time.label}</p>
          </article>

          {/* photo tile */}
          <article className={`${styles.tile} ${styles.photo}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/rahul-walk.webp" alt="" />
            <div className={styles.scrim} />
            <span className={`${styles.glass} backdrop-blur-md`}>{t.personal}</span>
          </article>

          <article className={`${styles.tile} ${styles.line}`}>
            <span className={`${styles.glyph} ${styles.glyphTint}`}><PulseGlyph /></span>
            <h3 className={styles.h3}>{t.adjust.title}</h3>
            <p className={styles.small}>{t.adjust.body}</p>
          </article>

          <article className={`${styles.tile} ${styles.dark}`}>
            <span className={`${styles.glyph} ${styles.glyphDark}`}><TargetGlyph /></span>
            <h3 className={styles.h3}>{t.measured.title}</h3>
            <p className={styles.small}>{t.measured.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
