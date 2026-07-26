"use client";

import { motion } from "framer-motion";
import { ArtCard } from "../ArtCard";
import { MASONRY_DISCOVER } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

const GRADIENTS = [
  "from-rose-400 to-red-600",
  "from-amber-300 to-orange-500",
  "from-emerald-400 to-teal-600",
  "from-sky-400 to-indigo-600",
  "from-fuchsia-400 to-purple-600",
  "from-lime-300 to-green-600",
  "from-cyan-300 to-blue-500",
  "from-orange-400 to-rose-500",
  "from-violet-400 to-fuchsia-600",
  "from-teal-300 to-emerald-600",
  "from-yellow-300 to-amber-500",
  "from-indigo-400 to-blue-600",
  "from-pink-400 to-red-500",
];

const FOCAL_INDEX = 6;

export function SceneMasonryDiscover() {
  const tiles = Array.from({ length: MASONRY_DISCOVER.count });

  return (
    <div className="relative grid h-full grid-cols-4 gap-2 p-6 sm:grid-cols-6 sm:gap-3">
      {tiles.map((_, i) => (
        <motion.div
          key={i}
          className={i === FOCAL_INDEX ? "relative z-10 col-span-2 row-span-2" : ""}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: i === FOCAL_INDEX ? 1.06 : 1 }}
          transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArtCard
            gradient={GRADIENTS[i % GRADIENTS.length]}
            className={i === FOCAL_INDEX ? "h-full min-h-24 w-full shadow-2xl" : "h-12 w-full sm:h-16"}
          />

          {i === FOCAL_INDEX && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-xl px-3 py-2 text-center shadow-lg"
              style={{ backgroundColor: PR_COLORS.surface }}
            >
              <p className="text-[11px] font-semibold" style={{ color: PR_COLORS.text }}>
                {MASONRY_DISCOVER.focal.name}
              </p>
              <p className="text-[10px]" style={{ color: PR_COLORS.textMuted }}>
                {MASONRY_DISCOVER.focal.from}
              </p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
