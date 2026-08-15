import { GrainOverlay } from "@/components/shared/GrainOverlay";

const GRID_LINE = "color-mix(in srgb, var(--border) 70%, transparent)";

/** The screen behind the archive: survey grid, a single warm bloom above the
 * horizon, a vignette that pushes the corners back, and the CRT tells — fixed
 * scanlines plus one slow bar of light. All decorative, all pointer-inert. */
export function HudBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `linear-gradient(${GRID_LINE} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 78%)",
        }}
      />

      <div className="absolute -top-1/4 left-1/2 h-[38rem] w-[64rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/[0.04] blur-[130px]" />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 42%, transparent 38%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "repeating-linear-gradient(180deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-1/3 motion-safe:animate-hud-sweep">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-white/[0.025] to-transparent" />
      </div>

      <GrainOverlay opacity={0.02} />
    </div>
  );
}
