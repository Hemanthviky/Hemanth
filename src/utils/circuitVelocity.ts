import {
  CIRCUIT_ACCEL_LIMIT,
  CIRCUIT_BRAKE_LIMIT,
  CIRCUIT_GRIP,
  CIRCUIT_IDLE_SPEED,
  CIRCUIT_TOP_SPEED,
  CIRCUIT_VELOCITY_SAMPLES,
} from "@/constants/circuit";
import type {
  ICircuitLapSample,
  ICircuitPoint,
  ICircuitVelocityProfile,
} from "@/types/experience";

interface ICornerLimit {
  progress: number;
  speed: number;
}

/** Menger curvature: 1/R of the circle through three samples. Zero down a
 * straight, large through a hairpin. */
function curvature(a: ICircuitPoint, b: ICircuitPoint, c: ICircuitPoint) {
  const ab = Math.hypot(b.x - a.x, b.y - a.y);
  const bc = Math.hypot(c.x - b.x, c.y - b.y);
  const ca = Math.hypot(a.x - c.x, a.y - c.y);
  const area = Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;
  const denominator = ab * bc * ca;

  return denominator === 0 ? 0 : (4 * area) / denominator;
}

/** Index of the last key at or below `x`, by bisection. Both tables this is
 * used on are monotonically increasing. */
function lowerBound(keys: number[], x: number) {
  let low = 0;
  let high = keys.length - 1;
  while (high - low > 1) {
    const mid = (low + high) >> 1;
    if (keys[mid] <= x) low = mid;
    else high = mid;
  }
  return low;
}

function interpolate(keys: number[], values: number[], x: number) {
  if (x <= keys[0]) return values[0];
  const last = keys.length - 1;
  if (x >= keys[last]) return values[last];

  const i = lowerBound(keys, x);
  const span = keys[i + 1] - keys[i];
  const t = span === 0 ? 0 : (x - keys[i]) / span;

  return values[i] + (values[i + 1] - values[i]) * t;
}

/**
 * Builds a racing-line speed profile for the track and inverts it into a
 * time → position lookup.
 *
 * Three passes, the same shape a lap simulator uses:
 *   1. a cornering limit from local curvature, `v = sqrt(grip / curvature)`,
 *      with each career corner pinned to its documented apex speed;
 *   2. a forward pass capping how fast speed may build, which is what turns
 *      a corner exit into a progressive slingshot rather than a jump;
 *   3. a backward pass capping how fast it may be shed, which lays a braking
 *      zone *before* every corner instead of at it.
 *
 * Integrating distance ÷ speed then gives elapsed time along the lap. Scroll
 * drives that time, so the car covers ground fast where the track is straight
 * and crawls where it bends — no per-corner timing to hand-author.
 */
export function buildCircuitVelocityProfile(
  path: SVGPathElement,
  corners: ICornerLimit[]
): ICircuitVelocityProfile {
  const samples = CIRCUIT_VELOCITY_SAMPLES;
  const totalLength = path.getTotalLength();
  const step = totalLength / samples;
  const points = Array.from({ length: samples + 1 }, (_, i) => path.getPointAtLength(i * step));

  const speed = points.map((_, i) => {
    const bend = curvature(points[Math.max(0, i - 1)], points[i], points[Math.min(samples, i + 1)]);
    return bend === 0 ? CIRCUIT_TOP_SPEED : Math.min(CIRCUIT_TOP_SPEED, Math.sqrt(CIRCUIT_GRIP / bend));
  });

  corners.forEach((corner) => {
    const i = Math.round(corner.progress * samples);
    speed[i] = Math.min(speed[i], corner.speed);
  });

  speed[0] = Math.min(speed[0], CIRCUIT_IDLE_SPEED);
  for (let i = 1; i <= samples; i++) {
    speed[i] = Math.min(speed[i], Math.sqrt(speed[i - 1] ** 2 + 2 * CIRCUIT_ACCEL_LIMIT * step));
  }
  for (let i = samples - 1; i >= 0; i--) {
    speed[i] = Math.min(speed[i], Math.sqrt(speed[i + 1] ** 2 + 2 * CIRCUIT_BRAKE_LIMIT * step));
  }

  const time = [0];
  for (let i = 1; i <= samples; i++) {
    time[i] = time[i - 1] + step / ((speed[i - 1] + speed[i]) / 2);
  }
  const lap = time[samples];
  const normalisedTime = time.map((t) => t / lap);
  const progress = points.map((_, i) => i / samples);

  return {
    sample(t: number): ICircuitLapSample {
      return {
        progress: interpolate(normalisedTime, progress, t),
        speed: interpolate(normalisedTime, speed, t),
      };
    },
    timeAt(p: number) {
      return interpolate(progress, normalisedTime, p);
    },
  };
}
