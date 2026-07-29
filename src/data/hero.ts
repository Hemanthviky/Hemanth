export const HERO_EYEBROW = "// PORTFOLIO — LAP 2026";

export const HERO_HEADLINE = { solid: "Web Developer", outline: "& Designer" } as const;

export const HERO_TAGLINE =
  "I build high-performance websites, SaaS platforms, and mobile apps with a focus on design, speed, and user experience.";

/** The single permitted emoji on the site — kept as an existing brand convention. */
export const HERO_LOCATION = "📍 TAMIL NADU, IND";

export const HERO_CTAS = {
  primary: { label: "View Projects", href: "#work" },
  secondary: { label: "Let's Talk", href: "#contact" },
} as const;

export const HERO_TELEMETRY = {
  speed: { label: "SPEED", min: 280, max: 320, tickMs: 90 },
  sector: { label: "SECTOR", values: ["01", "02", "03"], cycleMs: 2600 },
  status: { label: "STATUS", value: "LIVE" },
} as const;
