"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import {
  CIRCUIT_BRIDGE_PILLAR_TS,
  CIRCUIT_COLORS,
  CIRCUIT_ENVIRONMENT_COLORS,
  CIRCUIT_GRANDSTANDS,
  CIRCUIT_SCENERY,
  CIRCUIT_TRACK_DRESSING,
} from "@/constants/circuit";
import {
  buildEdgeWallGeometry,
  createCurveFrame,
  findCornerRanges,
  findHeightRanges,
  sampleCurveFrame,
} from "@/lib/circuitGeometry";
import {
  createBarrierTexture,
  createCheckerTexture,
  createConcreteTexture,
  createCrowdTexture,
  createStartBannerTexture,
} from "@/lib/circuitTextures";

const PILLAR_SIZE = 0.7;
const PILLAR_DECK_GAP = 0.1;
const GRANDSTAND = { width: 4.5, height: 2.8, length: 16, roofThickness: 0.25, roofOverhang: 0.6 } as const;
const MARSHAL = { poleRadius: 0.035, poleHeight: 2.2, flagWidth: 0.55, flagHeight: 0.38 } as const;
const BANNER = { width: 1.7, height: 1.05, y: 1.55, postSpread: 0.62, postRadius: 0.045 } as const;

interface CircuitSceneryProps {
  curve: THREE.CatmullRomCurve3;
}

/** Trackside dressing: bridge pillars + guardrails, outer-corner barriers,
 * crowd-filled grandstands, marshal flag posts, the "Lights Out" start banner
 * and low-poly horizon hills. All low-detail context geometry — never focal. */
export function CircuitScenery({ curve }: CircuitSceneryProps) {
  const walls = useMemo(() => {
    const { guardrail, barrier, runoff } = CIRCUIT_TRACK_DRESSING;
    const { above } = findHeightRanges(curve, runoff.lowMax, runoff.highMin);
    const frame = createCurveFrame();
    const groundCorners = findCornerRanges(curve).filter((range) => {
      sampleCurveFrame(curve, (range.start + range.end) / 2, frame);
      return frame.position.y < barrier.maxY;
    });
    return {
      guardrails: above.flatMap((range) =>
        ([1, -1] as const).map((side) =>
          buildEdgeWallGeometry(curve, range, side, guardrail.offset, guardrail.height, guardrail.tile)
        )
      ),
      barriers: groundCorners.map((range) =>
        buildEdgeWallGeometry(
          curve,
          range,
          (range.sign * -1) as 1 | -1,
          barrier.offset,
          barrier.height,
          barrier.tile
        )
      ),
    };
  }, [curve]);

  const placements = useMemo(() => {
    const frame = createCurveFrame();
    const facingCar = () => Math.atan2(-frame.tangent.x, -frame.tangent.z);
    const beside = (t: number, lateral: number) => {
      sampleCurveFrame(curve, t, frame);
      const position = frame.position.clone().addScaledVector(frame.side, lateral);
      position.y = frame.position.y;
      return position;
    };

    const banner = {
      position: beside(CIRCUIT_SCENERY.startBanner.t, CIRCUIT_SCENERY.startBanner.side * CIRCUIT_SCENERY.startBanner.lateral),
      rotationY: facingCar(),
    };
    const marshals = CIRCUIT_SCENERY.marshalPosts.map(({ t, side, flag }) => ({
      position: beside(t, side * CIRCUIT_SCENERY.marshalLateral),
      rotationY: facingCar(),
      flag,
    }));
    const pillars = CIRCUIT_BRIDGE_PILLAR_TS.map((t) => {
      sampleCurveFrame(curve, t, frame);
      return { x: frame.position.x, z: frame.position.z, height: frame.position.y - PILLAR_DECK_GAP };
    }).filter((pillar) => pillar.height > 1);
    const stands = CIRCUIT_GRANDSTANDS.map(({ t, side, distance }) => {
      sampleCurveFrame(curve, t, frame);
      const position = frame.position.clone().addScaledVector(frame.side, side * distance);
      position.y = 0;
      return { position, rotationY: Math.atan2(frame.tangent.x, frame.tangent.z), side };
    });
    const hills = CIRCUIT_SCENERY.hills.map(({ angle, distance, width, height }) => ({
      position: new THREE.Vector3(Math.sin(angle) * distance, 0, Math.cos(angle) * distance),
      scale: new THREE.Vector3(width, height, width * 0.55),
    }));

    return { banner, marshals, pillars, stands, hills };
  }, [curve]);

  const textures = useMemo(
    () => ({
      barrier: createBarrierTexture(),
      concrete: createConcreteTexture(),
      crowd: createCrowdTexture(),
      flagChecker: createCheckerTexture(),
      banner: createStartBannerTexture(),
    }),
    []
  );

  useEffect(
    () => () => {
      Object.values(walls).forEach((group) => group.forEach((geometry) => geometry.dispose()));
      Object.values(textures).forEach((texture) => texture.dispose());
    },
    [walls, textures]
  );

  return (
    <group>
      {walls.guardrails.map((geometry, index) => (
        <mesh key={`rail-${index}`} geometry={geometry}>
          <meshStandardMaterial map={textures.concrete} roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {walls.barriers.map((geometry, index) => (
        <mesh key={`barrier-${index}`} geometry={geometry}>
          <meshStandardMaterial map={textures.barrier} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {placements.pillars.map((pillar, index) => (
        <mesh key={`pillar-${index}`} position={[pillar.x, pillar.height / 2, pillar.z]} castShadow receiveShadow>
          <boxGeometry args={[PILLAR_SIZE, pillar.height, PILLAR_SIZE]} />
          <meshStandardMaterial map={textures.concrete} roughness={0.95} />
        </mesh>
      ))}

      {placements.stands.map((stand, index) => (
        <group key={`stand-${index}`} position={stand.position} rotation-y={stand.rotationY}>
          <mesh position-y={GRANDSTAND.height / 2}>
            <boxGeometry args={[GRANDSTAND.width, GRANDSTAND.height, GRANDSTAND.length]} />
            <meshStandardMaterial color={CIRCUIT_ENVIRONMENT_COLORS.grandstandStructure} roughness={0.95} />
          </mesh>
          <mesh position-y={GRANDSTAND.height + GRANDSTAND.roofThickness / 2}>
            <boxGeometry
              args={[
                GRANDSTAND.width + GRANDSTAND.roofOverhang,
                GRANDSTAND.roofThickness,
                GRANDSTAND.length + GRANDSTAND.roofOverhang,
              ]}
            />
            <meshStandardMaterial color={CIRCUIT_ENVIRONMENT_COLORS.grandstandRoof} roughness={0.9} />
          </mesh>
          {/* tilted crowd plane on the track-facing side */}
          <group
            position={[-stand.side * (GRANDSTAND.width / 2 + 0.01), GRANDSTAND.height * 0.55, 0]}
            rotation-y={-stand.side * (Math.PI / 2)}
          >
            <mesh rotation-x={-0.35}>
              <planeGeometry args={[GRANDSTAND.length - 1, GRANDSTAND.height * 0.9]} />
              <meshStandardMaterial map={textures.crowd} roughness={1} />
            </mesh>
          </group>
        </group>
      ))}

      {placements.marshals.map((marshal, index) => (
        <group key={`marshal-${index}`} position={marshal.position} rotation-y={marshal.rotationY}>
          <mesh position-y={MARSHAL.poleHeight / 2} castShadow>
            <cylinderGeometry args={[MARSHAL.poleRadius, MARSHAL.poleRadius, MARSHAL.poleHeight, 8]} />
            <meshStandardMaterial color={CIRCUIT_ENVIRONMENT_COLORS.grandstandStructure} roughness={0.7} />
          </mesh>
          <mesh position={[MARSHAL.flagWidth / 2 + MARSHAL.poleRadius, MARSHAL.poleHeight - MARSHAL.flagHeight / 2, 0]}>
            <planeGeometry args={[MARSHAL.flagWidth, MARSHAL.flagHeight]} />
            {marshal.flag === "checker" ? (
              <meshStandardMaterial map={textures.flagChecker} roughness={0.9} side={THREE.DoubleSide} />
            ) : (
              <meshStandardMaterial color={CIRCUIT_COLORS.accent} roughness={0.9} side={THREE.DoubleSide} />
            )}
          </mesh>
        </group>
      ))}

      {/* decorative "Lights Out" start bookend, mirroring the finish checker */}
      <group position={placements.banner.position} rotation-y={placements.banner.rotationY}>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * BANNER.postSpread, BANNER.y / 2, 0]} castShadow>
            <cylinderGeometry args={[BANNER.postRadius, BANNER.postRadius, BANNER.y, 8]} />
            <meshStandardMaterial color={CIRCUIT_COLORS.carDark} roughness={0.6} metalness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, BANNER.y + BANNER.height / 2 - 0.1, 0]} castShadow>
          <planeGeometry args={[BANNER.width, BANNER.height]} />
          <meshStandardMaterial map={textures.banner} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {placements.hills.map((hill, index) => (
        <mesh key={`hill-${index}`} position={hill.position} scale={hill.scale}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshStandardMaterial color={CIRCUIT_ENVIRONMENT_COLORS.hill} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
