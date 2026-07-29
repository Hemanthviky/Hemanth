"use client";

import { cn } from "@/utils/cn";

/** 6px gap + 2px bar means each outer bar travels 8px to meet the centre. */
const BAR_BASE = "absolute h-0.5 w-6 bg-white transition-transform duration-[250ms] ease-out";

interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  controlsId: string;
}

/** Three bars that fold into an X — the middle bar collapses under the other
 * two rather than fading, so the morph stays a single transform animation. */
export function MenuToggle({ isOpen, onToggle, controlsId }: MenuToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="relative flex size-6 items-center justify-center md:hidden"
    >
      <span className={cn(BAR_BASE, isOpen ? "rotate-45" : "-translate-y-2")} />
      <span
        className={cn(
          "duration-[250ms] absolute h-0.5 w-6 bg-white transition-opacity ease-out",
          isOpen && "opacity-0"
        )}
      />
      <span className={cn(BAR_BASE, isOpen ? "-rotate-45" : "translate-y-2")} />
    </button>
  );
}
