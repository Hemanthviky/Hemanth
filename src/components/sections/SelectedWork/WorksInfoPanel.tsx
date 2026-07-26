"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE_OUT_EXPO } from "@/constants/motion";
import type { IProject } from "@/types/project";

interface WorksInfoPanelProps {
  project: IProject;
}

function SplitTitle({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={reduced ? { opacity: 0 } : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: i * 0.06, ease: EASE_OUT_EXPO }}
          >
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function WorksInfoPanel({ project }: WorksInfoPanelProps) {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full flex-col justify-between">

      {/* ── Top content ── */}
      <div className="flex flex-col">

        {/* • WORKS label */}
        <div className="flex items-center gap-2">
          <span className="h-[6px] w-[6px] rounded-full bg-black/50" />
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black/50">
            Works
          </span>
        </div>

        {/* Title — animates per project */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            <h2
              className="mt-5 font-black leading-[1.0] tracking-[-0.03em] text-black"
              style={{ fontSize: "clamp(2.4rem, 4vw, 4rem)" }}
            >
              <SplitTitle text={project.title} />
            </h2>

            {/* Description */}
            <motion.p
              className="mt-5 text-[0.9rem] leading-[1.75] text-black/55"
              style={{ maxWidth: "34ch" }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: EASE_OUT_EXPO }}
            >
              {project.description}
            </motion.p>

            {/* Tech tag pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((item, i) => (
                <motion.span
                  key={item}
                  className="rounded-md border border-black/[0.14] bg-transparent px-3 py-[6px] text-[0.75rem] font-medium text-black/70"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.04, ease: EASE_OUT_EXPO }}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            {/* View Project CTA — text underline + black circle arrow */}
            <motion.a
              href={`#${project.id}`}
              className="group/cta mt-8 flex w-fit items-center gap-4"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.38, ease: EASE_OUT_EXPO }}
            >
              <span className="relative text-[0.9rem] font-semibold text-black">
                View Project
                <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-100 bg-black" />
              </span>
              {/* Black circle with arrow */}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-out group-hover/cta:scale-110">
                <ArrowRight size={16} strokeWidth={2.2} />
              </span>
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom: large project counter + scroll hint ── */}
      <div className="flex flex-col gap-6">
        {/* Large 01 / 05 counter */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`counter-${project.number}`}
            className="flex items-baseline gap-2"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            <span
              className="font-black leading-none text-black/25"
              style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
            >
              {project.number}
            </span>
            <span className="text-[1.1rem] font-semibold text-black/30">
              / {String(PROJECTS_COUNT).padStart(2, "0")}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Scroll to explore */}
        <div className="flex items-center gap-3">
          {/* Mouse icon */}
          <div className="relative flex h-8 w-5 items-start justify-center rounded-full border-[1.5px] border-black/30">
            <motion.span
              className="mt-[5px] block h-[5px] w-[2.5px] rounded-full bg-black/40"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-black/35">
            Scroll to explore
          </span>
        </div>
      </div>

    </div>
  );
}

/* small constant so no circular dep */
const PROJECTS_COUNT = 5;
