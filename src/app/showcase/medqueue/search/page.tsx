"use client";

import { useState } from "react";
import { CalendarClock, Filter, Search, ShieldCheck } from "lucide-react";

import { DoctorCard, MQButton, MQChip, MQPanel, MQSectionLabel } from "../components";
import { useMedQueue } from "../context";
import { mq } from "../tokens";

const specialties = ["Any specialty", "Cardiology", "Psychiatry", "Orthopedics", "Dermatology", "Pediatrics", "Neurology"];
const cities = ["Any city", "Mumbai", "Bengaluru", "Delhi", "Pune", "Hyderabad"];
const insurers = ["Any insurance", "Acko Health", "Star Health", "Care Shield", "HDFC Ergo", "Niva Bupa"];

export default function MedQueueSearchPage() {
  const { filters, updateFilter, setFilters, filteredDoctors } = useMedQueue();
  const [isSearching, setIsSearching] = useState(false);

  function runSearch() {
    setIsSearching(true);
    window.setTimeout(() => setIsSearching(false), 520);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
      <section className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
        <MQPanel className="h-fit lg:sticky lg:top-24" tone="white">
          <MQSectionLabel icon={Filter}>Care search</MQSectionLabel>
          <h1 className="text-4xl font-black leading-tight" style={{ fontFamily: mq.font.display }}>
            Match by specialty, city, insurance, and slot clarity.
          </h1>
          <p className="mt-3 text-sm leading-6" style={{ color: mq.color.muted }}>
            Filters are client-side and persistent across this showcase session.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em]" style={{ color: mq.color.faint }}>
                Search
              </span>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: mq.color.faint }}
                />
                <input
                  className="min-h-14 w-full rounded-2xl border bg-white pl-12 pr-4 text-sm font-semibold outline-none"
                  onChange={(event) => updateFilter("query", event.target.value)}
                  placeholder="Name, specialty, condition"
                  style={{ borderColor: mq.color.rule, color: mq.color.ink }}
                  value={filters.query}
                />
              </div>
            </label>

            {[
              ["Specialty", "specialty", specialties],
              ["City", "city", cities],
              ["Insurance", "insurance", insurers],
            ].map(([label, key, options]) => (
              <label className="block" key={String(key)}>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em]" style={{ color: mq.color.faint }}>
                  {String(label)}
                </span>
                <select
                  className="min-h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold outline-none"
                  onChange={(event) =>
                    updateFilter(key as "specialty" | "city" | "insurance", event.target.value)
                  }
                  style={{ borderColor: mq.color.rule, color: mq.color.ink }}
                  value={filters[key as "specialty" | "city" | "insurance"]}
                >
                  {(options as string[]).map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}

            <label
              className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4"
              style={{ backgroundColor: mq.color.careSoft, borderColor: mq.color.rule }}
            >
              <span>
                <span className="block text-sm font-black" style={{ color: mq.color.ink }}>
                  Show only available slots
                </span>
                <span className="block text-xs leading-5" style={{ color: mq.color.muted }}>
                  Hide clinicians whose remaining demo slots are already booked.
                </span>
              </span>
              <input
                checked={filters.availability === "Available today"}
                className="h-5 w-5 accent-slate-900"
                onChange={(event) => updateFilter("availability", event.target.checked ? "Available today" : "Any availability")}
                type="checkbox"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <MQButton icon="search" onClick={runSearch}>
                Search doctors
              </MQButton>
              <MQButton
                icon="reset"
                onClick={() =>
                  setFilters({
                    query: "",
                    city: "Any city",
                    specialty: "Any specialty",
                    availability: "Any availability",
                    insurance: "Any insurance",
                  })
                }
                variant="ghost"
              >
                Clear
              </MQButton>
            </div>
          </div>
        </MQPanel>

        <div>
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <MQSectionLabel icon={CalendarClock}>Results</MQSectionLabel>
              <h2 className="text-4xl font-black" style={{ fontFamily: mq.font.display }}>
                {filteredDoctors.length} clinician{filteredDoctors.length === 1 ? "" : "s"} matched
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <MQChip tone="trust">
                <ShieldCheck aria-hidden="true" className="h-3 w-3" />
                Verified profiles
              </MQChip>
              <MQChip tone="care">Mock coverage</MQChip>
            </div>
          </div>

          {isSearching ? (
            <div className="grid gap-5 md:grid-cols-2">
              {[0, 1, 2, 3].map((item) => (
                <MQPanel className="h-[520px] animate-pulse" key={item} tone="white">
                  <div className="h-48 rounded-[24px]" style={{ backgroundColor: mq.color.paper }} />
                  <div className="mt-6 h-6 w-2/3 rounded-full" style={{ backgroundColor: mq.color.paper }} />
                  <div className="mt-4 h-4 w-full rounded-full" style={{ backgroundColor: mq.color.paper }} />
                  <div className="mt-2 h-4 w-4/5 rounded-full" style={{ backgroundColor: mq.color.paper }} />
                </MQPanel>
              ))}
            </div>
          ) : filteredDoctors.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredDoctors.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor.id} compact />
              ))}
            </div>
          ) : (
            <MQPanel tone="warm">
              <h3 className="text-2xl font-black" style={{ fontFamily: mq.font.display }}>
                No exact match yet
              </h3>
              <p className="mt-3 text-sm leading-6" style={{ color: mq.color.muted }}>
                Try a broader specialty, any city, or any insurance provider. A real product would now offer a concierge
                handoff instead of a dead end.
              </p>
            </MQPanel>
          )}
        </div>
      </section>
    </div>
  );
}
