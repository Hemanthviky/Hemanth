import { TechPills } from "@/components/shared/hud";
import type { ITimingEntry } from "@/types/motorsport";

interface TimingRowDetailProps {
  entry: ITimingEntry;
}

export function TimingRowDetail({ entry }: TimingRowDetailProps) {
  return (
    <div className="flex flex-col gap-6 pb-10 md:pl-13">
      <p className="type-body max-w-3xl">{entry.summary}</p>

      <p className="font-body text-body border-signal-yellow border-l-[3px] pl-3 font-medium text-white md:text-body-lg">
        {entry.highlight}
      </p>

      <TechPills items={entry.tech} />
    </div>
  );
}
