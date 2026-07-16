"use client";

import { useEffect, useState } from "react";
import { GREETINGS } from "@/data/greetings";
import { COMPLETE_HOLD_MS, GREETING_DURATION_MS } from "@/constants/loadingScreen";

interface UseLoadingSequenceResult {
  currentGreeting: string;
  greetingIndex: number;
  progress: number;
  isComplete: boolean;
}

export function useLoadingSequence(enabled: boolean): UseLoadingSequenceResult {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const totalDuration = GREETINGS.length * GREETING_DURATION_MS;
    const startTime = performance.now();
    let frameId: number;
    let holdTimeoutId: ReturnType<typeof setTimeout>;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      setProgress(Math.min(100, Math.round((elapsed / totalDuration) * 100)));
      setGreetingIndex(Math.min(GREETINGS.length - 1, Math.floor(elapsed / GREETING_DURATION_MS)));

      if (elapsed >= totalDuration) {
        holdTimeoutId = setTimeout(() => setIsComplete(true), COMPLETE_HOLD_MS);
        return;
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(holdTimeoutId);
    };
  }, [enabled]);

  return {
    currentGreeting: GREETINGS[greetingIndex],
    greetingIndex,
    progress,
    isComplete,
  };
}
