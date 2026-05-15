"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useMedQueue } from "./context";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight, Clock, ShieldCheck, Users, Zap } from "lucide-react";
import Image from "next/image";
import { c, font } from "./tokens";

export default function MedQueueHome() {
  const { doctors, setSearchQuery } = useMedQueue();
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [location, setLocation] = useState("Maharashtra");
  const [locationFilter, setLocationFilter] = useState("");
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setIsLocationOpen(false);
        setLocationFilter("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const states = [
    "Andhra Pradesh","Assam","Bihar","Delhi","Goa","Gujarat","Haryana",
    "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Punjab",
    "Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal",
  ];

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (localSearch.trim()) setSearchQuery(localSearch);
    router.push("/showcase/medqueue/search");
  };

  const featured = doctors[0];
  const topDoctors = doctors.slice(1, 4);

  return (
    <div className="flex-1 flex flex-col">
      {/* ─── Hero ─── */}
      <section style={{ backgroundColor: c.hero }}>
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            <h1
              style={{
                fontFamily: font.display,
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                color: c.heroFg,
                textWrap: "balance" as const,
                marginBottom: "1.5rem",
              }}
            >
              Find the right doctor.
              <br />
              Book with{" "}
              <span style={{ fontFamily: font.serif, fontStyle: "italic", fontWeight: 400 }}>
                confidence.
              </span>
            </h1>

            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                color: c.heroMuted,
                maxWidth: "52ch",
                marginBottom: "2.5rem",
              }}
            >
              4,000+ verified specialists across India. Real credentials,
              live availability, instant booking. Search to confirmation
              in under 90 seconds.
            </p>

            {/* Search Bar */}
            <div className="relative" ref={locationRef}>
              <div
                className="flex items-stretch rounded-lg overflow-hidden"
                style={{
                  backgroundColor: "oklch(0.15 0.02 240)",
                  border: "1px solid oklch(0.30 0.03 240)",
                }}
              >
                <form
                  onSubmit={handleSearch}
                  className="flex-1 flex items-center px-4 py-3"
                >
                  <Search className="w-4 h-4 shrink-0" style={{ color: c.heroMuted }} />
                  <input
                    type="text"
                    placeholder="Specialty, symptom, or doctor name"
                    className="w-full pl-3 bg-transparent border-none placeholder:opacity-50"
                    style={{
                      outline: "none",
                      color: c.heroFg,
                      fontFamily: font.body,
                      fontSize: "0.9375rem",
                    }}
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                </form>

                <div
                  className="w-px my-2.5 shrink-0"
                  style={{ backgroundColor: "oklch(0.30 0.03 240)" }}
                />

                <button
                  type="button"
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="flex items-center gap-2 px-4 cursor-pointer shrink-0"
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    color: c.heroMuted,
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{location}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="px-6 py-3 font-semibold text-sm transition-opacity hover:opacity-80 shrink-0"
                  style={{
                    backgroundColor: c.accent,
                    color: c.heroFg,
                    fontFamily: font.body,
                  }}
                >
                  Search
                </button>
              </div>

              {/* Location Dropdown */}
              <AnimatePresence>
                {isLocationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 mt-2 w-64 rounded-lg z-50"
                    style={{
                      backgroundColor: c.surface,
                      border: `1px solid ${c.subtle}`,
                      boxShadow: "0 8px 32px oklch(0 0 0 / 0.12)",
                    }}
                  >
                    <div className="px-3 pt-3 pb-2">
                      <input
                        type="text"
                        placeholder="Search state..."
                        className="w-full px-3 py-1.5 text-sm rounded"
                        style={{
                          outline: "none",
                          backgroundColor: c.bg,
                          border: `1px solid ${c.subtle}`,
                          color: c.ink,
                          fontFamily: font.body,
                        }}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <ul className="max-h-48 overflow-y-auto py-1">
                      {states
                        .filter((s) =>
                          s.toLowerCase().includes((locationFilter || "").toLowerCase())
                        )
                        .map((state) => (
                          <li
                            key={state}
                            onClick={() => {
                              setLocation(state);
                              setIsLocationOpen(false);
                              setLocationFilter("");
                            }}
                            className="px-4 py-1.5 text-sm cursor-pointer transition-colors"
                            style={{
                              color: location === state ? c.accent : c.ink,
                              fontWeight: location === state ? 600 : 400,
                              fontFamily: font.body,
                            }}
                          >
                            {state}
                          </li>
                        ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Popular Specialties */}
            <div
              className="mt-5 flex flex-wrap gap-2 items-center"
              style={{
                fontFamily: font.mono,
                fontSize: "0.625rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              <span style={{ color: c.heroMuted }}>Popular</span>
              {["Cardiology", "Dermatology", "Neurology", "Orthopedics"].map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setLocalSearch(s);
                      setSearchQuery(s);
                      router.push("/showcase/medqueue/search");
                    }}
                    className="px-2.5 py-1 rounded transition-opacity hover:opacity-70"
                    style={{
                      border: "1px solid oklch(0.30 0.03 240)",
                      color: c.heroMuted,
                    }}
                  >
                    {s}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Strip (product voice) ─── */}
      <section
        className="px-6 py-5"
        style={{ backgroundColor: c.surface, borderBottom: `1px solid ${c.subtle}` }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
          style={{
            fontFamily: font.mono,
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: c.muted,
          }}
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: c.trust }} />
            NMC-verified credentials
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" style={{ color: c.accent }} />
            <span style={{ fontVariantNumeric: "tabular-nums", color: c.ink }}>87s</span> avg. booking time
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5" style={{ color: c.accent }} />
            <span style={{ fontVariantNumeric: "tabular-nums", color: c.ink }}>12M+</span> patients served
          </span>
        </div>
      </section>

      {/* ─── Featured Specialists ─── */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                style={{
                  fontFamily: font.display,
                  fontWeight: 600,
                  fontSize: "clamp(1.5rem, 2vw + 0.5rem, 2rem)",
                  letterSpacing: "-0.01em",
                  color: c.ink,
                }}
              >
                Top-rated specialists
              </h2>
              <p style={{ color: c.muted, fontSize: "0.875rem", marginTop: "0.25rem" }}>
                Verified outcomes. Real credentials. Available now.
              </p>
            </div>
            <button
              onClick={() => router.push("/showcase/medqueue/search")}
              className="hidden md:flex items-center gap-2 transition-opacity hover:opacity-60 group"
              style={{
                fontFamily: font.mono,
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: c.accent,
              }}
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Asymmetric grid: 1 large + 3 compact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Featured doctor (large) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 rounded-lg overflow-hidden cursor-pointer group"
              style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
              onClick={() => router.push(`/showcase/medqueue/doctor/${featured.id}`)}
            >
              <div
                className="relative h-72 w-full"
                style={{ backgroundColor: c.bg }}
              >
                <Image
                  src={featured.imageUrl}
                  alt={featured.name}
                  fill
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{
                    fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
                    letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: c.accent, padding: "2px 6px", borderRadius: "3px", backgroundColor: c.accentLt,
                  }}>
                    {featured.specialty}
                  </span>
                  <span style={{
                    fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 500,
                    letterSpacing: "0.06em", textTransform: "uppercase" as const, color: c.trust,
                  }}>
                    Verified
                  </span>
                </div>
                <h3 style={{
                  fontFamily: font.display, fontWeight: 600, fontSize: "1.375rem",
                  letterSpacing: "-0.01em", color: c.ink, marginBottom: "0.25rem",
                }}>
                  {featured.name}
                </h3>
                <p className="flex items-center gap-1.5 mb-5" style={{ color: c.muted, fontSize: "0.8125rem" }}>
                  <MapPin className="w-3 h-3" /> {featured.location}
                </p>
                <div
                  className="flex gap-6 pt-4"
                  style={{ borderTop: `1px solid ${c.subtle}`, fontFamily: font.mono, fontSize: "0.625rem", letterSpacing: "0.04em", color: c.muted }}
                >
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: c.ink, fontVariantNumeric: "tabular-nums" }}>
                      {featured.successRate}%
                    </div>
                    success
                  </div>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: c.ink, fontVariantNumeric: "tabular-nums" }}>
                      {featured.experience} yrs
                    </div>
                    experience
                  </div>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: c.ink, fontVariantNumeric: "tabular-nums" }}>
                      ₹{featured.fee}
                    </div>
                    consult fee
                  </div>
                </div>
                {featured.availableToday && (
                  <div className="mt-4 flex items-center gap-1.5" style={{
                    fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 500,
                    letterSpacing: "0.06em", textTransform: "uppercase" as const, color: c.trust,
                  }}>
                    <Clock className="w-3 h-3" /> Available today
                  </div>
                )}
              </div>
            </motion.div>

            {/* 3 compact cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {topDoctors.map((doctor, idx) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx + 1) * 0.08, duration: 0.5 }}
                  className="rounded-lg overflow-hidden cursor-pointer group flex flex-col"
                  style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
                  onClick={() => router.push(`/showcase/medqueue/doctor/${doctor.id}`)}
                >
                  <div className="relative h-44 w-full" style={{ backgroundColor: c.bg }}>
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span style={{
                      fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase" as const, color: c.accent, marginBottom: "6px",
                    }}>
                      {doctor.specialty}
                    </span>
                    <h3 style={{
                      fontFamily: font.display, fontWeight: 600, fontSize: "0.9375rem",
                      color: c.ink, marginBottom: "2px",
                    }}>
                      {doctor.name}
                    </h3>
                    <p style={{ color: c.muted, fontSize: "0.75rem", marginBottom: "auto" }}>{doctor.location}</p>
                    <div className="mt-4 flex gap-4" style={{
                      fontFamily: font.mono, fontSize: "0.5625rem", color: c.muted, letterSpacing: "0.04em",
                    }}>
                      <span>
                        <span style={{ color: c.ink, fontWeight: 600 }}>{doctor.experience}</span> yrs
                      </span>
                      <span>
                        <span style={{ color: c.ink, fontWeight: 600 }}>{doctor.successRate}%</span> success
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── How MedQueue Works (product voice, not portfolio) ─── */}
      <section className="px-6 py-20 md:py-24" style={{ backgroundColor: c.hero }}>
        <div className="max-w-6xl mx-auto">
          <h2
            style={{
              fontFamily: font.display,
              fontWeight: 600,
              fontSize: "clamp(1.5rem, 2vw + 0.5rem, 2rem)",
              letterSpacing: "-0.01em",
              color: c.heroFg,
              marginBottom: "3rem",
            }}
          >
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                step: "01",
                title: "Search by what matters",
                desc: "Enter a specialty, symptom, or doctor name. Filter by location, availability, and consultation fee to narrow results.",
              },
              {
                step: "02",
                title: "Compare with real data",
                desc: "Every doctor profile shows verified credentials, procedure success rates, years of practice, and real-time availability.",
              },
              {
                step: "03",
                title: "Book instantly",
                desc: "Select a slot from the live availability grid and confirm. No phone calls, no phantom appointments. You're booked.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col">
                <div
                  className="mb-4"
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: c.accent,
                    letterSpacing: "0.08em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.step}
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: font.display,
                    fontWeight: 600,
                    fontSize: "1.125rem",
                    color: c.heroFg,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: c.heroMuted,
                    maxWidth: "36ch",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Patient Testimonial (product voice) ─── */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote
            style={{
              fontFamily: font.serif,
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 2vw + 0.25rem, 1.625rem)",
              lineHeight: 1.5,
              color: c.ink,
              marginBottom: "1.5rem",
            }}
          >
            &ldquo;I&apos;d tried three different platforms before MedQueue.
            They all looked like databases with a coat of paint.
            MedQueue is the first one where I felt confident before
            I even walked into the clinic.&rdquo;
          </blockquote>
          <div style={{
            fontFamily: font.mono, fontSize: "0.6875rem", fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase" as const, color: c.muted,
          }}>
            Patient review, Mumbai
          </div>
        </div>
      </section>
    </div>
  );
}
