import type { ComponentType } from "react";
import { GitHubIcon, ICON_SIZES, LinkedInIcon, MailIcon, type IconProps } from "@/components/icons";
import { CornerBrackets } from "@/components/shared/hud";
import { SOCIAL_LINKS } from "@/data/site";

const ICONS: Record<string, ComponentType<IconProps>> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  email: MailIcon,
};

/** Icons sit directly on the section background; the only framing is the
 * corner-bracket device revealed on hover. Entries without a URL are skipped
 * rather than rendered as dead links. */
export function SocialRow() {
  const links = SOCIAL_LINKS.filter((link) => link.href);

  return (
    <ul className="flex items-center gap-4">
      {links.map((link) => {
        const Glyph = ICONS[link.id];
        if (!Glyph) return null;

        return (
          <li key={link.id}>
            <a
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={link.label}
              className="group relative flex size-11 items-center justify-center"
            >
              <CornerBrackets revealOnHover />
              <Glyph
                size={ICON_SIZES.standalone}
                className="duration-quick text-muted transition-colors group-hover:text-racing-red"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
