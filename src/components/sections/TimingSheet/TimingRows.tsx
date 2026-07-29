"use client";

import { AccordionRow } from "@/components/shared/AccordionRow";
import { TIMING_ENTRIES } from "@/data/timingSheet";
import { useAccordion } from "@/hooks/useAccordion";
import { TimingRowDetail } from "./TimingRowDetail";
import { TimingRowSummary } from "./TimingRowSummary";

export function TimingRows() {
  const { openId, toggle } = useAccordion();

  return (
    <ul className="border-border border-t">
      {TIMING_ENTRIES.map((entry) => (
        <AccordionRow
          key={entry.id}
          id={entry.id}
          isOpen={openId === entry.id}
          onToggle={toggle}
          label={`${entry.role} at ${entry.company}`}
          summary={<TimingRowSummary entry={entry} />}
        >
          <TimingRowDetail entry={entry} />
        </AccordionRow>
      ))}
    </ul>
  );
}
