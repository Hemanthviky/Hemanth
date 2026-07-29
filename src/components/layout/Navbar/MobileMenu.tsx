"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/data/site";

const STAGGER_S = 0.05;
const ITEM_DURATION_S = 0.3;

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onNavigate: () => void;
}

/** Full-screen stack below 768px. Links fade up on a 0.05s stagger; with
 * reduced motion the whole sheet simply appears. */
export function MobileMenu({ id, isOpen, onNavigate }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="bg-bg fixed inset-x-0 top-nav bottom-0 z-40 md:hidden"
        >
          <nav aria-label="Mobile" className="flex h-full flex-col justify-center gap-8 px-6">
            {NAV_LINKS.map((link, index) => (
              <motion.div
                key={link.href}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : ITEM_DURATION_S,
                  delay: prefersReducedMotion ? 0 : index * STAGGER_S,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="font-display text-menu-link tracking-display block font-bold text-white"
                >
                  {`// ${link.label}`}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
