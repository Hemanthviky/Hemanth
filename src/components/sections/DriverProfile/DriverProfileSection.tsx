import { PillButton } from "@/components/buttons/PillButton";
import { ArrowRightIcon, ICON_SIZES } from "@/components/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROFILE_BIO, PROFILE_CTA, PROFILE_HEADING, PROFILE_SECTOR } from "@/data/driverProfile";
import { PerformanceStats } from "./PerformanceStats";
import { ProfilePortrait } from "./ProfilePortrait";
import { SpecSheet } from "./SpecSheet";

export function DriverProfileSection() {
  return (
    <section id="about" className="sector-shell sector-block flex flex-col gap-12 md:gap-16">
      <SectionHeading sector={PROFILE_SECTOR} heading={PROFILE_HEADING} />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <ProfilePortrait />

        <div className="flex flex-col gap-8">
          <SpecSheet />
          <p className="type-body max-w-2xl">{PROFILE_BIO}</p>
          <PillButton href={PROFILE_CTA.href} variant="outlineSubtle" size="sm" className="self-start">
            {PROFILE_CTA.label}
            <ArrowRightIcon size={ICON_SIZES.inline} />
          </PillButton>
        </div>
      </div>

      <PerformanceStats />
    </section>
  );
}
