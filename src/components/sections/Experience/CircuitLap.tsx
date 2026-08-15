"use client";

import { useRef, useState } from "react";
import { useCircuitLap } from "@/hooks/useCircuitLap";
import { getCircuitPanel } from "@/utils/circuitPanel";
import { CircuitHeader } from "./CircuitHeader";
import { CircuitInfoCard } from "./CircuitInfoCard";
import { CircuitMap } from "./CircuitMap";
import { CircuitStopList } from "./CircuitStopList";
import { CircuitStopPips } from "./CircuitStopPips";
import { CircuitTelemetry } from "./CircuitTelemetry";

/** The driven lap: a tall scroll track with a sticky stage, where scrolling is
 * the throttle. The 440svh height is the scrub distance — four corners, each
 * with an approach and a dwell, need roughly three and a half screens to read
 * without feeling rushed. Hidden wholesale when motion is reduced, where
 * CircuitStatic carries the same content as a plain list. */
export function CircuitLap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useCircuitLap(sectionRef, setActiveIndex);

  const panel = getCircuitPanel(activeIndex);

  return (
    <div ref={sectionRef} className="relative h-[440svh] motion-reduce:hidden">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col">
        <div className="px-5 pt-16 md:px-8 md:pt-20">
          <CircuitHeader />
        </div>

        <div className="circuit-stage flex flex-1 items-center justify-center px-5 pb-56 md:px-10 lg:pb-16">
          <CircuitMap />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-[1fr_auto] items-end gap-x-4 gap-y-4 px-5 pb-6 md:px-8 md:pb-8">
          <div className="col-span-2 w-full lg:col-span-1 lg:w-[26rem]">
            <CircuitInfoCard key={panel.id} panel={panel} className="pointer-events-auto" />
          </div>

          <CircuitStopPips />
          <CircuitTelemetry />
        </div>
      </div>

      {/* The lap only ever exposes one stop at a time; assistive tech gets all
       * of them. The reduced-motion twin below renders the same list visibly,
       * so this copy stands down there to avoid announcing it twice. */}
      <div className="sr-only motion-reduce:hidden">
        <CircuitStopList />
      </div>
    </div>
  );
}
