"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HERO_CAMERA, HERO_DPR, SCENE_COLORS } from "@/constants/heroScene";
import type { SceneQuality } from "@/hooks/useSceneQuality";
import { buildHeroCurve } from "@/lib/trackGeometry";
import { CarRig } from "./CarRig";
import { TrackSurface } from "./TrackSurface";

const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 200;

interface HeroSceneProps {
  /** False once the hero leaves the viewport — the loop stops drawing. */
  isActive: boolean;
  isMoving: boolean;
  quality: SceneQuality;
}

export function HeroScene({ isActive, isMoving, quality }: HeroSceneProps) {
  const curve = useMemo(buildHeroCurve, []);

  return (
    <Canvas
      dpr={HERO_DPR}
      frameloop={isActive ? "always" : "demand"}
      /* three.js deprecated PCFSoftShadowMap in r185; percentage-closer
       * filtering is its supported replacement and reads the same here. */
      shadows="percentage"
      camera={{ fov: HERO_CAMERA.fov, near: CAMERA_NEAR, far: CAMERA_FAR }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      scene={{ background: new THREE.Color(SCENE_COLORS.background) }}
      style={{ pointerEvents: "none" }}
    >
      <fog attach="fog" args={[SCENE_COLORS.background, HERO_CAMERA.fogNear, HERO_CAMERA.fogFar]} />
      <TrackSurface curve={curve} />
      <CarRig curve={curve} isMoving={isMoving} quality={quality} />
    </Canvas>
  );
}
