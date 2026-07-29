/** Hermite smoothstep clamped to [0,1] — DOM-side twin of
 * THREE.MathUtils.smoothstep, kept dependency-free so the scroll/overlay bundle
 * never pulls in three.js. */
export function smoothstep(edge0: number, edge1: number, value: number): number {
  const x = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return x * x * (3 - 2 * x);
}
