import type { AchievementKind, AchievementRarity } from "@/types/achievement";

/** The tag on each record. "Course" is deliberate on the AWS entry: the file is
 * a Udemy certificate of completion for the CLF-C02 prep course, not the AWS
 * credential, and the label must not suggest otherwise. */
export const ACHIEVEMENT_KIND_LABELS: Record<AchievementKind, string> = {
  certification: "Certification",
  course: "Course",
  rank: "Rank",
  product: "Shipped",
};

export const RARITY_LABELS: Record<AchievementRarity, string> = {
  legendary: "Legendary",
  epic: "Epic",
  rare: "Rare",
};

/** Diamonds drawn beside the rarity tag — the wordless half of the tier. */
export const RARITY_PIPS: Record<AchievementRarity, number> = {
  legendary: 3,
  epic: 2,
  rare: 1,
};

/** Resolved through CSS variables rather than raw hex so the palette stays
 * defined in exactly one place; components hand this to a `--rarity` custom
 * property and tint everything downstream off it. */
export const RARITY_COLOR_VAR: Record<AchievementRarity, string> = {
  legendary: "var(--rarity-legendary)",
  epic: "var(--rarity-epic)",
  rare: "var(--rarity-rare)",
};

/** Footer key legend. Mirrors the shortcuts the screen actually binds — if one
 * is removed here it must be unbound there too. */
export const HUD_KEY_HINTS = [
  { keys: ["↑", "↓"], action: "Navigate" },
  { keys: ["↵"], action: "Open proof" },
  { keys: ["Esc"], action: "Exit" },
] as const;
