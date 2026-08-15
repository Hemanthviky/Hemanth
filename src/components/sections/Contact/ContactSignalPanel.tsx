import { SocialLinks } from "@/components/shared/SocialLinks";
import { ContactStatusRow } from "./ContactStatusRow";

/** Right-column readout that answers the practical questions a CTA can't:
 * free now, where from, how fast, and where else to find him. Shares the
 * accent-stripe card language the circuit's info card uses, so the reply
 * still reads as part of the same instrument panel. */
export function ContactSignalPanel() {
  return (
    <aside className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-border border-l-2 border-l-accent bg-surface/70 p-6 backdrop-blur-md md:p-8">
      <div>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-accent">Status</p>
        <div className="mt-6">
          <ContactStatusRow />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">Elsewhere</p>
        <SocialLinks className="mt-4" />
      </div>
    </aside>
  );
}
