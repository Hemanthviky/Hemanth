import { ACHIEVEMENTS_EYEBROW, ACHIEVEMENTS_HEADLINE, ACHIEVEMENTS_INTRO } from "@/data/achievements";

/** Heads the roster column. The screen has no page-scroll headline of its own,
 * so this is the archive's only title and carries the h1. */
export function ArchiveTitle() {
  return (
    <div className="shrink-0 border-b border-border/70 px-5 pb-6 pt-7 md:px-6">
      <p className="flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.26em] text-muted">
        <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden />
        {ACHIEVEMENTS_EYEBROW}
      </p>

      <h1 className="mt-4 font-black uppercase leading-[0.9] tracking-[-0.03em] text-foreground text-[clamp(2rem,7vw,2.75rem)]">
        {ACHIEVEMENTS_HEADLINE}
      </h1>

      <p className="mt-4 max-w-sm text-[0.82rem] leading-relaxed text-muted">{ACHIEVEMENTS_INTRO}</p>
    </div>
  );
}
