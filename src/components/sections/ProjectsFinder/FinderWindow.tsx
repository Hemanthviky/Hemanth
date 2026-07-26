"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { FINDER_OPEN_DURATION, FINDER_CLOSE_DURATION } from "@/constants/finder";
import { FINDER_PROJECTS } from "@/data/finderProjects";
import type { IFinderProject, FinderViewMode } from "@/types/finder";
import { FinderChrome } from "./FinderChrome";
import { FinderFolderGrid } from "./FinderFolderGrid";
import { FinderFolderList } from "./FinderFolderList";
import { FinderFolderGallery } from "./FinderFolderGallery";
import { FinderDetail } from "./FinderDetail";

const SHADOW_START = "0 6px 16px rgba(11,11,15,0.08)";
const SHADOW_END = "0 28px 64px rgba(11,11,15,0.18)";

const VIEW_COMPONENTS = {
  grid: FinderFolderGrid,
  list: FinderFolderList,
  gallery: FinderFolderGallery,
};

/** The Finder window: grid/list/gallery view by default; opening a folder
 * morphs it into a full detail window (manual FLIP — animate from the folder
 * tile's rect to the window body's rect) and the back chevron / Escape /
 * outside click reverse the exact same morph. */
export function FinderWindow() {
  const [openProject, setOpenProject] = useState<IFinderProject | null>(null);
  const [viewMode, setViewMode] = useState<FinderViewMode>("grid");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isClosing = useRef(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const folderEls = useRef(new Map<string, HTMLButtonElement>());
  const reduced = useReducedMotion();

  const registerFolder = (id: string) => (el: HTMLButtonElement | null) => {
    if (el) folderEls.current.set(id, el);
    else folderEls.current.delete(id);
  };

  const visibleProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FINDER_PROJECTS;
    return FINDER_PROJECTS.filter(
      (p) => p.folderTitle.toLowerCase().includes(q) || p.folderSubtitle.toLowerCase().includes(q)
    );
  }, [query]);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, []);

  const openFolder = (project: IFinderProject) => {
    closeSearch();
    setOpenProject(project);
  };

  /** FLIP transform of the detail overlay relative to the folder tile. */
  const folderToBodyVars = useCallback((projectId: string) => {
    const folder = folderEls.current.get(projectId);
    const body = bodyRef.current;
    if (!folder || !body) return null;
    const f = folder.getBoundingClientRect();
    const b = body.getBoundingClientRect();
    return {
      x: f.left - b.left,
      y: f.top - b.top,
      scaleX: f.width / b.width,
      scaleY: f.height / b.height,
    };
  }, []);

  // Open morph — runs right after the detail overlay mounts.
  useIsomorphicLayoutEffect(() => {
    if (!openProject || !detailRef.current || isClosing.current) return;
    const detail = detailRef.current;

    if (reduced) {
      gsap.fromTo(detail, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      return;
    }

    const from = folderToBodyVars(openProject.id);
    if (!from) return;

    const ctx = gsap.context(() => {
      gsap.set(detail, { transformOrigin: "top left" });
      gsap.fromTo(
        detail,
        { ...from, opacity: 0.55, borderRadius: 20, boxShadow: SHADOW_START },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          borderRadius: 0,
          boxShadow: SHADOW_END,
          duration: FINDER_OPEN_DURATION,
          ease: "power3.inOut",
        }
      );
      // Content catches up to the window, macOS-style.
      gsap.fromTo(
        detail.children,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, delay: FINDER_OPEN_DURATION * 0.55, ease: "power1.out" }
      );
    });

    return () => ctx.revert();
  }, [openProject, reduced, folderToBodyVars]);

  const handleClose = useCallback(() => {
    if (!openProject || isClosing.current) return;
    const detail = detailRef.current;
    if (!detail) return;
    isClosing.current = true;

    const finish = () => {
      isClosing.current = false;
      setOpenProject(null);
    };

    if (reduced) {
      gsap.to(detail, { opacity: 0, duration: 0.2, onComplete: finish });
      return;
    }

    const to = folderToBodyVars(openProject.id);
    if (!to) {
      finish();
      return;
    }

    gsap.to(detail.children, { opacity: 0, duration: 0.12, ease: "power1.in" });
    gsap.to(detail, {
      ...to,
      opacity: 0.4,
      borderRadius: 20,
      boxShadow: SHADOW_START,
      duration: FINDER_CLOSE_DURATION,
      ease: "power3.inOut",
      onComplete: finish,
    });
  }, [openProject, reduced, folderToBodyVars]);

  // Escape and outside-click both reverse the morph.
  useEffect(() => {
    if (!openProject) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    const onMouseDown = (e: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [openProject, handleClose]);

  const ActiveView = VIEW_COMPONENTS[viewMode];

  return (
    <div
      ref={windowRef}
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-black/10 bg-[#FCFBF9]"
      style={{ boxShadow: "0 18px 50px rgba(11,11,15,0.12), 0 2px 8px rgba(11,11,15,0.06)" }}
    >
      <FinderChrome
        title={openProject ? openProject.title : "Projects"}
        onBack={openProject ? handleClose : undefined}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchOpen={searchOpen}
        query={query}
        onQueryChange={setQuery}
        onSearchToggle={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
        searchDisabled={!!openProject}
      />

      <div ref={bodyRef} className="relative h-[26rem] md:h-[28rem]">
        <ActiveView projects={visibleProjects} onOpen={openFolder} registerFolder={registerFolder} />

        {visibleProjects.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-[0.85rem] text-black/35">
            No projects match &ldquo;{query}&rdquo;
          </div>
        )}

        {openProject && (
          <div ref={detailRef} className="absolute inset-0 z-10 overflow-hidden bg-[#FCFBF9]">
            <FinderDetail project={openProject} />
          </div>
        )}
      </div>
    </div>
  );
}
