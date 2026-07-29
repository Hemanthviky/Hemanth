import Link from "next/link";
import { NAV_LINKS } from "@/data/site";

/** Desktop nav row. The underline is a scaled span rather than a border so the
 * hover wipes in from the left on the compositor. */
export function NavLinks() {
  return (
    <ul className="hidden items-center gap-8 md:flex lg:gap-10">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="type-label-lg duration-quick group relative inline-block py-1 transition-colors hover:text-white"
          >
            {`// ${link.label}`}
            <span
              aria-hidden="true"
              className="bg-signal-yellow duration-quick absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 transition-transform ease-out group-hover:scale-x-100"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
