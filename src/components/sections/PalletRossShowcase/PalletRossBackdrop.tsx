"use client";

import { motion } from "framer-motion";

export function PalletRossBackdrop({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -inset-24"
        animate={{ backgroundColor: color }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ filter: "blur(120px)", opacity: 0.5 }}
      />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px 100px var(--background)" }}
      />
    </div>
  );
}
