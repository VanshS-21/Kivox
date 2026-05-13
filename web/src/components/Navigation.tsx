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
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <>
      {/* Navigation bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/92 backdrop-blur-xl border-b border-border' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group relative z-[60]"
            >
              <span className="font-sans font-bold text-foreground text-lg tracking-tight transition-colors group-hover:text-accent">
                Kivox
              </span>
            </Link>

            {/* Right side — CTA, theme toggle, hamburger */}
            <div className="flex items-center gap-3 relative z-[60]">
              {/* Primary CTA */}
              <Link
                href="/#contact"
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-ink rounded-lg text-sm font-medium tracking-tight hover:scale-105 hover:shadow-amber-glow transition-all duration-200"
              >
                Start a project
                <span className="text-base">→</span>
              </Link>

              {/* Theme toggle */}
              <ThemeToggle />
              
              {/* Hamburger button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-accent/10 transition-colors"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-6 h-0.5 bg-foreground"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-0.5 bg-foreground"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-6 h-0.5 bg-foreground"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MadeByCat-style full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background"
          >
            <div className="h-full flex flex-col lg:flex-row px-6 lg:px-12 pt-28 pb-12">
              {/* Left — navigation links */}
              <div className="flex-1 flex flex-col justify-center">
                <nav className="space-y-0">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.05 + idx * 0.06,
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
                        <span className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-muted-foreground tracking-tight leading-none group-hover:text-foreground transition-colors duration-200">
                          {item.label}
                        </span>
                        {/* Active dot on current page (optional visual) */}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Right — connect & contact info */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
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
