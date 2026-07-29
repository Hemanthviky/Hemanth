"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CIRCUIT_CAMERA, CIRCUIT_ENVIRONMENT_COLORS, CIRCUIT_FOG, CIRCUIT_LIGHT } from "@/constants/circuit";
import { buildCircuitCurve } from "@/lib/circuitGeometry";
import type { ICircuitHandles, ICircuitProgress } from "@/types/experience";
import { CircuitScenery } from "./CircuitScenery";
import { CircuitTrack } from "./CircuitTrack";
import { RaceCar } from "./RaceCar";
import { SceneDirector } from "./SceneDirector";
import { TrackMarkers } from "./TrackMarkers";

interface CircuitSceneProps {
  progress: ICircuitProgress;
  /** Pauses the render loop entirely while the section is off screen. */
  active: boolean;
  /** Reduced-motion: render one static frame on demand instead of looping. */
  reduced: boolean;
  currentIndex: number;
}

/** The R3F canvas: transparent over the page's light background, soft shadows,
 * near-white fog so the circuit fades into the site instead of hard-cutting.
 * All animation lives in SceneDirector's frame loop, fed by the shared
 * progress ref — the canvas itself never re-mounts on scroll. */
export function CircuitScene({ progress, active, reduced, currentIndex }: CircuitSceneProps) {
  const curve = useMemo(() => buildCircuitCurve(), []);
  const handles = useMemo<ICircuitHandles>(
    () => ({
      car: null,
      wheels: [null, null, null, null],
      markerMaterials: [null, null, null],
      light: null,
      lightTarget: new THREE.Object3D(),
    }),
    []
  );

  const frameloop = reduced ? "demand" : active ? "always" : "never";

  return (
    <Canvas
      className="pointer-events-none absolute inset-0"
      frameloop={frameloop}
      shadows="soft"
      dpr={[1, 2]}
      camera={{ fov: CIRCUIT_CAMERA.fov, near: 0.1, far: 260, position: [0, 6, -14] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog
        attach="fog"
        args={[CIRCUIT_ENVIRONMENT_COLORS.fog, CIRCUIT_FOG.near, CIRCUIT_FOG.far]}
      />
      <hemisphereLight
        args={[CIRCUIT_ENVIRONMENT_COLORS.hemisphereSky, CIRCUIT_ENVIRONMENT_COLORS.hemisphereGround, 0.7]}
      />
      <directionalLight
        ref={(light) => {
          handles.light = light;
          if (light) light.target = handles.lightTarget;
        }}
        color={CIRCUIT_ENVIRONMENT_COLORS.sunlight}
        position={[CIRCUIT_LIGHT.offset[0], CIRCUIT_LIGHT.offset[1], CIRCUIT_LIGHT.offset[2]]}
        intensity={CIRCUIT_LIGHT.intensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-CIRCUIT_LIGHT.shadowSize}
        shadow-camera-right={CIRCUIT_LIGHT.shadowSize}
        shadow-camera-top={CIRCUIT_LIGHT.shadowSize}
        shadow-camera-bottom={-CIRCUIT_LIGHT.shadowSize}
        shadow-camera-near={2}
        shadow-camera-far={CIRCUIT_LIGHT.shadowFar}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
      />
      <primitive object={handles.lightTarget} />

      <CircuitTrack curve={curve} />
      <CircuitScenery curve={curve} />
      <TrackMarkers
        curve={curve}
        onMaterial={(index, material) => {
          handles.markerMaterials[index] = material;
        }}
      />
      <RaceCar
        onCar={(car) => {
          handles.car = car;
        }}
        onWheel={(index, wheel) => {
          handles.wheels[index] = wheel;
        }}
      />
      <SceneDirector curve={curve} progress={progress} handles={handles} currentIndex={currentIndex} />
    </Canvas>
  );
}
