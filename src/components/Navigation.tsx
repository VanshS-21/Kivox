"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { brand } from "@/content/brand";
import { navigation } from "@/content/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { KivoxLogo } from "@/components/ui/KivoxLogo";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const heroEl = document.querySelector("section");
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        setPastHero(window.scrollY + 80 > heroBottom);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["live-examples", "services", "process", "team", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.2 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const hamburger = hamburgerRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !overlayRef.current) return;

      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const timer = window.setTimeout(() => {
      overlayRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 50);

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timer);
      hamburger?.focus();
    };
  }, [isOpen]);

  if (pathname.startsWith("/showcase")) return null;

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/" && !pastHero;
    if (href.startsWith("/#")) return activeSection === href.substring(2);
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out ${
          isScrolled ? "border-b border-border backdrop-blur-xl" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-background/90 transition-opacity duration-500"
          style={{ opacity: pastHero && isScrolled && !isOpen ? 1 : 0 }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              prefetch={false}
              onClick={(event) => {
                if (pathname === "/") {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  closeMenu();
                }
              }}
              className="relative z-[60] flex items-center gap-2 text-foreground transition-colors duration-300 hover:text-accent"
              data-cursor="logo"
            >
              <KivoxLogo height={32} variant="mono" />
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              {navigation.primary.map((item) => {
                const isActive = isActiveLink(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    prefetch={false}
                    className={`block text-sm font-semibold tracking-tight transition-colors duration-200 hover:-translate-y-0.5 ${
                      isActive
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="relative z-[60] flex items-center gap-3">
              {pathname !== "/contact" && (
                <Link
                  href="/contact"
                  prefetch={false}
                  className="hidden items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium tracking-tight text-accent-ink transition-all duration-200 hover:scale-105 hover:shadow-amber-glow active:scale-[0.97] sm:flex"
                >
                  Book a Free Call
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              )}

              <ThemeToggle className="text-foreground" />

              <button
                ref={hamburgerRef}
                onClick={() => setIsOpen((value) => !value)}
                className="flex rounded-lg p-2 transition-colors hover:bg-accent/10 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                <span className="flex flex-col gap-1.5">
                  <span
                    className="h-0.5 w-6 bg-foreground transition-transform duration-300"
                    style={{ transform: isOpen ? "translateY(8px) rotate(45deg)" : undefined }}
                  />
                  <span
                    className="h-0.5 w-6 bg-foreground transition-opacity duration-200"
                    style={{ opacity: isOpen ? 0 : 1 }}
                  />
                  <span
                    className="h-0.5 w-6 bg-foreground transition-transform duration-300"
                    style={{ transform: isOpen ? "translateY(-8px) rotate(-45deg)" : undefined }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-navigation"
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E")`,
              backgroundSize: "240px 240px",
            }}
          />

          <div className="flex h-full flex-col overflow-y-auto px-6 pb-12 pt-28 md:px-12 lg:flex-row lg:px-16">
            <div className="flex flex-1 flex-col justify-center">
              <nav className="space-y-0">
                {navigation.primary.map((item, idx) => {
                  const isActive = isActiveLink(item.href);

                  return (
                    <div key={item.href} className="border-b border-border">
                      <Link
                        href={item.href}
                        prefetch={false}
                        onClick={closeMenu}
                        className="group relative flex items-baseline gap-6 py-5 lg:py-6"
                      >
                        <span
                          className="studio-tabular font-mono text-sm text-accent"
                          style={{ letterSpacing: "0.12em" }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[36px] font-bold leading-none tracking-tight transition-colors duration-200 sm:text-[48px] lg:text-[56px] ${
                            isActive
                              ? "text-accent"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          className="absolute bottom-4 left-0 h-[2px] origin-left bg-accent transition-all duration-500 ease-out group-hover:w-full"
                          style={{ width: isActive ? "100%" : "0" }}
                        />
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="mt-auto lg:mt-0 lg:flex lg:w-[320px] lg:flex-col lg:justify-end lg:ps-16">
              <div className="mb-8">
                <h2 className="text-base font-semibold text-foreground">
                  Connect
                </h2>
                <div className="mt-3 flex gap-5">
                  <Link
                    href={brand.socials.linkedin}
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="block text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    LinkedIn &nearr;
                  </Link>
                  <Link
                    href={brand.socials.instagram}
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="block text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Instagram &nearr;
                  </Link>
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Say Hello
                </h2>
                <div className="mt-3">
                  <Link
                    href={`mailto:${brand.contact.email}`}
                    prefetch={false}
                    onClick={closeMenu}
                    className="inline-block text-lg font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {brand.contact.email}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
