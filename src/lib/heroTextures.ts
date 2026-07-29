import * as THREE from "three";
import { SCENE_COLORS } from "@/constants/heroScene";

const ASPHALT_SIZE = 256;
const ASPHALT_GRAIN_DOTS = 1500;
const EDGE_LINE_INSET = 9;
const EDGE_LINE_WIDTH = 4;
const CENTRE_DASH_LENGTH = 44;
const CENTRE_DASH_GAP = 84;
const CARBON_SIZE = 128;
const CARBON_CELL = 16;
const CARBON_NORMAL_STRENGTH = 2.4;
const TREAD_SIZE = 64;
const TREAD_GROOVES = [12, 26, 38, 52];

function createContext(size: number): CanvasRenderingContext2D {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("2D canvas context unavailable");
  return context;
}

function toColorTexture(context: CanvasRenderingContext2D): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(context.canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function scatterGrain(
  context: CanvasRenderingContext2D,
  size: number,
  count: number,
  light: string,
  dark: string
): void {
  for (let i = 0; i < count; i++) {
    context.fillStyle = Math.random() < 0.5 ? light : dark;
    context.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }
}

/** Asphalt tile: dark base, fine grain for roughness variation, thin worn white
 * lane lines along both edges and a dashed centre line. Tiles along the
 * ribbon's arc-length U axis. */
export function createAsphaltTexture(repeatX: number): THREE.CanvasTexture {
  const context = createContext(ASPHALT_SIZE);
  context.fillStyle = SCENE_COLORS.asphalt;
  context.fillRect(0, 0, ASPHALT_SIZE, ASPHALT_SIZE);

  scatterGrain(context, ASPHALT_SIZE, ASPHALT_GRAIN_DOTS, "rgba(255,255,255,0.035)", "rgba(0,0,0,0.09)");

  context.fillStyle = SCENE_COLORS.laneLine;
  context.globalAlpha = 0.55;
  context.fillRect(0, EDGE_LINE_INSET, ASPHALT_SIZE, EDGE_LINE_WIDTH);
  context.fillRect(0, ASPHALT_SIZE - EDGE_LINE_INSET - EDGE_LINE_WIDTH, ASPHALT_SIZE, EDGE_LINE_WIDTH);

  context.globalAlpha = 0.4;
  for (let x = 0; x < ASPHALT_SIZE; x += CENTRE_DASH_LENGTH + CENTRE_DASH_GAP) {
    context.fillRect(x, ASPHALT_SIZE / 2 - 2, CENTRE_DASH_LENGTH, 4);
  }
  context.globalAlpha = 1;

  const texture = toColorTexture(context);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = repeatX;
  return texture;
}

/** Grayscale 2×2 twill height field — the basis for the carbon normal map. */
function drawCarbonWeave(context: CanvasRenderingContext2D): void {
  const cells = CARBON_SIZE / CARBON_CELL;
  for (let row = 0; row < cells; row++) {
    for (let column = 0; column < cells; column++) {
      /* Twill offset: each row shifts the over/under pattern by one cell. */
      const isWarpOver = (column + row) % 2 === 0;
      const x = column * CARBON_CELL;
      const y = row * CARBON_CELL;
      const gradient = isWarpOver
        ? context.createLinearGradient(x, y, x + CARBON_CELL, y)
        : context.createLinearGradient(x, y, x, y + CARBON_CELL);
      gradient.addColorStop(0, "#3c3c3c");
      gradient.addColorStop(0.5, "#d0d0d0");
      gradient.addColorStop(1, "#3c3c3c");
      context.fillStyle = gradient;
      context.fillRect(x, y, CARBON_CELL, CARBON_CELL);
    }
  }
}

/** Converts a height field to a tangent-space normal map with a Sobel pass.
 * Cheaper and sharper than shipping an image asset for a tiling weave. */
function heightToNormalTexture(source: CanvasRenderingContext2D, strength: number): THREE.CanvasTexture {
  const size = source.canvas.width;
  const height = source.getImageData(0, 0, size, size).data;
  const target = createContext(size);
  const output = target.createImageData(size, size);

  const heightAt = (x: number, y: number) => {
    const wrappedX = (x + size) % size;
    const wrappedY = (y + size) % size;
    return height[(wrappedY * size + wrappedX) * 4] / 255;
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = heightAt(x - 1, y) - heightAt(x + 1, y);
      const dy = heightAt(x, y - 1) - heightAt(x, y + 1);
      const length = Math.hypot(dx * strength, dy * strength, 1);
      const index = (y * size + x) * 4;
      output.data[index] = ((dx * strength) / length) * 127.5 + 127.5;
      output.data[index + 1] = ((dy * strength) / length) * 127.5 + 127.5;
      output.data[index + 2] = (1 / length) * 127.5 + 127.5;
      output.data[index + 3] = 255;
    }
  }

  target.putImageData(output, 0, 0);
  const texture = new THREE.CanvasTexture(target.canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Subtle carbon-fibre weave for the car body. Colour comes from the material's
 * carbon base tint; this only supplies surface relief. */
export function createCarbonNormalTexture(repeat: number): THREE.CanvasTexture {
  const weave = createContext(CARBON_SIZE);
  drawCarbonWeave(weave);
  const texture = heightToNormalTexture(weave, CARBON_NORMAL_STRENGTH);
  texture.repeat.set(repeat, repeat);
  return texture;
}

/** Circumferential tread grooves plus rubber grain, wrapped around the tyre
 * barrel so the wheels read as rotating rather than as smooth cylinders. */
export function createTireTreadTexture(repeatX: number): THREE.CanvasTexture {
  const context = createContext(TREAD_SIZE);
  context.fillStyle = SCENE_COLORS.tire;
  context.fillRect(0, 0, TREAD_SIZE, TREAD_SIZE);

  context.fillStyle = "rgba(255,255,255,0.07)";
  TREAD_GROOVES.forEach((y) => context.fillRect(0, y, TREAD_SIZE, 2));
  context.fillStyle = "rgba(0,0,0,0.55)";
  TREAD_GROOVES.forEach((y) => context.fillRect(0, y + 2, TREAD_SIZE, 2));

  scatterGrain(context, TREAD_SIZE, 120, "rgba(255,255,255,0.04)", "rgba(0,0,0,0.25)");

  const texture = toColorTexture(context);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = repeatX;
  return texture;
}
