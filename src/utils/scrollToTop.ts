import { gsap } from "@/lib/gsap";

const DURATION_S = 0.6;

/** Tweens document scroll to the top over exactly 600ms. The CSS
 * `scroll-behavior: smooth` is suspended for the tween, otherwise the browser
 * re-smooths every per-frame jump and the motion stutters. */
export function scrollToTop(instant = false): void {
  if (instant) {
    window.scrollTo(0, 0);
    return;
  }

  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const position = { y: window.scrollY };
  gsap.to(position, {
    y: 0,
    duration: DURATION_S,
    ease: "power2.inOut",
    onUpdate: () => window.scrollTo(0, position.y),
    onComplete: () => {
      root.style.scrollBehavior = previousBehavior;
    },
  });
}
