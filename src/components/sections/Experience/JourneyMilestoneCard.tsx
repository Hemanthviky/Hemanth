import type { CSSProperties } from "react";
import { TechStackRow } from "@/components/shared/TechStackRow";
import type { IJourneyMilestone, JourneyCardSide } from "@/types/experience";

interface JourneyMilestoneCardProps {
  milestone: IJourneyMilestone;
  index: number;
  side: JourneyCardSide;
  /** Absolute position beside this milestone's waypoint, computed from the
   * road geometry by JourneyTrack. */
  style: CSSProperties;
}

/** Compact stop card beside its waypoint. The outer wrapper owns positioning
 * (translate centring) so GSAP can freely animate the inner article's
 * transform during the scrubbed slide-in without the two fighting. */
export function JourneyMilestoneCard({ milestone, index, side, style }: JourneyMilestoneCardProps) {
  return (
    <div className="absolute -translate-y-1/2" style={style}>
      <article
        data-journey-card
        data-side={side}
        data-state="upcoming"
        className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_44px_rgba(11,11,15,0.08)] transition-shadow duration-300 data-[state=active]:border-amber-400/60 data-[state=active]:ring-2 data-[state=active]:ring-accent/20 md:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[0.7rem] font-semibold text-black/35">{`0${index + 1}`}</span>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[0.7rem] font-semibold text-black/60">
            {milestone.isPresent && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
            )}
            <span>{milestone.dateRange}</span>
          </div>
        </div>

        <h3 className="mt-3 text-[1.25rem] font-black leading-tight tracking-[-0.02em] text-black md:text-[1.4rem]">
          {milestone.role}
        </h3>
        <p className="mt-1 text-[0.82rem] font-semibold text-black/45">{milestone.company}</p>

        <p className="mt-3 text-[0.85rem] leading-relaxed text-black/60">{milestone.summary}</p>

        <div className="mt-4">
          <TechStackRow items={milestone.tech} />
        </div>
      </article>
    </div>
  );
}
