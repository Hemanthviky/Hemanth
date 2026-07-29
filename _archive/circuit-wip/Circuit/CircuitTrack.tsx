"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import {
  CIRCUIT_ENVIRONMENT_COLORS,
  CIRCUIT_FINISH_T,
  CIRCUIT_COLORS,
  CIRCUIT_TRACK,
  CIRCUIT_TRACK_DRESSING,
} from "@/constants/circuit";
import {
  buildEdgeStripGeometry,
  buildRibbonGeometry,
  createCurveFrame,
  findCornerRanges,
  findHeightRanges,
  sampleCurveFrame,
} from "@/lib/circuitGeometry";
import { createCheckerTexture, createCurbTexture, createGravelTexture, createTarmacTexture } from "@/lib/circuitTextures";

const GROUND_RADIUS = 170;
const GROUND_Y = -0.06;
const FINISH_STRIP_DEPTH = 1.15;
const FINISH_AO_LIFT = -0.012;
const FINISH_PYLON = { size: 0.24, height: 1.1 } as const;

interface CircuitTrackProps {
  curve: THREE.CatmullRomCurve3;
}

/** Racing surfaces derived from the centreline: asphalt ribbon, corner kerbs,
 * inside-line rubber darkening, the green/gravel runoff bands (ground-level
 * sections only), the checkered finish strip and the ground field. Structural
 * and decorative dressing lives in CircuitScenery. */
export function CircuitTrack({ curve }: CircuitTrackProps) {
  const ribbonGeometry = useMemo(
    () => buildRibbonGeometry(curve, CIRCUIT_TRACK.width, CIRCUIT_TRACK.segments, CIRCUIT_TRACK.laneTiles),
    [curve]
  );

  const strips = useMemo(() => {
    const half = CIRCUIT_TRACK.width / 2;
    const corners = findCornerRanges(curve);
    const { runoff, rubber } = CIRCUIT_TRACK_DRESSING;
    const { below } = findHeightRanges(curve, runoff.lowMax, runoff.highMin);
    const greenOffset = half + runoff.gap;
    const gravelOffset = greenOffset + runoff.greenWidth;

    return {
      kerbs: corners.flatMap((range) =>
        ([1, -1] as const).map((side) =>
          buildEdgeStripGeometry(
            curve,
            range,
            side,
            half + CIRCUIT_TRACK.curbInset,
            CIRCUIT_TRACK.curbWidth,
            CIRCUIT_TRACK.curbLift,
            CIRCUIT_TRACK.curbTileLength
          )
        )
      ),
      rubber: corners.map((range) =>
        buildEdgeStripGeometry(curve, range, range.sign, rubber.offset, rubber.width, rubber.lift, 1)
      ),
      green: below.flatMap((range) =>
        ([1, -1] as const).map((side) =>
          buildEdgeStripGeometry(curve, range, side, greenOffset, runoff.greenWidth, runoff.greenLift, 1)
        )
      ),
      gravel: below.flatMap((range) =>
        ([1, -1] as const).map((side) =>
          buildEdgeStripGeometry(
            curve,
            range,
            side,
            gravelOffset,
            runoff.gravelWidth,
            runoff.gravelLift,
            runoff.gravelTile
          )
        )
      ),
    };
  }, [curve]);

  const tarmacTexture = useMemo(() => createTarmacTexture(CIRCUIT_TRACK.laneTiles), []);
  const curbTexture = useMemo(() => createCurbTexture(), []);
  const gravelTexture = useMemo(() => createGravelTexture(), []);
  const checkerTexture = useMemo(() => createCheckerTexture(), []);

  const finish = useMemo(() => {
    const frame = createCurveFrame();
    sampleCurveFrame(curve, CIRCUIT_FINISH_T, frame);
    return {
      position: new THREE.Vector3(frame.position.x, frame.position.y + 0.02, frame.position.z),
      rotationY: Math.atan2(frame.tangent.x, frame.tangent.z),
    };
  }, [curve]);

  useEffect(
    () => () => {
      ribbonGeometry.dispose();
      Object.values(strips).forEach((group) => group.forEach((geometry) => geometry.dispose()));
      [tarmacTexture, curbTexture, gravelTexture, checkerTexture].forEach((texture) => texture.dispose());
    },
    [ribbonGeometry, strips, tarmacTexture, curbTexture, gravelTexture, checkerTexture]
  );

  return (
    <group>
      {/* asphalt ribbon — casts too, so the flyover shades the road beneath it */}
      <mesh geometry={ribbonGeometry} receiveShadow castShadow>
        <meshStandardMaterial map={tarmacTexture} roughness={0.94} metalness={0} side={THREE.DoubleSide} />
      </mesh>

      {strips.kerbs.map((geometry, index) => (
        <mesh key={`kerb-${index}`} geometry={geometry} receiveShadow>
          <meshStandardMaterial map={curbTexture} roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* rubbered-in racing line hugging each corner's inside */}
      {strips.rubber.map((geometry, index) => (
        <mesh key={`rubber-${index}`} geometry={geometry}>
          <meshStandardMaterial
            color={CIRCUIT_COLORS.carDark}
            transparent
            opacity={CIRCUIT_TRACK_DRESSING.rubber.opacity}
            depthWrite={false}
            roughness={1}
          />
        </mesh>
      ))}

      {strips.green.map((geometry, index) => (
        <mesh key={`green-${index}`} geometry={geometry} receiveShadow>
          <meshStandardMaterial color={CIRCUIT_ENVIRONMENT_COLORS.runoffGreen} roughness={1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {strips.gravel.map((geometry, index) => (
        <mesh key={`gravel-${index}`} geometry={geometry} receiveShadow>
          <meshStandardMaterial map={gravelTexture} roughness={1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* finish strip: soft AO shadow underneath so it reads as painted-on */}
      <group position={finish.position} rotation-y={finish.rotationY}>
        <mesh rotation-x={-Math.PI / 2} position-y={FINISH_AO_LIFT}>
          <planeGeometry args={[CIRCUIT_TRACK.width + 0.9, FINISH_STRIP_DEPTH + 0.5]} />
          <meshBasicMaterial color={CIRCUIT_COLORS.carDark} transparent opacity={0.14} depthWrite={false} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[CIRCUIT_TRACK.width + 0.4, FINISH_STRIP_DEPTH]} />
          <meshStandardMaterial map={checkerTexture} roughness={0.8} polygonOffset polygonOffsetFactor={-1} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * (CIRCUIT_TRACK.width / 2 + 0.5), FINISH_PYLON.height / 2, 0]} castShadow>
            <boxGeometry args={[FINISH_PYLON.size, FINISH_PYLON.height, FINISH_PYLON.size]} />
            <meshStandardMaterial color={CIRCUIT_COLORS.accent} roughness={0.5} />
          </mesh>
        ))}
      </group>

      <mesh rotation-x={-Math.PI / 2} position-y={GROUND_Y} receiveShadow>
        <circleGeometry args={[GROUND_RADIUS, 48]} />
        <meshStandardMaterial color={CIRCUIT_ENVIRONMENT_COLORS.ground} roughness={1} />
      </mesh>
    </group>
  );
}
