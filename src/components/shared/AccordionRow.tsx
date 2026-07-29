"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUpIcon, ICON_SIZES } from "@/components/icons";
import { CornerBrackets } from "@/components/shared/hud";
import { cn } from "@/utils/cn";

const EXPAND_DURATION_S = 0.3;

interface AccordionRowProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  /** The always-visible row content. */
  summary: ReactNode;
  children: ReactNode;
  label: string;
}

/** A hairline-divided row that expands in place. No background, no radius, no
 * shadow — the divider is the only boundary, which is what keeps the Garage and
 * the Timing Sheet reading as one timing document rather than two card grids. */
export function AccordionRow({ id, isOpen, onToggle, summary, children, label }: AccordionRowProps) {
  const prefersReducedMotion = useReducedMotion();
  const panelId = `${id}-panel`;
  const duration = prefersReducedMotion ? 0 : EXPAND_DURATION_S;

  return (
    <li className="border-border border-b">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={label}
        className="group relative block w-full cursor-pointer py-7 text-left md:py-9"
      >
        <CornerBrackets revealOnHover />
        <div className="relative flex items-center gap-6">
          <div className="min-w-0 flex-1">{summary}</div>
          <ChevronUpIcon
            size={ICON_SIZES.action}
            className={cn(
              "duration-base text-muted group-hover:text-signal-yellow shrink-0 transition-[transform,color]",
              isOpen ? "rotate-0" : "rotate-180"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
