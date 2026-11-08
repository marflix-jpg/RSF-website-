import { who } from "@/lib/content";
import styles from "./Who.module.css";

export default function Who() {
  return (
    <section className={styles.section} id="who">
      <div className="shell">
        <div className={styles.head}>
          <span className={styles.marker}>{who.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>Built for people done guessing.</h2>
        </div>
        <div className={styles.grid}>
          {who.cards.map((c, i) => (
            <article className={styles.card} key={c.title}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.body}>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
