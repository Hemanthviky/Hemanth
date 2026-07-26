"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Marquee } from "../Marquee";
import { MEMBERSHIP } from "@/data/palletRossContent";
import { PR_COLORS } from "@/constants/palletRoss";

export function SceneMembership() {
  return (
    <div className="flex h-full flex-col gap-5 px-8 py-8">
      <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col justify-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: PR_COLORS.surfaceAlt }}
          >
            <Camera className="h-4 w-4" style={{ color: PR_COLORS.text }} />
          </span>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {MEMBERSHIP.headline}
          </h3>
          <p className="max-w-xs text-sm" style={{ color: PR_COLORS.textMuted }}>
            {MEMBERSHIP.body}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          {MEMBERSHIP.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="flex w-24 flex-col gap-1.5 rounded-2xl border p-3 sm:w-28"
              style={{
                borderColor: tier.popular ? PR_COLORS.coral : "#ECECEC",
                backgroundColor: tier.popular ? PR_COLORS.surface : PR_COLORS.surfaceAlt,
                boxShadow: tier.popular ? "0 20px 40px rgba(0,0,0,0.12)" : undefined,
              }}
              initial={{ opacity: 0, y: 16, rotate: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: tier.popular ? 1.06 : 1,
                rotate: tier.popular ? 0 : i === 0 ? -2 : 2,
              }}
              transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {tier.popular && (
                <span
                  className="w-fit rounded-full px-1.5 py-0.5 text-[9px] font-semibold text-white"
                  style={{ backgroundColor: PR_COLORS.coral }}
                >
                  Popular
                </span>
              )}
              <span className="text-[11px] font-medium" style={{ color: PR_COLORS.textMuted }}>
                {tier.name}
              </span>
              <span className="text-lg font-bold" style={{ color: PR_COLORS.text }}>
                {tier.price}
              </span>
              <span className="text-[9px] leading-snug" style={{ color: PR_COLORS.textMuted }}>
                {tier.note}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <Marquee items={MEMBERSHIP.marquee} />
    </div>
  );
}
