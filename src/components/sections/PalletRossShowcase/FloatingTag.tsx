"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IFloatingTag } from "@/types/palletRoss";
import { PR_COLORS } from "@/constants/palletRoss";

export function FloatingTag({ handle, top, left, right }: IFloatingTag) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute rounded-full px-3 py-1.5 text-xs font-medium shadow-lg"
      style={{ top, left, right, backgroundColor: PR_COLORS.surface, color: PR_COLORS.text }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: reduceMotion ? 0 : [0, -6, 0],
      }}
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 15, delay: 0.3 },
        opacity: { duration: 0.2, delay: 0.3 },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
      }}
    >
      {handle}
    </motion.div>
  );
}
