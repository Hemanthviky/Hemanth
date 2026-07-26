"use client";

import type { RefObject } from "react";
import { gsap, MotionPathPlugin } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import type { IJourneyRoad, JourneyRoadVariant, JourneyWaypointState } from "@/types/experience";
import {
  JOURNEY_ARRIVAL_EPS,
  JOURNEY_CARD_REVEAL_SPAN,
  JOURNEY_GLOW_BASE,
  JOURNEY_GLOW_BOOST,
  JOURNEY_GLOW_RADIUS,
} from "@/constants/journey";

/** Each JourneyTrack variant only initialises at its own breakpoint, so the
 * hidden twin never measures paths or registers ScrollTriggers. */
const MEDIA_QUERIES: Record<JourneyRoadVariant, string> = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
};

const PATH_SAMPLES = 400;

interface IPathPoint {
  x: number;
  y: number;
  angle: number;
}

/** Finds each waypoint's fractional position along the path by sampling, so
 * arrival thresholds always match the drawn geometry exactly. */
function sampleWaypointProgress(path: SVGPathElement, road: IJourneyRoad): number[] {
  const total = path.getTotalLength();
  const points = Array.from({ length: PATH_SAMPLES + 1 }, (_, i) =>
    path.getPointAtLength((i / PATH_SAMPLES) * total)
  );

  return road.waypoints.map((wp) => {
    let bestIndex = 0;
    let bestDistance = Infinity;
    points.forEach((point, i) => {
      const distance = (point.x - wp.x) ** 2 + (point.y - wp.y) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    });
    return bestIndex / PATH_SAMPLES;
  });
}

/** The car group is drawn centred on the SVG origin and lives in the same
 * coordinate space as the road path, so placing it is a plain x/y/rotation
 * set at the sampled path point. GSAP's SVG default transform origin is the
 * bbox top-left, which would swing the car off the road when rotated — pin
 * it to the car's centre. */
function placeCarAt(car: SVGGElement, path: SVGPathElement, progress: number) {
  const rawPath = MotionPathPlugin.getRawPath(path);
  MotionPathPlugin.cacheRawPathMeasurements(rawPath);
  const point = MotionPathPlugin.getPositionOnPath(rawPath, progress, true) as IPathPoint;
  gsap.set(car, { transformOrigin: "50% 50%", x: point.x, y: point.y, rotation: point.angle });
}

function stateFor(index: number, activeIndex: number): JourneyWaypointState {
  if (index === activeIndex) return "active";
  if (index < activeIndex) return "visited";
  return "upcoming";
}

export function useJourneyDrive(
  rootRef: RefObject<HTMLDivElement | null>,
  road: IJourneyRoad,
  currentIndex: number
) {
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const path = root.querySelector<SVGPathElement>("[data-road-asphalt]");
    const casing = root.querySelector<SVGPathElement>("[data-road-casing]");
    const centerLine = root.querySelector<SVGPathElement>("[data-road-center]");
    const car = root.querySelector<SVGGElement>("[data-car]");
    const carGlow = root.querySelector<SVGEllipseElement>("[data-car-glow]");
    const waypointEls = Array.from(root.querySelectorAll<SVGGElement>("[data-waypoint]"));
    const cardEls = Array.from(root.querySelectorAll<HTMLElement>("[data-journey-card]"));
    const endEl = root.querySelector<HTMLElement>("[data-journey-end]");
    if (!path || !casing || !centerLine || !car || !carGlow || !endEl) return;

    const thresholds = sampleWaypointProgress(path, road);
    const finishIndex = road.waypoints.length - 1;

    const setStates = (activeIndex: number) => {
      waypointEls.forEach((el, i) => el.setAttribute("data-state", stateFor(i, activeIndex)));
      cardEls.forEach((el, i) => el.setAttribute("data-state", stateFor(i, activeIndex)));
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: `${MEDIA_QUERIES[road.variant]} and (prefers-reduced-motion: no-preference)`,
        still: `${MEDIA_QUERIES[road.variant]} and (prefers-reduced-motion: reduce)`,
      },
      (context) => {
        if (context.conditions?.still) {
          // Static fallback: road and every card fully visible, past stops
          // muted, finish marker hollow, car parked at the current role.
          waypointEls.forEach((el, i) => {
            let state: JourneyWaypointState = "visited";
            if (i === currentIndex) state = "active";
            if (i === finishIndex) state = "upcoming";
            el.setAttribute("data-state", state);
          });
          cardEls.forEach((el, i) =>
            el.setAttribute("data-state", i === currentIndex ? "active" : "visited")
          );
          placeCarAt(car, path, thresholds[currentIndex]);
          gsap.set(car, { opacity: 1 });
          gsap.set(carGlow, { opacity: JOURNEY_GLOW_BASE + JOURNEY_GLOW_BOOST });
          return () => setStates(-1);
        }

        const pathLength = path.getTotalLength();
        placeCarAt(car, path, 0);
        gsap.set([casing, path], { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.set(centerLine, { opacity: 0 });
        gsap.set(waypointEls, { opacity: 0 });

        // The road unfurls once ahead of the car when the section scrolls in.
        gsap
          .timeline({
            scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none none" },
          })
          .to([casing, path], { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" })
          .to(centerLine, { opacity: 0.9, duration: 0.5, ease: "power1.out" }, "-=0.3")
          .to(waypointEls, { opacity: 1, duration: 0.3, stagger: 0.08, ease: "power2.out" }, "-=0.4")
          .to(car, { opacity: 1, duration: 0.3, ease: "power1.out" }, "<");

        const setGlow = gsap.quickSetter(carGlow, "opacity") as (value: number) => void;
        let lastActive = -2;

        // Discrete waypoint/card states flip as the car crosses thresholds;
        // the car's under-glow breathes continuously with waypoint proximity.
        const applyProgress = (progress: number) => {
          let reached = -1;
          thresholds.forEach((threshold, i) => {
            if (progress >= threshold - JOURNEY_ARRIVAL_EPS) reached = i;
          });
          if (reached !== lastActive) {
            setStates(reached);
            lastActive = reached;
          }
          const proximity = thresholds.reduce(
            (max, threshold) => Math.max(max, 1 - Math.abs(progress - threshold) / JOURNEY_GLOW_RADIUS),
            0
          );
          setGlow(JOURNEY_GLOW_BASE + JOURNEY_GLOW_BOOST * Math.max(0, proximity));
        };

        // One master scrubbed timeline: its 0→1 progress IS the car's path
        // progress, so card reveals slot in at exact waypoint fractions.
        const drive = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "bottom 78%",
            scrub: 1,
            onUpdate: (self) => applyProgress(self.progress),
          },
        });

        drive.to(
          car,
          { duration: 1, motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true } },
          0
        );

        cardEls.forEach((card, i) => {
          const fromX = card.dataset.side === "left" ? -48 : 48;
          drive.fromTo(
            card,
            { opacity: 0, x: fromX, y: 24 },
            { opacity: 1, x: 0, y: 0, duration: JOURNEY_CARD_REVEAL_SPAN, ease: "power1.out" },
            Math.max(0.001, thresholds[i] - JOURNEY_CARD_REVEAL_SPAN)
          );
        });

        drive.fromTo(
          endEl,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: JOURNEY_CARD_REVEAL_SPAN, ease: "power1.out" },
          Math.max(0.001, thresholds[finishIndex] - JOURNEY_CARD_REVEAL_SPAN)
        );

        applyProgress(0);

        return () => setStates(-1);
      }
    );

    return () => mm.revert();
  }, [rootRef, road, currentIndex]);
}
