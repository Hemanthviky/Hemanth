interface FolderIconProps {
  className?: string;
}

/** Hand-drawn folder silhouette (classic macOS folder shape, reskinned in the
 * site's amber accent instead of Apple blue — own SVG, no system assets). */
export function FolderIcon({ className }: FolderIconProps) {
  return (
    <svg viewBox="0 0 64 52" fill="none" className={className} aria-hidden>
      {/* back panel with tab */}
      <path
        d="M4 8a4 4 0 0 1 4-4h14.5a4 4 0 0 1 2.9 1.25L28.6 8.6a4 4 0 0 0 2.9 1.25H56a4 4 0 0 1 4 4V42a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z"
        fill="#F59E0B"
      />
      {/* front panel, slightly lighter for depth */}
      <path
        d="M4 18a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V18Z"
        fill="#FBBF24"
      />
      {/* thin top highlight on the front panel */}
      <path d="M6 16.5h52" stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
