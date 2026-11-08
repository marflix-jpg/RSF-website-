"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "./LanyardBadge.module.css";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

const PHOTO = "/img/rahul-badge.png";

export default function LanyardBadge() {
  // null = not mounted yet (render static fallback to avoid SSR/WebGL mismatch).
  // On phones we also skip the WebGL lanyard: a static badge is lighter and
  // sits centred and fully visible instead of swinging off a narrow screen.
  const [stat, setStat] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 899px)").matches;
    setStat(reduce || mobile);
  }, []);

  if (stat === null || stat) {
    return (
      <div className={styles.wrap}>
        <div className={styles.staticCard}>
          <span className={styles.clip} aria-hidden="true" />
          <span className={styles.strap} aria-hidden="true" />
          <div className={styles.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO} alt="Rahul Chauhan — MSc Sports Science, NSCA-CSCS" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <Lanyard
        frontImage={PHOTO}
        imageFit="cover"
        orientation="portrait"
        finish="glossy"
        cardColor="#0e1018"
        strapColor="#2b6bff"
        metal="silver"
        size={0.62}
        strapLength={0.5}
        anchor="left"
        gravity={1}
        breeze={0}
        interactive
        intro
        className={styles.canvas}
      />
      <span className={styles.hint} aria-hidden="true">Drag the badge</span>
    </div>
  );
}
