"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { FinderViewMode } from "@/types/finder";
import { FINDER_NO_CURSOR_STYLE } from "@/constants/finder";
import { GridViewIcon, ListViewIcon, GalleryViewIcon, FinderSearchIcon } from "./FinderToolbarIcons";

interface FinderChromeProps {
  title: string;
  /** Present only while a folder is open — wired to the functional back chevron. */
  onBack?: () => void;
  viewMode: FinderViewMode;
  onViewModeChange: (mode: FinderViewMode) => void;
  searchOpen: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onSearchToggle: () => void;
  searchDisabled?: boolean;
}

const TRAFFIC_LIGHTS = ["#FF5F57", "#FEBC2E", "#28C840"];

const VIEW_BUTTONS: { mode: FinderViewMode; Icon: typeof GridViewIcon; label: string }[] = [
  { mode: "grid", Icon: GridViewIcon, label: "Icon view" },
  { mode: "list", Icon: ListViewIcon, label: "List view" },
  { mode: "gallery", Icon: GalleryViewIcon, label: "Gallery view" },
];

/** Finder-style title bar: traffic lights, functional back chevron, working
 * grid/list/gallery view toggles, and a working search field that filters
 * the folder view (title bar swaps for a search input while it's open). */
export function FinderChrome({
  title,
  onBack,
  viewMode,
  onViewModeChange,
  searchOpen,
  query,
  onQueryChange,
  onSearchToggle,
  searchDisabled,
}: FinderChromeProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  return (
    <div className="flex items-center gap-3 border-b border-black/10 bg-[#F5F4F0] px-4 py-2.5">
      {/* traffic lights */}
      <div className="flex items-center gap-2" data-cursor="pointer" style={FINDER_NO_CURSOR_STYLE}>
        {TRAFFIC_LIGHTS.map((color) => (
          <span key={color} className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
        ))}
      </div>

      {/* back / forward */}
      <div className="ml-2 flex items-center gap-1">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          aria-label="Back to all projects"
          data-cursor="pointer"
          style={FINDER_NO_CURSOR_STYLE}
          className="flex h-6 w-6 items-center justify-center rounded text-black/60 transition-colors duration-200 enabled:hover:bg-black/5 disabled:text-black/20"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        </button>
        <span aria-hidden className="flex h-6 w-6 items-center justify-center text-black/20">
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>

      {/* window title, replaced by a live search field while searching */}
      {searchOpen ? (
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") onSearchToggle();
          }}
          placeholder="Search projects"
          data-cursor="pointer"
          style={FINDER_NO_CURSOR_STYLE}
          className="flex-1 rounded-md border border-black/10 bg-white px-3 py-1 text-[0.8rem] text-black outline-none placeholder:text-black/30"
        />
      ) : (
        <span className="flex-1 truncate text-center text-[0.8rem] font-semibold text-black/70">{title}</span>
      )}

      {/* view toggles — functional, each renders a genuinely different layout */}
      <div className="hidden items-center gap-0.5 rounded-md bg-black/[0.05] p-0.5 sm:flex">
        {VIEW_BUTTONS.map(({ mode, Icon, label }) => (
          <button
            key={mode}
            type="button"
            aria-label={label}
            aria-pressed={viewMode === mode}
            data-cursor="pointer"
            style={FINDER_NO_CURSOR_STYLE}
            onClick={() => onViewModeChange(mode)}
            className={`flex h-5 w-6 items-center justify-center rounded transition-colors duration-150 ${
              viewMode === mode ? "bg-white text-black/70 shadow-sm" : "text-black/30 hover:text-black/50"
            }`}
          >
            <Icon className="h-3 w-3" />
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label={searchOpen ? "Close search" : "Search projects"}
        data-cursor="pointer"
        style={FINDER_NO_CURSOR_STYLE}
        onClick={onSearchToggle}
        disabled={searchDisabled}
        className="flex h-5 w-5 items-center justify-center text-black/35 transition-colors duration-150 enabled:hover:text-black/60 disabled:opacity-30"
      >
        {searchOpen ? <X className="h-3.5 w-3.5" strokeWidth={2} /> : <FinderSearchIcon className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
