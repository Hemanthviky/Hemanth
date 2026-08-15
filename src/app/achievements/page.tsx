import type { Metadata } from "next";
import { AchievementsScreen } from "@/components/sections/Achievements";

export const metadata: Metadata = {
  title: "Achievements — Hemanth",
  description:
    "Certifications, Salesforce Trailhead rank, and shipped products by Hemanth N — Salesforce Agentforce Specialist, AWS Cloud Practitioner coursework, Trailhead Ranger, and PrepKind.",
};

/** Renders without the site navbar and footer on purpose: the archive is a
 * full-viewport screen that carries its own chrome. */
export default function AchievementsPage() {
  return (
    <main>
      <AchievementsScreen />
    </main>
  );
}
