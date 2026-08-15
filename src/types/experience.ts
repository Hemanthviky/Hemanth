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
  /** Apex speed, km/h — the readout the telemetry brakes down to. */
  approachSpeed: number;
  /** Top speed reached on the straight leading into this corner, km/h. */
  straightSpeed: number;
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
