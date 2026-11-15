import { checkins } from "@/lib/content";
import { ArrowIcon } from "@/components/ui/icons";
import styles from "./Checkins.module.css";

const WEEK = ["M", "T", "W", "T", "F", "S", "S"];

export default function Checkins() {
  const t = checkins.tiles;
  return (
    <section className={styles.section} id="checkins">
      <div className="shell">
        <div className={styles.bento}>
          {/* lime feature tile */}
          <article className={`${styles.tile} ${styles.lime}`}>
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
            <img src="/img/rahul-portrait.webp" alt="" />
            <div className={styles.scrim} />
            <span className={styles.glass}>{t.personal}</span>
          </article>

          <article className={`${styles.tile} ${styles.line}`}>
            <h3 className={styles.h3}>{t.adjust.title}</h3>
            <p className={styles.small}>{t.adjust.body}</p>
          </article>

          <article className={`${styles.tile} ${styles.dark}`}>
            <h3 className={styles.h3}>{t.measured.title}</h3>
            <p className={styles.small}>{t.measured.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
