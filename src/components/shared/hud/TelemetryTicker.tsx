import { cn } from "@/utils/cn";

const SEPARATOR = "•";
/** Two identical passes: the track scrolls exactly -50%, so the seam lands
 * where the first pass began and the loop reads as continuous. */
const PASSES = [0, 1];

interface TelemetryTickerProps {
  items: string[];
  className?: string;
}

/** Signature device (c): the footer's infinite telemetry strip. Pauses on
 * hover so the strip is readable rather than merely decorative. */
export function TelemetryTicker({ items, className }: TelemetryTickerProps) {
  return (
    <div className={cn("group border-border overflow-hidden border-y py-3", className)}>
      <div className="animate-ticker flex w-max group-hover:[animation-play-state:paused]">
        {PASSES.map((pass) => (
          <ul key={pass} className="flex shrink-0 items-center" aria-hidden={pass === 1}>
            {items.map((item) => (
              <li
                key={item}
                className="font-mono text-label tracking-label-wide text-muted flex items-center gap-6 pr-6 font-medium uppercase whitespace-nowrap"
              >
                {item}
                <span aria-hidden="true">{SEPARATOR}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
