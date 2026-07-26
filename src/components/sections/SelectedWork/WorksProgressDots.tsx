"use client";

import { motion } from "framer-motion";

interface WorksProgressDotsProps {
  count: number;
  activeIndex: number;
}

const EASE = [0.16, 1, 0.3, 1];

export function WorksProgressDots({ count, activeIndex }: WorksProgressDotsProps) {
  return (
    /* Pinned to the far right, vertically centred */
    <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-0 md:flex lg:right-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Row: number + dot */}
          <div className="flex items-center gap-2">
            {/* Number label */}
            <motion.span
              className="text-right font-semibold"
              style={{ fontSize: "0.65rem", width: "1.4rem" }}
              animate={{
                color: i === activeIndex ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.25)",
              }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>

            {/* Dot */}
            <motion.span
              className="block rounded-full"
              animate={{
                width: i === activeIndex ? 8 : 6,
                height: i === activeIndex ? 8 : 6,
                backgroundColor: i === activeIndex ? "#000000" : "rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </div>

          {/* Connector line between dots (skip after last) */}
          {i < count - 1 && (
            <div className="ml-[1.4rem] flex flex-col items-center">
              <div className="w-px bg-black/10" style={{ height: 22 }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
