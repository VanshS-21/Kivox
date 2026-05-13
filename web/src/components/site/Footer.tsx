"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "motion/react";

import { brand } from "@/content/brand";
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
    const duration = 600; // ms
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
      {/* ── Contact band ── */}
      <div className="border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 lg:py-14">
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 0.05,
                },
              },
            }}
            className="flex flex-col lg:flex-row justify-between gap-10 lg:items-end"
          >
            {/* Left — brand + contact */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="space-y-5"
            >
              <div className="text-lg font-sans font-bold tracking-tight text-foreground">
                {brand.name}
              </div>
              <div className="space-y-1.5">
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="block text-foreground hover:text-accent transition-colors font-medium"
                >
                  {brand.contact.email}
                </a>
                <div className="text-sm text-muted-foreground">
                  {brand.contact.phone}
                </div>
              </div>
            </motion.div>

            {/* Right — social + legal, no labels */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="flex gap-10 sm:gap-14 text-sm"
            >
              {/* Social */}
              <div className="flex flex-col gap-2">
                <a
                  className="text-foreground hover:text-accent transition-colors"
                  href={brand.socials.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn ↗
                </a>
                <a
                  className="text-foreground hover:text-accent transition-colors"
                  href={brand.socials.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram ↗
                </a>
              </div>

              {/* Legal */}
              <div className="flex flex-col gap-2">
                <Link
                  className="text-muted-foreground hover:text-accent transition-colors"
                  href="/privacy"
                >
                  Privacy
                </Link>
                <Link
                  className="text-muted-foreground hover:text-accent transition-colors"
                  href="/terms"
                >
                  Terms
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Colophon ── */}
      <div className="border-t border-border-soft">
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
            <div className="studio-caption text-muted-foreground">
              Crafted with intention
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
