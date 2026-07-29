import { TechStackRow } from "@/components/shared/TechStackRow";
import type { IJourneyMilestone } from "@/types/experience";

interface MilestoneCardProps {
  milestone: IJourneyMilestone;
  index: number;
}

/** Readable milestone content — shared by the scroll-synced overlay in the 3D
 * drive and the static fallback grid, so the two never drift apart. */
export function MilestoneCard({ milestone, index }: MilestoneCardProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white/95 p-5 shadow-[0_18px_44px_rgba(11,11,15,0.12)] backdrop-blur-sm md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[0.7rem] font-semibold text-black/35">{`0${index + 1}`}</span>
        <div className="flex items-center gap-2">
          {milestone.isCurrent && (
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-black">
              Current
            </span>
          )}
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
      </div>

      <h3 className="mt-3 text-[1.25rem] font-black leading-tight tracking-[-0.02em] text-black md:text-[1.4rem]">
        {milestone.role}
      </h3>
      <p className="mt-1 text-[0.82rem] font-semibold text-black/45">{milestone.company}</p>

      <p className="mt-3 text-[0.85rem] leading-relaxed text-black/60">{milestone.summary}</p>

      {milestone.highlight && (
        <p className="mt-2 flex items-start gap-2 text-[0.8rem] font-medium leading-relaxed text-black/70">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
          {milestone.highlight}
        </p>
      )}

      <div className="mt-4">
        <TechStackRow items={milestone.tech} />
      </div>
    </article>
  );
}
