"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE_OUT_EXPO } from "@/constants/motion";
import { PROJECT_VISUALS } from "@/constants/projectVisuals";
import { ProjectPattern } from "./ProjectPatterns";

const NOISE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

interface ProjectCoverArtProps {
  projectId: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  /** When true the card fills its parent container instead of using a fixed height */
  fillHeight?: boolean;
}

export function ProjectCoverArt({ projectId, number, category, title, subtitle, fillHeight = false }: ProjectCoverArtProps) {
  const reduced = useReducedMotion();
  const visual = PROJECT_VISUALS[projectId];

  const mesh = `radial-gradient(at 15% 20%, ${visual.glowA} 0px, transparent 55%), radial-gradient(at 85% 15%, ${visual.glowB} 0px, transparent 50%), radial-gradient(at 20% 92%, ${visual.glowB} 0px, transparent 45%), radial-gradient(at 90% 88%, ${visual.glowA} 0px, transparent 50%)`;

  return (
    <div
      className="group/art relative overflow-hidden rounded-[22px] transition-shadow duration-500"
      style={{
        height: fillHeight ? "100%" : visual.height,
        boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.10)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: visual.base, backgroundImage: mesh }}
        whileHover={reduced ? undefined : { scale: 1.08 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <ProjectPattern pattern={visual.pattern} />
        <div
          className="absolute inset-0 opacity-50 mix-blend-overlay"
          style={{ backgroundImage: `url("${NOISE}")` }}
        />
      </motion.div>

      <span className="pointer-events-none absolute left-5 top-5 z-10 select-none text-[3.25rem] font-black leading-none text-white/15">
        {number}
      </span>

      <span className="absolute right-5 top-5 z-10 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-black backdrop-blur">
        {category}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent px-6 pb-5 pt-14">
        <h3 className="text-[1.35rem] font-bold leading-tight text-white md:text-[1.5rem]">
          {title}
        </h3>
        <p className="mt-1 text-[0.85rem] font-medium text-white/70">{subtitle}</p>
      </div>

      <motion.span
        className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        whileHover={reduced ? undefined : { scale: 1.1 }}
      >
        <ArrowUpRight size={18} strokeWidth={2.25} />
      </motion.span>
    </div>
  );
}
