import { cn } from "@/utils/cn";

export type HairlineTone = "accent" | "muted";

const TONE_CLASS: Record<HairlineTone, string> = {
  accent: "type-eyebrow",
  muted: "type-label-sm",
};

interface HairlineLabelProps {
  label: string;
  tone?: HairlineTone;
  className?: string;
}

/** Mono label followed by a hairline rule. The base of both the section-level
 * sector marker and the mini-labels that delineate expanded row content. */
export function HairlineLabel({ label, tone = "accent", className }: HairlineLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className={cn(TONE_CLASS[tone], "whitespace-nowrap")}>{label}</span>
      <span className="bg-border h-px flex-1" aria-hidden="true" />
    </div>
  );
}
