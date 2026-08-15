import type { ISocialLink } from "@/types/contact";

/** Single source of truth for the public contact address, shared by the
 * navbar (desktop link + mobile menu) and the contact section's CTA. */
export const CONTACT_EMAIL = "hemanthviky@gmail.com";

/** Split display from dial string: `tel:` needs the number unpunctuated and in
 * full international form, while the page shows it grouped and readable. */
export const CONTACT_PHONE = "+91 99522 83601";
export const CONTACT_PHONE_HREF = "tel:+919952283601";

/** wa.me wants the number digits-only, no `+` and no separators. */
export const CONTACT_WHATSAPP_HREF = "https://wa.me/919952283601";

export const SITE_AUTHOR = "Hemanth N";

export const SITE_LOCATION = "Coimbatore, India";

/** Named separately because the achievements page links to it as proof of the
 * Ranger rank, and the URL should live in exactly one place. */
export const TRAILHEAD_PROFILE_URL = "https://www.salesforce.com/trailblazer/p1rmfz7qg9cf9n75ip";

/** Rendered by the contact section and the footer. */
export const SOCIAL_LINKS: ISocialLink[] = [
  { label: "GitHub", href: "https://github.com/Hemanthviky" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hemanth-narayanan/" },
  { label: "Trailhead", href: TRAILHEAD_PROFILE_URL },
];

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/#contact" },
] as const;
