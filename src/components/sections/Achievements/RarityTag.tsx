import { RARITY_LABELS, RARITY_PIPS } from "@/constants/achievements";
import type { AchievementRarity } from "@/types/achievement";

interface RarityTagProps {
  rarity: AchievementRarity;
  className?: string;
}

/** Tier plate. Colour comes from the `--rarity` custom property published by
 * whichever record owns it, so the tag never names a tier's colour itself. */
export function RarityTag({ rarity, className = "" }: RarityTagProps) {
  return (
    <span
      className={`hud-notch inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] [background-color:color-mix(in_srgb,var(--rarity)_14%,transparent)] [color:var(--rarity)] ${className}`}
    >
      {RARITY_LABELS[rarity]}
      <span aria-hidden className="flex gap-[3px]">
        {Array.from({ length: RARITY_PIPS[rarity] }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rotate-45 bg-[var(--rarity)]" />
        ))}
      </span>
    </span>
  );
}
