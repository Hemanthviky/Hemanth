import type { ReactNode } from "react";

export const ICON_SIZES = {
  inline: 16,
  action: 20,
  standalone: 24,
} as const;

const BASE_VIEWBOX = 24;
const STROKE_PX = 1.5;

export interface IconProps {
  size?: number;
  className?: string;
}

interface IconShellProps extends IconProps {
  children: ReactNode;
}

/** Every icon on the site is a stroke-only line glyph. Stroke width is scaled
 * against the rendered size so a 16px and a 24px icon both land on an optical
 * 1.5px line rather than the 24px viewBox thinning them out. */
export function Icon({ size = ICON_SIZES.action, className, children }: IconShellProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${BASE_VIEWBOX} ${BASE_VIEWBOX}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={(STROKE_PX * BASE_VIEWBOX) / size}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}
