import { StatusDot } from "@/components/shared/hud";
import { RoleStatus, type ITimingEntry } from "@/types/motorsport";

interface TimingRowSummaryProps {
  entry: ITimingEntry;
}

/** Timing-tower row: position, role, company on the left; lap time and state
 * on the right, stacking beneath the title on mobile. */
export function TimingRowSummary({ entry }: TimingRowSummaryProps) {
  const isCurrent = entry.status === RoleStatus.Current;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
      <div className="flex min-w-0 items-baseline gap-5 md:gap-8">
        <span className="font-display text-muted text-h3 shrink-0 font-bold tabular-nums">
          {entry.position}
        </span>
        <span className="flex min-w-0 flex-col gap-1">
          <h3 className="type-h3">{entry.role}</h3>
          <span className="type-label-sm">{entry.company}</span>
        </span>
      </div>

      <div className="flex items-center gap-6 pl-10 md:justify-end md:pl-0">
        <span className="type-data-secondary text-label-lg whitespace-nowrap">{entry.dateRange}</span>
        <span className="flex items-center gap-2 md:w-32">
          <StatusDot tone={isCurrent ? "current" : "past"} />
          <span className="type-label-sm">{entry.status}</span>
        </span>
      </div>
    </div>
  );
}
