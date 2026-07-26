"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PR_COLORS } from "@/constants/palletRoss";

interface GhostTextProps {
  phrases: string[];
  highlight?: string;
  highlightColor?: string;
  className?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const phraseVariant = {
  hidden: { opacity: 0.2, filter: "blur(6px)", y: 6 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function GhostText({
  phrases,
  highlight,
  highlightColor = PR_COLORS.red,
  className = "",
}: GhostTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <h2 className={className}>
        {phrases.map((phrase, i) => (
          <span key={i} style={phrase === highlight ? { color: highlightColor } : undefined}>
            {phrase}{" "}
          </span>
        ))}
      </h2>
    );
  }

  return (
    <motion.h2 className={className} variants={container} initial="hidden" animate="show">
      {phrases.map((phrase, i) => (
        <motion.span
          key={i}
          variants={phraseVariant}
          style={phrase === highlight ? { color: highlightColor } : undefined}
          className="inline-block"
        >
          {phrase}{" "}
        </motion.span>
      ))}
    </motion.h2>
  );
}
