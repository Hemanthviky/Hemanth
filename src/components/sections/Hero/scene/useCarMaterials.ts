"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { SCENE_COLORS } from "@/constants/heroScene";
import { createCarbonNormalTexture, createTireTreadTexture } from "@/lib/heroTextures";

const CARBON_REPEAT = 5;
const TREAD_REPEAT = 7;
const NORMAL_SCALE = 0.45;

export interface ICarMaterials {
  body: THREE.Material;
  red: THREE.Material;
  yellow: THREE.Material;
  tire: THREE.Material;
  rim: THREE.Material;
  gunmetal: THREE.Material;
}

/** Builds the car's material set once per instance. The mirrored reflection
 * copy passes an opacity below 1, which flips every material to a
 * non-depth-writing translucent version of itself. */
export function useCarMaterials(opacity: number): ICarMaterials {
  const carbonNormal = useMemo(() => createCarbonNormalTexture(CARBON_REPEAT), []);
  const tread = useMemo(() => createTireTreadTexture(TREAD_REPEAT), []);

  const materials = useMemo<ICarMaterials>(() => {
    /* The mirrored copy sits below the road surface, so it has to opt out of
     * depth testing to be visible at all; DoubleSide compensates for the
     * inverted winding order that the negative Y scale produces. */
    const isTranslucent = opacity < 1;
    const shared = isTranslucent
      ? { transparent: true, opacity, depthWrite: false, depthTest: false, side: THREE.DoubleSide }
      : {};

    return {
      body: new THREE.MeshPhysicalMaterial({
        color: SCENE_COLORS.carbon,
        roughness: 0.25,
        metalness: 0.15,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        normalMap: carbonNormal,
        normalScale: new THREE.Vector2(NORMAL_SCALE, NORMAL_SCALE),
        ...shared,
      }),
      red: new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.racingRed,
        roughness: 0.35,
        metalness: 0.05,
        ...shared,
      }),
      yellow: new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.signalYellow,
        roughness: 0.35,
        metalness: 0.05,
        ...shared,
      }),
      tire: new THREE.MeshStandardMaterial({
        map: tread,
        color: SCENE_COLORS.tire,
        roughness: 0.9,
        metalness: 0,
        ...shared,
      }),
      rim: new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.rim,
        metalness: 0.7,
        roughness: 0.4,
        ...shared,
      }),
      gunmetal: new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.gunmetal,
        metalness: 0.6,
        roughness: 0.45,
        ...shared,
      }),
    };
  }, [carbonNormal, tread, opacity]);

  useEffect(
    () => () => {
      Object.values(materials).forEach((material) => material.dispose());
      carbonNormal.dispose();
      tread.dispose();
    },
    [materials, carbonNormal, tread]
  );

  return materials;
}
