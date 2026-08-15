import { CIRCUIT_IDLE_SPEED } from "@/constants/circuit";

const IDLE_READOUT = `${String(CIRCUIT_IDLE_SPEED).padStart(3, "0")} km/h`;

/** Gear and speed HUD. The drive hook writes straight into these nodes rather
 * than through React state — the values change every scroll frame, and none of
 * them belong in the a11y tree. */
export function CircuitTelemetry() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-border bg-surface/85 px-4 py-3 backdrop-blur-md"
      aria-hidden
    >
      <span data-circuit-gear className="font-mono text-[1.75rem] font-black leading-none text-accent">
        1
      </span>

      <div>
        <span
          data-circuit-speed
          className="block font-mono text-[0.68rem] uppercase leading-none tracking-[0.18em] text-secondary"
        >
          {IDLE_READOUT}
        </span>
        <span className="mt-2 block h-[3px] w-24 overflow-hidden rounded-full bg-border md:w-28">
          <span data-circuit-throttle className="block h-full w-0 rounded-full bg-accent" />
        </span>
      </div>
    </div>
  );
}
