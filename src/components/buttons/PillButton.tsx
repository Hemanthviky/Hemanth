import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type PillVariant = "primary" | "outline" | "outlineSubtle";
export type PillSize = "sm" | "md";

const VARIANT_CLASS: Record<PillVariant, string> = {
  primary: "bg-racing-red text-white hover:bg-racing-red-hover",
  outline: "border-[1.5px] border-white text-white hover:bg-white hover:text-bg",
  outlineSubtle: "border border-border text-white hover:border-racing-red hover:bg-racing-red",
};

const SIZE_CLASS: Record<PillSize, string> = {
  sm: "px-6 py-2.5 text-label-lg",
  md: "px-8 py-3.5",
};

interface PillButtonProps {
  href: string;
  children: ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  /** Hover lift — 1.02 by default, 1.03 for the nav CTA per the brief. */
  hoverScale?: "102" | "103";
  className?: string;
}

const SCALE_CLASS = { "102": "hover:scale-102", "103": "hover:scale-103" } as const;

/** The site's only button shape. Pills own their hover state and never take
 * corner brackets, so the two devices can't clash. */
export function PillButton({
  href,
  children,
  variant = "primary",
  size = "md",
  hoverScale = "102",
  className,
}: PillButtonProps) {
  const classes = cn(
    "type-button inline-flex items-center justify-center gap-2 rounded-full transition-[background-color,color,transform,border-color] duration-fast ease-out",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    SCALE_CLASS[hoverScale],
    className
  );

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
