import { CIRCUIT_STOPS } from "@/constants/circuit";
import { getCircuitPanel } from "@/utils/circuitPanel";
import { CircuitInfoCard } from "./CircuitInfoCard";

/** Every stop of the lap laid out at once. Used two ways: as the visible
 * reduced-motion layout, and as the screen-reader copy of a lap that otherwise
 * only ever exposes one corner at a time. */
export function CircuitStopList() {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {CIRCUIT_STOPS.map((stop, i) => (
        <li key={stop.id} className="flex">
          <CircuitInfoCard panel={getCircuitPanel(i)} />
        </li>
      ))}
    </ol>
  );
}
