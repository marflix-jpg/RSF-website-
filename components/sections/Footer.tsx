import { footer, site, nav, checkins } from "@/lib/content";
import google from "@/lib/google-reviews.json";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.bg} src="/img/rsf/footer-pose.jpg" alt="" aria-hidden="true" />
      <div className={styles.grad} />

      <div className={`shell ${styles.inner}`}>
        <div>
          <a href="#top" className={styles.brand} aria-label={`${site.name}, home`}>
            <svg className={styles.mark} viewBox="0 0 48 48" fill="none" aria-hidden>
              <path d="M8 36 L19 25 L28 31 L41 15" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="41" cy="15" r="3.6" fill="currentColor" />
            </svg>
            {site.name}
          </a>
          <p className={styles.blurb}>{footer.blurb}</p>
          <ul className={styles.creds}>
            {footer.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <span className={styles.colHead}>Explore</span>
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.connect}>
          <span className={styles.colHead}>Get in touch</span>
          <a className={`btn ${styles.wa}`} href={waLink()} target="_blank" rel="noopener">
            <WhatsAppIcon />
            WhatsApp Rahul
          </a>
          <a className={styles.colHead} style={{ margin: 0 }} href={site.instagram.url} target="_blank" rel="noopener">
            @{site.instagram.handle}
          </a>
          <a className={styles.colHead} style={{ margin: 0 }} href={checkins.formUrl} target="_blank" rel="noopener">
            Weekly client check-in
          </a>
          <a className={styles.colHead} style={{ margin: 0 }} href={google.placeUrl} target="_blank" rel="noopener">
            Google reviews
          </a>
          <a className={styles.colHead} style={{ margin: 0 }} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>

      <div className={`shell ${styles.bottom}`}>
        <span>{footer.copyright}</span>
        <span>{site.city}, UAE</span>
      </div>
    </footer>
  );
}
