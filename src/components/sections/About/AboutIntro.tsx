"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { StrokeHeadline } from "@/components/shared/StrokeHeadline";
import { ABOUT_EYEBROW, ABOUT_HEADLINE, ABOUT_HEADLINE_STROKE_WORDS } from "@/data/about";

export function AboutIntro() {
  const kickerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!kickerRef.current) return;

    if (reduced) {
      gsap.set(kickerRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        kickerRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: kickerRef.current, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <div ref={kickerRef} className="mb-6 flex items-center gap-3 md:mb-8">
        <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
        <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-black/45">
          {ABOUT_EYEBROW}
        </span>
      </div>

      <StrokeHeadline
        text={ABOUT_HEADLINE}
        strokeWords={ABOUT_HEADLINE_STROKE_WORDS}
        className="font-black leading-[0.94] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.4rem, 6.8vw, 5rem)" }}
      />
    </div>
  );
}
