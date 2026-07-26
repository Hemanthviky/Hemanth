export type JourneyCardSide = "left" | "right";

export type JourneyRoadVariant = "desktop" | "mobile";

export type JourneyWaypointState = "upcoming" | "active" | "visited";

export interface IJourneyMilestone {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  isPresent: boolean;
  /** The single "Current Role" — where the car parks in the reduced-motion
   * static layout, and the milestone the legend's yellow dot refers to. */
  isCurrent?: boolean;
  summary: string;
  tech: string[];
}

export interface IJourneyWaypoint {
  x: number;
  y: number;
}

export interface IJourneyRoad {
  variant: JourneyRoadVariant;
  viewBox: string;
  width: number;
  height: number;
  /** The single path the car follows — also drawn as the road itself, so the
   * car's MotionPath motion is exactly the visible asphalt. */
  d: string;
  casingWidth: number;
  roadWidth: number;
  centerWidth: number;
  centerDash: string;
  marker: { glow: number; ring: number; ringStroke: number; core: number };
  carScale: number;
  /** ViewBox coords of each stop — must sit ON the path (curve endpoints).
   * Last entry is the "On The Way" finish marker; the rest map 1:1 to
   * JOURNEY_MILESTONES. */
  waypoints: IJourneyWaypoint[];
  /** Which side of the road each milestone card sits on. */
  cardSides: JourneyCardSide[];
}
