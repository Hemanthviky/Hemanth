import type { IFinderProject } from "@/types/finder";

export const FINDER_PROJECTS: IFinderProject[] = [
  {
    id: "prepkind",
    index: "01",
    title: "PrepKind",
    folderTitle: "PrepKind",
    folderSubtitle: "AI Visa Interview Platform",
    subtitle: "AI-Powered Visa Interview Preparation Platform",
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
    impact:
      "Helped users walk into visa interviews with measurably more confidence — realistic AI practice sessions turned an intimidating process into something they could rehearse until it felt routine.",
    status: "Completed",
  },
  {
    id: "smart-id",
    index: "02",
    title: "Smart ID Mobile Application",
    folderTitle: "App Development",
    folderSubtitle: "Mobile Application",
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
    impact:
      "Replaced manual identification and paperwork with a secure digital flow, streamlining everyday workforce operations for the whole organisation.",
    status: "Completed",
  },
  {
    id: "salesforce-ai-agent",
    index: "03",
    title: "Salesforce AI Agent",
    folderTitle: "Salesforce AI Agent",
    folderSubtitle: "AI Assistant for Salesforce",
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
    impact:
      "Cut the time teams spent on repetitive CRM tasks by letting them work conversationally — the assistant handles the busywork so people can focus on customers.",
    status: "Completed",
  },
  {
    id: "static-websites",
    index: "04",
    title: "Static Website Development",
    folderTitle: "Static Website Development",
    folderSubtitle: "Web Development",
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
    impact:
      "Delivered fast, SEO-friendly sites that clients can actually maintain — pages that load quickly, rank well, and look sharp on every device.",
    status: "Completed",
  },
  {
    id: "shopify-womens-ecommerce",
    index: "05",
    title: "Shopify Women's E-commerce Store",
    folderTitle: "Shopify Women's E-commerce",
    folderSubtitle: "E-commerce Store",
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
    impact:
      "Gave a fashion brand a polished storefront that converts — a clean, responsive shopping experience from landing page to checkout.",
    status: "Completed",
  },
];
