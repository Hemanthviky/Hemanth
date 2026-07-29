/** WebGL materials and canvas textures cannot read CSS custom properties, so
 * the design tokens they need are mirrored here exactly once. Nothing else in
 * the scene may inline a hex value. */
export const SCENE_COLORS = {
  background: "#0a0a0c",
  asphalt: "#1c1c22",
  laneLine: "#f5f5f0",
  carbon: "#16161a",
  racingRed: "#e10600",
  signalYellow: "#ffcc00",
  keyLight: "#fff4e0",
  fillLight: "#4a5568",
  tire: "#0d0d0f",
  rim: "#9a9aa2",
  gunmetal: "#33333b",
} as const;

/** Stadium loop: one long straight that faces the camera, a sweeping corner at
 * each end, and a shorter return leg. Deliberately generic — it is not modelled
 * on any real circuit. */
export const HERO_TRACK = {
  straightHalfLength: 34,
  cornerRadius: 15,
  returnOffset: 26,
  width: 9,
  segments: 420,
  laneTiles: 60,
  groundRadius: 130,
} as const;

export const HERO_CAR = {
  /** Metres per second along the centreline — a steady, readable pace. */
  speed: 15,
  wheelRadius: 0.33,
  /** Suspension bob: amplitude in metres, cycles per second. */
  bobAmplitude: 0.012,
  bobFrequency: 1.6,
  /** Deliberately faint — the saturated livery reads far stronger in a mirror
   * than the carbon does, and anything higher looks like a second car. */
  reflectionOpacity: 0.07,
} as const;

/** Chase rig held at a fixed 3/4-front offset from the car, so the car stays
 * framed while the circuit streams past it. The lateral look-at shift is what
 * seats the car right-of-centre, clear of the HUD panel on the left. */
export const HERO_CAMERA = {
  fov: 42,
  /** Ahead of the car (+) so the shot shows its front three-quarter. */
  forward: 11.5,
  lateral: 5.7,
  /** Sets the track's angle in frame: atan(height / offset) lands at ~17°. */
  height: 3.9,
  lookHeight: 0.6,
  /** Shifting the look-at away from the camera side seats the car
   * right-of-centre, clear of the HUD panel. */
  lookLateralShift: -3.2,
  /** Barely perceptible breathing drift. */
  driftAmplitude: 0.16,
  driftFrequency: 0.08,
  fogNear: 22,
  fogFar: 70,
} as const;

export const HERO_LIGHTS = {
  keyIntensity: 3.2,
  keyOffset: [4.5, 5.2, 3.2],
  fillIntensity: 1.1,
  fillOffset: [-5, 2.6, -2.4],
  ambientIntensity: 0.32,
  shadowBounds: 7,
  shadowFar: 24,
} as const;

export const HERO_PARTICLES = {
  count: 44,
  /** Spawn box behind the rear wheels, in car-local metres. */
  spread: [1.9, 1.1, 3.2],
  originZ: -2.6,
  driftSpeed: 0.55,
  size: 0.1,
  opacity: 0.1,
} as const;

/** Mobile drops the mirrored car, the heat haze and half the shadow map. */
export const HERO_QUALITY = {
  high: { shadowMapSize: 1024, reflection: true, particles: true },
  low: { shadowMapSize: 512, reflection: false, particles: false },
} as const;

export const HERO_DPR: [number, number] = [1, 2];
