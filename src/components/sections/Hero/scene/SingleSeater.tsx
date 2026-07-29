"use client";

import { CarSuspension } from "./CarSuspension";
import { CarWheels } from "./CarWheels";
import { CarWings } from "./CarWings";
import { useCarMaterials } from "./useCarMaterials";

const SIDES = [-1, 1] as const;

interface SingleSeaterProps {
  isMoving: boolean;
  /** Below 1 the whole car renders translucent — used by the mirrored
   * reflection copy laid into the track surface. */
  opacity?: number;
}

/** Original generic single-seater: long nose, low cockpit under a halo,
 * multi-element wings, exposed wheels and visible wishbones. Carbon-black body
 * with racing-red and signal-yellow striping. Faces +Z, origin at the contact
 * patch. No real team's livery, number or branding is referenced. */
export function SingleSeater({ isMoving, opacity = 1 }: SingleSeaterProps) {
  const materials = useCarMaterials(opacity);
  const castShadow = opacity === 1;

  return (
    <group>
      {/* floor plank and monocoque */}
      <mesh position={[0, 0.09, 0]} material={materials.body} castShadow={castShadow}>
        <boxGeometry args={[1.5, 0.06, 4.4]} />
      </mesh>
      <mesh position={[0, 0.36, 0.2]} material={materials.body} castShadow={castShadow}>
        <boxGeometry args={[0.68, 0.34, 2.4]} />
      </mesh>

      {/* long tapered nose, tip forward */}
      <mesh position={[0, 0.42, 1.78]} rotation-x={-Math.PI / 2} material={materials.body} castShadow={castShadow}>
        <cylinderGeometry args={[0.09, 0.3, 1.7, 10]} />
      </mesh>
      <mesh position={[0, 0.56, 1.78]} material={materials.red}>
        <boxGeometry args={[0.13, 0.025, 1.5]} />
      </mesh>
      <mesh position={[0, 0.575, 1.78]} material={materials.yellow}>
        <boxGeometry args={[0.05, 0.02, 1.5]} />
      </mesh>

      {/* cockpit, halo and headrest */}
      <mesh position={[0, 0.55, 0.42]} material={materials.gunmetal}>
        <boxGeometry args={[0.5, 0.12, 0.86]} />
      </mesh>
      <mesh position={[0, 0.64, 0.34]} rotation-x={-0.12} material={materials.gunmetal} castShadow={castShadow}>
        <torusGeometry args={[0.31, 0.036, 8, 20, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.6, 0.66]} material={materials.gunmetal}>
        <boxGeometry args={[0.06, 0.22, 0.06]} />
      </mesh>
      <mesh position={[0, 0.63, -0.32]} material={materials.body} castShadow={castShadow}>
        <boxGeometry args={[0.46, 0.22, 0.34]} />
      </mesh>

      {/* engine cover, airbox and accent spine */}
      <mesh position={[0, 0.55, -1.06]} material={materials.body} castShadow={castShadow}>
        <boxGeometry args={[0.36, 0.42, 1.72]} />
      </mesh>
      <mesh position={[0, 0.82, -0.52]} material={materials.gunmetal}>
        <boxGeometry args={[0.24, 0.24, 0.42]} />
      </mesh>
      <mesh position={[0, 0.77, -1.06]} material={materials.red}>
        <boxGeometry args={[0.12, 0.022, 1.7]} />
      </mesh>

      {/* sidepods with livery striping */}
      {SIDES.map((side) => (
        <group key={`sidepod-${side}`}>
          <mesh position={[side * 0.56, 0.36, -0.38]} material={materials.body} castShadow={castShadow}>
            <boxGeometry args={[0.44, 0.36, 1.6]} />
          </mesh>
          <mesh position={[side * 0.785, 0.42, -0.38]} material={materials.red}>
            <boxGeometry args={[0.022, 0.14, 1.6]} />
          </mesh>
          <mesh position={[side * 0.785, 0.29, -0.38]} material={materials.yellow}>
            <boxGeometry args={[0.022, 0.06, 1.6]} />
          </mesh>
          <mesh position={[side * 0.44, 0.7, 0.58]} material={materials.gunmetal}>
            <boxGeometry args={[0.12, 0.055, 0.045]} />
          </mesh>
        </group>
      ))}

      <CarWings materials={materials} castShadow={castShadow} />
      <CarSuspension materials={materials} />
      <CarWheels materials={materials} isMoving={isMoving} castShadow={castShadow} />
    </group>
  );
}
