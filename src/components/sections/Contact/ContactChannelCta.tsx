import { ArrowUpRight } from "lucide-react";

type ContactChannelEmphasis = "primary" | "secondary";

const VALUE_CLASSES: Record<ContactChannelEmphasis, string> = {
  primary: "text-[1.15rem] md:text-[1.75rem]",
  secondary: "text-[1.05rem] md:text-[1.35rem]",
};

const ICON_CLASSES: Record<ContactChannelEmphasis, string> = {
  primary: "h-7 w-7 md:h-9 md:w-9",
  secondary: "h-6 w-6 md:h-7 md:w-7",
};

interface ContactChannelCtaProps {
  label: string;
  value: string;
  href: string;
  emphasis?: ContactChannelEmphasis;
  /** Opens in a new tab — for web destinations like WhatsApp, not `mailto:`. */
  isExternal?: boolean;
}

/** One way to reach him, sized like a headline rather than a button — these are
 * the primary actions on the page and the address is the message. */
export function ContactChannelCta({
  label,
  value,
  href,
  emphasis = "primary",
  isExternal = false,
}: ContactChannelCtaProps) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-border border-l-2 border-l-accent/40 bg-surface/60 px-5 py-6 transition-all duration-300 hover:border-accent hover:border-l-accent hover:bg-surface hover:shadow-[0_0_48px_-16px_var(--accent)] focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:px-8 md:py-8"
    >
      <span className="min-w-0">
        <span className="block font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
          {label}
        </span>
        <span
          className={`mt-2 block truncate font-black tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent ${VALUE_CLASSES[emphasis]}`}
        >
          {value}
        </span>
      </span>

      <ArrowUpRight
        aria-hidden
        className={`shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent ${ICON_CLASSES[emphasis]}`}
      />
    </a>
  );
}
