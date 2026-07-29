"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { CIRCUIT_CAR, CIRCUIT_COLORS, CIRCUIT_ENVIRONMENT_COLORS } from "@/constants/circuit";
import { createNoseNumberTexture, createTireTreadTexture } from "@/lib/circuitTextures";

const WHEELS = [
  { x: 0.78, z: 1.02, width: 0.3 },
  { x: -0.78, z: 1.02, width: 0.3 },
  { x: 0.82, z: -0.95, width: 0.36 },
  { x: -0.82, z: -0.95, width: 0.36 },
] as const;
const HUB_RADIUS = 0.18;
const WHEEL_RADIAL_SEGMENTS = 20;

interface RaceCarProps {
  onCar: (car: THREE.Group | null) => void;
  onWheel: (index: number, wheel: THREE.Group | null) => void;
}

/** Stylised open-wheel single-seater composed purely from primitives — a
 * generic original silhouette (long wedge nose, low cockpit, exposed wheels,
 * big rear wing). Deep navy "team color" livery with glossy clearcoat panels,
 * the site's yellow as secondary accents, gunmetal structural parts and matte
 * rubber tires with glossy sidewalls — deliberately not modelled on any real
 * car or livery. Faces +Z; origin at ground contact. */
export function RaceCar({ onCar, onWheel }: RaceCarProps) {
  const groupRef = useRef<THREE.Group | null>(null);

  const treadTexture = useMemo(() => createTireTreadTexture(), []);
  const materials = useMemo(
    () => ({
      body: new THREE.MeshPhysicalMaterial({
        color: CIRCUIT_ENVIRONMENT_COLORS.carBodyPrimary,
        roughness: 0.3,
        metalness: 0.4,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
      }),
      dark: new THREE.MeshStandardMaterial({ color: CIRCUIT_COLORS.carDark, roughness: 0.85 }),
      accent: new THREE.MeshStandardMaterial({ color: CIRCUIT_COLORS.accent, roughness: 0.35, metalness: 0.1 }),
      gunmetal: new THREE.MeshStandardMaterial({
        color: CIRCUIT_ENVIRONMENT_COLORS.carGunmetal,
        roughness: 0.35,
        metalness: 0.7,
      }),
      tireTread: new THREE.MeshStandardMaterial({ map: treadTexture, roughness: 0.97, metalness: 0 }),
      tireSidewall: new THREE.MeshStandardMaterial({
        color: CIRCUIT_ENVIRONMENT_COLORS.tireSidewall,
        roughness: 0.35,
        metalness: 0.05,
      }),
    }),
    [treadTexture]
  );
  const numberTexture = useMemo(() => createNoseNumberTexture(), []);

  useEffect(() => {
    groupRef.current?.traverse((object) => {
      if (object instanceof THREE.Mesh && !(object.material as THREE.Material).transparent) {
        object.castShadow = true;
      }
    });
    return () => {
      Object.values(materials).forEach((material) => material.dispose());
      numberTexture.dispose();
      treadTexture.dispose();
    };
  }, [materials, numberTexture, treadTexture]);

  return (
    <group
      ref={(group) => {
        groupRef.current = group;
        onCar(group);
      }}
    >
      {/* floor plank */}
      <mesh position={[0, 0.12, 0.1]} material={materials.dark}>
        <boxGeometry args={[1.3, 0.06, 2.8]} />
      </mesh>
      {/* monocoque */}
      <mesh position={[0, 0.36, 0.15]} material={materials.body}>
        <boxGeometry args={[0.62, 0.3, 2.0]} />
      </mesh>
      {/* wedge nose: 4-segment tapered cylinder laid along +Z */}
      <mesh position={[0, 0.38, 1.65]} rotation={[Math.PI / 2, Math.PI / 4, 0]} material={materials.body}>
        <cylinderGeometry args={[0.07, 0.26, 1.1, 4]} />
      </mesh>
      {/* front wing + endplates */}
      <mesh position={[0, 0.12, 2.0]} material={materials.dark}>
        <boxGeometry args={[1.5, 0.05, 0.5]} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={`fw-${side}`} position={[side * 0.76, 0.16, 2.0]} material={materials.accent}>
          <boxGeometry args={[0.05, 0.16, 0.55]} />
        </mesh>
      ))}
      {/* cockpit, headrest and halo */}
      <mesh position={[0, 0.55, 0.15]} material={materials.dark}>
        <boxGeometry args={[0.46, 0.14, 0.7]} />
      </mesh>
      <mesh position={[0, 0.56, -0.35]} material={materials.body}>
        <boxGeometry args={[0.4, 0.16, 0.25]} />
      </mesh>
      <mesh position={[0, 0.6, 0.12]} rotation={[-0.1, 0, 0]} material={materials.gunmetal}>
        <torusGeometry args={[0.27, 0.03, 8, 16, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.55, 0.42]} material={materials.gunmetal}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
      </mesh>
      {/* engine cover, airbox and accent spine */}
      <mesh position={[0, 0.55, -0.75]} material={materials.body}>
        <boxGeometry args={[0.3, 0.34, 1.3]} />
      </mesh>
      <mesh position={[0, 0.78, -0.45]} material={materials.dark}>
        <boxGeometry args={[0.2, 0.14, 0.3]} />
      </mesh>
      <mesh position={[0, 0.73, -0.72]} material={materials.accent}>
        <boxGeometry args={[0.09, 0.02, 1.35]} />
      </mesh>
      <mesh position={[0, 0.525, 0.3]} material={materials.accent}>
        <boxGeometry args={[0.09, 0.02, 1.4]} />
      </mesh>
      {/* sidepods */}
      {[-1, 1].map((side) => (
        <mesh key={`pod-${side}`} position={[side * 0.49, 0.34, -0.3]} material={materials.body}>
          <boxGeometry args={[0.36, 0.28, 1.15]} />
        </mesh>
      ))}
      {/* mirrors */}
      {[-1, 1].map((side) => (
        <mesh key={`mirror-${side}`} position={[side * 0.38, 0.62, 0.35]} material={materials.accent}>
          <boxGeometry args={[0.1, 0.06, 0.04]} />
        </mesh>
      ))}
      {/* rear wing assembly */}
      <mesh position={[0, 0.86, -1.32]} material={materials.body}>
        <boxGeometry args={[1.14, 0.05, 0.38]} />
      </mesh>
      <mesh position={[0, 0.95, -1.4]} material={materials.accent}>
        <boxGeometry args={[1.14, 0.04, 0.2]} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={`rw-${side}`} position={[side * 0.57, 0.78, -1.32]} material={materials.accent}>
          <boxGeometry args={[0.05, 0.4, 0.55]} />
        </mesh>
      ))}
      <mesh position={[0, 0.75, -1.2]} material={materials.body}>
        <boxGeometry args={[0.07, 0.35, 0.08]} />
      </mesh>
      {/* suspension arms */}
      {WHEELS.map((wheel, index) => (
        <mesh
          key={`arm-${index}`}
          position={[Math.sign(wheel.x) * 0.54, 0.34, wheel.z]}
          material={materials.gunmetal}
        >
          <boxGeometry args={[0.5, 0.03, 0.03]} />
        </mesh>
      ))}
      {/* nose number decal */}
      <mesh position={[0, 0.545, 0.8]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <planeGeometry args={[0.34, 0.34]} />
        <meshStandardMaterial map={numberTexture} transparent depthWrite={false} roughness={0.4} />
      </mesh>
      {/* wheels: wrapper group spins around the axle in the frame loop */}
      {WHEELS.map((wheel, index) => (
        <group
          key={`wheel-${index}`}
          position={[wheel.x, CIRCUIT_CAR.wheelRadius, wheel.z]}
          ref={(wheelGroup) => onWheel(index, wheelGroup)}
        >
          {/* material array: matte textured tread on the barrel, glossy sidewalls on the caps */}
          <mesh
            rotation-z={Math.PI / 2}
            material={[materials.tireTread, materials.tireSidewall, materials.tireSidewall]}
          >
            <cylinderGeometry
              args={[CIRCUIT_CAR.wheelRadius, CIRCUIT_CAR.wheelRadius, wheel.width, WHEEL_RADIAL_SEGMENTS]}
            />
          </mesh>
          <mesh rotation-z={Math.PI / 2} material={materials.gunmetal}>
            <cylinderGeometry args={[HUB_RADIUS, HUB_RADIUS, wheel.width + 0.02, 12]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
