import Link from "next/link";
import { MagneticButton } from "@/components/buttons/MagneticButton";
import { GrainOverlay } from "@/components/shared/GrainOverlay";
import { AboutIntro } from "./AboutIntro";
import { AboutBioPortrait } from "./AboutBioPortrait";
import { AboutQuickFacts } from "./AboutQuickFacts";
import { AboutPhilosophyQuote } from "./AboutPhilosophyQuote";
import { AboutDrivesMe } from "./AboutDrivesMe";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-white">
      <GrainOverlay opacity={0.025} />

      <div className="relative z-10">
        <div className="pt-24 md:pt-32">
          <AboutIntro />
        </div>

        <div className="mt-16 md:mt-20">
          <AboutBioPortrait />
        </div>

        <div className="py-16 md:py-20">
          <AboutQuickFacts />
        </div>

        <AboutPhilosophyQuote />

        <AboutDrivesMe />

        <div className="flex justify-center pb-24 md:pb-32">
          <MagneticButton>
            <Link
              href="/#work"
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-black px-8 py-4 text-[0.88rem] font-semibold tracking-wide text-white select-none"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset, 0 8px 32px rgba(0,0,0,0.22)" }}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              <span className="relative z-10">View My Work</span>
              <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 transition-colors duration-200 group-hover:bg-white/20">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 9L9 2M9 2H4M9 2V7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
