import type { CSSProperties } from "react";
import {
  CIRCUIT_CAR,
  CIRCUIT_DRS_WIDTH,
  CIRCUIT_DRS_ZONES,
  CIRCUIT_LABELS,
  CIRCUIT_MARKER,
  CIRCUIT_START_LINE,
  CIRCUIT_START_LINE_WIDTH,
  CIRCUIT_STOPS,
  CIRCUIT_TRACK_HALO_WIDTH,
  CIRCUIT_TRACK_PATH,
  CIRCUIT_TRACK_WIDTH,
  CIRCUIT_VIEWBOX_HEIGHT,
  CIRCUIT_VIEWBOX_WIDTH,
} from "@/constants/circuit";
import type { CircuitLabelAnchor, CircuitMapMode, ICircuitPoint } from "@/types/experience";

const ANCHOR_CLASSES: Record<CircuitLabelAnchor, string> = {
  start: "-translate-y-1/2",
  middle: "-translate-x-1/2 -translate-y-1/2",
  end: "-translate-x-full -translate-y-1/2",
};

/** The SVG keeps its aspect ratio and fills the box, so viewBox coordinates map
 * straight onto container percentages — labels stay pinned to their corner at
 * every screen size without a single measurement. */
function labelStyle(point: ICircuitPoint): CSSProperties {
  return {
    left: `${(point.x / CIRCUIT_VIEWBOX_WIDTH) * 100}%`,
    top: `${(point.y / CIRCUIT_VIEWBOX_HEIGHT) * 100}%`,
  };
}

interface CircuitMapProps {
  /** "drive" renders the scroll-driven car and starts every marker unlit;
   * "static" is the reduced-motion twin, drawn as a completed lap. */
  mode?: CircuitMapMode;
}

export function CircuitMap({ mode = "drive" }: CircuitMapProps) {
  const isDriving = mode === "drive";
  const initialState = isDriving ? "upcoming" : "visited";
  const glowFilterId = `circuit-car-glow-${mode}`;

  return (
    <div className="circuit-map">
      <svg
        viewBox={`0 0 ${CIRCUIT_VIEWBOX_WIDTH} ${CIRCUIT_VIEWBOX_HEIGHT}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        aria-hidden
      >
        <defs>
          <filter id={glowFilterId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <path
          d={CIRCUIT_TRACK_PATH}
          strokeWidth={CIRCUIT_TRACK_HALO_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-foreground/[0.04]"
        />
        <path
          data-circuit-path
          d={CIRCUIT_TRACK_PATH}
          strokeWidth={CIRCUIT_TRACK_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-foreground/40"
        />
        {/* Asphalt already driven, revealed by the drive hook. */}
        <path
          data-circuit-trace
          d={CIRCUIT_TRACK_PATH}
          strokeWidth={CIRCUIT_TRACK_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-accent"
          opacity={isDriving ? 0 : 1}
        />

        {CIRCUIT_DRS_ZONES.map((zone) => (
          <path
            key={zone.id}
            data-circuit-drs
            d={zone.d}
            strokeWidth={CIRCUIT_DRS_WIDTH}
            strokeLinecap="round"
            className="stroke-success"
          />
        ))}

        <line
          x1={CIRCUIT_START_LINE.from.x}
          y1={CIRCUIT_START_LINE.from.y}
          x2={CIRCUIT_START_LINE.to.x}
          y2={CIRCUIT_START_LINE.to.y}
          strokeWidth={CIRCUIT_START_LINE_WIDTH}
          strokeLinecap="round"
          className="stroke-error"
        />

        {CIRCUIT_STOPS.map((stop) => (
          <g key={stop.id} data-circuit-stop data-state={initialState} className="group">
            <circle
              cx={stop.point.x}
              cy={stop.point.y}
              r={CIRCUIT_MARKER.glow}
              className="origin-center fill-accent opacity-0 transition-opacity duration-300 [transform-box:fill-box] group-data-[state=active]:opacity-25 motion-safe:group-data-[state=active]:animate-corner-pulse"
            />
            <circle
              cx={stop.point.x}
              cy={stop.point.y}
              r={CIRCUIT_MARKER.ring}
              strokeWidth={CIRCUIT_MARKER.ringStroke}
              className="fill-background stroke-foreground/35 transition-colors duration-300 group-data-[state=visited]:stroke-accent/60 group-data-[state=active]:stroke-accent"
            />
            <circle
              cx={stop.point.x}
              cy={stop.point.y}
              r={CIRCUIT_MARKER.core}
              className="fill-transparent transition-colors duration-300 group-data-[state=visited]:fill-accent/60 group-data-[state=active]:fill-accent"
            />
          </g>
        ))}

        {/* Drawn at the origin: the drive hook translates and rotates the whole
         * group onto the sampled path point. */}
        {isDriving && (
          <g data-circuit-car opacity="0">
            <circle
              r={CIRCUIT_CAR.glow}
              filter={`url(#${glowFilterId})`}
              className="fill-accent opacity-70"
            />
            <circle r={CIRCUIT_CAR.core} className="fill-foreground" />
          </g>
        )}
      </svg>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {CIRCUIT_LABELS.map((label) => (
          <span
            key={label.id}
            data-circuit-label
            style={labelStyle(label.point)}
            className={`absolute whitespace-nowrap font-mono text-[0.58rem] uppercase leading-none tracking-[0.2em] md:text-[0.68rem] ${
              ANCHOR_CLASSES[label.anchor]
            } ${label.tone === "drs" ? "text-success" : "text-secondary/70"} ${
              label.minor ? "invisible lg:visible" : "invisible md:visible"
            }`}
          >
            {label.text}
          </span>
        ))}
      </div>
    </div>
  );
}
