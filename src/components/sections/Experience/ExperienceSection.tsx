import { ExperienceHeader } from "./ExperienceHeader";
import { JourneyRoad } from "./JourneyRoad";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full overflow-hidden bg-white pb-20 md:pb-28">
      <ExperienceHeader />
      <JourneyRoad />
    </section>
  );
}
