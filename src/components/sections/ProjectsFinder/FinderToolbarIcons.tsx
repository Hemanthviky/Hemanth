interface IconProps {
  className?: string;
}

/** Hand-drawn toolbar glyphs matching real macOS Finder's thin-stroke style —
 * own SVGs (no Apple assets), colored via `currentColor` from the wrapper. */

export function GridViewIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function ListViewIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1.5" y="2.5" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="1.5" y="7" width="2" height="2" rx="0.5" fill="currentColor" />
      <rect x="1.5" y="11.5" width="2" height="2" rx="0.5" fill="currentColor" />
      <path d="M5.5 3.5H14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5.5 8H14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5.5 12.5H14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function GalleryViewIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="1.5" y="3" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11" y="5.5" width="3.5" height="5" rx="0.8" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function FinderSearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M13.5 13.5L10.3 10.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
