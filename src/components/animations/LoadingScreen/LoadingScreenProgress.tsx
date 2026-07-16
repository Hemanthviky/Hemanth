"use client";

import { motion } from "framer-motion";

interface LoadingScreenProgressProps {
  progress: number;
}

export function LoadingScreenProgress({ progress }: LoadingScreenProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 font-sans text-sm tracking-[0.2em] tabular-nums text-muted"
    >
      {String(progress).padStart(2, "0")}%
    </motion.div>
  );
}
