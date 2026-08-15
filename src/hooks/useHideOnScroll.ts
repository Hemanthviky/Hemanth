"use client";

import { useEffect, useRef, useState } from "react";
import { getActiveLenis } from "@/lib/lenis";

/** Scrolled past this many pixels before the header is allowed to hide — keeps
 * it from flickering while the reader is still basically at the top. */
const REVEAL_THRESHOLD = 96;

/** True once the reader has scrolled down past the header and is still going;
 * flips back to false the instant they scroll up, or while `pinned` is set
 * (the mobile menu is open, say — the header shouldn't vanish under it).
 * Reads Lenis's own scroll event when smooth scrolling is running, since that
 * is the source of truth for scroll position while Lenis owns the wheel, and
 * falls back to the window's native scroll event when it isn't (reduced
 * motion, or before the provider has mounted). */
export function useHideOnScroll(pinned = false) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function evaluate(y: number, direction: number) {
      if (y <= REVEAL_THRESHOLD) setHidden(false);
      else if (direction > 0) setHidden(true);
      else if (direction < 0) setHidden(false);
      lastY.current = y;
    }

    const lenis = getActiveLenis();
    if (lenis) {
      const onScroll = (instance: { scroll: number; direction: 1 | -1 | 0 }) => {
        evaluate(instance.scroll, instance.direction);
      };
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    const onWindowScroll = () => {
      const y = window.scrollY;
      evaluate(y, y - lastY.current);
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, []);

  return !pinned && hidden;
}
