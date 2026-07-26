"use client";

import { useTransform, type MotionValue } from "framer-motion";

interface ProjectCardTransforms {
  scale: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  opacity: MotionValue<number>;
  filter: MotionValue<string>;
  zIndex: MotionValue<number>;
}

/*
 * Per-card resting rotations when fanned in the background stack.
 * Alternating ± to create a natural spread like physical cards.
 */
const BASE_ROTATIONS = [-6, 5, -4, 6, -3];

/*
 * Each card is positioned relative to the current fractional scroll index.
 * `slot` = distance from "my turn": 0 = active, +n = already passed, -n = upcoming
 */
export function useProjectCardTransforms(
  vIndex: MotionValue<number>,
  index: number
): ProjectCardTransforms {
  const slot = useTransform(vIndex, (v) => v - index);

  /* Active card (slot ≈ 0) is at full size.
   * Past cards (slot > 0) scale down and lift off.
   * Future cards (slot < 0) fan out in a stack behind. */
  const scale = useTransform(slot, (s) => {
    if (s >= 0) return Math.max(0.82, 1 - s * 0.12);
    // Fan: each depth level shrinks a bit
    return Math.max(0.74, 1 - Math.abs(s) * 0.08);
  });

  /* Horizontal offset for fanned stack — future cards fan right */
  const x = useTransform(slot, (s) => {
    if (s >= 0) return 0;
    // Increasing x offset creates the "spread deck" look
    return Math.min(72, Math.abs(s) * 20);
  });

  /* Vertical: past cards fly up and out; future cards drop slightly */
  const y = useTransform(slot, (s) => {
    if (s >= 0) return Math.max(-80, -s * 60);
    return Math.min(60, Math.abs(s) * 16);
  });

  /* Rotation: active snaps to 0; future cards rotate to their resting angle */
  const rotate = useTransform(slot, (s) => {
    if (s >= 0) return Math.max(-5, -s * 3);
    const base = BASE_ROTATIONS[index % BASE_ROTATIONS.length];
    // Gradually apply the resting rotation as card moves back in stack
    return base * Math.min(1, Math.abs(s) / 1.6);
  });

  /* Opacity: active = 1; quick fade for passed, gentle fade for queued */
  const opacity = useTransform(slot, (s) => {
    const mag = Math.abs(s);
    if (s >= 0) return Math.max(0.0, 1 - mag * 0.65);
    return Math.max(0.5, 1 - mag * 0.16);
  });

  /* Blur: active card sharp; others progressively blurred */
  const blur = useTransform(slot, (s) => {
    if (s >= 0) return Math.min(8, s * 5);
    return Math.min(4, Math.abs(s) * 1.2);
  });
  const filter = useTransform(blur, (b) => `blur(${b.toFixed(1)}px)`);

  /* z-index: active card always on top */
  const zIndex = useTransform(slot, (s) => Math.round(50 - Math.abs(s) * 12));

  return { scale, x, y, rotate, opacity, filter, zIndex };
}
