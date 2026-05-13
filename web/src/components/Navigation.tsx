"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { brand } from "@/content/brand";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Projects" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  // Nav color states:
  //   overHero = still scrolling over the dark hero section
  //   pastHero = scrolled past the hero into the page content
  const overHero = !pastHero;

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
              ? "rgba(13,10,5,0.92)"
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
              className="flex items-center gap-2 group relative z-[60]"
            >
              <motion.span
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`font-sans font-bold text-lg tracking-tight transition-colors duration-500 group-hover:text-accent ${
                  pastHero ? "text-foreground" : ""
                }`}
                style={overHero ? { color: "#f0ece4" } : undefined}
              >
                Kivox
              </motion.span>
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
                style={overHero ? { color: "#f0ece4" } : undefined}
              />

              {/* Hamburger button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-6 h-0.5 transition-colors duration-500"
                  style={{ background: overHero ? "#f0ece4" : "var(--fg-primary)" }}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-0.5 origin-center transition-colors duration-500"
                  style={{ background: overHero ? "#f0ece4" : "var(--fg-primary)" }}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-6 h-0.5 transition-colors duration-500"
                  style={{ background: overHero ? "#f0ece4" : "var(--fg-primary)" }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background"
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
                          className="flex items-baseline gap-6 py-5 lg:py-6 group"
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
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      LinkedIn ↗
                    </Link>
                    <Link
                      href={brand.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
