import type { IJourneyMilestone } from "@/types/experience";

export const EXPERIENCE_EYEBROW = "Experience";

export const JOURNEY_SUBTEXT =
  "Each stop has been a step forward. Building better solutions and growing every day.";

export const JOURNEY_END_LABEL = "On The Way";

export const JOURNEY_CLOSING_LINE = "Keep Building. Keep Growing.";

/** Ordered earliest → most recent: index 0 sits at the start of the road,
 * the last milestone sits furthest along, before the "On The Way" marker. */
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
    id: "indsys-technologies",
    role: "Software Developer",
    company: "Indsys Technologies Pvt. Ltd.",
    dateRange: "June 2026 – Present",
    isPresent: true,
    isCurrent: true,
    summary:
      "Building enterprise applications and digital solutions for business clients using modern technologies.",
    tech: [
      "Frappe Framework",
      "Flutter (Mobile Apps)",
      "React, Next.js (Web Development)",
      "REST APIs & Business Workflows",
      "Scalable & Maintainable Solutions",
    ],
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
];
