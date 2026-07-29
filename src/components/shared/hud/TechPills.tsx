import { cn } from "@/utils/cn";

interface TechPillsProps {
  items: string[];
  className?: string;
}

/** The one pill treatment shared by the Garage and the Timing Sheet, so both
 * sections read as the same document. */
export function TechPills({ items, className }: TechPillsProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="bg-surface font-mono text-label rounded-full px-3 py-1.5 font-medium text-white"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
