"use client";

import { motion } from "framer-motion";
import { PenLine, Palette, Layers } from "lucide-react";
import { GhostText } from "../GhostText";
import { ArtCard } from "../ArtCard";
import { FloatingTag } from "../FloatingTag";
import { AUDIENCE_STATEMENT } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

const DECK = [
  { gradient: "from-yellow-300 to-amber-500", rotate: -8, x: -90 },
  { gradient: "from-cyan-300 to-blue-500", rotate: -3, x: -30 },
  { gradient: "from-pink-400 to-rose-600", rotate: 3, x: 30 },
  { gradient: "from-lime-300 to-green-600", rotate: 8, x: 90 },
];

const TOOLS = [PenLine, Palette, Layers];

export function SceneAudienceStatement() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-6 px-8 py-10 text-center">
      <GhostText
        phrases={AUDIENCE_STATEMENT.phrases}
        className="max-w-xl text-xl font-semibold leading-snug tracking-tight sm:text-2xl"
      />

      <div className="relative flex h-24 items-center justify-center">
        {DECK.map((card, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ x: card.x }}
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: card.rotate }}
            transition={{ delay: 0.15 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArtCard gradient={card.gradient} className="h-20 w-16" />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {TOOLS.map((Icon, i) => (
          <motion.span
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-full shadow"
            style={{ backgroundColor: PR_COLORS.surfaceAlt }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 260, damping: 16 }}
          >
            <Icon className="h-4 w-4" style={{ color: PR_COLORS.text }} />
          </motion.span>
        ))}
      </div>

      {AUDIENCE_STATEMENT.tags.map((tag) => (
        <FloatingTag key={tag.handle} {...tag} />
      ))}
    </div>
  );
}
