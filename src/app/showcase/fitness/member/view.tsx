"use client";

import { useState } from "react";
import { useFitness } from "../context";
import { fitnessTokens, routes } from "../tokens";
import { FitnessButton } from "../components";
import { Activity, Clock, Trash2, Calendar, Flame, Shield } from "lucide-react";

export default function MemberPortalPage() {
  const { bookedClasses, classes, cancelClass, workoutLogs, addWorkoutLog, resetDemo } = useFitness();

  const [classNameInput, setClassNameInput] = useState("");
  const [durationInput, setDurationInput] = useState("45 Min");
  const [caloriesInput, setCaloriesInput] = useState(350);
  const [isPtCharged, setIsPtCharged] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Volume load data points (Mon-Sun)
  const volumeData = [
    { day: "Mon", load: 60, type: "Bench Press", sets: "4x10 @ 60kg", coach: "Kabir Dev" },
    { day: "Tue", load: 75, type: "Deadlifts", sets: "5x5 @ 75kg", coach: "Vikram Malhotra" },
    { day: "Wed", load: 40, type: "Active Mobility", sets: "Joint Release Flow", coach: "Priya Nair" },
    { day: "Thu", load: 80, type: "Squat Depth", sets: "4x8 @ 80kg", coach: "Kabir Dev" },
    { day: "Fri", load: 95, type: "Olympic Cleans", sets: "6x3 @ 95kg", coach: "Vikram Malhotra" },
    { day: "Sat", load: 0, type: "Rest Day", sets: "Active Recovery Walk", coach: "None" },
    { day: "Sun", load: 30, type: "Mobility Flow", sets: "Yoga Stretch", coach: "Priya Nair" },
  ];

  function handleAddLog(e: React.FormEvent) {
    e.preventDefault();
    if (!classNameInput) return;
    
    // Append simulated PT label if checked
    const activityName = isPtCharged ? `${classNameInput} [PT Session: ₹1,500]` : classNameInput;
    addWorkoutLog(activityName, durationInput, Number(caloriesInput));
    setClassNameInput("");
    setIsPtCharged(false);
  }

  // Calculate streak / stats
  const totalCalories = workoutLogs.reduce((acc, log) => acc + log.calories, 0);
  const totalMinutes = workoutLogs.reduce((acc, log) => {
    const mins = parseInt(log.duration);
    return acc + (isNaN(mins) ? 0 : mins);
  }, 0);

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 font-sans space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/10">
        <div>
          <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">ATHLETE CONSOLE</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mt-1 leading-none text-white">
            MEMBER PORTAL
          </h1>
        </div>
        <button
          onClick={resetDemo}
          className="text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors border border-red-500/20 px-3.5 py-1.5 bg-red-950/10 hover:bg-red-950/20"
        >
          Reset Demo State
        </button>
      </header>

      {/* METRIC BOXES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="border border-white/10 p-6 bg-[#111] space-y-1 rounded-sm relative overflow-hidden hover:border-[#CCFF00]/40 transition-all duration-300 group">
          <div className="absolute top-4 right-4 text-[#CCFF00]/10 group-hover:scale-110 transition-transform duration-300">
            <Flame className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Weekly Streak</p>
          <p className="text-3xl font-black text-[#CCFF00] font-mono italic">4 DAYS</p>
        </div>

        <div className="border border-white/10 p-6 bg-[#111] space-y-1 rounded-sm relative overflow-hidden hover:border-[#CCFF00]/40 transition-all duration-300 group">
          <div className="absolute top-4 right-4 text-[#CCFF00]/10 group-hover:scale-110 transition-transform duration-300">
            <Activity className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Calories Burned</p>
          <p className="text-3xl font-black text-white font-mono">{totalCalories} kCal</p>
        </div>

        <div className="border border-white/10 p-6 bg-[#111] space-y-1 rounded-sm relative overflow-hidden hover:border-[#CCFF00]/40 transition-all duration-300 group">
          <div className="absolute top-4 right-4 text-[#CCFF00]/10 group-hover:scale-110 transition-transform duration-300">
            <Clock className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Training Time</p>
          <p className="text-3xl font-black text-white font-mono">{totalMinutes} Mins</p>
        </div>

        <div className="border border-white/10 p-6 bg-[#111] space-y-1 rounded-sm relative overflow-hidden hover:border-[#CCFF00]/40 transition-all duration-300 group">
          <div className="absolute top-4 right-4 text-[#CCFF00]/10 group-hover:scale-110 transition-transform duration-300">
            <Calendar className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Classes Reserved</p>
          <p className="text-3xl font-black text-[#CCFF00] font-mono">{bookedClasses.length}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Booked stations & history logs */}
        <div className="lg:col-span-8 space-y-8">
          {/* Reserved classes */}
          <div className="border border-white/10 p-6 md:p-8 bg-[#111] rounded-sm space-y-6">
            <h2 className="text-xl font-black uppercase italic tracking-wider text-white border-b border-white/10 pb-3">
              Reserved Stations
            </h2>

            {bookedClasses.length === 0 ? (
              <div className="text-center py-10 space-y-4">
                <p className="text-sm text-white/50">You do not have any active class bookings scheduled.</p>
                <FitnessButton href={routes.schedule} variant="primary">
                  Reserve a Station
                </FitnessButton>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {bookedClasses.map((booked) => {
                  const details = classes.find((c) => c.id === booked.classId);
                  if (!details) return null;
                  return (
                    <div key={booked.classId} className="py-4 flex justify-between items-center gap-4">
                      <div>
                        <h3 className="font-bold text-sm text-white">{details.name}</h3>
                        <p className="text-xs text-white/50 mt-1">
                          Coach: <strong className="text-white">{details.trainer}</strong> | Time:{" "}
                          <strong className="text-[#CCFF00] font-mono">{details.time}</strong>
                        </p>
                      </div>
                      <button
                        onClick={() => cancelClass(booked.classId)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2 text-xs flex items-center gap-1 uppercase tracking-wider font-bold border border-red-500/20 bg-red-950/10"
                        title="Cancel reservation"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Cancel</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Interactive training graph */}
          <div className="border border-white/10 p-6 md:p-8 bg-[#111] rounded-sm space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-3">
              <h2 className="text-xl font-black uppercase italic tracking-wider text-white">
                Training Volume Load
              </h2>
              <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-wider hidden sm:inline">
                Hover dots for session focus
              </span>
            </div>

            <div className="relative h-56 w-full bg-black/35 rounded border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
              {/* Tooltip Overlay */}
              {hoveredIndex !== null && (
                <div className="absolute top-2 left-2 z-10 bg-black/95 border border-[#CCFF00]/30 p-2.5 rounded-sm shadow-xl pointer-events-none text-[10px] space-y-1 font-mono min-w-[180px] backdrop-blur-sm">
                  <div className="flex justify-between text-[#CCFF00] font-black border-b border-white/10 pb-1">
                    <span>{volumeData[hoveredIndex].day} SESSION</span>
                    <span>{volumeData[hoveredIndex].load > 0 ? `${volumeData[hoveredIndex].load}kg` : "REST"}</span>
                  </div>
                  {volumeData[hoveredIndex].load > 0 ? (
                    <>
                      <div className="text-white">Focus: <strong className="text-[#CCFF00] font-bold">{volumeData[hoveredIndex].type}</strong></div>
                      <div className="text-white/60">Loadout: {volumeData[hoveredIndex].sets}</div>
                      <div className="text-white/40">Coach: {volumeData[hoveredIndex].coach}</div>
                    </>
                  ) : (
                    <div className="text-white/60">Active Recovery & Rest</div>
                  )}
                </div>
              )}

              {/* Custom SVG Line graph */}
              <div className="absolute inset-x-4 bottom-8 top-12">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

                  {/* Gradient Area under line */}
                  <path
                    d={`M0,${100 - volumeData[0].load} L16.6,${100 - volumeData[1].load} L33.3,${100 - volumeData[2].load} L50,${100 - volumeData[3].load} L66.6,${100 - volumeData[4].load} L83.3,${100 - volumeData[5].load} L100,${100 - volumeData[6].load} L100,100 L0,100 Z`}
                    fill="url(#grad)"
                    opacity="0.15"
                  />

                  {/* Highlight Line */}
                  <path
                    d={`M0,${100 - volumeData[0].load} L16.6,${100 - volumeData[1].load} L33.3,${100 - volumeData[2].load} L50,${100 - volumeData[3].load} L66.6,${100 - volumeData[4].load} L83.3,${100 - volumeData[5].load} L100,${100 - volumeData[6].load}`}
                    fill="none"
                    stroke="#CCFF00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interactive Circles */}
                  {volumeData.map((d, index) => {
                    const x = (index / (volumeData.length - 1)) * 100;
                    const y = 100 - d.load;
                    return (
                      <circle
                        key={d.day}
                        cx={x}
                        cy={y}
                        r={hoveredIndex === index ? 4.5 : 2.5}
                        fill={hoveredIndex === index ? "#CCFF00" : "#ffffff"}
                        stroke="#111"
                        strokeWidth="1"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    );
                  })}

                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#CCFF00" />
                      <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Graph Axis Labels */}
              <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase w-full">
                <span>100kg Peak</span>
                <span>Active Target Tracker</span>
              </div>
              <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase w-full border-t border-white/5 pt-2 mt-auto">
                {volumeData.map((d, i) => (
                  <span
                    key={d.day}
                    className={`cursor-pointer transition-colors duration-150 ${hoveredIndex === i ? "text-[#CCFF00] font-black" : "text-white/40"}`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {d.day}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side form and activity logs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Membership Details Card */}
          <div className="border border-white/10 p-6 bg-[#111] rounded-sm space-y-4 relative overflow-hidden hover:border-[#CCFF00]/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#CCFF00]/5 to-transparent pointer-events-none" />
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#CCFF00] font-mono">Subscription Active</span>
                <h3 className="text-base font-black uppercase italic tracking-wider text-white mt-0.5">VORTEX UNLIMITED</h3>
              </div>
              <Shield className="w-5 h-5 text-[#CCFF00]" />
            </div>
            
            <div className="space-y-2 border-t border-white/5 pt-3 text-[11px]">
              <div className="flex justify-between">
                <span className="text-white/40">Base Price:</span>
                <span className="font-bold text-white font-mono">₹4,500 / Month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Location:</span>
                <span className="font-bold text-white">Sarjapur Road, BLR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Support Phone:</span>
                <span className="font-bold text-[#CCFF00] font-mono">+91 80 4912 8000</span>
              </div>
            </div>
          </div>

          {/* Custom workout logger form */}
          <div className="border border-white/10 p-6 bg-[#111] rounded-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/50 border-b border-white/10 pb-2">
              Log Custom Workout
            </h3>

            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Workout Activity</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Weights Chest Press"
                  value={classNameInput}
                  onChange={(e) => setClassNameInput(e.target.value)}
                  className="w-full p-2.5 rounded-sm border bg-black text-xs text-white outline-none focus:border-[#CCFF00] transition-colors"
                  style={{ borderColor: fitnessTokens.color.border }}
                />
                
                {/* Suggestions for localized classes */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {[
                    "Vortex Hypertrophy (Sarjapur)",
                    "Endurance Engine Intervals",
                    "Powerlifting Foundations",
                    "Mobility Deck Flow"
                  ].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setClassNameInput(sug)}
                      className="text-[8px] font-mono uppercase bg-white/5 hover:bg-[#CCFF00]/10 text-white/60 hover:text-[#CCFF00] border border-white/5 hover:border-[#CCFF00]/20 px-2 py-0.5 transition-all"
                    >
                      + {sug.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Duration</label>
                  <select
                    value={durationInput}
                    onChange={(e) => setDurationInput(e.target.value)}
                    className="w-full p-2.5 rounded-sm border bg-black text-xs text-white outline-none focus:border-[#CCFF00] transition-colors"
                    style={{ borderColor: fitnessTokens.color.border }}
                  >
                    <option value="15 Min">15 Min</option>
                    <option value="30 Min">30 Min</option>
                    <option value="45 Min">45 Min</option>
                    <option value="60 Min">60 Min</option>
                    <option value="90 Min">90 Min</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Calories (Est)</label>
                  <input
                    type="number"
                    value={caloriesInput}
                    onChange={(e) => setCaloriesInput(Number(e.target.value))}
                    className="w-full p-2.5 rounded-sm border bg-black text-xs text-white outline-none focus:border-[#CCFF00] transition-colors"
                    style={{ borderColor: fitnessTokens.color.border }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 border border-white/5 p-3 bg-black/40 rounded-sm">
                <input
                  type="checkbox"
                  id="addonCharge"
                  checked={isPtCharged}
                  onChange={(e) => setIsPtCharged(e.target.checked)}
                  className="cursor-pointer accent-[#CCFF00]"
                />
                <label htmlFor="addonCharge" className="text-[10px] text-white/50 leading-none cursor-pointer select-none">
                  Add Private Coach Session (₹1,500 fee)
                </label>
              </div>

              <button
                type="submit"
                disabled={!classNameInput}
                className="w-full py-3 bg-[#CCFF00] hover:bg-white text-black text-xs font-black uppercase tracking-widest skew-x-[-8deg] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="block skew-x-[8deg]">Log Workout</span>
              </button>
            </form>
          </div>

          {/* Activity Logs feed */}
          <div className="border border-white/10 p-6 bg-[#111] rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/50 border-b border-white/10 pb-2">
              Recent Training Logs
            </h3>

            <div className="space-y-4 max-h-60 overflow-y-auto">
              {workoutLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-start gap-4 border-b border-white/5 pb-3">
                  <div>
                    <p className="font-bold text-xs text-white leading-tight">{log.className}</p>
                    <p className="text-[9px] text-white/40 mt-1">{log.date} | {log.duration}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#CCFF00] shrink-0">+{log.calories} kCal</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
