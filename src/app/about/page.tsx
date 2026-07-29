import type { Metadata } from "next";
import { DriverProfileSection } from "@/components/sections/DriverProfile";
import { PitStopSection } from "@/components/sections/PitStop";

export const metadata: Metadata = {
  title: "About — Hemanth N",
  description:
    "Hemanth N is a Full-Stack Developer with a background in AI & Data Science, building fast, scalable, user-centric digital products.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="pt-nav md:pt-nav-lg">
      <DriverProfileSection />
      <PitStopSection />
    </main>
  );
}
