"use client";

import Image from "next/image";
import { Star, Award, ShieldCheck, Users } from "lucide-react";
import { schoolTokens, routes } from "./tokens";
import { SchoolButton } from "./components";

export default function SchoolHomeView() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
      {/* HERO SECTION */}
      <section className="relative h-[85vh] min-h-[650px] flex items-center md:items-end pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/showcase/greenfield-campus.png"
            alt="Greenfield Academy Bengaluru Campus"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-10000 scale-105 hover:scale-100"
            priority
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t via-[#1E392A]/50 to-transparent" 
            style={{ 
              backgroundImage: `linear-gradient(to top, ${schoolTokens.color.bgGreenDark} 0%, oklch(0.24 0.025 145 / 0.6) 50%, transparent 100%)` 
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full mt-24 md:mt-0">
          <div className="max-w-3xl">
            <span 
              className="inline-block px-3 py-1 text-white text-[9px] font-bold tracking-[0.25em] uppercase mb-6 rounded-full animate-pulse"
              style={{ backgroundColor: schoolTokens.color.sage }}
            >
              Admissions Open • Academic Year 2026-27
            </span>
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6 text-white"
              style={{ fontFamily: schoolTokens.font.display }}
            >
              Cultivating Intellect.<br />
              Inspiring Character.
            </h1>
            <p className="text-sm md:text-lg text-white/80 max-w-xl leading-relaxed mb-8 font-light font-sans">
              A premier independent progressive day and boarding academy in Bengaluru, offering CISCE & IB pathways for grades Pre-K through 12.
            </p>
            <div className="flex flex-wrap gap-4">
              <SchoolButton href={routes.programs} variant="secondary" className="!rounded-full hover:shadow-lg transition-shadow">
                Discover Greenfield
              </SchoolButton>
              <SchoolButton 
                href={routes.admissions} 
                variant="outline" 
                className="!border-white !text-white hover:!bg-white/10 !rounded-full"
              >
                View Fees & Schedule
              </SchoolButton>
            </div>
          </div>
        </div>
      </section>

      {/* STATS DOSSIER CARDS */}
      <section className="py-16 px-6 md:px-12 -mt-10 relative z-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          
          <div 
            className="p-8 rounded-2xl border bg-white shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[200px]"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}
          >
            <div>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: "oklch(0.62 0.08 115 / 0.1)" }}
              >
                <Award className="w-5 h-5" style={{ color: schoolTokens.color.sage }} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark }}>100%</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/50 mt-1">Matriculation</p>
            </div>
            <p className="text-xs opacity-75 mt-3 leading-relaxed">Acceptances to premier Indian & global universities annually.</p>
          </div>

          <div 
            className="p-8 rounded-2xl border bg-white shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[200px]"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}
          >
            <div>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: "oklch(0.62 0.08 115 / 0.1)" }}
              >
                <Users className="w-5 h-5" style={{ color: schoolTokens.color.sage }} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark }}>8:1</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/50 mt-1">Student-Teacher Ratio</p>
            </div>
            <p className="text-xs opacity-75 mt-3 leading-relaxed">Harkness roundtable classroom dialogue for personalized learning.</p>
          </div>

          <div 
            className="p-8 rounded-2xl border bg-white shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[200px]"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}
          >
            <div>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: "oklch(0.62 0.08 115 / 0.1)" }}
              >
                <ShieldCheck className="w-5 h-5" style={{ color: schoolTokens.color.sage }} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark }}>Dual</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/50 mt-1">Academics Board</p>
            </div>
            <p className="text-xs opacity-75 mt-3 leading-relaxed">Integrated CISCE (ICSE/ISC) & International Baccalaureate pathways.</p>
          </div>

          <div 
            className="p-8 rounded-2xl border bg-white shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[200px]"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}
          >
            <div>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: "oklch(0.62 0.08 115 / 0.1)" }}
              >
                <Star className="w-5 h-5" style={{ color: schoolTokens.color.sage }} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark }}>10-Acre</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/50 mt-1">Green Campus</p>
            </div>
            <p className="text-xs opacity-75 mt-3 leading-relaxed">Biophilic classrooms, sports arenas & professional labs in Sarjapur.</p>
          </div>

        </div>
      </section>

      {/* ACADEMIC WELCOME DOSSIER */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/media/showcase/greenfield-library.png"
              alt="Tuesdays at Greenfield - Library Candid"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-wider text-[#1E392A] shadow-sm">
              📷 Tuesdays at Greenfield • Collaborative Study Space
            </div>
          </div>

          <div className="space-y-6">
            <span 
              className="text-[10px] font-bold tracking-[0.25em] uppercase block"
              style={{ color: schoolTokens.color.sage }}
            >
              Academic Ethos & Dialogue
            </span>
            <h2 
              className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
            >
              Preparing progressive thinkers for global challenges.
            </h2>
            <p className="text-sm md:text-base leading-relaxed font-light text-black/75 font-sans">
              Since our founding in Bengaluru, Greenfield Academy has pioneered a learner-centric academic framework. We do not drill rote answers, but empower young minds with the dialectic and research tools to analyze complex systems independently.
            </p>
            <p className="text-sm md:text-base leading-relaxed font-light text-black/75 font-sans">
              Our biophilic campus incorporates Harkness tables and project studios that support collaborative inquiry, preparing students direct-to-career and direct-to-university.
            </p>
            <div className="pt-4">
              <SchoolButton href={routes.programs} variant="outline" className="!rounded-full hover:shadow-md">
                Explore Curriculum Pathways
              </SchoolButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
