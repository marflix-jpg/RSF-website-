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
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <section className={styles.section} id="watch" aria-labelledby="vsl-h">
      <div className="shell">
        <header className={styles.head}>
          <h2 id="vsl-h" className={`t-h2 ${styles.heading}`}>{v.heading}</h2>
          <p className={styles.sub}>{v.sub}</p>
        </header>

        <div className={styles.wrap}>
          <div className={styles.frame}>
            {playing && ready ? (
              <video ref={videoRef} className={styles.media} src={v.src} controls playsInline />
            ) : (
              <button
                type="button"
                className={styles.placeholder}
                onClick={start}
                aria-label={ready ? `Play: ${v.label}` : "Film coming soon"}
                aria-disabled={!ready}
              >
                <span className={styles.disc}>
                  <PlayIcon size={26} />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
