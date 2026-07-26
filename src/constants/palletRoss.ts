/** Local design tokens for the Pallet Ross showcase reel — a self-contained
 *  replica of an external product demo, styled independently of the
 *  portfolio's dark theme (the "browser card" it recreates is white). */
export const PR_COLORS = {
  surface: "#FFFFFF",
  surfaceAlt: "#F9F9F9",
  text: "#171717",
  textMuted: "#8C8C8C",
  coral: "#E25A3D",
  red: "#C0392B",
  purple: "#CC3BFB",
  blue: "#1B1FFB",
  lime: "#ECF868",
  teal: "#7FE0C8",
} as const;

/** Ambient backdrop hue behind the card, one per scene (grey → orange → blue → purple → yellow). */
export const SCENE_BACKDROP_COLORS = [
  "#9CA3AF",
  "#E25A3D",
  "#E25A3D",
  "#CC3BFB",
  "#1B1FFB",
  "#7FE0C8",
  "#CC3BFB",
  "#CC3BFB",
  "#ECF868",
  "#ECF868",
] as const;

export const PR_NAV_LINKS = [
  "Get Started",
  "Create strategy",
  "Pricing",
  "Contact",
  "Solution",
  "E-Commerce",
] as const;

export const PR_SCENE_COUNT = 10;
export const PR_SCENE_DURATION_MS = 3000;
export const PR_TRANSITION_DURATION_S = 0.7;
export const PR_TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;
