const MARQUEE_THRESHOLD = 6;

interface TechStackRowProps {
  items: string[];
  /** Hook for parent GSAP stagger-ins; applied per-pill in the static row, once
   * on the whole track in the marquee variant (individual pills can't be
   * targeted while they're animating continuously). */
  markerAttr?: string;
}

/** Short stacks render as a static pill row; long stacks become a CSS ticker
 * (`animate-marquee`, defined once in globals.css and reused across sections). */
export function TechStackRow({ items, markerAttr = "data-tech-pill" }: TechStackRowProps) {
  if (items.length < MARQUEE_THRESHOLD) {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            {...{ [markerAttr]: true }}
            className="rounded-full border border-black/10 px-3 py-1.5 text-[0.72rem] font-medium text-black/70"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  const doubled = [...items, ...items];

  return (
    <div className="w-full max-w-xs overflow-hidden sm:max-w-sm" {...{ [markerAttr]: true }}>
      <div className="flex w-max animate-marquee items-center gap-2.5 whitespace-nowrap hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="rounded-full border border-black/10 px-3 py-1.5 text-[0.72rem] font-medium text-black/70"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
