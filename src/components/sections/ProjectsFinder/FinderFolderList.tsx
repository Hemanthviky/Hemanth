"use client";

import { ChevronRight } from "lucide-react";
import type { IFinderProject } from "@/types/finder";
import { FINDER_NO_CURSOR_STYLE } from "@/constants/finder";
import { FolderIcon } from "./FolderIcon";

interface FinderFolderListProps {
  projects: IFinderProject[];
  onOpen: (project: IFinderProject) => void;
  registerFolder: (id: string) => (el: HTMLButtonElement | null) => void;
}

/** Finder List View — compact single-column rows, like the real toolbar toggle. */
export function FinderFolderList({ projects, onOpen, registerFolder }: FinderFolderListProps) {
  return (
    <div className="flex h-full flex-col gap-0.5 overflow-y-auto p-3">
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
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 hover:bg-black/[0.04] active:bg-black/[0.07]"
        >
          <FolderIcon className="h-7 w-9 shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.85rem] font-semibold text-black">{project.folderTitle}</span>
            <span className="block truncate text-[0.72rem] font-medium text-black/45">{project.folderSubtitle}</span>
          </span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-black/20" strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}
