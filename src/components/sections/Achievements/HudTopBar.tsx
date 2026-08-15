import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { NAV_LINKS } from "@/constants/site";
import { ACHIEVEMENTS_EYEBROW, ACHIEVEMENTS_HEADLINE } from "@/data/achievements";

const ACHIEVEMENTS_HREF = "/achievements";

/** The archive replaces the site chrome rather than sitting under it, so this
 * bar carries the whole of it: brand mark home, the same routes the navbar
 * offers set as HUD tabs, and an exit that mirrors the Escape binding.
 *
 * `sticky` only matters below lg, where the screen scrolls with the page —
 * inside the desktop fixed-height column it resolves to no movement. */
export function HudTopBar() {
  return (
    <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-4 border-b border-border/70 bg-background/80 px-5 py-4 backdrop-blur-md md:px-8">
      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/" className="flex select-none items-center" aria-label="Hemanth — home">
          <span className="text-[1.15rem] font-black leading-none tracking-tight text-foreground">Hemanth</span>
          <span className="text-[1.4rem] font-black leading-none text-accent">.</span>
        </Link>

        <span aria-hidden className="hidden h-6 w-px bg-border sm:block" />

        <p className="hidden font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted sm:block">
          <span className="text-accent">{"//"}</span> {ACHIEVEMENTS_EYEBROW}
        </p>
      </div>

      <nav aria-label="Site" className="hidden items-center gap-1 lg:flex">
        {NAV_LINKS.map((link) => {
          const isCurrent = link.href === ACHIEVEMENTS_HREF;
          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isCurrent ? "page" : undefined}
              className={`rounded-md px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                isCurrent ? "bg-accent/10 text-accent" : "text-secondary hover:bg-surface hover:text-foreground"
              }`}
            >
              {isCurrent ? ACHIEVEMENTS_HEADLINE : link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="group flex items-center gap-2.5 rounded-md border border-border bg-surface/70 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-secondary transition-colors duration-200 hover:border-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        <ChevronLeft
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        <span className="hidden sm:inline">Exit</span>
        <kbd className="rounded-sm border border-border bg-background px-1.5 py-0.5 text-[0.55rem] not-italic text-muted">
          Esc
        </kbd>
      </Link>
    </header>
  );
}
