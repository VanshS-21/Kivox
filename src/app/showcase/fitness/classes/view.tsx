"use client";

import { useState } from "react";
import Image from "next/image";
import { useFitness } from "../context";
import { routes } from "../tokens";
import { FitnessButton } from "../components";
import { ArrowLeft, Target, Heart, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ClassDetailPage() {
  const { classes, trainers, bookedClasses, bookClass, selectedId } = useFitness();
  const classId = selectedId;

  const classData = classes.find((c) => c.id === classId);
  const isBooked = bookedClasses.some((b) => b.classId === classId);

  // Stations map selection state
  const [selectedStation, setSelectedStation] = useState<number | null>(null);

  if (!classData) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
        <h1 className="text-3xl font-black uppercase italic text-[#CCFF00]">Class Not Found</h1>
        <p className="text-sm text-white/70">The training slot you are looking for does not exist or has been rescheduled.</p>
        <FitnessButton href={routes.schedule} variant="primary">
          Back to Timetable
        </FitnessButton>
      </div>
    );
  }

  // Get matching coach dossier info
  const trainerData = trainers.find((t) => t.name === classData.trainer);

  // Generate deterministic layout for stations map
  const totalStations = classData.capacity;
  const takenStationsCount = totalStations - classData.spotsLeft;
  const stations = Array.from({ length: totalStations }, (_, i) => {
    // Deterministic distribution of filled slots
    const isTaken = ((i * 7) + 3) % totalStations < takenStationsCount;
    return { id: i + 1, isTaken };
  });

  const levelColor =
    classData.level === "Advanced"
      ? "text-[#FF3333] border-[#FF3333]/30 bg-[#FF3333]/10"
      : classData.level === "Intermediate"
        ? "text-[#FF9900] border-[#FF9900]/30 bg-[#FF9900]/10"
        : "text-[#CCFF00] border-[#CCFF00]/30 bg-[#CCFF00]/10";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-sans space-y-8">
      {/* Breadcrumb back navigation */}
      <div>
        <FitnessButton href={routes.schedule} variant="secondary" className="!min-h-9 !py-1 px-4">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Schedule
        </FitnessButton>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left main info */}
        <div className="md:col-span-8 space-y-8">
          <div className="border border-white/10 p-6 md:p-8 bg-[#111] rounded-sm space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest border rounded-sm ${levelColor}`}>
                {classData.level}
              </span>
              <span className="font-mono text-xs text-white/50">{classData.duration} Session</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
              {classData.name}
            </h1>
            <p className="text-white/70 text-sm leading-relaxed">
              {classData.description}
            </p>
          </div>

          {/* Hub Station Layout Map */}
          <div className="border border-white/10 p-6 md:p-8 bg-[#111] rounded-sm space-y-6">
            <div>
              <h2 className="text-lg font-black uppercase italic tracking-wider text-white">
                Select Your Hub Station
              </h2>
              <p className="text-xs text-white/50 mt-1">
                Choose a specific training console spot from the live Vortex floor plan below.
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 border border-white/5 bg-black/40 p-4 rounded-sm">
              {stations.map((station) => {
                const isSelected = selectedStation === station.id;
                return (
                  <button
                    key={station.id}
                    type="button"
                    disabled={station.isTaken || isBooked}
                    onClick={() => setSelectedStation(station.id)}
                    className={`h-12 border rounded-sm flex flex-col items-center justify-center transition-all select-none ${
                      station.isTaken
                        ? "border-red-500/10 bg-red-950/5 text-red-500/35 cursor-not-allowed"
                        : isBooked
                          ? "border-white/5 bg-white/2 text-white/30 cursor-not-allowed"
                          : isSelected
                            ? "border-[#CCFF00] bg-[#CCFF00]/10 text-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.15)]"
                            : "border-white/10 bg-black text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <span className="text-[9px] font-mono leading-none">STATION</span>
                    <span className="text-xs font-mono font-black mt-1">#{station.id}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 text-[10px] font-mono text-white/40 uppercase">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-white/10 bg-black" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-red-500/10 bg-red-950/10" />
                <span>Occupied</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border border-[#CCFF00] bg-[#CCFF00]/10" />
                <span className="text-[#CCFF00]">Selected</span>
              </div>
            </div>
          </div>

          <div className="border border-white/10 p-6 md:p-8 bg-[#111] rounded-sm">
            <h2 className="text-lg font-black uppercase italic tracking-wider mb-6 text-white">
              Session Focus & Physiology
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-[#CCFF00] shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Target Muscle Group</p>
                  <p className="text-sm font-bold text-white mt-0.5">{classData.muscleFocus}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-[#CCFF00] shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Cardiac Intensity</p>
                  <p className="text-sm font-bold text-white mt-0.5">{classData.heartRateZone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar stats */}
        <div className="md:col-span-4 space-y-6">
          <div className="border border-white/10 p-6 bg-[#111] rounded-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/50 border-b border-white/10 pb-3">
              Session Stats
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Coached By:</span>
                <span className="font-bold text-white">{classData.trainer}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Scheduled Time:</span>
                <span className="font-bold text-[#CCFF00] font-mono">{classData.time}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Capacity:</span>
                <span className="font-bold text-white">{classData.capacity} Stations</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Stations Available:</span>
                <span className="font-bold text-[#CCFF00] font-mono">{classData.spotsLeft} Open</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              {!isBooked && !selectedStation && (
                <div className="flex gap-2 p-2.5 border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] items-start">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Please select a station on the floor plan map to unlock reservation.</span>
                </div>
              )}

              {isBooked ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#CCFF00] font-bold p-3 bg-[#CCFF00]/10 border border-[#CCFF00]/20">
                    <CheckCircle2 className="w-4 h-4" /> Reserved
                  </div>
                  <FitnessButton href={routes.member} variant="secondary" className="w-full">
                    View Member Portal
                  </FitnessButton>
                </div>
              ) : (
                <FitnessButton
                  onClick={() => selectedStation && bookClass(classData.id)}
                  variant="primary"
                  disabled={!selectedStation}
                  className="w-full"
                >
                  Book Station {selectedStation ? `#${selectedStation}` : ""}
                </FitnessButton>
              )}
            </div>
          </div>

          {/* Coach Dossier Profile Card */}
          {trainerData && (
            <div className="border border-white/10 p-6 bg-[#111] rounded-sm space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/50 border-b border-white/10 pb-2">
                Your Coach
              </h3>
              <div className="flex gap-4 items-center">
                <div className="relative w-16 h-16 rounded-sm border border-white/10 overflow-hidden shrink-0 bg-neutral-900">
                  <Image
                    src={trainerData.image}
                    alt={trainerData.name}
                    fill
                    sizes="64px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{trainerData.name}</h4>
                  <p className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider">{trainerData.role}</p>
                </div>
              </div>
              <p className="text-xs text-white/60 leading-relaxed italic">
                &ldquo;{trainerData.bio}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
