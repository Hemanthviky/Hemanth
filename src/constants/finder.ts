import { FileText, ListChecks, Layers, Image, TrendingUp, type LucideIcon } from "lucide-react";
import type { FinderPaneId } from "@/types/finder";

export interface IFinderNavItem {
  id: FinderPaneId;
  label: string;
  icon: LucideIcon;
}

export const FINDER_NAV: IFinderNavItem[] = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "features", label: "Key Features", icon: ListChecks },
  { id: "tech", label: "Tech Stack", icon: Layers },
  { id: "screenshots", label: "Screenshots", icon: Image },
  { id: "impact", label: "Impact", icon: TrendingUp },
];

/** Snappy macOS-like timings (seconds). */
export const FINDER_OPEN_DURATION = 0.45;
export const FINDER_CLOSE_DURATION = 0.4;
export const FINDER_PANE_FADE_DURATION = 0.18;

/** Applied inline (not via a CSS class) on every interactive element inside the
 * Finder section, so the native cursor is suppressed on the element itself
 * rather than relying on inheritance — buttons/inputs otherwise get their own
 * `cursor: pointer`/`text` from the browser that inheritance can't override. */
export const FINDER_NO_CURSOR_STYLE = { cursor: "none" } as const;
