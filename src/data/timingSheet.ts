import { RoleStatus, type ITimingEntry } from "@/types/motorsport";

export const TIMING_SECTOR = { number: "03", name: "TIMING SHEET" } as const;

export const TIMING_HEADING = { solid: "My Journey", outline: "So Far" } as const;

export const TIMING_ENTRIES: ITimingEntry[] = [
  {
    id: "diagonal-labs",
    position: "01",
    role: "Frontend Developer",
    company: "Diagonal Labs LLC (PrepKind)",
    dateRange: "Aug 2024 – Dec 2025",
    status: RoleStatus.Completed,
    summary:
      "Worked on PrepKind, an AI-powered visa interview platform, building responsive interfaces and integrating core features.",
    highlight: "Shipped the core mock-interview experience used by hundreds of visa applicants.",
    tech: ["React.js", "Firebase", "REST APIs", "Stripe", "Sentry", "Bugsnag"],
  },
  {
    id: "indsys",
    position: "02",
    role: "Software Developer",
    company: "Indsys Technologies Pvt. Ltd.",
    dateRange: "Jun 2026 – Present",
    status: RoleStatus.Current,
    summary:
      "Building enterprise applications and digital solutions for business clients using modern technologies.",
    highlight: "Currently leading frontend architecture across multiple internal ERP and mobile products.",
    tech: [
      "Frappe Framework",
      "Flutter (Mobile Apps)",
      "React, Next.js (Web Development)",
      "REST APIs & Business Workflows",
      "Scalable & Maintainable Solutions",
    ],
  },
  {
    id: "freelance",
    position: "03",
    role: "Freelance Developer",
    company: "Self-Employed",
    dateRange: "Jan 2026 – Present",
    status: RoleStatus.Current,
    summary: "Working on web and mobile projects for clients worldwide.",
    highlight: "Delivered end-to-end web and e-commerce projects for clients across multiple industries.",
    tech: ["Websites", "React Applications", "Next.js", "Shopify Stores", "UI/UX Design"],
  },
];
