"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "motion/react";

import { brand } from "@/content/brand";
import { navigation } from "@/content/navigation";
import { fadeUp, viewportOnce, easeOutExpo } from "@/lib/motion";
import { KivoxLogo } from "@/components/ui/KivoxLogo";
import { Magnetic } from "@/components/ui/Magnetic";

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
    <footer className="bg-surface-alt border-t border-border relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-20 lg:pt-32 pb-8">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
              },
            },
          }}
        >
          {/* Top row: Asymmetrical split */}
          <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12 mb-16 lg:mb-24">
            
            {/* Left: Let's Talk & Contact */}
            <div className="flex flex-col gap-8 max-w-xl">
              <motion.div variants={fadeUp}>
                <div className="studio-eyebrow text-accent mb-6">Let's Talk</div>
                <h2 className="font-display text-4xl lg:text-5xl text-foreground tracking-tight leading-tight mb-4">
                  Ready to build something <span className="text-muted-foreground italic">extraordinary?</span>
                </h2>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-col gap-2 items-start">
                <Magnetic strength={0.1} className="inline-block">
                  <a 
                    href={`mailto:${brand.contact.email}`} 
                    className="text-3xl lg:text-4xl font-medium text-foreground hover:text-accent transition-colors break-all"
                  >
                    {brand.contact.email}
                  </a>
                </Magnetic>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-1 mt-2">
                <a 
                  href={`tel:${brand.contact.phone.replace(/\s+/g, "")}`} 
                  className="text-lg text-muted-foreground hover:text-accent transition-colors"
                >
                  {brand.contact.phone}
                </a>
                <span className="text-lg text-muted-foreground">{brand.contact.address}</span>
              </motion.div>
            </div>

            {/* Right: Navigation & Socials */}
            <div className="flex flex-wrap sm:flex-nowrap gap-16 lg:gap-24">
              {/* Navigate */}
              <motion.div variants={fadeUp}>
                <div className="studio-eyebrow text-subtle-foreground mb-6">Navigate</div>
                <nav aria-label="Footer navigation" className="flex flex-col gap-4 items-start">
                  {navigation.primary.map((link) => (
                    <Magnetic key={link.href} strength={0.2} className="inline-block">
                      <Link
                        href={link.href}
                        className="text-foreground hover:text-accent transition-colors text-lg font-medium"
                      >
                        {link.label}
                      </Link>
                    </Magnetic>
                  ))}
                </nav>
              </motion.div>

              {/* Connect */}
              <motion.div variants={fadeUp}>
                <div className="studio-eyebrow text-subtle-foreground mb-6">Connect</div>
                <nav aria-label="Social connections" className="flex flex-col gap-4 items-start">
                  <Magnetic strength={0.2} className="inline-block">
                    <a
                      className="text-foreground hover:text-accent transition-colors text-lg font-medium"
                      href={brand.socials.linkedin}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      LinkedIn ↗
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2} className="inline-block">
                    <a
                      className="text-foreground hover:text-accent transition-colors text-lg font-medium"
                      href={brand.socials.instagram}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Instagram ↗
                    </a>
                  </Magnetic>
                </nav>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Massive Brand Mark Anchor */}
        <motion.div 
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.2 }}
          className="w-full flex justify-center select-none pb-4"
        >
          <Link href="/" aria-label="Back to top" className="w-full block group cursor-pointer" data-cursor="logo">
            <KivoxLogo 
              variant="mono" 
              hideSuffix={true} 
              className="w-full h-auto text-foreground opacity-[0.03] dark:opacity-[0.05] transition-opacity duration-500 group-hover:opacity-10 dark:group-hover:opacity-[0.08]" 
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
        </motion.div>
      </div>

      {/* ── Colophon bar ── */}
      <div className="border-t border-accent/10 relative z-10 bg-surface-alt">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-5">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center"
          >
            <div className="studio-caption">
              © <YearCountUp /> {brand.name} · {brand.locationLine}
            </div>
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
              <Link
                className="studio-caption text-muted-foreground hover:text-accent transition-colors opacity-60 hover:opacity-100 py-2 sm:py-0 px-1 -mx-1"
                href="/blog"
              >
                Blog
              </Link>
              <Link
                className="studio-caption text-muted-foreground hover:text-accent transition-colors opacity-60 hover:opacity-100 py-2 sm:py-0 px-1 -mx-1"
                href="/faq"
              >
                FAQ
              </Link>
              <Link
                className="studio-caption text-muted-foreground hover:text-accent transition-colors opacity-60 hover:opacity-100 py-2 sm:py-0 px-1 -mx-1"
                href="/privacy"
              >
                Privacy
              </Link>
              <Link
                className="studio-caption text-muted-foreground hover:text-accent transition-colors opacity-60 hover:opacity-100 py-2 sm:py-0 px-1 -mx-1"
                href="/terms"
              >
                Terms
              </Link>
            </nav>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
