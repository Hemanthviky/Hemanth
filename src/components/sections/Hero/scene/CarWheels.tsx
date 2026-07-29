"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { HERO_CAR } from "@/constants/heroScene";
import type { ICarMaterials } from "./useCarMaterials";

/** Front pair is narrower and sits ahead of the cockpit; rear pair is wider and
 * carries the drive — the proportions that read as a single-seater. */
const WHEELS = [
  { x: 0.86, z: 1.32, width: 0.34 },
  { x: -0.86, z: 1.32, width: 0.34 },
  { x: 0.92, z: -1.18, width: 0.44 },
  { x: -0.92, z: -1.18, width: 0.44 },
] as const;

const RIM_RADIUS = 0.2;
const RADIAL_SEGMENTS = 22;

interface CarWheelsProps {
  materials: ICarMaterials;
  isMoving: boolean;
  castShadow: boolean;
}

/** Exposed wheels with visible tread grooves. Each wheel group spins about its
 * axle at the rate implied by the car's road speed. */
export function CarWheels({ materials, isMoving, castShadow }: CarWheelsProps) {
  const groupsRef = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, delta) => {
    if (!isMoving) return;
    const step = (HERO_CAR.speed / HERO_CAR.wheelRadius) * delta;
    groupsRef.current.forEach((group) => {
      if (group) group.rotation.x += step;
    });
  });

  return (
    <>
      {WHEELS.map((wheel, index) => (
        <group
          key={`${wheel.x}-${wheel.z}`}
          position={[wheel.x, HERO_CAR.wheelRadius, wheel.z]}
          ref={(group) => {
            groupsRef.current[index] = group;
          }}
        >
          <mesh rotation-z={Math.PI / 2} material={materials.tire} castShadow={castShadow}>
            <cylinderGeometry
              args={[HERO_CAR.wheelRadius, HERO_CAR.wheelRadius, wheel.width, RADIAL_SEGMENTS]}
            />
          </mesh>
          <mesh rotation-z={Math.PI / 2} material={materials.rim}>
            <cylinderGeometry args={[RIM_RADIUS, RIM_RADIUS, wheel.width + 0.02, 12]} />
          </mesh>
        </group>
      ))}
    </>
  );
}
