interface DotGridOverlayProps {
  className?: string;
  opacity?: number;
}

/** Faint dot-grid texture, lighter and more graphic than GrainOverlay's noise.
 * Parent must be `position: relative`. */
export function DotGridOverlay({ className = "", opacity = 0.045 }: DotGridOverlayProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        opacity,
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />
  );
}
