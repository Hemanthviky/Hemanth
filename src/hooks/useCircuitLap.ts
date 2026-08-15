"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, MotionPathPlugin } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { samplePathProgress } from "@/utils/samplePathProgress";
import {
  CIRCUIT_ACCEL_SHARE,
  CIRCUIT_ARRIVAL_EPS,
  CIRCUIT_DRIVE_DURATION,
  CIRCUIT_DWELL_DURATION,
  CIRCUIT_GEAR_FLOORS,
  CIRCUIT_IDLE_SPEED,
  CIRCUIT_OUTLAP_SHARE,
  CIRCUIT_STOPS,
  CIRCUIT_STOP_POINTS,
  CIRCUIT_TOP_SPEED,
} from "@/constants/circuit";
import type { CircuitStopState } from "@/types/experience";

/** The lap is a motion piece end to end: with motion turned down the whole
 * scroll rig stays uninitialised and the static stop list takes over. */
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

interface IPathPoint {
  x: number;
  y: number;
  angle: number;
}

function gearFor(speed: number) {
  return CIRCUIT_GEAR_FLOORS.filter((floor) => speed >= floor).length;
}

function formatSpeed(speed: number) {
  return `${String(speed).padStart(3, "0")} km/h`;
}

function stateFor(index: number, activeIndex: number): CircuitStopState {
  if (index === activeIndex) return "active";
  return index < activeIndex ? "visited" : "upcoming";
}

/**
 * Drives one scrubbed lap of the circuit off the section's own scroll.
 *
 * The timeline alternates a `drive` tween — which moves path progress to the
 * next corner while the speed readout climbs on the straight and drops in the
 * braking zone — with a `dwell` tween that parks the car on the apex. That
 * dwell is what gives each milestone panel a readable window instead of
 * flicking past, and it is why progress is tweened on a plain object rather
 * than mapped linearly from scroll.
 */
export function useCircuitLap(
  sectionRef: RefObject<HTMLElement | null>,
  onStopChange: (index: number) => void
) {
  const changeRef = useRef(onStopChange);

  useEffect(() => {
    changeRef.current = onStopChange;
  }, [onStopChange]);

  useIsomorphicLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const track = root.querySelector<SVGPathElement>("[data-circuit-path]");
    const trace = root.querySelector<SVGPathElement>("[data-circuit-trace]");
    const car = root.querySelector<SVGGElement>("[data-circuit-car]");
    const gearEl = root.querySelector<HTMLElement>("[data-circuit-gear]");
    const speedEl = root.querySelector<HTMLElement>("[data-circuit-speed]");
    const throttleEl = root.querySelector<HTMLElement>("[data-circuit-throttle]");
    if (!track || !trace || !car || !gearEl || !speedEl || !throttleEl) return;

    const stopEls = Array.from(root.querySelectorAll<SVGGElement>("[data-circuit-stop]"));
    const pipEls = Array.from(root.querySelectorAll<HTMLElement>("[data-circuit-pip]"));
    const labelEls = Array.from(root.querySelectorAll<HTMLElement>("[data-circuit-label]"));
    const drsEls = Array.from(root.querySelectorAll<SVGPathElement>("[data-circuit-drs]"));

    const mm = gsap.matchMedia();

    mm.add(MOTION_QUERY, () => {
      const thresholds = samplePathProgress(track, CIRCUIT_STOP_POINTS);
      const length = track.getTotalLength();
      const rawPath = MotionPathPlugin.getRawPath(track);
      MotionPathPlugin.cacheRawPathMeasurements(rawPath);

      const state = { progress: 0, speed: CIRCUIT_IDLE_SPEED };
      const setTrace = gsap.quickSetter(trace, "strokeDashoffset") as (value: number) => void;
      const setThrottle = gsap.quickSetter(throttleEl, "width", "%") as (value: number) => void;

      // GSAP's SVG default transform origin is the bbox top-left, which would
      // swing the car off the asphalt the moment it rotates.
      gsap.set(car, { transformOrigin: "50% 50%" });
      gsap.set(trace, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });

      let lastSpeed = -1;
      let lastActive = -2;

      const render = () => {
        const point = MotionPathPlugin.getPositionOnPath(rawPath, state.progress, true) as IPathPoint;
        gsap.set(car, { x: point.x, y: point.y, rotation: point.angle });
        setTrace(length * (1 - state.progress));

        const speed = Math.round(state.speed);
        if (speed !== lastSpeed) {
          lastSpeed = speed;
          speedEl.textContent = formatSpeed(speed);
          gearEl.textContent = String(gearFor(speed));
          setThrottle(Math.min(100, (speed / CIRCUIT_TOP_SPEED) * 100));
        }

        let active = -1;
        thresholds.forEach((threshold, i) => {
          if (state.progress >= threshold - CIRCUIT_ARRIVAL_EPS) active = i;
        });
        if (active !== lastActive) {
          lastActive = active;
          stopEls.forEach((el, i) => el.setAttribute("data-state", stateFor(i, active)));
          pipEls.forEach((el, i) => el.setAttribute("data-state", stateFor(i, active)));
          changeRef.current(active);
        }
      };

      // The circuit draws itself once, ahead of the car, as the section arrives.
      gsap.set(track, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set([car, ...stopEls, ...labelEls, ...drsEls], { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none none" },
        })
        .to(track, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" })
        .to(drsEls, { opacity: 1, duration: 0.3, stagger: 0.08 }, "-=0.3")
        .to(stopEls, { opacity: 1, duration: 0.3, stagger: 0.08 }, "<")
        .to(labelEls, { opacity: 1, duration: 0.3, stagger: 0.02 }, "<")
        .to(car, { opacity: 1, duration: 0.3 }, "<");

      const drive = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.5 },
        onUpdate: render,
      });

      CIRCUIT_STOPS.forEach((stop, i) => {
        const accel = CIRCUIT_DRIVE_DURATION * CIRCUIT_ACCEL_SHARE;
        drive
          .to(state, { progress: thresholds[i], duration: CIRCUIT_DRIVE_DURATION })
          .to(state, { speed: stop.straightSpeed, duration: accel, ease: "power1.out" }, "<")
          .to(
            state,
            { speed: stop.approachSpeed, duration: CIRCUIT_DRIVE_DURATION - accel, ease: "power2.in" },
            ">"
          )
          .to(state, { speed: stop.approachSpeed, duration: CIRCUIT_DWELL_DURATION }, ">");
      });

      // Out lap: the car crosses the line again while the panel holds on the
      // closing stop, so the section ends on a completed circuit.
      const outlap = CIRCUIT_DRIVE_DURATION * CIRCUIT_OUTLAP_SHARE;
      drive
        .to(state, { progress: 1, duration: outlap })
        .to(state, { speed: CIRCUIT_TOP_SPEED, duration: outlap, ease: "power1.out" }, "<");

      render();
    });

    return () => mm.revert();
  }, [sectionRef]);
}
