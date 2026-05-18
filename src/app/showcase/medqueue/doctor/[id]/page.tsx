"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  BadgeCheck,
  Building2,
  CalendarCheck2,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import {
  CarePath,
  MQButton,
  MQChip,
  MQPanel,
  MQSectionLabel,
  SlotGrid,
} from "../../components";
import { Slot, useMedQueue } from "../../context";
import { mq, routes } from "../../tokens";

export default function MedQueueDoctorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { doctors } = useMedQueue();
  const doctor = doctors.find((item) => item.id === params.id);

  if (!doctor) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <MQPanel tone="warm">
          <h1
            className="text-3xl font-black"
            style={{ fontFamily: mq.font.display }}
          >
            Doctor not found
          </h1>
          <p className="mt-3 text-sm" style={{ color: mq.color.muted }}>
            This demo clinician may have moved. Return to search to choose
            another profile.
          </p>
          <div className="mt-5">
            <MQButton href={routes.search}>Back to search</MQButton>
          </div>
        </MQPanel>
      </div>
    );
  }

  const activeDoctor = doctor;

  function bookSlot(slot: Slot) {
    router.push(routes.book(activeDoctor.id, slot));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
      <Link
        className="mb-5 inline-flex min-h-11 items-center text-sm font-bold"
        href={routes.search}
        style={{ color: mq.color.trust }}
      >
        Back to search
      </Link>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <MQPanel className="overflow-hidden p-0" tone="white">
          <div className="relative min-h-[420px]">
            <Image
              alt={`${doctor.name}, ${doctor.specialty}`}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={doctor.image}
            />
            <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
              <MQChip tone="care">{doctor.nextAvailable}</MQChip>
              <MQChip tone="trust">{doctor.waitTime}</MQChip>
              <MQChip tone="insurance">
                {doctor.insurance.slice(0, 2).join(" + ")}
              </MQChip>
            </div>
          </div>
        </MQPanel>

        <div className="space-y-5">
          <MQPanel tone="warm">
            <MQSectionLabel icon={Stethoscope}>
              Verified specialist
            </MQSectionLabel>
            <h1
              className="text-5xl font-black leading-none md:text-6xl"
              style={{ fontFamily: mq.font.display }}
            >
              {doctor.name}
            </h1>
            <p
              className="mt-4 text-xl font-bold"
              style={{ color: mq.color.trust }}
            >
              {doctor.specialty} - {doctor.city}
            </p>
            <p
              className="mt-5 text-base leading-7"
              style={{ color: mq.color.muted }}
            >
              {doctor.bio}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                [doctor.experience, "experience"],
                [doctor.consults, "consults"],
                [doctor.fee, "demo fee"],
              ].map(([value, label]) => (
                <div
                  className="rounded-2xl border p-4"
                  key={label}
                  style={{
                    backgroundColor: mq.color.white,
                    borderColor: mq.color.rule,
                  }}
                >
                  <div
                    className="text-xl font-black"
                    style={{ color: mq.color.ink }}
                  >
                    {value}
                  </div>
                  <div
                    className="mt-1 text-[11px] font-bold uppercase"
                    style={{ color: mq.color.faint }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </MQPanel>

          <MQPanel tone="white">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2
                  className="text-2xl font-black"
                  style={{ fontFamily: mq.font.display }}
                >
                  Choose a slot
                </h2>
                <p className="mt-1 text-sm" style={{ color: mq.color.muted }}>
                  Booked demo slots become unavailable everywhere.
                </p>
              </div>
              <CalendarCheck2
                aria-hidden="true"
                className="h-6 w-6"
                style={{ color: mq.color.trust }}
              />
            </div>
            <SlotGrid doctor={doctor} onSelect={bookSlot} />
          </MQPanel>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
        <MQPanel tone="white">
          <MQSectionLabel icon={ShieldCheck}>Trust record</MQSectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                [BadgeCheck, "License visibility", doctor.license],
                [Building2, "Hospital affiliation", doctor.hospital],
                [GraduationCap, "Clinical focus", doctor.conditions.join(", ")],
                [ClipboardList, "Patient preparation", doctor.prep.join(", ")],
              ] as Array<[LucideIcon, string, string]>
            ).map(([Icon, title, body]) => (
              <div
                className="rounded-2xl border p-4"
                key={String(title)}
                style={{ borderColor: mq.color.rule }}
              >
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5"
                  style={{ color: mq.color.trust }}
                />
                <h3
                  className="mt-4 text-base font-black"
                  style={{ color: mq.color.ink }}
                >
                  {String(title)}
                </h3>
                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: mq.color.muted }}
                >
                  {String(body)}
                </p>
              </div>
            ))}
          </div>
        </MQPanel>

        <MQPanel tone="trust">
          <HeartPulse
            aria-hidden="true"
            className="h-6 w-6"
            style={{ color: mq.color.trust }}
          />
          <h2
            className="mt-5 text-2xl font-black"
            style={{ fontFamily: mq.font.display }}
          >
            Care path
          </h2>
          <p
            className="mt-2 text-sm leading-6"
            style={{ color: mq.color.muted }}
          >
            A clear booking path keeps the appointment decision understandable.
          </p>
          <div className="mt-5">
            <CarePath active={2} />
          </div>
          <div className="mt-6">
            <MQButton href={routes.book(doctor.id, doctor.slots[0])}>
              Start booking
            </MQButton>
          </div>
        </MQPanel>
      </section>
    </div>
  );
}
