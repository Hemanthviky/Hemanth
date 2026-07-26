"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Image as ImageIcon } from "lucide-react";
import { FINDER_NAV, FINDER_NO_CURSOR_STYLE } from "@/constants/finder";
import type { FinderPaneId, IFinderProject } from "@/types/finder";

interface FinderDetailProps {
  project: IFinderProject;
}

/** Open-folder view: Finder-style sidebar next to ONE continuously scrollable
 * content column (all sections stacked, not swapped) — sidebar clicks scroll
 * to a section, and a scrollspy keeps the active item in sync as you scroll. */
export function FinderDetail({ project }: FinderDetailProps) {
  const [activePane, setActivePane] = useState<FinderPaneId>("overview");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Partial<Record<FinderPaneId, HTMLElement | null>>>({});

  const scrollToPane = (pane: FinderPaneId) => {
    const container = scrollRef.current;
    const target = sectionRefs.current[pane];
    if (!container || !target) return;
    container.scrollTo({ top: target.offsetTop - container.offsetTop, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const pane = mostVisible?.target instanceof HTMLElement ? (mostVisible.target.dataset.pane as FinderPaneId) : undefined;
        if (pane) setActivePane(pane);
      },
      { root: container, threshold: [0.35, 0.65] }
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [project.id]);

  return (
    <div className="flex h-full min-h-0">
      {/* sidebar */}
      <nav className="w-32 shrink-0 overflow-y-auto border-r border-black/10 bg-[#F5F4F0] p-2 sm:w-44 sm:p-3">
        <span className="mb-2 block px-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-black/35">
          {project.folderTitle}
        </span>
        <ul className="flex list-none flex-col gap-0.5">
          {FINDER_NAV.map((item) => {
            const isActive = activePane === item.id;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  data-cursor="pointer"
                  style={FINDER_NO_CURSOR_STYLE}
                  onClick={() => scrollToPane(item.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[0.8rem] font-medium transition-colors duration-150 ${
                    isActive ? "bg-amber-400 text-black" : "text-black/65 hover:bg-black/[0.05]"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-black" : "text-black/40"}`} strokeWidth={2} />
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* one continuous scrollable column */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto scroll-smooth p-6 md:p-8">
        <section
          ref={(el) => { sectionRefs.current.overview = el; }}
          data-pane="overview"
        >
          <h3 className="text-[1.4rem] font-black leading-tight tracking-tight text-black md:text-[1.7rem]">
            {project.title}
          </h3>
          <p className="mt-1 text-[0.85rem] font-semibold text-black/45">{project.subtitle}</p>
          <p className="mt-5 max-w-xl text-[0.92rem] leading-relaxed text-black/65">{project.overview}</p>
        </section>

        <div className="my-8 h-px bg-black/[0.08]" />

        <section ref={(el) => { sectionRefs.current.features = el; }} data-pane="features">
          <h4 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/40">
            Key Features
          </h4>
          <ul className="flex list-none flex-col gap-3">
            {project.features.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9rem] leading-snug text-black/70">
                <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-amber-400/25">
                  <Check className="h-3 w-3 text-amber-600" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="my-8 h-px bg-black/[0.08]" />

        <section ref={(el) => { sectionRefs.current.tech = el; }} data-pane="tech">
          <h4 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/40">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[0.78rem] font-medium text-black/70"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <div className="my-8 h-px bg-black/[0.08]" />

        <section ref={(el) => { sectionRefs.current.screenshots = el; }} data-pane="screenshots">
          <h4 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/40">
            Screenshots
          </h4>
          {/* TODO: add project screenshot — drop a real image in this slot (e.g.
              <Image src={`/projects/${project.id}.webp`} fill className="object-cover" />)
              inside the bordered box; the layout won't need to change. */}
          <div className="flex aspect-video w-full max-w-xl flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/15 bg-black/[0.02] text-black/30">
            <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em]">Screenshot coming soon</span>
          </div>
        </section>

        <div className="my-8 h-px bg-black/[0.08]" />

        <section ref={(el) => { sectionRefs.current.impact = el; }} data-pane="impact" className="pb-2">
          <h4 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-black/40">Impact</h4>
          <p className="max-w-xl text-[0.92rem] leading-relaxed text-black/65">{project.impact}</p>
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[0.8rem] font-semibold text-black/70">Status: {project.status}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
