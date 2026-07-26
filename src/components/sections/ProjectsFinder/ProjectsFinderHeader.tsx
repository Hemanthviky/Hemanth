import { StrokeHeadline } from "@/components/shared/StrokeHeadline";

/** Section topic + description, outside the window chrome — same kicker +
 * solid/stroke headline treatment as the homepage About section. */
export function ProjectsFinderHeader() {
  return (
    <div className="mx-auto mb-10 max-w-4xl md:mb-14">
      <div className="mb-6 flex items-center gap-3 md:mb-8">
        <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
        <span className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-black/45">Projects</span>
      </div>

      <StrokeHeadline
        text="Things I've Built"
        strokeWords={["Built"]}
        className="font-black leading-[0.94] tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.4rem, 6.8vw, 5rem)" }}
      />

      <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-black/55 md:text-[1.05rem]">
        A collection of the platforms, apps, and websites I&apos;ve shipped — click into any folder below to see
        the details.
      </p>
    </div>
  );
}
