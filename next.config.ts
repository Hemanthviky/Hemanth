import type { NextConfig } from "next";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  images: {
    /* AVIF first, WebP as the fallback — the optimiser picks whichever the
     * requesting browser accepts. */
    formats: ["image/avif", "image/webp"],
    /* Only the widths this layout actually renders at, so the build stops
     * generating variants nothing ever requests. */
    deviceSizes: [320, 384, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 80, 96, 160, 240, 384],
    /* Optimised output is content-hashed by source, so it can be held for a
     * long time. */
    minimumCacheTTL: ONE_YEAR_IN_SECONDS,
  },
};

export default nextConfig;
