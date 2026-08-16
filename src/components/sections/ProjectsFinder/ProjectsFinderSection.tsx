"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectsFinderHeader } from "./ProjectsFinderHeader";
import { FinderWindow } from "./FinderWindow";
import { FinderCursor } from "./FinderCursor";
import { FinderMobileAccordion } from "./FinderMobileAccordion";

/** The window simulation + custom cursor only make sense with a real pointer
 * and room for the window; everything else gets the accordion fallback. */
const DESKTOP_QUERY = "(min-width: 1024px) and (pointer: fine)";

export function ProjectsFinderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // SSR renders the accordion; desktop upgrades after mount (avoids hydration mismatch).
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`relative w-full scroll-mt-[var(--nav-height)] bg-white px-5 py-20 md:px-8 md:py-28 ${isDesktop ? "finder-cursor-scope" : ""}`}
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start lg:gap-16">
          <div className="lg:col-span-1">
            <ProjectsFinderHeader />
          </div>
          <div className="lg:col-span-2">{isDesktop ? <FinderWindow /> : <FinderMobileAccordion />}</div>
        </div>
      </div>

      {isDesktop && <FinderCursor scopeRef={sectionRef} />}
    </section>
  );
}
