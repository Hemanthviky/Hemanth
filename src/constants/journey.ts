import type { IJourneyRoad } from "@/types/experience";

/** Path-progress window before a waypoint over which its card scrubs in. */
export const JOURNEY_CARD_REVEAL_SPAN = 0.07;

/** How close (in path progress) the car must be for a waypoint to count as reached. */
export const JOURNEY_ARRIVAL_EPS = 0.02;

/** Path-progress radius around a waypoint where the car's under-glow intensifies. */
export const JOURNEY_GLOW_RADIUS = 0.07;
export const JOURNEY_GLOW_BASE = 0.18;
export const JOURNEY_GLOW_BOOST = 0.45;

/** Horizontal gap between a waypoint and its card / end label, as % of track width. */
export const JOURNEY_CARD_GAP_PCT = 7;
export const JOURNEY_END_GAP_PCT = 5;
export const JOURNEY_CARD_WIDTH_PCT = 34;

/** Wide zigzag: each cubic segment sweeps the road across to the other side,
 * with vertical tangents at every waypoint so the joins stay smooth. Waypoints
 * are the exact curve endpoints, so markers sit precisely on the asphalt. */
export const JOURNEY_DESKTOP_ROAD: IJourneyRoad = {
  variant: "desktop",
  viewBox: "0 0 1000 2350",
  width: 1000,
  height: 2350,
  d: "M 520 60 C 520 220 200 240 200 420 C 200 620 800 640 800 1000 C 800 1360 200 1400 200 1760 C 200 2040 620 2080 640 2260",
  casingWidth: 76,
  roadWidth: 64,
  centerWidth: 5,
  centerDash: "26 30",
  marker: { glow: 30, ring: 15, ringStroke: 5, core: 7 },
  carScale: 1,
  waypoints: [
    { x: 200, y: 420 },
    { x: 800, y: 1000 },
    { x: 200, y: 1760 },
    { x: 640, y: 2260 },
  ],
  cardSides: ["right", "left", "right"],
};

/** Same mechanic, gentle amplitude: the road hugs the left third so cards get
 * the remaining width; all cards sit to the right of the road. */
export const JOURNEY_MOBILE_ROAD: IJourneyRoad = {
  variant: "mobile",
  viewBox: "0 0 400 2000",
  width: 400,
  height: 2000,
  d: "M 84 40 C 84 200 62 240 62 430 C 62 640 112 700 112 930 C 112 1160 62 1220 62 1430 C 62 1620 104 1680 106 1870",
  casingWidth: 42,
  roadWidth: 34,
  centerWidth: 3,
  centerDash: "14 16",
  marker: { glow: 17, ring: 9, ringStroke: 3, core: 4.5 },
  carScale: 0.55,
  waypoints: [
    { x: 62, y: 430 },
    { x: 112, y: 930 },
    { x: 62, y: 1430 },
    { x: 106, y: 1870 },
  ],
  cardSides: ["right", "right", "right"],
};
