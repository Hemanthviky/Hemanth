"use client";

import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { WorksInfoPanel } from "./WorksInfoPanel";
import { WorksCardStack } from "./WorksCardStack";
import { WorksProgressDots } from "./WorksProgressDots";
import { WorksMobileList } from "./WorksMobileList";

/* 1 full screen of scroll per project */
const PIN_HEIGHT_VH = PROJECTS.length * 100 + 50;

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, PROJECTS.length - 1]);
  const vIndex = useSpring(rawIndex, { stiffness: 90, damping: 20, mass: 0.5 });

  useMotionValueEvent(vIndex, "change", (v) => {
    const next = Math.min(PROJECTS.length - 1, Math.max(0, Math.round(v)));
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "#EEEEE8" }}
    >
      {/* ── Desktop pinned ── */}
      <div className="hidden md:block" style={{ height: `${PIN_HEIGHT_VH}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Main two-column layout */}
          <div className="flex h-full w-full">

            {/* LEFT — info panel */}
            <div className="flex h-full w-[42%] shrink-0 flex-col justify-between px-14 py-12 lg:px-20 lg:py-16">
              <WorksInfoPanel project={PROJECTS[activeIndex]} />
            </div>

            {/* RIGHT — card stack */}
            <div className="relative flex-1 overflow-visible">
              <WorksCardStack projects={PROJECTS} vIndex={vIndex} activeIndex={activeIndex} />
            </div>
          </div>

          {/* Progress — far right edge */}
          <WorksProgressDots count={PROJECTS.length} activeIndex={activeIndex} />
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <WorksMobileList projects={PROJECTS} />
      </div>
    </section>
  );
}
