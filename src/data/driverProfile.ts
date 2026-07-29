import { RoleStatus, type IPerformanceStat, type ISpecRow } from "@/types/motorsport";
import { TIMING_ENTRIES } from "@/data/timingSheet";

export const PROFILE_SECTOR = { number: "01", name: "DRIVER PROFILE" } as const;

export const PROFILE_HEADING = { solid: "Driver", outline: "Profile" } as const;

export const PROFILE_PORTRAIT = {
  src: "/Hero-Hemanth.png",
  alt: "Portrait of Hemanth N",
} as const;

/** The brief pins every spec row except "Currently", which it asks to track the
 * live Experience data — so it is derived rather than restated here. */
const currentRole = TIMING_ENTRIES.find((entry) => entry.status === RoleStatus.Current);

export const PROFILE_SPEC_ROWS: ISpecRow[] = [
  { label: "Name", value: "Hemanth N" },
  { label: "Based In", value: "Coimbatore, Tamil Nadu, India" },
  { label: "Education", value: "B.Tech in Artificial Intelligence & Data Science" },
  {
    label: "Currently",
    value: currentRole ? `${currentRole.role} at ${currentRole.company}` : "Freelance Developer",
  },
  {
    label: "Focus Areas",
    value: "AI Applications • Full-Stack Development • UI/UX • Web Technologies",
  },
];

export const PROFILE_BIO =
  "I'm Hemanth N, a Full-Stack Developer with a background in Artificial Intelligence and Data Science, building modern web apps that combine clean design, strong performance, and practical solutions. From responsive interfaces to AI-powered features — I enjoy turning ideas into products that feel effortless to use.";

export const PROFILE_STATS_LABEL = "PERFORMANCE STATS";

export const PROFILE_STATS: IPerformanceStat[] = [
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "", label: "Roles" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 6, suffix: "+", label: "Technologies Mastered" },
];

export const PROFILE_CTA = { label: "More about me", href: "/about" } as const;
