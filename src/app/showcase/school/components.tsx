"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight, GraduationCap, MapPin, Mail, Phone } from "lucide-react";
import { schoolTokens, routes } from "./tokens";
import { useSchool } from "./context";

function getViewFromHref(href: string): { view: string; id?: string } | null {
  if (!href.startsWith("/showcase/school")) return null;
  if (href === "/showcase/school" || href === "/showcase/school/") return { view: "home" };
  if (href.startsWith("/showcase/school/programs/")) {
    const parts = href.split("/");
    const id = parts[parts.length - 1];
    return { view: "program-detail", id };
  }
  if (href.startsWith("/showcase/school/programs")) return { view: "programs" };
  if (href.startsWith("/showcase/school/admissions")) return { view: "admissions" };
  if (href.startsWith("/showcase/school/inquiry")) return { view: "inquiry" };
  if (href.startsWith("/showcase/school/parent-status")) return { view: "parent-status" };
  return null;
}

export function SchoolButton({
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
  variant?: "primary" | "secondary" | "outline" | "text";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  const { changeView } = useSchool();
  const baseClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 font-sans";

  let styles = {};
  if (variant === "primary") {
    styles = {
      backgroundColor: schoolTokens.color.bgGreenDark,
      color: "#FFFFFF",
    };
  } else if (variant === "secondary") {
    styles = {
      backgroundColor: schoolTokens.color.sage,
      color: "#FFFFFF",
    };
  } else if (variant === "outline") {
    styles = {
      border: `1px solid ${schoolTokens.color.bgGreenDark}`,
      color: schoolTokens.color.bgGreenDark,
      backgroundColor: "transparent",
    };
  } else {
    styles = {
      color: schoolTokens.color.sage,
      backgroundColor: "transparent",
      padding: "0",
      minHeight: "auto",
    };
  }

  const hoverClass =
    variant === "primary"
      ? "hover:bg-[#8A9A5B] hover:text-white"
      : variant === "secondary"
        ? "hover:bg-[#1E392A] hover:text-white"
        : variant === "outline"
          ? "hover:bg-[#1E392A] hover:text-white"
          : "hover:underline";

  const content = (
    <>
      {children}
      {variant !== "text" && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />}
    </>
  );

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
      <Link href={href} prefetch={false} className={`${baseClass} group ${hoverClass} ${className}`} style={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={handleOnClick} disabled={disabled} className={`${baseClass} group ${hoverClass} ${className}`} style={styles}>
      {content}
    </button>
  );
}

export function SchoolNav() {
  const { inquiry, view, changeView } = useSchool();

  return (
    <nav
      className="fixed top-[64px] left-4 right-4 md:left-8 md:right-8 z-40 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg max-w-[1400px] mx-auto font-sans"
      style={{
        backgroundColor: "oklch(0.985 0.004 90 / 0.85)",
        borderColor: "oklch(0.24 0.025 145 / 0.1)",
      }}
    >
      <div className="px-6 md:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => changeView("home")} className="flex items-center gap-3 select-none bg-transparent border-0 cursor-pointer p-0 text-left">
          <div 
            className="w-10 h-10 text-white flex items-center justify-center rounded-full transition-transform hover:rotate-12 duration-300"
            style={{ backgroundColor: schoolTokens.color.bgGreenDark }}
          >
            <span className="font-serif text-lg font-bold">G</span>
          </div>
          <div className="flex flex-col">
            <span 
              className="text-sm font-bold tracking-tight leading-none"
              style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
            >
              GREENFIELD
            </span>
            <span 
              className="text-[8px] font-bold tracking-[0.2em] uppercase mt-1"
              style={{ color: schoolTokens.color.sage }}
            >
              ACADEMY • BENGALURU
            </span>
          </div>
        </button>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: schoolTokens.color.bgGreenDark }}>
          <button 
            onClick={() => changeView("programs")} 
            className={`hover:opacity-75 transition-opacity min-h-11 inline-flex items-center relative bg-transparent border-0 cursor-pointer p-0 font-bold uppercase tracking-[0.15em] text-[10px] ${
              view === "programs" || view === "program-detail" ? "after:absolute after:bottom-3 after:left-0 after:right-0 after:h-0.5" : ""
            }`}
            style={{ 
              color: (view === "programs" || view === "program-detail") ? schoolTokens.color.sage : schoolTokens.color.bgGreenDark,
            }}
          >
            Programs
            {(view === "programs" || view === "program-detail") && (
              <span className="absolute bottom-4 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: schoolTokens.color.sage }} />
            )}
          </button>
          <button 
            onClick={() => changeView("admissions")} 
            className={`hover:opacity-75 transition-opacity min-h-11 inline-flex items-center relative bg-transparent border-0 cursor-pointer p-0 font-bold uppercase tracking-[0.15em] text-[10px] ${
              view === "admissions" ? "after:absolute after:bottom-3 after:left-0 after:right-0 after:h-0.5" : ""
            }`}
            style={{ 
              color: view === "admissions" ? schoolTokens.color.sage : schoolTokens.color.bgGreenDark,
            }}
          >
            Admissions
            {view === "admissions" && (
              <span className="absolute bottom-4 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: schoolTokens.color.sage }} />
            )}
          </button>
          <button 
            onClick={() => changeView("parent-status")} 
            className={`hover:opacity-75 transition-opacity min-h-11 inline-flex items-center relative bg-transparent border-0 cursor-pointer p-0 font-bold uppercase tracking-[0.15em] text-[10px] ${
              view === "parent-status" ? "after:absolute after:bottom-3 after:left-0 after:right-0 after:h-0.5" : ""
            }`}
            style={{ 
              color: view === "parent-status" ? schoolTokens.color.sage : schoolTokens.color.bgGreenDark,
            }}
          >
            <span className="flex items-center gap-1.5">
              Portal
              {inquiry && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </span>
            {view === "parent-status" && (
              <span className="absolute bottom-4 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: schoolTokens.color.sage }} />
            )}
          </button>
        </div>

        {/* Action */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => changeView("parent-status")} 
            className="hidden min-h-11 items-center text-[9px] font-bold uppercase tracking-[0.1em] transition-colors md:inline-flex border-r pr-4 bg-transparent border-0 border-r border-solid cursor-pointer"
            style={{ 
              color: "oklch(0.24 0.025 145 / 0.6)", 
              borderColor: "oklch(0.24 0.025 145 / 0.15)"
            }}
          >
            Parent Access
          </button>
          <SchoolButton href={routes.inquiry} variant="primary" className="!rounded-full !px-5 !py-2 !min-h-9 !text-[9px]">
            Inquire
          </SchoolButton>
        </div>
      </div>
    </nav>
  );
}

export function SchoolFooter() {
  const { changeView } = useSchool();
  return (
    <footer
      className="pt-24 pb-12 px-6 md:px-12 border-t text-white"
      style={{
        backgroundColor: schoolTokens.color.bgGreenFooter,
        borderColor: "oklch(0.985 0.004 90 / 0.08)",
      }}
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 font-sans">
        <div className="space-y-6">
          <button onClick={() => changeView("home")} className="flex items-center gap-3 bg-transparent border-0 cursor-pointer p-0 text-left text-white">
            <div 
              className="w-9 h-9 flex items-center justify-center rounded-full text-white"
              style={{ backgroundColor: schoolTokens.color.sage }}
            >
              <span className="font-serif text-lg font-bold">G</span>
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: schoolTokens.font.display }}>
              Greenfield Academy
            </span>
          </button>
          <p className="text-sm opacity-70 leading-relaxed max-w-xs font-light">
            Providing a rigorous, progressive academic pathway in Bengaluru since 2004.
          </p>
          <div 
            className="p-4 rounded-sm border text-[11px] leading-relaxed opacity-85" 
            style={{ 
              borderColor: "oklch(0.985 0.004 90 / 0.1)", 
              backgroundColor: "oklch(0.985 0.004 90 / 0.02)" 
            }}
          >
            <strong>Demo Portal Notice:</strong> Greenfield Academy is an educational demonstrator. Forms and checklist states are held in-memory locally.
          </div>
        </div>

        <div className="flex flex-col gap-3 items-start">
          <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-left" style={{ color: schoolTokens.color.sage }}>
            Admissions
          </h5>
          <button onClick={() => changeView("inquiry")} className="text-sm opacity-70 hover:opacity-100 hover:text-white transition-all bg-transparent border-0 cursor-pointer p-0 text-left font-sans text-white">Online Inquiry Form</button>
          <button onClick={() => changeView("admissions")} className="text-sm opacity-70 hover:opacity-100 hover:text-white transition-all bg-transparent border-0 cursor-pointer p-0 text-left font-sans text-white">Tuition & Deadlines</button>
          <button onClick={() => changeView("parent-status")} className="text-sm opacity-70 hover:opacity-100 hover:text-white transition-all bg-transparent border-0 cursor-pointer p-0 text-left font-sans text-white">Applicant Status Checklist</button>
        </div>

        <div className="space-y-4">
          <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: schoolTokens.color.sage }}>
            Campus Location
          </h5>
          <div className="flex gap-2.5 text-sm opacity-70">
            <MapPin className="w-4 h-4 shrink-0 mt-1" style={{ color: schoolTokens.color.sage }} />
            <span>Chikkanayakanahalli,<br />Off Sarjapur Road,<br />Bengaluru, Karnataka 560035</span>
          </div>
          <div className="flex gap-2.5 text-sm opacity-70">
            <Phone className="w-4 h-4 shrink-0 mt-0.5" style={{ color: schoolTokens.color.sage }} />
            <span>+91 80 4912 8888</span>
          </div>
          <div className="flex gap-2.5 text-sm opacity-70">
            <Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: schoolTokens.color.sage }} />
            <span>admissions@greenfield.edu.in</span>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: schoolTokens.color.sage }}>
            Accreditation
          </h5>
          <p className="text-sm opacity-70 leading-relaxed font-light">
            Affiliated with the Council for the Indian School Certificate Examinations (CISCE) and an authorized International Baccalaureate (IB) World School.
          </p>
          <div 
            className="w-12 h-12 border flex items-center justify-center rounded-full"
            style={{ 
              borderColor: "oklch(0.985 0.004 90 / 0.2)",
              color: schoolTokens.color.sage 
            }}
          >
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div 
        className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t text-[10px] font-bold tracking-[0.15em] uppercase opacity-40 animate-fade-in" 
        style={{ borderColor: "oklch(0.985 0.004 90 / 0.08)" }}
      >
        <p>© {new Date().getFullYear()} Greenfield Academy. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <button onClick={() => changeView("home")} className="hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0 text-[10px] font-bold uppercase tracking-[0.15em] text-white">Accreditation Details</button>
          <button onClick={() => changeView("home")} className="hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0 text-[10px] font-bold uppercase tracking-[0.15em] text-white">Staff Directory</button>
        </div>
      </div>
    </footer>
  );
}
