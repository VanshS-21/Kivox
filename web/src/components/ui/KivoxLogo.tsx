/**
 * Kivox brand logo — "The Voice" (Three-Ray Broadcast)
 *
 * A sound-wave icon mark: 3 lines radiating from a focal point
 * with concentric arcs — signal, reach, amplification.
 * "Vox" means voice; the mark embodies that etymology.
 *
 * Variants:
 *   • `mono`  – entire logo in `currentColor` (nav, inherits theme)
 *   • `brand` – amber mark (#c8a050) + cream text / muted ".in"
 *
 * Per /rendering-animate-svg-wrapper: wrap in <div> for CSS animations.
 * Per /rendering-svg-precision: coordinates kept to integers (≤1 dp).
 */

import type { CSSProperties } from "react";

interface KivoxLogoProps {
  /** Height in px. Width scales proportionally. */
  height?: number;
  /** `mono` inherits CSS color. `brand` uses official amber + cream. */
  variant?: "mono" | "brand";
  /** Hide the ".in" suffix (e.g. at very small sizes). */
  hideSuffix?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function KivoxLogo({
  height = 28,
  variant = "mono",
  hideSuffix = false,
  className,
  style,
}: KivoxLogoProps) {
  const vw = hideSuffix ? 230 : 290;
  const vh = 64;
  const w = height * (vw / vh);

  const mark = variant === "brand" ? "#c8a050" : "currentColor";
  const text = variant === "brand" ? "#f5f0e8" : "currentColor";
  const muted = variant === "brand" ? "#8a8070" : "currentColor";

  return (
    <svg
      width={w}
      height={height}
      viewBox={`0 0 ${vw} ${vh}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="Kivox.in logo"
    >
      {/* ── Voice mark: 3 rays + 3 arcs ── */}
      <g>
        <path d="M4 32L20 12" stroke={mark} strokeWidth="4" strokeLinecap="round" />
        <path d="M4 32L20 32" stroke={mark} strokeWidth="4" strokeLinecap="round" />
        <path d="M4 32L20 52" stroke={mark} strokeWidth="4" strokeLinecap="round" />
        <path d="M28 20a16 16 0 0 1 0 24" stroke={mark} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M36 14a24 24 0 0 1 0 36" stroke={mark} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".6" />
        <path d="M44 8a32 32 0 0 1 0 48" stroke={mark} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".3" />
      </g>

      {/* ── Wordmark: Kivox ── */}
      <g fill={text}>
        <path d="M74 12h7v20.5L98 12h8.5L90 31l17.5 21H99L81 31.5V52h-7V12Z" />
        <path d="M121 20.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM122 28h5v24h-5V28Z" />
        <path d="M143 28l8 18 8-18h5.5L152.5 52h-3L137.5 28H143Z" />
        <path d="M177 27c8 0 13 5.5 13 13s-5 13-13 13-13-5.5-13-13 5-13 13-13Zm0 4.5c-5 0-8 3.5-8 8.5s3 8.5 8 8.5 8-3.5 8-8.5-3-8.5-8-8.5Z" />
        <path d="M203 28l7.5 10.5L218 28h6l-10.5 13L224 52h-6l-7.5-9.5L203 52h-6l10.5-11L197 28h6Z" />
      </g>

      {/* ── Suffix: .in ── */}
      {!hideSuffix && (
        <g fill={muted}>
          <circle cx="231" cy="48" r="2.5" />
          <circle cx="242" cy="22" r="2.5" />
          <rect x="240" y="28" width="5" height="24" rx="1" />
          <path d="M256 28v24h5V38c0-5 3-7 7-7s6 2 6 6v15h5V36c0-6-4-9-10-9-4 0-7 2-8 4V28h-5Z" />
        </g>
      )}
    </svg>
  );
}
