import type Lenis from "lenis";

/** The page's single Lenis instance, registered by SmoothScrollProvider. Any
 * component that needs a programmatic smooth scroll (rather than reaching for
 * `window.scrollTo`, which Lenis doesn't know about and would fight) reads it
 * from here instead of threading it through props or context. */
let activeLenis: Lenis | null = null;

export function setActiveLenis(lenis: Lenis | null) {
  activeLenis = lenis;
}

export function getActiveLenis() {
  return activeLenis;
}
