"use client";

import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ACHIEVEMENT_KIND_LABELS, RARITY_COLOR_VAR } from "@/constants/achievements";
import { ACHIEVEMENTS_UNLOCKED_LABEL } from "@/data/achievements";
import type { IAchievement } from "@/types/achievement";
import { AchievementLogo } from "./AchievementLogo";
import { DossierFacts } from "./DossierFacts";
import { DossierProgress } from "./DossierProgress";
import { DossierStats } from "./DossierStats";
import { HudCorners } from "./HudCorners";
import { ProofLinks } from "./ProofLinks";
import { RarityTag } from "./RarityTag";

interface AchievementDossierProps {
  achievement: IAchievement;
  index: number;
  total: number;
  panelId: string;
  tabId: string;
  primaryLinkRef: (node: HTMLAnchorElement | null) => void;
}

const pad = (value: number) => String(value).padStart(2, "0");

/** The open record. Swapping selection re-mounts the whole panel on the id so
 * the entry plays per record — the deal-in a game menu gives an item card,
 * rather than fields quietly retyping themselves in place. */
export function AchievementDossier({
  achievement,
  index,
  total,
  panelId,
  tabId,
  primaryLinkRef,
}: AchievementDossierProps) {
  const reduced = useReducedMotion();
  const { id, kind, rarity, logo, title, brief, unlockedOn, facts, stats, progress, links } = achievement;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      style={{ "--rarity": RARITY_COLOR_VAR[rarity] } as CSSProperties}
      className="relative min-h-0 flex-1 overflow-y-auto focus-visible:outline-none"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 [background:radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--rarity)_10%,transparent),transparent_70%)]"
      />
      <HudCorners />

      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={id}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: reduced ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10 md:gap-10 md:px-12 md:py-14"
        >
          <header className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
                Rec <span className="text-accent">{pad(index + 1)}</span> / {pad(total)}
              </span>
              <span aria-hidden className="h-3 w-px bg-border" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-secondary">
                {ACHIEVEMENT_KIND_LABELS[kind]}
              </span>
              <RarityTag rarity={rarity} className="ml-auto" />
            </div>

            <div className="flex items-start gap-5 md:gap-7">
              <AchievementLogo logo={logo} />
              <div className="min-w-0">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-success">
                  {ACHIEVEMENTS_UNLOCKED_LABEL} · <span className="text-muted">{unlockedOn}</span>
                </p>
                <h3 className="mt-3 font-black uppercase leading-[0.94] tracking-[-0.02em] text-foreground text-[clamp(1.75rem,4.2vw,3rem)]">
                  {title}
                </h3>
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-4 border-l-2 border-[var(--rarity)] pl-5">
            {brief.map((paragraph) => (
              <p key={paragraph} className="max-w-2xl text-[0.92rem] leading-relaxed text-secondary md:text-[1rem]">
                {paragraph}
              </p>
            ))}
          </div>

          {stats && <DossierStats stats={stats} />}

          {progress && <DossierProgress progress={progress} />}

          <DossierFacts facts={facts} />

          {links && <ProofLinks links={links} primaryRef={primaryLinkRef} />}
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
