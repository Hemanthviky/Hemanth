"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { HairlineLabel } from "@/components/shared/hud";
import { PROFILE_STATS, PROFILE_STATS_LABEL } from "@/data/driverProfile";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";

const COUNT_ATTR = "data-count-to";
const COUNT_DURATION_S = 1.2;

/** Broadcast-style stats bar: one horizontal strip split by hairline dividers,
 * numbers sitting directly on the section background — no boxed stat cards.
 * Values render server-side at their real figure and are only reset to zero
 * once the count-up takes over, so the markup is correct without JavaScript. */
export function PerformanceStats() {
  const rootRef = useRef<HTMLDListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion) return;

    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(`[${COUNT_ATTR}]`).forEach((node) => {
        const target = Number(node.dataset.countTo);
        const counter = { value: 0 };
        node.textContent = "0";

        gsap.to(counter, {
          value: target,
          duration: COUNT_DURATION_S,
          ease: "power2.out",
          snap: { value: 1 },
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
          onUpdate: () => {
            node.textContent = String(counter.value);
          },
        });
      });
    }, root);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="flex flex-col gap-6">
      <HairlineLabel label={PROFILE_STATS_LABEL} tone="muted" />

      <dl ref={rootRef} className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
        {PROFILE_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "border-border flex flex-col gap-1 py-1",
              /* The divider is dropped on whichever cell starts a visual row,
               * which differs between the two-up and four-up layouts. */
              index % 2 === 0 ? "pl-0" : "border-l pl-5",
              index === 0 ? "md:border-l-0 md:pl-0" : "md:border-l md:pl-6"
            )}
          >
            <dd className="type-data text-data md:text-data-lg">
              <span {...{ [COUNT_ATTR]: stat.value }}>{stat.value}</span>
              {stat.suffix}
            </dd>
            <dt className="type-label-sm text-white">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
