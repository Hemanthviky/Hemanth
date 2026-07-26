"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { PROJECT_CARD_CONFIGS } from "@/constants/projectCardConfigs";
import type { IProject } from "@/types/project";

interface WorksStackCardProps {
  project: IProject;
  index: number;
  vIndex: MotionValue<number>;
  isActive: boolean;
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/*
 * Static resting positions for each card in the fanned stack.
 * Matches the reference: cards cascade diagonally down-right,
 * each behind the previous, with increasing rotation and offset.
 *
 * index 0 = front/active card (top-centre, upright)
 * index 1 = second card (slightly right + down, slight rotate)
 * index 2 = third card (further right + down, more rotate)
 * etc.
 */
const STACK_POSITIONS = [
  { x: -60,  y: -60,  rotate:  0,   scale: 1.0  },  // 0 — front
  { x:  80,  y:  20,  rotate:  6,   scale: 0.94 },  // 1
  { x:  60,  y: 120,  rotate: -3,   scale: 0.88 },  // 2
  { x: 130,  y: 200,  rotate:  4,   scale: 0.82 },  // 3
  { x: 100,  y: 290,  rotate: -5,   scale: 0.76 },  // 4
];

export function WorksStackCard({ project, index, vIndex, isActive }: WorksStackCardProps) {
  const reduced = useReducedMotion();
  const config = PROJECT_CARD_CONFIGS[project.id] ?? PROJECT_CARD_CONFIGS["prepkind"];

  /*
   * slot: 0 = this card is active
   *       positive = already passed (should fly off upward)
   *       negative = upcoming (fanned in stack)
   */
  const slot = useTransform(vIndex, (v) => v - index);

  /* When slot ≈ 0 (active), card snaps to STACK_POSITIONS[0].
   * When slot < 0 (queued), card sits at its resting fan position.
   * When slot > 0 (exited), card moves off-screen upward. */
  const pos = STACK_POSITIONS[index] ?? STACK_POSITIONS[4];

  const x = useTransform(slot, (s) => {
    if (s >= 0) return -s * 40 + pos.x * Math.max(0, 1 - s);
    // Queued: show in stack at natural fan position
    return pos.x;
  });

  const y = useTransform(slot, (s) => {
    if (s >= 0) return Math.max(-500, -s * 200) + pos.y * Math.max(0, 1 - s);
    return pos.y;
  });

  const rotate = useTransform(slot, (s) => {
    if (s >= 0) return pos.rotate * Math.max(0, 1 - s) + (s > 0 ? -s * 4 : 0);
    return pos.rotate;
  });

  const scale = useTransform(slot, (s) => {
    if (s >= 0) return Math.max(0.5, pos.scale - s * 0.15);
    return pos.scale;
  });

  const opacity = useTransform(slot, (s) => {
    if (s >= 1.5) return 0;
    if (s >= 0) return 1 - s * 0.5;
    return 1;
  });

  const zIndex = useTransform(slot, (s) => Math.round(30 - Math.abs(s) * 8));

  /* Idle float animation for queued cards */
  const floatDelay = index * 0.3;

  return (
    <motion.div
      className="absolute"
      style={{
        /* anchor point: upper-centre of the right panel */
        left: "50%",
        top: "50%",
        x,
        y,
        rotate: reduced ? 0 : rotate,
        scale,
        opacity,
        zIndex,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform, opacity",
      }}
    >
      {/* Floating pill label */}
      <motion.div
        className="absolute -top-7 right-0 z-10 flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-white shadow-lg"
        animate={
          reduced
            ? undefined
            : { y: [0, -4, 0] }
        }
        transition={{
          duration: 3.5 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em]">
          {config.label}
        </span>
      </motion.div>

      {/* Card body */}
      <motion.div
        className="overflow-hidden rounded-2xl"
        style={{
          width: "clamp(220px, 22vw, 330px)",
          height: "clamp(280px, 30vw, 430px)",
          boxShadow: isActive
            ? "0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)"
            : "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        }}
        whileHover={reduced ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.4, ease: EASE_EXPO }}
      >
        <ProjectMockupCard config={config} project={project} isActive={isActive} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Mockup card renderer ─────────────────────────────────────────────────── */
import type { ProjectCardConfig } from "@/constants/projectCardConfigs";

function ProjectMockupCard({
  config,
  project,
  isActive,
}: {
  config: ProjectCardConfig;
  project: IProject;
  isActive: boolean;
}) {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{ backgroundColor: config.bg }}
    >
      {/* Top browser/app bar */}
      <div
        className="flex shrink-0 items-center justify-between px-4 py-3"
        style={{ backgroundColor: config.headerBg ?? config.bg }}
      >
        <div className="flex items-center gap-2">
          {config.icon && (
            <span className="text-[1rem]">{config.icon}</span>
          )}
          <span
            className="text-[0.72rem] font-semibold"
            style={{ color: config.textColor }}
          >
            {config.appName}
          </span>
        </div>
        <div
          className="rounded-full px-3 py-1 text-[0.6rem] font-bold"
          style={{ backgroundColor: config.accentBg, color: config.accentText }}
        >
          {config.ctaText}
        </div>
      </div>

      {/* Card body content */}
      <div className="relative flex flex-1 flex-col overflow-hidden px-4 pb-4">
        {/* Main headline */}
        <div className="mt-3 flex-1">
          {config.lines.map((line, i) => (
            <p
              key={i}
              className="font-black leading-tight"
              style={{
                fontSize: i === 0 ? "1.45rem" : "1.35rem",
                color: line.color ?? config.textColor,
                marginTop: i === 0 ? 0 : "0.1em",
              }}
            >
              {line.text}
            </p>
          ))}

          {/* Sub description */}
          {config.subtext && (
            <p
              className="mt-2 text-[0.7rem] leading-snug opacity-70"
              style={{ color: config.textColor }}
            >
              {config.subtext}
            </p>
          )}
        </div>

        {/* Bottom decoration / tags */}
        {config.bottomTags && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {config.bottomTags.map((tag) => (
              <span
                key={tag.label}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[0.65rem] font-semibold"
                style={{ backgroundColor: tag.bg, color: tag.color }}
              >
                {tag.emoji && <span>{tag.emoji}</span>}
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* Image area if card has a photo/screenshot */}
        {config.imageStyle && (
          <div
            className="mt-3 overflow-hidden rounded-xl"
            style={config.imageStyle}
          >
            {config.imageContent}
          </div>
        )}
      </div>
    </div>
  );
}
