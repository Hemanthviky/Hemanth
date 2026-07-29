/** Single source of truth for the 3D Experience circuit. WebGL materials and
 * canvas textures can't read CSS variables, so the palette hexes from
 * globals.css are mirrored here once instead of being inlined per component. */

export const CIRCUIT_SCROLL_DISTANCE = "+=380%";

/** Lap fraction where each milestone's pit board stands. The lap starts at the
 * ground-level pass of the figure-eight, so 0.5 lands exactly on the elevated
 * bridge crossover — the current role gets the signature visual beat. */
export const CIRCUIT_MILESTONE_TS: readonly [number, number, number] = [0.15, 0.5, 0.85];

export const CIRCUIT_FINISH_T = 0.99;

export interface ICircuitFadeWindow {
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
}

/** Overlay card choreography relative to scroll progress; each window brackets
 * its milestone t so the card is fully readable as the car passes the board. */
export const CIRCUIT_OVERLAY_WINDOWS: readonly ICircuitFadeWindow[] = [
  { inStart: 0.06, inEnd: 0.115, outStart: 0.235, outEnd: 0.3 },
  { inStart: 0.41, inEnd: 0.465, outStart: 0.585, outEnd: 0.65 },
  { inStart: 0.76, inEnd: 0.815, outStart: 0.915, outEnd: 0.95 },
];

export const CIRCUIT_CLOSING_WINDOW = { inStart: 0.945, inEnd: 0.985 } as const;

export const CIRCUIT_HINT_FADE_END = 0.04;

/** Lambda for MathUtils.damp easing the raw ScrollTrigger progress each frame —
 * the touch of momentum that separates "driving" from "slideshow". */
export const CIRCUIT_PROGRESS_LAMBDA = 2.6;

export const CIRCUIT_TRACK = {
  controlPoints: 64,
  xRadius: 62,
  zStretch: 2.6,
  bridgeHeight: 4.4,
  bridgeSigma: 0.55,
  width: 4.6,
  segments: 720,
  laneTiles: 90,
  curbInset: 0.05,
  curbWidth: 0.55,
  curbLift: 0.03,
  curbTileLength: 1.4,
} as const;

export const CIRCUIT_CAMERA = {
  fov: 50,
  distance: 8.5,
  height: 3.9,
  lookAheadUnits: 6,
  lookAheadLift: 0.7,
  positionLambda: 3.4,
  targetLambda: 4.6,
  rollProbeUnits: 8,
  rollGain: 0.55,
  maxRoll: 0.085,
  rollLambda: 3,
} as const;

export const CIRCUIT_CAR = { wheelRadius: 0.33 } as const;

/** The sun follows the car so its shadow frustum stays tight — that keeps the
 * contact shadow crisp with a modest 1024px map. Warm color + lower angle for
 * a late-afternoon "race day" look with longer shadows and rim light. */
export const CIRCUIT_LIGHT = {
  offset: [20, 15, 8],
  shadowSize: 22,
  shadowFar: 100,
  intensity: 2.0,
} as const;

export const CIRCUIT_MARKER = {
  /** Lateral distance from the track centreline; marker 2 stands on the bridge
   * deck edge itself (deck half-width is 2.3) so it isn't floating mid-air. */
  lateral: [4.3, 2.05, 4.3],
  sides: [-1, 1, -1],
  rampSpan: 0.045,
  baseEmissive: 0.1,
  passedEmissive: 0.75,
  currentEmissive: 1.15,
  pulseAmplitude: 0.35,
} as const;

export const CIRCUIT_BRIDGE_PILLAR_TS: readonly number[] = [0.472, 0.528];

export const CIRCUIT_GRANDSTANDS: readonly { t: number; side: 1 | -1; distance: number }[] = [
  { t: 0.12, side: -1, distance: 11.5 },
  { t: 0.38, side: 1, distance: 12.5 },
  { t: 0.8, side: -1, distance: 11.5 },
];

export const CIRCUIT_FOG = { near: 70, far: 230 } as const;

/** Site-palette mirror (globals.css) — UI-adjacent scene colors only. The
 * racing environment gets its own block below so the two never blur. */
export const CIRCUIT_COLORS = {
  carDark: "#0b0b0f",
  accent: "#f59e0b",
  accentHover: "#fbbf24",
  checkerDark: "#111114",
  checkerLight: "#fafafa",
  signPanel: "#131318",
  signText: "#ffffff",
  signMuted: "#a1a1aa",
} as const;

/** Racing-environment palette: everything that makes the scene read as a real
 * sunlit circuit rather than the site's monochrome UI. The car's deep navy is
 * deliberately its own "team color", distinct from the black/yellow site
 * palette; the site yellow stays a secondary accent on it. */
export const CIRCUIT_ENVIRONMENT_COLORS = {
  trackAsphalt: "#2b2b2f",
  laneLine: "#f5f5f5",
  kerbRed: "#c8102e",
  kerbWhite: "#f2efe9",
  runoffGreen: "#4c9e53",
  gravelTan: "#d8c9a3",
  ground: "#c9d3bd",
  hill: "#b9c7ad",
  concrete: "#b9bcc0",
  barrierWhite: "#e9e9e6",
  barrierRed: "#c8102e",
  carBodyPrimary: "#1c2f56",
  carGunmetal: "#4b505a",
  tireTread: "#0d0d0f",
  tireSidewall: "#101014",
  sunlight: "#fff4e0",
  fog: "#f7f2ea",
  hemisphereSky: "#dfe9f5",
  hemisphereGround: "#cfd6c3",
  skyTop: "#d9e8f7",
  skyHorizon: "#faf4ea",
  skyBottom: "#f3ead9",
  grandstandStructure: "#d7d9dd",
  grandstandRoof: "#2f3138",
  crowdBase: "#52565f",
  crowdPalette: ["#a26769", "#7d98a1", "#a1a57d", "#8d7da1", "#b3b3ab", "#c9a66b"],
  lightRed: "#e11d2e",
} as const;

/** Track-edge dressing bands: track → green astro-turf → gravel trap, plus
 * corner rubber lines, bridge guardrails and outer-corner barriers. Runoff
 * only exists where the deck is at ground level (below lowMax); guardrails
 * only where it's clearly elevated (above highMin). */
export const CIRCUIT_TRACK_DRESSING = {
  runoff: {
    gap: 0.08,
    greenWidth: 1.4,
    gravelWidth: 4.2,
    greenLift: 0.012,
    gravelLift: 0.008,
    gravelTile: 6,
    lowMax: 0.4,
    highMin: 0.6,
  },
  rubber: { offset: 0.5, width: 0.95, lift: 0.012, opacity: 0.18 },
  guardrail: { offset: 2.45, height: 0.5, tile: 4 },
  barrier: { offset: 8.5, height: 0.65, tile: 3, maxY: 0.4 },
} as const;

/** Decorative trackside dressing: start banner, marshal flag posts and the
 * low-poly horizon hills that keep the world edge from feeling like a void. */
export const CIRCUIT_SCENERY = {
  startBanner: { t: 0.02, side: -1, lateral: 4.0 },
  marshalLateral: 3.4,
  marshalPosts: [
    { t: 0.25, side: 1, flag: "yellow" },
    { t: 0.62, side: -1, flag: "checker" },
    { t: 0.9, side: 1, flag: "yellow" },
  ],
  hills: [
    { angle: 0.4, distance: 150, width: 60, height: 10 },
    { angle: 1.2, distance: 160, width: 80, height: 14 },
    { angle: 2.2, distance: 140, width: 55, height: 9 },
    { angle: 3.4, distance: 155, width: 75, height: 12 },
    { angle: 4.5, distance: 150, width: 65, height: 11 },
    { angle: 5.5, distance: 160, width: 85, height: 13 },
  ],
} as const;
