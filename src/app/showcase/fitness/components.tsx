"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Clock, MapPin, Check, User, Zap, Thermometer } from "lucide-react";
import { fitnessTokens, routes } from "./tokens";
import { useFitness } from "./context";

function getViewFromHref(href: string): { view: string; id?: string } | null {
  if (!href.startsWith("/showcase/fitness")) return null;
  if (href === "/showcase/fitness" || href === "/showcase/fitness/") return { view: "home" };
  if (href.startsWith("/showcase/fitness/schedule")) return { view: "schedule" };
  if (href.startsWith("/showcase/fitness/trainers")) return { view: "trainers" };
  if (href.startsWith("/showcase/fitness/pricing")) return { view: "pricing" };
  if (href.startsWith("/showcase/fitness/book")) return { view: "book" };
  if (href.startsWith("/showcase/fitness/member")) return { view: "member" };
  if (href.startsWith("/showcase/fitness/classes/")) {
    const parts = href.split("/");
    const id = parts[parts.length - 1];
    return { view: "class-detail", id };
  }
  return null;
}

export function FitnessButton({
  href,
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "accent";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  const { changeView } = useFitness();
  const baseClass =
    "relative inline-flex min-h-11 items-center justify-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 skew-x-[-8deg] disabled:cursor-not-allowed disabled:opacity-50 select-none";

  let styles = {};
  if (variant === "primary") {
    styles = {
      backgroundColor: fitnessTokens.color.neonGreen,
      color: "#000000",
    };
  } else if (variant === "secondary") {
    styles = {
      backgroundColor: fitnessTokens.color.bgCard,
      color: fitnessTokens.color.inkWhite,
      border: `1px solid ${fitnessTokens.color.border}`,
    };
  } else if (variant === "outline") {
    styles = {
      border: `1px solid ${fitnessTokens.color.neonGreen}`,
      color: fitnessTokens.color.neonGreen,
      backgroundColor: "transparent",
    };
  } else {
    styles = {
      backgroundColor: fitnessTokens.color.inkWhite,
      color: "#000000",
    };
  }

  const hoverClass =
    variant === "primary"
      ? "hover:bg-white hover:text-black"
      : variant === "secondary"
        ? "hover:bg-white hover:text-black"
        : variant === "outline"
          ? "hover:bg-[oklch(0.968_0.211_115)] hover:text-black"
          : "hover:bg-[oklch(0.968_0.211_115)] hover:text-black";

  const content = <span className="inline-flex items-center gap-2 skew-x-[8deg]">{children}</span>;

  const spaRoute = href ? getViewFromHref(href) : null;

  const handleOnClick = (e: React.MouseEvent) => {
    if (spaRoute) {
      e.preventDefault();
      changeView(spaRoute.view, spaRoute.id);
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  if (href && !spaRoute) {
    return (
      <Link href={href} prefetch={false} className={`${baseClass} ${hoverClass} ${className}`} style={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={handleOnClick} disabled={disabled} className={`${baseClass} ${hoverClass} ${className}`} style={styles}>
      {content}
    </button>
  );
}

export function FitnessNav() {
  const { bookedClasses, view, changeView } = useFitness();
  const [activeMembers, setActiveMembers] = useState(128);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMembers((current) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = current + delta;
        return next > 180 ? 180 : next < 90 ? 90 : next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className="fixed top-16 left-4 right-4 z-40 border rounded-full backdrop-blur-md transition-all duration-300 shadow-xl max-w-[1600px] mx-auto"
      style={{
        backgroundColor: "rgba(17, 17, 17, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="px-6 md:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => changeView("home")} className="text-xl md:text-2xl font-black tracking-tighter uppercase italic flex items-center gap-1.5 select-none text-left bg-transparent border-0 text-white cursor-pointer p-0">
          <Zap className="w-5 h-5 text-[#CCFF00] fill-[#CCFF00]" />
          VORTEX<span className="text-[#CCFF00]">FITNESS</span>
        </button>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] items-center">
          <button onClick={() => changeView("schedule")} className={`transition-colors hover:text-[#CCFF00] bg-transparent border-0 cursor-pointer p-0 font-bold uppercase tracking-[0.2em] text-[10px] ${view === "schedule" ? "text-[#CCFF00]" : "text-white"}`}>
            Schedule
          </button>
          <button onClick={() => changeView("trainers")} className={`transition-colors hover:text-[#CCFF00] bg-transparent border-0 cursor-pointer p-0 font-bold uppercase tracking-[0.2em] text-[10px] ${view === "trainers" ? "text-[#CCFF00]" : "text-white"}`}>
            Coaches
          </button>
          <button onClick={() => changeView("pricing")} className={`transition-colors hover:text-[#CCFF00] bg-transparent border-0 cursor-pointer p-0 font-bold uppercase tracking-[0.2em] text-[10px] ${view === "pricing" ? "text-[#CCFF00]" : "text-white"}`}>
            Pricing
          </button>
          <button onClick={() => changeView("member")} className={`transition-colors hover:text-[#CCFF00] bg-transparent border-0 cursor-pointer p-0 font-bold uppercase tracking-[0.2em] text-[10px] ${view === "member" ? "text-[#CCFF00]" : "text-white"} flex items-center gap-1`}>
            <User className="w-3 h-3" />
            <span>Portal ({bookedClasses.length})</span>
          </button>
        </div>

        {/* Live Telemetry Info */}
        <div className="hidden lg:flex items-center gap-6 border-l border-white/10 pl-6 text-[9px] font-mono tracking-wider uppercase text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-ping" />
            <span>{activeMembers}/200 ACTIVE</span>
          </span>
          <span className="flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>22°C / AQI 34</span>
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#CCFF00]" />
            <span>GRID: NORMAL</span>
          </span>
        </div>

        {/* Action */}
        <div>
          <FitnessButton href={routes.pricing} variant="primary" className="!min-h-9 !py-1 px-4 text-[10px]">
            Join Now
          </FitnessButton>
        </div>
      </div>
    </nav>
  );
}

export function ClassCard({
  id,
  name,
  trainer,
  level,
  time,
  duration,
  spotsLeft,
  capacity,
}: {
  id: string;
  name: string;
  trainer: string;
  level: "Advanced" | "Intermediate" | "All Levels";
  time: string;
  duration: string;
  spotsLeft: number;
  capacity: number;
}) {
  const { bookedClasses, bookClass } = useFitness();
  const isBooked = bookedClasses.some((item) => item.classId === id);

  const levelColor =
    level === "Advanced"
      ? "text-[#FF3333] bg-[#FF3333]/10 border-[#FF3333]/20"
      : level === "Intermediate"
        ? "text-[#FF9900] bg-[#FF9900]/10 border-[#FF9900]/20"
        : "text-[#CCFF00] bg-[#CCFF00]/10 border-[#CCFF00]/20";

  return (
    <div
      className="border p-6 bg-[#111] hover:border-white/20 transition-all flex flex-col justify-between gap-6"
      style={{ borderColor: fitnessTokens.color.border }}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-xl italic font-black text-[#CCFF00]">{time}</span>
          <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest border rounded-sm ${levelColor}`}>
            {level}
          </span>
        </div>
        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{name}</h3>
        <p className="text-xs text-white/50 mb-1">Coach: <strong className="text-white/80">{trainer}</strong></p>
        <p className="text-xs text-white/50">Duration: <strong className="text-white/80">{duration}</strong></p>
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#CCFF00]/70 mt-3">
          {spotsLeft} of {capacity} spots left
        </p>
      </div>

      <div className="flex gap-2">
        <FitnessButton href={routes.classDetail(id)} variant="secondary" className="flex-1">
          Info
        </FitnessButton>
        {isBooked ? (
          <FitnessButton href={routes.member} variant="outline" className="flex-1">
            Booked <Check className="w-3 h-3 ml-1" />
          </FitnessButton>
        ) : (
          <FitnessButton onClick={() => bookClass(id)} variant="primary" className="flex-1">
            Book
          </FitnessButton>
        )}
      </div>
    </div>
  );
}

export function FitnessFooter() {
  const { changeView } = useFitness();
  return (
    <footer
      className="bg-white text-black relative border-t border-white/10"
      style={{
        backgroundColor: fitnessTokens.color.inkWhite,
        color: fitnessTokens.color.bgBlack,
      }}
    >
      {/* Giant CTA Banner */}
      <div className="bg-[#CCFF00] py-20 px-6 text-center border-b border-black/10">
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 leading-none select-none">
          FORGE YOUR BODY
        </h2>
        <FitnessButton href={routes.pricing} variant="accent" className="bg-[#050505] text-white hover:bg-transparent hover:text-black border-2 border-transparent hover:border-black">
          Claim Free Trial <ArrowRight className="w-4 h-4 ml-1" />
        </FitnessButton>
      </div>

      {/* Info grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-sans">
        <div className="space-y-4">
          <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic flex items-center gap-1.5">
            <Zap className="w-5 h-5 text-[#4D6100]" />
            VORTEX<span className="text-[#4D6100]">FITNESS</span>
          </div>
          <p className="text-sm opacity-70 max-w-xs leading-relaxed">
            Uncompromising training methodologies, elite equipment, and raw conditioning spaces.
          </p>
          <div className="p-4 rounded-xl border text-[11px] leading-relaxed opacity-80 bg-black/5" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            <strong>Demo Portal Disclaimer:</strong> Vortex Fitness is an interactive demonstrator route. Workout logs and class reservations are stored in-memory client-side only.
          </div>
        </div>

        <div>
          <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-black">Location</h3>
          <div className="flex gap-2.5 text-sm opacity-80">
            <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-gray-500" />
            <div>
              <p className="font-bold">Vortex Fitness Hub</p>
              <p className="mt-0.5">80 Feet Road, Koramangala<br />Bengaluru, KA 560034</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-black">Operating Hours</h3>
          <div className="flex gap-2.5 text-sm opacity-80">
            <Clock className="w-5 h-5 shrink-0 mt-0.5 text-gray-500" />
            <div className="space-y-1.5">
              <p className="flex justify-between gap-6"><span className="font-bold">Mon - Fri</span> <span>05:00 - 23:00</span></p>
              <p className="flex justify-between gap-6"><span className="font-bold">Saturday</span> <span>06:00 - 20:00</span></p>
              <p className="flex justify-between gap-6"><span className="font-bold">Sunday</span> <span>07:00 - 18:00</span></p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-start">
          <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-black">Quick Links</h3>
          <button onClick={() => changeView("schedule")} className="text-sm opacity-70 hover:opacity-100 hover:underline bg-transparent border-0 cursor-pointer p-0 text-left font-sans text-black">Timetable Schedule</button>
          <button onClick={() => changeView("trainers")} className="text-sm opacity-70 hover:opacity-100 hover:underline bg-transparent border-0 cursor-pointer p-0 text-left font-sans text-black">Our Coaches</button>
          <button onClick={() => changeView("pricing")} className="text-sm opacity-70 hover:opacity-100 hover:underline bg-transparent border-0 cursor-pointer p-0 text-left font-sans text-black">Membership Pricing</button>
          <button onClick={() => changeView("member")} className="text-sm opacity-70 hover:opacity-100 hover:underline bg-transparent border-0 cursor-pointer p-0 text-left font-sans text-black">Client Portal</button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-widest uppercase opacity-60">
        <p>© {new Date().getFullYear()} Vortex Fitness. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <button onClick={() => changeView("home")} className="hover:opacity-100 bg-transparent border-0 cursor-pointer p-0 text-[10px] font-bold uppercase tracking-widest text-black/60">Waiver & Liability</button>
          <button onClick={() => changeView("home")} className="hover:opacity-100 bg-transparent border-0 cursor-pointer p-0 text-[10px] font-bold uppercase tracking-widest text-black/60">Terms of Use</button>
        </div>
      </div>
    </footer>
  );
}
