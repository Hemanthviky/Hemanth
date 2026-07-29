import { cn } from "@/utils/cn";

export type StatusTone = "live" | "current" | "past";

const TONE_CLASS: Record<StatusTone, string> = {
  /* Broadcast "on air" convention — red, pulsing. */
  live: "bg-racing-red animate-status-pulse",
  current: "bg-signal-yellow animate-status-pulse",
  past: "bg-muted",
};

interface StatusDotProps {
  tone: StatusTone;
  className?: string;
}

/** Signature device (e): 6px state indicator, pulsing while something is
 * current or live, flat gray once it is history. */
export function StatusDot({ tone, className }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-1.5 shrink-0 rounded-full", TONE_CLASS[tone], className)}
    />
  );
}
