import { HeroSection } from "@/components/hero/HeroSection";
import { IntroTeaserSection } from "@/components/sections/IntroTeaser";
import { ProjectsFinderSection } from "@/components/sections/ProjectsFinder";
import { ExperienceSection } from "@/components/sections/Experience";
import { ContactSection } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <IntroTeaserSection />
        <ProjectsFinderSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
