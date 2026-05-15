import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kivox Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0d0c0c",
          backgroundImage: "radial-gradient(circle at 50% 0%, #2a221f 0%, #0d0c0c 70%)",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top Logo Area */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            width="253"
            height="56"
            viewBox="0 0 290 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M4 32L20 12" stroke="#ff7b47" strokeWidth={4} strokeLinecap="round" />
              <path d="M4 32L20 32" stroke="#ff7b47" strokeWidth={4} strokeLinecap="round" />
              <path d="M4 32L20 52" stroke="#ff7b47" strokeWidth={4} strokeLinecap="round" />
              <path d="M28 20a16 16 0 0 1 0 24" stroke="#ff7b47" strokeWidth={3} strokeLinecap="round" fill="none" />
              <path d="M36 14a24 24 0 0 1 0 36" stroke="#ff7b47" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.6} />
              <path d="M44 8a32 32 0 0 1 0 48" stroke="#ff7b47" strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.3} />
            </g>

            {/* Wordmark: Kivox */}
            <g fill="#ffffff">
              <path d="M74 12h7v20.5L98 12h8.5L90 31l17.5 21H99L81 31.5V52h-7V12Z" />
              <path d="M121 20.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM122 28h5v24h-5V28Z" />
              <path d="M143 28l8 18 8-18h5.5L152.5 52h-3L137.5 28H143Z" />
              <path d="M177 27c8 0 13 5.5 13 13s-5 13-13 13-13-5.5-13-13 5-13 13-13Zm0 4.5c-5 0-8 3.5-8 8.5s3 8.5 8 8.5 8-3.5 8-8.5-3-8.5-8-8.5Z" />
              <path d="M203 28l7.5 10.5L218 28h6l-10.5 13L224 52h-6l-7.5-9.5L203 52h-6l10.5-11L197 28h6Z" />
            </g>

            {/* Suffix: .in */}
            <g fill="#a1a1aa">
              <circle cx="231" cy="48" r="2.5" />
              <circle cx="242" cy="22" r="2.5" />
              <rect x="240" y="28" width="5" height="24" rx="1" />
              <path d="M256 28v24h5V38c0-5 3-7 7-7s6 2 6 6v15h5V36c0-6-4-9-10-9-4 0-7 2-8 4V28h-5Z" />
            </g>
          </svg>
        </div>

        {/* Main Title Area */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
              color: "#f8f8f8",
            }}
          >
            High-Craft Digital<br />Experiences
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#a1a1aa",
              letterSpacing: "-0.01em",
              maxWidth: "800px",
            }}
          >
            Engineering, branding, and design for the modern web.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
