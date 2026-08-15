import type {
  ICircuitLabel,
  ICircuitPoint,
  ICircuitSegment,
  ICircuitStop,
  ICircuitZone,
} from "@/types/experience";

/** Authoring space for the whole circuit. Track anchors, corner labels, DRS
 * overlays and stop markers all live in this box, so the HTML label layer can
 * position itself in plain percentages of the same coordinates — provided its
 * container keeps this exact aspect ratio (see `.circuit-map` in globals.css). */
export const CIRCUIT_VIEWBOX_WIDTH = 1000;
export const CIRCUIT_VIEWBOX_HEIGHT = 620;

/** Silverstone, traced off the official F1 circuit map and fitted to the box
 * above. Written in racing direction from the start/finish line: the numbered
 * corners below are the anchor points of the curve, so stop markers and DRS
 * overlays can reuse those coordinates and land exactly on the asphalt.
 *
 * T1 Abbey · T2 Farm · T3 Village · T4 The Loop · T5 Aintree · T6 Brooklands
 * T7 Luffield · T8 Woodcote · T9 Copse · T10–13 Maggotts/Becketts · T14 Chapel
 * T15 Stowe · T16 Vale · T17 Club — then the Hamilton Straight back to the line. */
export const CIRCUIT_TRACK_PATH = [
  "M 356 97",
  "C 379.4 114.2 406 134.4 430 152",
  "C 452.4 168.4 481.3 182.7 495 199",
  "C 503.9 209.7 500.1 221.7 498 233",
  "C 495.7 245.3 488.4 257.3 482 270",
  "C 474.8 284.3 462.1 299.6 457 314",
  "C 452.8 326 450.9 339.4 454 349",
  "C 456.9 357.7 465.8 364.4 475 369",
  "C 485.8 374.4 501 376.1 514 379",
  "C 526.7 381.8 548.4 382.2 552 386",
  "C 554.8 388.9 540.1 396 533 399",
  "C 525.7 402 515.8 401 509 404",
  "C 503.1 406.6 497 412.1 495 416",
  "C 493.6 418.7 497.5 420.3 499 424",
  "C 501.5 429.9 501.7 439.6 507 445",
  "C 513.1 451.2 522.4 456.3 533 459",
  "C 546.1 462.3 564.1 462.3 578 463",
  "C 589.5 463.6 596 474.2 609 463",
  "C 636.6 439.2 669.7 393 700 358",
  "C 730.3 323 768.6 284.5 791 253",
  "C 803.9 234.8 804.7 222.8 806 209",
  "C 807.1 197.4 802.4 186.8 798 177",
  "C 793.7 167.4 787.8 158 780 151",
  "C 771.8 143.7 752.3 138.6 750 134",
  "C 748.3 130.6 760.6 127.3 768 127",
  "C 777.9 126.6 790.7 127.9 802 132",
  "C 814.7 136.6 827.6 145.2 840 153",
  "C 852.6 160.9 866.7 169.4 877 179",
  "C 886 187.4 892.9 194.1 898 207",
  "C 904.9 224.5 909.5 247.9 913 270",
  "C 916.8 293.9 919.5 321.8 920 345",
  "C 920.5 364.5 919.3 381.4 916 398",
  "C 913 413.4 909 429 901 441",
  "C 893.3 452.6 882.1 462 869 469",
  "C 854.1 477 836.5 481.9 817 486",
  "C 794.1 490.9 767.6 492.7 742 496",
  "C 715.3 499.4 681.8 500.6 660 506",
  "C 648.2 508.9 646.9 515.4 641 521",
  "C 634.9 526.7 630.9 537.8 624 540",
  "C 617.2 542.2 609.5 535.3 600 534",
  "C 587.8 532.3 571 528.8 559 531",
  "C 548.7 532.8 543 542.3 533 546",
  "C 521.6 550.3 506.2 555 495 555",
  "C 486.2 555 480.3 550.1 473 546",
  "C 464.9 541.4 456.2 536.1 449 529",
  "C 441.2 521.4 434.4 510.7 428 502",
  "C 422.4 494.3 418.9 486.6 413 480",
  "C 406.9 473.3 404.7 469.9 392 462",
  "C 367.1 446.6 331.4 427.6 300 410",
  "C 267.4 391.6 233.1 372.5 200 354",
  "C 167.4 335.8 124.1 321.3 103 300",
  "C 87.8 284.7 92.7 259.7 91 244",
  "C 90 235.1 92 231.7 95 226",
  "C 98.4 219.4 104.2 212.1 110 207",
  "C 115.5 202.1 119.8 199 129 196",
  "C 143.4 191.3 165.6 191 181 184",
  "C 195.6 177.4 208.5 164.5 219 155",
  "C 226.9 147.8 234.4 140.9 236 134",
  "C 237.4 128.2 227.4 122.5 228 117",
  "C 228.7 111.2 235.5 105.5 240 100",
  "C 244.8 94.2 249.9 88.5 256 83",
  "C 262.9 76.8 271.5 70 279 65",
  "C 285.5 60.7 288.9 51.2 298 55",
  "C 314.6 61.9 335.4 81.9 356 97",
  "Z",
].join(" ");

/** Drawn perpendicular to the track's tangent on the Hamilton Straight. */
export const CIRCUIT_START_LINE: ICircuitSegment = {
  id: "start-finish",
  from: { x: 364, y: 87 },
  to: { x: 348, y: 108 },
};

/** The two overtaking straights: Wellington (T5 → T6) and Hangar (T14 → T15),
 * each cut verbatim out of the track path so the overlay never chords. */
export const CIRCUIT_DRS_ZONES: ICircuitZone[] = [
  {
    id: "wellington",
    d: "M 609 463 C 636.6 439.2 669.7 393 700 358 C 730.3 323 768.6 284.5 791 253",
  },
  {
    id: "hangar",
    d: "M 392 462 C 367.1 446.6 331.4 427.6 300 410 C 267.4 391.6 233.1 372.5 200 354",
  },
];

/** Ordered along the lap. The first three carry a career milestone; the last is
 * the closing beat, so it deliberately has no `milestoneId`. */
export const CIRCUIT_STOPS: ICircuitStop[] = [
  {
    id: "brooklands",
    corner: "Brooklands · Luffield",
    turns: "Turns 6–7",
    approachSpeed: 145,
    straightSpeed: 300,
    point: { x: 806, y: 209 },
    milestoneId: "diagonal-labs",
  },
  {
    id: "copse",
    corner: "Copse",
    turns: "Turn 9",
    approachSpeed: 290,
    straightSpeed: 320,
    point: { x: 901, y: 441 },
    milestoneId: "indsys-technologies",
  },
  {
    id: "stowe",
    corner: "Stowe",
    turns: "Turn 15",
    approachSpeed: 250,
    straightSpeed: 335,
    point: { x: 103, y: 300 },
    milestoneId: "self-employed",
  },
  {
    id: "club",
    corner: "Club",
    turns: "Turn 17",
    approachSpeed: 185,
    straightSpeed: 290,
    point: { x: 240, y: 100 },
  },
];

/** Corner names ringing the track, each placed clear of the asphalt on the side
 * with room for it. `minor` entries only appear on wide screens, where they
 * read as circuit detail rather than clutter. */
export const CIRCUIT_LABELS: ICircuitLabel[] = [
  { id: "hamilton", text: "Hamilton Straight", point: { x: 420, y: 75 }, anchor: "start", minor: true },
  { id: "abbey", text: "Abbey", point: { x: 515, y: 185 }, anchor: "start", minor: true },
  { id: "village", text: "Village", point: { x: 572, y: 380 }, anchor: "start", minor: true },
  { id: "loop", text: "The Loop", point: { x: 480, y: 430 }, anchor: "end", minor: true },
  { id: "wellington", text: "Wellington Str.", point: { x: 760, y: 400 }, anchor: "start", minor: true },
  { id: "wellington-drs", text: "DRS", point: { x: 720, y: 340 }, anchor: "start", tone: "drs" },
  { id: "brooklands", text: "Brooklands · Luffield", point: { x: 735, y: 105 }, anchor: "end" },
  { id: "woodcote", text: "Woodcote", point: { x: 900, y: 150 }, anchor: "start", minor: true },
  { id: "copse", text: "Copse", point: { x: 920, y: 465 }, anchor: "start" },
  { id: "maggotts", text: "Maggotts · Becketts", point: { x: 600, y: 590 }, anchor: "middle", minor: true },
  { id: "chapel", text: "Chapel", point: { x: 405, y: 540 }, anchor: "end", minor: true },
  { id: "hangar", text: "Hangar Straight", point: { x: 330, y: 375 }, anchor: "middle", minor: true },
  { id: "hangar-drs", text: "DRS", point: { x: 215, y: 335 }, anchor: "start", tone: "drs" },
  { id: "stowe", text: "Stowe", point: { x: 85, y: 300 }, anchor: "end" },
  { id: "vale", text: "Vale", point: { x: 200, y: 105 }, anchor: "end", minor: true },
  { id: "club", text: "Club", point: { x: 232, y: 62 }, anchor: "end" },
];

/** Stroke weights, in viewBox units. */
export const CIRCUIT_TRACK_WIDTH = 4.5;
export const CIRCUIT_TRACK_HALO_WIDTH = 14;
export const CIRCUIT_DRS_WIDTH = 4.5;
export const CIRCUIT_START_LINE_WIDTH = 4.5;

/** Stop marker and car radii, in viewBox units. */
export const CIRCUIT_MARKER = { glow: 20, ring: 8, ringStroke: 2, core: 3.5 };
export const CIRCUIT_CAR = { glow: 15, core: 5.5 };

/** Scroll timeline shape. Each stop gets one `drive` unit to reach it and one
 * `dwell` unit parked on the apex, which is the window the panel is readable
 * in; the driving share of each unit spent accelerating sets where the speed
 * readout peaks before the braking zone. */
export const CIRCUIT_DRIVE_DURATION = 1;
export const CIRCUIT_DWELL_DURATION = 0.9;
export const CIRCUIT_ACCEL_SHARE = 0.62;
export const CIRCUIT_OUTLAP_SHARE = 0.45;

/** Telemetry range, km/h. The idle readout is what the car shows on the grid. */
export const CIRCUIT_IDLE_SPEED = 39;
export const CIRCUIT_TOP_SPEED = 340;

/** Lower speed bound of each gear; the count of bounds cleared IS the gear. */
export const CIRCUIT_GEAR_FLOORS = [0, 75, 125, 175, 220, 260, 300];

/** How close, in path progress, the car must be for a stop to count as reached. */
export const CIRCUIT_ARRIVAL_EPS = 0.004;

export const CIRCUIT_STOP_POINTS: ICircuitPoint[] = CIRCUIT_STOPS.map((stop) => stop.point);
