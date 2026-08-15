import { CircuitLap } from "./CircuitLap";
import { CircuitStatic } from "./CircuitStatic";

/** Deliberate hard cut from the light page above into the circuit's night-race
 * palette — the section is the one place the site runs on the dark theme. */
export function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full bg-background text-foreground">
      <CircuitLap />
      <CircuitStatic />
    </section>
  );
}
