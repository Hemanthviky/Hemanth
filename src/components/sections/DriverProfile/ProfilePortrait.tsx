import Image from "next/image";
import { CornerBrackets } from "@/components/shared/hud";
import { PROFILE_PORTRAIT } from "@/data/driverProfile";

const SIZES = "(max-width: 768px) 100vw, 40vw";

/** Portrait framed by device (b) — the brackets sit permanently and switch to
 * racing-red on hover. No card wrapper, just the image and the frame. */
export function ProfilePortrait() {
  return (
    <div className="group relative aspect-4/5 w-full max-w-sm">
      <Image
        src={PROFILE_PORTRAIT.src}
        alt={PROFILE_PORTRAIT.alt}
        fill
        sizes={SIZES}
        className="object-cover object-top grayscale-[35%] transition-[filter] duration-slow group-hover:grayscale-0"
      />
      <CornerBrackets />
    </div>
  );
}
