import { PillButton } from "@/components/buttons/PillButton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PIT_STOP_CTA_LABEL, PIT_STOP_HEADING, PIT_STOP_SECTOR } from "@/data/pitStop";
import { CONTACT_EMAIL } from "@/data/site";
import { EmailCopy } from "./EmailCopy";
import { SocialRow } from "./SocialRow";

/** Deliberately the calmest section on the page — no entrance animation, no
 * decorative motion, nothing between a visitor and the email address. */
export function PitStopSection() {
  return (
    <section id="contact" className="sector-shell sector-block flex flex-col gap-12">
      <SectionHeading sector={PIT_STOP_SECTOR} heading={PIT_STOP_HEADING} />

      <div className="flex flex-col gap-8">
        <EmailCopy />
        <SocialRow />
        <PillButton href={`mailto:${CONTACT_EMAIL}`} className="self-start">
          {PIT_STOP_CTA_LABEL}
        </PillButton>
      </div>
    </section>
  );
}
