import type { IJourneyRoad } from "@/types/experience";
import { JourneyCar } from "./JourneyCar";

interface JourneyRoadSvgProps {
  road: IJourneyRoad;
}

/** The road as a physical illustration on the white page: dark casing + asphalt
 * strokes with a dashed white centre line, plus the waypoint markers and the
 * car. All state styling is driven by data-state attributes the drive hook
 * flips, with Tailwind group-data variants handling the transitions. */
export function JourneyRoadSvg({ road }: JourneyRoadSvgProps) {
  const shadowFilterId = `journey-road-shadow-${road.variant}`;
  const finishIndex = road.waypoints.length - 1;
  const { glow, ring, ringStroke, core } = road.marker;

  return (
    <svg viewBox={road.viewBox} className="block h-auto w-full" fill="none" aria-hidden>
      <defs>
        <filter id={shadowFilterId} x="-20%" y="-10%" width="140%" height="120%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#0B0B0F" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* Road body — casing edge, asphalt fill, dashed lane marking */}
      <g filter={`url(#${shadowFilterId})`}>
        <path
          data-road-casing
          d={road.d}
          strokeWidth={road.casingWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-background"
        />
        <path
          data-road-asphalt
          d={road.d}
          strokeWidth={road.roadWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-border"
        />
      </g>
      <path
        data-road-center
        d={road.d}
        strokeWidth={road.centerWidth}
        strokeLinecap="round"
        strokeDasharray={road.centerDash}
        className="stroke-white"
        opacity="0.9"
      />

      {/* Waypoints — the last one is the hollow "On The Way" finish marker */}
      {road.waypoints.map((wp, i) => {
        const isFinish = i === finishIndex;
        return (
          <g key={`${wp.x}-${wp.y}`} data-waypoint data-state="upcoming" className="group">
            <circle
              cx={wp.x}
              cy={wp.y}
              r={glow}
              className="fill-accent opacity-0 transition-opacity duration-300 [transform-box:fill-box] origin-center group-data-[state=active]:opacity-35 motion-safe:group-data-[state=active]:animate-waypoint-pulse"
            />
            <circle
              cx={wp.x}
              cy={wp.y}
              r={ring}
              strokeWidth={ringStroke}
              strokeDasharray={isFinish ? `${ringStroke} ${ringStroke * 1.6}` : undefined}
              className={
                isFinish
                  ? "fill-white stroke-muted transition-colors duration-300 group-data-[state=active]:stroke-accent"
                  : "fill-white stroke-border transition-colors duration-300 group-data-[state=visited]:stroke-muted group-data-[state=active]:stroke-accent"
              }
            />
            {!isFinish && (
              <circle
                cx={wp.x}
                cy={wp.y}
                r={core}
                className="fill-transparent transition-colors duration-300 group-data-[state=visited]:fill-muted group-data-[state=active]:fill-accent"
              />
            )}
          </g>
        );
      })}

      <JourneyCar scale={road.carScale} variant={road.variant} />
    </svg>
  );
}
