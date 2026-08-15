import type { ICircuitPoint } from "@/types/experience";

const PATH_SAMPLES = 600;

/** Fractional position along `path` of each point, found by walking the curve.
 * Keeps authored marker coordinates and scroll thresholds in sync with the
 * drawn geometry, so the path can be reshaped without re-measuring by hand. */
export function samplePathProgress(path: SVGPathElement, points: ICircuitPoint[]): number[] {
  const total = path.getTotalLength();
  const samples = Array.from({ length: PATH_SAMPLES + 1 }, (_, i) =>
    path.getPointAtLength((i / PATH_SAMPLES) * total)
  );

  return points.map((point) => {
    let bestIndex = 0;
    let bestDistance = Infinity;

    samples.forEach((sample, i) => {
      const distance = (sample.x - point.x) ** 2 + (sample.y - point.y) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    });

    return bestIndex / PATH_SAMPLES;
  });
}
