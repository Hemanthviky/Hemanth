import type {
  IArtworkTile,
  IFloatingTag,
  IIconBadge,
  ILogoItem,
  IMarqueeItem,
  IPricingTier,
  IStoryCard,
} from "@/types/palletRoss";

export const HERO_INTRO = {
  phrases: ["A place to", "display your masterpiece."],
};

export const VALUE_PROP = {
  eyebrow: "E-COMMERCE",
  headline: ["Showcase, Sell,", "& acquire", "arts to our marketplace."],
  highlight: "& acquire",
  body: "Dynamic community where artists and buyers seamlessly merge. ArtFusion brings together creators and enthusiasts to share creativity.",
  primaryCta: "Join for $9.99/m",
  secondaryCta: "Read more",
  tags: [
    { handle: "@howard", top: "10%", left: "8%" },
    { handle: "@robin", top: "62%", right: "10%" },
  ] satisfies IFloatingTag[],
};

export const CREATOR_SPOTLIGHT = {
  eyebrow: "CLASS BY REATHA C. PHELAN",
  headline: "Gateway to artist people.",
  tag: { handle: "@reatha", top: "18%", right: "10%" } satisfies IFloatingTag,
  trustedTitle: "Trusted by the best.",
  logos: [
    { name: "MERCURY" },
    { name: "remote" },
    { name: "miro" },
    { name: "databricks" },
    { name: "Linear" },
    { name: "CIRCUS" },
  ] satisfies ILogoItem[],
};

export const AUDIENCE_STATEMENT = {
  phrases: [
    "Whether you're an artist looking to sell your work",
    "or buyer seeking",
    "💰",
    "unique pieces",
    "🔗",
    "connects you to a world of creativity",
    "🎨",
    "commerce.",
  ],
  tags: [
    { handle: "@alician", top: "14%", left: "6%" },
    { handle: "@andrea", top: "58%", right: "6%" },
  ] satisfies IFloatingTag[],
};

export const VISION_GRID = {
  eyebrow: "VISION",
  headline: "Our vision for any art technology.",
  body: "Every piece of art tells a story. Echoes of Expression allows artists to showcase their personal journeys through their work.",
  linkLabel: "Read more",
  icons: [
    { icon: "PenLine", rotate: -8, top: "4%", left: "6%" },
    { icon: "Droplet", rotate: 6, top: "0%", left: "34%" },
    { icon: "Palette", rotate: -4, top: "12%", left: "60%" },
    { icon: "SquareDot", rotate: 10, top: "40%", left: "2%" },
    { icon: "Layers", rotate: -10, top: "48%", left: "58%" },
    { icon: "Send", rotate: 5, top: "70%", left: "20%" },
    { icon: "Sparkles", rotate: -6, top: "68%", left: "48%" },
  ] satisfies IIconBadge[],
  tabs: ["Business", "Personal"],
  createLabel: "+ Create",
  thumbs: [
    "STAFF",
    "le FLEUR",
    "THE GREEN KNIGHT",
    "ALL GOOD THINGS",
    "90 (gimme)",
    "FLUFFY WORM",
  ],
};

export const COMMUNITY = {
  headline: "You will find yourself among us",
  body: "Dive into a dynamic community where artists and buyers seamlessly merge.",
  avatarCount: 14,
};

export const STORY_CARDS = {
  eyebrow: "YOUR STORY TELLING",
  highlight: "TELLING",
  headline: "Every piece of art tells a story",
  cards: [
    {
      id: "connect",
      kind: "video",
      title: "Connect, Create, Commerce",
      body: "Offering buyers a chance to own a piece of that narrative.",
      linkLabel: "How it works?",
      gradient: "from-[#E25A3D] to-[#C0392B]",
      tag: "@robin",
    },
    {
      id: "breathes",
      kind: "illustration",
      title: "Where Art Breathes Commerce",
      body: "Artistic spirit with commercial viability, providing a platform where creativity thrives.",
      linkLabel: "Read more",
      gradient: "from-[#1B1FFB] to-[#4C4FFF]",
    },
    {
      id: "gold",
      kind: "photo",
      title: "Spin Your Art into Gold",
      body: "Unleash your artistic potential, where innovation and creativity converge.",
      linkLabel: "Join us now",
      gradient: "from-[#F472B6] to-[#CC3BFB]",
    },
    {
      id: "identity",
      kind: "dark",
      title: "Personal Identity",
      body: "Expression feeds — CreatiVortex Plots — BrainWeaver for Arts",
      linkLabel: "Explore",
      gradient: "from-[#171717] to-[#2A2A33]",
    },
  ] satisfies IStoryCard[],
};

export const MARKETPLACE_GRID = {
  eyebrow: "GET MORE CLOSER",
  highlight: "CLOSER",
  headline: "Marketplace for Creativity",
  body: "In the realm of Artnesia, creativity knows no bounds, eternal marketplace celebrates the timeless nature of art.",
  cta: "View All",
  tiles: [
    { id: "gap", title: "Artnesia Gap", gradient: "from-amber-400 to-orange-600" },
    { id: "immortalise", title: "Immortalise Works", gradient: "from-sky-400 to-blue-700" },
    { id: "class", title: "Creativity Class", gradient: "from-fuchsia-400 to-purple-700" },
    { id: "party", title: "Celebrates Party", gradient: "from-lime-300 to-emerald-600" },
  ] satisfies IArtworkTile[],
};

export const MASONRY_DISCOVER = {
  count: 13,
  focal: { name: "Trisha Woodward", from: "from ArtRoss" },
};

export const MEMBERSHIP = {
  headline: "Membership",
  body: "Offering buyers a chance to own a piece of that narrative. This platform is where stories come alive through art.",
  tiers: [
    { name: "Monthly", price: "$9.99", note: "Regular monthly payment" },
    { name: "Quarterly", price: "$12.99", note: "Regular monthly payment", popular: true },
    { name: "Annually", price: "$19.99", note: "Plus $56 off for 1 year" },
  ] satisfies IPricingTier[],
  marquee: [
    { icon: "🅰️", label: "Inspired by people" },
    { icon: "🪁", label: "New Art Platform" },
    { icon: "🌂", label: "2025 / POSTER" },
    { icon: "🎭", label: "Inspired by people" },
    { icon: "🎨", label: "New Art Platform" },
  ] satisfies IMarqueeItem[],
};
