"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArtCard } from "../ArtCard";
import { MARKETPLACE_GRID } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

const ACTIVE_TILE_INDEX = 0;

export function SceneMarketplaceGrid() {
  return (
    <div className="flex h-full flex-col gap-5 px-8 py-8">
      <div className="flex items-start justify-between">
        <div>
          <span
            className="text-[11px] font-medium tracking-[0.1em]"
            style={{ color: PR_COLORS.textMuted }}
          >
            GET MORE <span style={{ color: PR_COLORS.purple }}>{MARKETPLACE_GRID.highlight}</span>
          </span>
          <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            {MARKETPLACE_GRID.headline}
          </h3>
          <p className="mt-2 max-w-sm text-sm" style={{ color: PR_COLORS.textMuted }}>
            {MARKETPLACE_GRID.body}
          </p>
        </div>
        <button
          className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-white"
          style={{ backgroundColor: PR_COLORS.purple }}
        >
          {MARKETPLACE_GRID.cta}
        </button>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
        {MARKETPLACE_GRID.tiles.map((tile, i) => (
          <motion.div
            key={tile.id}
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.45 }}
          >
            <ArtCard gradient={tile.gradient} className="h-16 w-full sm:h-20" />
            <span className="text-[11px] font-medium" style={{ color: PR_COLORS.text }}>
              {tile.title}
            </span>
            <div className="h-1 w-full rounded-full" style={{ backgroundColor: "#ECECEC" }}>
              <div
                className="h-1 rounded-full"
                style={{
                  width: i === ACTIVE_TILE_INDEX ? "100%" : "0%",
                  backgroundColor: PR_COLORS.purple,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end gap-1.5">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: PR_COLORS.surfaceAlt }}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </span>
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: PR_COLORS.surfaceAlt }}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
