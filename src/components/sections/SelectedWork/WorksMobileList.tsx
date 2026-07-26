"use client";

import { ProjectCard } from "@/components/cards/ProjectCard";
import type { IProject } from "@/types/project";

interface WorksMobileListProps {
  projects: IProject[];
}

export function WorksMobileList({ projects }: WorksMobileListProps) {
  return (
    <div className="px-5 py-16">
      <span className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-black/40">
        Works
      </span>
      <h3 className="mt-3 text-[2rem] font-black leading-tight text-black">Selected Work</h3>
      <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-black/55">
        A collection of products, platforms, and intelligent systems I&apos;ve
        designed and developed—from AI-powered applications to enterprise
        software and automation solutions.
      </p>

      <div className="mt-10 flex flex-col">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
