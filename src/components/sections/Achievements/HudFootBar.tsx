import { HUD_KEY_HINTS } from "@/constants/achievements";
import { ACHIEVEMENTS_UNLOCKED_LABEL } from "@/data/achievements";

interface HudFootBarProps {
  total: number;
}

const pad = (value: number) => String(value).padStart(2, "0");

/** Status strip. The key legend is desktop-only because the bindings it names
 * only exist for a keyboard; touch gets the record count on its own. */
export function HudFootBar({ total }: HudFootBarProps) {
  return (
    <footer className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-t border-border/70 bg-background/60 px-5 py-3 backdrop-blur-md md:px-8">
      <ul className="hidden items-center gap-6 lg:flex">
        {HUD_KEY_HINTS.map((hint) => (
          <li key={hint.action} className="flex items-center gap-2">
            <span className="flex gap-1">
              {hint.keys.map((key) => (
                <kbd
                  key={key}
                  className="flex min-w-[1.4rem] justify-center rounded-sm border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.6rem] text-secondary"
                >
                  {key}
                </kbd>
              ))}
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">{hint.action}</span>
          </li>
        ))}
      </ul>

      <p className="flex items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted lg:hidden">
        <span className="h-1.5 w-1.5 rounded-full bg-success motion-safe:animate-hud-blink" aria-hidden />
        Archive online
      </p>

      <p className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
        <span className="hidden items-center gap-2 lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success motion-safe:animate-hud-blink" aria-hidden />
          Archive online
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-border lg:block" />
        <span>
          <span className="text-accent">{pad(total)}</span>
          <span className="text-border"> / </span>
          {pad(total)} {ACHIEVEMENTS_UNLOCKED_LABEL}
        </span>
      </p>
    </footer>
  );
}
