"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { PillButton } from "@/components/buttons/PillButton";
import { TwoToneHeadline } from "@/components/shared/hud";
import { HERO_CTAS, HERO_EYEBROW, HERO_HEADLINE, HERO_LOCATION, HERO_TAGLINE } from "@/data/hero";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const ITEM_ATTR = "data-hero-item";
const START_DELAY_S = 0.3;
const BORDER_DRAW_S = 0.4;
const ITEM_DURATION_S = 0.5;
const ITEM_STAGGER_S = 0.05;
const ITEM_OFFSET_PX = 12;

interface HeroContentProps {
  /** Fires once the panel has finished entering — the telemetry readouts only
   * start ticking after that. */
  onEntranceComplete: () => void;
}

export function HeroContent({ onEntranceComplete }: HeroContentProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (prefersReducedMotion) {
      onEntranceComplete();
      return;
    }

    const context = gsap.context(() => {
      const items = panel.querySelectorAll(`[${ITEM_ATTR}]`);
      gsap.set(panel, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(items, { opacity: 0, y: ITEM_OFFSET_PX });

      gsap
        .timeline({ delay: START_DELAY_S, onComplete: onEntranceComplete })
        .to(panel, { scaleX: 1, duration: BORDER_DRAW_S, ease: "power2.out" })
        .to(items, {
          opacity: 1,
          y: 0,
          duration: ITEM_DURATION_S,
          stagger: ITEM_STAGGER_S,
          ease: "power2.out",
        });
    }, panel);

    return () => context.revert();
  }, [prefersReducedMotion, onEntranceComplete]);

  return (
    <div ref={panelRef} className="hud-panel w-full max-w-2xl px-5 py-4 md:px-6 lg:max-w-[55%]">
      <p {...{ [ITEM_ATTR]: "" }} className="type-eyebrow">
        {HERO_EYEBROW}
      </p>

      <TwoToneHeadline
        as="h1"
        scaleClassName="type-h1"
        solid={HERO_HEADLINE.solid}
        outline={HERO_HEADLINE.outline}
        lineAttribute={ITEM_ATTR}
        className="mt-4"
      />

      <p {...{ [ITEM_ATTR]: "" }} className="type-body text-muted-warm mt-6 max-w-lg">
        {HERO_TAGLINE}
      </p>

      <p {...{ [ITEM_ATTR]: "" }} className="type-label mt-5">
        {HERO_LOCATION}
      </p>

      <div {...{ [ITEM_ATTR]: "" }} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <PillButton href={HERO_CTAS.primary.href}>{HERO_CTAS.primary.label}</PillButton>
        <PillButton href={HERO_CTAS.secondary.href} variant="outline">
          {HERO_CTAS.secondary.label}
        </PillButton>
      </div>
    </div>
  );
}
