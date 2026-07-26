"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, SplitText } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { GrainOverlay } from "@/components/shared/GrainOverlay";
import { ABOUT_PHILOSOPHY_QUOTE } from "@/data/about";

export function AboutPhilosophyQuote() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!quoteRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(quoteRef.current, { type: "words" });

      if (reduced) {
        gsap.set(split.words, { color: "#ffffff" });
        return;
      }

      gsap.set(split.words, { color: "rgba(255,255,255,0.26)" });
      gsap.to(split.words, {
        color: "#ffffff",
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className="relative w-full overflow-hidden bg-background py-24 md:py-36">
      <GrainOverlay opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 left-0 select-none font-black text-transparent md:-top-16"
          style={{ fontSize: "clamp(6rem, 14vw, 11rem)", WebkitTextStroke: "1.5px rgba(255,255,255,0.16)" }}
        >
          &ldquo;
        </span>

        <p
          ref={quoteRef}
          className="relative font-semibold italic leading-snug tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.5rem, 3.6vw, 2.5rem)" }}
        >
          {ABOUT_PHILOSOPHY_QUOTE}
        </p>
      </div>
    </div>
  );
}
