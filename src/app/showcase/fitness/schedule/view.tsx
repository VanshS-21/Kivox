"use client";

import { useState, useMemo } from "react";
import { useFitness } from "../context";
import { ClassCard } from "../components";
import { fitnessTokens } from "../tokens";
import { Info } from "lucide-react";

export default function SchedulePage() {
  const { classes } = useFitness();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedCoach, setSelectedCoach] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const coaches = ["All", "Kabir Dev", "Priya Nair", "Vikram Malhotra"];
  const levels = ["All", "Advanced", "Intermediate", "All Levels"];

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      // For demo, Monday/Wednesday/Friday show all classes; other days show subset or staggered times
      // To keep it simple and stable, let's show items depending on day filters
      const dayMatches = true; // All classes visible for simplicity, but we can filter
      const coachMatches = selectedCoach === "All" || item.trainer === selectedCoach;
      const levelMatches = selectedLevel === "All" || item.level === selectedLevel;
      return dayMatches && coachMatches && levelMatches;
    });
  }, [classes, selectedCoach, selectedLevel]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 font-sans">
      <header className="mb-12">
        <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">RESERVE YOUR STATION</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mt-2 leading-none">
          TIMETABLE SCHEDULE
        </h1>
        <p className="text-white/60 text-sm mt-3 max-w-xl">
          Class bookings open 7 days in advance. Select a coach, experience bracket, and time slot below to secure your spot.
        </p>
      </header>

      {/* FILTER CRITERIA */}
      <div className="grid lg:grid-cols-12 gap-8 mb-12 items-start">
        {/* Day Selector */}
        <div className="lg:col-span-12 flex gap-2 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className="px-6 py-3 text-[10px] font-black uppercase tracking-wider border transition-all shrink-0 skew-x-[-8deg]"
              style={{
                backgroundColor: selectedDay === day ? fitnessTokens.color.neonGreen : "transparent",
                color: selectedDay === day ? "#000000" : "#FFFFFF",
                borderColor: selectedDay === day ? fitnessTokens.color.neonGreen : "rgba(255, 255, 255, 0.15)",
              }}
            >
              <span className="block skew-x-[8deg]">{day}</span>
            </button>
          ))}
        </div>

        {/* Coach and Level Dropdown Filters */}
        <div className="lg:col-span-12 flex flex-wrap gap-4 bg-[#111] p-4 border border-white/5 rounded-sm">
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1.5">Coach</label>
            <select
              value={selectedCoach}
              onChange={(e) => setSelectedCoach(e.target.value)}
              className="bg-black border border-white/10 px-4 py-2 rounded-sm text-xs font-bold text-white outline-none focus:border-[#CCFF00]"
            >
              {coaches.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1.5">Intensity</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-black border border-white/10 px-4 py-2 rounded-sm text-xs font-bold text-white outline-none focus:border-[#CCFF00]"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid displaying filtered classes */}
      {filteredClasses.length === 0 ? (
        <div className="border border-white/10 p-12 text-center text-white/60 space-y-3 rounded-sm bg-[#111]">
          <Info className="w-10 h-10 mx-auto text-[#CCFF00] opacity-80" />
          <p className="font-bold text-sm">No classes found matching the active filters.</p>
          <p className="text-xs">Try selecting a different coach or training level.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((item) => (
            <ClassCard
              key={item.id}
              id={item.id}
              name={item.name}
              trainer={item.trainer}
              level={item.level}
              time={item.time}
              duration={item.duration}
              spotsLeft={item.spotsLeft}
              capacity={item.capacity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
