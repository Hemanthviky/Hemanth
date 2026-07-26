"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/constants/motion";
import type { IProject } from "@/types/project";
import { ProjectCoverArt } from "./ProjectCoverArt";

interface ProjectCardProps {
  project: IProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="group mb-6 break-inside-avoid"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE_OUT_EXPO }}
    >
      <ProjectCoverArt
        projectId={project.id}
        number={project.number}
        category={project.category}
        title={project.title}
        subtitle={project.subtitle}
      />

      <div className="px-1 pt-4">
        <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-black/40">
          <span>{project.role}</span>
          <span className="h-1 w-1 rounded-full bg-black/20" />
          <span>{project.platform}</span>
        </div>

        <p className="mt-2 text-[0.9rem] leading-relaxed text-black/60">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/10 px-2.5 py-1 text-[0.72rem] font-medium text-black/70"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
