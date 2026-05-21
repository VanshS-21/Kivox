import localFont from "next/font/local";

const bricolage = localFont({
  display: "swap",
  src: "../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
});

const figtree = localFont({
  display: "swap",
  src: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
  variable: "--font-figtree",
  weight: "300 900",
});

const spectral = localFont({
  display: "swap",
  preload: false,
  src: [
    {
      path: "../../node_modules/@fontsource/spectral/files/spectral-latin-400-normal.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/spectral/files/spectral-latin-600-normal.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../node_modules/@fontsource/spectral/files/spectral-latin-400-italic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/spectral/files/spectral-latin-600-italic.woff2",
      style: "italic",
      weight: "600",
    },
  ],
  variable: "--font-spectral",
});

const geistMono = localFont({
  display: "swap",
  preload: false,
  src: "../../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const fontVariables = [
  bricolage.variable,
  figtree.variable,
  spectral.variable,
  geistMono.variable,
].join(" ");
