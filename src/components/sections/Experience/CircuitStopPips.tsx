import { CIRCUIT_STOPS } from "@/constants/circuit";
import { CIRCUIT_STOPS_LABEL } from "@/data/experience";

interface CircuitStopPipsProps {
  activeIndex: number;
  onSelectStop: (index: number) => void;
}

/** Lap counter for the four stops, and a jump nav onto them: each pip smooth-
 * scrolls the lap to park the car on that corner. Visual state (`data-state`)
 * is still written straight to the DOM by the scroll rig every frame, since
 * that's per-frame work; `activeIndex` only drives `aria-current`, which only
 * needs to change on arrival. */
export function CircuitStopPips({ activeIndex, onSelectStop }: CircuitStopPipsProps) {
  return (
    <div className="pointer-events-auto flex items-center gap-3">
      <ol className="flex items-center gap-1.5">
        {CIRCUIT_STOPS.map((stop, i) => (
          <li key={stop.id}>
            <button
              type="button"
              data-circuit-pip
              data-state="upcoming"
              aria-label={`Jump to ${stop.corner}`}
              aria-current={activeIndex === i ? "step" : undefined}
              onClick={() => onSelectStop(i)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-border font-mono text-[0.6rem] text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=visited]:border-accent/50 data-[state=visited]:text-accent/70 data-[state=active]:border-accent data-[state=active]:bg-accent data-[state=active]:text-background"
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol>

      <span aria-hidden className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
        {CIRCUIT_STOPS_LABEL}
      </span>
    </div>
  );
}
