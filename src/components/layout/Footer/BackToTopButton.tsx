"use client";

import { useReducedMotion } from "framer-motion";
import { ChevronUpIcon, ICON_SIZES } from "@/components/icons";
import { CornerBrackets } from "@/components/shared/hud";
import { scrollToTop } from "@/utils/scrollToTop";

export function BackToTopButton() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() => scrollToTop(Boolean(prefersReducedMotion))}
      aria-label="Back to top"
      className="group bg-surface relative flex size-10 items-center justify-center rounded-full"
    >
      <CornerBrackets revealOnHover />
      <ChevronUpIcon
        size={ICON_SIZES.action}
        className="duration-quick text-white transition-colors group-hover:text-signal-yellow"
      />
    </button>
  );
}
