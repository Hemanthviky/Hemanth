"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import {
  CIRCUIT_CLOSING_WINDOW,
  CIRCUIT_ENVIRONMENT_COLORS,
  CIRCUIT_HINT_FADE_END,
  CIRCUIT_MILESTONE_TS,
  CIRCUIT_OVERLAY_WINDOWS,
  CIRCUIT_SCROLL_DISTANCE,
} from "@/constants/circuit";
import { JOURNEY_MILESTONES } from "@/data/experience";
import type { ICircuitProgress } from "@/types/experience";
import { smoothstep } from "@/utils/smoothstep";
import { supportsWebgl } from "@/utils/supportsWebgl";
import { CircuitFallback } from "./CircuitFallback";
import { MilestoneOverlay } from "./MilestoneOverlay";

/** Client-side dynamic import keeps three.js and the whole R3F tree in a
 * separate chunk that is only fetched once the section approaches the
 * viewport — the initial page load never pays for WebGL. */
const CircuitScene = dynamic(() => import("./CircuitScene").then((m) => m.CircuitScene), {
  ssr: false,
});

type CircuitMode = "pending" | "drive" | "static" | "fallback";

const OBSERVER_MARGIN = "500px 0px";
const CARD_ENTER_Y = 28;
const CARD_EXIT_Y = -18;

/** Race-day sky behind the transparent canvas: pale blue overhead warming
 * toward the horizon, matched to the scene's fog color. Inline style is the
 * one sanctioned exception here — the gradient must interpolate the same
 * constants the WebGL fog reads, which Tailwind classes can't do. */
const SKY_GRADIENT: CSSProperties = {
  background: `linear-gradient(to bottom, ${CIRCUIT_ENVIRONMENT_COLORS.skyTop} 0%, ${CIRCUIT_ENVIRONMENT_COLORS.skyHorizon} 62%, ${CIRCUIT_ENVIRONMENT_COLORS.skyBottom} 100%)`,
};

/** Orchestrates the Experience drive: decides the render mode (full 3D drive,
 * reduced-motion static scene, or no-WebGL fallback), pins the stage with
 * ScrollTrigger, and pipes raw scroll progress into both the shared scene ref
 * (smoothed inside the R3F frame loop) and the overlay quickSetters. */
export function CircuitJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<ICircuitProgress>({ target: 0 });
  const [mode, setMode] = useState<CircuitMode>("pending");
  const [sceneMounted, setSceneMounted] = useState(false);
  const [active, setActive] = useState(false);

  const currentIndex = Math.max(
    0,
    JOURNEY_MILESTONES.findIndex((milestone) => milestone.isCurrent)
  );

  useEffect(() => {
    if (!supportsWebgl()) {
      setMode("fallback");
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) progressRef.current.target = CIRCUIT_MILESTONE_TS[currentIndex];
    setMode(reduced ? "static" : "drive");
  }, [currentIndex]);

  // Lazy-mount the canvas near the viewport; pause its render loop when away.
  useEffect(() => {
    if (mode !== "drive" && mode !== "static") return;
    const element = wrapRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSceneMounted(true);
        setActive(entry.isIntersecting);
      },
      { rootMargin: OBSERVER_MARGIN }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [mode]);

  useIsomorphicLayoutEffect(() => {
    if (mode !== "drive") return;
    const stage = stageRef.current;
    if (!stage) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-circuit-card]", stage);
      const closing = stage.querySelector<HTMLElement>("[data-circuit-closing]");
      const hint = stage.querySelector<HTMLElement>("[data-circuit-hint]");
      const cardSetters = cards.map((card) => ({
        opacity: gsap.quickSetter(card, "opacity"),
        y: gsap.quickSetter(card, "y", "px"),
      }));
      const setClosing = closing ? gsap.quickSetter(closing, "opacity") : null;
      const setHint = hint ? gsap.quickSetter(hint, "opacity") : null;

      const apply = (progressValue: number) => {
        progressRef.current.target = progressValue;
        CIRCUIT_OVERLAY_WINDOWS.forEach((fade, index) => {
          const entered = smoothstep(fade.inStart, fade.inEnd, progressValue);
          const exited = smoothstep(fade.outStart, fade.outEnd, progressValue);
          cardSetters[index].opacity(entered * (1 - exited));
          cardSetters[index].y((1 - entered) * CARD_ENTER_Y + exited * CARD_EXIT_Y);
        });
        setClosing?.(
          smoothstep(CIRCUIT_CLOSING_WINDOW.inStart, CIRCUIT_CLOSING_WINDOW.inEnd, progressValue)
        );
        setHint?.(1 - smoothstep(0, CIRCUIT_HINT_FADE_END, progressValue));
      };

      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: CIRCUIT_SCROLL_DISTANCE,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress),
      });
      apply(0);
    }, stage);

    return () => ctx.revert();
  }, [mode]);

  if (mode === "fallback") {
    return (
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <CircuitFallback milestones={JOURNEY_MILESTONES} />
      </div>
    );
  }

  if (mode === "static") {
    return (
      <div ref={wrapRef} className="mx-auto max-w-6xl px-5 md:px-8">
        <div
          className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-[20px] border border-black/5"
          style={SKY_GRADIENT}
        >
          {sceneMounted && (
            <CircuitScene
              progress={progressRef.current}
              active={false}
              reduced
              currentIndex={currentIndex}
            />
          )}
        </div>
        <div className="mt-12">
          <CircuitFallback milestones={JOURNEY_MILESTONES} />
        </div>
      </div>
    );
  }

  // "pending" renders the same shell as "drive" so resolving the mode after
  // hydration never shifts layout.
  return (
    <div ref={wrapRef}>
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden" style={SKY_GRADIENT}>
        {sceneMounted && (
          <CircuitScene
            progress={progressRef.current}
            active={active && mode === "drive"}
            reduced={false}
            currentIndex={currentIndex}
          />
        )}
        <MilestoneOverlay milestones={JOURNEY_MILESTONES} />
      </div>
    </div>
  );
}
