"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLoadingSequence } from "@/hooks/useLoadingSequence";
import { EXIT_ANIMATION_DURATION_MS, EXIT_ZOOM_SCALE } from "@/constants/loadingScreen";
import { LoadingScreenBackground } from "./LoadingScreenBackground";
import { LoadingScreenGreeting } from "./LoadingScreenGreeting";
import { LoadingScreenProgress } from "./LoadingScreenProgress";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const EXIT_DURATION_S = EXIT_ANIMATION_DURATION_MS / 1000;
const ZOOM_EASE = [0.64, 0, 0.78, 0] as const;

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { currentGreeting, greetingIndex, progress, isComplete } = useLoadingSequence(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isComplete) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isComplete]);

  const contentExit = prefersReducedMotion
    ? { opacity: 0, transition: { duration: EXIT_DURATION_S } }
    : { scale: EXIT_ZOOM_SCALE, opacity: 0, transition: { duration: EXIT_DURATION_S, ease: ZOOM_EASE } };

  const backgroundExit = prefersReducedMotion
    ? { opacity: 0, transition: { duration: EXIT_DURATION_S } }
    : { opacity: 0, transition: { duration: EXIT_DURATION_S, ease: ZOOM_EASE } };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isComplete && (
        <motion.div
          exit={backgroundExit}
          style={{ willChange: "opacity" }}
          className="bg-background fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          <LoadingScreenBackground />

          <motion.div
            exit={contentExit}
            style={{ willChange: "transform, opacity" }}
            className="relative flex h-24 w-full items-center justify-center px-6 sm:h-28 md:h-32"
          >
            <LoadingScreenGreeting greeting={currentGreeting} greetingIndex={greetingIndex} />
          </motion.div>

          <LoadingScreenProgress progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
