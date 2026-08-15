import { CIRCUIT_STOPS } from "@/constants/circuit";
import { CIRCUIT_STOPS_LABEL } from "@/data/experience";

/** Lap counter for the four stops. Purely a progress read-out — the stop
 * content itself lives in the info card — so it stays out of the a11y tree. */
export function CircuitStopPips() {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <ol className="flex items-center gap-1.5">
        {CIRCUIT_STOPS.map((stop, i) => (
          <li key={stop.id}>
            <span
              data-circuit-pip
              data-state="upcoming"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border font-mono text-[0.6rem] text-muted transition-colors duration-300 data-[state=visited]:border-accent/50 data-[state=visited]:text-accent/70 data-[state=active]:border-accent data-[state=active]:bg-accent data-[state=active]:text-background"
            >
              {i + 1}
            </span>
          </li>
        ))}
      </ol>

      <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
        {CIRCUIT_STOPS_LABEL}
      </span>
    </div>
  );
}
