import { about, credentials } from "@/lib/content";
import styles from "./MeetRahul.module.css";

function headingParts(s: string) {
  return s.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, i) =>
    seg.startsWith("*") && seg.endsWith("*") ? <em key={i}>{seg.slice(1, -1)}</em> : <span key={i}>{seg}</span>,
  );
}

export default function MeetRahul() {
  return (
    <section className={styles.section} id="about">
      <div className={`shell ${styles.grid}`}>
        <figure className={styles.photo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/rahul-portrait.webp" alt="Rahul Chauhan, performance and rehabilitation coach, in the gym" />
          <div className={styles.scrim} />
          <figcaption className={`${styles.plate} backdrop-blur-md`}>
            <span className={styles.plateName}>{about.name}</span>
            <span className={styles.plateRole}>{about.role}</span>
          </figcaption>
          <ul className={styles.chips} aria-label="Credentials">
            {credentials.slice(0, 2).map((c) => (
              <li key={c.k} className="backdrop-blur-md">{c.k}</li>
            ))}
          </ul>
        </figure>

        <div className={styles.copy}>
          <span className={styles.marker}>{about.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>{headingParts(about.heading)}</h2>
          <div className={styles.body}>
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <dl className={styles.stats}>
            {about.stats.map((s) => (
              <div className={styles.stat} key={s.k}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
