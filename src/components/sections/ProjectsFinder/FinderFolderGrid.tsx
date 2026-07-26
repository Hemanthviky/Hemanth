"use client";

import type { IFinderProject } from "@/types/finder";
import { FINDER_NO_CURSOR_STYLE } from "@/constants/finder";
import { FolderIcon } from "./FolderIcon";

interface FinderFolderGridProps {
  projects: IFinderProject[];
  onOpen: (project: IFinderProject) => void;
  registerFolder: (id: string) => (el: HTMLButtonElement | null) => void;
}

/** Finder grid view — single click opens the folder (real Finder needs a
 * double-click, but a single click reads better for a portfolio site). */
export function FinderFolderGrid({ projects, onOpen, registerFolder }: FinderFolderGridProps) {
  return (
    <div className="flex flex-1 flex-wrap content-start items-start justify-center gap-2 overflow-y-auto p-8 sm:justify-start md:p-10">
      {projects.map((project) => (
        <button
          key={project.id}
          ref={registerFolder(project.id)}
          type="button"
          data-cursor="folder"
          onClick={() => onOpen(project)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onOpen(project);
          }}
          aria-label={`Open ${project.folderTitle} project`}
          style={FINDER_NO_CURSOR_STYLE}
          className="group flex w-36 flex-col items-center gap-1 rounded-xl px-2 py-3 text-center transition-colors duration-150 hover:bg-black/[0.04] active:bg-black/[0.07] sm:w-40"
        >
          <FolderIcon className="h-14 w-[4.4rem] transition-transform duration-200 ease-out group-hover:scale-105 sm:h-16 sm:w-20" />
          <span className="mt-1 line-clamp-2 text-[0.8rem] font-semibold leading-tight text-black">
            {project.folderTitle}
          </span>
          <span className="line-clamp-1 text-[0.7rem] font-medium text-black/45">{project.folderSubtitle}</span>
        </button>
      ))}
    </div>
  );
}
