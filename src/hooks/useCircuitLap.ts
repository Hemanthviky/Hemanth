"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { gsap, MotionPathPlugin } from "@/lib/gsap";
import { getActiveLenis } from "@/lib/lenis";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { samplePathProgress } from "@/utils/samplePathProgress";
import { buildCircuitVelocityProfile } from "@/utils/circuitVelocity";
import {
  CIRCUIT_ARRIVAL_EPS,
  CIRCUIT_DWELL_DURATION,
  CIRCUIT_GEAR_FLOORS,
  CIRCUIT_JUMP_DURATION,
  CIRCUIT_LAP_DURATION,
  CIRCUIT_OUTLAP_DURATION,
  CIRCUIT_SCRUB,
  CIRCUIT_SETTLE_SHARE,
  CIRCUIT_STOPS,
  CIRCUIT_STOP_POINTS,
  CIRCUIT_TOP_SPEED,
  CIRCUIT_VIEWBOX_HEIGHT,
  CIRCUIT_VIEWBOX_WIDTH,
  CIRCUIT_ZOOM_MAX,
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Frames the viewBox on `focus` at `zoom`, clamped so the window can never
 * slide past the circuit's edges. The clamp does double duty: at zoom 1 it
 * collapses to the viewBox centre, which makes the transform exactly the
 * identity — so "zoomed out" needs no special case.
 */
function cameraTransform(focusX: number, focusY: number, zoom: number) {
  const halfW = CIRCUIT_VIEWBOX_WIDTH / (2 * zoom);
  const halfH = CIRCUIT_VIEWBOX_HEIGHT / (2 * zoom);
  const centerX = clamp(focusX, halfW, CIRCUIT_VIEWBOX_WIDTH - halfW);
  const centerY = clamp(focusY, halfH, CIRCUIT_VIEWBOX_HEIGHT - halfH);

  return {
    x: CIRCUIT_VIEWBOX_WIDTH / 2 - zoom * centerX,
    y: CIRCUIT_VIEWBOX_HEIGHT / 2 - zoom * centerY,
  };
}

interface ICircuitLapControls {
  /** Smooth-scrolls the page so the lap lands mid-dwell on the given stop.
   * A no-op until the scroll rig has mounted (reduced motion, or too early
   * in the layout effect's own setup). */
  scrollToStop: (index: number) => void;
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
): ICircuitLapControls {
  const changeRef = useRef(onStopChange);
  const driveRef = useRef<gsap.core.Timeline | null>(null);
  const arrivalsRef = useRef<number[]>([]);

  useEffect(() => {
    changeRef.current = onStopChange;
  }, [onStopChange]);

  const scrollToStop = useCallback((index: number) => {
    const drive = driveRef.current;
    const trigger = drive?.scrollTrigger;
    const arrival = arrivalsRef.current[index];
    if (!trigger || arrival === undefined) return;

    const target = trigger.start + arrival * (trigger.end - trigger.start);
    const lenis = getActiveLenis();

    if (lenis) {
      lenis.scrollTo(target, { duration: CIRCUIT_JUMP_DURATION, easing: gsap.parseEase("power2.inOut") });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const track = root.querySelector<SVGPathElement>("[data-circuit-path]");
    const trace = root.querySelector<SVGPathElement>("[data-circuit-trace]");
    const car = root.querySelector<SVGGElement>("[data-circuit-car]");
    const camera = root.querySelector<SVGGElement>("[data-circuit-camera]");
    const labelLayer = root.querySelector<HTMLElement>("[data-circuit-label-layer]");
    const gearEl = root.querySelector<HTMLElement>("[data-circuit-gear]");
    const speedEl = root.querySelector<HTMLElement>("[data-circuit-speed]");
    const throttleEl = root.querySelector<HTMLElement>("[data-circuit-throttle]");
    if (!track || !trace || !car || !camera || !labelLayer) return;
    if (!gearEl || !speedEl || !throttleEl) return;

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

      const profile = buildCircuitVelocityProfile(
        track,
        CIRCUIT_STOPS.map((stop, i) => ({ progress: thresholds[i], speed: stop.approachSpeed }))
      );

      const state = { lapTime: 0, zoom: 1 };
      const setTrace = gsap.quickSetter(trace, "strokeDashoffset") as (value: number) => void;
      const setThrottle = gsap.quickSetter(throttleEl, "width", "%") as (value: number) => void;

      gsap.set(trace, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });

      let lastLapTime = -1;
      let lastZoom = -1;
      let lastSpeed = -1;
      let lastActive = -2;
      let carX = 0;
      let carY = 0;

      // Every write below is guarded, and both guards close during a dwell —
      // nothing moves there, so the ~40% of the scroll spent parked on apexes
      // costs a comparison per frame and nothing else.
      const render = () => {
        const { lapTime, zoom } = state;
        if (lapTime === lastLapTime && zoom === lastZoom) return;

        if (lapTime !== lastLapTime) {
          lastLapTime = lapTime;

          const { progress, speed } = profile.sample(lapTime);
          const point = MotionPathPlugin.getPositionOnPath(rawPath, progress, true) as IPathPoint;
          carX = point.x;
          carY = point.y;

          // Written straight to the attribute: the group is drawn around the
          // origin, so a bare rotate() already turns the car about its centre
          // and GSAP's transform bookkeeping buys nothing here.
          car.setAttribute(
            "transform",
            `translate(${carX.toFixed(2)} ${carY.toFixed(2)}) rotate(${point.angle.toFixed(2)})`
          );
          setTrace(length * (1 - progress));

          const shown = Math.round(speed);
          if (shown !== lastSpeed) {
            lastSpeed = shown;
            speedEl.textContent = formatSpeed(shown);
            gearEl.textContent = String(gearFor(shown));
            setThrottle(Math.min(100, (shown / CIRCUIT_TOP_SPEED) * 100));
          }

          let active = -1;
          thresholds.forEach((threshold, i) => {
            if (progress >= threshold - CIRCUIT_ARRIVAL_EPS) active = i;
          });
          if (active !== lastActive) {
            lastActive = active;
            stopEls.forEach((el, i) => el.setAttribute("data-state", stateFor(i, active)));
            pipEls.forEach((el, i) => el.setAttribute("data-state", stateFor(i, active)));
            changeRef.current(active);
          }
        }

        // The camera rides the car; the label layer gets the same move in
        // container percentages. The zoom only changes on the way in and the
        // way out, so the custom property — which restyles every label — is
        // only touched then.
        const { x, y } = cameraTransform(carX, carY, zoom);
        camera.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${zoom.toFixed(4)})`);
        labelLayer.style.translate = `${(x / CIRCUIT_VIEWBOX_WIDTH) * 100}% ${(y / CIRCUIT_VIEWBOX_HEIGHT) * 100}%`;

        if (zoom !== lastZoom) {
          lastZoom = zoom;
          labelLayer.style.scale = String(zoom);
          labelLayer.style.setProperty("--circuit-zoom", String(zoom));
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
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: CIRCUIT_SCRUB,
          invalidateOnRefresh: true,
        },
        onUpdate: render,
      });

      // Scroll advances lap *time*, never distance, so how far the car travels
      // per pixel scrolled is the velocity profile's decision alone. Each leg
      // is given the scroll its lap time is worth, then split three ways so
      // the car eases off an apex and settles back onto the next one.
      let cursor = 0;
      let legStart = 0;
      const arrivals: number[] = [];

      CIRCUIT_STOPS.forEach((_, i) => {
        const legEnd = profile.timeAt(thresholds[i]);
        const span = legEnd - legStart;
        const duration = CIRCUIT_LAP_DURATION * span;
        const settle = duration * CIRCUIT_SETTLE_SHARE;

        drive
          .to(
            state,
            { lapTime: legStart + span * CIRCUIT_SETTLE_SHARE, duration: settle, ease: "power1.in" },
            cursor
          )
          .to(
            state,
            { lapTime: legEnd - span * CIRCUIT_SETTLE_SHARE, duration: duration - settle * 2 },
            cursor + settle
          )
          .to(state, { lapTime: legEnd, duration: settle, ease: "power1.out" }, cursor + duration - settle);

        // The camera drops onto the asphalt over the run to the first corner
        // and stays there for the rest of the lap.
        if (i === 0) {
          drive.to(state, { zoom: CIRCUIT_ZOOM_MAX, duration, ease: "power2.inOut" }, cursor);
        }

        // Mid-dwell: fully settled on the apex, clear of the eps window
        // either neighbour tween might land in.
        arrivals.push(cursor + duration + CIRCUIT_DWELL_DURATION / 2);

        cursor += duration + CIRCUIT_DWELL_DURATION;
        legStart = legEnd;
      });

      // Cool-down lap: the car crosses the line again while the camera pulls
      // back, so the section ends on the whole circuit exactly as it started.
      drive
        .to(state, { lapTime: 1, duration: CIRCUIT_OUTLAP_DURATION, ease: "power1.inOut" }, cursor)
        .to(state, { zoom: 1, duration: CIRCUIT_OUTLAP_DURATION, ease: "power2.inOut" }, cursor);

      driveRef.current = drive;
      arrivalsRef.current = arrivals.map((position) => position / drive.totalDuration());

      render();
    });

    return () => {
      mm.revert();
      driveRef.current = null;
      arrivalsRef.current = [];
    };
  }, [sectionRef]);

  return { scrollToStop };
}
