"use client";

import { useEffect, useState } from "react";
import { PillButton } from "@/components/buttons/PillButton";
import { MenuToggle } from "./MenuToggle";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { Wordmark } from "./Wordmark";

const MENU_ID = "primary-mobile-menu";
const CTA = { label: "Let's Talk", href: "/#contact" } as const;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="border-border bg-bg/85 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-[12px]">
        <div className="sector-shell h-nav md:h-nav-lg flex items-center justify-between">
          <Wordmark onNavigate={closeMenu} />

          <nav aria-label="Primary" className="flex items-center gap-10">
            <NavLinks />
            <PillButton href={CTA.href} size="sm" hoverScale="103" className="hidden md:inline-flex">
              {CTA.label}
            </PillButton>
          </nav>

          <MenuToggle
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen((open) => !open)}
            controlsId={MENU_ID}
          />
        </div>
      </header>

      <MobileMenu id={MENU_ID} isOpen={isMenuOpen} onNavigate={closeMenu} />
    </>
  );
}
