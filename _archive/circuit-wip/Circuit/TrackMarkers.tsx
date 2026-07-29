"use client";

import { useEffect, useMemo } from "react";
import type { CatmullRomCurve3, MeshStandardMaterial } from "three";
import { CIRCUIT_COLORS, CIRCUIT_MARKER, CIRCUIT_MILESTONE_TS } from "@/constants/circuit";
import { createCurveFrame, sampleCurveFrame } from "@/lib/circuitGeometry";
import { createSignTexture } from "@/lib/circuitTextures";
import { JOURNEY_MILESTONES } from "@/data/experience";

const BOARD = { width: 1.92, height: 1.2, depth: 0.09, y: 1.9 } as const;
const POST = { radius: 0.05, height: 1.6, spread: 0.7 } as const;
const BEACON = { width: 0.6, size: 0.07, y: 2.68 } as const;

interface TrackMarkersProps {
  curve: CatmullRomCurve3;
  onMaterial: (index: number, material: MeshStandardMaterial | null) => void;
}

/** Pit-board style milestone signs beside the track. The face texture doubles
 * as an emissive map whose intensity the director raises as the car arrives —
 * these are the visual flourish; the readable content lives in the HTML
 * overlay. Boards face against the direction of travel (toward the car). */
export function TrackMarkers({ curve, onMaterial }: TrackMarkersProps) {
  const placements = useMemo(() => {
    const frame = createCurveFrame();
    return CIRCUIT_MILESTONE_TS.map((t, index) => {
      sampleCurveFrame(curve, t, frame);
      const lateral = CIRCUIT_MARKER.lateral[index] * CIRCUIT_MARKER.sides[index];
      const position = frame.position.clone().addScaledVector(frame.side, lateral);
      position.y = frame.position.y;
      return { position, rotationY: Math.atan2(-frame.tangent.x, -frame.tangent.z) };
    });
  }, [curve]);

  const textures = useMemo(
    () => JOURNEY_MILESTONES.map((milestone, index) => createSignTexture(milestone, index)),
    []
  );
  useEffect(() => () => textures.forEach((texture) => texture.dispose()), [textures]);

  return (
    <>
      {JOURNEY_MILESTONES.map((milestone, index) => (
        <group
          key={milestone.id}
          position={placements[index].position}
          rotation-y={placements[index].rotationY}
        >
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * POST.spread, POST.height / 2, 0]} castShadow>
              <cylinderGeometry args={[POST.radius, POST.radius, POST.height, 10]} />
              <meshStandardMaterial color={CIRCUIT_COLORS.carDark} roughness={0.6} metalness={0.4} />
            </mesh>
          ))}
          <mesh position={[0, BOARD.y, -BOARD.depth / 2]} castShadow>
            <boxGeometry args={[BOARD.width + 0.08, BOARD.height + 0.08, BOARD.depth]} />
            <meshStandardMaterial color={CIRCUIT_COLORS.carDark} roughness={0.7} />
          </mesh>
          <mesh position={[0, BOARD.y, 0.002]}>
            <planeGeometry args={[BOARD.width, BOARD.height]} />
            <meshStandardMaterial
              ref={(material) => onMaterial(index, material)}
              map={textures[index]}
              emissive={CIRCUIT_COLORS.signText}
              emissiveMap={textures[index]}
              emissiveIntensity={CIRCUIT_MARKER.baseEmissive}
              roughness={0.5}
            />
          </mesh>
          {milestone.isCurrent && (
            <mesh position={[0, BEACON.y, 0]}>
              <boxGeometry args={[BEACON.width, BEACON.size, BEACON.size]} />
              <meshStandardMaterial
                color={CIRCUIT_COLORS.accent}
                emissive={CIRCUIT_COLORS.accent}
                emissiveIntensity={1.4}
              />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}
