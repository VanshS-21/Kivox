"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  IndianRupee,
  ShieldCheck,
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
import { Appointment, Slot, useMedQueue } from "../../context";
import { mq, routes } from "../../tokens";

const coverageChecks: Array<[string, string, LucideIcon]> = [
  ["Policy check", "Matched to Care Shield outpatient coverage", ShieldCheck],
  ["Clinic fee", "shown before confirmation", IndianRupee],
  [
    "Identity ready",
    "Patient profile data is pre-filled in this demo",
    FileCheck2,
  ],
  ["No charge taken", "Payment screen is visual only", CreditCard],
];

function getSlotKey(slot: Slot | undefined): string {
  return slot ? `${slot.day}-${slot.time}` : "";
}

export default function MedQueueBookPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { doctors, bookAppointment, isSlotBooked } = useMedQueue();
  const doctor = doctors.find((item) => item.id === params.id);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);

  const requestedSlot = useMemo<Slot | undefined>(() => {
    const day = searchParams.get("day");
    const time = searchParams.get("time");
    if (!day || !time || !doctor) return doctor?.slots[0];
    return (
      doctor.slots.find((slot) => slot.day === day && slot.time === time) ??
      doctor.slots[0]
    );
  }, [doctor, searchParams]);

  const requestedSlotKey = getSlotKey(requestedSlot);
  const [selectedSlotState, setSelectedSlotState] = useState({
    requestKey: "",
    slotKey: "",
  });
  const selectedSlotKey =
    selectedSlotState.requestKey === requestedSlotKey
      ? selectedSlotState.slotKey
      : requestedSlotKey;
  const selectedSlot = useMemo(() => {
    if (!doctor || !selectedSlotKey) return undefined;
    return (
      doctor.slots.find((slot) => getSlotKey(slot) === selectedSlotKey) ??
      requestedSlot
    );
  }, [doctor, requestedSlot, selectedSlotKey]);

  function selectSlot(slot: Slot) {
    setSelectedSlotState({
      requestKey: requestedSlotKey,
      slotKey: getSlotKey(slot),
    });
  }

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
  const slotAlreadyBooked = selectedSlot
    ? isSlotBooked(doctor.id, selectedSlot)
    : true;

  function confirmBooking() {
    if (!selectedSlot || slotAlreadyBooked) return;
    setConfirmed(bookAppointment(activeDoctor, selectedSlot));
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-10 md:px-6">
        <MQPanel className="overflow-hidden" tone="warm">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_0.25fr] lg:items-center">
            <div>
              <MQSectionLabel icon={CheckCircle2}>
                Booking confirmed
              </MQSectionLabel>
              <h1
                className="text-5xl font-black leading-none md:text-6xl"
                style={{ fontFamily: mq.font.display }}
              >
                Your visit with {confirmed.doctorName} is ready.
              </h1>
              <p
                className="mt-5 text-lg leading-8"
                style={{ color: mq.color.muted }}
              >
                The appointment was added to the patient portal, and this slot
                is now locked across MedQueue search and profile views.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  [confirmed.day, "day"],
                  [confirmed.time, "time"],
                  [confirmed.coverage, "coverage"],
                ].map(([value, label]) => (
                  <div
                    className="rounded-2xl border bg-white p-4"
                    key={label}
                    style={{ borderColor: mq.color.rule }}
                  >
                    <div className="text-lg font-black">{value}</div>
                    <div
                      className="mt-1 text-xs font-bold uppercase"
                      style={{ color: mq.color.faint }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <MQButton href={routes.portal} icon="check">
                  Open patient portal
                </MQButton>
                <MQButton href={routes.search} variant="ghost">
                  Keep browsing
                </MQButton>
              </div>
            </div>
            <div
              className="grid aspect-square place-items-center rounded-[36px]"
              style={{ backgroundColor: mq.color.trust, color: mq.color.white }}
            >
              <CalendarCheck2 aria-hidden="true" className="h-20 w-20" />
            </div>
          </div>
        </MQPanel>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
      <div className="mb-6">
        <Link
          className="inline-flex min-h-11 items-center text-sm font-bold"
          href={routes.doctor(doctor.id)}
          style={{ color: mq.color.trust }}
        >
          Back to profile
        </Link>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.66fr_0.34fr]">
        <MQPanel tone="white">
          <MQSectionLabel icon={ClipboardCheck}>
            Three-step booking
          </MQSectionLabel>
          <h1
            className="text-5xl font-black leading-none"
            style={{ fontFamily: mq.font.display }}
          >
            Confirm care without hidden friction.
          </h1>
          <p
            className="mt-4 text-base leading-7"
            style={{ color: mq.color.muted }}
          >
            This flow simulates appointment review, insurance verification, and
            payment readiness. No real payment or medical data is processed.
          </p>

          <div className="mt-8">
            <CarePath active={step + 1 === 4 ? 4 : ((step + 1) as 2 | 3 | 4)} />
          </div>

          <div className="mt-8">
            {step === 1 ? (
              <div>
                <h2
                  className="text-2xl font-black"
                  style={{ fontFamily: mq.font.display }}
                >
                  1. Select your visit time
                </h2>
                <p className="mt-2 text-sm" style={{ color: mq.color.muted }}>
                  Slot state is shared with search, profile, and the portal.
                </p>
                <div className="mt-5">
                  <SlotGrid
                    doctor={doctor}
                    selected={selectedSlot}
                    onSelect={selectSlot}
                  />
                </div>
              </div>
            ) : step === 2 ? (
              <div>
                <h2
                  className="text-2xl font-black"
                  style={{ fontFamily: mq.font.display }}
                >
                  2. Verify coverage
                </h2>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {coverageChecks.map(([title, body, Icon]) => (
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
                      <h3 className="mt-4 text-base font-black">
                        {String(title)}
                      </h3>
                      <p
                        className="mt-2 text-sm leading-6"
                        style={{ color: mq.color.muted }}
                      >
                        {title === "Clinic fee"
                          ? `${doctor.fee} ${body}`
                          : body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2
                  className="text-2xl font-black"
                  style={{ fontFamily: mq.font.display }}
                >
                  3. Review and confirm
                </h2>
                <MQPanel className="mt-5" tone="warm">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <p className="text-lg font-black">{doctor.name}</p>
                      <p
                        className="mt-1 text-sm"
                        style={{ color: mq.color.muted }}
                      >
                        {doctor.specialty} in {doctor.city}
                      </p>
                    </div>
                    <MQChip tone="care">
                      {selectedSlot?.day} at {selectedSlot?.time}
                    </MQChip>
                  </div>
                </MQPanel>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {step > 1 ? (
              <MQButton
                icon="none"
                onClick={() => setStep((current) => (current - 1) as 1 | 2)}
                variant="soft"
              >
                Back
              </MQButton>
            ) : null}
            {step < 3 ? (
              <MQButton
                disabled={!selectedSlot || slotAlreadyBooked}
                onClick={() => setStep((current) => (current + 1) as 2 | 3)}
              >
                Continue
              </MQButton>
            ) : (
              <MQButton
                disabled={!selectedSlot || slotAlreadyBooked}
                icon="check"
                onClick={confirmBooking}
              >
                Confirm booking
              </MQButton>
            )}
          </div>
        </MQPanel>

        <aside className="space-y-5">
          <MQPanel tone="warm">
            <MQChip tone="trust">{doctor.specialty}</MQChip>
            <h2
              className="mt-4 text-3xl font-black"
              style={{ fontFamily: mq.font.display }}
            >
              {doctor.name}
            </h2>
            <p
              className="mt-3 text-sm leading-6"
              style={{ color: mq.color.muted }}
            >
              {doctor.hospital}. License shown: {doctor.license}.
            </p>
            <div className="mt-5 space-y-3">
              <div
                className="rounded-2xl border bg-white p-4"
                style={{ borderColor: mq.color.rule }}
              >
                <div className="text-sm font-black">Selected slot</div>
                <div className="mt-1 text-sm" style={{ color: mq.color.muted }}>
                  {selectedSlot
                    ? `${selectedSlot.day}, ${selectedSlot.time}`
                    : "Choose a slot"}
                </div>
              </div>
              <div
                className="rounded-2xl border bg-white p-4"
                style={{ borderColor: mq.color.rule }}
              >
                <div className="text-sm font-black">Coverage estimate</div>
                <div className="mt-1 text-sm" style={{ color: mq.color.muted }}>
                  Care Shield outpatient eligible
                </div>
              </div>
            </div>
          </MQPanel>

          {slotAlreadyBooked ? (
            <MQPanel tone="trust">
              <h3
                className="text-lg font-black"
                style={{ fontFamily: mq.font.display }}
              >
                This slot was already booked
              </h3>
              <p
                className="mt-2 text-sm leading-6"
                style={{ color: mq.color.muted }}
              >
                Pick another time to continue. This is the persistent state
                working across the demo.
              </p>
            </MQPanel>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
