"use client";

import type { ICarMaterials } from "./useCarMaterials";

const SIDES = [-1, 1] as const;

interface CarWingsProps {
  materials: ICarMaterials;
  castShadow: boolean;
}

/** Multi-element front and rear wings. Each wing is a stack of thin planes with
 * increasing incidence, endplates outboard, and the livery's red/yellow
 * striping carried across the flaps — an original layout, not a copy of any
 * real car's aero package. */
export function CarWings({ materials, castShadow }: CarWingsProps) {
  return (
    <>
      {/* front wing: main plane, red upper flap, yellow leading strip */}
      <mesh position={[0, 0.13, 2.45]} material={materials.body} castShadow={castShadow}>
        <boxGeometry args={[1.9, 0.035, 0.44]} />
      </mesh>
      <mesh position={[0, 0.21, 2.3]} rotation-x={-0.18} material={materials.red} castShadow={castShadow}>
        <boxGeometry args={[1.9, 0.03, 0.3]} />
      </mesh>
      <mesh position={[0, 0.28, 2.19]} rotation-x={-0.3} material={materials.body}>
        <boxGeometry args={[1.9, 0.028, 0.24]} />
      </mesh>
      <mesh position={[0, 0.31, 2.11]} rotation-x={-0.3} material={materials.yellow}>
        <boxGeometry args={[1.9, 0.022, 0.08]} />
      </mesh>

      {SIDES.map((side) => (
        <group key={`front-endplate-${side}`}>
          <mesh position={[side * 0.96, 0.24, 2.34]} material={materials.body} castShadow={castShadow}>
            <boxGeometry args={[0.045, 0.34, 0.62]} />
          </mesh>
          <mesh position={[side * 0.985, 0.35, 2.34]} material={materials.yellow}>
            <boxGeometry args={[0.02, 0.08, 0.62]} />
          </mesh>
        </group>
      ))}

      {/* rear wing: main plane, red upper flap, swan-neck pylon */}
      <mesh position={[0, 1.02, -2.05]} material={materials.body} castShadow={castShadow}>
        <boxGeometry args={[1.26, 0.05, 0.44]} />
      </mesh>
      <mesh position={[0, 1.16, -2.18]} rotation-x={0.3} material={materials.red} castShadow={castShadow}>
        <boxGeometry args={[1.26, 0.04, 0.28]} />
      </mesh>
      <mesh position={[0, 0.8, -1.94]} material={materials.gunmetal}>
        <boxGeometry args={[0.09, 0.46, 0.14]} />
      </mesh>

      {SIDES.map((side) => (
        <group key={`rear-endplate-${side}`}>
          <mesh position={[side * 0.63, 0.94, -2.05]} material={materials.body} castShadow={castShadow}>
            <boxGeometry args={[0.05, 0.6, 0.66]} />
          </mesh>
          <mesh position={[side * 0.66, 1.14, -2.05]} material={materials.yellow}>
            <boxGeometry args={[0.022, 0.1, 0.66]} />
          </mesh>
        </group>
      ))}

      {/* diffuser */}
      <mesh position={[0, 0.17, -2.24]} rotation-x={0.24} material={materials.gunmetal}>
        <boxGeometry args={[1.22, 0.24, 0.42]} />
      </mesh>
    </>
  );
}
