"use client";

import { useState } from "react";
import { ExternalLink, Globe, Smartphone } from "lucide-react";
import { FINDER_NO_CURSOR_STYLE } from "@/constants/finder";

interface WebsiteViewerProps {
  /** Public URL(s) of the live site. When omitted/empty (and no storeUrl), renders a placeholder. */
  urls?: string[];
  /** App/Play Store listing URL. Store pages block iframe embedding, so this renders as a link-out card instead. */
  storeUrl?: string;
  /** Used for the iframe title and the "open in new tab" aria-label. */
  title: string;
  className?: string;
  /** Suppress the native cursor on toolbar links — only pass true inside the Finder's custom-cursor scope. */
  desktopCursor?: boolean;
  /** Message shown in the empty-state placeholder when there's nothing to preview. */
  unavailableLabel?: string;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** macOS-style browser chrome wrapping a live, scrollable embed of the project's
 * real deployed site — used in place of static screenshots so visitors can
 * click around the actual product. When a project shipped multiple sites, a
 * row of tabs switches the embed between them. App/Play Store listings can't
 * be iframed, so those render as a simple link-out card instead. Falls back
 * to a placeholder when a project has no public deployment yet. */
export function WebsiteViewer({
  urls,
  storeUrl,
  title,
  className = "",
  desktopCursor = false,
  unavailableLabel = "Live preview unavailable",
}: WebsiteViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const linkProps = desktopCursor ? { "data-cursor": "pointer", style: FINDER_NO_CURSOR_STYLE } : {};

  if (storeUrl) {
    return (
      <div
        className={`flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-black/10 bg-[#F5F4F0] px-6 text-center ${className}`}
      >
        <Smartphone className="h-8 w-8 text-black/30" strokeWidth={1.5} />
        <div>
          <p className="text-[0.9rem] font-semibold text-black">{title}</p>
          <p className="mt-0.5 text-[0.72rem] text-black/45">Available on Google Play</p>
        </div>
        <a
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-[0.75rem] font-semibold text-white transition-colors duration-150 hover:bg-black/80"
          {...linkProps}
        >
          View on Google Play
          <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
        </a>
      </div>
    );
  }

  if (!urls || urls.length === 0) {
    return (
      <div
        className={`flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/15 bg-black/[0.02] text-black/30 ${className}`}
      >
        <Globe className="h-8 w-8" strokeWidth={1.5} />
        <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em]">{unavailableLabel}</span>
      </div>
    );
  }

  const activeUrl = urls[activeIndex] ?? urls[0];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {urls.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {urls.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`rounded-full border px-3 py-1 text-[0.68rem] font-medium transition-colors duration-150 ${
                i === activeIndex
                  ? "border-amber-400 bg-amber-400/15 text-black"
                  : "border-black/10 text-black/50 hover:bg-black/[0.04]"
              }`}
              {...linkProps}
            >
              {getHostname(url)}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-black/10 bg-[#F5F4F0] px-3 py-2">
          <span className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </span>
          <span className="flex-1 truncate rounded-md bg-black/[0.04] px-3 py-1 text-center text-[0.68rem] font-medium text-black/50">
            {getHostname(activeUrl)}
          </span>
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} in a new tab`}
            className="shrink-0 text-black/40 transition-colors duration-150 hover:text-black/70"
            {...linkProps}
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>
        <div className="relative aspect-video w-full bg-white">
          <iframe
            key={activeUrl}
            src={activeUrl}
            title={`${title} live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
