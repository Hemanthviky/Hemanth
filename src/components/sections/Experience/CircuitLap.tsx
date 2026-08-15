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
 * CircuitStatic carries the same content as a plain list.
 *
 * The circuit owns the whole viewport and everything else floats on top of it,
 * rather than the map being boxed into whatever the chrome left over. Scrims
 * behind the two UI edges keep type legible where the asphalt runs under it. */
export function CircuitLap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollToStop } = useCircuitLap(sectionRef, setActiveIndex);

  const panel = getCircuitPanel(activeIndex);

  return (
    <div ref={sectionRef} className="relative h-[440svh] motion-reduce:hidden">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Below lg the map is limited by width, so the padding costs it no
         * size at all — it only lifts the circuit clear of the taller card. */}
        <div className="circuit-stage absolute inset-0 flex items-center justify-center pb-[14svh] lg:pb-0">
          <CircuitMap />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-background via-background/60 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-background via-background/60 to-transparent"
        />

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 pt-16 pb-6 md:px-8 md:pt-20 md:pb-8">
          <CircuitHeader />

          <div className="grid grid-cols-[1fr_auto] items-end gap-x-4 gap-y-4">
            <div className="col-span-2 w-full lg:col-span-1 lg:w-[26rem]">
              <CircuitInfoCard key={panel.id} panel={panel} className="pointer-events-auto" />
            </div>

            <CircuitStopPips activeIndex={activeIndex} onSelectStop={scrollToStop} />
            <CircuitTelemetry />
          </div>
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
