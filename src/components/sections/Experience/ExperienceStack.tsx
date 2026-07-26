"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, SplitText } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { EXPERIENCE_ENTRIES } from "@/data/experience";
import { ExperienceCard } from "./ExperienceCard";

/** Below this width the sticky-stack fights native scroll and looks cramped,
 * so it falls back to a plain vertical stack with simple fade-ins instead. */
const DESKTOP_QUERY = "(min-width: 1024px)";
const MOBILE_QUERY = "(max-width: 1023px)";

/** Extra scroll distance per card's wrapper — the last card doesn't need room
 * for a "next card" transition, so it's shorter. */
const WRAPPER_HEIGHT_CLASSES = ["motion-safe:lg:h-[135vh]", "motion-safe:lg:h-[135vh]", "motion-safe:lg:h-[95vh]"];
const CARD_COUNT = EXPERIENCE_ENTRIES.length;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ExperienceStack() {
  const stackRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const registerCard = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  useIsomorphicLayoutEffect(() => {
    if (!stackRef.current) return;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const wrappers = wrapperRefs.current.filter(Boolean) as HTMLDivElement[];

    if (reduced) {
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(DESKTOP_QUERY, () => {
      const ctx = gsap.context(() => {
        // Per-card title mask reveal + tech-pill stagger, once the card has settled.
        cards.forEach((card, i) => {
          const title = card.querySelector<HTMLElement>("[data-exp-title]");
          const pills = card.querySelectorAll<HTMLElement>("[data-tech-pill]");
          if (!title) return;

          const split = new SplitText(title, { type: "words", mask: "words" });
          gsap.set(split.words, { yPercent: 120, opacity: 0 });
          if (pills.length) gsap.set(pills, { opacity: 0, y: 10 });

          const revealTl = gsap.timeline({
            scrollTrigger: { trigger: wrappers[i], start: "top 55%", toggleActions: "play none none none" },
          });
          revealTl.to(split.words, { yPercent: 0, opacity: 1, stagger: 0.05, ease: "power3.out" });
          if (pills.length) revealTl.to(pills, { opacity: 1, y: 0, stagger: 0.05, ease: "power2.out" }, "-=0.25");
        });

        // First card gets a simple one-time entrance (no predecessor to recede).
        gsap.fromTo(
          cards[0],
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: wrappers[0], start: "top 90%", toggleActions: "play none none none" },
          }
        );

        // Stacking: as card i arrives, card i-1 scales down and dims — scrubbed
        // to scroll position, tied to card i's own wrapper scrolling into place.
        for (let i = 1; i < cards.length; i++) {
          const incoming = cards[i];
          const outgoing = cards[i - 1];

          gsap.timeline({
            scrollTrigger: { trigger: wrappers[i], start: "top bottom", end: "top top", scrub: 0.5 },
          })
            .fromTo(incoming, { y: 40, scale: 0.96 }, { y: 0, scale: 1, ease: "none" }, 0)
            .to(outgoing, { scale: 0.95, opacity: 0.55, ease: "none" }, 0);
        }

        // Live "0X / 03" counter, driven by overall scroll progress through the stack.
        gsap.timeline({
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              if (!counterRef.current) return;
              const current = Math.min(CARD_COUNT, Math.floor(self.progress * CARD_COUNT) + 1);
              counterRef.current.textContent = `${pad(current)} / ${pad(CARD_COUNT)}`;
            },
          },
        });
      }, stackRef);

      return () => ctx.revert();
    });

    mm.add(MOBILE_QUERY, () => {
      const ctx = gsap.context(() => {
        gsap.set(cards, { opacity: 0, y: 20 });
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: wrappers[i], start: "top 88%", toggleActions: "play none none none" },
          });
        });
      }, stackRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <div ref={stackRef} className="relative mx-auto max-w-5xl px-5 md:px-8">
      {/* Live counter — sticky within the stack, desktop only */}
      <div className="sticky top-4 z-30 mb-4 hidden justify-end motion-safe:lg:flex">
        <span
          ref={counterRef}
          className="rounded-full bg-black px-3 py-1.5 font-mono text-[0.75rem] font-semibold text-white"
        >
          {`01 / ${pad(CARD_COUNT)}`}
        </span>
      </div>

      {EXPERIENCE_ENTRIES.map((entry, i) => (
        <div
          key={entry.id}
          ref={(el) => {
            wrapperRefs.current[i] = el;
          }}
          className={`relative mb-6 last:mb-0 motion-safe:lg:mb-0 ${WRAPPER_HEIGHT_CLASSES[i]}`}
        >
          <div
            className="motion-safe:lg:sticky motion-safe:lg:h-[82vh]"
            style={{ top: `${5 + i * 3}vh`, zIndex: i + 1 }}
          >
            <ExperienceCard entry={entry} orderIndex={i} registerCard={registerCard} />
          </div>
        </div>
      ))}
    </div>
  );
}
