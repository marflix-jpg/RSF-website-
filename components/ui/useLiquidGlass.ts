"use client";

import { useEffect, type RefObject } from "react";
import { liquidGlass } from "@/lib/liquidGlass";

type Opts = Parameters<typeof liquidGlass>[1];

/** Apply Apple-style liquid-glass refraction to a ref'd element (client only). */
export function useLiquidGlass(ref: RefObject<HTMLElement | null>, opts?: Opts) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const instance = liquidGlass(el, opts);
    return () => instance.destroy();
    // run once on mount; the module's ResizeObserver handles size changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
