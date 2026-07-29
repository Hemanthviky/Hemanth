/** Feature-detects a usable WebGL context so the circuit can degrade to the
 * static milestone list instead of rendering a broken canvas. */
export function supportsWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
