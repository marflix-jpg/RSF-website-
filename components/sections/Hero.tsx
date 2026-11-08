"use client";

import { useRef } from "react";
import { hero, credentials } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLiquidGlass } from "@/components/ui/useLiquidGlass";
import GetStartedButton from "@/components/ui/GetStartedButton";
import { PlayIcon } from "@/components/ui/icons";
import styles from "./Hero.module.css";

function headlineParts(s: string) {
  return s.split(/(\*[^*]+\*)/g).filter(Boolean).map((seg, i) =>
    seg.startsWith("*") && seg.endsWith("*") ? (
      <em key={i} className={`ital ${styles.annWord}`}>
        {seg.slice(1, -1)}
        <svg className={styles.ann} viewBox="0 0 220 26" preserveAspectRatio="none" aria-hidden="true">
          <path
            className={styles.annPath}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            fill="none"
            d="M5 18 C 42 11, 96 10, 150 13 C 182 14.6, 202 16, 215 12"
          />
        </svg>
      </em>
    ) : (
      <span key={i}>{seg}</span>
    ),
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const vslRef = useRef<HTMLButtonElement>(null);
  const hasVsl = Boolean(hero.vsl.src);
  useLiquidGlass(vslRef, { radius: 24, scale: -70, chroma: 5, blur: 9, border: 0.1, saturate: 1.4 });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(q(`.${styles.headline}`), { y: 30, opacity: 0, duration: 1.1 })
        .fromTo(q(`.${styles.annPath}`), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.55, ease: "power1.inOut" }, "-=0.35")
        .from(q(`.${styles.sub}`), { y: 20, opacity: 0, duration: 0.9 }, "-=0.55")
        .from(q(`.${styles.ctaRow}`), { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(q(`.${styles.vsl}`), { y: 40, opacity: 0, scale: 0.98, duration: 1.1 }, "-=0.6")
        .from(q(`.${styles.cred}`), { opacity: 0, y: 12, stagger: 0.08, duration: 0.6 }, "-=0.7");
    },
    { scope: root },
  );

  const openVsl = () => dialogRef.current?.showModal();
  const closeVsl = () => {
    dialogRef.current?.querySelector("video")?.pause();
    dialogRef.current?.close();
  };

  return (
    <section className={styles.hero} id="top" ref={root}>
      <div className={styles.bg} />
      <div className={`${styles.bgGrain} grain`} />

      <div className={`shell ${styles.inner}`}>
        <h1 className={`t-mega ${styles.headline}`}>{headlineParts(hero.headline)}</h1>
        <p className={`t-lead ${styles.sub}`}>{hero.standfirst}</p>

        <div className={styles.ctaRow}>
          <GetStartedButton href={waLink()} target="_blank" rel="noopener" />
        </div>

        <button ref={vslRef} className={`liquid ${styles.vsl}`} onClick={openVsl} aria-label={`Play: ${hero.vsl.label}`}>
          {hasVsl && hero.vsl.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.vslMedia} src={hero.vsl.poster} alt="" />
          ) : null}
          <span className={styles.vslRuntime}>{hero.vsl.runtime}</span>
          <span className={styles.vslInner}>
            <span className={styles.play}>
              <PlayIcon size={30} />
            </span>
            <span className={styles.vslLabel}>{hero.vsl.label}</span>
          </span>
        </button>

        <div className={styles.creds}>
          {credentials.map((c) => (
            <span className={styles.cred} key={c.k}>
              <span className={styles.credK}>{c.k}</span>
              <span className={styles.credV}>{c.v}</span>
            </span>
          ))}
        </div>
      </div>

      <dialog ref={dialogRef} className={styles.dialog} onClick={(e) => e.target === dialogRef.current && closeVsl()}>
        <div className={styles.dialogInner}>
          <button className={styles.close} onClick={closeVsl} aria-label="Close video">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          {hasVsl ? (
            <video src={hero.vsl.src} controls playsInline poster={hero.vsl.poster || undefined} />
          ) : (
            <div className={styles.soon}>
              <PlayIcon size={30} color="var(--color-signal)" />
              <b>The intro film is in production.</b>
              <span>Drop the VSL into <code>hero.vsl.src</code> and it plays here.</span>
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}
