import { cn } from "@/utils/cn";

const CORNERS = [
  "top-0 left-0 border-l border-t",
  "top-0 right-0 border-r border-t",
  "bottom-0 left-0 border-l border-b",
  "bottom-0 right-0 border-r border-b",
] as const;

interface CornerBracketsProps {
  /** When true the brackets fade in on the parent's hover/focus instead of
   * sitting permanently around the frame. */
  revealOnHover?: boolean;
  className?: string;
}

/** Signature device (b): HUD viewfinder brackets. Placed inside a `group`
 * parent — the brackets pick up that parent's hover and turn racing-red. */
export function CornerBrackets({ revealOnHover = false, className }: CornerBracketsProps) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {CORNERS.map((corner) => (
        <span
          key={corner}
          className={cn(
            "border-white group-hover:border-racing-red group-focus-visible:border-racing-red absolute size-4 transition-[opacity,border-color] duration-quick",
            corner,
            revealOnHover && "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          )}
        />
      ))}
    </span>
  );
}
