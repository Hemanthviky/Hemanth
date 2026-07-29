import { JOURNEY_CLOSING_LINE } from "@/data/experience";
import type { IJourneyMilestone } from "@/types/experience";
import { MilestoneCard } from "./MilestoneCard";

interface CircuitFallbackProps {
  milestones: IJourneyMilestone[];
}

/** Static milestone grid — the graceful degradation path when WebGL is
 * unavailable, and the always-readable companion under the reduced-motion
 * static scene. */
export function CircuitFallback({ milestones }: CircuitFallbackProps) {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {milestones.map((milestone, index) => (
          <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
        ))}
      </div>
      <p className="mt-12 -rotate-2 text-center font-script text-4xl font-bold text-black md:text-5xl">
        {JOURNEY_CLOSING_LINE}
      </p>
    </div>
  );
}
