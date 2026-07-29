"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { HERO_LIGHTS, SCENE_COLORS } from "@/constants/heroScene";

interface SceneLightingProps {
  shadowMapSize: number;
}

/** Rendered inside the car rig so the lighting travels with the car: the warm
 * key stays locked to the same body edges for a consistent rim highlight, and
 * the shadow frustum stays tight enough to keep a soft contact shadow crisp at
 * a modest map size. */
export function SceneLighting({ shadowMapSize }: SceneLightingProps) {
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (!targetRef.current) return;
    if (keyRef.current) keyRef.current.target = targetRef.current;
    if (fillRef.current) fillRef.current.target = targetRef.current;
  }, []);

  const { shadowBounds, shadowFar } = HERO_LIGHTS;

  return (
    <>
      <object3D ref={targetRef} />

      <directionalLight
        ref={keyRef}
        color={SCENE_COLORS.keyLight}
        intensity={HERO_LIGHTS.keyIntensity}
        position={HERO_LIGHTS.keyOffset}
        castShadow
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-shadowBounds}
        shadow-camera-right={shadowBounds}
        shadow-camera-top={shadowBounds}
        shadow-camera-bottom={-shadowBounds}
        shadow-camera-far={shadowFar}
        shadow-bias={-0.0012}
        shadow-normalBias={0.02}
      />

      <directionalLight
        ref={fillRef}
        color={SCENE_COLORS.fillLight}
        intensity={HERO_LIGHTS.fillIntensity}
        position={HERO_LIGHTS.fillOffset}
      />

      <ambientLight color={SCENE_COLORS.fillLight} intensity={HERO_LIGHTS.ambientIntensity} />
    </>
  );
}
