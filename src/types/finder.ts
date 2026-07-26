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
}
