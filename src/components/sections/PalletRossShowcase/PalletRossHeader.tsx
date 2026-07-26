import { Settings, User } from "lucide-react";
import { PR_COLORS, PR_NAV_LINKS } from "@/constants/palletRoss";

export function PalletRossHeader() {
  return (
    <div
      className="flex items-center justify-between border-b px-6 py-4 sm:px-10"
      style={{ borderColor: "#ECECEC" }}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-xs"
          style={{ backgroundColor: PR_COLORS.teal }}
        >
          ✈
        </span>
        <span className="text-sm font-bold" style={{ color: PR_COLORS.text }}>
          Pallet Ross
        </span>
      </div>

      <nav
        className="hidden items-center gap-5 text-xs font-medium lg:flex"
        style={{ color: PR_COLORS.textMuted }}
      >
        {PR_NAV_LINKS.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full"
          style={{ backgroundColor: PR_COLORS.surfaceAlt }}
        >
          <User className="h-3.5 w-3.5" style={{ color: PR_COLORS.text }} />
        </span>
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full"
          style={{ backgroundColor: PR_COLORS.surfaceAlt }}
        >
          <Settings className="h-3.5 w-3.5" style={{ color: PR_COLORS.text }} />
        </span>
      </div>
    </div>
  );
}
