import type { INavLink, ISocialLink } from "@/types/motorsport";

export const SITE_URL = "https://hemanth-alpha.vercel.app";

export const CONTACT_EMAIL = "hemanthviky@gmail.com";

export const WORDMARK = "HEMANTH";

export const NAV_LINKS: INavLink[] = [
  { label: "WORK", href: "/#work" },
  { label: "ABOUT", href: "/#about" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "CONTACT", href: "/#contact" },
];

/** Profile URLs are the only content on the site not supplied by the brief.
 * Entries with an empty href are skipped by the contact row rather than
 * shipping a dead link — fill in the two handles to light them up. */
export const SOCIAL_LINKS: ISocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "" },
  { id: "github", label: "GitHub", href: "" },
  { id: "email", label: "Email", href: `mailto:${CONTACT_EMAIL}` },
];

export const FOOTER_TICKER_ITEMS = [
  "REACT",
  "NEXT.JS",
  "FIREBASE",
  "FLUTTER",
  "TAILWIND CSS",
  "THREE.JS",
  "BUILT WITH PRECISION",
];

export const COPYRIGHT = "© 2026 Hemanth N. All rights reserved.";
