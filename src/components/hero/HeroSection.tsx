"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

function SplitWords({
  text,
  delay = 0,
  stagger = 0.048,
}: {
  text: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={reduced ? { opacity: 0 } : { y: "108%", opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EXPO_OUT }}
          >
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { y: 22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, delay, ease: EXPO_OUT }}
    >
      {children}
    </motion.div>
  );
}

const PHOTO_SIZE = "clamp(320px, 42vw, 680px)";
const PHOTO_TOP = "clamp(-1.5rem, -2.5vw, -3rem)";

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="w-full h-dvh bg-white flex flex-col overflow-hidden">

      {/* ── Navbar ── */}
      <motion.nav
        className="flex items-center justify-between px-6 md:px-10 py-5 relative z-30"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: EXPO_OUT }}
      >
        <Link href="/" className="flex items-center select-none">
          <span className="font-black text-[1.5rem] leading-none tracking-tight text-black">Hemanth</span>
          <span className="text-amber-400 font-black text-[1.9rem] leading-none">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-10 text-[0.82rem] font-medium text-black/55">
          {["Work", "About", "Contact"].map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="hover:text-black transition-colors duration-200">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:hemanth@example.com"
          className="hidden md:flex items-center px-5 py-2.5 rounded-full bg-black text-white text-[0.8rem] font-medium hover:bg-zinc-800 transition-colors duration-200"
        >
          hemanth@example.com
        </a>
      </motion.nav>

      {/* ── Hero body ── */}
      <div className="flex-1 flex flex-col justify-between px-5 md:px-8 pb-8 pt-0 min-h-0">

        {/* Greeting */}
        <FadeUp delay={0.18} className="text-center text-[0.88rem] md:text-[0.95rem] font-medium text-black/55 mb-3">
          <span>👋</span>
          <span className="ml-2">, hi — I&apos;m Hemanth and I am</span>
        </FadeUp>

        {/* ── Layered title + photo ──────────────────────────────────────────
         *
         *  How Bazil's effect works:
         *
         *  [z=1]  Line 1  — solid black fill  → behind photo, photo covers it
         *  [z=2]  Photo   — tall portrait      → middle layer, overlaps both lines
         *  [z=3]  Line 2  — stroke only (transparent fill) → in FRONT of photo
         *                   so the stroke outline is visible but photo shows
         *                   through the letterforms (no fill = see-through)
         *
         *  The parent is `position: relative` with `isolation: isolate`.
         *  Photo is `position: absolute`, centered, tall enough to span both lines.
         ─────────────────────────────────────────────────────────────────────── */}
        <div
          className="relative w-full"
          style={{ isolation: "isolate", minHeight: `calc(${PHOTO_SIZE} + ${PHOTO_TOP})` }}
        >
          {/* LINE 1 — solid, sits behind photo */}
          <div className="relative w-full" style={{ zIndex: 1 }}>
            <h1
              className="font-black text-black leading-[0.88] tracking-[-0.03em] select-none w-full text-center"
              style={{ fontSize: "clamp(3.8rem, 12.5vw, 15rem)" }}
            >
              <SplitWords text="Web Developer" delay={0.26} stagger={0.048} />
            </h1>
          </div>

          {/* LINE 2 — stroke/outline only, sits in FRONT of photo */}
          {/*
           * marginTop pushes it to be tight below line 1 (matching how
           * the two lines sit flush against each other on Bazil).
           * The photo's absolute position spans across both.
           */}
          <div
            className="relative w-full"
            style={{ zIndex: 3, marginTop: "0.05em" }}
          >
            <h2
              className="font-black leading-[0.88] tracking-[-0.03em] select-none w-full text-center"
              style={{
                fontSize: "clamp(3.5rem, 11.5vw, 13.5rem)",
                /* transparent fill + stroke = photo visible through letters */
                color: "transparent",
                WebkitTextStroke: "2px black",
              }}
            >
              <SplitWords text="& Designer" delay={0.4} stagger={0.052} />
            </h2>
          </div>

          {/* PHOTO — absolute, centered, sized to the cutout's real aspect ratio so nothing crops */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              zIndex: 2,
              width: PHOTO_SIZE,
              aspectRatio: "1261 / 1247",
              top: PHOTO_TOP,
            }}
            initial={reduced ? { opacity: 0 } : { scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.38, ease: EXPO_OUT }}
          >
            <Image
              src="/Hero-Hemanth.png"
              alt="Hemanth"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 768px) 320px, 680px"
            />
          </motion.div>

        </div>

        {/* ── Bottom row ── */}
        <div className="flex flex-col gap-4 mt-6">

          {/* Tagline + logos */}
          <FadeUp delay={0.66} className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.95rem] md:text-base font-semibold text-black">
              Freelance, based in India.
            </p>
            <div className="flex items-center gap-5 md:gap-8">
              {["Audible", "Tissot", "Olympia", "Yves Cluquet"].map((name) => (
                <span key={name} className="text-[0.62rem] font-bold tracking-[0.15em] text-black/30 uppercase">
                  {name}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* CTA buttons */}
          <FadeUp delay={0.8} className="flex flex-wrap justify-center gap-3">
            <a
              href="#work"
              className="px-6 py-3 rounded-full bg-black text-white text-[0.8rem] font-semibold hover:bg-zinc-800 active:scale-95 transition-all duration-200"
            >
              You need a developer
            </a>
            <a
              href="#design"
              className="px-6 py-3 rounded-full border-2 border-black text-black text-[0.8rem] font-semibold hover:bg-black hover:text-white active:scale-95 transition-all duration-200"
            >
              You need a designer
            </a>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
