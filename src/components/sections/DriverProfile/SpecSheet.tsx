import { PROFILE_SPEC_ROWS } from "@/data/driverProfile";

/** Spec-sheet table: mono labels, white values, hairline row dividers and no
 * container around it. */
export function SpecSheet() {
  return (
    <dl className="w-full">
      {PROFILE_SPEC_ROWS.map((row) => (
        <div
          key={row.label}
          className="border-border flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <dt className="type-label-sm sm:w-32 sm:shrink-0">{row.label}</dt>
          <dd className="font-body text-body text-white">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
