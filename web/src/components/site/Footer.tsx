"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "motion/react";

import { brand } from "@/content/brand";
import { navigation } from "@/content/navigation";
import { fadeUp, viewportOnce, easeOutExpo } from "@/lib/motion";

/** Counts up from 2020 to the current year over 0.6s when the footer scrolls into view */
function YearCountUp() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const currentYear = new Date().getFullYear();
  const [displayYear, setDisplayYear] = useState(currentYear);

  useEffect(() => {
    if (!inView) return;
    const startYear = 2020;
    const duration = 600;
    const steps = currentYear - startYear;
    if (steps <= 0) return;

    let frame = 0;
    const interval = duration / steps;
    setDisplayYear(startYear);

    const timer = setInterval(() => {
      frame++;
      setDisplayYear(startYear + frame);
      if (frame >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [inView, currentYear]);

  return <span ref={ref} className="studio-tabular">{displayYear}</span>;
}

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="bg-surface-alt">
      {/* ── Main footer ── */}
      <div className="border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.05,
                },
              },
            }}
            className="py-20 lg:py-28"
          >
            {/* Top row: Brand name + tagline */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="mb-16 lg:mb-24"
            >
              <div
                className="font-sans font-bold tracking-tight text-foreground"
                style={{
                  fontSize: "clamp(2.5rem, 5vw + 1rem, 6rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                }}
              >
                {brand.name}
              </div>
              <p className="mt-4 font-body text-muted-foreground max-w-md" style={{ fontSize: "clamp(0.95rem, 1vw + 0.4rem, 1.125rem)", lineHeight: 1.6 }}>
                {brand.tagline}
              </p>
            </motion.div>

            {/* Three-column grid: Navigate · Connect · Contact */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-16"
            >
              {/* Column 1: Navigate */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0 }}
              >
                <div className="studio-eyebrow text-subtle-foreground mb-6">Navigate</div>
                <div className="flex flex-col gap-3">
                  {navigation.primary.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-foreground hover:text-accent transition-colors text-base font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Column 2: Connect */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
              >
                <div className="studio-eyebrow text-subtle-foreground mb-6">Connect</div>
                <div className="flex flex-col gap-3">
                  <a
                    className="text-foreground hover:text-accent transition-colors text-base font-medium"
                    href={brand.socials.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    className="text-foreground hover:text-accent transition-colors text-base font-medium"
                    href={brand.socials.instagram}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Instagram ↗
                  </a>
                  <a
                    className="text-foreground hover:text-accent transition-colors text-base font-medium"
                    href={brand.socials.github}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub ↗
                  </a>
                </div>
              </motion.div>

              {/* Column 3: Contact */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
                className="col-span-2 sm:col-span-1"
              >
                <div className="studio-eyebrow text-subtle-foreground mb-6">Contact</div>
                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="text-foreground hover:text-accent transition-colors text-base font-medium"
                  >
                    {brand.contact.email}
                  </a>
                  <span className="text-base text-muted-foreground">
                    {brand.contact.phone}
                  </span>
                  <span className="text-base text-muted-foreground">
                    {brand.contact.address}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Colophon bar ── */}
      <div className="border-t border-accent/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-5">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.15 }}
            className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center"
          >
            <div className="studio-caption">
              © <YearCountUp /> {brand.name} · {brand.locationLine}
            </div>
            <div className="flex items-center gap-6">
              <Link
                className="studio-caption text-muted-foreground hover:text-accent transition-colors opacity-60 hover:opacity-100"
                href="/privacy"
              >
                Privacy
              </Link>
              <Link
                className="studio-caption text-muted-foreground hover:text-accent transition-colors opacity-60 hover:opacity-100"
                href="/terms"
              >
                Terms
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
