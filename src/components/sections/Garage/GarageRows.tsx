"use client";

import { AccordionRow } from "@/components/shared/AccordionRow";
import { GARAGE_ENTRIES } from "@/data/garage";
import { useAccordion } from "@/hooks/useAccordion";
import { GarageRowDetail } from "./GarageRowDetail";
import { GarageRowSummary } from "./GarageRowSummary";

export function GarageRows() {
  const { openId, toggle } = useAccordion();

  return (
    <ul className="border-border border-t">
      {GARAGE_ENTRIES.map((entry) => (
        <AccordionRow
          key={entry.id}
          id={entry.id}
          isOpen={openId === entry.id}
          onToggle={toggle}
          label={`${entry.slot} — ${entry.name}`}
          summary={<GarageRowSummary entry={entry} />}
        >
          <GarageRowDetail entry={entry} />
        </AccordionRow>
      ))}
    </ul>
  );
}
