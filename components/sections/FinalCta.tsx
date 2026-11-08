import { finalCta } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import Magnetic from "@/components/ui/Magnetic";
import { WhatsAppIcon } from "@/components/ui/icons";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section className={`${styles.section} grain`} id="contact">
      <div className={styles.glow} />
      <div className={`shell ${styles.inner}`}>
        <h2 className={`t-h1 ${styles.heading}`}>{finalCta.heading}</h2>
        <p className={`t-lead ${styles.body}`}>{finalCta.body}</p>
        <div className={styles.cta}>
          <Magnetic strength={0.4}>
            <a className={cn("btn", styles.btnBig)} href={waLink()} target="_blank" rel="noopener">
              <WhatsAppIcon />
              {finalCta.cta}
            </a>
          </Magnetic>
        </div>
        <p className={styles.reassure}>{finalCta.reassurance}</p>
      </div>
    </section>
  );
}
