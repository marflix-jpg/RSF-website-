import { Star } from "lucide-react";
import { testimonials, site, hero } from "@/lib/content";
import styles from "./Reviews.module.css";

type Item = (typeof testimonials.items)[number];

function Stars({ n }: { n: number }) {
  return (
    <span className={styles.stars} aria-label={`${n} out of 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

/* One glass card: name and stars on a single row, then a two-line quote.
   Measured: 368x112, radius 24, bg #ffffff33, 1px #ffffffcc top+bottom,
   inset 0 0 40px #ffffff33, blur(12px), pad 16/24. */
function Card({ t }: { t: Item }) {
  return (
    <figure className={styles.card}>
      <div className={styles.top}>
        <figcaption className={styles.name}>{t.name}</figcaption>
        <Stars n={t.rating} />
      </div>
      <blockquote className={styles.quote}>{t.quote}</blockquote>
    </figure>
  );
}

/* A row that drifts sideways for ever: the set is rendered twice and the
   track slides by exactly half its width, so the loop has no seam. */
function Row({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  const set = [...items, ...items, ...items];
  return (
    <div className={styles.row}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {set.map((t, i) => (
          <Card key={`a${i}`} t={t} />
        ))}
        {set.map((t, i) => (
          <div key={`b${i}`} aria-hidden="true" className={styles.clone}>
            <Card t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

function headingParts(s: string) {
  return s.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, i) =>
    seg.startsWith("*") && seg.endsWith("*") ? <em key={i}>{seg.slice(1, -1)}</em> : <span key={i}>{seg}</span>,
  );
}

export default function Reviews() {
  const { items } = testimonials;
  return (
    <section className={styles.section} id="reviews">
      <div className={`shell ${styles.head}`}>
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

      <div className={styles.band}>
        {hero.vsl.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.bg} src={hero.vsl.poster} alt="" />
        ) : null}
        <div className={styles.scrim} />
        <div className={styles.rows}>
          <Row items={items} />
          <Row items={[...items].reverse()} reverse />
        </div>
      </div>
    </section>
  );
}
