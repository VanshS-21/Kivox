"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  ChevronRight,
  Clock3,
  HeartPulse,
  MapPin,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import { Doctor, Slot, useMedQueue } from "./context";
import { mq, routes } from "./tokens";

export function MQButton({
  href,
  children,
  icon = "arrow",
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: {
  href?: string;
  children: ReactNode;
  icon?: "arrow" | "search" | "check" | "reset" | "none";
  variant?: "primary" | "soft" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const Icon =
    icon === "search"
      ? Search
      : icon === "check"
        ? Check
        : icon === "reset"
          ? RotateCcw
          : ArrowRight;
  const className =
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const style =
    variant === "primary"
      ? {
          backgroundColor: mq.color.trust,
          color: mq.color.white,
          boxShadow: mq.shadow.lift,
        }
      : variant === "soft"
        ? {
            backgroundColor: mq.color.careSoft,
            color: mq.color.ink,
            border: `1px solid ${mq.color.rule}`,
          }
        : {
            backgroundColor: "transparent",
            color: mq.color.trust,
          };

  const content = (
    <>
      {children}
      {icon !== "none" ? (
        <Icon
          aria-hidden="true"
          className="h-4 w-4 transition group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link className={className} href={href} prefetch={false} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      style={style}
      type={type}
    >
      {content}
    </button>
  );
}

export function MQPanel({
  children,
  className = "",
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "warm" | "trust" | "white";
}) {
  const background =
    tone === "warm"
      ? mq.color.panelWarm
      : tone === "trust"
        ? mq.color.trustSoft
        : tone === "white"
          ? mq.color.white
          : mq.color.panel;

  return (
    <div
      className={`rounded-[28px] border p-5 md:p-6 ${className}`}
      style={{
        backgroundColor: background,
        borderColor: mq.color.rule,
        boxShadow: mq.shadow.panel,
      }}
    >
      {children}
    </div>
  );
}

export function MQChip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "care" | "trust" | "recovery" | "insurance";
}) {
  const palette = {
    neutral: [mq.color.panel, mq.color.muted],
    care: [mq.color.careSoft, mq.color.clay],
    trust: [mq.color.trustSoft, mq.color.trust],
    recovery: [mq.color.recoverySoft, mq.color.recovery],
    insurance: [mq.color.insuranceSoft, mq.color.insurance],
  } as const;
  const [bg, color] = palette[tone];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: bg, borderColor: mq.color.rule, color }}
    >
      {children}
    </span>
  );
}

export function MQSectionLabel({
  children,
  icon: Icon = Sparkles,
}: {
  children: ReactNode;
  icon?: typeof Sparkles;
}) {
  return (
    <div
      className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
      style={{
        backgroundColor: mq.color.careSoft,
        borderColor: mq.color.rule,
        color: mq.color.clay,
      }}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

export function MQNav() {
  const { appointments, resetDemo } = useMedQueue();
  const upcoming = appointments.filter(
    (appointment) => appointment.status === "upcoming",
  );

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-xl"
      style={{
        backgroundColor: "oklch(0.975 0.009 82 / 0.88)",
        borderColor: mq.color.rule,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          className="flex min-h-11 items-center gap-3"
          href={routes.home}
          prefetch={false}
        >
          <span
            className="grid h-10 w-10 place-items-center rounded-2xl"
            style={{
              backgroundColor: mq.color.trust,
              color: mq.color.white,
              boxShadow: mq.shadow.lift,
            }}
          >
            <HeartPulse aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span
              className="block text-sm font-black"
              style={{ color: mq.color.ink }}
            >
              MedQueue
            </span>
            <span
              className="hidden text-xs font-semibold md:block"
              style={{ color: mq.color.muted }}
            >
              Patient concierge demo
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 text-sm font-semibold md:flex"
          style={{ color: mq.color.muted }}
        >
          <Link
            className="inline-flex min-h-11 items-center rounded-full px-3 transition hover:bg-white"
            href={routes.search}
            prefetch={false}
          >
            Find care
          </Link>
          <Link
            className="inline-flex min-h-11 items-center rounded-full px-3 transition hover:bg-white"
            href={routes.portal}
            prefetch={false}
          >
            Portal
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Reset MedQueue demo state"
            className="hidden h-11 w-11 place-items-center rounded-full border transition hover:bg-white md:grid"
            onClick={resetDemo}
            style={{ borderColor: mq.color.rule, color: mq.color.muted }}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
          </button>
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-bold"
            href={routes.portal}
            prefetch={false}
            style={{ backgroundColor: mq.color.ink, color: mq.color.white }}
          >
            <CalendarCheck2 aria-hidden="true" className="h-4 w-4" />
            <span>{upcoming.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DoctorCard({
  doctor,
  compact = false,
}: {
  doctor: Doctor;
  compact?: boolean;
}) {
  const firstSlot = doctor.slots[0];

  return (
    <MQPanel className="group h-full overflow-hidden p-0" tone="white">
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="relative min-h-[210px] overflow-hidden rounded-t-[28px]">
          <Image
            alt={`${doctor.name}, ${doctor.specialty}`}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            src={doctor.image}
          />
          <div
            className="absolute inset-x-3 top-3 flex flex-wrap gap-2"
            style={{ color: mq.color.ink }}
          >
            <MQChip tone="care">{doctor.nextAvailable}</MQChip>
            <MQChip tone="trust">{doctor.waitTime}</MQChip>
          </div>
        </div>
        <div className="flex h-full flex-col gap-5 p-5">
          <div>
            <div className="flex flex-wrap gap-2">
              <MQChip tone="trust">
                <Stethoscope aria-hidden="true" className="h-3 w-3" />
                {doctor.specialty}
              </MQChip>
              <MQChip>
                <MapPin aria-hidden="true" className="h-3 w-3" />
                {doctor.city}
              </MQChip>
            </div>
            <h3
              className="mt-4 text-2xl font-black leading-tight"
              style={{ color: mq.color.ink, fontFamily: mq.font.display }}
            >
              {doctor.name}
            </h3>
            <p
              className="mt-2 text-sm leading-6"
              style={{ color: mq.color.muted }}
            >
              {compact ? doctor.bio.slice(0, 118) + "..." : doctor.bio}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              [doctor.experience, "experience"],
              [doctor.consults, "consults"],
              [doctor.fee, "fee"],
            ].map(([value, label]) => (
              <div
                className="rounded-2xl border px-3 py-3"
                key={label}
                style={{
                  backgroundColor: mq.color.porcelain,
                  borderColor: mq.color.rule,
                }}
              >
                <div
                  className="text-sm font-black"
                  style={{ color: mq.color.ink }}
                >
                  {value}
                </div>
                <div
                  className="mt-1 text-[11px] font-semibold uppercase"
                  style={{ color: mq.color.faint }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2">
            <MQButton href={routes.doctor(doctor.id)} variant="soft">
              View profile
            </MQButton>
            {firstSlot ? (
              <MQButton href={routes.book(doctor.id, firstSlot)}>
                Book {firstSlot.time}
              </MQButton>
            ) : null}
          </div>
        </div>
      </div>
    </MQPanel>
  );
}

export function SlotGrid({
  doctor,
  selected,
  onSelect,
}: {
  doctor: Doctor;
  selected?: Slot;
  onSelect?: (slot: Slot) => void;
}) {
  const { isSlotBooked } = useMedQueue();
  const grouped = doctor.slots.reduce<Record<string, Slot[]>>((acc, slot) => {
    acc[slot.day] = acc[slot.day] ?? [];
    acc[slot.day].push(slot);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([day, slots]) => (
        <div key={day}>
          <div
            className="mb-2 flex items-center gap-2 text-sm font-black"
            style={{ color: mq.color.ink }}
          >
            <Clock3 aria-hidden="true" className="h-4 w-4" />
            {day}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {slots.map((slot) => {
              const booked = isSlotBooked(doctor.id, slot);
              const active =
                selected?.day === slot.day && selected?.time === slot.time;
              return (
                <button
                  className="min-h-12 rounded-2xl border px-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={booked}
                  key={`${slot.day}-${slot.time}`}
                  onClick={() => onSelect?.(slot)}
                  style={{
                    backgroundColor: active
                      ? mq.color.trust
                      : booked
                        ? mq.color.paper
                        : mq.color.white,
                    borderColor: active ? mq.color.trust : mq.color.rule,
                    color: active ? mq.color.white : mq.color.ink,
                  }}
                  type="button"
                >
                  {slot.time}
                  {booked ? (
                    <span className="block text-[10px]">Booked</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CarePath({ active = 1 }: { active?: 1 | 2 | 3 | 4 }) {
  const steps = ["Search", "Match", "Verify", "Visit"] as const;
  return (
    <div className="grid grid-cols-4 gap-2">
      {steps.map((step, index) => {
        const complete = index + 1 <= active;
        return (
          <div
            className="relative rounded-2xl border px-3 py-3"
            key={step}
            style={{
              backgroundColor: complete ? mq.color.careSoft : mq.color.panel,
              borderColor: complete ? mq.color.care : mq.color.rule,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-black"
                style={{ color: complete ? mq.color.clay : mq.color.faint }}
              >
                {step}
              </span>
              {index < steps.length - 1 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  style={{ color: mq.color.faint }}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TrustStack() {
  const items: Array<[string, string, LucideIcon]> = [
    [
      "Verified clinicians",
      "License, hospital affiliation, and specialty are visible before booking.",
      ShieldCheck,
    ],
    [
      "Insurance clarity",
      "Mock eligibility shows what is covered before the appointment is confirmed.",
      Check,
    ],
    [
      "Persistent portal",
      "Appointments, prescriptions, reports, and follow-ups stay connected.",
      CalendarCheck2,
    ],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map(([title, body, Icon]) => (
        <MQPanel className="p-5" key={String(title)} tone="white">
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
            style={{ color: mq.color.trust }}
          />
          <h3
            className="mt-4 text-base font-black"
            style={{ color: mq.color.ink }}
          >
            {title}
          </h3>
          <p
            className="mt-2 text-sm leading-6"
            style={{ color: mq.color.muted }}
          >
            {body}
          </p>
        </MQPanel>
      ))}
    </div>
  );
}
