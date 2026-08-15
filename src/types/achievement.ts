/** What kind of thing was earned. Kept distinct from the copy so the tag on
 * each record stays accurate — a course completed in preparation for an exam is
 * not the certification itself, and the archive should not imply otherwise. */
export type AchievementKind = "certification" | "course" | "rank" | "product";

/** Loot-tier the record is displayed at. Purely presentational: it sets the
 * colour a record is lit in and the number of pips beside its tag, and carries
 * no claim of its own. */
export type AchievementRarity = "legendary" | "epic" | "rare";

/** Official brand artwork, served from `public/logo/`. Marks sit directly on
 * the archive's dark surface with no plate behind them. */
export interface IAchievementLogo {
  src: string;
  alt: string;
  /** Renders the mark as a white silhouette. Only for artwork drawn in
   * near-black for light backgrounds, which would otherwise vanish — the
   * reversed treatment brands themselves publish for dark surfaces. */
  reverseOnDark?: boolean;
}

export interface IAchievementLink {
  label: string;
  href: string;
}

/** A headline number, shown at display size in the dossier. */
export interface IAchievementStat {
  value: string;
  label: string;
}

/** One row of the dossier's spec table — issuer, date, credential id. The
 * lines that make the record checkable rather than merely stated. */
export interface IAchievementFact {
  label: string;
  value: string;
}

/** A live, still-climbing track towards the next tier. Only set where real
 * numbers back both ends of the bar — never invented to fill the space. */
export interface IAchievementProgress {
  /** What the bar is filling towards. */
  target: string;
  current: number;
  goal: number;
  /** What is left to run, in the issuer's own terms. */
  caption: string;
}

export interface IAchievement {
  id: string;
  /** Short handle shown in the roster rail, set in caps. */
  codename: string;
  kind: AchievementKind;
  rarity: AchievementRarity;
  logo: IAchievementLogo;
  title: string;
  /** One line, shown under the codename in the rail. */
  summary: string;
  /** Dossier body copy — one paragraph per entry. */
  brief: string[];
  /** Who awarded it, and when, condensed for the rail. */
  issuer: string;
  unlockedOn: string;
  facts: IAchievementFact[];
  stats?: IAchievementStat[];
  progress?: IAchievementProgress;
  /** Certificate files, verification pages and live product links. */
  links?: IAchievementLink[];
}
