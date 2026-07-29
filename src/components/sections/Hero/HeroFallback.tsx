/** Stage-lit gradient standing in for the 3D scene. It renders behind the
 * canvas at all times, so the hero is never blank before the WebGL bundle
 * mounts and never broken if WebGL is unavailable. */
export function HeroFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="bg-bg absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_68%_82%,var(--color-surface)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_72%_70%,color-mix(in_srgb,var(--color-key-glow)_16%,transparent)_0%,transparent_75%)]" />
      <div className="bg-border/60 absolute inset-x-0 top-[62%] h-px" />
      <div className="from-bg absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
    </div>
  );
}
