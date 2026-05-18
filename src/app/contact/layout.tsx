import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Kivox",
  description:
    "Tell us what you're building. We reply within 24 hours with next steps and a clear scope.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Kivox",
    description: "Book a free call with Kivox. We reply within 24 hours.",
    url: "/contact",
    siteName: "Kivox",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
