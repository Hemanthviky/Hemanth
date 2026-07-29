import { cn } from "@/utils/cn";

type HeadingTag = "h1" | "h2" | "h3";

interface TwoToneHeadlineProps {
  /** Line one — solid warm-white fill. */
  solid: string;
  /** Line two — transparent fill with a signal-yellow stroke outline. */
  outline: string;
  as?: HeadingTag;
  /** Type-scale class for both lines: `type-h1` in the hero, `type-h2` elsewhere. */
  scaleClassName?: string;
  /** Data attribute stamped on each line so a parent timeline can stagger them. */
  lineAttribute?: string;
  className?: string;
}

/** Signature device (d). Both lines share one type token so the stroke line
 * always matches its solid partner in size and weight. */
export function TwoToneHeadline({
  solid,
  outline,
  as: Tag = "h2",
  scaleClassName = "type-h2",
  lineAttribute,
  className,
}: TwoToneHeadlineProps) {
  const lineProps = lineAttribute ? { [lineAttribute]: "" } : {};

  return (
    <Tag className={cn(scaleClassName, className)}>
      <span {...lineProps} className="block text-white">
        {solid}
      </span>
      <span {...lineProps} className="text-stroke-yellow block">
        {outline}
      </span>
    </Tag>
  );
}
