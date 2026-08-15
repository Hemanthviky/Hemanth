"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP_HREF } from "@/constants/site";
import {
  CONTACT_BODY,
  CONTACT_EMAIL_LABEL,
  CONTACT_EYEBROW,
  CONTACT_INDEX,
  CONTACT_PHONE_LABEL,
  CONTACT_TITLE,
} from "@/data/contact";
import { ContactBackdrop } from "./ContactBackdrop";
import { ContactChannelCta } from "./ContactChannelCta";
import { ContactSignalPanel } from "./ContactSignalPanel";

/** Stays on the circuit's dark palette rather than cutting back to the light
 * page: the lap ends by pointing at the reader, and this is the reply, so the
 * two read as one closing act. The reply splits into two instruments — the
 * CTAs someone acts on, and a status panel that answers what they'd otherwise
 * have to ask — rather than one long stack of equally-weighted rows. */
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const targets = [eyebrowRef.current, titleRef.current, bodyRef.current, ctaGroupRef.current, panelRef.current].filter(
      Boolean,
    );

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 20 });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full scroll-mt-[var(--nav-height)] overflow-hidden border-t border-border bg-background px-5 py-24 text-foreground md:px-8 md:py-32"
    >
      <ContactBackdrop />

      <div className="relative mx-auto max-w-6xl">
        <p
          ref={eyebrowRef}
          className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted md:text-[0.68rem]"
        >
          <span className="text-accent">{CONTACT_INDEX}</span>
          <span className="h-px w-6 bg-border" />
          <span>{CONTACT_EYEBROW}</span>
        </p>

        <h2
          ref={titleRef}
          className="mt-6 max-w-3xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-[clamp(2rem,6.5vw,4rem)]"
        >
          {CONTACT_TITLE}
        </h2>

        <p ref={bodyRef} className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-secondary md:text-[1.05rem]">
          {CONTACT_BODY}
        </p>

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Email leads, phone follows — the taller card is the hierarchy, so
           * both stay full-size instead of one shrinking into a footnote. */}
          <div ref={ctaGroupRef} className="flex flex-col gap-4 lg:col-span-7">
            <ContactChannelCta
              label={CONTACT_EMAIL_LABEL}
              value={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
            />
            <ContactChannelCta
              label={CONTACT_PHONE_LABEL}
              value={CONTACT_PHONE}
              href={CONTACT_WHATSAPP_HREF}
              emphasis="secondary"
              isExternal
            />
          </div>

          <div ref={panelRef} className="lg:col-span-5">
            <ContactSignalPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
