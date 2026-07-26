"use client";

import type { MotionValue } from "framer-motion";
import { WorksStackCard } from "./WorksStackCard";
import type { IProject } from "@/types/project";

interface WorksCardStackProps {
  projects: IProject[];
  vIndex: MotionValue<number>;
  activeIndex: number;
}

export function WorksCardStack({ projects, vIndex, activeIndex }: WorksCardStackProps) {
  return (
    /*
     * The container is positioned to start near the top-centre of the right
     * column. Cards fan diagonally down-right from there, matching the reference.
     */
    <div
      className="relative hidden h-full w-full md:block"
      style={{ perspective: "1200px" }}
    >
      {projects.map((project, index) => (
        <WorksStackCard
          key={project.id}
          project={project}
          index={index}
          vIndex={vIndex}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
}
