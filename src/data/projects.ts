import type { IProject } from "@/types/project";

export const PROJECTS: IProject[] = [
  {
    id: "prepkind",
    number: "01",
    title: "PrepKind",
    subtitle: "AI-Powered Visa Interview Platform",
    description:
      "An AI-driven platform that helps students prepare for visa interviews through realistic voice conversations, instant feedback, and personalized performance analysis.",
    category: "AI & Machine Learning",
    platform: "Web Application",
    role: "Full Stack Developer",
    tech: ["React", "FastAPI", "Firebase", "OpenAI", "Google Cloud"],
  },
  {
    id: "salesforce-ai-agent",
    number: "02",
    title: "Salesforce AI Agent",
    subtitle: "Enterprise AI Assistant",
    description:
      "Developed an AI-powered Salesforce assistant that automates business workflows, retrieves CRM insights, and enhances customer support through intelligent conversations.",
    category: "Enterprise Software",
    platform: "CRM Integration",
    role: "AI Developer",
    tech: ["Salesforce", "OpenAI", "APIs", "Python"],
  },
  {
    id: "web-automation-platform",
    number: "03",
    title: "Web Automation Platform",
    subtitle: "Intelligent Data Scraping & Automation",
    description:
      "Built scalable web scraping pipelines using Selenium and AWS Lambda to automate data collection, processing, and scheduled business workflows.",
    category: "Automation & Data Engineering",
    platform: "Cloud / Serverless",
    role: "Automation Engineer",
    tech: ["Python", "Selenium", "AWS Lambda", "BeautifulSoup"],
  },
  {
    id: "womens-fashion-ecommerce",
    number: "04",
    title: "Women's Fashion E-commerce",
    subtitle: "Shopify Store Development",
    description:
      "Designed and developed a modern Shopify e-commerce experience for a women's clothing brand with a focus on performance, conversions, and seamless shopping.",
    category: "E-Commerce",
    platform: "Shopify",
    role: "Frontend Developer",
    tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
  },
  {
    id: "velentra-smart-id",
    number: "05",
    title: "Velentra Smart ID",
    subtitle: "Enterprise Workforce Management App",
    description:
      "Built a cross-platform employee identity and workforce management application featuring digital ID cards, attendance tracking, face verification, approvals, and offline capabilities.",
    category: "Enterprise Software",
    platform: "Cross-Platform Mobile App",
    role: "Full Stack Mobile Developer",
    tech: ["Flutter", "Frappe", "Firebase", "REST API"],
  },
];
