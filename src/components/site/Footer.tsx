"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { brand } from "@/content/brand";
import { navigation } from "@/content/navigation";
import { KivoxLogo } from "@/components/ui/KivoxLogo";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/showcase")) return null;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-[1320px] px-6 pb-5 pt-10 md:px-10 md:pt-14 lg:px-14 lg:pt-16">
        <div className="mb-8 flex flex-col justify-between gap-8 lg:mb-10 lg:flex-row lg:gap-10">
          <div className="flex max-w-xl flex-col gap-4 md:gap-5">
            <div>
              <h2 className="studio-h2-editorial mb-3 text-foreground">
                Let&apos;s start a{" "}
                <em
                  className="font-serif italic text-muted-foreground"
                  style={{ fontStyle: "italic" }}
                >
                  conversation.
                </em>
              </h2>
            </div>

            <div className="flex flex-col items-start gap-2">
              <a
                href={`mailto:${brand.contact.email}`}
                className="break-all text-2xl font-medium text-foreground transition-colors hover:text-accent md:text-3xl"
              >
                {brand.contact.email}
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <a
                href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
                className="text-base text-muted-foreground transition-colors hover:text-accent"
              >
                {brand.contact.phone}
              </a>
              <span className="text-base text-muted-foreground">
                {brand.contact.address}
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-4 sm:flex sm:w-auto sm:flex-nowrap sm:gap-9 lg:gap-14">
            <div>
              <h3 className="studio-eyebrow mb-3 text-foreground opacity-60 sm:mb-4">
                Navigate
              </h3>
              <nav
                aria-label="Footer navigation"
                className="flex flex-col items-start gap-2.5 sm:gap-3"
              >
                {navigation.primary.map((link) => {
                  if (pathname === link.href) return null;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      className="text-sm font-medium text-foreground transition-colors hover:text-accent sm:text-base"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <h3 className="studio-eyebrow mb-3 text-foreground opacity-60 sm:mb-4">
                Studio
              </h3>
              <nav
                aria-label="Studio sections"
                className="flex flex-col items-start gap-2.5 sm:gap-3"
              >
                {[
                  { label: "Our Process", href: "/#process" },
                  { label: "The Team", href: "/#team" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Work Showcase", href: "/work" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className="text-sm font-medium text-foreground transition-colors hover:text-accent sm:text-base"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="studio-eyebrow mb-3 text-foreground opacity-60 sm:mb-4">
                Connect
              </h3>
              <nav
                aria-label="Social connections"
                className="flex flex-col items-start gap-2.5 sm:gap-3"
              >
                <a
                  className="group flex items-center gap-2 text-sm font-medium text-foreground opacity-60 transition-all hover:text-accent hover:opacity-100 sm:gap-3 sm:text-base"
                  href={brand.socials.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkedinIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  className="group flex items-center gap-2 text-sm font-medium text-foreground opacity-60 transition-all hover:text-accent hover:opacity-100 sm:gap-3 sm:text-base"
                  href={brand.socials.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <InstagramIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Instagram</span>
                </a>
                <a
                  className="group flex items-center gap-2 text-sm font-medium text-foreground opacity-60 transition-all hover:text-accent hover:opacity-100 sm:gap-3 sm:text-base"
                  href={brand.socials.facebook}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FacebookIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Facebook</span>
                </a>
                <a
                  className="group flex items-center gap-2 text-sm font-medium text-foreground opacity-60 transition-all hover:text-accent hover:opacity-100 sm:gap-3 sm:text-base"
                  href={`mailto:${brand.contact.email}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Email Us</span>
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center pb-4">
          <Link
            href="/"
            prefetch={false}
            aria-label="Back to top"
            className="group block w-full max-w-[260px] cursor-pointer sm:max-w-[380px] lg:max-w-[520px]"
            data-cursor="logo"
          >
            <KivoxLogo
              fluid
              variant="mono"
              className="text-foreground opacity-12 transition-opacity duration-500 group-hover:opacity-22 dark:opacity-16 dark:group-hover:opacity-28"
            />
          </Link>
        </div>
      </div>

      <div className="relative z-10 border-t border-accent/10 bg-surface-alt">
        <div className="mx-auto max-w-[1320px] px-6 py-3 md:px-10 lg:px-14">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="studio-caption">
              &copy; {new Date().getFullYear()} {brand.name} &middot;{" "}
              {brand.locationLine}
            </div>
            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6"
            >
              {[
                ["Blog", "/blog"],
                ["FAQ", "/faq"],
                ["Privacy", "/privacy"],
                ["Terms", "/terms"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  className="studio-caption -mx-1 px-1 py-2 text-muted-foreground opacity-60 transition-colors hover:text-accent hover:opacity-100 sm:py-0"
                  href={href}
                  prefetch={false}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
