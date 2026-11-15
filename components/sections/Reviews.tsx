import { Star } from "lucide-react";
import google from "@/lib/google-reviews.json";
import { ArrowIcon } from "@/components/ui/icons";
import styles from "./Reviews.module.css";

/* Every review below is rendered exactly as Google returned it: reviewer
   name, text, star rating, date, Local Guide flag. Nothing is added,
   trimmed or reworded. Source: lib/google-reviews.json. */

type Review = (typeof google.reviews)[number];

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <span className={styles.stars} role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

function GoogleG({ size = 18 }: { size?: number }) {
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
  const paragraphs = r.text.split("\n").filter((p) => p.trim().length > 0);
  return (
    <figure className={styles.card}>
      <div className={styles.top}>
        <span className={styles.avatar} aria-hidden="true">{r.name.trim().charAt(0).toUpperCase()}</span>
        <div className={styles.who}>
          <figcaption className={styles.name}>{r.name}</figcaption>
          <span className={styles.sub}>
            {r.localGuide ? "Local Guide · " : ""}
            {r.reviewerReviews} {r.reviewerReviews === 1 ? "review" : "reviews"}
          </span>
        </div>
        <GoogleG />
      </div>
      <div className={styles.meta}>
        <Stars n={r.stars} />
        <time dateTime={r.date}>{fmt.format(new Date(r.date))}</time>
      </div>
      <blockquote className={styles.quote}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </blockquote>
    </figure>
  );
}

export default function Reviews() {
  return (
    <section className={styles.section} id="reviews">
      <div className="shell">
        <header className={styles.head}>
          <span className={styles.marker}>Google reviews</span>
          <h2 className={`t-h2 ${styles.heading}`}>What clients say on Google.</h2>
        </header>

        <div className={styles.columns}>
          <aside className={styles.summary}>
            <div className={styles.sumTop}>
              <GoogleG size={22} />
              <span>Google rating</span>
            </div>
            <div className={styles.score}>{google.rating.toFixed(1)}</div>
            <Stars n={5} size={22} />
            <p className={styles.count}>
              Based on {google.count} Google reviews
            </p>
            <a className="btn btn--dark" href={google.placeUrl} target="_blank" rel="noopener">
              Read them on Google
              <ArrowIcon size={16} />
            </a>
          </aside>

          {google.reviews.map((r) => (
            <Card key={r.date + r.name} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
