import type { Metadata } from "next";
import "./globals.css";

import { Analytics } from "@/components/analytics/Analytics";
import { Footer } from "@/components/site/Footer";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/site/SkipLink";
import { homeSeo } from "@/content/seo/home";
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
      className="h-full antialiased"
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col relative overflow-x-hidden">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
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
        <Analytics />
      </body>
    </html>
  );
}
