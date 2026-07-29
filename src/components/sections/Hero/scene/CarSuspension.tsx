"use client";

import type { ICarMaterials } from "./useCarMaterials";

/** Upper and lower wishbone arms per corner, splayed slightly fore/aft so the
 * suspension reads as visible structure rather than a single strut. */
const ARMS = [
  { z: 1.32, y: 0.42, tilt: 0.1, length: 0.58 },
  { z: 1.32, y: 0.22, tilt: -0.08, length: 0.62 },
  { z: -1.18, y: 0.46, tilt: 0.12, length: 0.6 },
  { z: -1.18, y: 0.24, tilt: -0.1, length: 0.66 },
] as const;

const SIDES = [-1, 1] as const;
const ARM_THICKNESS = 0.038;

interface CarSuspensionProps {
  materials: ICarMaterials;
}

export function CarSuspension({ materials }: CarSuspensionProps) {
  return (
    <>
      {ARMS.flatMap((arm) =>
        SIDES.map((side) => (
          <mesh
            key={`${arm.z}-${arm.y}-${side}`}
            position={[side * 0.62, arm.y, arm.z]}
            rotation-z={side * arm.tilt}
            material={materials.gunmetal}
          >
            <boxGeometry args={[arm.length, ARM_THICKNESS, ARM_THICKNESS]} />
          </mesh>
        ))
      )}
    </>
  );
}
