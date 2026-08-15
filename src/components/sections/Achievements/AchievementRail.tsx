"use client";

import type { KeyboardEvent } from "react";
import { ACHIEVEMENTS_ROSTER_LABEL } from "@/data/achievements";
import type { IAchievement } from "@/types/achievement";
import { AchievementRailRow } from "./AchievementRailRow";

interface AchievementRailProps {
  achievements: IAchievement[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  registerRef: (index: number) => (node: HTMLButtonElement | null) => void;
  tabId: (id: string) => string;
  panelId: string;
}

/** The roster column: a vertical tablist, so a keyboard gets the arrow-key
 * cursor the footer legend advertises without a bespoke focus model. */
export function AchievementRail({
  achievements,
  activeIndex,
  onSelect,
  onKeyDown,
  registerRef,
  tabId,
  panelId,
}: AchievementRailProps) {
  return (
    <div className="flex h-full min-h-0 flex-col border-border/70 lg:border-r">
      <div className="flex shrink-0 items-baseline justify-between px-5 pb-4 pt-6 md:px-6">
        <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
          {ACHIEVEMENTS_ROSTER_LABEL}
        </h2>
        <span aria-hidden className="font-mono text-[0.6rem] tabular-nums tracking-[0.18em] text-border">
          {String(achievements.length).padStart(2, "0")}
        </span>
      </div>

      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label={ACHIEVEMENTS_ROSTER_LABEL}
        className="flex min-h-0 flex-col gap-1 overflow-y-auto pb-6 pr-2"
      >
        {achievements.map((achievement, index) => (
          <AchievementRailRow
            key={achievement.id}
            achievement={achievement}
            index={index}
            isActive={index === activeIndex}
            tabId={tabId(achievement.id)}
            panelId={panelId}
            onSelect={() => onSelect(index)}
            onKeyDown={onKeyDown}
            registerRef={registerRef(index)}
          />
        ))}
      </div>
    </div>
  );
}
