"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { GhostText } from "../GhostText";
import { FloatingTag } from "../FloatingTag";
import { CREATOR_SPOTLIGHT } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

export function SceneCreatorSpotlight() {
  return (
    <div className="flex h-full flex-col gap-6 px-8 py-8">
      <div className="text-center">
        <span
          className="text-[11px] font-medium tracking-[0.1em]"
          style={{ color: PR_COLORS.textMuted }}
        >
          {CREATOR_SPOTLIGHT.eyebrow}
        </span>
        <GhostText
          phrases={[CREATOR_SPOTLIGHT.headline]}
          className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
        />
      </div>

      <div
        className="relative mx-auto h-40 w-full max-w-md overflow-hidden rounded-3xl sm:h-48"
        style={{ backgroundColor: PR_COLORS.coral }}
      >
        <FloatingTag {...CREATOR_SPOTLIGHT.tag} />

        <div className="absolute right-4 top-4 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: i === 0 ? "#fff" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>

        <button className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
          <Play className="h-3 w-3 fill-current" /> Watch
        </button>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80">
            <ChevronLeft className="h-3.5 w-3.5" />
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80">
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center"
      >
        <p className="text-xs font-semibold" style={{ color: PR_COLORS.text }}>
          {CREATOR_SPOTLIGHT.trustedTitle}
        </p>
        <div
          className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium"
          style={{ color: PR_COLORS.textMuted }}
        >
          {CREATOR_SPOTLIGHT.logos.map((logo) => (
            <span key={logo.name}>{logo.name}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
