"use client";

import { motion } from "framer-motion";
import { GhostText } from "../GhostText";
import { ArtCard } from "../ArtCard";
import { PR_COLORS } from "@/constants/palletRoss";

export function SceneHeroIntro() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 px-8 py-12 text-center">
      <GhostText
        phrases={["A place to", "display your masterpiece."]}
        className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <ArtCard
          gradient="from-emerald-400 to-teal-600"
          label="STILL LIFE"
          className="h-40 w-32 sm:h-48 sm:w-40"
        />
      </motion.div>
      <span className="text-xs font-medium" style={{ color: PR_COLORS.textMuted }}>
        Pallet Ross — art marketplace
      </span>
    </div>
  );
}
