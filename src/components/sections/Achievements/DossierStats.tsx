import type { IAchievementStat } from "@/types/achievement";

interface DossierStatsProps {
  stats: IAchievementStat[];
}

/** The record's headline numbers, set at display size — the one place in the
 * dossier where a figure is allowed to outshout the title. */
export function DossierStats({ stats }: DossierStatsProps) {
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dd className="font-mono text-[1.75rem] font-black leading-none tracking-[-0.02em] text-foreground md:text-[2.25rem]">
            {stat.value}
          </dd>
          <dt className="mt-2.5 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}
