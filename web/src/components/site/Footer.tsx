"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { brand } from "@/content/brand";
import { fadeUp, viewportOnce, easeOutExpo } from "@/lib/motion";

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
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
          className="flex flex-col lg:flex-row justify-between gap-12"
        >
          {/* Brand section */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="flex flex-col gap-3"
          >
            <div className="text-lg font-sans font-bold tracking-tight text-foreground">{brand.name}</div>
            <div className="studio-caption">{brand.locationLine}</div>
          </motion.div>

          {/* Contact grid */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-4 text-sm"
          >
            <div className="flex flex-col gap-1">
              <div className="studio-eyebrow text-muted-foreground opacity-60">Email</div>
              <a
                className="text-foreground hover:text-accent transition-colors"
                href={`mailto:${brand.contact.email}`}
              >
                {brand.contact.email}
              </a>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="studio-eyebrow text-muted-foreground opacity-60">Phone</div>
              <div className="text-foreground">{brand.contact.phone}</div>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="studio-eyebrow text-muted-foreground opacity-60">Social</div>
              <div className="flex items-center gap-4">
                <a
                  className="text-foreground hover:text-accent transition-colors"
                  href={brand.socials.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="text-foreground hover:text-accent transition-colors"
                  href={brand.socials.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>

          {/* Legal links */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="flex flex-col gap-3"
          >
            <div className="studio-eyebrow text-muted-foreground opacity-60">Legal</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                className="text-foreground hover:text-accent transition-colors"
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-foreground hover:text-accent transition-colors"
                href="/terms"
              >
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright with animated divider */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
            className="origin-left"
          >
            <div className="studio-caption">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
