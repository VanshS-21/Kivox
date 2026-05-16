"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { team } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export function HomeTeam() {
  const reduce = useReducedMotion();

  // Split: first 2 are featured (larger), rest are supporting (compact)
  const featured = team.members.slice(0, 2);
  const supporting = team.members.slice(2);

  return (
    <Section
      className="relative overflow-hidden"
      spacing="default"
      id="team"
    >
      <Container>
        {/* ── Section header — no eyebrow, label integrated into headline ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mb-10 md:mb-16 lg:mb-24"
        >
          <p className="studio-eyebrow text-accent mb-5">[ Team ]</p>
          <h2 className="studio-h2-editorial text-foreground mb-5">
            Built by{" "}
            <em className="font-serif italic text-accent" style={{ fontStyle: "italic" }}>
              People.
            </em>
          </h2>

          <p className="studio-body-serif text-muted-foreground max-w-xl">
            {team.intro}
          </p>
        </motion.div>

        {/* ── Featured row: 2 large portraits ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-10 md:gap-y-14 lg:gap-y-16 mb-10 md:mb-12 lg:mb-16">
          {featured.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                ease: easeOutExpo,
                delay: idx * 0.1,
              }}
              className="group"
            >
              {/* Portrait — large */}
              <div className="relative mb-5 lg:mb-6 overflow-hidden rounded-xl lg:rounded-2xl ring-0 group-hover:ring-1 ring-accent/20 transition-all duration-500">
                <div className="aspect-[4/5] relative">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Kivox`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />

                  {/* Subtle warm overlay on hover */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.08] transition-colors duration-500" />
                </div>
              </div>

              {/* Info */}
              <div>
                <span className="studio-eyebrow text-accent block mb-2">
                  {member.role}
                </span>

                <h3 className="studio-h3-sans text-foreground mb-2 transition-colors duration-300 group-hover:text-accent">
                  {member.name}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Supporting row: 4 compact portraits ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-8 md:gap-y-10">
          {supporting.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.5,
                ease: easeOutExpo,
                delay: 0.15 + idx * 0.06,
              }}
              className="group"
            >
              {/* Portrait — compact */}
              <div className="relative mb-4 overflow-hidden rounded-lg lg:rounded-xl ring-0 group-hover:ring-1 ring-accent/20 transition-all duration-500">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Kivox`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.08] transition-colors duration-500" />
                </div>
              </div>

              {/* Compact info — name + role only */}
              <div>
                <h3 className="studio-h4-sans text-foreground mb-1 transition-colors duration-300 group-hover:text-accent">
                  {member.name}
                </h3>
                <span className="studio-eyebrow text-muted-foreground">
                  {member.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
