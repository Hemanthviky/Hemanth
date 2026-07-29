"use client";

import { useCallback, useState } from "react";
import { useInViewFlag } from "@/hooks/useInViewFlag";
import { CheckerFlourish } from "./CheckerFlourish";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroContent } from "./HeroContent";
import { HeroTelemetryPanel } from "./HeroTelemetryPanel";

export function HeroSection() {
  const { ref, isInView } = useInViewFlag<HTMLElement>();
  const [hasEntered, setHasEntered] = useState(false);
  const handleEntranceComplete = useCallback(() => setHasEntered(true), []);

  return (
    <section ref={ref} id="hero" className="relative min-h-[100svh] overflow-hidden">
      <HeroBackdrop isInView={isInView} />

      <CheckerFlourish className="absolute top-nav right-6 z-10 mt-6 md:top-nav-lg md:right-10 lg:right-16" />

      <div className="sector-shell pt-nav md:pt-nav-lg relative z-10 flex min-h-[100svh] flex-col justify-center pb-44 md:pb-32">
        <HeroContent onEntranceComplete={handleEntranceComplete} />
      </div>

      <HeroTelemetryPanel
        isRunning={hasEntered}
        className="absolute inset-x-6 bottom-6 z-10 md:inset-x-auto md:right-10 md:bottom-10 md:w-56 lg:right-16"
      />
    </section>
  );
}
