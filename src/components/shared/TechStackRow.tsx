import { TechIcon } from "@/components/icons/TechIcon";
import type { TechIconSize } from "@/types/tech";

interface TechStackRowProps {
  items: string[];
  size?: TechIconSize;
  className?: string;
}

/** The tech stack as a row of brand marks. Icons stay compact enough to wrap
 * inside every card, so no marquee is needed. */
export function TechStackRow({ items, size = "md", className = "" }: TechStackRowProps) {
  return (
    <ul aria-label="Tech stack" className={`flex list-none flex-wrap items-center gap-2 ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <TechIcon name={item} size={size} />
        </li>
      ))}
    </ul>
  );
}
