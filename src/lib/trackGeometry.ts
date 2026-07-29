import * as THREE from "three";
import { HERO_TRACK } from "@/constants/heroScene";

const UP = new THREE.Vector3(0, 1, 0);
/** Control points per corner arc — enough for the Catmull-Rom spline to hold a
 * clean radius without over-sampling the curve. */
const CORNER_POINTS = 6;

export interface ICurveFrame {
  position: THREE.Vector3;
  tangent: THREE.Vector3;
  side: THREE.Vector3;
}

export function createCurveFrame(): ICurveFrame {
  return { position: new THREE.Vector3(), tangent: new THREE.Vector3(), side: new THREE.Vector3() };
}

/** Reads the curve at `t` and derives the lateral axis, giving every consumer
 * (ribbon builder, car rig, chase camera) the same orthonormal frame. */
export function sampleCurveFrame(
  curve: THREE.CatmullRomCurve3,
  t: number,
  frame: ICurveFrame
): ICurveFrame {
  const wrapped = THREE.MathUtils.euclideanModulo(t, 1);
  curve.getPointAt(wrapped, frame.position);
  curve.getTangentAt(wrapped, frame.tangent);
  frame.side.copy(UP).cross(frame.tangent).normalize();
  return frame;
}

/** Closed stadium centreline: a long main straight along +Z, a sweeping corner
 * at each end, and a return leg offset in X. */
export function buildHeroCurve(): THREE.CatmullRomCurve3 {
  const { straightHalfLength, cornerRadius, returnOffset } = HERO_TRACK;
  const points: THREE.Vector3[] = [];

  const centerX = returnOffset / 2;
  const outer = centerX + cornerRadius;
  const inner = centerX - cornerRadius;

  /** Interior arc samples only — the straights already supply both endpoints,
   * and duplicated control points would give Catmull-Rom a zero-length tangent. */
  const arcInterior = (centerZ: number, startAngle: number) => {
    for (let i = 1; i < CORNER_POINTS; i++) {
      const angle = startAngle + (Math.PI * i) / CORNER_POINTS;
      points.push(
        new THREE.Vector3(
          centerX + Math.cos(angle) * cornerRadius,
          0,
          centerZ + Math.sin(angle) * cornerRadius
        )
      );
    }
  };

  points.push(new THREE.Vector3(outer, 0, -straightHalfLength));
  points.push(new THREE.Vector3(outer, 0, straightHalfLength));
  arcInterior(straightHalfLength, 0);
  points.push(new THREE.Vector3(inner, 0, straightHalfLength));
  points.push(new THREE.Vector3(inner, 0, -straightHalfLength));
  arcInterior(-straightHalfLength, Math.PI);

  return new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
}

/** Flat ribbon extruded along the centreline: two vertices per step offset
 * along the curve's lateral axis, with arc-length UVs so the asphalt tile
 * repeats evenly regardless of corner radius. */
export function buildRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  width: number,
  segments: number,
  uTiles: number
): THREE.BufferGeometry {
  const frame = createCurveFrame();
  const half = width / 2;
  const vertexCount = (segments + 1) * 2;
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    sampleCurveFrame(curve, i / segments, frame);
    const base = i * 6;
    const uvBase = i * 4;

    for (const [slot, sign] of [
      [0, -1],
      [1, 1],
    ] as const) {
      const offset = base + slot * 3;
      positions[offset] = frame.position.x + frame.side.x * half * sign;
      positions[offset + 1] = frame.position.y;
      positions[offset + 2] = frame.position.z + frame.side.z * half * sign;
      normals[offset + 1] = 1;
      uvs[uvBase + slot * 2] = (i / segments) * uTiles;
      uvs[uvBase + slot * 2 + 1] = slot;
    }

    if (i < segments) {
      /* Counter-clockwise seen from above, so the ribbon's front face points
       * up at the camera rather than being back-face culled into the void. */
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}
