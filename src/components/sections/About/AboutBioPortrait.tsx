"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import {
  ABOUT_BIO_CLOSING_LINE,
  ABOUT_BIO_CLOSING_PARAGRAPH,
  ABOUT_BIO_HIGHLIGHT,
  ABOUT_BIO_PARAGRAPHS,
} from "@/data/about";

export function AboutBioPortrait() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !stackRef.current) return;
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];

    if (reduced) {
      gsap.set(panels, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(panels, { opacity: 0, y: 20 });
      gsap.to(panels, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: stackRef.current, start: "top 85%", toggleActions: "play none none none" },
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={sectionRef} className="relative w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid w-full items-center gap-12 md:grid-cols-12 md:gap-6">
          {/* ── Text column ── */}
          <div className="relative z-10 md:col-span-7">
            <div ref={stackRef} className="flex flex-col gap-8">
              <div ref={(el) => { panelRefs.current[0] = el; }}>
                {ABOUT_BIO_PARAGRAPHS.map((p) => (
                  <p key={p.slice(0, 24)} className="mb-4 text-[1rem] leading-relaxed text-black/65 md:text-[1.1rem]">
                    {p}
                  </p>
                ))}
              </div>

              <div ref={(el) => { panelRefs.current[1] = el; }}>
                <span className="mb-3 block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-amber-500">
                  Project Highlight
                </span>
                <p className="border-l-2 border-amber-400 pl-5 text-[1.05rem] font-medium leading-relaxed text-black md:text-[1.2rem]">
                  {ABOUT_BIO_HIGHLIGHT}
                </p>
              </div>

              <div ref={(el) => { panelRefs.current[2] = el; }}>
                <p className="mb-4 text-[1rem] leading-relaxed text-black/65 md:text-[1.1rem]">
                  {ABOUT_BIO_CLOSING_PARAGRAPH}
                </p>
                <p className="text-[1.05rem] font-semibold leading-relaxed text-black md:text-[1.2rem]">
                  {ABOUT_BIO_CLOSING_LINE}
                </p>
              </div>
            </div>
          </div>

          {/* ── Portrait column ── */}
          <div className="relative mt-4 md:col-span-5 md:mt-0 md:-ml-16 lg:-ml-24">
            <div ref={imageRef} className="relative aspect-[3/4] w-full overflow-hidden border border-black/10">
              <Image
                src="/Hero-Hemanth.png"
                alt="Hemanth N"
                fill
                className="object-cover object-top grayscale contrast-125"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
