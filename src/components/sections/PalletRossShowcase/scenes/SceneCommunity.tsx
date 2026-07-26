"use client";

import { motion } from "framer-motion";
import { COMMUNITY } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

const GRADIENTS = [
  "from-rose-400 to-red-600",
  "from-amber-300 to-orange-500",
  "from-emerald-400 to-teal-600",
  "from-sky-400 to-indigo-600",
  "from-fuchsia-400 to-purple-600",
  "from-lime-300 to-green-600",
  "from-cyan-300 to-blue-500",
];

function arcPosition(index: number, total: number) {
  const spread = Math.PI * 0.75;
  const angle = -spread / 2 + (spread * index) / (total - 1);
  const radius = 220;
  const x = Math.sin(angle) * radius;
  const y = -Math.cos(angle) * 90;
  const above = index % 2 === 0;
  return { x, y: above ? y - 40 : y + 100 };
}

export function SceneCommunity() {
  const avatars = Array.from({ length: COMMUNITY.avatarCount });

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden px-8 py-10 text-center">
      {avatars.map((_, i) => {
        const { x, y } = arcPosition(i, avatars.length);
        return (
          <motion.div
            key={i}
            className={`absolute h-10 w-10 rounded-full bg-gradient-to-br shadow-md sm:h-12 sm:w-12 ${
              GRADIENTS[i % GRADIENTS.length]
            }`}
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.04 * i, type: "spring", stiffness: 240, damping: 20 }}
          />
        );
      })}

      <div className="relative z-10 max-w-md">
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {COMMUNITY.headline}
        </h3>
        <p className="mt-2 text-sm" style={{ color: PR_COLORS.textMuted }}>
          {COMMUNITY.body}
        </p>
      </div>
    </div>
  );
}
