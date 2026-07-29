"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HERO_CAMERA, HERO_CAR } from "@/constants/heroScene";
import type { SceneQuality } from "@/hooks/useSceneQuality";
import { createCurveFrame, sampleCurveFrame } from "@/lib/trackGeometry";
import { HeatHaze } from "./HeatHaze";
import { SceneLighting } from "./SceneLighting";
import { SingleSeater } from "./SingleSeater";

const FORWARD = new THREE.Vector3(0, 0, 1);
const UP = new THREE.Vector3(0, 1, 0);
const TWO_PI = Math.PI * 2;
const REFLECTION_LIFT = 0.002;
const REFLECTION_ORDER = 1;

interface CarRigProps {
  curve: THREE.CatmullRomCurve3;
  isMoving: boolean;
  quality: SceneQuality;
}

/** Single frame-loop conductor. It advances one value — distance travelled —
 * and derives the car's pose, its suspension bob and the chase camera from
 * that, so nothing in the scene can drift out of sync. When motion is frozen
 * the same code parks the car at the start of the lap. */
export function CarRig({ curve, isMoving, quality }: CarRigProps) {
  const rigRef = useRef<THREE.Group>(null);
  const distanceRef = useRef(0);
  const camera = useThree((state) => state.camera);

  const curveLength = useMemo(() => curve.getLength(), [curve]);
  const frame = useMemo(createCurveFrame, []);
  const scratch = useMemo(() => ({ eye: new THREE.Vector3(), focus: new THREE.Vector3() }), []);

  useFrame((state, delta) => {
    const rig = rigRef.current;
    if (!rig) return;

    if (isMoving) distanceRef.current += HERO_CAR.speed * delta;
    sampleCurveFrame(curve, distanceRef.current / curveLength, frame);

    const elapsed = state.clock.elapsedTime;
    rig.position.copy(frame.position);
    rig.quaternion.setFromUnitVectors(FORWARD, frame.tangent);
    if (isMoving) {
      rig.position.y += Math.sin(elapsed * TWO_PI * HERO_CAR.bobFrequency) * HERO_CAR.bobAmplitude;
    }

    /* Breathing drift only — the shot itself stays locked to the car. */
    const drift = isMoving
      ? Math.sin(elapsed * TWO_PI * HERO_CAMERA.driftFrequency) * HERO_CAMERA.driftAmplitude
      : 0;

    scratch.eye
      .copy(frame.position)
      .addScaledVector(frame.tangent, HERO_CAMERA.forward)
      .addScaledVector(frame.side, HERO_CAMERA.lateral + drift)
      .addScaledVector(UP, HERO_CAMERA.height + drift * 0.5);
    scratch.focus
      .copy(frame.position)
      .addScaledVector(frame.side, HERO_CAMERA.lookLateralShift)
      .addScaledVector(UP, HERO_CAMERA.lookHeight);

    camera.position.copy(scratch.eye);
    camera.lookAt(scratch.focus);
  });

  return (
    <group ref={rigRef}>
      <SceneLighting shadowMapSize={quality.shadowMapSize} />
      <SingleSeater isMoving={isMoving} />

      {quality.reflection && (
        <group scale={[1, -1, 1]} position-y={REFLECTION_LIFT} renderOrder={REFLECTION_ORDER}>
          <SingleSeater isMoving={isMoving} opacity={HERO_CAR.reflectionOpacity} />
        </group>
      )}

      {quality.particles && <HeatHaze isMoving={isMoving} />}
    </group>
  );
}
