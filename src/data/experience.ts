import type { ICircuitPanel, IJourneyMilestone } from "@/types/experience";

export const CIRCUIT_INDEX = "01";
export const CIRCUIT_EYEBROW = "The Circuit";
export const CIRCUIT_TITLE = "2 Years Of Full Throttle";
export const CIRCUIT_SUBTITLE = "Scroll to drive the lap · 3 stops · 1 current seat";
export const CIRCUIT_STOPS_LABEL = "Stops";

/** Shown before the car reaches the first corner. */
export const CIRCUIT_INTRO_PANEL: ICircuitPanel = {
  id: "lap-start",
  eyebrow: "Lap start · Hamilton Straight",
  title: "Keep Scrolling.",
  body: "The lap runs as you scroll. First stop is Brooklands, where the career got off the straight and started turning.",
};

/** Shown at the closing stop, once every milestone has been passed. */
export const CIRCUIT_FINISH_PANEL: ICircuitPanel = {
  id: "club",
  eyebrow: "Final corner · Club",
  title: "Still On It.",
  body: "The lap isn't finished. The next stop is whatever you're building — bring the brief and let's find the racing line.",
};

/** Ordered earliest → most recent: index 0 is the first stop of the lap, the
 * last milestone is the final corner before the flag. */
export const JOURNEY_MILESTONES: IJourneyMilestone[] = [
  {
    id: "diagonal-labs",
    role: "Frontend Developer",
    company: "Diagonal Labs LLC (PrepKind)",
    dateRange: "August 2024 – December 2025",
    isPresent: false,
    summary:
      "Worked on PrepKind, an AI-powered visa interview platform, building responsive interfaces and integrating core features.",
    tech: ["React.js", "Firebase", "REST APIs", "Stripe", "Sentry", "Bugsnag"],
  },
  {
    id: "self-employed",
    role: "Freelance Developer",
    company: "Self-Employed",
    dateRange: "January 2026 – Present",
    isPresent: true,
    summary: "Working on web and mobile projects for clients worldwide.",
    tech: ["Websites", "React Applications", "Next.js", "Shopify Stores", "UI/UX Design"],
  },
  {
    id: "indsys-technologies",
    role: "Software Developer",
    company: "Indsys Technologies Pvt. Ltd.",
    dateRange: "June 2026 – Present",
    isPresent: true,
    isCurrent: true,
    summary:
      "Building enterprise applications and digital solutions for business clients using modern technologies.",
    tech: ["Frappe Framework", "Flutter (Mobile Apps)", "React", "Next.js", "REST APIs"],
  },
];
