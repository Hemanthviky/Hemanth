"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { StrokeHeadline } from "@/components/shared/StrokeHeadline";
import { EXPERIENCE_EYEBROW, JOURNEY_SUBTEXT } from "@/data/experience";
import { JourneyLegend } from "./JourneyLegend";

export function ExperienceHeader() {
  const kickerRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!kickerRef.current || !paraRef.current) return;

    if (reduced) {
      gsap.set([kickerRef.current, paraRef.current], { opacity: 1, y: 0 });
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
      gsap.fromTo(
        paraRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: paraRef.current, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className="mx-auto max-w-4xl px-5 pb-14 pt-20 md:px-8 md:pb-20 md:pt-28">
      <div ref={kickerRef} className="mb-6 flex items-center gap-3 md:mb-8">
        <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
        <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-black/45">
          {EXPERIENCE_EYEBROW}
        </span>
      </div>

      <StrokeHeadline
        text="My Journey So Far"
        accentWords={["So", "Far"]}
        className="font-black leading-[0.94] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.6rem, 7.5vw, 5.5rem)" }}
      />

      <p ref={paraRef} className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-black/55 md:mt-8 md:text-[1.05rem]">
        {JOURNEY_SUBTEXT}
      </p>

      <JourneyLegend />
    </div>
  );
}
