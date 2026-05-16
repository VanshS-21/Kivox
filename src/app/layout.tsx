import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Caveat,
  Figtree,
  Geist_Mono,
  Spectral,
} from "next/font/google";
import "./globals.css";

import { Analytics } from "@/components/analytics/Analytics";
import { BackToTop } from "@/components/ui/BackToTop";
import { ConsoleEasterEgg } from "@/components/ui/ConsoleEasterEgg";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { DevThemeOverride } from "@/components/dev/DevThemeOverride";
import { Footer } from "@/components/site/Footer";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SkipLink } from "@/components/site/SkipLink";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { homeSeo } from "@/content/seo/home";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import { getMetadataBase } from "@/lib/metadata";
import { getOrganizationJsonLd } from "@/lib/structuredData";
import { themeInitScript } from "@/lib/themeScript";
import { CursorProvider } from "@/lib/context/CursorContext";

const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-headline",
});

const serif = Spectral({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-spectral",
  style: ["normal", "italic"],
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-sans",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const handwritten = Caveat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-handwritten",
});

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
      className={`${sans.variable} ${serif.variable} ${body.variable} ${mono.variable} ${handwritten.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <CursorProvider>
          <LoadingProvider>
            <LoadingScreen />
            <DevThemeOverride />
            <ScrollProgress />
            <SkipLink />
            <Navigation />
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer />
            <BackToTop />
            <script
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              type="application/ld+json"
            />
            <Analytics />
            <CursorGlow />
            <ConsoleEasterEgg />
          </LoadingProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
