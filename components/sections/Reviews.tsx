import { Star } from "lucide-react";
import { testimonials, site } from "@/lib/content";
import styles from "./Reviews.module.css";

function Stars({ n }: { n: number }) {
  return (
    <span className={styles.stars} aria-label={`${n} out of 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

const avatarBg = [
  "linear-gradient(145deg, #3b82f6, #1d3fc4)",
  "linear-gradient(145deg, #2dd4ff, #2358e6)",
  "linear-gradient(145deg, #7c6bff, #2b6bff)",
];

// Render "What clients say after the *first month*." with a Playfair accent.
function headingParts(s: string) {
  return s.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, i) =>
    seg.startsWith("*") && seg.endsWith("*") ? <em key={i}>{seg.slice(1, -1)}</em> : <span key={i}>{seg}</span>,
  );
}

export default function Reviews() {
  return (
    <section className={styles.section} id="reviews">
      <div className="shell">
        <div className={styles.head}>
          <div>
            <span className={styles.marker}>{testimonials.lead}</span>
            <h2 className={`t-h2 ${styles.heading}`}>{headingParts(testimonials.heading)}</h2>
          </div>
          <a className={styles.agg} href={site.instagram.url} target="_blank" rel="noopener">
            <span className={styles.aggStars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className={styles.aggText}>
              <b>5.0</b> from clients on @{site.instagram.handle}
            </span>
          </a>
        </div>

        <div className={styles.grid}>
          {testimonials.items.map((t, i) => (
            <figure className={styles.card} key={t.name}>
              <div className={styles.top}>
                <Stars n={t.rating} />
                <span className={styles.dur}>{t.duration}</span>
              </div>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <figcaption className={styles.foot}>
                <span className={styles.avatar} style={{ background: avatarBg[i % avatarBg.length] }}>
                  {initials(t.name)}
                </span>
                <span className={styles.names}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.meta}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
