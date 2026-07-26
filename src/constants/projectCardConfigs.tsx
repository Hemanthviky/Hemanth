import type { CSSProperties, ReactNode } from "react";

export interface CardLine {
  text: string;
  color?: string;
}

export interface BottomTag {
  label: string;
  bg: string;
  color: string;
  emoji?: string;
}

export interface ProjectCardConfig {
  label: string;          // floating pill label
  bg: string;             // card background
  headerBg?: string;
  textColor: string;
  accentBg: string;
  accentText: string;
  icon?: string;
  appName: string;
  ctaText: string;
  lines: CardLine[];
  subtext?: string;
  bottomTags?: BottomTag[];
  imageStyle?: CSSProperties;
  imageContent?: ReactNode;
}

export const PROJECT_CARD_CONFIGS: Record<string, ProjectCardConfig> = {
  /* ── 01 PrepKind ──────────────────────────────────────────────── */
  prepkind: {
    label: "Featured",
    bg: "#0d1f1a",
    headerBg: "#0d1f1a",
    textColor: "#ffffff",
    accentBg: "#00e676",
    accentText: "#0d1f1a",
    icon: "🎯",
    appName: "Prepkin",
    ctaText: "Get Started",
    lines: [
      { text: "Practice." },
      { text: "Improve." },
      { text: "Succeed.", color: "#00e676" },
    ],
    subtext: "AI-powered mock interviews to boost your confidence and visa success rate.",
    bottomTags: [
      { label: "Start Practicing →", bg: "#00e676", color: "#0d1f1a" },
    ],
  },

  /* ── 02 Salesforce AI Agent ───────────────────────────────────── */
  "salesforce-ai-agent": {
    label: "AI Automation",
    bg: "#e8f4fd",
    headerBg: "#f0f8ff",
    textColor: "#0f2942",
    accentBg: "#0176d3",
    accentText: "#ffffff",
    icon: "☁️",
    appName: "salesforce",
    ctaText: "Connect",
    lines: [
      { text: "AI Agent for" },
      { text: "Salesforce", color: "#0176d3" },
    ],
    subtext: "Intelligent automation that helps teams work smarter.",
    bottomTags: [
      { label: "CRM", bg: "#dbeafe", color: "#1e40af" },
      { label: "Einstein AI", bg: "#e0f2fe", color: "#0369a1" },
    ],
  },

  /* ── 03 Web Automation Platform ───────────────────────────────── */
  "web-automation-platform": {
    label: "Automation",
    bg: "#0f1117",
    headerBg: "#161b22",
    textColor: "#e6edf3",
    accentBg: "#238636",
    accentText: "#ffffff",
    icon: "⚡",
    appName: "AutoBot",
    ctaText: "Deploy",
    lines: [
      { text: "Web Scraping" },
      { text: "& Automation", color: "#3fb950" },
    ],
    subtext: "Automating data extraction using Selenium and AWS Lambda for scalable workflows.",
    bottomTags: [
      { label: "🐍 Python", bg: "#1f2937", color: "#60a5fa" },
      { label: "Selenium", bg: "#1f2937", color: "#34d399" },
      { label: "aws", bg: "#1f2937", color: "#fb923c" },
    ],
  },

  /* ── 04 Women's Fashion E-Commerce ───────────────────────────── */
  "womens-fashion-ecommerce": {
    label: "E-Commerce",
    bg: "#ffffff",
    headerBg: "#f9fafb",
    textColor: "#111827",
    accentBg: "#111827",
    accentText: "#ffffff",
    icon: "🛍",
    appName: "FashionStore",
    ctaText: "Shop Now",
    lines: [
      { text: "Women's Clothing" },
      { text: "Store – Shopify" },
    ],
    subtext: "A modern e-commerce store with elegant design and seamless shopping experience.",
    bottomTags: [
      { label: "🟢 Shopify", bg: "#f0fdf4", color: "#15803d" },
      { label: "SEO", bg: "#faf5ff", color: "#7c3aed" },
    ],
    imageStyle: {
      height: 80,
      background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
    },
    imageContent: (
      <div className="flex h-full items-center justify-center">
        <span className="text-3xl">👗</span>
      </div>
    ),
  },

  /* ── 05 Velantra Smart ID ─────────────────────────────────────── */
  "velentra-smart-id": {
    label: "Mobile App",
    bg: "#fbbf24",
    headerBg: "#f59e0b",
    textColor: "#1c1917",
    accentBg: "#1c1917",
    accentText: "#fbbf24",
    icon: "🪪",
    appName: "Velantra",
    ctaText: "View ID",
    lines: [
      { text: "Velantra" },
      { text: "Smart ID" },
    ],
    subtext: "Digital identity platform for enterprises with smart verification and access control.",
    bottomTags: [
      { label: "Flutter", bg: "rgba(28,25,23,0.12)", color: "#1c1917" },
      { label: "AI", bg: "rgba(28,25,23,0.12)", color: "#1c1917" },
    ],
    imageStyle: {
      height: 72,
      background: "rgba(0,0,0,0.1)",
      borderRadius: 12,
    },
    imageContent: (
      <div className="flex h-full items-center justify-center gap-2">
        <span className="text-2xl">📱</span>
        <span className="text-[0.72rem] font-bold text-stone-800/70">Face ID ✓</span>
      </div>
    ),
  },
};
