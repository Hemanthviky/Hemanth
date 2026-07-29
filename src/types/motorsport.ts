export enum ProjectStatus {
  Live = "Live",
  InDevelopment = "In Development",
  Archived = "Archived",
}

export enum RoleStatus {
  Current = "CURRENT",
  Completed = "COMPLETED",
}

export interface IGarageEntry {
  id: string;
  /** Timing-tower slot label, e.g. "CAR 01" — also the row's ghost numeral. */
  slot: string;
  numeral: string;
  name: string;
  subtitle: string;
  overview: string;
  features: string[];
  tech: string[];
  status: ProjectStatus;
}

export interface ITimingEntry {
  id: string;
  position: string;
  role: string;
  company: string;
  dateRange: string;
  status: RoleStatus;
  summary: string;
  highlight: string;
  tech: string[];
}

export interface ISpecRow {
  label: string;
  value: string;
}

export interface IPerformanceStat {
  /** Numeric portion, animated from 0 on scroll-into-view. */
  value: number;
  suffix: string;
  label: string;
}

export interface INavLink {
  label: string;
  href: string;
}

export interface ISocialLink {
  id: string;
  label: string;
  href: string;
}
