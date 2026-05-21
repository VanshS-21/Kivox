"use client";

import Image from "next/image";
import { useFitness } from "../context";
import { fitnessTokens, routes } from "../tokens";
import { FitnessButton } from "../components";
import { Dumbbell, Trophy, Heart } from "lucide-react";

export default function TrainersPage() {
  const { trainers } = useFitness();

  const specialties = [
    { icon: <Dumbbell className="w-4 h-4 text-[#CCFF00]" />, title: "Hypertrophy & Strength" },
    { icon: <Heart className="w-4 h-4 text-[#CCFF00]" />, title: "VO2 Max & Conditioning" },
    { icon: <Trophy className="w-4 h-4 text-[#CCFF00]" />, title: "Elite Olympic Mechanics" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 font-sans">
      <header className="mb-16">
        <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">ELITE INSTRUCTION</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mt-2 leading-none">
          HEAD COACHES
        </h1>
        <p className="text-white/60 text-sm mt-3 max-w-xl">
          Learn from industry-leading coaches with certified athletic backgrounds. Strict biomechanics monitoring is guaranteed.
        </p>
      </header>

      {/* Roster Grid */}
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {trainers.map((coach) => (
          <div key={coach.id} className="border bg-[#111] hover:border-white/20 transition-all flex flex-col justify-between" style={{ borderColor: fitnessTokens.color.border }}>
            <div>
              {/* Coach Image */}
              <div className="relative aspect-square overflow-hidden bg-black border-b" style={{ borderColor: fitnessTokens.color.border }}>
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale opacity-80 hover:opacity-100 hover:scale-102 transition-all duration-500"
                />
              </div>

              {/* Coach Copy */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#CCFF00]">
                    {coach.role}
                  </span>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mt-1">
                    {coach.name}
                  </h2>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  {coach.bio}
                </p>
              </div>
            </div>

            {/* Coach Actions */}
            <div className="p-6 pt-0">
              <FitnessButton href={routes.schedule} variant="outline" className="w-full">
                View Schedule
              </FitnessButton>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Pillar Band */}
      <div className="mt-20 border p-8 bg-[#111] grid sm:grid-cols-3 gap-8 rounded-sm" style={{ borderColor: fitnessTokens.color.border }}>
        {specialties.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="p-2 bg-white/5 border border-white/10 shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">{item.title}</h3>
              <p className="text-[11px] text-white/50 mt-1">
                Instruction built around strict movement alignment and progression templates.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
