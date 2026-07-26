"use client";

import { motion } from "framer-motion";
import { GhostText } from "../GhostText";
import { ArtCard } from "../ArtCard";
import { FloatingTag } from "../FloatingTag";
import { VALUE_PROP } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

const DECK = [
  { gradient: "from-rose-400 to-red-600", rotate: -10, x: -110, label: "MUSE" },
  { gradient: "from-amber-300 to-orange-500", rotate: -5, x: -55, label: "GLOW" },
  { gradient: "from-emerald-400 to-teal-600", rotate: 0, x: 0, label: "ROOTS" },
  { gradient: "from-sky-400 to-indigo-600", rotate: 5, x: 55, label: "TIDE" },
  { gradient: "from-fuchsia-400 to-purple-600", rotate: 10, x: 110, label: "BLOOM" },
];

const fan = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function SceneValueProp() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8 px-8 py-10 text-center">
      <div className="max-w-xl">
        <span
          className="text-[11px] font-medium tracking-[0.1em]"
          style={{ color: PR_COLORS.textMuted }}
        >
          {VALUE_PROP.eyebrow}
        </span>
        <GhostText
          phrases={VALUE_PROP.headline}
          highlight={VALUE_PROP.highlight}
          className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
        />
        <p className="mx-auto mt-3 max-w-sm text-sm" style={{ color: PR_COLORS.textMuted }}>
          {VALUE_PROP.body}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            className="rounded-full px-4 py-2 text-xs font-semibold text-white"
            style={{ backgroundColor: PR_COLORS.text }}
          >
            {VALUE_PROP.primaryCta}
          </button>
          <button
            className="rounded-full border px-4 py-2 text-xs font-semibold"
            style={{ borderColor: PR_COLORS.textMuted, color: PR_COLORS.text }}
          >
            {VALUE_PROP.secondaryCta}
          </button>
        </div>
      </div>

      <motion.div
        className="relative flex h-28 items-center justify-center"
        variants={fan}
        initial="hidden"
        animate="show"
      >
        {DECK.map((card) => (
          <motion.div
            key={card.label}
            className="absolute"
            style={{ x: card.x }}
            variants={{
              hidden: { opacity: 0, scale: 0.9, rotate: 0 },
              show: {
                opacity: 1,
                scale: 1,
                rotate: card.rotate,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <ArtCard gradient={card.gradient} label={card.label} className="h-24 w-20" />
          </motion.div>
        ))}
      </motion.div>

      {VALUE_PROP.tags.map((tag) => (
        <FloatingTag key={tag.handle} {...tag} />
      ))}
    </div>
  );
}
