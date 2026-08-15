export type CircuitStopState = "upcoming" | "active" | "visited";

export type CircuitLabelAnchor = "start" | "middle" | "end";

export type CircuitLabelTone = "default" | "drs";

export type CircuitMapMode = "drive" | "static";

export interface IJourneyMilestone {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  isPresent: boolean;
  /** The single "Current Role" — the milestone the lap treats as the car's
   * present position when motion is disabled. */
  isCurrent?: boolean;
  summary: string;
  tech: string[];
}

/** A coordinate in the circuit's authoring viewBox. */
export interface ICircuitPoint {
  x: number;
  y: number;
}

/** A corner the lap actually stops at. `point` must sit ON the track path (use
 * a curve endpoint) — the scroll threshold for the stop is sampled from the
 * drawn geometry, so a point off the asphalt would desynchronise the car from
 * its marker. */
export interface ICircuitStop {
  id: string;
  corner: string;
  turns: string;
  /** Apex speed, km/h — a ceiling handed to the velocity profile, not a
   * display value. The profile may end up slower still where the corner feeds
   * straight into a slower one, so the telemetry is the only speed shown. */
  approachSpeed: number;
  point: ICircuitPoint;
  /** Links the stop to an IJourneyMilestone; absent on the closing stop. */
  milestoneId?: string;
}

export interface ICircuitLabel {
  id: string;
  text: string;
  point: ICircuitPoint;
  anchor: CircuitLabelAnchor;
  tone?: CircuitLabelTone;
  /** Secondary corner names, revealed only where there is room for them. */
  minor?: boolean;
}

/** A short straight drawn on its own, currently just the start/finish line. */
export interface ICircuitSegment {
  id: string;
  from: ICircuitPoint;
  to: ICircuitPoint;
}

/** A stretch of track highlighted on top of the asphalt. Carries its own path
 * data — lifted verbatim from the track path — rather than two endpoints, so
 * the overlay sits exactly on the curve instead of chording across it. */
export interface ICircuitZone {
  id: string;
  d: string;
}

/** Where the car is, and how fast, at one instant of the lap. */
export interface ICircuitLapSample {
  /** Position along the track path, 0-1. */
  progress: number;
  /** Speed in km/h. */
  speed: number;
}

/** Maps elapsed lap time onto position and speed. Because time — not distance
 * — is what scroll drives, a metre of hairpin costs far more scroll than a
 * metre of the Hangar Straight. */
export interface ICircuitVelocityProfile {
  /** Position and speed at a normalised lap time, 0-1. */
  sample(time: number): ICircuitLapSample;
  /** Normalised lap time at which the car reaches a given path progress. */
  timeAt(progress: number): number;
}

/** Everything the info panel renders, resolved from the active stop. */
export interface ICircuitPanel {
  id: string;
  eyebrow: string;
  title: string;
  company?: string;
  body: string;
  meta?: string;
  tech?: string[];
  isPresent?: boolean;
}
