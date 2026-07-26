export interface IFloatingTag {
  handle: string;
  top: string;
  left?: string;
  right?: string;
}

export interface ILogoItem {
  name: string;
}

export interface IPricingTier {
  name: string;
  price: string;
  note: string;
  popular?: boolean;
}

export interface IMarqueeItem {
  icon: string;
  label: string;
}

export interface IArtworkTile {
  id: string;
  title: string;
  gradient: string;
}

export interface IStoryCard {
  id: string;
  kind: "video" | "illustration" | "photo" | "dark";
  title: string;
  body: string;
  linkLabel: string;
  gradient: string;
  tag?: string;
}

export interface IIconBadge {
  icon: string;
  rotate: number;
  top: string;
  left: string;
}
