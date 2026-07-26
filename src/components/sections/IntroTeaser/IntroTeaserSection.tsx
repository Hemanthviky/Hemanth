"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { PenTool, ArrowRight } from "lucide-react";
import { gsap, SplitText } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { MagneticButton } from "@/components/buttons/MagneticButton";
import { DotGridOverlay } from "@/components/shared/DotGridOverlay";
import { IntroDoodles } from "./IntroDoodles";
import {
  INTRO_TEASER_LABEL,
  INTRO_TEASER_HEADLINE,
  INTRO_TEASER_NAME,
  INTRO_TEASER_PARAGRAPH_1_PRE,
  INTRO_TEASER_PARAGRAPH_1_HIGHLIGHT,
  INTRO_TEASER_PARAGRAPH_1_POST,
  INTRO_TEASER_PARAGRAPH_2,
  INTRO_TEASER_CTA_LABEL,
} from "@/data/introTeaser";

export function IntroTeaserSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const paraRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const doodlePaths = useRef<Array<SVGPathElement | null>>([]);
  const reduced = useReducedMotion();

  const registerPath = (index: number) => (el: SVGPathElement | null) => {
    doodlePaths.current[index] = el;
  };

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;
    const paragraphs = paraRefs.current.filter(Boolean) as HTMLParagraphElement[];
    const doodles = doodlePaths.current.filter(Boolean) as SVGPathElement[];
    const settleTargets = [nameRef.current, ctaRef.current, portraitRef.current].filter(Boolean);

    if (reduced) {
      gsap.set([headlineRef.current, ...settleTargets, ...paragraphs], { opacity: 1, y: 0, scale: 1 });
      gsap.set(doodles, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const split = new SplitText(headlineRef.current, { type: "lines", mask: "lines" });
      gsap.set(split.lines, { yPercent: 110, opacity: 0 });
      gsap.set(nameRef.current, { opacity: 0, scale: 0.9, y: 10 });
      gsap.set(paragraphs, { opacity: 0, y: 16 });
      gsap.set(ctaRef.current, { opacity: 0, y: 12 });
      gsap.set(portraitRef.current, { opacity: 0, scale: 0.95 });

      doodles.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      });

      tl.to(split.lines, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" })
        .to(nameRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.6)" }, "-=0.25")
        .to(doodles, { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: "power2.inOut" }, "-=0.3")
        .to(paragraphs, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }, "-=0.6")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.25")
        .to(portraitRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.9");
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden border-t border-black/5 bg-white py-16 md:py-24">
      <DotGridOverlay opacity={0.045} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* ── Top row: centered pen icon + top-right label ── */}
        <div className="relative mb-10 h-6 md:mb-14">
          <PenTool className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 text-black/30" strokeWidth={1.5} />
          <span className="absolute right-0 top-0 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-black/40">
            {INTRO_TEASER_LABEL}
          </span>
        </div>

        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          {/* ── Left column ── */}
          <div className="relative md:col-span-7">
            <IntroDoodles registerPath={registerPath} />

            <h2 className="leading-none">
              <span
                ref={headlineRef}
                className="block font-black tracking-[-0.02em] text-black"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 0.95 }}
              >
                {INTRO_TEASER_HEADLINE}
              </span>
              <span
                ref={nameRef}
                className="font-script mt-1 block text-amber-400"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)", lineHeight: 0.9 }}
              >
                {INTRO_TEASER_NAME}
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-4 md:mt-10">
              <p
                ref={(el) => { paraRefs.current[0] = el; }}
                className="max-w-md text-[1rem] leading-relaxed text-black/65 md:text-[1.05rem]"
              >
                {INTRO_TEASER_PARAGRAPH_1_PRE}
                <span className="bg-amber-400/25 px-1 font-semibold text-black">
                  {INTRO_TEASER_PARAGRAPH_1_HIGHLIGHT}
                </span>
                {INTRO_TEASER_PARAGRAPH_1_POST}
              </p>

              <p
                ref={(el) => { paraRefs.current[1] = el; }}
                className="max-w-md text-[1rem] leading-relaxed text-black/65 md:text-[1.05rem]"
              >
                {INTRO_TEASER_PARAGRAPH_2}
              </p>
            </div>

            <div ref={ctaRef} className="mt-8 md:mt-10">
              <MagneticButton>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 border-b-2 border-black pb-1 text-[0.95rem] font-semibold text-black transition-colors duration-200 hover:border-amber-400"
                >
                  {INTRO_TEASER_CTA_LABEL}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* ── Right column — portrait ── */}
          <div className="relative md:col-span-5">
            <div
              ref={portraitRef}
              className="portrait-cutout relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl"
            >
              {/* TODO: reusing the hero photo as a placeholder for now — swap
                  src for a dedicated teaser cutout (e.g. /portrait-teaser.png)
                  once one exists. The `.portrait-cutout` class (globals.css)
                  already adds the drop-shadow "pop off the page" treatment. */}
              <Image
                src="/Hero-Hemanth.png"
                alt="Hemanth N"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
