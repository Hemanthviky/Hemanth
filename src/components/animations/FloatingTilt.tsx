"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface FloatingTiltProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

/** Wraps content with a subtle idle float and a desktop mouse-tilt reaction. */
export function FloatingTilt({ children, index = 0, className }: FloatingTiltProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(relX * 10);
    rotateX.set(relY * -10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={
        reduced
          ? undefined
          : { y: [0, -8, 0], rotate: [0, index % 2 === 0 ? 1 : -1, 0] }
      }
      transition={
        reduced
          ? undefined
          : { duration: 4.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {children}
    </motion.div>
  );
}
