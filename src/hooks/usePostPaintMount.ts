"use client";

import { useEffect, useState } from "react";

/** Flips true after the browser has painted at least one frame, so heavy
 * client-only work (the WebGL bundle) never competes with first paint. */
export function usePostPaintMount(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let innerFrame = 0;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => setIsMounted(true));
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, []);

  return isMounted;
}
