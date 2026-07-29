import { TechPills } from "@/components/shared/hud";
import type { IGarageEntry } from "@/types/motorsport";

interface GarageRowSummaryProps {
  entry: IGarageEntry;
}

/** Collapsed row: an oversized outlined numeral sitting behind the text as a
 * background layer, slot label and project name to its right, tech pills
 * trailing on wide screens. */
export function GarageRowSummary({ entry }: GarageRowSummaryProps) {
  return (
    <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <span
        aria-hidden="true"
        className="text-stroke-white font-display text-ghost-numeral lg:text-ghost-numeral-lg pointer-events-none absolute -top-4 -left-2 leading-none font-black opacity-15 select-none lg:-top-8 lg:-left-4"
      >
        {entry.numeral}
      </span>

      <div className="relative flex min-w-0 flex-col gap-1.5 lg:pl-24">
        <span className="type-label-sm text-signal-yellow">{entry.slot}</span>
        <h3 className="type-h3">{entry.name}</h3>
        <p className="type-label">{entry.subtitle}</p>
      </div>

      <TechPills items={entry.tech} className="relative hidden max-w-md justify-end xl:flex" />
    </div>
  );
}
