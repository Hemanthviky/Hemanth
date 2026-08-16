export type FinderPaneId = "overview" | "features" | "tech" | "screenshots" | "impact";
export type FinderViewMode = "grid" | "list" | "gallery";

export interface IFinderProject {
  id: string;
  index: string;
  /** Window-title / overview heading. */
  title: string;
  /** Grid folder label, first line. */
  folderTitle: string;
  /** Grid folder label, second line. */
  folderSubtitle: string;
  /** One-line subtitle shown in the Overview pane. */
  subtitle: string;
  overview: string;
  features: string[];
  tech: string[];
  impact: string;
  status: string;
  /** Public URL(s) of the live/deployed site(s), used to render an embedded preview. Omit if there's no publicly viewable deployment. */
  liveUrls?: string[];
  /** App/Play Store listing URL. Store pages block iframe embedding, so this renders as a link-out card instead of a live preview. */
  storeUrl?: string;
}
