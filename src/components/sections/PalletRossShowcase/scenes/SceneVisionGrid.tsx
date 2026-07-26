"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArtCard } from "../ArtCard";
import { VISION_GRID } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

const THUMB_GRADIENTS = [
  "from-emerald-400 to-teal-600",
  "from-rose-400 to-red-600",
  "from-amber-300 to-orange-500",
  "from-sky-400 to-indigo-600",
  "from-fuchsia-400 to-purple-600",
  "from-lime-300 to-green-600",
];

export function SceneVisionGrid() {
  return (
    <div className="grid h-full grid-cols-1 gap-8 px-8 py-8 sm:grid-cols-2">
      <div className="relative flex flex-col justify-center gap-3">
        {VISION_GRID.icons.map((badge, i) => {
          const Icon = (Icons as unknown as Record<string, LucideIcon>)[badge.icon];
          return (
            <motion.span
              key={i}
              className="absolute flex h-9 w-9 items-center justify-center rounded-full shadow"
              style={{ top: badge.top, left: badge.left, backgroundColor: PR_COLORS.surfaceAlt }}
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: badge.rotate }}
              transition={{ delay: 0.06 * i, type: "spring", stiffness: 260, damping: 18 }}
            >
              {Icon && <Icon className="h-4 w-4" style={{ color: PR_COLORS.text }} />}
            </motion.span>
          );
        })}

        <div className="relative z-10 mt-24">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {VISION_GRID.headline}
          </h3>
          <p className="mt-2 max-w-xs text-sm" style={{ color: PR_COLORS.textMuted }}>
            {VISION_GRID.body}
          </p>
          <span
            className="mt-3 inline-block text-xs font-semibold underline"
            style={{ color: PR_COLORS.text }}
          >
            {VISION_GRID.linkLabel}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="rounded-2xl border p-4"
        style={{ borderColor: "#ECECEC", backgroundColor: PR_COLORS.surfaceAlt }}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-2 text-xs font-medium">
            {VISION_GRID.tabs.map((tab, i) => (
              <span
                key={tab}
                className="rounded-full px-2.5 py-1"
                style={{
                  backgroundColor: i === 0 ? PR_COLORS.text : "transparent",
                  color: i === 0 ? "#fff" : PR_COLORS.textMuted,
                }}
              >
                {tab}
              </span>
            ))}
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: PR_COLORS.purple }}
          >
            {VISION_GRID.createLabel}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {VISION_GRID.thumbs.map((thumb, i) => (
            <motion.div
              key={thumb}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
            >
              <ArtCard gradient={THUMB_GRADIENTS[i]} label={thumb} className="h-14 w-full" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
