export type ProjectPatternKey = "nodes" | "grid" | "flow" | "wave" | "cards";

export interface IProjectVisual {
  base: string;
  glowA: string;
  glowB: string;
  pattern: ProjectPatternKey;
  height: number;
}

export const PROJECT_VISUALS: Record<string, IProjectVisual> = {
  prepkind: {
    base: "#0f0a29",
    glowA: "#7c3aed",
    glowB: "#4338ca",
    pattern: "nodes",
    height: 440,
  },
  "salesforce-ai-agent": {
    base: "#04121f",
    glowA: "#0ea5e9",
    glowB: "#0369a1",
    pattern: "grid",
    height: 320,
  },
  "web-automation-platform": {
    base: "#03120f",
    glowA: "#10b981",
    glowB: "#0f766e",
    pattern: "flow",
    height: 380,
  },
  "womens-fashion-ecommerce": {
    base: "#2a0a18",
    glowA: "#f472b6",
    glowB: "#be185d",
    pattern: "wave",
    height: 460,
  },
  "velentra-smart-id": {
    base: "#1f1204",
    glowA: "#f59e0b",
    glowB: "#c2410c",
    pattern: "cards",
    height: 340,
  },
};
