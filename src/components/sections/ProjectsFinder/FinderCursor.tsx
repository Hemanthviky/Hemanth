"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type CursorVariant = "arrow" | "folder" | "pointer";

interface FinderCursorProps {
  /** Section root the cursor is scoped to — listeners attach here, not globally. */
  scopeRef: RefObject<HTMLElement | null>;
}

const LERP_FACTOR = 0.35;

/** macOS-style arrow cursor drawn as our own SVG (no Apple assets). Follows the
 * mouse with a slight lerp while inside the section; folder hovers switch it to
 * a pointing-hand state. Native cursor is hidden via CSS on the section root. */
export function FinderCursor({ scopeRef }: FinderCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("arrow");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scope = scopeRef.current;
    const cursor = cursorRef.current;
    if (!scope || !cursor) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * LERP_FACTOR;
      pos.y += (target.y - pos.y) * LERP_FACTOR;
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const hover = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setVariant((hover?.dataset.cursor as CursorVariant) ?? "arrow");
    };

    const onEnter = (e: MouseEvent) => {
      // Snap to the entry point so the cursor doesn't fly in from a stale position.
      target.x = pos.x = e.clientX;
      target.y = pos.y = e.clientY;
      setVisible(true);
      // Inline style on <html> beats every stylesheet rule outright (no cascade-layer
      // or specificity ambiguity), so this is the belt to the CSS-class-based
      // suppression's suspenders — either alone should work, together it's certain.
      document.documentElement.style.setProperty("cursor", "none", "important");
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      setVisible(false);
      running = false;
      cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("cursor");
    };

    scope.addEventListener("mouseenter", onEnter);
    scope.addEventListener("mouseleave", onLeave);
    scope.addEventListener("mousemove", onMouseMove);
    return () => {
      scope.removeEventListener("mouseenter", onEnter);
      scope.removeEventListener("mouseleave", onLeave);
      scope.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("cursor");
    };
  }, [scopeRef]);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 120ms ease" }}
    >
      {variant === "folder" ? (
        /* pointing-hand state — slightly larger, mimics Finder's interactive hover */
        <svg width="26" height="26" viewBox="0 0 24 24" className="-translate-x-2 -translate-y-1">
          <path
            d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-2a1.5 1.5 0 0 1 3 0V12m0-5.5a1.5 1.5 0 0 1 3 0V12m0-3.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2c-2.2 0-3.3-1.2-4.5-3L5 14.8c-.6-.9-.3-2 .6-2.5.7-.4 1.6-.2 2.1.4L8 13"
            fill="#fff"
            stroke="#0b0b0f"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        /* classic tilted mac arrow; pointer variant just scales it down a touch */
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          style={{ transform: variant === "pointer" ? "scale(0.85)" : undefined }}
        >
          <path
            d="M5.5 3.2v17.6c0 .45.55.67.86.35l4.86-4.86a.5.5 0 0 1 .35-.14h6.87c.45 0 .67-.55.35-.86L6.35 2.85a.5.5 0 0 0-.85.35Z"
            fill="#fff"
            stroke="#0b0b0f"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
