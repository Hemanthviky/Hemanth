"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { ABOUT_DRIVES_ME, ABOUT_PROCESS_STEPS } from "@/data/about";

export function AboutDrivesMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !lineRef.current) return;
    const steps = stepRefs.current.filter(Boolean);
    const length = lineRef.current.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: reduced ? 0 : length });

      if (reduced) {
        gsap.set(steps, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(steps, { opacity: 0, y: 18 });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%", end: "bottom 65%", scrub: 0.6 },
      });

      gsap.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%", toggleActions: "play none none none" },
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-black/45">
            What Drives Me
          </span>
        </div>
        <div className="md:col-span-8">
          <p className="text-[1.05rem] leading-relaxed text-black/65 md:text-[1.2rem]">{ABOUT_DRIVES_ME}</p>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        <svg
          viewBox="0 0 100 4"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-0 top-4 hidden h-[2px] w-full md:block"
        >
          <line x1="6" y1="2" x2="94" y2="2" stroke="black" strokeOpacity="0.12" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <line
            ref={lineRef}
            x1="6"
            y1="2"
            x2="94"
            y2="2"
            stroke="#fbbf24"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {ABOUT_PROCESS_STEPS.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="relative flex flex-col items-start gap-3 md:items-center md:text-center"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-white font-mono text-[0.7rem] font-semibold text-black">
                {step.number}
              </span>
              <span className="text-[1.1rem] font-bold tracking-tight text-black md:text-[1.3rem]">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
