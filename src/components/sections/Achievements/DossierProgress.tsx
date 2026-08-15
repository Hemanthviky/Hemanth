"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IAchievementProgress } from "@/types/achievement";

interface DossierProgressProps {
  progress: IAchievementProgress;
}

const PERCENT = 100;

/** The one bar on the screen that is still filling. Both ends are real numbers
 * published by the issuer — nothing here is scaled to look further along than
 * it is, and the caption states what is left in the issuer's own terms. */
export function DossierProgress({ progress }: DossierProgressProps) {
  const reduced = useReducedMotion();
  const ratio = Math.min(progress.current / progress.goal, 1);
  const percent = Math.round(ratio * PERCENT);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
          Next tier · <span className="text-secondary">{progress.target}</span>
        </p>
        <p className="font-mono text-[0.72rem] font-semibold tabular-nums text-accent">{percent}%</p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={PERCENT}
        aria-label={`Progress towards ${progress.target}`}
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border/70"
      >
        <motion.span
          className="block h-full origin-left rounded-full bg-gradient-to-r from-accent/70 to-accent-hover"
          initial={{ scaleX: reduced ? ratio : 0 }}
          animate={{ scaleX: ratio }}
          transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 0.2 }}
        />
      </div>

      <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">{progress.caption}</p>
    </div>
  );
}
