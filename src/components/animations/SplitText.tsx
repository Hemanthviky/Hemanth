"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/constants/motion";

interface SplitTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  /** Reveal when scrolled into view instead of immediately on mount. */
  triggerOnView?: boolean;
}

export function SplitText({ text, delay = 0, stagger = 0.045, triggerOnView = false }: SplitTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const revealProps = triggerOnView
    ? { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-80px" } }
    : { animate: { y: 0, opacity: 1 } };

  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={reduced ? { opacity: 0 } : { y: "110%", opacity: 0 }}
            {...revealProps}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE_OUT_EXPO }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
