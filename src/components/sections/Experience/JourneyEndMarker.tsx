import type { CSSProperties } from "react";
import { JOURNEY_CLOSING_LINE, JOURNEY_END_LABEL } from "@/data/experience";

/** Checkered finish flag — tiny bespoke illustration, drawn inline like the
 * car since no icon library ships a proper checkered pattern. */
function FinishFlagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-black/70" aria-hidden>
      <path d="M6 3v18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="6" y="4" width="12" height="9" fill="white" stroke="currentColor" strokeWidth="1.4" />
      <rect x="6" y="4" width="3" height="3" fill="currentColor" />
      <rect x="12" y="4" width="3" height="3" fill="currentColor" />
      <rect x="9" y="7" width="3" height="3" fill="currentColor" />
      <rect x="15" y="7" width="3" height="3" fill="currentColor" />
      <rect x="6" y="10" width="3" height="3" fill="currentColor" />
      <rect x="12" y="10" width="3" height="3" fill="currentColor" />
    </svg>
  );
}

interface JourneyEndMarkerProps {
  style: CSSProperties;
}

/** "On The Way" — the road's final hollow waypoint gets a finish flag and a
 * handwritten closing line instead of a milestone card. */
export function JourneyEndMarker({ style }: JourneyEndMarkerProps) {
  return (
    <div className="absolute -translate-y-1/2" style={style}>
      <div data-journey-end className="flex flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <FinishFlagIcon />
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-black/45">
            {JOURNEY_END_LABEL}
          </span>
        </span>
        <p className="font-script text-[1.5rem] leading-snug text-black/70 md:text-[1.75rem]">
          {JOURNEY_CLOSING_LINE}
        </p>
      </div>
    </div>
  );
}
