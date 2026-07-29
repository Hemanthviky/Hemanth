import { SectorMarker, TwoToneHeadline } from "@/components/shared/hud";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  sector: { number: string; name: string };
  heading: { solid: string; outline: string };
  subtext?: string;
  className?: string;
}

/** Every sector opens the same way — marker, two-tone H2, optional subtext —
 * which is what makes four different layouts read as one document. */
export function SectionHeading({ sector, heading, subtext, className }: SectionHeadingProps) {
  return (
    <header className={cn("flex flex-col gap-6", className)}>
      <SectorMarker number={sector.number} name={sector.name} />
      <TwoToneHeadline solid={heading.solid} outline={heading.outline} />
      {subtext && <p className="type-body max-w-2xl">{subtext}</p>}
    </header>
  );
}
