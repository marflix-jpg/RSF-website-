import { results } from "@/lib/content";
import styles from "./Results.module.css";

export default function Results() {
  return (
    <section className={`${styles.section} grain`} id="results">
      <div className="shell">
        <div className={styles.head}>
          <div>
            <span className={styles.marker}>{results.lead}</span>
            <h2 className={`t-h2 ${styles.heading}`}>{results.heading}</h2>
          </div>
          <p className={`t-lead ${styles.standfirst}`}>
            Real before-and-afters land here as Rahul sends them. These are placeholders.
          </p>
        </div>

        <div className={styles.tiles}>
          {results.tiles.map((t) => (
            <article className={styles.tile} key={t.outcome} tabIndex={0}>
              {t.img ? <img src={t.img} alt={t.outcome} /> : null}
              <span className={styles.tag}>{t.tag}</span>
              <div className={styles.meta}>
                <h3 className={styles.outcome}>{t.outcome}</h3>
                <p className={styles.detail}>{t.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
