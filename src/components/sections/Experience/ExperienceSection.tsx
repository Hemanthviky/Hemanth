import { ExperienceHeader } from "./ExperienceHeader";
import { ExperienceStack } from "./ExperienceStack";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full overflow-hidden bg-white pb-20 md:pb-28">
      <ExperienceHeader />
      <ExperienceStack />
    </section>
  );
}
