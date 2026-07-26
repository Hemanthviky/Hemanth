import { HeroSection } from "@/components/hero/HeroSection";
import { IntroTeaserSection } from "@/components/sections/IntroTeaser";
import { ProjectsFinderSection } from "@/components/sections/ProjectsFinder";
import { ExperienceSection } from "@/components/sections/Experience";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroTeaserSection />
      <ProjectsFinderSection />
      <ExperienceSection />
    </main>
  );
}
