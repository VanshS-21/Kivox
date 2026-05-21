"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { routes } from "./tokens";
import { FitnessButton } from "./components";

export default function FitnessHomeView() {
  return (
    <div className="relative overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/showcase/vortex-fitness-hero.png"
            alt="Vortex Fitness Bengaluru Hub"
            fill
            sizes="100vw"
            className="object-cover opacity-40 grayscale contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />
        </div>

        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center mt-12 max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/5 text-[#CCFF00] text-[10px] font-mono tracking-widest uppercase select-none">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            {"Bengaluru's Elite Strength & Conditioning Hub"}
          </div>
          <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic flex flex-col items-center select-none">
            <span className="text-white">FORGE SPEED</span>
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #CCFF00" }}
            >
              RECRUIT
            </span>
            <span className="text-white">STRENGTH</span>
          </h1>
          <p className="mt-4 text-xs md:text-sm font-mono tracking-[0.2em] uppercase max-w-xl text-white/60">
            Uncompromising training methodology. Elite equipment. Science-backed templates.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <FitnessButton href={routes.schedule} variant="primary">
              Book a Station
            </FitnessButton>
            <FitnessButton href={routes.pricing} variant="outline">
              Membership Tiers
            </FitnessButton>
          </div>
        </div>
      </section>

      {/* ROTATED BRUTALIST MARQUEE */}
      <div className="relative z-20 flex origin-left -rotate-1 scale-105 overflow-hidden border-y-2 border-white bg-[#CCFF00] py-3 text-black md:py-4 select-none">
        <div className="flex w-max items-center gap-8 text-xl md:text-3xl font-black uppercase italic tracking-tighter animate-marquee">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>Hypertrophy</span>
              <span>•</span>
              <span>Conditioning</span>
              <span>•</span>
              <span>Powerlifting</span>
              <span>•</span>
              <span>Active Recovery</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* PROGRAMS WRAPPER */}
      <section className="px-6 md:px-12 py-32 max-w-[1600px] mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
          <div>
            <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">ATHLETIC CURRICULUMS</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mt-2">
              OUR <span className="text-[#CCFF00]">PROGRAMS</span>
            </h2>
          </div>
          <p className="max-w-md text-white/60 text-xs md:text-sm leading-relaxed font-sans">
            Designed for maximum bio-mechanical adaptation and athletic peak output. Select a pathway and break through your performance plateau.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Hypertrophy",
              desc: "Build muscle volume. Heavy loading with strict contraction tempos and progressive overload templates.",
              img: "/media/showcase/vortex-program-hypertrophy.png",
              stat: "45 MIN",
            },
            {
              title: "Endurance",
              desc: "Engine building. Elevate your VO2 Max limit, build cardiorespiratory stamina, and improve metabolic efficiency.",
              img: "/media/showcase/vortex-fitness-hero.png",
              stat: "60 MIN",
            },
            {
              title: "Mobility",
              desc: "Decompress, regain lost joint ranges, clear fascial tightness, and speed up target recovery cycles.",
              img: "/media/showcase/vortex-coach-priya.png",
              stat: "30 MIN",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] group overflow-hidden bg-[#111] border border-white/10"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="self-end px-3 py-1 bg-[#CCFF00] text-black text-[10px] font-black tracking-widest uppercase rounded-sm">
                  {item.stat}
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-xs mb-6 leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {item.desc}
                  </p>
                  <FitnessButton href={routes.schedule} variant="outline" className="w-full">
                    Explore Schedule
                  </FitnessButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION TIMETABLE */}
      <section className="bg-[#111] border-y border-white/10 py-24 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#CCFF00] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">WEEKLY ATHLETIC SESSIONS</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-white">
            READY TO DROP IN?
          </h2>
          <p className="text-white/60 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Reserve your lifting platform or secure a spot in our daily coach-led programming. Strictly capped class sizes apply.
          </p>
          <div className="pt-4">
            <FitnessButton href={routes.schedule} variant="primary">
              View Class Schedule <ArrowRight className="w-4 h-4 ml-1" />
            </FitnessButton>
          </div>
        </div>
      </section>
    </div>
  );
}
