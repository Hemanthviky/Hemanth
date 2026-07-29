import Link from "next/link";
import { TelemetryTicker } from "@/components/shared/hud";
import { COPYRIGHT, FOOTER_TICKER_ITEMS, NAV_LINKS } from "@/data/site";
import { BackToTopButton } from "./BackToTopButton";

export function Footer() {
  return (
    <footer className="mt-24">
      <TelemetryTicker items={FOOTER_TICKER_ITEMS} />

      <div className="sector-shell flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
        <p className="type-label-sm order-3 md:order-1">{COPYRIGHT}</p>

        <ul className="order-1 flex flex-wrap justify-center gap-x-6 gap-y-2 md:order-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="type-label-sm duration-quick transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="order-2 md:order-3">
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
