"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CONTACT_EMAIL, NAV_LINKS } from "@/constants/site";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const MENU_PANEL_ID = "mobile-nav-panel";
/** Close to the bar's real rendered height (measured below once mounted) —
 * just a paint-frame placeholder so the fixed bar taking itself out of flow
 * never causes a visible jump in the content beneath it. */
const NAV_HEIGHT_FALLBACK = 76;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState(NAV_HEIGHT_FALLBACK);

  const close = useCallback(() => setIsOpen(false), []);

  // Fixed positioning takes the bar out of flow, so the page needs a spacer
  // of exactly its height in its place — measured rather than assumed, since
  // that height differs across the mobile/desktop layout switch. Published as
  // a CSS variable too, so anchor targets (`#work`, `#contact`) can offset
  // their scroll landing by the same measured amount instead of a guess.
  useIsomorphicLayoutEffect(() => {
    const node = navRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      setNavHeight(height);
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Hidden while scrolling down past the top, brought back the moment the
  // reader scrolls up; pinned open whenever the mobile panel is up so the
  // header can't slide away out from under it.
  const hidden = useHideOnScroll(isOpen);

  // Any navigation (including same-page hash links) dismisses the panel.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // While the overlay is up it owns the viewport: lock the page behind it and
  // let Escape dismiss it, returning focus to the button that opened it.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-white px-5 py-4 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] md:px-10 md:py-5"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: hidden ? "-100%" : 0 }}
        transition={{
          opacity: { duration: 0.7, delay: 0.05, ease: EXPO_OUT },
          y: { duration: reduced ? 0 : 0.4, ease: EXPO_OUT },
        }}
      >
        <Link href="/" className="flex select-none items-center">
          <span className="text-[1.35rem] font-black leading-none tracking-tight text-black md:text-[1.5rem]">
            Hemanth
          </span>
          <span className="text-[1.7rem] font-black leading-none text-amber-400 md:text-[1.9rem]">.</span>
        </Link>

        <ul className="hidden items-center gap-10 text-[0.82rem] font-medium text-black/55 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="transition-colors duration-200 hover:text-black">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="hidden items-center rounded-full border border-black/15 bg-yellow-400 px-5 py-2.5 text-[0.8rem] font-medium text-black transition-colors duration-200 hover:bg-yellow-300 md:flex"
        >
          {CONTACT_EMAIL}
        </a>

        {/* ── Mobile toggle — 44px touch target ── */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={MENU_PANEL_ID}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-black transition-colors duration-200 hover:bg-black/[0.04] md:hidden"
        >
          {isOpen ? <X className="h-6 w-6" strokeWidth={2} /> : <Menu className="h-6 w-6" strokeWidth={2} />}
        </button>

        {/* The panel is anchored to the nav rather than the viewport: framer-motion
         * leaves a transform on <nav>, which would make a `fixed` child resolve
         * against it anyway. The `100%` below is the nav's own height, so the panel
         * fills exactly the viewport beneath it with no hardcoded offset. */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={MENU_PANEL_ID}
              className="absolute inset-x-0 top-full z-20 h-[calc(100dvh-100%)] overflow-y-auto bg-white px-5 pb-10 pt-2 md:hidden"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EXPO_OUT }}
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    className="border-b border-black/10"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.06 + i * 0.06, ease: EXPO_OUT }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex min-h-[3.5rem] items-center text-[1.6rem] font-black tracking-tight text-black"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={close}
                className="mt-8 flex min-h-[3rem] items-center justify-center rounded-full bg-yellow-400 px-6 text-[0.9rem] font-semibold text-black"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.26, ease: EXPO_OUT }}
              >
                {CONTACT_EMAIL}
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Reserves the fixed bar's footprint in the flow beneath it. */}
      <div style={{ height: navHeight }} aria-hidden />
    </>
  );
}
