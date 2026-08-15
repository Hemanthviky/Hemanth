import type { LucideIcon } from "lucide-react";

export type TechIconSize = "sm" | "md";

interface ITechIconBase {
  /** Canonical name shown in the hover/focus tooltip. */
  label: string;
  /** Colour revealed on hover — the brand colour for brand marks. */
  hex: string;
}

/** Single-path monochrome brand mark drawn on a 24×24 viewBox. */
export interface IBrandTechIcon extends ITechIconBase {
  kind: "brand";
  path: string;
}

/** Fallback for tools and disciplines that have no brand mark. */
export interface ILucideTechIcon extends ITechIconBase {
  kind: "lucide";
  Icon: LucideIcon;
}

export type ITechIcon = IBrandTechIcon | ILucideTechIcon;
