"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type Slot = {
  day: string;
  date: string;
  time: string;
  wait: string;
  room: "Clinic" | "Video" | "Priority";
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  symptoms: string[];
  city: string;
  clinic: string;
  hospital: string;
  fee: string;
  experience: string;
  consults: string;
  waitTime: string;
  license: string;
  languages: string[];
  insurance: string[];
  nextAvailable: string;
  image: string;
  bio: string;
  careStyle: string;
  credentials: string[];
  conditions: string[];
  prep: string[];
  slots: Slot[];
};

export type Appointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  day: string;
  date: string;
  time: string;
  status: "upcoming" | "completed";
  confirmation: string;
  coverage: string;
};

export type MedicalRecord = {
  id: string;
  title: string;
  doctorName: string;
  date: string;
  status: string;
};

export type Prescription = {
  id: string;
  name: string;
  dose: string;
  schedule: string;
};

type SearchFilters = {
  query: string;
  city: string;
  specialty: string;
  availability: "Any availability" | "Available today";
  insurance: string;
};

type MedQueueContextType = {
  doctors: Doctor[];
  appointments: Appointment[];
  records: MedicalRecord[];
  prescriptions: Prescription[];
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  updateFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  filteredDoctors: Doctor[];
  bookAppointment: (doctor: Doctor, slot: Slot) => Appointment;
  isSlotBooked: (doctorId: string, slot: Slot) => boolean;
  resetDemo: () => void;
};

const makeSlots = (offset: number): Slot[] => {
  const days = [
    { day: "Today", date: "15 May" },
    { day: "Tomorrow", date: "16 May" },
    { day: "Mon", date: "18 May" },
    { day: "Tue", date: "19 May" },
  ];
  const times = ["09:20", "11:40", "14:10", "17:30"];

  return days.flatMap((day, dayIndex) =>
    times
      .filter((_, index) => (index + dayIndex + offset) % 3 !== 0)
      .slice(0, 3)
      .map((time, index) => ({
        ...day,
        time,
        wait: ["8 min", "14 min", "22 min"][(index + offset) % 3],
        room: (["Clinic", "Video", "Priority"] as const)[(index + dayIndex + offset) % 3],
      })),
  );
};

export const doctors: Doctor[] = [
  {
    id: "ananya-sharma",
    name: "Dr. Ananya Sharma",
    specialty: "Cardiology",
    symptoms: ["Chest pain", "High BP", "Palpitations", "Breathlessness"],
    city: "Mumbai",
    clinic: "Mumbai Heights Heart Institute",
    hospital: "Mumbai Heights Heart Institute",
    fee: "INR 1,500",
    experience: "18 yrs",
    consults: "12.4k",
    waitTime: "14 min wait",
    license: "MMC-48291",
    languages: ["English", "Hindi", "Marathi"],
    insurance: ["Acko Health", "Star Health", "Care Shield"],
    nextAvailable: "Today, 11:40",
    image: "/media/medqueue/doctors/dr-ananya-sharma.webp",
    bio: "Known for calm cardiac consultations that translate risk into clear next steps.",
    careStyle: "Explains decisions slowly, shares written recovery plans, and avoids rushed medication changes.",
    credentials: ["DM Cardiology, AIIMS", "Interventional Cardiology Fellowship", "18 years active practice"],
    conditions: ["Hypertension", "Arrhythmia", "Post-angioplasty follow-up", "Preventive cardiac screening"],
    prep: ["Bring recent ECG", "List current medication", "Share family cardiac history"],
    slots: makeSlots(0),
  },
  {
    id: "meera-reddy",
    name: "Dr. Meera Reddy",
    specialty: "Psychiatry",
    symptoms: ["Anxiety", "Sleep", "Panic", "Low mood"],
    city: "Bengaluru",
    clinic: "Mindful Health Rooms",
    hospital: "Mindful Health Rooms",
    fee: "INR 2,400",
    experience: "14 yrs",
    consults: "11k",
    waitTime: "8 min wait",
    license: "KMC-77120",
    languages: ["English", "Hindi", "Kannada"],
    insurance: ["Care Shield", "Niva Bupa"],
    nextAvailable: "Tomorrow, 09:20",
    image: "/media/medqueue/doctors/dr-meera-reddy.webp",
    bio: "A steady first-contact psychiatrist for patients who need privacy, structure, and a non-judgmental plan.",
    careStyle: "Works with written check-ins, low-friction follow-ups, and collaborative medication reviews.",
    credentials: ["MD Psychiatry", "CBT and sleep medicine certification", "14 years active practice"],
    conditions: ["Anxiety disorders", "Panic episodes", "Sleep disruption", "Work stress"],
    prep: ["Note sleep pattern", "Write current concerns", "Share previous medication details"],
    slots: makeSlots(1),
  },
  {
    id: "vikram-singh",
    name: "Dr. Vikram Singh",
    specialty: "Orthopedics",
    symptoms: ["Knee pain", "Back pain", "Sports injury", "Fracture"],
    city: "Delhi",
    clinic: "Apex Bone Center",
    hospital: "Apex Bone Center",
    fee: "INR 1,800",
    experience: "22 yrs",
    consults: "21k",
    waitTime: "22 min wait",
    license: "DMC-20918",
    languages: ["English", "Hindi", "Punjabi"],
    insurance: ["Star Health", "HDFC Ergo"],
    nextAvailable: "Mon, 14:10",
    image: "/media/medqueue/doctors/dr-vikram-singh.webp",
    bio: "Orthopedic surgeon focused on avoiding unnecessary procedures when guided rehab can work.",
    careStyle: "Shows scan findings visually, separates urgent injuries from recovery plans, and gives clear timelines.",
    credentials: ["MS Orthopedics", "Joint preservation fellowship", "22 years active practice"],
    conditions: ["ACL injuries", "Disc pain", "Fracture review", "Shoulder mobility"],
    prep: ["Bring scan images", "Wear movement-friendly clothes", "List pain triggers"],
    slots: makeSlots(2),
  },
  {
    id: "priya-desai",
    name: "Dr. Priya Desai",
    specialty: "Dermatology",
    symptoms: ["Acne", "Rash", "Hair fall", "Pigmentation"],
    city: "Mumbai",
    clinic: "Skin and Shine Dermatology",
    hospital: "Skin and Shine Dermatology",
    fee: "INR 900",
    experience: "8 yrs",
    consults: "15.6k",
    waitTime: "8 min wait",
    license: "MMC-84017",
    languages: ["English", "Hindi", "Gujarati"],
    insurance: ["Acko Health", "Care Shield"],
    nextAvailable: "Today, 17:30",
    image: "/media/medqueue/doctors/dr-priya-desai.webp",
    bio: "Dermatologist with a low-anxiety approach to long-running skin and hair concerns.",
    careStyle: "Creates simple routines, explains expected timelines, and documents every prescription clearly.",
    credentials: ["MD Dermatology", "Cosmetic dermatology training", "8 years active practice"],
    conditions: ["Acne", "Eczema", "Hair fall", "Pigmentation"],
    prep: ["Avoid new products before visit", "Upload rash photos", "List current skincare"],
    slots: makeSlots(3),
  },
  {
    id: "neha-kapoor",
    name: "Dr. Neha Kapoor",
    specialty: "Pediatrics",
    symptoms: ["Fever", "Vaccination", "Nutrition", "Cough"],
    city: "Pune",
    clinic: "Little Smiles Clinic",
    hospital: "Little Smiles Clinic",
    fee: "INR 1,200",
    experience: "10 yrs",
    consults: "10.5k",
    waitTime: "14 min wait",
    license: "MMC-77248",
    languages: ["English", "Hindi", "Marathi"],
    insurance: ["Niva Bupa", "Star Health"],
    nextAvailable: "Tomorrow, 11:40",
    image: "/media/medqueue/doctors/dr-neha-kapoor.webp",
    bio: "Pediatrician trusted by first-time parents for careful triage and practical home-care guidance.",
    careStyle: "Explains red flags, writes simple home instructions, and keeps vaccination planning visible.",
    credentials: ["MD Pediatrics", "Neonatal care training", "10 years active practice"],
    conditions: ["Fever", "Vaccination", "Nutrition", "Respiratory infections"],
    prep: ["Bring vaccination card", "Note temperature pattern", "List allergies"],
    slots: makeSlots(4),
  },
  {
    id: "rahul-verma",
    name: "Dr. Rahul Verma",
    specialty: "Neurology",
    symptoms: ["Migraine", "Seizure", "Numbness", "Memory"],
    city: "Hyderabad",
    clinic: "City Care Neuro Clinic",
    hospital: "City Care Neuro Clinic",
    fee: "INR 2,100",
    experience: "12 yrs",
    consults: "8.2k",
    waitTime: "22 min wait",
    license: "TSMC-59281",
    languages: ["English", "Hindi", "Telugu"],
    insurance: ["HDFC Ergo", "Care Shield"],
    nextAvailable: "Tue, 09:20",
    image: "/media/medqueue/doctors/dr-rahul-verma.webp",
    bio: "Neurologist for patients who need symptoms translated into an understandable diagnostic path.",
    careStyle: "Builds investigation plans step by step and makes follow-up thresholds explicit.",
    credentials: ["DM Neurology", "Epilepsy care fellowship", "12 years active practice"],
    conditions: ["Migraine", "Epilepsy", "Neuropathy", "Memory concerns"],
    prep: ["Track episode timing", "Bring prior reports", "List medication reactions"],
    slots: makeSlots(5),
  },
];

const initialAppointments: Appointment[] = [
  {
    id: "appt-previous",
    doctorId: "vikram-singh",
    doctorName: "Dr. Vikram Singh",
    specialty: "Orthopedics",
    clinic: "Apex Bone Center",
    day: "12 Apr",
    date: "12 Apr",
    time: "10:30",
    status: "completed",
    confirmation: "MQ-APR-1288",
    coverage: "Star Health reimbursed",
  },
];

const records: MedicalRecord[] = [
  {
    id: "rec-1",
    title: "Lipid profile and ECG summary",
    doctorName: "Dr. Ananya Sharma",
    date: "08 May 2026",
    status: "Reviewed",
  },
  {
    id: "rec-2",
    title: "Knee mobility recovery plan",
    doctorName: "Dr. Vikram Singh",
    date: "12 Apr 2026",
    status: "Follow-up",
  },
  {
    id: "rec-3",
    title: "Sleep quality tracker review",
    doctorName: "Dr. Meera Reddy",
    date: "28 Mar 2026",
    status: "Reviewed",
  },
];

const prescriptions: Prescription[] = [
  {
    id: "rx-1",
    name: "Cardiac preventive care",
    dose: "1 tablet",
    schedule: "After breakfast",
  },
  {
    id: "rx-2",
    name: "Anti-inflammatory course",
    dose: "Short course",
    schedule: "As prescribed after food",
  },
];

const defaultFilters: SearchFilters = {
  query: "",
  city: "Any city",
  specialty: "Any specialty",
  availability: "Any availability",
  insurance: "Any insurance",
};

const MedQueueContext = createContext<MedQueueContextType | undefined>(undefined);

export function MedQueueProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const isSlotBooked = useCallback(
    (doctorId: string, slot: Slot) =>
      appointments.some(
        (appointment) =>
          appointment.doctorId === doctorId &&
          appointment.day === slot.day &&
          appointment.time === slot.time &&
          appointment.status === "upcoming",
      ),
    [appointments],
  );

  const filteredDoctors = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const queryMatch =
        !query ||
        [
          doctor.name,
          doctor.specialty,
          doctor.city,
          doctor.clinic,
          ...doctor.symptoms,
          ...doctor.conditions,
        ].some((value) => value.toLowerCase().includes(query));

      const cityMatch = filters.city === "Any city" || doctor.city === filters.city;
      const specialtyMatch = filters.specialty === "Any specialty" || doctor.specialty === filters.specialty;
      const insuranceMatch = filters.insurance === "Any insurance" || doctor.insurance.includes(filters.insurance);
      const availabilityMatch =
        filters.availability === "Any availability" ||
        doctor.slots.some((slot) => slot.day === "Today" && !isSlotBooked(doctor.id, slot));

      return queryMatch && cityMatch && specialtyMatch && insuranceMatch && availabilityMatch;
    });
  }, [filters, isSlotBooked]);

  const bookAppointment = (doctor: Doctor, slot: Slot) => {
    const appointment: Appointment = {
      id: `appt-${doctor.id}-${slot.day}-${slot.time}`.replace(/\s+/g, "-").toLowerCase(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      clinic: doctor.clinic,
      day: slot.day,
      date: slot.date,
      time: slot.time,
      status: "upcoming",
      confirmation: `MQ-${doctor.id.slice(0, 3).toUpperCase()}-${slot.time.replace(":", "")}`,
      coverage: "Care Shield eligible",
    };

    setAppointments((current) => {
      const exists = current.some((item) => item.id === appointment.id);
      return exists ? current : [appointment, ...current];
    });

    return appointment;
  };

  const resetDemo = () => {
    setAppointments(initialAppointments);
    setFilters(defaultFilters);
  };

  return (
    <MedQueueContext.Provider
      value={{
        doctors,
        appointments,
        records,
        prescriptions,
        filters,
        setFilters,
        updateFilter,
        filteredDoctors,
        bookAppointment,
        isSlotBooked,
        resetDemo,
      }}
    >
      {children}
    </MedQueueContext.Provider>
  );
}

export function useMedQueue() {
  const context = useContext(MedQueueContext);
  if (!context) {
    throw new Error("useMedQueue must be used within a MedQueueProvider");
  }
  return context;
}
