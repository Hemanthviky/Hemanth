import { SectionHeading } from "@/components/shared/SectionHeading";
import { GARAGE_HEADING, GARAGE_SECTOR, GARAGE_SUBTEXT } from "@/data/garage";
import { GarageRows } from "./GarageRows";

export function GarageSection() {
  return (
    <section id="work" className="sector-shell sector-block flex flex-col gap-12 md:gap-16">
      <SectionHeading sector={GARAGE_SECTOR} heading={GARAGE_HEADING} subtext={GARAGE_SUBTEXT} />
      <GarageRows />
    </section>
  );
}
