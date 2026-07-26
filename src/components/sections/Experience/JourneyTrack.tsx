"use client";

import { useRef, type CSSProperties } from "react";
import { JOURNEY_MILESTONES } from "@/data/experience";
import {
  JOURNEY_CARD_GAP_PCT,
  JOURNEY_CARD_WIDTH_PCT,
  JOURNEY_END_GAP_PCT,
} from "@/constants/journey";
import { useJourneyDrive } from "@/hooks/useJourneyDrive";
import type { IJourneyRoad } from "@/types/experience";
import { JourneyRoadSvg } from "./JourneyRoadSvg";
import { JourneyMilestoneCard } from "./JourneyMilestoneCard";
import { JourneyEndMarker } from "./JourneyEndMarker";

const CURRENT_INDEX = JOURNEY_MILESTONES.findIndex((milestone) => milestone.isCurrent);

/** Mobile cards all sit in the free space right of the left-hugging road. */
const MOBILE_CARD_LEFT = "33%";
const MOBILE_CARD_RIGHT = "4%";

function waypointPct(road: IJourneyRoad, index: number) {
  const wp = road.waypoints[index];
  return { x: (wp.x / road.width) * 100, y: (wp.y / road.height) * 100 };
}

/** The SVG preserves its aspect ratio and fills the track, so viewBox coords
 * map linearly to container percentages — cards land beside their waypoint at
 * every screen size without measurement. */
function cardStyle(road: IJourneyRoad, index: number): CSSProperties {
  const { x, y } = waypointPct(road, index);
  const top = `${y}%`;
  if (road.variant === "mobile") return { top, left: MOBILE_CARD_LEFT, right: MOBILE_CARD_RIGHT };
  if (road.cardSides[index] === "left") {
    return { top, right: `${100 - x + JOURNEY_CARD_GAP_PCT}%`, width: `${JOURNEY_CARD_WIDTH_PCT}%` };
  }
  return { top, left: `${x + JOURNEY_CARD_GAP_PCT}%`, width: `${JOURNEY_CARD_WIDTH_PCT}%` };
}

function endStyle(road: IJourneyRoad): CSSProperties {
  const { x, y } = waypointPct(road, road.waypoints.length - 1);
  if (road.variant === "mobile") return { top: `${y}%`, left: MOBILE_CARD_LEFT };
  return { top: `${y}%`, left: `${x + JOURNEY_END_GAP_PCT}%` };
}

interface JourneyTrackProps {
  road: IJourneyRoad;
  className?: string;
}

export function JourneyTrack({ road, className }: JourneyTrackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useJourneyDrive(rootRef, road, CURRENT_INDEX);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <JourneyRoadSvg road={road} />

      {JOURNEY_MILESTONES.map((milestone, i) => (
        <JourneyMilestoneCard
          key={milestone.id}
          milestone={milestone}
          index={i}
          side={road.cardSides[i]}
          style={cardStyle(road, i)}
        />
      ))}

      <JourneyEndMarker style={endStyle(road)} />
    </div>
  );
}
