import { CIRCUIT_STOPS } from "@/constants/circuit";
import { CIRCUIT_FINISH_PANEL, CIRCUIT_INTRO_PANEL, JOURNEY_MILESTONES } from "@/data/experience";
import type { ICircuitPanel } from "@/types/experience";

/** Resolves what the info panel shows for the stop the car is currently parked
 * on. Anything before the first corner is the lap-start prompt; the closing
 * stop carries no milestone, so it falls through to the finish copy. */
export function getCircuitPanel(activeIndex: number): ICircuitPanel {
  const stop = CIRCUIT_STOPS[activeIndex];
  if (!stop) return CIRCUIT_INTRO_PANEL;

  const cornerMeta = `${stop.turns} · ${stop.approachSpeed} km/h apex`;
  const milestone = JOURNEY_MILESTONES.find((entry) => entry.id === stop.milestoneId);

  if (!milestone) {
    return { ...CIRCUIT_FINISH_PANEL, meta: cornerMeta };
  }

  return {
    id: stop.id,
    eyebrow: `Stop ${activeIndex + 1} · ${stop.corner}`,
    title: milestone.role,
    company: milestone.company,
    body: milestone.summary,
    meta: `${milestone.dateRange} · ${cornerMeta}`,
    tech: milestone.tech,
    isPresent: milestone.isPresent,
  };
}
