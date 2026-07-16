"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NOISE_TEXTURE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function LoadingScreenBackgroundComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(15,15,16,0) 60%)",
        }}
        animate={prefersReducedMotion ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: NOISE_TEXTURE_URI }}
      />
    </div>
  );
}

export const LoadingScreenBackground = memo(LoadingScreenBackgroundComponent);
