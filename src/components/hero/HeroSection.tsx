"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";

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

const PHOTO_SIZE = "clamp(210px, 42vw, 680px)";
const PHOTO_TOP = "clamp(-1.5rem, -2.5vw, -3rem)";

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="w-full min-h-dvh bg-white flex flex-col overflow-hidden">

      <Navbar />

      {/* ── Hero body ── */}
      <div className="flex-1 flex flex-col justify-between gap-8 px-5 md:px-8 pt-4 pb-8 md:pb-4">

        {/* Greeting */}
        <FadeUp delay={0.18} className="text-center text-[0.88rem] md:text-[0.95rem] font-medium text-black/55 mb-3">
          <span>👋</span>
          <span className="ml-2">, hi — I&apos;m Hemanth, Building products
            that people love.</span>
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
              style={{ fontSize: "clamp(2.5rem, 12.5vw, 15rem)" }}
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
                fontSize: "clamp(2.3rem, 11.5vw, 13.5rem)",
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
        <div className="flex flex-col gap-3 mt-4" style={{ marginTop: "-175px" }}>

          {/* Tagline + tech stack */}
          <FadeUp delay={0.66} className="flex flex-wrap items-center justify-between gap-3 ">
            <p className="text-[0.95rem] md:text-base font-semibold text-black">
              📍 Tamil Nadu, India
            </p>
            <p className="max-w-sm text-[0.82rem] md:text-[0.88rem] font-medium text-black/55 leading-snug">
              I build high-performance websites, SaaS platforms, and mobile apps with a focus on design, speed, and user experience.
            </p>
          </FadeUp>

          {/* CTA buttons + tech stack */}
          <FadeUp delay={0.8} className="relative flex items-center justify-center gap-4 flex-wrap">

            {/* PRIMARY — View Projects */}
            <motion.a
              href="#work"
              className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-2xl bg-black text-white text-[0.88rem] font-semibold tracking-wide select-none"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset, 0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.18)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 0 1px rgba(255,255,255,0.12) inset, 0 12px 40px rgba(0,0,0,0.32), 0 0 28px rgba(0,0,0,0.14)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              {/* shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {/* subtle top highlight */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative z-10">View Projects</span>
              {/* arrow icon */}
              <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 9L9 2M9 2H4M9 2V7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.a>

            {/* Scroll indicator — mouse shell, centered between the two buttons */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EXPO_OUT }}
            >
              {/* Mouse shell */}
              <div className="relative flex items-start justify-center w-[1.35rem] h-[2.1rem] rounded-full border-[1.5px] border-black/25">
                {/* Scrolling dot */}
                <motion.span
                  className="w-[3px] h-[6px] rounded-full bg-black/40 mt-[5px]"
                  animate={{ y: [0, 7, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* SECONDARY — Let's Talk */}
            <motion.a
              href="#contact"
              className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-2xl text-black text-[0.88rem] font-semibold tracking-wide select-none bg-white"
              style={{ boxShadow: "0 0 0 1.5px rgba(0,0,0,0.12) inset, 0 4px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 0 1.5px rgba(0,0,0,0.2) inset, 0 8px 28px rgba(0,0,0,0.11)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              {/* shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-black/[0.04] to-transparent" />
              <span className="relative z-10">Let&apos;s Talk</span>
              {/* pulse dot */}
              <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-lg bg-black/[0.05] group-hover:bg-black/[0.09] transition-colors duration-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </span>
            </motion.a>

            {/* Tech stack pill — pinned to the right; only shown once there's room beside the centered CTAs */}
            <div className="absolute right-0 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/[0.03]">
              {["React", "Next.js", "Flutter", "AI"].map((tech, i) => (
                <span key={tech} className="flex items-center gap-2">
                  <span className="text-[0.72rem] font-semibold text-black/60 tracking-wide">{tech}</span>
                  {i < 3 && <span className="w-px h-3 bg-black/15 inline-block" />}
                </span>
              ))}
            </div>
          </FadeUp>

        </div>

      </div>
    </section>
  );
}
