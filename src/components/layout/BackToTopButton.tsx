"use client";

import { ArrowUp } from "lucide-react";
import { getActiveLenis } from "@/lib/lenis";
import { FOOTER_BACK_TO_TOP } from "@/data/contact";

/** Routed through Lenis where it is running, since a raw `window.scrollTo`
 * jumps the real scroll position out from under the glide and gets dragged
 * straight back. Falls back to native smooth scrolling when it is not. */
export function BackToTopButton() {
  function handleClick() {
    const lenis = getActiveLenis();
    if (lenis) {
      lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex cursor-pointer items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-secondary transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
    >
      {FOOTER_BACK_TO_TOP}
      <ArrowUp
        aria-hidden
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
        strokeWidth={2}
      />
    </button>
  );
}
