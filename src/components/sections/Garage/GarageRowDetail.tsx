import { CheckIcon, ICON_SIZES } from "@/components/icons";
import { HairlineLabel, StatusDot, TechPills, type StatusTone } from "@/components/shared/hud";
import { ProjectStatus, type IGarageEntry } from "@/types/motorsport";

const STATUS_TONE: Record<ProjectStatus, StatusTone> = {
  [ProjectStatus.Live]: "live",
  [ProjectStatus.InDevelopment]: "current",
  [ProjectStatus.Archived]: "past",
};

interface GarageRowDetailProps {
  entry: IGarageEntry;
}

/** Spec-sheet body for an opened project. Sections are delineated only by
 * mini-labels and hairline rules — the content flows into the row's own space
 * rather than into a nested panel. */
export function GarageRowDetail({ entry }: GarageRowDetailProps) {
  return (
    <div className="flex flex-col gap-8 pb-10 lg:grid lg:grid-cols-2 lg:gap-x-16">
      <div className="flex flex-col gap-4">
        <HairlineLabel label="OVERVIEW" tone="muted" />
        <p className="type-body">{entry.overview}</p>
      </div>

      <div className="flex flex-col gap-4">
        <HairlineLabel label="KEY FEATURES" tone="muted" />
        <ul className="flex flex-col gap-2.5">
          {entry.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <CheckIcon size={ICON_SIZES.inline} className="text-racing-red mt-1.5 shrink-0" />
              <span className="type-body">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <HairlineLabel label="TECH STACK" tone="muted" />
        <TechPills items={entry.tech} />
      </div>

      <div className="flex flex-col gap-4">
        <HairlineLabel label="STATUS" tone="muted" />
        <p className="flex items-center gap-2.5">
          <StatusDot tone={STATUS_TONE[entry.status]} />
          <span className="type-label-lg text-white">{entry.status}</span>
        </p>
      </div>
    </div>
  );
}
