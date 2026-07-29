"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  CIRCUIT_CAMERA,
  CIRCUIT_CAR,
  CIRCUIT_LIGHT,
  CIRCUIT_MARKER,
  CIRCUIT_MILESTONE_TS,
  CIRCUIT_PROGRESS_LAMBDA,
} from "@/constants/circuit";
import { createCurveFrame, sampleCurveFrame } from "@/lib/circuitGeometry";
import type { ICircuitHandles, ICircuitProgress } from "@/types/experience";

const UP = new THREE.Vector3(0, 1, 0);
const MAX_DELTA = 0.1;
const CAR_TURN_LAMBDA = 8;
const MARKER_GLOW_LAMBDA = 6;
const CURRENT_PULSE_SPEED = 2.6;

interface SceneDirectorProps {
  curve: THREE.CatmullRomCurve3;
  progress: ICircuitProgress;
  handles: ICircuitHandles;
  currentIndex: number;
}

/** Single frame-loop conductor: damps the raw scroll progress into a smoothed
 * lap position, then drives the car, wheels, chase camera, sun and marker
 * glow from that one value. Runs entirely inside useFrame — scroll updates
 * never touch React state. */
export function SceneDirector({ curve, progress, handles, currentIndex }: SceneDirectorProps) {
  const state = useRef({ initialized: false, t: 0, previousT: 0, wheelAngle: 0, roll: 0 });
  const curveLength = useMemo(() => curve.getLength(), [curve]);
  const temp = useMemo(
    () => ({
      frame: createCurveFrame(),
      aheadTangent: new THREE.Vector3(),
      flatTangent: new THREE.Vector3(),
      cameraGoal: new THREE.Vector3(),
      lookGoal: new THREE.Vector3(),
      smoothedLook: new THREE.Vector3(),
      focus: new THREE.Vector3(),
      facing: new THREE.Matrix4(),
      facingQuaternion: new THREE.Quaternion(),
    }),
    []
  );

  useFrame(({ camera, clock }, delta) => {
    const { car, wheels, markerMaterials, light, lightTarget } = handles;
    if (!car) return;
    const s = state.current;
    const dt = Math.min(delta, MAX_DELTA);

    s.t = s.initialized
      ? THREE.MathUtils.damp(s.t, progress.target, CIRCUIT_PROGRESS_LAMBDA, dt)
      : progress.target;
    const t = THREE.MathUtils.clamp(s.t, 0, 1);
    const { frame } = temp;
    sampleCurveFrame(curve, t, frame);

    // Car: exact curve position; heading slerped toward the tangent so corners
    // never snap.
    car.position.copy(frame.position);
    temp.focus.copy(frame.position).add(frame.tangent);
    temp.facing.lookAt(temp.focus, frame.position, UP);
    temp.facingQuaternion.setFromRotationMatrix(temp.facing);
    if (s.initialized) {
      car.quaternion.slerp(temp.facingQuaternion, 1 - Math.exp(-CAR_TURN_LAMBDA * dt));
    } else {
      car.quaternion.copy(temp.facingQuaternion);
    }

    // Wheels roll with travelled distance — backwards when scrolling up.
    const travelled = (t - s.previousT) * curveLength;
    s.previousT = t;
    s.wheelAngle -= travelled / CIRCUIT_CAR.wheelRadius;
    wheels.forEach((wheel) => {
      if (wheel) wheel.rotation.x = s.wheelAngle;
    });

    // Chase camera: trails behind and above with lag, looks down the track
    // ahead, and banks gently into corners.
    temp.flatTangent.set(frame.tangent.x, 0, frame.tangent.z).normalize();
    temp.cameraGoal.copy(frame.position).addScaledVector(temp.flatTangent, -CIRCUIT_CAMERA.distance);
    temp.cameraGoal.y = frame.position.y + CIRCUIT_CAMERA.height;

    const lookT = Math.min(t + CIRCUIT_CAMERA.lookAheadUnits / curveLength, 1);
    curve.getPointAt(THREE.MathUtils.euclideanModulo(lookT, 1), temp.lookGoal);
    temp.lookGoal.y += CIRCUIT_CAMERA.lookAheadLift;

    if (s.initialized) {
      camera.position.lerp(temp.cameraGoal, 1 - Math.exp(-CIRCUIT_CAMERA.positionLambda * dt));
      temp.smoothedLook.lerp(temp.lookGoal, 1 - Math.exp(-CIRCUIT_CAMERA.targetLambda * dt));
    } else {
      camera.position.copy(temp.cameraGoal);
      temp.smoothedLook.copy(temp.lookGoal);
    }
    camera.up.copy(UP);
    camera.lookAt(temp.smoothedLook);

    const probeT = Math.min(t + CIRCUIT_CAMERA.rollProbeUnits / curveLength, 1);
    curve.getTangentAt(THREE.MathUtils.euclideanModulo(probeT, 1), temp.aheadTangent);
    const turn = frame.tangent.z * temp.aheadTangent.x - frame.tangent.x * temp.aheadTangent.z;
    const rollGoal = THREE.MathUtils.clamp(
      turn * CIRCUIT_CAMERA.rollGain,
      -CIRCUIT_CAMERA.maxRoll,
      CIRCUIT_CAMERA.maxRoll
    );
    s.roll = THREE.MathUtils.damp(s.roll, rollGoal, CIRCUIT_CAMERA.rollLambda, dt);
    camera.rotateZ(s.roll);

    // The sun follows the car so the shadow frustum stays tight and the
    // contact shadow stays crisp.
    if (light) {
      light.position.set(
        frame.position.x + CIRCUIT_LIGHT.offset[0],
        frame.position.y + CIRCUIT_LIGHT.offset[1],
        frame.position.z + CIRCUIT_LIGHT.offset[2]
      );
      lightTarget.position.copy(frame.position);
      lightTarget.updateMatrixWorld();
    }

    // Pit boards ramp from dim to lit as the car reaches them; the current
    // role keeps a breathing accent pulse once passed.
    markerMaterials.forEach((material, index) => {
      if (!material) return;
      const milestoneT = CIRCUIT_MILESTONE_TS[index];
      const reach = THREE.MathUtils.smoothstep(t, milestoneT - CIRCUIT_MARKER.rampSpan, milestoneT);
      const lit =
        index === currentIndex ? CIRCUIT_MARKER.currentEmissive : CIRCUIT_MARKER.passedEmissive;
      let glowGoal = THREE.MathUtils.lerp(CIRCUIT_MARKER.baseEmissive, lit, reach);
      if (index === currentIndex && reach === 1) {
        glowGoal +=
          CIRCUIT_MARKER.pulseAmplitude *
          (0.5 + 0.5 * Math.sin(clock.elapsedTime * CURRENT_PULSE_SPEED));
      }
      material.emissiveIntensity = THREE.MathUtils.damp(
        material.emissiveIntensity,
        glowGoal,
        MARKER_GLOW_LAMBDA,
        dt
      );
    });

    s.initialized = true;
  });

  return null;
}
