import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

import { PostHogPageView } from "@/components/analytics/PostHogPageView";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { Footer } from "@/components/site/Footer";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/site/SkipLink";
import { homeSeo } from "@/content/seo/home";
import { fontVariables } from "@/lib/fonts";
import { getMetadataBase } from "@/lib/metadata";
import { getOrganizationJsonLd } from "@/lib/structuredData";
import { themeInitScript } from "@/lib/themeScript";

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col relative overflow-x-hidden">
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
