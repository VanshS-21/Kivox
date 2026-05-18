"use client";

import type { SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { brand } from "@/content/brand";
import { navigation } from "@/content/navigation";
import { KivoxLogo } from "@/components/ui/KivoxLogo";

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const intentLinks = [
  {
    label: "See Proof",
    title: "Explore the work",
    href: "/work",
  },
  {
    label: "Check Fit",
    title: "Scan our services",
    href: "/#services",
  },
  {
    label: "Ask Directly",
    title: "Book a free call",
    href: "/contact",
  },
] as const;

const studioLinks = [
  { label: "Our Process", href: "/#process" },
  { label: "The Team", href: "/#team" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
] as const;

const proofLinks = [
  { label: "All Work", href: "/work" },
  { label: "The Roastery", href: "/work/cafe" },
  { label: "Aurelia Grand", href: "/work/hotel" },
  { label: "Greenfield Academy", href: "/work/school" },
] as const;

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const phoneHref = `tel:${brand.contact.phone.replace(/\s+/g, "")}`;

  if (pathname.startsWith("/showcase")) return null;

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-surface-alt text-foreground selection:bg-accent-muted">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.11 0.012 65 / 0.72), transparent 34%), linear-gradient(110deg, transparent 0%, oklch(0.72 0.18 65 / 0.08) 42%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--border-soft) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto max-w-[1320px] px-5 py-8 sm:px-6 sm:py-14 md:px-10 lg:px-14 lg:py-18 xl:py-20">
        <div className="grid gap-7 border-b border-border/70 pb-8 sm:gap-10 md:pb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-end lg:gap-12 xl:pb-14">
          <div className="max-w-3xl">
            <Link
              href="/"
              prefetch={false}
              aria-label="Kivox home"
              className="hidden min-h-11 items-center sm:inline-flex"
            >
              <KivoxLogo height={34} variant="mono" className="text-foreground" />
            </Link>
            <p className="studio-eyebrow text-accent sm:mt-8">
              [ Ready when you are ]
            </p>
            <h2 className="mt-4 max-w-4xl font-sans text-[clamp(2.35rem,9vw,3.25rem)] font-semibold leading-[0.94] tracking-tight text-foreground sm:text-[clamp(2.5rem,8vw,6.25rem)] sm:leading-[0.92]">
              Build a website customers can trust.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              Premium websites, sharper journeys, and launch-ready digital
              systems for businesses that need trust to show up fast.
            </p>
            <div className="mt-6 flex flex-col gap-3 min-[460px]:flex-row sm:mt-8">
              <Link
                href="/contact"
                prefetch={false}
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink shadow-[0_20px_55px_-28px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_28px_70px_-30px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Book a Free Call
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={`mailto:${brand.contact.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-border/80 px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                Email Us
              </a>
            </div>
          </div>

          <nav
            aria-label="Next steps"
            className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
          >
            {intentLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="group flex min-h-16 items-center justify-between gap-4 border border-border/70 bg-[oklch(0.1_0.006_65/0.58)] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-[oklch(0.12_0.01_65/0.74)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:min-h-[132px] sm:flex-col sm:items-start sm:px-5 sm:py-4 lg:min-h-[92px] lg:flex-row lg:items-center"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <span>
                  <span className="studio-tag studio-tabular block text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} / {link.label}
                  </span>
                  <span className="mt-1 block text-lg font-semibold tracking-tight text-foreground sm:mt-2 sm:text-2xl lg:text-xl xl:text-2xl">
                    {link.title}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid gap-7 py-7 sm:gap-10 sm:py-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] md:gap-12 md:py-12 xl:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.6fr)_minmax(260px,0.75fr)]">
          <div className="hidden sm:block">
            <p className="studio-eyebrow text-accent">[ Studio ]</p>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-foreground">
              {brand.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Based in Bengaluru, working with ambitious businesses across
              India.
            </p>
          </div>

          <div className="hidden gap-8 sm:grid sm:grid-cols-3">
            <FooterLinkGroup
              ariaLabel="Footer site navigation"
              title="Site"
              links={navigation.primary}
              pathname={pathname}
            />
            <FooterLinkGroup
              ariaLabel="Footer studio navigation"
              title="Studio"
              links={studioLinks}
              pathname={pathname}
            />
            <FooterLinkGroup
              ariaLabel="Footer proof navigation"
              title="Proof"
              links={proofLinks}
              pathname={pathname}
            />
          </div>

          <div className="md:col-span-2 xl:col-span-1">
            <p className="studio-eyebrow text-accent">[ Direct ]</p>
            <div className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-1">
              <a
                href={`mailto:${brand.contact.email}`}
                className="group flex min-h-10 items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground sm:min-h-12"
              >
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                />
                <span className="break-all">{brand.contact.email}</span>
              </a>
              <a
                href={phoneHref}
                className="group flex min-h-10 items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground sm:min-h-12"
              >
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                />
                <span>{brand.contact.phone}</span>
              </a>
              <div className="flex min-h-10 items-start gap-3 text-sm text-muted-foreground sm:min-h-12">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                />
                <span>{brand.contact.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-border/60 py-5 sm:py-8 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Link
              href="/"
              prefetch={false}
              aria-label="Back to Kivox home"
              className="group hidden w-full max-w-[360px] sm:block md:max-w-[520px] lg:max-w-[640px]"
              data-cursor="logo"
            >
              <KivoxLogo
                fluid
                variant="mono"
                className="text-foreground opacity-[0.14] transition-opacity duration-500 group-hover:opacity-25"
              />
            </Link>
            <div className="flex flex-wrap items-center gap-3 sm:justify-start">
              <SocialLink
                href={brand.socials.linkedin}
                label="LinkedIn"
                icon={<LinkedinIcon aria-hidden="true" className="h-4 w-4" />}
              />
              <SocialLink
                href={brand.socials.instagram}
                label="Instagram"
                icon={<InstagramIcon aria-hidden="true" className="h-4 w-4" />}
              />
              <SocialLink
                href={brand.socials.facebook}
                label="Facebook"
                icon={<FacebookIcon aria-hidden="true" className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p>
            &copy; {currentYear} {brand.name}. {brand.locationLine}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
                href={link.href}
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  ariaLabel,
  title,
  links,
  pathname,
}: {
  ariaLabel: string;
  title: string;
  links: readonly { label: string; href: string }[];
  pathname: string;
}) {
  return (
    <div>
      <h3 className="studio-eyebrow text-foreground/55">{title}</h3>
      <nav aria-label={ariaLabel} className="mt-4 flex flex-col items-start gap-2">
        {links.map((link) => {
          const isCurrent = pathname === link.href;

          return (
            <Link
              aria-current={isCurrent ? "page" : undefined}
              key={link.href}
              href={link.href}
              prefetch={false}
              className="group inline-flex min-h-11 items-center gap-2 text-base font-medium text-muted-foreground transition-colors hover:text-accent aria-[current=page]:text-foreground"
            >
              <span>{link.label}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      aria-label={label}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {icon}
    </a>
  );
}
