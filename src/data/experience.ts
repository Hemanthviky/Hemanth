import type { IExperienceEntry } from "@/types/experience";

export const EXPERIENCE_EYEBROW = "Experience";

export const EXPERIENCE_INTRO =
  "Building impactful digital products through AI, enterprise software, mobile applications, and modern web development. I've had the opportunity to work across startups, enterprise software, and freelance projects, helping businesses build scalable applications, improve user experiences, and bring digital ideas to life.";

export const EXPERIENCE_ENTRIES: IExperienceEntry[] = [
  {
    id: "indsys-technologies",
    index: "01",
    role: "Software Developer",
    company: "Indsys Technologies Pvt. Ltd.",
    dateRange: "June 2026 – Present",
    isPresent: true,
    summary:
      "Currently working as a Software Developer, developing enterprise applications and digital solutions for business clients. My work includes ERP development, mobile applications, and modern websites.",
    itemsLabel: "What I Do",
    items: [
      "Develop enterprise applications using the Frappe Framework",
      "Build cross-platform mobile applications using Flutter",
      "Develop responsive websites with React, Next.js, HTML, CSS, and JavaScript",
      "Integrate REST APIs and business workflows",
      "Collaborate with cross-functional teams to deliver production-ready solutions",
      "Focus on clean architecture, maintainability, and performance",
    ],
    tech: ["Frappe", "Flutter", "React", "Next.js", "HTML", "CSS", "JavaScript", "REST APIs"],
  },
  {
    id: "diagonal-labs",
    index: "02",
    role: "Frontend Developer",
    company: "Diagonal Labs LLC",
    dateRange: "August 2024 – December 2025",
    isPresent: false,
    isCompleted: true,
    summary:
      "Worked as a Frontend Developer on PrepKind, an AI-powered visa interview preparation platform, delivering modern user interfaces and integrating core platform functionality.",
    itemsLabel: "What I Did",
    items: [
      "Built responsive user interfaces using React.js",
      "Developed voice-to-voice mock interview experiences",
      "Integrated REST APIs for AI-powered interview workflows",
      "Implemented Firebase Authentication and Firestore",
      "Integrated Stripe for premium subscriptions",
      "Improved application performance, SEO, and monitoring with Sentry and Bugsnag",
      "Worked closely with product and development teams to deliver scalable features",
    ],
    tech: ["React.js", "JavaScript", "Firebase", "REST APIs", "Stripe", "Sentry", "Bugsnag"],
  },
  {
    id: "self-employed",
    index: "03",
    role: "Freelance Developer",
    company: "Self-Employed",
    dateRange: "January 2026 – Present",
    isPresent: true,
    summary:
      "Working with businesses and individuals to design and develop modern websites, e-commerce stores, and custom web applications tailored to their requirements.",
    itemsLabel: "What I Build",
    items: [
      "Business Websites",
      "Landing Pages",
      "React & Next.js Applications",
      "Shopify E-commerce Stores",
      "Responsive UI Development",
      "Website Maintenance & Optimisation",
    ],
    itemsAsPills: true,
    tech: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Shopify"],
  },
];
