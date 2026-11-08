import { about } from "@/lib/content";
import LanyardBadge from "@/components/ui/LanyardBadge";
import styles from "./MeetRahul.module.css";

function headingParts(s: string) {
  return s.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, i) =>
    seg.startsWith("*") && seg.endsWith("*") ? <em key={i}>{seg.slice(1, -1)}</em> : <span key={i}>{seg}</span>,
  );
}

export default function MeetRahul() {
  return (
    <section className={styles.section} id="about">
      {/* full-section draggable stage — the badge roams freely across it */}
      <div className={styles.stage}>
        <LanyardBadge />
      </div>

      <div className={`shell ${styles.content}`}>
        <div className={styles.textCol}>
          <span className={styles.marker}>{about.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>{headingParts(about.heading)}</h2>
          <div className={styles.body}>
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className={styles.stats}>
            {about.stats.map((s) => (
              <div className={styles.stat} key={s.k}>
                <span className={styles.statK}>{s.k}</span>
                <span className={styles.statV}>{s.v}</span>
              </div>
            ))}
          </div>

          <div className={styles.sign}>
            <span className={styles.signName}>{about.name}</span>
            <span className={styles.signRole}>{about.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
