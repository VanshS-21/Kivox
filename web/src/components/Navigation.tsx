"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { brand } from "@/content/brand";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { KivoxLogo } from "@/components/ui/KivoxLogo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Showcase" },
  { href: "/blog", label: "Blog" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  // Only the home page has the dark constellation hero.
  // All other pages use theme-aware backgrounds from the start.
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      // Detect when the nav crosses the hero bottom edge
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

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["services", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap + Escape key for overlay
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      // Focus trap: cycle through focusable elements inside the overlay + hamburger
      if (e.key === "Tab" && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    // Move focus into the overlay after entrance animation settles
    const timer = setTimeout(() => {
      const firstLink = overlayRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    }, 100);

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      // Restore focus to hamburger on close
      hamburgerRef.current?.focus();
    };
  }, [isOpen]);

  // Nav color states:
  //   overHero = still scrolling over the dark hero section (home page only)
  //   pastHero = scrolled past the hero into the page content
  const overHero = isHomePage && !pastHero;

  return (
    <>
      {/* Navigation bar */}
      <motion.nav
        initial={false}
        animate={{
          backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? "border-b border-border" : ""
        }`}
        style={{
          backgroundColor: overHero
            ? isScrolled
              ? "var(--hero-bg-scroll)"
              : "transparent"
            : undefined,
        }}
      >
        {/* Theme-aware background — fades in when past the hero */}
        <div
          className="absolute inset-0 bg-background/90 transition-opacity duration-500 pointer-events-none"
          style={{ opacity: pastHero && isScrolled ? 1 : 0 }}
        />

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsOpen(false);
                }
              }}
              className="flex items-center gap-2 group relative z-[60]"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`transition-colors duration-500 group-hover:text-accent ${
                  pastHero ? "text-foreground" : ""
                }`}
                style={overHero ? { color: "var(--hero-fg)" } : undefined}
              >
                <KivoxLogo height={24} variant="mono" />
              </motion.div>
            </Link>

            {/* Right side — CTA, theme toggle, hamburger */}
            <div className="flex items-center gap-3 relative z-[60]">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-ink rounded-lg text-sm font-medium tracking-tight hover:scale-105 hover:shadow-amber-glow transition-all duration-200"
              >
                Start a project
                <span className="text-base">→</span>
              </Link>

              {/* Theme toggle */}
              <ThemeToggle
                className={pastHero ? "text-foreground" : ""}
                style={overHero ? { color: "var(--hero-fg)" } : undefined}
              />

              {/* Hamburger button */}
              <button
                ref={hamburgerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-6 h-0.5 transition-colors duration-500"
                  style={{ background: overHero ? "var(--hero-fg)" : "var(--fg-primary)" }}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-0.5 origin-center transition-colors duration-500"
                  style={{ background: overHero ? "var(--hero-fg)" : "var(--fg-primary)" }}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-6 h-0.5 transition-colors duration-500"
                  style={{ background: overHero ? "var(--hero-fg)" : "var(--fg-primary)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Subtle grain texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-soft-light"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E")`,
                backgroundSize: '240px 240px',
              }}
            />

            <div className="h-full flex flex-col lg:flex-row px-6 lg:px-12 pt-28 pb-12">
              {/* Left — navigation links with dramatic cascade */}
              <div className="flex-1 flex flex-col justify-center">
                <nav className="space-y-0">
                  {navItems.map((item, idx) => {
                    const isActive = item.href === `/#${activeSection}`;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -30, opacity: 0, filter: "blur(6px)" }}
                        transition={{
                          duration: 0.6,
                          delay: 0.05 + idx * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="border-b border-border"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-baseline gap-6 py-5 lg:py-6 group relative"
                          onMouseEnter={(e) => {
                            const line = e.currentTarget.querySelector<HTMLSpanElement>('[data-underline]');
                            if (line) line.style.width = '100%';
                          }}
                          onMouseLeave={(e) => {
                            const line = e.currentTarget.querySelector<HTMLSpanElement>('[data-underline]');
                            if (line && !isActive) line.style.width = '0';
                          }}
                        >
                          {/* Number */}
                          <span className="text-sm font-mono text-accent studio-tabular" style={{ letterSpacing: '0.12em' }}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          {/* Label */}
                          <span className={`text-[36px] sm:text-[48px] lg:text-[56px] font-bold tracking-tight leading-none transition-colors duration-200 ${
                            isActive
                              ? "text-accent"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}>
                            {item.label}
                          </span>
                          {/* Amber underline draw — width transitions on hover */}
                          <span
                            data-underline
                            className="absolute bottom-4 left-0 h-[2px] bg-accent origin-left transition-all duration-500 ease-out"
                            style={{ width: isActive ? "100%" : "0" }}
                          />
                          {/* Active indicator dot */}
                          {isActive && (
                            <motion.div
                              layoutId="nav-active"
                              className="w-2 h-2 rounded-full bg-accent"
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Right — connect & contact info */}
              <motion.div
                initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:w-[320px] lg:flex lg:flex-col lg:justify-end lg:pl-16 mt-auto lg:mt-0"
              >
                {/* Connect */}
                <div className="mb-8">
                  <span className="studio-eyebrow text-accent">
                    Connect
                  </span>
                  <div className="flex gap-5 mt-3">
                    <Link
                      href={brand.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      LinkedIn ↗
                    </Link>
                    <Link
                      href={brand.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Instagram ↗
                    </Link>
                  </div>
                </div>

                {/* Say Hello */}
                <div>
                  <span className="studio-eyebrow text-accent">
                    Say Hello
                  </span>
                  <div className="mt-3">
                    <Link
                      href={`mailto:${brand.contact.email}`}
                      onClick={() => setIsOpen(false)}
                      className="text-lg text-foreground hover:text-accent transition-colors font-medium"
                    >
                      {brand.contact.email}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
