"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { brand } from "@/content/brand";
import { navigation } from "@/content/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();

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
    const sectionIds = [
      "live-examples",
      "services",
      "process",
      "team",
      "contact",
    ];
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

  // Close mobile menu automatically if resized to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

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

      if (event.key !== "Tab" || !overlayRef.current || !hamburger) return;

      const focusable = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
      );
      
      // The hamburger button is in the <nav> outside the overlay. 
      // We must explicitly add it to the focus trap cycle.
      focusable.unshift(hamburger);

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
    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.substring(2);
    }
    return pathname === href;
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out ${
          isScrolled && !isOpen ? "border-b border-border backdrop-blur-xl" : ""
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
              className="relative z-[60] flex min-h-11 items-center gap-2 text-foreground transition-colors duration-300 hover:text-accent"
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
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center px-1 text-sm font-semibold tracking-tight transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 ${
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
                  className="hidden min-h-11 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-medium tracking-tight text-accent-ink transition-all duration-200 hover:scale-105 hover:shadow-amber-glow active:scale-[0.97] sm:flex"
                >
                  Book a Free Call
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              )}

              <ThemeToggle className="text-foreground" />

              <button
                ref={hamburgerRef}
                onClick={() => setIsOpen((value) => !value)}
                className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-accent/10 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                <span className="flex flex-col gap-1.5">
                  <span
                    className="h-0.5 w-6 bg-foreground transition-transform duration-300"
                    style={{
                      transform: isOpen
                        ? "translateY(8px) rotate(45deg)"
                        : undefined,
                    }}
                  />
                  <span
                    className="h-0.5 w-6 bg-foreground transition-opacity duration-200"
                    style={{ opacity: isOpen ? 0 : 1 }}
                  />
                  <span
                    className="h-0.5 w-6 bg-foreground transition-transform duration-300"
                    style={{
                      transform: isOpen
                        ? "translateY(-8px) rotate(-45deg)"
                        : undefined,
                    }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {isOpen && (
        <motion.div
          id="mobile-navigation"
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
                    <motion.div
                      key={item.href}
                      className="border-b border-border"
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      animate={reduce ? undefined : { opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: 8 }}
                      transition={{
                        duration: 0.36,
                        ease: [0.16, 1, 0.3, 1],
                        delay: idx * 0.045,
                      }}
                    >
                      <Link
                        href={item.href}
                        prefetch={false}
                        onClick={closeMenu}
                        className="group relative flex items-baseline gap-6 py-5 lg:py-6"
                      >
                        <span className="studio-tag studio-tabular text-accent">
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
                          <span
                            className="h-2 w-2 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </motion.div>
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
                    className="flex min-h-11 items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </Link>
                  <Link
                    href={brand.socials.instagram}
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex min-h-11 items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <InstagramIcon className="w-5 h-5" />
                    <span>Instagram</span>
                  </Link>
                  <Link
                    href={brand.socials.facebook}
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex min-h-11 items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <FacebookIcon className="w-5 h-5" />
                    <span>Facebook</span>
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
                    className="inline-flex min-h-11 items-center text-lg font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {brand.contact.email}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
