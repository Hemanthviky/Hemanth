"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { ABOUT_QUICK_FACTS } from "@/data/about";
import { AboutFocusMarquee } from "./AboutFocusMarquee";

export function AboutQuickFacts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const borderRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;
    const borders = borderRefs.current.filter(Boolean);
    const values = valueRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(borders, { scaleX: 1 });
        gsap.set(values, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(borders, { scaleX: 0 });
      gsap.set(values, { yPercent: 100, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: { trigger: containerRef.current, start: "top 82%", toggleActions: "play none none none" },
        })
        .to(borders, { scaleX: 1, duration: 0.6, stagger: 0.12, ease: "power2.out" })
        .to(values, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "<0.1");
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <div ref={containerRef} className="border-t border-black/10">
        {ABOUT_QUICK_FACTS.map((fact, i) => (
          <div
            key={fact.label}
            className="relative flex flex-col gap-1.5 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-7"
          >
            <span className="shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/40 sm:w-40">
              {fact.label}
            </span>
            <span className="block overflow-hidden sm:flex-1 sm:text-right">
              <span
                ref={(el) => {
                  valueRefs.current[i] = el;
                }}
                className="block text-[1.05rem] font-medium text-black sm:text-[1.3rem]"
              >
                {fact.value}
              </span>
            </span>
            <span
              ref={(el) => {
                borderRefs.current[i] = el;
              }}
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-black/15"
            />
          </div>
        ))}

        <div className="relative flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-7">
          <span className="shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/40 sm:w-40">
            Focus Areas
          </span>
          <div className="min-w-0 sm:max-w-md sm:flex-1">
            <AboutFocusMarquee />
          </div>
          <span
            ref={(el) => {
              borderRefs.current[ABOUT_QUICK_FACTS.length] = el;
            }}
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-black/15"
          />
        </div>
      </div>
    </div>
  );
}
