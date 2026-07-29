"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { HERO_TRACK, SCENE_COLORS } from "@/constants/heroScene";
import { createAsphaltTexture } from "@/lib/heroTextures";
import { buildRibbonGeometry } from "@/lib/trackGeometry";

const GROUND_DROP = -0.04;

interface TrackSurfaceProps {
  curve: THREE.CatmullRomCurve3;
}

/** The racing surface itself: an asphalt ribbon swept along the centreline over
 * a near-black ground plane, so the environment reads as a lit stage rather
 * than daylight. */
export function TrackSurface({ curve }: TrackSurfaceProps) {
  const geometry = useMemo(
    () => buildRibbonGeometry(curve, HERO_TRACK.width, HERO_TRACK.segments, HERO_TRACK.laneTiles),
    [curve]
  );
  const asphalt = useMemo(() => createAsphaltTexture(HERO_TRACK.laneTiles), []);

  useEffect(
    () => () => {
      geometry.dispose();
      asphalt.dispose();
    },
    [geometry, asphalt]
  );

  return (
    <group>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial map={asphalt} roughness={0.82} metalness={0.05} />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position-y={GROUND_DROP} receiveShadow>
        <circleGeometry args={[HERO_TRACK.groundRadius, 48]} />
        <meshStandardMaterial color={SCENE_COLORS.background} roughness={1} />
      </mesh>
    </group>
  );
}
