import { ProjectStatus, type IGarageEntry } from "@/types/motorsport";

export const GARAGE_SECTOR = { number: "02", name: "GARAGE" } as const;

export const GARAGE_HEADING = { solid: "The", outline: "Garage" } as const;

export const GARAGE_SUBTEXT =
  "A collection of the platforms, apps, and websites I've shipped — click into any project below to see the details.";

export const GARAGE_ENTRIES: IGarageEntry[] = [
  {
    id: "prepkind",
    slot: "CAR 01",
    numeral: "01",
    name: "PrepKind",
    subtitle: "AI Visa Interview Platform",
    overview:
      "PrepKind is an AI-driven platform that helps users prepare for visa interviews through realistic mock interview sessions. The platform provides voice-based interactions, AI-generated questions, and detailed feedback to improve users' confidence before their interviews.",
    features: [
      "Developed responsive frontend using React.js",
      "Built interactive voice interview interfaces",
      "Integrated REST APIs for AI-driven interview flow",
      "Implemented Firebase Authentication & Firestore",
      "Integrated Stripe payment gateway",
      "Improved SEO, performance, and error monitoring with Sentry & Bugsnag",
    ],
    tech: ["React", "JavaScript", "Firebase", "REST APIs", "Stripe", "Sentry", "Bugsnag"],
    status: ProjectStatus.Live,
  },
  {
    id: "smart-id",
    slot: "CAR 02",
    numeral: "02",
    name: "Smart ID Mobile Application",
    subtitle: "Digital Identity & Workforce Management App",
    overview:
      "Developed a mobile application focused on digital identity and workforce management. The application enables secure employee identification, streamlined workplace operations, and an intuitive mobile experience for day-to-day organisational activities.",
    features: [
      "Built modern and responsive mobile interfaces",
      "Integrated secure authentication workflows",
      "Developed user-centric UI/UX",
      "Connected mobile application with backend services",
      "Optimised performance for smooth user experience",
    ],
    tech: ["Flutter", "Frappe", "REST APIs", "Firebase"],
    status: ProjectStatus.Live,
  },
  {
    id: "salesforce-ai-agent",
    slot: "CAR 03",
    numeral: "03",
    name: "Salesforce AI Agent",
    subtitle: "Intelligent AI Assistant for Salesforce",
    overview:
      "Developed an AI-powered assistant designed to enhance Salesforce workflows by providing intelligent responses, automating repetitive tasks, and improving productivity through conversational interactions.",
    features: [
      "Built AI-driven workflow experiences",
      "Integrated Salesforce ecosystem",
      "Developed conversational user interfaces",
      "Connected AI services with business workflows",
      "Focused on usability and seamless interactions",
    ],
    tech: ["Salesforce", "Agentforce", "AI", "REST APIs", "JavaScript"],
    status: ProjectStatus.Live,
  },
  {
    id: "static-websites",
    slot: "CAR 04",
    numeral: "04",
    name: "Static Website Development",
    subtitle: "Responsive Business Websites & Landing Pages",
    overview:
      "Designed and developed modern, high-performance websites and landing pages tailored to business needs. Every website focuses on clean design, responsive layouts, fast loading speeds, and an engaging user experience across all devices. From simple business websites to modern React and Next.js applications, I build websites that are visually appealing, SEO-friendly, and easy to maintain.",
    features: [
      "Developed responsive business websites",
      "Built interactive landing pages with modern UI/UX",
      "Created reusable React components",
      "Developed high-performance Next.js websites",
      "Optimised websites for speed and SEO",
      "Ensured cross-browser and cross-device compatibility",
      "Converted UI designs into pixel-perfect web pages",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Responsive Design"],
    status: ProjectStatus.Live,
  },
  {
    id: "shopify-store",
    slot: "CAR 05",
    numeral: "05",
    name: "Shopify Women's E-commerce Store",
    subtitle: "Fashion E-commerce Platform",
    overview:
      "Built a complete Shopify-based online store for a women's fashion brand, focusing on delivering a seamless shopping experience with a clean interface, product management, and responsive design.",
    features: [
      "Customised Shopify theme",
      "Designed responsive storefront",
      "Product catalogue management",
      "Collection and navigation setup",
      "Performance and user experience optimisation",
    ],
    tech: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    status: ProjectStatus.Live,
  },
];
