"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setActiveLenis } from "@/lib/lenis";
import { SMOOTH_SCROLL_LERP, SMOOTH_SCROLL_WHEEL_MULTIPLIER } from "@/constants/motion";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Site-wide inertial scrolling, driven off GSAP's ticker rather than its own
 * rAF loop so Lenis and every ScrollTrigger tick in the same frame — without
 * that, scrubbed sections (the circuit lap) update a frame behind the page and
 * read as stuttering. `lagSmoothing(0)` stops GSAP from skipping ahead after a
 * slow frame, which would otherwise tear the scrubbed timeline away from the
 * eased scroll position.
 *
 * Touch is left native: Lenis only smooths the wheel by default, and adding
 * inertia on top of a platform's own is what makes smooth-scroll libraries
 * feel broken on phones. `allowNestedScroll` hands the wheel back to whatever
 * pane is under the cursor — the Finder's scrolling columns and the mobile nav
 * panel would otherwise be dead to a mouse, since Lenis takes the whole page's
 * wheel events.
 */
export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const lenis = new Lenis({
      lerp: SMOOTH_SCROLL_LERP,
      wheelMultiplier: SMOOTH_SCROLL_WHEEL_MULTIPLIER,
      autoRaf: false,
      anchors: true,
      allowNestedScroll: true,
    });

    // Mobile browsers fire a resize every time the URL bar slides away. Left
    // alone, each one re-measures every trigger mid-scroll, which lurches the
    // sticky sections; the viewport width has not actually changed.
    ScrollTrigger.config({ ignoreMobileResize: true });

    lenis.on("scroll", ScrollTrigger.update);
    setActiveLenis(lenis);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      setActiveLenis(null);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
