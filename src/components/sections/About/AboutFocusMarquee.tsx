import { ABOUT_FOCUS_AREAS } from "@/data/about";

export function AboutFocusMarquee() {
  const items = [...ABOUT_FOCUS_AREAS, ...ABOUT_FOCUS_AREAS];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-3 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 text-[1.05rem] font-medium text-black sm:text-[1.25rem]"
          >
            {item}
            <span className="text-amber-400">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
