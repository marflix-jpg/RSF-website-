import { packages } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import styles from "./Packages.module.css";

export default function Packages() {
  return (
    <section className={styles.section} id="pricing">
      <div className="shell">
        <div className={styles.head}>
          <span className={styles.marker}>{packages.lead}</span>
          <h2 className={`t-h2 ${styles.heading}`}>{packages.heading}</h2>
          <p className={styles.standfirst}>{packages.standfirst}</p>
        </div>

        <div className={styles.grid}>
          {packages.cards.map((card) => (
            <article key={card.name} className={cn(styles.card, card.featured && styles.featured)}>
              {card.featured && card.badge && <span className={styles.badge}>{card.badge}</span>}
              <h3 className={styles.name}>{card.name}</h3>
              <p className={styles.blurb}>{card.blurb}</p>
              <p className={styles.price}>
                <span className={styles.cur}>{packages.currency}</span>
                <span className={styles.amount}>{card.price}</span>
                <span className={styles.unit}>/ {card.unit}</span>
              </p>
              <ul className={styles.features}>
                {card.features.map((f) => (
                  <li key={f}>
                    <CheckIcon className={styles.check} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                className={cn("btn", styles.cta, !card.featured && "btn--ghost", !card.featured && styles.ctaGhost)}
                href={waLink(card.waMessage)}
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon />
                {card.cta}
              </a>
            </article>
          ))}
        </div>
        <p className={styles.foot}>{packages.footnote}</p>
      </div>
    </section>
  );
}
