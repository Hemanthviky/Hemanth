"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  return (
    <motion.nav
      className="flex items-center justify-between px-6 md:px-10 py-5 relative z-30 bg-white"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: EXPO_OUT }}
    >
      <Link href="/" className="flex items-center select-none">
        <span className="font-black text-[1.5rem] leading-none tracking-tight text-black">Portfolio</span>
        <span className="text-amber-400 font-black text-[1.9rem] leading-none">.</span>
      </Link>

      <ul className="hidden md:flex items-center gap-10 text-[0.82rem] font-medium text-black/55">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-black transition-colors duration-200">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <a
        href="mailto:[EMAIL_ADDRESS]"
        className="hidden md:flex items-center px-5 py-2.5 rounded-full bg-white text-black border border-black/15 text-[0.8rem] font-medium hover:bg-black/[0.03] transition-colors duration-200 bg-yellow-400"
      >
        [EMAIL_ADDRESS]
      </a>
    </motion.nav>
  );
}
