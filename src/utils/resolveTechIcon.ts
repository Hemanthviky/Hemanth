import { FALLBACK_TECH_ICON, TECH_ICONS, TECH_ICON_ALIASES } from "@/constants/techIcons";
import type { ITechIcon } from "@/types/tech";

/** Maps a free-form tech name from the content data onto its icon. Unknown
 * names keep their original text as the tooltip label. */
export function resolveTechIcon(name: string): ITechIcon {
  const key = name.trim().toLowerCase();
  const canonicalKey = TECH_ICON_ALIASES[key] ?? key;

  return TECH_ICONS[canonicalKey] ?? { ...FALLBACK_TECH_ICON, label: name };
}
