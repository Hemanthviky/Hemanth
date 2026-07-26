"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PalletRossBackdrop } from "./PalletRossBackdrop";
import { PalletRossHeader } from "./PalletRossHeader";
import { PALLET_ROSS_SCENES } from "./scenes";
import {
  PR_COLORS,
  PR_SCENE_COUNT,
  PR_SCENE_DURATION_MS,
  PR_TRANSITION_DURATION_S,
  PR_TRANSITION_EASE,
  SCENE_BACKDROP_COLORS,
} from "@/constants/palletRoss";

export function PalletRossShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PR_SCENE_COUNT);
    }, PR_SCENE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  const ActiveScene = PALLET_ROSS_SCENES[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Animated Showcase
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          A demo reel, rebuilt in code
        </h2>
        <p className="mt-3 text-sm text-secondary sm:text-base">
          A frame-by-frame recreation of a product showcase reel — every scene, transition, and
          micro-interaction rebuilt with Framer Motion.
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <PalletRossBackdrop color={SCENE_BACKDROP_COLORS[activeIndex]} />

        <motion.div
          className="relative overflow-hidden rounded-[28px] shadow-2xl"
          style={{ backgroundColor: PR_COLORS.surface, color: PR_COLORS.text }}
          animate={
            reduceMotion ? undefined : { y: [0, -6, 0], rotateX: [0, 1, 0], rotateY: [0, -1, 0] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PalletRossHeader />

          <div className="relative h-[420px] sm:h-[460px]">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeIndex}
                className="absolute inset-0"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 15 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: PR_TRANSITION_DURATION_S, ease: PR_TRANSITION_EASE }}
              >
                <ActiveScene />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
