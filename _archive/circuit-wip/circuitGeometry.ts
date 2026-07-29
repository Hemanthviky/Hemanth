import * as THREE from "three";
import { CIRCUIT_TRACK } from "@/constants/circuit";

const UP = new THREE.Vector3(0, 1, 0);
const TWO_PI = Math.PI * 2;

/** The lap starts at the lower, ground-level pass of the figure-eight, so the
 * drive opens under the flyover and finishes back beneath it a lap later. */
const START_U = Math.PI / 2;
const BRIDGE_U = Math.PI * 1.5;

const CORNER_SAMPLES = 400;
const CORNER_THRESHOLD_RATIO = 1.45;
const CORNER_PADDING = 0.008;
const CORNER_MERGE_GAP = 0.012;
const CORNER_MIN_SPAN = 0.015;
const EDGE_MIN_SEGMENTS = 8;

export interface ICurveFrame {
  position: THREE.Vector3;
  tangent: THREE.Vector3;
  /** Horizontal left-hand vector (up x tangent) — the ribbon stays flat. */
  side: THREE.Vector3;
}

export interface ICurveRange {
  start: number;
  end: number;
}

export interface ICornerRange extends ICurveRange {
  /** Turn direction: +1 turns left (inside is the +side direction), -1 right. */
  sign: 1 | -1;
}

export function createCurveFrame(): ICurveFrame {
  return { position: new THREE.Vector3(), tangent: new THREE.Vector3(), side: new THREE.Vector3() };
}

function angularDistance(a: number, b: number): number {
  const distance = Math.abs(a - b) % TWO_PI;
  return distance > Math.PI ? TWO_PI - distance : distance;
}

/** Figure-eight centreline inspired by a crossover circuit. A lemniscate gives
 * the self-intersection for free; the radial wobble breaks the mathematical
 * symmetry into something organic (it scales toward the origin, so the
 * crossover point stays exact); a gaussian bump lifts one of the two origin
 * passes into the flyover bridge. */
export function buildCircuitCurve(): THREE.CatmullRomCurve3 {
  const { controlPoints, xRadius, zStretch, bridgeHeight, bridgeSigma } = CIRCUIT_TRACK;
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < controlPoints; i++) {
    const u = START_U + (i / controlPoints) * TWO_PI;
    const denominator = 1 + Math.sin(u) ** 2;
    const wobble = 1 + 0.07 * Math.sin(3 * u + 2.1) + 0.05 * Math.cos(5 * u + 0.6);
    const x = ((xRadius * Math.cos(u)) / denominator) * wobble;
    const z = ((xRadius * Math.sin(u) * Math.cos(u)) / denominator) * zStretch * wobble;
    const fromBridge = angularDistance(u, BRIDGE_U);
    const y = bridgeHeight * Math.exp(-(fromBridge * fromBridge) / (2 * bridgeSigma * bridgeSigma));
    points.push(new THREE.Vector3(x, y, z));
  }

  return new THREE.CatmullRomCurve3(points, true, "centripetal");
}

/** Arc-length position/tangent/side at t, written into a reusable frame so the
 * render loop allocates nothing. */
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

/** Flat ribbon extruded along the curve: two vertices per step offset along the
 * horizontal side vector, with u following arc length (for the repeating lane
 * texture) and v spanning the width. */
export function buildRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  width: number,
  segments: number,
  uTiles: number
): THREE.BufferGeometry {
  const frame = createCurveFrame();
  const normal = new THREE.Vector3();
  const half = width / 2;
  const positions = new Float32Array((segments + 1) * 6);
  const normals = new Float32Array((segments + 1) * 6);
  const uvs = new Float32Array((segments + 1) * 4);
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    sampleCurveFrame(curve, t, frame);
    normal.copy(frame.tangent).cross(frame.side).normalize();

    const p = i * 6;
    positions[p] = frame.position.x + frame.side.x * half;
    positions[p + 1] = frame.position.y + frame.side.y * half;
    positions[p + 2] = frame.position.z + frame.side.z * half;
    positions[p + 3] = frame.position.x - frame.side.x * half;
    positions[p + 4] = frame.position.y - frame.side.y * half;
    positions[p + 5] = frame.position.z - frame.side.z * half;
    for (let axis = 0; axis < 3; axis++) {
      normals[p + axis] = normal.getComponent(axis);
      normals[p + 3 + axis] = normal.getComponent(axis);
    }

    const uv = i * 4;
    uvs[uv] = t * uTiles;
    uvs[uv + 1] = 0;
    uvs[uv + 2] = t * uTiles;
    uvs[uv + 3] = 1;

    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

/** Narrow strip hugging one edge of the track over a t range — used for the
 * red/white kerbs through corners. UVs advance in world units so the stripe
 * texture keeps a constant physical length. */
export function buildEdgeStripGeometry(
  curve: THREE.CatmullRomCurve3,
  range: ICurveRange,
  sideSign: 1 | -1,
  innerOffset: number,
  width: number,
  lift: number,
  tileLength: number
): THREE.BufferGeometry {
  const frame = createCurveFrame();
  const curveLength = curve.getLength();
  const span = range.end - range.start;
  const segments = Math.max(EDGE_MIN_SEGMENTS, Math.ceil(span * CIRCUIT_TRACK.segments));
  const positions = new Float32Array((segments + 1) * 6);
  const normals = new Float32Array((segments + 1) * 6);
  const uvs = new Float32Array((segments + 1) * 4);
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = range.start + (span * i) / segments;
    sampleCurveFrame(curve, t, frame);

    const p = i * 6;
    const inner = sideSign * innerOffset;
    const outer = sideSign * (innerOffset + width);
    positions[p] = frame.position.x + frame.side.x * inner;
    positions[p + 1] = frame.position.y + lift;
    positions[p + 2] = frame.position.z + frame.side.z * inner;
    positions[p + 3] = frame.position.x + frame.side.x * outer;
    positions[p + 4] = frame.position.y + lift;
    positions[p + 5] = frame.position.z + frame.side.z * outer;
    normals.set([0, 1, 0, 0, 1, 0], p);

    const uv = i * 4;
    const u = ((t - range.start) * curveLength) / tileLength;
    uvs[uv] = u;
    uvs[uv + 1] = 0;
    uvs[uv + 2] = u;
    uvs[uv + 3] = 1;

    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

/** Finds the t ranges where the track actually turns (heading change above the
 * lap average) so kerbs appear only through corners, not down the straights.
 * Each range also carries its dominant turn direction — used to lay rubber
 * lines on the inside and barriers on the outside of the corner. */
export function findCornerRanges(curve: THREE.CatmullRomCurve3): ICornerRange[] {
  const tangents: THREE.Vector3[] = [];
  for (let i = 0; i < CORNER_SAMPLES; i++) {
    tangents.push(curve.getTangentAt(i / CORNER_SAMPLES).setY(0).normalize());
  }
  const turns = tangents.map((tangent, i) => tangent.angleTo(tangents[(i + 1) % CORNER_SAMPLES]));
  const crosses = tangents.map((tangent, i) => {
    const next = tangents[(i + 1) % CORNER_SAMPLES];
    return tangent.z * next.x - tangent.x * next.z;
  });
  const mean = turns.reduce((sum, turn) => sum + turn, 0) / CORNER_SAMPLES;
  const threshold = mean * CORNER_THRESHOLD_RATIO;

  interface IRawRange extends ICurveRange {
    cross: number;
  }
  const raw: IRawRange[] = [];
  let open: IRawRange | null = null;
  turns.forEach((turn, i) => {
    const t = i / CORNER_SAMPLES;
    if (turn > threshold) {
      if (open) {
        open.end = t;
        open.cross += crosses[i];
      } else {
        open = { start: t, end: t, cross: crosses[i] };
        raw.push(open);
      }
    } else {
      open = null;
    }
  });

  const merged: IRawRange[] = [];
  raw.forEach((range) => {
    const previous = merged[merged.length - 1];
    if (previous && range.start - previous.end < CORNER_MERGE_GAP) {
      previous.end = range.end;
      previous.cross += range.cross;
    } else {
      merged.push({ ...range });
    }
  });

  return merged
    .map<ICornerRange>((range) => ({
      start: Math.max(0, range.start - CORNER_PADDING),
      end: Math.min(1, range.end + CORNER_PADDING),
      sign: range.cross >= 0 ? 1 : -1,
    }))
    .filter((range) => range.end - range.start >= CORNER_MIN_SPAN);
}

/** Splits the lap into ranges by deck elevation: `below` (ground level — gets
 * green/gravel runoff) and `above` (the flyover — gets guardrails). The band
 * between the two thresholds (the ramps) deliberately gets neither. */
export function findHeightRanges(
  curve: THREE.CatmullRomCurve3,
  lowMax: number,
  highMin: number
): { below: ICurveRange[]; above: ICurveRange[] } {
  const heights: number[] = [];
  for (let i = 0; i < CORNER_SAMPLES; i++) {
    heights.push(curve.getPointAt(i / CORNER_SAMPLES).y);
  }

  const collect = (flags: boolean[]): ICurveRange[] => {
    const ranges: ICurveRange[] = [];
    let open: ICurveRange | null = null;
    flags.forEach((flag, i) => {
      const t = i / CORNER_SAMPLES;
      if (flag) {
        if (open) {
          open.end = t;
        } else {
          open = { start: t, end: t };
          ranges.push(open);
        }
      } else {
        open = null;
      }
    });
    return ranges.filter((range) => range.end - range.start >= CORNER_MIN_SPAN);
  };

  return {
    below: collect(heights.map((y) => y < lowMax)),
    above: collect(heights.map((y) => y > highMin)),
  };
}

/** Vertical ribbon along one edge of the track over a t range — a low wall.
 * Used for the bridge guardrails and the concrete barriers behind runoff. */
export function buildEdgeWallGeometry(
  curve: THREE.CatmullRomCurve3,
  range: ICurveRange,
  sideSign: 1 | -1,
  offset: number,
  height: number,
  tileLength: number
): THREE.BufferGeometry {
  const frame = createCurveFrame();
  const curveLength = curve.getLength();
  const span = range.end - range.start;
  const segments = Math.max(EDGE_MIN_SEGMENTS, Math.ceil(span * CIRCUIT_TRACK.segments));
  const positions = new Float32Array((segments + 1) * 6);
  const normals = new Float32Array((segments + 1) * 6);
  const uvs = new Float32Array((segments + 1) * 4);
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = range.start + (span * i) / segments;
    sampleCurveFrame(curve, t, frame);

    const p = i * 6;
    const lateral = sideSign * offset;
    const x = frame.position.x + frame.side.x * lateral;
    const z = frame.position.z + frame.side.z * lateral;
    positions[p] = x;
    positions[p + 1] = frame.position.y;
    positions[p + 2] = z;
    positions[p + 3] = x;
    positions[p + 4] = frame.position.y + height;
    positions[p + 5] = z;
    const nx = frame.side.x * sideSign;
    const nz = frame.side.z * sideSign;
    normals.set([nx, 0, nz, nx, 0, nz], p);

    const uv = i * 4;
    const u = ((t - range.start) * curveLength) / tileLength;
    uvs[uv] = u;
    uvs[uv + 1] = 0;
    uvs[uv + 2] = u;
    uvs[uv + 3] = 1;

    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}
