import type { JourneyRoadVariant } from "@/types/experience";

interface JourneyCarProps {
  scale: number;
  variant: JourneyRoadVariant;
}

/** Flat top-view car, drawn pointing right and centred on the SVG origin so
 * MotionPath's x/y/rotation land it exactly on the road, nose forward. The
 * accent glow beneath it is intensified by the drive hook near waypoints. */
export function JourneyCar({ scale, variant }: JourneyCarProps) {
  const glowFilterId = `journey-car-glow-${variant}`;

  return (
    <g data-car className="opacity-0">
      <defs>
        <filter id={glowFilterId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <g transform={`scale(${scale})`}>
        <ellipse
          data-car-glow
          cx="0"
          cy="0"
          rx="64"
          ry="46"
          className="fill-accent"
          opacity="0.18"
          filter={`url(#${glowFilterId})`}
        />

        {/* Wheels */}
        <rect x="-42" y="-30" width="24" height="12" rx="5" className="fill-background" />
        <rect x="-42" y="18" width="24" height="12" rx="5" className="fill-background" />
        <rect x="18" y="-30" width="24" height="12" rx="5" className="fill-background" />
        <rect x="18" y="18" width="24" height="12" rx="5" className="fill-background" />

        {/* Body */}
        <rect x="-50" y="-22" width="100" height="44" rx="17" className="fill-accent" />

        {/* Windshield + rear window */}
        <rect x="8" y="-15" width="11" height="30" rx="4" className="fill-background" opacity="0.85" />
        <rect x="-30" y="-15" width="9" height="30" rx="4" className="fill-background" opacity="0.6" />

        {/* Roof */}
        <rect x="-21" y="-16" width="28" height="32" rx="8" className="fill-accent-hover" />

        {/* Headlights */}
        <circle cx="46" cy="-11" r="4" className="fill-white" opacity="0.9" />
        <circle cx="46" cy="11" r="4" className="fill-white" opacity="0.9" />
      </g>
    </g>
  );
}
