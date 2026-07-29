import { JOURNEY_CLOSING_LINE } from "@/data/experience";
import type { IJourneyMilestone } from "@/types/experience";
import { MilestoneCard } from "./MilestoneCard";

interface MilestoneOverlayProps {
  milestones: IJourneyMilestone[];
}

/** DOM layer over the pinned canvas. CircuitJourney drives every element's
 * opacity/translate via GSAP quickSetters from ScrollTrigger progress — the 3D
 * pit boards are the flourish, these cards are the accessible content. The
 * outer wrappers own the CSS centring transforms so GSAP's inline transform on
 * the inner node never fights them. */
export function MilestoneOverlay({ milestones }: MilestoneOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {milestones.map((milestone, index) => (
        <div
          key={milestone.id}
          className="absolute inset-x-5 bottom-8 md:inset-x-auto md:bottom-auto md:left-12 md:top-1/2 md:w-96 md:-translate-y-1/2 lg:left-20"
        >
          <div data-circuit-card style={{ opacity: 0 }} className="will-change-[opacity,transform]">
            <MilestoneCard milestone={milestone} index={index} />
          </div>
        </div>
      ))}

      <p
        data-circuit-closing
        style={{ opacity: 0 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 -rotate-3 text-center font-script text-5xl font-bold text-black md:text-7xl"
      >
        {JOURNEY_CLOSING_LINE}
      </p>

      <div
        data-circuit-hint
        className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-black/40"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">Scroll to drive</span>
        <span className="h-8 w-px bg-black/25 motion-safe:animate-pulse" />
      </div>
    </div>
  );
}
