import type { CSSProperties } from "react";
import { resolveTechIcon } from "@/utils/resolveTechIcon";
import type { ITechIcon, TechIconSize } from "@/types/tech";

export type TechIconVariant = "chip" | "plain";

interface TechIconProps {
  /** Free-form tech name from the content data — resolved through the registry. */
  name: string;
  size?: TechIconSize;
  /** "chip" draws the bordered tile used inside cards; "plain" renders the bare
   * glyph for rows that already sit inside their own container. */
  variant?: TechIconVariant;
}

const CHIP_SIZE: Record<TechIconSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
};

const GLYPH_SIZE: Record<TechIconSize, string> = {
  sm: "h-[15px] w-[15px]",
  md: "h-[18px] w-[18px]",
};

const CHIP_CLASSES =
  "rounded-xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(11,11,15,0.04)] " +
  "hover:[border-color:color-mix(in_srgb,var(--tech-accent)_38%,transparent)] " +
  "hover:[background-color:color-mix(in_srgb,var(--tech-accent)_7%,white)] " +
  "motion-safe:hover:-translate-y-0.5";

function TechGlyph({ icon, className }: { icon: ITechIcon; className: string }) {
  if (icon.kind === "lucide") {
    const { Icon } = icon;
    return <Icon className={className} strokeWidth={1.75} aria-hidden />;
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d={icon.path} />
    </svg>
  );
}

/** A single technology rendered as its brand mark instead of a text label. The
 * glyph is monochrome at rest and warms to the brand colour on hover; the name
 * stays available to assistive tech via `aria-label` and to sighted users via
 * the hover tooltip. */
export function TechIcon({ name, size = "md", variant = "chip" }: TechIconProps) {
  const icon = resolveTechIcon(name);

  return (
    <span
      className="group/tech relative inline-flex"
      style={{ "--tech-accent": icon.hex } as CSSProperties}
    >
      <span
        role="img"
        aria-label={icon.label}
        className={`inline-flex items-center justify-center text-black/45 transition duration-200 hover:[color:var(--tech-accent)] ${
          variant === "chip" ? `${CHIP_SIZE[size]} ${CHIP_CLASSES}` : ""
        }`}
      >
        <TechGlyph icon={icon} className={GLYPH_SIZE[size]} />
      </span>

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-2 py-1 text-[0.68rem] font-medium tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover/tech:opacity-100"
      >
        {icon.label}
      </span>
    </span>
  );
}
