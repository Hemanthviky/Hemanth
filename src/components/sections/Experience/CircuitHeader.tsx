import {
  CIRCUIT_EYEBROW,
  CIRCUIT_INDEX,
  CIRCUIT_SUBTITLE,
  CIRCUIT_TITLE,
} from "@/data/experience";

/** Section masthead. Owns no spacing of its own so the driven lap and the
 * static fallback can each place it in their own rhythm. */
export function CircuitHeader() {
  return (
    <header>
      <p className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted md:text-[0.68rem]">
        <span className="text-accent">{CIRCUIT_INDEX}</span>
        <span className="h-px w-6 bg-border" />
        <span>{CIRCUIT_EYEBROW}</span>
      </p>

      <h2 className="mt-4 font-black uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(1.9rem,5.5vw,3.5rem)]">
        {CIRCUIT_TITLE}
      </h2>

      <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted md:text-[0.68rem]">
        {CIRCUIT_SUBTITLE}
      </p>
    </header>
  );
}
