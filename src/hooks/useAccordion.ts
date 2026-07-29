"use client";

import { useCallback, useState } from "react";

/** Single-open accordion state, shared by the Garage and the Timing Sheet so
 * both sections behave identically. */
export function useAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback(
    (id: string) => setOpenId((current) => (current === id ? null : id)),
    []
  );

  return { openId, toggle };
}
