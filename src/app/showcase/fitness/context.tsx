"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type FitnessClass = {
  id: string;
  name: string;
  trainer: string;
  level: "Advanced" | "Intermediate" | "All Levels";
  time: string;
  duration: string;
  description: string;
  muscleFocus: string;
  heartRateZone: string;
  capacity: number;
  spotsLeft: number;
};

export type Trainer = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type BookedClass = {
  classId: string;
  bookedAt: string;
};

export type WorkoutLog = {
  id: string;
  date: string;
  classId: string;
  className: string;
  duration: string;
  calories: number;
};

type FitnessContextType = {
  classes: FitnessClass[];
  trainers: Trainer[];
  bookedClasses: BookedClass[];
  workoutLogs: WorkoutLog[];
  bookClass: (classId: string) => boolean;
  cancelClass: (classId: string) => void;
  addWorkoutLog: (className: string, duration: string, calories: number) => void;
  resetDemo: () => void;
  view: string;
  selectedId: string | undefined;
  changeView: (view: string, id?: string) => void;
};

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const initialClasses: FitnessClass[] = [
  {
    id: "vortex-hypertrophy",
    name: "Vortex Hypertrophy",
    trainer: "Kabir Dev",
    level: "Advanced",
    time: "06:00 AM",
    duration: "45 Min",
    description: "Progressive resistance overload training designed for maximum muscle growth and strength recruitment.",
    muscleFocus: "Chest, Shoulders, Triceps",
    heartRateZone: "Zone 3 (130-150 bpm)",
    capacity: 15,
    spotsLeft: 3,
  },
  {
    id: "endurance-engine",
    name: "Endurance Engine",
    trainer: "Priya Nair",
    level: "All Levels",
    time: "07:30 AM",
    duration: "60 Min",
    description: "High-intensity aerobic intervals combined with functional movement mechanics to stretch stamina capacity.",
    muscleFocus: "Full Body Cardiorespiratory",
    heartRateZone: "Zone 4 (150-175 bpm)",
    capacity: 20,
    spotsLeft: 8,
  },
  {
    id: "lunchtime-power",
    name: "Lunchtime Power",
    trainer: "Vikram Malhotra",
    level: "Intermediate",
    time: "12:00 PM",
    duration: "45 Min",
    description: "Brief, high-intensity compound lift sequences targetting explosive hip drive, power, and metabolic conditioning.",
    muscleFocus: "Glutes, Hamstrings, Core",
    heartRateZone: "Zone 3 (140-160 bpm)",
    capacity: 12,
    spotsLeft: 5,
  },
  {
    id: "vortex-hypertrophy-pm",
    name: "Vortex Hypertrophy PM",
    trainer: "Kabir Dev",
    level: "Advanced",
    time: "05:30 PM",
    duration: "45 Min",
    description: "Late-day heavy lifts focussing on pulling mechanical systems. Maximum hypertrophy and strict contraction tempos.",
    muscleFocus: "Back, Biceps, Core",
    heartRateZone: "Zone 3 (130-150 bpm)",
    capacity: 15,
    spotsLeft: 2,
  },
  {
    id: "mobility-flow",
    name: "Mobility Flow",
    trainer: "Priya Nair",
    level: "All Levels",
    time: "07:00 PM",
    duration: "30 Min",
    description: "Active decompression, stretching, and myofascial joint release to speed up muscle group recovery times.",
    muscleFocus: "Joints, Ligaments, Fascia",
    heartRateZone: "Zone 1 (90-110 bpm)",
    capacity: 25,
    spotsLeft: 18,
  },
  {
    id: "powerlifting-foundations",
    name: "Powerlifting Foundations",
    trainer: "Vikram Malhotra",
    level: "Intermediate",
    time: "08:30 AM",
    duration: "60 Min",
    description: "Master the big three lifts: Squat, Bench, and Deadlift. Core bracing and torque development.",
    muscleFocus: "Posterior Chain, Core, Chest",
    heartRateZone: "Zone 2 (110-130 bpm)",
    capacity: 10,
    spotsLeft: 4,
  },
];

export const initialTrainers: Trainer[] = [
  {
    id: "kabir-dev",
    name: "Kabir Dev",
    role: "Head of Strength",
    bio: "Former competitive strongman with 15+ years of coaching experience. Believes in heavy compound movements and mental resilience.",
    image: "/media/showcase/vortex-coach-kabir.png",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Endurance & Mobility",
    bio: "Ex-Olympic track athlete specialized in functional flexibility and VO2 Max enhancement. Committed to joint integrity.",
    image: "/media/showcase/vortex-coach-priya.png",
  },
  {
    id: "vikram-malhotra",
    name: "Vikram Malhotra",
    role: "Powerlifting Coach",
    bio: "IPF Elite lifter. Analytical approach to technical biomechanics, bar path optimization, and neurological peak pacing.",
    image: "/media/showcase/vortex-coach-vikram.png",
  },
];

const initialWorkoutLogs: WorkoutLog[] = [
  { id: "log-1", date: "May 19, 2026", classId: "vortex-hypertrophy", className: "Vortex Hypertrophy", duration: "45 Min", calories: 420 },
  { id: "log-2", date: "May 17, 2026", classId: "mobility-flow", className: "Mobility Flow", duration: "30 Min", calories: 150 },
];

export function FitnessProvider({ children }: { children: ReactNode }) {
  const [bookedClasses, setBookedClasses] = useState<BookedClass[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(initialWorkoutLogs);
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const changeView = useCallback((newView: string, id?: string) => {
    setView(newView);
    setSelectedId(id);
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("view", newView);
      if (id) {
        searchParams.set("id", id);
      } else {
        searchParams.delete("id");
      }
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({ view: newView, id }, "", newUrl);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view") || "home";
      const idParam = params.get("id") || undefined;
      setView(viewParam);
      setSelectedId(idParam);
    };

    // Initialize from URL on mount
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view") || "home";
    const idParam = params.get("id") || undefined;
    setView(viewParam);
    setSelectedId(idParam);

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const bookClass = useCallback((classId: string) => {
    let success = false;
    setBookedClasses((current) => {
      if (current.some((item) => item.classId === classId)) {
        return current; // already booked
      }
      success = true;
      return [...current, { classId, bookedAt: new Date().toLocaleDateString() }];
    });
    return success;
  }, []);

  const cancelClass = useCallback((classId: string) => {
    setBookedClasses((current) => current.filter((item) => item.classId !== classId));
  }, []);

  const addWorkoutLog = useCallback((className: string, duration: string, calories: number) => {
    setWorkoutLogs((current) => [
      {
        id: `log-${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        classId: "custom",
        className,
        duration,
        calories,
      },
      ...current,
    ]);
  }, []);

  const resetDemo = useCallback(() => {
    setBookedClasses([]);
    setWorkoutLogs(initialWorkoutLogs);
  }, []);

  return (
    <FitnessContext.Provider
      value={{
        classes: initialClasses,
        trainers: initialTrainers,
        bookedClasses,
        workoutLogs,
        bookClass,
        cancelClass,
        addWorkoutLog,
        resetDemo,
        view,
        selectedId,
        changeView,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error("useFitness must be used within a FitnessProvider");
  }
  return context;
}
