import type { ICircuitPanel } from "@/types/experience";

interface CircuitInfoCardProps {
  panel: ICircuitPanel;
  className?: string;
}

/** The telemetry read-out for whichever corner the car is parked on. Mounted
 * fresh per stop (the parent keys it on `panel.id`), so the entry animation
 * replays on every arrival without any transition bookkeeping. */
export function CircuitInfoCard({ panel, className = "" }: CircuitInfoCardProps) {
  return (
    <article
      className={`w-full rounded-2xl border border-border border-l-2 border-l-accent bg-surface/85 p-5 backdrop-blur-md motion-safe:animate-panel-in md:p-6 ${className}`}
    >
      <p className="font-mono text-[0.6rem] uppercase leading-none tracking-[0.24em] text-accent">
        {panel.eyebrow}
      </p>

      <h3 className="mt-4 text-[1.3rem] font-black uppercase leading-[1.05] tracking-[-0.01em] md:text-[1.5rem]">
        {panel.title}
      </h3>

      {panel.company && (
        <p className="mt-1.5 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-secondary">
          {panel.isPresent && (
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
          )}
          {panel.company}
        </p>
      )}

      <p className="mt-3 text-[0.85rem] leading-relaxed text-secondary md:text-[0.9rem]">{panel.body}</p>

      {panel.tech && (
        <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
          {panel.tech.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-card px-2 py-1 font-mono text-[0.6rem] uppercase leading-none tracking-[0.1em] text-secondary"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {panel.meta && (
        <p className="mt-4 border-t border-border pt-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted">
          {panel.meta}
        </p>
      )}
    </article>
  );
}
