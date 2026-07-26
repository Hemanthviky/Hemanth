"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IMarqueeItem } from "@/types/palletRoss";
import { PR_COLORS } from "@/constants/palletRoss";

export function Marquee({ items }: { items: IMarqueeItem[] }) {
  const reduceMotion = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div
      className="relative flex w-full overflow-hidden rounded-2xl py-4"
      style={{ backgroundColor: PR_COLORS.lime }}
    >
      <motion.div
        className="flex shrink-0 items-center gap-8 whitespace-nowrap px-4"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: PR_COLORS.text }}
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
