import { JOURNEY_DESKTOP_ROAD, JOURNEY_MOBILE_ROAD } from "@/constants/journey";
import { JourneyTrack } from "./JourneyTrack";

/** Renders both road layouts; each JourneyTrack only initialises its GSAP
 * journey when its own breakpoint matches (gsap.matchMedia inside the drive
 * hook), so the CSS-hidden twin stays completely inert. */
export function JourneyRoad() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <JourneyTrack road={JOURNEY_DESKTOP_ROAD} className="hidden lg:block" />
      <JourneyTrack road={JOURNEY_MOBILE_ROAD} className="lg:hidden" />
    </div>
  );
}
