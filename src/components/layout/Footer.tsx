import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { GrainOverlay } from "@/components/shared/GrainOverlay";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  NAV_LINKS,
  SITE_AUTHOR,
  SITE_LOCATION,
} from "@/constants/site";
import {
  CONTACT_AVAILABILITY,
  FOOTER_COLOPHON,
  FOOTER_CONNECT_LABEL,
  FOOTER_NAV_LABEL,
  FOOTER_TAGLINE,
} from "@/data/contact";
import { BackToTopButton } from "./BackToTopButton";

/** Closes the dark run that starts at the circuit. Deliberately quiet — the
 * contact section above already carries the call to action, so this is
 * wayfinding and small print — but built from the same instrument-panel
 * language (status dot, icon-boxed channels, accent glow) so the close reads
 * as one continuous system rather than a plain sign-off. */
export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-background px-5 pb-8 pt-16 text-foreground md:px-8 md:pb-10 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[110px]"
      />
      <GrainOverlay opacity={0.02} />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex select-none items-baseline">
              <span className="text-[1.35rem] font-black leading-none tracking-tight md:text-[1.5rem]">
                {SITE_AUTHOR}
              </span>
              <span className="text-[1.7rem] font-black leading-none text-accent md:text-[1.9rem]">.</span>
            </Link>

            <p className="mt-4 max-w-sm text-[0.85rem] leading-relaxed text-secondary">{FOOTER_TAGLINE}</p>

            <div className="mt-6 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-secondary">
                {CONTACT_AVAILABILITY} · {SITE_LOCATION}
              </span>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">{FOOTER_NAV_LABEL}</p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.9rem] text-secondary transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">{FOOTER_CONNECT_LABEL}</p>

            <div className="mt-5 flex flex-col gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="group inline-flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card transition-colors duration-200 group-hover:border-accent/50">
                  <Mail aria-hidden className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
                </span>
                <span className="truncate text-[0.9rem] text-secondary transition-colors duration-200 group-hover:text-accent">
                  {CONTACT_EMAIL}
                </span>
              </a>

              <a href={CONTACT_PHONE_HREF} className="group inline-flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card transition-colors duration-200 group-hover:border-accent/50">
                  <Phone aria-hidden className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
                </span>
                <span className="text-[0.9rem] text-secondary transition-colors duration-200 group-hover:text-accent">
                  {CONTACT_PHONE}
                </span>
              </a>
            </div>

            <SocialLinks className="mt-6" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
            © {new Date().getFullYear()} {SITE_AUTHOR} · {FOOTER_COLOPHON}
          </p>

          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
