"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { team } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export function HomeTeam() {
  const reduce = useReducedMotion();

  return (
    <Section
      className="relative overflow-hidden"
      id="team"
    >
      <Container>
        {/* ── Section header ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-accent"
            />
            <span className="studio-eyebrow text-accent">[ {team.label} ]</span>
          </div>

          <h2
            className="font-sans font-bold text-foreground mb-5"
            style={{
              fontSize: "clamp(2rem, 3vw + 0.5rem, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            {team.title.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="font-serif font-normal text-accent" style={{ fontStyle: "italic" }}>
              {team.title.split(" ").slice(-1)[0]}.
            </em>
          </h2>

          <p className="studio-body-serif text-muted-foreground max-w-xl">
            {team.intro}
          </p>
        </motion.div>

        {/* ── Team grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-14 lg:gap-y-20">
          {team.members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                ease: easeOutExpo,
                delay: idx * 0.08,
              }}
              className="group"
            >
              {/* Portrait */}
              <div className="relative mb-5 lg:mb-6 overflow-hidden rounded-xl lg:rounded-2xl">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Kivox`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Subtle warm overlay on hover */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.06] transition-colors duration-500" />
                </div>

                {/* Number badge */}
                <span
                  className="absolute top-3 left-3 lg:top-4 lg:left-4 text-xs font-mono font-bold tracking-wider text-white/50 studio-tabular"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Info */}
              <div>
                <span className="studio-eyebrow text-accent block mb-2">
                  {member.role}
                </span>

                <h3
                  className="font-sans font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-accent"
                  style={{
                    fontSize: "clamp(1.25rem, 1vw + 0.75rem, 1.5rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {member.name}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
