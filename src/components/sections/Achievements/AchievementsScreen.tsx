"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ACHIEVEMENTS } from "@/data/achievements";
import { AchievementDossier } from "./AchievementDossier";
import { AchievementRail } from "./AchievementRail";
import { ArchiveTitle } from "./ArchiveTitle";
import { HudBackdrop } from "./HudBackdrop";
import { HudFootBar } from "./HudFootBar";
import { HudTopBar } from "./HudTopBar";

const PANEL_ID = "achievement-dossier";
const tabId = (id: string) => `achievement-tab-${id}`;

const PREVIOUS_KEYS = ["ArrowUp", "ArrowLeft", "w", "W"];
const NEXT_KEYS = ["ArrowDown", "ArrowRight", "s", "S"];

/** Full-viewport record archive, laid out as a game menu: roster on the left,
 * open dossier on the right, HUD bars top and bottom. The page deliberately
 * replaces the site's own navbar and footer — a screen that claims the whole
 * viewport cannot also sit inside the light page chrome — so the top bar carries
 * the site routes and the exit itself.
 *
 * Selection lives here rather than in the rail because three things read it:
 * the rail, the dossier, and the key bindings below. */
export function AchievementsScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const primaryLinkRef = useRef<HTMLAnchorElement | null>(null);

  const total = ACHIEVEMENTS.length;
  const active = ACHIEVEMENTS[activeIndex];

  const move = useCallback(
    (nextIndex: number, focusRow: boolean) => {
      const wrapped = (nextIndex + total) % total;
      setActiveIndex(wrapped);
      if (focusRow) rowRefs.current[wrapped]?.focus();
    },
    [total],
  );

  const registerRef = useCallback(
    (index: number) => (node: HTMLButtonElement | null) => {
      rowRefs.current[index] = node;
    },
    [],
  );

  // Roving-tabindex tablist keys, plus Enter opening the record's primary
  // proof — the rail's own Enter would otherwise only re-select the row the
  // cursor is already on, which the footer legend does not promise.
  const onRowKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (PREVIOUS_KEYS.includes(event.key)) {
        event.preventDefault();
        move(activeIndex - 1, true);
        return;
      }
      if (NEXT_KEYS.includes(event.key)) {
        event.preventDefault();
        move(activeIndex + 1, true);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        move(0, true);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        move(total - 1, true);
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        primaryLinkRef.current?.click();
      }
    },
    [activeIndex, move, total],
  );

  // The same bindings without a focus target: they run only while nothing on
  // the page is focused, so arrow keys still scroll for anyone who has tabbed
  // into the dossier and Escape never fires out from under a focused control.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push("/");
        return;
      }

      const idle = document.activeElement === null || document.activeElement === document.body;
      if (!idle) return;

      if (PREVIOUS_KEYS.includes(event.key)) {
        event.preventDefault();
        move(activeIndex - 1, false);
      } else if (NEXT_KEYS.includes(event.key)) {
        event.preventDefault();
        move(activeIndex + 1, false);
      } else if (event.key === "Enter") {
        event.preventDefault();
        primaryLinkRef.current?.click();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, move, router]);

  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background text-foreground lg:h-[100svh]">
      <HudBackdrop />

      <HudTopBar />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="flex shrink-0 flex-col border-b border-border/70 lg:h-full lg:min-h-0 lg:w-[21rem] lg:border-b-0 xl:w-[23rem]">
          <ArchiveTitle />
          <AchievementRail
            achievements={ACHIEVEMENTS}
            activeIndex={activeIndex}
            onSelect={(index) => move(index, false)}
            onKeyDown={onRowKeyDown}
            registerRef={registerRef}
            tabId={tabId}
            panelId={PANEL_ID}
          />
        </div>

        <AchievementDossier
          achievement={active}
          index={activeIndex}
          total={total}
          panelId={PANEL_ID}
          tabId={tabId(active.id)}
          primaryLinkRef={(node) => {
            primaryLinkRef.current = node;
          }}
        />
      </div>

      <HudFootBar total={total} />
    </div>
  );
}
