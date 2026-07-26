"use client";

import { motion } from "framer-motion";
import { PROJECT_VISUALS } from "@/constants/projectVisuals";

export function WorksBackgroundGlow({ projectId }: { projectId: string }) {
  const visual = PROJECT_VISUALS[projectId];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary glow — follows active project colour */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: "10%",
          top: "50%",
          translateY: "-50%",
          width: "clamp(400px, 50vw, 700px)",
          height: "clamp(400px, 50vw, 700px)",
          filter: "blur(140px)",
          opacity: 0.13,
        }}
        animate={{ backgroundColor: visual.glowA }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* Secondary smaller accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: "28%",
          top: "20%",
          width: "clamp(180px, 20vw, 280px)",
          height: "clamp(180px, 20vw, 280px)",
          filter: "blur(90px)",
          opacity: 0.08,
        }}
        animate={{ backgroundColor: visual.glowB }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
