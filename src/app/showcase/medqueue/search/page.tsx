"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useMedQueue, Doctor } from "../context";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { c, font } from "../tokens";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["9 AM", "12 PM", "3 PM", "6 PM"];

const generateAvailability = () =>
  Array.from({ length: 5 }, () =>
    Array.from({ length: 4 }, () => Math.random() > 0.4)
  );

export default function MedQueueSearch() {
  const { doctors, searchQuery, setSearchQuery } = useMedQueue();
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState(searchQuery);

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
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filters
  const [filterToday, setFilterToday] = useState(false);
  const [filterNext3, setFilterNext3] = useState(false);
  const [feeFilter, setFeeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredDoctors = useMemo(() => {
    let result = doctors;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      );
    }
    if (filterToday) result = result.filter((d) => d.availableToday);
    if (filterNext3) result = result.filter((d) => d.availableNext3Days);
    if (feeFilter === "under1000") result = result.filter((d) => d.fee < 1000);
    if (feeFilter === "1000to2000")
      result = result.filter((d) => d.fee >= 1000 && d.fee <= 2000);
    if (feeFilter === "above2000")
      result = result.filter((d) => d.fee > 2000);
    return result;
  }, [doctors, searchQuery, filterToday, filterNext3, feeFilter]);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(filteredDoctors.length / perPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSearchQuery(localSearch);
    setCurrentPage(1);
  };

  const states = [
    "Andhra Pradesh","Delhi","Gujarat","Karnataka","Kerala",
    "Maharashtra","Punjab","Rajasthan","Tamil Nadu","Telangana",
    "Uttar Pradesh","West Bengal",
  ];

  return (
    <div className="flex-1" style={{ backgroundColor: c.bg }}>
      {/* Search Header */}
      <div
        className="sticky top-24 z-30 px-6 py-4"
        style={{
          backgroundColor: c.bg,
          borderBottom: `1px solid ${c.subtle}`,
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-stretch">
          <div
            className="flex-1 flex items-stretch rounded-lg overflow-hidden"
            style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
            ref={locationRef}
          >
            <form
              onSubmit={handleSearch}
              className="flex-1 flex items-center px-4 py-2.5"
            >
              <Search className="w-4 h-4 shrink-0" style={{ color: c.muted }} />
              <input
                type="text"
                placeholder="Specialty, symptom, or doctor..."
                className="w-full pl-3 bg-transparent border-none"
                style={{
                  outline: "none",
                  color: c.ink,
                  fontFamily: font.body,
                  fontSize: "0.875rem",
                }}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </form>
            <div className="w-px my-2" style={{ backgroundColor: c.subtle }} />
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-2 px-4 cursor-pointer shrink-0"
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.625rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: c.muted,
                }}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{location}</span>
              </button>
              <AnimatePresence>
                {isLocationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-56 rounded-lg z-50"
                    style={{
                      backgroundColor: c.surface,
                      border: `1px solid ${c.subtle}`,
                      boxShadow: "0 8px 24px oklch(0 0 0 / 0.1)",
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
                        }}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <ul className="max-h-40 overflow-y-auto py-1">
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
            <button
              type="button"
              onClick={() => handleSearch()}
              className="px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80 shrink-0"
              style={{
                backgroundColor: c.ink,
                color: c.heroFg,
                fontFamily: font.body,
              }}
            >
              Update
            </button>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors hover:opacity-70"
            style={{
              border: `1px solid ${c.subtle}`,
              backgroundColor: c.surface,
              fontFamily: font.mono,
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              color: c.muted,
            }}
          >
            Filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-52 shrink-0 space-y-6`}
        >
          <div>
            <h3
              style={{
                fontFamily: font.mono,
                fontSize: "0.5625rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: c.muted,
                marginBottom: "12px",
              }}
            >
              Availability
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "Available Today", checked: filterToday, set: setFilterToday },
                { label: "Next 3 Days", checked: filterNext3, set: setFilterNext3 },
              ].map((f) => (
                <label key={f.label} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded"
                    style={{ accentColor: c.accent }}
                    checked={f.checked}
                    onChange={(e) => f.set(e.target.checked)}
                  />
                  <span style={{ fontSize: "0.8125rem", color: c.ink }}>{f.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="w-full h-px" style={{ backgroundColor: c.subtle }} />
          <div>
            <h3
              style={{
                fontFamily: font.mono,
                fontSize: "0.5625rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: c.muted,
                marginBottom: "12px",
              }}
            >
              Consultation Fee
            </h3>
            <div className="space-y-2.5">
              {[
                { label: "Any Fee", value: "all" },
                { label: "Under ₹1,000", value: "under1000" },
                { label: "₹1,000 – ₹2,000", value: "1000to2000" },
                { label: "Above ₹2,000", value: "above2000" },
              ].map((f) => (
                <label key={f.value} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="fee"
                    className="w-3.5 h-3.5"
                    style={{ accentColor: c.accent }}
                    checked={feeFilter === f.value}
                    onChange={() => setFeeFilter(f.value)}
                  />
                  <span style={{ fontSize: "0.8125rem", color: c.ink }}>{f.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="w-full h-px" style={{ backgroundColor: c.subtle }} />
          <div
            style={{
              fontFamily: font.mono,
              fontSize: "0.625rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: c.muted,
            }}
          >
            <span style={{ fontVariantNumeric: "tabular-nums", color: c.ink }}>
              {filteredDoctors.length}
            </span>{" "}
            results
          </div>
        </aside>

        {/* Doctor List */}
        <div className="flex-1 space-y-3">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-20 rounded-lg" style={{ border: `1px solid ${c.subtle}` }}>
              <p style={{ color: c.muted, fontSize: "0.9375rem" }}>
                No doctors found matching &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => {
                  setLocalSearch("");
                  setSearchQuery("");
                }}
                className="mt-3 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: c.accent,
                }}
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              {paginatedDoctors.map((doctor, idx) => (
                <DoctorRow key={doctor.id} doctor={doctor} delay={idx * 0.04} />
              ))}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 pt-8 pb-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded text-sm transition-opacity disabled:opacity-30 hover:opacity-70"
                    style={{
                      border: `1px solid ${c.subtle}`,
                      color: c.ink,
                      fontFamily: font.mono,
                      fontSize: "0.6875rem",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded text-sm transition-opacity hover:opacity-70"
                      style={{
                        backgroundColor: currentPage === i + 1 ? c.accent : "transparent",
                        color: currentPage === i + 1 ? c.heroFg : c.muted,
                        fontFamily: font.mono,
                        fontSize: "0.6875rem",
                        fontWeight: currentPage === i + 1 ? 600 : 400,
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded text-sm transition-opacity disabled:opacity-30 hover:opacity-70"
                    style={{
                      border: `1px solid ${c.subtle}`,
                      color: c.ink,
                      fontFamily: font.mono,
                      fontSize: "0.6875rem",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Doctor Row Component ─── */
function DoctorRow({ doctor, delay }: { doctor: Doctor; delay: number }) {
  const router = useRouter();
  const grid = useMemo(() => generateAvailability(), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="flex flex-col md:flex-row gap-5 p-5 rounded-lg transition-shadow hover:shadow-sm cursor-pointer"
      style={{ backgroundColor: c.surface, border: `1px solid ${c.subtle}` }}
      onClick={() => router.push(`/showcase/medqueue/doctor/${doctor.id}`)}
    >
      {/* Profile */}
      <div className="flex gap-4 md:w-2/5">
        <div
          className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded overflow-hidden"
          style={{ backgroundColor: c.bg }}
        >
          <Image
            src={doctor.imageUrl}
            alt={doctor.name}
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              style={{
                fontFamily: font.mono,
                fontSize: "0.5625rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: c.accent,
              }}
            >
              {doctor.specialty}
            </span>
            <span
              style={{
                fontFamily: font.mono,
                fontSize: "0.5625rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: c.trust,
              }}
            >
              Verified
            </span>
          </div>
          <h2
            style={{
              fontFamily: font.display,
              fontWeight: 600,
              fontSize: "1.0625rem",
              letterSpacing: "-0.005em",
              color: c.ink,
              marginBottom: "2px",
            }}
          >
            {doctor.name}
          </h2>
          <p
            className="text-xs flex items-center gap-1 mb-3"
            style={{ color: c.muted }}
          >
            <MapPin className="w-3 h-3" />
            {doctor.location}
          </p>
          <div
            className="mt-auto flex gap-5"
            style={{
              fontFamily: font.mono,
              fontSize: "0.625rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: c.muted,
            }}
          >
            <div>
              <span style={{ color: c.ink, fontSize: "0.8125rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {doctor.successRate}%
              </span>
              <br />
              success
            </div>
            <div>
              <span style={{ color: c.ink, fontSize: "0.8125rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {doctor.experience}
              </span>
              <br />
              yrs exp
            </div>
            <div>
              <span style={{ color: c.ink, fontSize: "0.8125rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                ₹{doctor.fee}
              </span>
              <br />
              fee
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-px self-stretch" style={{ backgroundColor: c.subtle }} />

      {/* Availability Grid */}
      <div className="flex-1 flex flex-col md:border-0 border-t pt-4 md:pt-0" style={{ borderColor: c.subtle }}>
        <div className="flex items-center justify-between mb-3">
          <span
            style={{
              fontFamily: font.mono,
              fontSize: "0.5625rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: c.muted,
            }}
          >
            Live Availability
          </span>
          <div
            className="flex items-center gap-3"
            style={{
              fontFamily: font.mono,
              fontSize: "0.5rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: c.muted,
            }}
          >
            <span className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: c.trustLt, border: `1px solid ${c.trust}` }}
              />
              Open
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: c.bg, border: `1px solid ${c.subtle}` }}
              />
              Full
            </span>
          </div>
        </div>

        <div className="flex gap-1 flex-1">
          {grid.map((daySlots, dayIdx) => (
            <div key={dayIdx} className="flex flex-col gap-1 flex-1">
              <div
                className="text-center mb-1"
                style={{
                  fontFamily: font.mono,
                  fontSize: "0.5625rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: c.muted,
                }}
              >
                {days[dayIdx]}
              </div>
              {daySlots.map((avail, slotIdx) => (
                <div
                  key={slotIdx}
                  className="flex-1 min-h-[14px] rounded-sm border"
                  style={{
                    backgroundColor: avail ? c.trustLt : c.bg,
                    borderColor: avail ? c.trust : c.subtle,
                    opacity: avail ? 1 : 0.4,
                    cursor: avail ? "pointer" : "not-allowed",
                  }}
                  title={avail ? `Available ${times[slotIdx]}` : "Booked"}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-4">
          {doctor.availableToday && (
            <span
              className="flex items-center gap-1.5"
              style={{
                fontFamily: font.mono,
                fontSize: "0.5625rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: c.trust,
              }}
            >
              <Clock className="w-3 h-3" />
              Today
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/showcase/medqueue/doctor/${doctor.id}`);
            }}
            className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold transition-opacity hover:opacity-80 group"
            style={{
              backgroundColor: c.ink,
              color: c.heroFg,
              fontFamily: font.body,
              fontSize: "0.8125rem",
            }}
          >
            Book
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
