import { SectionHeading } from "@/components/shared/SectionHeading";
import { TIMING_HEADING, TIMING_SECTOR } from "@/data/timingSheet";
import { TimingRows } from "./TimingRows";

export function TimingSheetSection() {
  return (
    <section id="experience" className="sector-shell sector-block flex flex-col gap-12 md:gap-16">
      <SectionHeading sector={TIMING_SECTOR} heading={TIMING_HEADING} />
      <TimingRows />
    </section>
  );
}
