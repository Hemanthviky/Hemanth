"use client";

import { useRef, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, SplitText } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

interface StrokeHeadlineProps {
  text: string;
  /** Words (exact match) rendered stroke-only instead of solid black. */
  strokeWords?: string[];
  /** Words (exact match) rendered in the accent yellow instead of solid black. */
  accentWords?: string[];
  className?: string;
  style?: CSSProperties;
}

function wordClass(isStroke: boolean, isAccent: boolean) {
  if (isStroke) return "text-transparent";
  if (isAccent) return "text-accent";
  return "text-black";
}

/** Hero-style headline mixing solid and outline words, revealed word-by-word
 * via a scroll-scrubbed GSAP SplitText mask. Shared by every section that
 * echoes the hero's solid/stroke type trick. */
export function StrokeHeadline({ text, strokeWords = [], accentWords = [], className, style }: StrokeHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    if (reduced) {
      gsap.set(ref.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const split = new SplitText(ref.current, { type: "words", mask: "words" });
      gsap.set(split.words, { yPercent: 120, opacity: 0 });
      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", end: "top 40%", scrub: 0.6 },
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  const words = text.split(" ");

  return (
    <h2 ref={ref} className={className} style={style}>
      {words.map((word, i) => {
        const isStroke = strokeWords.includes(word);
        const isAccent = accentWords.includes(word);
        return (
          <span key={`${word}-${i}`}>
            <span
              className={wordClass(isStroke, isAccent)}
              style={isStroke ? { WebkitTextStroke: "1.5px black" } : undefined}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </h2>
  );
}
