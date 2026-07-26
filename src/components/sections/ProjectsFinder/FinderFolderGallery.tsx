"use client";

import type { IFinderProject } from "@/types/finder";
import { FINDER_NO_CURSOR_STYLE } from "@/constants/finder";
import { FolderIcon } from "./FolderIcon";

interface FinderFolderGalleryProps {
  projects: IFinderProject[];
  onOpen: (project: IFinderProject) => void;
  registerFolder: (id: string) => (el: HTMLButtonElement | null) => void;
}

/** Finder Gallery View — larger single-column cards with bigger folder icons. */
export function FinderFolderGallery({ projects, onOpen, registerFolder }: FinderFolderGalleryProps) {
  return (
    <div className="flex h-full flex-col gap-1 overflow-y-auto p-4">
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
          className="group flex items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-150 hover:bg-black/[0.04] active:bg-black/[0.07]"
        >
          <FolderIcon className="h-12 w-16 shrink-0 transition-transform duration-200 ease-out group-hover:scale-105" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.95rem] font-bold text-black">{project.folderTitle}</span>
            <span className="block truncate text-[0.78rem] font-medium text-black/45">{project.folderSubtitle}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
