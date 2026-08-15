import { GrainOverlay } from "@/components/shared/GrainOverlay";

/** Ambient light behind the copy — quiet enough to read as depth rather than
 * decoration, and dim enough that the accent cards still read as the
 * brightest thing in the section. */
export function ContactBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 right-[-12%] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px] md:h-[34rem] md:w-[34rem]" />
      <div className="absolute bottom-[-18%] left-[-12%] h-[20rem] w-[20rem] rounded-full bg-accent/[0.06] blur-[100px] md:h-[26rem] md:w-[26rem]" />
      <GrainOverlay opacity={0.02} />
    </div>
  );
}
