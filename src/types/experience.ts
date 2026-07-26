export interface IExperienceEntry {
  id: string;
  index: string;
  role: string;
  company: string;
  dateRange: string;
  isPresent: boolean;
  isCompleted?: boolean;
  summary: string;
  itemsLabel: string;
  items: string[];
  /** Card 3's "What I Build" list reads as service types, not action-verb
   * contributions, so it renders as a pill cluster instead of a tick list. */
  itemsAsPills?: boolean;
  tech: string[];
}
