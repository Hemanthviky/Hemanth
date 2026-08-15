import { ArrowUpRight } from "lucide-react";
import type { IAchievementLink } from "@/types/achievement";

interface ProofLinksProps {
  links: IAchievementLink[];
  /** Marks the target of the screen's Enter binding, so the legend in the
   * footer points at something the reader can actually see. */
  primaryRef?: (node: HTMLAnchorElement | null) => void;
}

/** Certificate files, verification pages and live products. The first link is
 * the primary proof and is the one the Enter key opens. */
export function ProofLinks({ links, primaryRef }: ProofLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((link, index) => {
        const isPrimary = index === 0;
        return (
          <a
            key={link.href}
            ref={isPrimary ? primaryRef : undefined}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className={`group inline-flex items-center gap-2.5 border px-4 py-2.5 text-[0.78rem] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
              isPrimary
                ? "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20"
                : "border-border bg-surface/60 text-secondary hover:border-border hover:text-foreground"
            }`}
          >
            {link.label}
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        );
      })}
    </div>
  );
}
