import { TRAILHEAD_PROFILE_URL } from "@/constants/site";
import type { IAchievement } from "@/types/achievement";

export const ACHIEVEMENTS_EYEBROW = "Record Archive";

export const ACHIEVEMENTS_HEADLINE = "Achievements";

export const ACHIEVEMENTS_INTRO =
  "Certifications earned, ranks climbed, and products put in front of real users — each record linked to its own proof.";

/** Rail furniture. */
export const ACHIEVEMENTS_ROSTER_LABEL = "Roster";
export const ACHIEVEMENTS_DOSSIER_LABEL = "Dossier";
export const ACHIEVEMENTS_UNLOCKED_LABEL = "Unlocked";

/** Official brand artwork lives in `public/logo/`. */
const LOGO_DIR = "/logo";

export const ACHIEVEMENTS: IAchievement[] = [
  {
    id: "trailhead-ranger",
    codename: "Trailhead Ranger",
    kind: "rank",
    rarity: "legendary",
    logo: { src: `${LOGO_DIR}/tailhead.png`, alt: "Salesforce Trailhead" },
    title: "Salesforce Trailhead Ranger",
    summary: "141 badges across admin, automation and data.",
    brief: [
      "Ranger is Trailhead's hands-on rank: badges are earned by building inside real Salesforce orgs, not by watching lectures.",
      "The run covers admin, automation and data modelling, and carries the Agentblazer Innovator '25 status alongside it.",
    ],
    issuer: "Salesforce Trailhead",
    unlockedOn: "2025",
    facts: [
      { label: "Platform", value: "Salesforce Trailhead" },
      { label: "Rank", value: "Ranger" },
      { label: "Status", value: "Agentblazer Innovator '25" },
      { label: "Focus", value: "Admin · Automation · Data" },
    ],
    stats: [
      { value: "141", label: "Badges" },
      { value: "86,825", label: "Points" },
      { value: "10", label: "Trails" },
    ],
    progress: {
      target: "Double Star Ranger",
      current: 86825,
      goal: 100000,
      caption: "13,175 points and 59 badges to go",
    },
    links: [{ label: "View profile", href: TRAILHEAD_PROFILE_URL }],
  },
  {
    id: "agentforce-specialist",
    codename: "Agentforce Specialist",
    kind: "certification",
    rarity: "legendary",
    logo: { src: `${LOGO_DIR}/logo-salesforce.svg`, alt: "Salesforce" },
    title: "Salesforce Agentforce Specialist",
    summary: "Salesforce's specialist credential for Agentforce.",
    brief: [
      "Salesforce's specialist credential for Agentforce, earned by exam and active since December 2025.",
      "Credential 7204696 — verifiable against Salesforce's own public certification check, linked below.",
    ],
    issuer: "Salesforce",
    unlockedOn: "17.12.2025",
    facts: [
      { label: "Issuer", value: "Salesforce" },
      { label: "Issued", value: "17 December 2025" },
      { label: "Credential", value: "7204696" },
      { label: "Status", value: "Active" },
    ],
    links: [
      { label: "View certificate", href: "/certificates/salesforce-agentforce-specialist.pdf" },
      { label: "Verify", href: "https://sforce.co/verifycerts" },
    ],
  },
  {
    id: "prepkind",
    codename: "PrepKind",
    kind: "product",
    rarity: "epic",
    logo: { src: `${LOGO_DIR}/prepkind.svg`, alt: "PrepKind" },
    title: "Built and Launched PrepKind",
    summary: "AI visa mock interview tool, live in production.",
    brief: [
      "An AI mock interview tool for US visa applicants — prompt design, API integration and the interview flow itself.",
      "Shipped to production under Diagonal Labs LLC, with the first users onboarded and running against it.",
    ],
    issuer: "Diagonal Labs LLC",
    unlockedOn: "Live",
    facts: [
      { label: "Studio", value: "Diagonal Labs LLC" },
      { label: "Product", value: "Practice Your US Visa Interview" },
      { label: "Status", value: "Live in production" },
      { label: "Domain", value: "prepkind.com" },
    ],
    links: [{ label: "prepkind.com", href: "https://www.prepkind.com" }],
  },
  {
    id: "aws-cloud-practitioner",
    codename: "AWS Cloud Practitioner",
    kind: "course",
    rarity: "rare",
    logo: { src: `${LOGO_DIR}/AWS.png`, alt: "Amazon Web Services", reverseOnDark: true },
    title: "AWS Cloud Practitioner",
    summary: "Full CLF-C02 preparation course, 15 hours.",
    brief: [
      "The complete CLF-C02 preparation course on Udemy: core AWS services, global infrastructure, pricing and billing.",
      "A certificate of completion for the prep course — not the AWS credential itself, and listed here as exactly that.",
    ],
    issuer: "Udemy",
    unlockedOn: "01.2024",
    facts: [
      { label: "Provider", value: "Udemy" },
      { label: "Track", value: "CLF-C02 prep course" },
      { label: "Duration", value: "15 hours" },
      { label: "Completed", value: "January 2024" },
    ],
    links: [{ label: "View certificate", href: "/certificates/aws-cloud-practitioner-udemy.pdf" }],
  },
];
