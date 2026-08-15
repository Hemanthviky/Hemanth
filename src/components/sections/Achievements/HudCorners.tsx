const CORNERS = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-b border-l",
  "right-0 bottom-0 border-b border-r",
] as const;

/** Registration marks at the four corners of a panel. Drawn as an overlay
 * rather than a clip so nothing inside can have its focus ring cut off. */
export function HudCorners() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {CORNERS.map((corner) => (
        <span key={corner} className={`absolute h-4 w-4 border-accent/40 ${corner}`} />
      ))}
    </span>
  );
}
