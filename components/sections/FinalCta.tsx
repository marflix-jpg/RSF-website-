import { finalCta, hero } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";
import styles from "./FinalCta.module.css";

// "…what's actually *limiting* you." → the starred word takes the accent.
function headingParts(s: string) {
  return s.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, i) =>
    seg.startsWith("*") && seg.endsWith("*")
      ? <em key={i} className={styles.accent}>{seg.slice(1, -1)}</em>
      : <span key={i}>{seg}</span>,
  );
}

export default function FinalCta() {
  return (
    <section className={styles.section} id="contact">
      <div className={`shell ${styles.inner}`}>
        <div className={styles.card}>
          {hero.vsl.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.media} src={hero.vsl.poster} alt="" />
          ) : null}
          <div className={styles.scrim} />

          <div className={styles.strip}>
            <div className={styles.copy}>
              <h2 className={styles.heading}>{headingParts(finalCta.heading)}</h2>
              <p className={styles.body}>{finalCta.body}</p>
            </div>
            <a className="btn btn--white" href={waLink()} target="_blank" rel="noopener">
              <WhatsAppIcon />
              {finalCta.cta}
            </a>
          </div>
        </div>
        <p className={styles.reassure}>{finalCta.reassurance}</p>
      </div>
    </section>
  );
}
