"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { usePostPaintMount } from "@/hooks/usePostPaintMount";
import { useSceneQuality } from "@/hooks/useSceneQuality";
import { supportsWebgl } from "@/utils/supportsWebgl";
import { HeroFallback } from "./HeroFallback";

/** three.js and the whole R3F tree stay in their own chunk, fetched on the
 * client only — the initial page payload never pays for WebGL. */
const HeroScene = dynamic(() => import("./scene/HeroScene").then((module) => module.HeroScene), {
  ssr: false,
});

interface HeroBackdropProps {
  /** Drives the render loop: false once the hero scrolls out of view. */
  isInView: boolean;
}

export function HeroBackdrop({ isInView }: HeroBackdropProps) {
  const isPostPaint = usePostPaintMount();
  const quality = useSceneQuality();
  const prefersReducedMotion = useReducedMotion();
  const [hasWebgl, setHasWebgl] = useState(false);

  useEffect(() => setHasWebgl(supportsWebgl()), []);

  return (
    <div className="absolute inset-0">
      <HeroFallback />
      {isPostPaint && hasWebgl && (
        <HeroScene
          isActive={isInView && !prefersReducedMotion}
          isMoving={!prefersReducedMotion}
          quality={quality}
        />
      )}
    </div>
  );
}
