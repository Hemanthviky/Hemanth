/** Single source of truth for the public contact address, shared by the
 * navbar (desktop link + mobile menu) and any future contact CTA.
 *
 * TODO: still the placeholder that shipped in the original navbar markup —
 * replace with the real address to make the mailto links work. */
export const CONTACT_EMAIL = "[EMAIL_ADDRESS]";

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;
