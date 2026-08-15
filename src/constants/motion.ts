export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** How hard the page chases the real scroll position each frame. Lower glides
 * for longer; much below this and scrubbed sections start to feel detached
 * from the wheel rather than smooth. */
export const SMOOTH_SCROLL_LERP = 0.075;

/** Slightly under 1: the glide adds reach, so a raw wheel notch would
 * otherwise travel further than it does natively. */
export const SMOOTH_SCROLL_WHEEL_MULTIPLIER = 0.9;
