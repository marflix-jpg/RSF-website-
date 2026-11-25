import { Star } from "lucide-react";
import google from "@/lib/google-reviews.json";
import { ArrowIcon } from "@/components/ui/icons";
import styles from "./Reviews.module.css";

/* Real Google reviews, shown as two drifting glass rows. Each card shows a
   SHORT excerpt and links out to the full review on Google. Nothing invented;
   source is lib/google-reviews.json. */

type Review = (typeof google.reviews)[number];

function excerpt(text: string, max = 150) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).trimEnd() + "…";
}

function Stars({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <span className={styles.stars} role="img" aria-label={`${n} out of 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.9 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function Card({ r }: { r: Review }) {
  return (
    <figure className={`${styles.card} backdrop-blur-md`}>
      <div className={styles.top}>
        <span className={styles.avatar} aria-hidden="true">{r.name.trim().charAt(0).toUpperCase()}</span>
        <figcaption className={styles.name}>{r.name}</figcaption>
        <GoogleG />
      </div>
      <Stars n={r.stars} />
      <blockquote className={styles.quote}>{excerpt(r.text)}</blockquote>
      <a className={styles.readMore} href={google.placeUrl} target="_blank" rel="noopener">
        Read full review on Google
      </a>
    </figure>
  );
}

function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  const set = [...items, ...items];
  return (
    <div className={styles.row}>
      <div className={`${styles.trackM} ${reverse ? styles.reverse : ""}`}>
        {set.map((r, i) => (
          <Card key={(reverse ? "b" : "a") + i} r={r} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const all = google.reviews;
  const half = Math.ceil(all.length / 2);
  const rowA = all.slice(0, half);
  const rowB = all.slice(half);
  return (
    <section className={styles.section} id="reviews">
      <div className={`shell ${styles.head}`}>
        <div>
          <span className={styles.eyebrow}>Google reviews</span>
          <h2 className={`t-h2 ${styles.heading}`}>What clients say on Google.</h2>
        </div>
        <a className={styles.agg} href={google.placeUrl} target="_blank" rel="noopener">
          <GoogleG size={20} />
          <span className={styles.aggScore}>{google.rating.toFixed(1)}</span>
          <Stars n={5} size={14} />
          <span className={styles.aggCount}>{google.count} reviews</span>
        </a>
      </div>

      <div className={styles.band}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.bg} src="/img/rsf/reviews-bg.jpg" alt="" />
        <div className={styles.scrim} />
        <div className={styles.rows}>
          <Row items={rowA} />
          <Row items={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
