"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { EASE_OUT_EXPO } from "@/constants/motion";
import { FINDER_PROJECTS } from "@/data/finderProjects";
import { FolderIcon } from "./FolderIcon";

/** Touch fallback: the Finder-window metaphor and custom cursor are desktop
 * interactions, so tablets/phones get a plain stacked accordion driven by the
 * same data source. */
export function FinderMobileAccordion() {
  const [openId, setOpenId] = useState<string | null>(FINDER_PROJECTS[0].id);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white">
      {FINDER_PROJECTS.map((project, i) => {
        const isOpen = openId === project.id;
        return (
          <div key={project.id} className={i > 0 ? "border-t border-black/10" : undefined}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : project.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
            >
              <FolderIcon className="h-8 w-10 shrink-0" />
              <span className="flex-1">
                <span className="block text-[0.95rem] font-bold leading-tight text-black">
                  {project.folderTitle}
                </span>
                <span className="block text-[0.75rem] font-medium text-black/45">{project.folderSubtitle}</span>
              </span>
              <motion.span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10"
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              >
                <Plus className="h-4 w-4 text-black/60" strokeWidth={2} />
              </motion.span>
            </button>

            {/* grid-rows expand trick — no height measuring, no clipping */}
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-5 px-5 pb-6">
                  <p className="text-[0.88rem] leading-relaxed text-black/65">{project.overview}</p>

                  <ul className="flex list-none flex-col gap-2.5">
                    {project.features.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-black/70">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-400/25">
                          <Check className="h-2.5 w-2.5 text-amber-600" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/10 px-3 py-1 text-[0.72rem] font-medium text-black/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
