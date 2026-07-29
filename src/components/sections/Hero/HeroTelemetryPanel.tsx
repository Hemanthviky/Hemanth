"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { StatusDot } from "@/components/shared/hud";
import { HERO_TELEMETRY } from "@/data/hero";
import { cn } from "@/utils/cn";

const { speed, sector, status } = HERO_TELEMETRY;
const SPEED_STEP = 6;

/** Bounded random walk — reads like a real readout rather than a number
 * jumping arbitrarily around its range. */
function nextSpeed(current: number): number {
  const drift = (Math.random() - 0.5) * 2 * SPEED_STEP;
  return Math.round(Math.min(speed.max, Math.max(speed.min, current + drift)));
}

interface HeroTelemetryPanelProps {
  /** Ticking starts only once the main HUD panel has finished entering. */
  isRunning: boolean;
  className?: string;
}

export function HeroTelemetryPanel({ isRunning, className }: HeroTelemetryPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const isTicking = isRunning && !prefersReducedMotion;

  const [speedValue, setSpeedValue] = useState<number>(speed.min);
  const [sectorIndex, setSectorIndex] = useState(0);

  useEffect(() => {
    if (!isTicking) return;
    const id = window.setInterval(() => setSpeedValue(nextSpeed), speed.tickMs);
    return () => window.clearInterval(id);
  }, [isTicking]);

  useEffect(() => {
    if (!isTicking) return;
    const id = window.setInterval(
      () => setSectorIndex((index) => (index + 1) % sector.values.length),
      sector.cycleMs
    );
    return () => window.clearInterval(id);
  }, [isTicking]);

  return (
    <dl
      aria-hidden="true"
      className={cn(
        "hud-panel flex items-center justify-between gap-5 px-4 py-3 md:flex-col md:items-stretch md:gap-2.5",
        className
      )}
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <dt className="type-label-sm">{speed.label}</dt>
        <dd className="type-data text-data-sm">{speedValue}</dd>
      </div>

      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <dt className="type-label-sm">{sector.label}</dt>
        <dd className="type-data-secondary text-data-sm">{sector.values[sectorIndex]}</dd>
      </div>

      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <dt className="type-label-sm">{status.label}</dt>
        <dd className="flex items-center gap-2">
          <StatusDot tone="live" />
          <span className="font-display text-label-lg font-bold text-white">{status.value}</span>
        </dd>
      </div>
    </dl>
  );
}
