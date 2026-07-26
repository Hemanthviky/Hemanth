"use client";

import { motion } from "framer-motion";
import { Pin, Play } from "lucide-react";
import { STORY_CARDS } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

export function SceneStoryCards() {
  return (
    <div className="flex h-full flex-col gap-5 px-8 py-8">
      <div className="text-center">
        <span
          className="text-[11px] font-medium tracking-[0.1em]"
          style={{ color: PR_COLORS.textMuted }}
        >
          {STORY_CARDS.eyebrow.replace(
            STORY_CARDS.highlight,
            ""
          )}
          <span style={{ color: PR_COLORS.purple }}>{STORY_CARDS.highlight}</span>
        </span>
        <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
          {STORY_CARDS.headline}
        </h3>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
        {STORY_CARDS.cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-3 text-white ${card.gradient}`}
          >
            {card.kind === "video" && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90">
                <Play className="h-3 w-3 fill-black text-black" />
              </span>
            )}
            {card.kind === "dark" && (
              <Pin className="h-4 w-4 text-white/80" />
            )}
            {card.tag && (
              <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-black">
                {card.tag}
              </span>
            )}

            <div>
              <p className="text-xs font-semibold leading-snug">{card.title}</p>
              <p className="mt-1 hidden text-[10px] leading-snug text-white/80 sm:block">
                {card.body}
              </p>
              <span className="mt-1.5 inline-block text-[10px] font-semibold underline">
                {card.linkLabel}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
