import { CircuitHeader } from "./CircuitHeader";
import { CircuitMap } from "./CircuitMap";
import { CircuitStopList } from "./CircuitStopList";

/** Reduced-motion layout: the same circuit, drawn as a lap already completed,
 * with every stop readable at once instead of scrubbed past. */
export function CircuitStatic() {
  return (
    <div className="mx-auto hidden max-w-6xl px-5 py-20 md:px-8 md:py-28 motion-reduce:block">
      <CircuitHeader />

      <div className="circuit-stage mt-12 flex h-[min(60vh,32rem)] items-center justify-center">
        <CircuitMap mode="static" />
      </div>

      <div className="mt-12">
        <CircuitStopList />
      </div>
    </div>
  );
}
