"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CopyIcon, ICON_SIZES } from "@/components/icons";
import { CornerBrackets } from "@/components/shared/hud";
import { CONTACT_EMAIL } from "@/data/site";
import { PIT_STOP_COPIED_TOAST, PIT_STOP_COPY_LABEL } from "@/data/pitStop";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

const TOAST_DURATION_S = 0.2;

export function EmailCopy() {
  const { hasCopied, copy } = useCopyToClipboard(CONTACT_EMAIL);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="font-mono text-data-sm duration-quick font-medium break-all text-white transition-colors hover:text-signal-yellow"
      >
        {CONTACT_EMAIL}
      </a>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={copy}
          aria-label={PIT_STOP_COPY_LABEL}
          className="group relative flex size-9 items-center justify-center"
        >
          <CornerBrackets revealOnHover />
          <CopyIcon
            size={ICON_SIZES.action}
            className="duration-quick text-white transition-colors group-hover:text-signal-yellow"
          />
        </button>

        <AnimatePresence>
          {hasCopied && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TOAST_DURATION_S }}
              role="status"
              className="type-label-sm text-signal-yellow"
            >
              {PIT_STOP_COPIED_TOAST}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
