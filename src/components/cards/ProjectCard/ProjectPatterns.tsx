"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProjectPatternKey } from "@/constants/projectVisuals";

const NODES = [
  { x: 60, y: 70 }, { x: 180, y: 40 }, { x: 300, y: 90 },
  { x: 110, y: 180 }, { x: 260, y: 210 }, { x: 340, y: 160 },
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 4], [4, 5], [2, 5], [3, 4]];

function NodesPattern() {
  const reduced = useReducedMotion();
  return (
    <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 260" fill="none">
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
          stroke="white" strokeWidth="1" strokeOpacity="0.25"
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r="4" fill="white"
          animate={reduced ? undefined : { opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 26px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 26px)",
      }}
    />
  );
}

function FlowPattern() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "repeating-linear-gradient(100deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 2px, transparent 2px, transparent 34px)",
        backgroundSize: "160% 100%",
      }}
      animate={reduced ? undefined : { backgroundPositionX: ["0%", "-160%"] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    />
  );
}

function WavePattern() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-2/3 w-full opacity-35"
      viewBox="0 0 400 200" preserveAspectRatio="none" fill="none"
    >
      <path d="M0 120 C 80 60, 160 160, 240 100 S 360 40, 400 90 V200 H0 Z" fill="white" fillOpacity="0.18" />
      <path d="M0 150 C 100 100, 180 190, 280 130 S 380 90, 400 130 V200 H0 Z" fill="white" fillOpacity="0.14" />
    </svg>
  );
}

function CardsPattern() {
  return (
    <div className="absolute inset-0 opacity-70">
      <div className="absolute left-[18%] top-[30%] h-20 w-32 -rotate-12 rounded-xl border border-white/25 bg-white/5" />
      <div className="absolute left-[42%] top-[46%] h-20 w-32 rotate-3 rounded-xl border border-white/30 bg-white/[0.07]" />
      <div className="absolute left-[58%] top-[20%] h-20 w-32 rotate-12 rounded-xl border border-white/25 bg-white/5" />
    </div>
  );
}

export function ProjectPattern({ pattern }: { pattern: ProjectPatternKey }) {
  switch (pattern) {
    case "nodes":
      return <NodesPattern />;
    case "grid":
      return <GridPattern />;
    case "flow":
      return <FlowPattern />;
    case "wave":
      return <WavePattern />;
    case "cards":
      return <CardsPattern />;
  }
}
