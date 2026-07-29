"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HERO_PARTICLES, SCENE_COLORS } from "@/constants/heroScene";

interface HeatHazeProps {
  isMoving: boolean;
}

/** Sparse semi-transparent motes drifting off the rear wheels. Positions live
 * in car-local space, so the whole field travels with the rig and only needs a
 * cheap wrap-around each frame. */
export function HeatHaze({ isMoving }: HeatHazeProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const [spreadX, spreadY, spreadZ] = HERO_PARTICLES.spread;

  const geometry = useMemo(() => {
    const positions = new Float32Array(HERO_PARTICLES.count * 3);
    for (let i = 0; i < HERO_PARTICLES.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spreadX;
      positions[i * 3 + 1] = Math.random() * spreadY;
      positions[i * 3 + 2] = HERO_PARTICLES.originZ - Math.random() * spreadZ;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, [spreadX, spreadY, spreadZ]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!isMoving || !pointsRef.current) return;
    const attribute = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = attribute.array as Float32Array;

    for (let i = 0; i < HERO_PARTICLES.count; i++) {
      const zIndex = i * 3 + 2;
      array[zIndex] -= HERO_PARTICLES.driftSpeed * delta;
      array[i * 3 + 1] += HERO_PARTICLES.driftSpeed * 0.4 * delta;

      if (array[zIndex] < HERO_PARTICLES.originZ - spreadZ) {
        array[zIndex] = HERO_PARTICLES.originZ;
        array[i * 3 + 1] = Math.random() * 0.2;
      }
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={SCENE_COLORS.keyLight}
        size={HERO_PARTICLES.size}
        transparent
        opacity={HERO_PARTICLES.opacity}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
