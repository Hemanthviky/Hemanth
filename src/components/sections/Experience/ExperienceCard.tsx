import { TechStackRow } from "@/components/shared/TechStackRow";
import type { IExperienceEntry } from "@/types/experience";

const TONES = ["bg-white", "bg-[#F7F7F4]", "bg-[#F3F1EA]"];

interface ExperienceCardProps {
  entry: IExperienceEntry;
  orderIndex: number;
  registerCard: (index: number) => (el: HTMLDivElement | null) => void;
}

/** One stacked card. Layout is asymmetric (not centered), each entry gets a
 * distinct background tone, and the "what I did" list renders as a tick list
 * or — for the freelance entry's service types — a pill cluster instead. */
export function ExperienceCard({ entry, orderIndex, registerCard }: ExperienceCardProps) {
  const tone = TONES[orderIndex % TONES.length];

  return (
    <div
      ref={registerCard(orderIndex)}
      data-exp-card
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-black/10 ${tone}`}
      style={{ boxShadow: "0 24px 60px rgba(11,11,15,0.1), 0 4px 16px rgba(11,11,15,0.05)" }}
    >
      {/* Oversized outline index — same layout-anchor device as the hero/projects sections */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[8vw] right-[1vw] select-none font-black leading-none text-transparent md:-bottom-[6vw]"
        style={{ fontSize: "clamp(6rem, 20vw, 16rem)", WebkitTextStroke: "1.5px rgba(11,11,15,0.12)" }}
      >
        {entry.index}
      </span>

      <div className="relative z-10 flex h-full flex-col gap-6 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12">
        {/* Top row: role/company left, date pill right */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3
              data-exp-title
              className="font-black leading-[0.95] tracking-[-0.02em] text-black"
              style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}
            >
              {entry.role}
            </h3>
            <p className="mt-2 text-[0.9rem] font-semibold text-black/45">{entry.company}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.75rem] font-semibold ${
                entry.isPresent ? "border-black/10 bg-white text-black/70" : "border-black/10 bg-black/[0.03] text-black/40"
              }`}
            >
              {entry.isPresent && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                </span>
              )}
              <span>{entry.dateRange}</span>
            </div>

            {entry.isCompleted && (
              <span className="rounded-full bg-black/5 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-black/35">
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="max-w-xl text-[0.92rem] leading-relaxed text-black/60 md:text-[1rem]">{entry.summary}</p>

        {/* What I Do / Did / Build */}
        <div>
          <span className="mb-3 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-black/40">
            {entry.itemsLabel}
          </span>

          {entry.itemsAsPills ? (
            <div className="flex flex-wrap gap-2">
              {entry.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[0.78rem] font-medium text-black/70"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {entry.items.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-[0.6em] h-px w-3 shrink-0 bg-black/30" />
                  <span className="text-[0.85rem] leading-snug text-black/65">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech stack — pinned to the bottom of the card */}
        <div className="mt-auto pt-2">
          <TechStackRow items={entry.tech} />
        </div>
      </div>
    </div>
  );
}
