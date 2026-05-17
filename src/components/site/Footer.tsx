"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { brand } from "@/content/brand";
import { navigation } from "@/content/navigation";
import { KivoxLogo } from "@/components/ui/KivoxLogo";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/showcase")) return null;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-20 md:px-12 lg:px-16 lg:pt-32">
        <div className="mb-16 flex flex-col justify-between gap-16 lg:mb-24 lg:flex-row lg:gap-12">
          <div className="flex max-w-xl flex-col gap-8">
            <div>
              <h2 className="studio-h2-editorial mb-4 text-foreground">
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
                className="break-all text-3xl font-medium text-foreground transition-colors hover:text-accent lg:text-4xl"
              >
                {brand.contact.email}
              </a>
            </div>

            <div className="mt-2 flex flex-col gap-1">
              <a
                href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`}
                className="text-lg text-muted-foreground transition-colors hover:text-accent"
              >
                {brand.contact.phone}
              </a>
              <span className="text-lg text-muted-foreground">
                {brand.contact.address}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-16 sm:flex-nowrap lg:gap-24">
            <div>
              <h3 className="studio-eyebrow mb-6 text-foreground opacity-60">
                Navigate
              </h3>
              <nav
                aria-label="Footer navigation"
                className="flex flex-col items-start gap-4"
              >
                {navigation.primary.map((link) => {
                  if (pathname === link.href) return null;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      className="text-lg font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <h3 className="studio-eyebrow mb-6 text-foreground opacity-60">
                Connect
              </h3>
              <nav
                aria-label="Social connections"
                className="flex flex-col items-start gap-4"
              >
                <a
                  className="text-lg font-medium text-foreground transition-colors hover:text-accent"
                  href={brand.socials.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn &nearr;
                </a>
                <a
                  className="text-lg font-medium text-foreground transition-colors hover:text-accent"
                  href={brand.socials.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram &nearr;
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
            className="group block w-full cursor-pointer"
            data-cursor="logo"
          >
            <KivoxLogo
              variant="mono"
              hideSuffix
              className="h-auto w-full text-foreground opacity-15 transition-opacity duration-500 group-hover:opacity-30 dark:opacity-20 dark:group-hover:opacity-30"
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        </div>
      </div>

      <div className="relative z-10 border-t border-accent/10 bg-surface-alt">
        <div className="mx-auto max-w-[1600px] px-6 py-5 lg:px-12">
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
