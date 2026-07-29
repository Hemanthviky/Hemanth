"use client";

import { useEffect, useState } from "react";
import { HERO_QUALITY } from "@/constants/heroScene";

const MOBILE_QUERY = "(max-width: 639px)";

export type SceneQuality = (typeof HERO_QUALITY)[keyof typeof HERO_QUALITY];

/** Mobile drops the mirrored car, the heat haze and half the shadow map — the
 * first things the brief says to cut before touching any other feature. */
export function useSceneQuality(): SceneQuality {
  const [quality, setQuality] = useState<SceneQuality>(HERO_QUALITY.high);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const sync = () => setQuality(media.matches ? HERO_QUALITY.low : HERO_QUALITY.high);

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return quality;
}
