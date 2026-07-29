import * as THREE from "three";
import { CIRCUIT_COLORS, CIRCUIT_ENVIRONMENT_COLORS } from "@/constants/circuit";
import type { IJourneyMilestone } from "@/types/experience";

const SANS_STACK = "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif";
const MONO_STACK = "ui-monospace, 'Cascadia Mono', Consolas, monospace";

const TARMAC_SIZE = 256;
const TARMAC_NOISE_DOTS = 1600;
const SIGN_WIDTH = 512;
const SIGN_HEIGHT = 320;
const SIGN_MARGIN = 44;
const CHECKER_CELL = 24;

interface ICanvasPair {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}

function createCanvas(width: number, height: number): ICanvasPair {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("2D canvas context unavailable");
  return { canvas, context };
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function fillRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  if (typeof context.roundRect === "function") {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
    context.fill();
    return;
  }
  context.fillRect(x, y, width, height);
}

function fitFont(
  context: CanvasRenderingContext2D,
  text: string,
  weight: number,
  baseSize: number,
  maxWidth: number,
  family: string
): void {
  let size = baseSize;
  context.font = `${weight} ${size}px ${family}`;
  while (context.measureText(text).width > maxWidth && size > 16) {
    size -= 2;
    context.font = `${weight} ${size}px ${family}`;
  }
}

/** Asphalt tile: charcoal base with grain, a wandering tire-rubber darkening
 * band along the racing line, and slightly worn (sub-full-opacity) white edge
 * and dashed centre lines. Repeats along the ribbon's arc-length U axis. */
export function createTarmacTexture(repeatX: number): THREE.CanvasTexture {
  const { canvas, context } = createCanvas(TARMAC_SIZE, TARMAC_SIZE);
  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.trackAsphalt;
  context.fillRect(0, 0, TARMAC_SIZE, TARMAC_SIZE);

  for (let i = 0; i < TARMAC_NOISE_DOTS; i++) {
    context.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.08)";
    context.fillRect(Math.random() * TARMAC_SIZE, Math.random() * TARMAC_SIZE, 2, 2);
  }

  const drawRubberBand = (width: number, alpha: number) => {
    context.strokeStyle = `rgba(5,5,7,${alpha})`;
    context.lineWidth = width;
    context.lineCap = "round";
    context.beginPath();
    for (let x = -8; x <= TARMAC_SIZE + 8; x += 8) {
      const y = TARMAC_SIZE * 0.47 + Math.sin((x / TARMAC_SIZE) * Math.PI * 2) * 9;
      if (x < 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
  };
  drawRubberBand(36, 0.22);
  drawRubberBand(16, 0.2);

  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.laneLine;
  context.globalAlpha = 0.62;
  context.fillRect(0, 10, TARMAC_SIZE, 5);
  context.fillRect(0, TARMAC_SIZE - 15, TARMAC_SIZE, 5);
  context.globalAlpha = 0.5;
  context.fillRect(10, TARMAC_SIZE / 2 - 4, 46, 7);
  context.fillRect(138, TARMAC_SIZE / 2 - 4, 46, 7);
  context.globalAlpha = 0.12;
  for (let i = 0; i < 60; i++) {
    context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.trackAsphalt;
    context.fillRect(Math.random() * TARMAC_SIZE, 9 + Math.random() * 7, 3, 3);
    context.fillRect(Math.random() * TARMAC_SIZE, TARMAC_SIZE - 16 + Math.random() * 7, 3, 3);
  }
  context.globalAlpha = 1;

  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = repeatX;
  return texture;
}

/** One racing-red/white stripe pair with baked speckle so the kerb doesn't
 * read as a flat color swatch; geometry bakes world-unit repeats into UVs. */
export function createCurbTexture(): THREE.CanvasTexture {
  const { canvas, context } = createCanvas(128, 32);
  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.kerbRed;
  context.fillRect(0, 0, 64, 32);
  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.kerbWhite;
  context.fillRect(64, 0, 64, 32);
  for (let i = 0; i < 260; i++) {
    context.fillStyle = Math.random() < 0.5 ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)";
    context.fillRect(Math.random() * 128, Math.random() * 32, 2, 2);
  }
  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

/** Generic speckled-surface tile (gravel traps, concrete) — base color plus
 * layered random dots. */
export function createSpeckleTexture(
  base: string,
  speckles: readonly { color: string; count: number; size: number }[]
): THREE.CanvasTexture {
  const size = 128;
  const { canvas, context } = createCanvas(size, size);
  context.fillStyle = base;
  context.fillRect(0, 0, size, size);
  speckles.forEach(({ color, count, size: dot }) => {
    context.fillStyle = color;
    for (let i = 0; i < count; i++) {
      context.fillRect(Math.random() * size, Math.random() * size, dot, dot);
    }
  });
  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createGravelTexture(): THREE.CanvasTexture {
  return createSpeckleTexture(CIRCUIT_ENVIRONMENT_COLORS.gravelTan, [
    { color: "rgba(120,100,60,0.35)", count: 500, size: 2 },
    { color: "rgba(255,250,235,0.4)", count: 350, size: 2 },
    { color: "rgba(90,80,55,0.25)", count: 200, size: 3 },
  ]);
}

export function createConcreteTexture(): THREE.CanvasTexture {
  return createSpeckleTexture(CIRCUIT_ENVIRONMENT_COLORS.concrete, [
    { color: "rgba(0,0,0,0.07)", count: 420, size: 2 },
    { color: "rgba(255,255,255,0.09)", count: 320, size: 2 },
  ]);
}

/** Muted color-blob rows implying a filled grandstand — far cheaper than crowd
 * meshes and reads perfectly at silhouette distance. */
export function createCrowdTexture(): THREE.CanvasTexture {
  const width = 128;
  const height = 64;
  const { canvas, context } = createCanvas(width, height);
  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.crowdBase;
  context.fillRect(0, 0, width, height);
  for (let row = 0; row < height; row += 8) {
    context.fillStyle = "rgba(0,0,0,0.18)";
    context.fillRect(0, row + 6, width, 2);
  }
  const palette = CIRCUIT_ENVIRONMENT_COLORS.crowdPalette;
  for (let i = 0; i < 420; i++) {
    context.fillStyle = palette[Math.floor(Math.random() * palette.length)];
    context.fillRect(Math.random() * width, Math.random() * height, 2, 3);
  }
  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = 3;
  return texture;
}

/** Painted concrete barrier strip: off-white with a racing-red band. */
export function createBarrierTexture(): THREE.CanvasTexture {
  const { canvas, context } = createCanvas(128, 32);
  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.barrierWhite;
  context.fillRect(0, 0, 128, 32);
  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.barrierRed;
  context.fillRect(0, 11, 128, 10);
  for (let i = 0; i < 160; i++) {
    context.fillStyle = Math.random() < 0.5 ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";
    context.fillRect(Math.random() * 128, Math.random() * 32, 2, 2);
  }
  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

/** Circumferential grooves + grain for the tire tread surface. */
export function createTireTreadTexture(): THREE.CanvasTexture {
  const size = 64;
  const { canvas, context } = createCanvas(size, size);
  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.tireTread;
  context.fillRect(0, 0, size, size);
  context.fillStyle = "rgba(255,255,255,0.06)";
  [16, 32, 48].forEach((y) => context.fillRect(0, y, size, 2));
  for (let i = 0; i < 140; i++) {
    context.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.2)";
    context.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }
  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = 6;
  return texture;
}

/** Decorative "LIGHTS OUT" start banner: five start-light dots over the label. */
export function createStartBannerTexture(): THREE.CanvasTexture {
  const width = 256;
  const height = 160;
  const { canvas, context } = createCanvas(width, height);
  context.fillStyle = CIRCUIT_COLORS.signPanel;
  fillRoundedRect(context, 4, 4, width - 8, height - 8, 16);
  context.fillStyle = CIRCUIT_COLORS.accent;
  context.fillRect(20, 18, width - 40, 3);

  for (let i = 0; i < 5; i++) {
    context.beginPath();
    context.arc(width / 2 + (i - 2) * 36, 58, 12, 0, Math.PI * 2);
    context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.lightRed;
    context.fill();
    context.strokeStyle = "rgba(255,255,255,0.25)";
    context.lineWidth = 2;
    context.stroke();
  }

  context.fillStyle = CIRCUIT_COLORS.signText;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `800 30px ${SANS_STACK}`;
  context.fillText("LIGHTS OUT", width / 2, 118);
  return toTexture(canvas);
}

export function createCheckerTexture(): THREE.CanvasTexture {
  const columns = 10;
  const rows = 3;
  const { canvas, context } = createCanvas(columns * CHECKER_CELL, rows * CHECKER_CELL);
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      context.fillStyle =
        (row + column) % 2 === 0 ? CIRCUIT_COLORS.checkerDark : CIRCUIT_COLORS.checkerLight;
      context.fillRect(column * CHECKER_CELL, row * CHECKER_CELL, CHECKER_CELL, CHECKER_CELL);
    }
  }
  return toTexture(canvas);
}

/** Race number panel for the car's nose: yellow accent plate, navy digits. */
export function createNoseNumberTexture(): THREE.CanvasTexture {
  const { canvas, context } = createCanvas(128, 128);
  context.fillStyle = CIRCUIT_COLORS.accent;
  fillRoundedRect(context, 10, 10, 108, 108, 24);
  context.fillStyle = CIRCUIT_ENVIRONMENT_COLORS.carBodyPrimary;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `900 72px ${SANS_STACK}`;
  context.fillText("01", 64, 66);
  return toTexture(canvas);
}

/** Trackside pit-board face: role / company / dates on a dark panel with the
 * site's yellow accent. Doubles as the emissive map so the whole board "lights
 * up" when the car passes. */
export function createSignTexture(milestone: IJourneyMilestone, index: number): THREE.CanvasTexture {
  const { canvas, context } = createCanvas(SIGN_WIDTH, SIGN_HEIGHT);
  const textWidth = SIGN_WIDTH - SIGN_MARGIN * 2;

  context.fillStyle = CIRCUIT_COLORS.signPanel;
  fillRoundedRect(context, 4, 4, SIGN_WIDTH - 8, SIGN_HEIGHT - 8, 24);

  context.fillStyle = CIRCUIT_COLORS.accent;
  context.fillRect(22, 26, 8, 88);

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = CIRCUIT_COLORS.signMuted;
  context.font = `700 26px ${MONO_STACK}`;
  context.fillText(`0${index + 1} / 03`, SIGN_MARGIN, 56);

  if (milestone.isCurrent) {
    context.font = `700 22px ${SANS_STACK}`;
    const label = "CURRENT";
    const badgeWidth = context.measureText(label).width + 36;
    context.fillStyle = CIRCUIT_COLORS.accent;
    fillRoundedRect(context, SIGN_WIDTH - 36 - badgeWidth, 28, badgeWidth, 40, 20);
    context.fillStyle = CIRCUIT_COLORS.signPanel;
    context.fillText(label, SIGN_WIDTH - 36 - badgeWidth + 18, 56);
  }

  context.fillStyle = CIRCUIT_COLORS.signText;
  fitFont(context, milestone.role, 800, 44, textWidth, SANS_STACK);
  context.fillText(milestone.role, SIGN_MARGIN, 148);

  context.fillStyle = CIRCUIT_COLORS.signMuted;
  fitFont(context, milestone.company, 600, 26, textWidth, SANS_STACK);
  context.fillText(milestone.company, SIGN_MARGIN, 190);

  context.fillStyle = CIRCUIT_COLORS.accentHover;
  fitFont(context, milestone.dateRange, 700, 22, textWidth, MONO_STACK);
  context.fillText(milestone.dateRange, SIGN_MARGIN, 244);

  context.globalAlpha = 0.12;
  for (let column = 0; column < SIGN_WIDTH / 16; column++) {
    for (let row = 0; row < 2; row++) {
      if ((column + row) % 2 === 0) {
        context.fillStyle = CIRCUIT_COLORS.signText;
        context.fillRect(16 + column * 16, 276 + row * 16, 16, 16);
      }
    }
  }
  context.globalAlpha = 1;

  return toTexture(canvas);
}
