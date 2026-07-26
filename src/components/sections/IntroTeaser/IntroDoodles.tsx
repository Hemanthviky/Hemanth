interface IntroDoodlesProps {
  /** Returns a ref-callback for the path at `index` so the parent can drive the
   * stroke-dasharray draw-in animation once GSAP measures each path's length. */
  registerPath: (index: number) => (el: SVGPathElement | null) => void;
}

/** Hand-drawn accent squiggles + a dashed arrow, all inline SVG paths so the
 * parent section can animate them (raster clipart can't be drawn-on-scroll). */
export function IntroDoodles({ registerPath }: IntroDoodlesProps) {
  return (
    <>
      {/* squiggle — top-left corner of the headline */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-3 -top-4 h-9 w-16 md:h-11 md:w-20"
        viewBox="0 0 80 36"
        fill="none"
      >
        <path
          ref={registerPath(0)}
          d="M2 26 Q 16 4, 30 20 T 56 16 T 78 6"
          stroke="#fbbf24"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* looping squiggle — beside the script name */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-2 top-[38%] h-12 w-12 md:h-16 md:w-16"
        viewBox="0 0 60 60"
        fill="none"
      >
        <path
          ref={registerPath(1)}
          d="M6 8 C 22 8, 6 30, 22 30 C 38 30, 22 52, 38 52"
          stroke="#fbbf24"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* small asterisk squiggle — near the CTA */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-2 bottom-2 h-8 w-8 md:h-10 md:w-10"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          ref={registerPath(2)}
          d="M20 5 L20 35 M7 12 L33 28 M33 12 L7 28"
          stroke="#fbbf24"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* dashed arrow — points from the headline toward the portrait */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-[58%] top-[6%] hidden h-24 w-32 md:block"
        viewBox="0 0 130 90"
        fill="none"
      >
        <path
          ref={registerPath(3)}
          d="M4 8 C 46 6, 92 44, 122 78"
          stroke="#0b0b0f"
          strokeOpacity="0.32"
          strokeWidth="1.6"
          strokeDasharray="4 6"
          strokeLinecap="round"
          markerEnd="url(#intro-teaser-arrowhead)"
        />
        <defs>
          <marker id="intro-teaser-arrowhead" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 Z" fill="#0b0b0f" fillOpacity="0.32" />
          </marker>
        </defs>
      </svg>
    </>
  );
}
