"use client";

import { memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GREETING_ENTER_DURATION_MS, GREETING_EXIT_DURATION_MS } from "@/constants/loadingScreen";

interface LoadingScreenGreetingProps {
  greeting: string;
  greetingIndex: number;
}

const ENTER_DURATION_S = GREETING_ENTER_DURATION_MS / 1000;
const EXIT_DURATION_S = GREETING_EXIT_DURATION_MS / 1000;
const ENTER_EASE = [0.22, 1, 0.36, 1] as const;
const EXIT_EASE = [0.64, 0, 0.78, 0] as const;

function LoadingScreenGreetingComponent({ greeting, greetingIndex }: LoadingScreenGreetingProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.02, filter: "blur(8px)" },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={greetingIndex}
        initial={variants.initial}
        animate={{ ...variants.animate, transition: { duration: ENTER_DURATION_S, ease: ENTER_EASE } }}
        exit={{ ...variants.exit, transition: { duration: EXIT_DURATION_S, ease: EXIT_EASE } }}
        style={{ willChange: "opacity, transform, filter" }}
        className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-5xl font-medium text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
      >
        {greeting}
      </motion.span>
    </AnimatePresence>
  );
}

export const LoadingScreenGreeting = memo(LoadingScreenGreetingComponent);
