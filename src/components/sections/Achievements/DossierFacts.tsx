import type { IAchievementFact } from "@/types/achievement";

interface DossierFactsProps {
  facts: IAchievementFact[];
}

/** The spec table — issuer, date, credential id. This is what turns a claim
 * into something a reader can go and check, so it is set plainly and in full. */
export function DossierFacts({ facts }: DossierFactsProps) {
  return (
    <dl className="grid gap-px overflow-hidden border border-border/70 bg-border/70 sm:grid-cols-2">
      {facts.map((fact) => (
        <div key={fact.label} className="bg-background/60 px-4 py-3.5">
          <dt className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">{fact.label}</dt>
          <dd className="mt-1.5 text-[0.82rem] font-medium text-secondary">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
