"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { RARITY_COLOR_VAR, RARITY_PIPS } from "@/constants/achievements";
import type { IAchievement } from "@/types/achievement";
import { AchievementLogo } from "./AchievementLogo";

interface AchievementRailRowProps {
  achievement: IAchievement;
  index: number;
  isActive: boolean;
  tabId: string;
  panelId: string;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  registerRef: (node: HTMLButtonElement | null) => void;
}

/** One slot in the roster. The rarity bar down the left edge is the only thing
 * that moves on selection — everything else brightens in place, so running the
 * list with the arrow keys reads as a cursor moving rather than rows jumping. */
export function AchievementRailRow({
  achievement,
  index,
  isActive,
  tabId,
  panelId,
  onSelect,
  onKeyDown,
  registerRef,
}: AchievementRailRowProps) {
  const { codename, rarity, logo, issuer, unlockedOn } = achievement;

  return (
    <button
      ref={registerRef}
      type="button"
      role="tab"
      id={tabId}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      style={{ "--rarity": RARITY_COLOR_VAR[rarity] } as CSSProperties}
      className={`group relative flex w-full items-center gap-4 border border-transparent py-3 pl-5 pr-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
        isActive
          ? "[background-color:color-mix(in_srgb,var(--rarity)_9%,transparent)] [border-color:color-mix(in_srgb,var(--rarity)_22%,transparent)]"
          : "hover:bg-surface/60"
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-[2px] origin-top bg-[var(--rarity)] transition-transform duration-300 ease-out ${
          isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100 group-hover:opacity-40"
        }`}
      />

      <span
        aria-hidden
        className={`w-6 shrink-0 font-mono text-[0.65rem] font-semibold tabular-nums transition-colors duration-200 ${
          isActive ? "[color:var(--rarity)]" : "text-muted"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <AchievementLogo logo={logo} size="sm" />

      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-[0.9rem] font-semibold tracking-tight transition-colors duration-200 ${
            isActive ? "text-foreground" : "text-secondary group-hover:text-foreground"
          }`}
        >
          {codename}
        </span>
        <span className="mt-1 block truncate font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
          {issuer} · {unlockedOn}
        </span>
      </span>

      <span aria-hidden className="flex shrink-0 gap-[3px]">
        {Array.from({ length: RARITY_PIPS[rarity] }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rotate-45 bg-[var(--rarity)] transition-opacity duration-200 ${
              isActive ? "opacity-100" : "opacity-35 group-hover:opacity-70"
            }`}
          />
        ))}
      </span>
    </button>
  );
}
