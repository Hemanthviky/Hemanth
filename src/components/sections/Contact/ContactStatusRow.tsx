import { Clock, MapPin } from "lucide-react";
import { SITE_LOCATION } from "@/constants/site";
import { CONTACT_AVAILABILITY, CONTACT_RESPONSE_TIME } from "@/data/contact";

/** The three things a prospective client checks before writing: is he free,
 * where is he, and will he answer. Laid out as telemetry rows to match the
 * panel it sits in rather than the pill-row a status bar would use. */
export function ContactStatusRow() {
  return (
    <ul className="flex flex-col gap-4">
      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
        </span>
        <span className="flex flex-col">
          <span className="font-mono text-[0.58rem] uppercase leading-none tracking-[0.2em] text-muted">
            Availability
          </span>
          <span className="mt-1.5 text-[0.85rem] leading-none text-foreground">{CONTACT_AVAILABILITY}</span>
        </span>
      </li>

      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
          <MapPin aria-hidden className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
        </span>
        <span className="flex flex-col">
          <span className="font-mono text-[0.58rem] uppercase leading-none tracking-[0.2em] text-muted">
            Location
          </span>
          <span className="mt-1.5 text-[0.85rem] leading-none text-foreground">{SITE_LOCATION}</span>
        </span>
      </li>

      <li className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
          <Clock aria-hidden className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
        </span>
        <span className="flex flex-col">
          <span className="font-mono text-[0.58rem] uppercase leading-none tracking-[0.2em] text-muted">
            Response Time
          </span>
          <span className="mt-1.5 text-[0.85rem] leading-none text-foreground">{CONTACT_RESPONSE_TIME}</span>
        </span>
      </li>
    </ul>
  );
}
