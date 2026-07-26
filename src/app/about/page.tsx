import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About — Hemanth",
  description:
    "Hemanth N is a Full-Stack Developer with a background in AI & Data Science, building fast, scalable, user-centric digital products.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutSection />
    </main>
  );
}
