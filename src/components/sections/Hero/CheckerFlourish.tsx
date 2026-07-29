import { cn } from "@/utils/cn";

interface CheckerFlourishProps {
  className?: string;
}

/** Generic checkered strip used purely as a HUD corner flourish — a repeating
 * pattern, never paired with any event or team branding. Kept in the DOM rather
 * than the 3D scene so it survives the WebGL fallback. */
export function CheckerFlourish({ className }: CheckerFlourishProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-4 w-28 bg-[repeating-conic-gradient(var(--color-white)_0%_25%,transparent_0%_50%)] bg-[length:8px_8px] opacity-25 md:h-5 md:w-36 md:bg-[length:10px_10px]",
        className
      )}
    />
  );
}
