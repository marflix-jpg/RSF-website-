"use client";

import { useRef, useState } from "react";
import { hero } from "@/lib/content";
import { PlayIcon } from "@/components/ui/icons";
import styles from "./Vsl.module.css";

const v = hero.vsl;

export default function Vsl() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ready = Boolean(v.src);

  const start = () => {
    if (!ready) return;
    setPlaying(true);
    // play once the <video> has mounted
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <section className={styles.section} id="watch" aria-labelledby="vsl-h">
      <div className="shell">
        <header className={styles.head}>
          <h2 id="vsl-h" className={`t-h2 ${styles.heading}`}>{v.heading}</h2>
          <p className={styles.sub}>{v.sub}</p>
        </header>

        <div className={styles.frame}>
          {playing && ready ? (
            <video ref={videoRef} className={styles.media} src={v.src} poster={v.poster} controls playsInline />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.media} src={v.poster} alt="" />
              <div className={styles.scrim} />
              {ready ? (
                <button type="button" className={styles.play} onClick={start} aria-label={`Play: ${v.label}`}>
                  <span className={styles.disc}><PlayIcon size={26} /></span>
                  <span className={styles.meta}>
                    <b>{v.label}</b>
                    <span>{v.runtime}</span>
                  </span>
                </button>
              ) : (
                <div className={styles.soon}>
                  <span className={styles.disc}><PlayIcon size={26} /></span>
                  <span className={styles.meta}>
                    <b>{v.label}</b>
                    <span>Film going live shortly</span>
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
