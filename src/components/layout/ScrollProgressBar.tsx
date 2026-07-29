"use client";

import { motion, useScroll } from "framer-motion";

/** Persistent 2px telemetry bar pinned to the top edge of the viewport on every
 * page, filling with total document scroll progress. Transform-only, so it
 * never triggers layout during scroll. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-border fixed inset-x-0 top-0 z-50 h-0.5" aria-hidden="true">
      <motion.div className="bg-signal-yellow h-full origin-left" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
