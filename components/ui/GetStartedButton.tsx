"use client";

import styles from "./GetStartedButton.module.css";

type Props = {
  href: string;
  label?: string;
  className?: string;
  target?: string;
  rel?: string;
};

/* A diagonal ↗ arrow, used twice inside the circle for the slide-through hover. */
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 L17 7" />
      <path d="M8 7 H17 V16" />
    </svg>
  );
}

/* A little figure whose legs + arm stride continuously (pure CSS). */
function Walker() {
  return (
    <svg className={styles.walker} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13" cy="4" r="1.7" fill="currentColor" stroke="none" />
      <path d="M12.5 7 V12" />
      <path className={styles.arm} d="M12.5 9 L15.5 11" />
      <path className={styles.legA} d="M12.5 12 L10 16.5 L8.5 20" />
      <path className={styles.legB} d="M12.5 12 L15 16.5 L16.5 20" />
    </svg>
  );
}

export default function GetStartedButton({ href, label = "Get started", className = "", target, rel }: Props) {
  return (
    <a className={`${styles.pill} ${className}`} href={href} target={target} rel={rel}>
      <span className={styles.walkWrap} aria-hidden="true">
        <Walker />
      </span>
      <span className={styles.label}>{label}</span>
      <span className={styles.circle} aria-hidden="true">
        <span className={styles.arrowTrack}>
          <span className={styles.arrow}>
            <Arrow />
          </span>
          <span className={styles.arrow}>
            <Arrow />
          </span>
        </span>
      </span>
    </a>
  );
}
