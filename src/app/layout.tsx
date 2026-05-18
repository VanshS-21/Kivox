import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Figtree,
  Geist_Mono,
  Spectral,
} from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { PostHogPageView } from "@/components/analytics/PostHogPageView";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { Footer } from "@/components/site/Footer";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/site/SkipLink";
import { homeSeo } from "@/content/seo/home";
import { getMetadataBase } from "@/lib/metadata";
import { getOrganizationJsonLd } from "@/lib/structuredData";
import { themeInitScript } from "@/lib/themeScript";

const bricolage = Bricolage_Grotesque({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: "variable",
});

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: "variable",
});

const spectral = Spectral({
  display: "swap",
  preload: false,
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-spectral",
  weight: ["400", "600"],
});

const geistMono = Geist_Mono({
  display: "swap",
  preload: false,
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: "variable",
});

const fontVariables = [
  bricolage.variable,
  figtree.variable,
  spectral.variable,
  geistMono.variable,
].join(" ");

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  metadataBase: getMetadataBase(),
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: "/",
    siteName: "Kivox",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: homeSeo.title,
    description: homeSeo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col relative overflow-x-hidden">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <SkipLink />
          <Navigation />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
          <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            type="application/ld+json"
          />
        </PostHogProvider>
      </body>
    </html>
  );
}
