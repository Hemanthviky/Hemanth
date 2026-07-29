"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RESET_MS = 2000;

/** Copies text and reports a short-lived "copied" flag that drives the toast. */
export function useCopyToClipboard(text: string) {
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setHasCopied(false), RESET_MS);
    } catch {
      setHasCopied(false);
    }
  }, [text]);

  return { hasCopied, copy };
}
