import Image from "next/image";
import type { IAchievementLogo } from "@/types/achievement";

const SIZES = {
  sm: { box: "h-10 w-10", px: 40 },
  lg: { box: "h-16 w-16 md:h-20 md:w-20", px: 80 },
} as const;

interface AchievementLogoProps {
  logo: IAchievementLogo;
  size?: keyof typeof SIZES;
}

/** The brand mark at the head of a record, sitting straight on the dark
 * surface. Marks drawn for light backgrounds are flipped to a white silhouette
 * rather than left to disappear into it.
 *
 * Vector marks skip the image optimiser, which refuses SVG by default and has
 * nothing to gain on one anyway. */
export function AchievementLogo({ logo, size = "lg" }: AchievementLogoProps) {
  const { box, px } = SIZES[size];

  return (
    <span className={`flex shrink-0 items-center justify-center ${box}`}>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={px}
        height={px}
        unoptimized={logo.src.endsWith(".svg")}
        className={`h-full w-full object-contain ${logo.reverseOnDark ? "brightness-0 invert" : ""}`}
      />
    </span>
  );
}
