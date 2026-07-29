"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** IntersectionObserver flag used to gate the hero's render loop — the canvas
 * stops drawing entirely once the section leaves the viewport. */
export function useInViewFlag<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  isInView: boolean;
} {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}
