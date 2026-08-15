import { ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/site";

interface SocialLinksProps {
  className?: string;
}

/** Renders nothing while SOCIAL_LINKS is empty, so neither the contact section
 * nor the footer shows an orphaned heading before the profiles are filled in. */
export function SocialLinks({ className = "" }: SocialLinksProps) {
  if (SOCIAL_LINKS.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-secondary transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
          >
            {link.label}
            <ArrowUpRight
              aria-hidden
              className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
