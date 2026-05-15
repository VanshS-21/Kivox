"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  successRate: number;
  consultations: number;
  imageUrl: string;
  location: string;
  fee: number;
  availableToday: boolean;
  availableNext3Days: boolean;
  availableWeekends: boolean;
};

export type Appointment = {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
};

interface MedQueueContextType {
  doctors: Doctor[];
  appointments: Appointment[];
  bookAppointment: (appointment: Appointment) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const mockDoctors: Doctor[] = [
  { id: "dr-1", name: "Dr. Ananya Sharma", specialty: "Cardiology", experience: 18, successRate: 98.4, consultations: 12400, imageUrl: "/images/doctors/dr_ananya_sharma.webp", location: "Mumbai Heights Hospital", fee: 1500, availableToday: true, availableNext3Days: true, availableWeekends: false },
  { id: "dr-2", name: "Dr. Rahul Verma", specialty: "Neurology", experience: 12, successRate: 96.2, consultations: 8200, imageUrl: "/images/doctors/dr_rahul_verma.webp", location: "City Care Clinic", fee: 2000, availableToday: false, availableNext3Days: true, availableWeekends: true },
  { id: "dr-3", name: "Dr. Priya Desai", specialty: "Dermatology", experience: 8, successRate: 99.1, consultations: 15600, imageUrl: "/images/doctors/dr_priya_desai.webp", location: "Skin & Shine", fee: 800, availableToday: true, availableNext3Days: true, availableWeekends: false },
  { id: "dr-4", name: "Dr. Vikram Singh", specialty: "Orthopedics", experience: 22, successRate: 97.5, consultations: 21000, imageUrl: "/images/doctors/dr_vikram_singh.webp", location: "Apex Bone Center", fee: 1800, availableToday: false, availableNext3Days: false, availableWeekends: true },
  { id: "dr-5", name: "Dr. Neha Kapoor", specialty: "Pediatrics", experience: 10, successRate: 98.8, consultations: 10500, imageUrl: "/images/doctors/dr_neha_kapoor.webp", location: "Little Smiles Clinic", fee: 1200, availableToday: true, availableNext3Days: true, availableWeekends: true },
  { id: "dr-6", name: "Dr. Sanjay Gupta", specialty: "Oncology", experience: 25, successRate: 94.5, consultations: 18000, imageUrl: "/images/doctors/dr_sanjay_gupta.webp", location: "Hope Cancer Care", fee: 3000, availableToday: false, availableNext3Days: true, availableWeekends: false },
  { id: "dr-7", name: "Dr. Kavita Menon", specialty: "Gynecology", experience: 15, successRate: 99.0, consultations: 14200, imageUrl: "/images/doctors/dr_kavita_menon.webp", location: "Women's Health Plus", fee: 1500, availableToday: true, availableNext3Days: true, availableWeekends: true },
  { id: "dr-8", name: "Dr. Rohan Patel", specialty: "Ophthalmology", experience: 9, successRate: 98.2, consultations: 9300, imageUrl: "/images/doctors/dr_rohan_patel.webp", location: "Clear Vision Eye Care", fee: 900, availableToday: false, availableNext3Days: true, availableWeekends: false },
  { id: "dr-9", name: "Dr. Meera Reddy", specialty: "Psychiatry", experience: 14, successRate: 95.8, consultations: 11000, imageUrl: "/images/doctors/dr_meera_reddy.webp", location: "Mindful Health", fee: 2500, availableToday: true, availableNext3Days: true, availableWeekends: true },
  { id: "dr-10", name: "Dr. Arjun Nair", specialty: "Gastroenterology", experience: 20, successRate: 97.1, consultations: 16500, imageUrl: "/images/doctors/dr_arjun_nair.webp", location: "Digestive Health Clinic", fee: 1800, availableToday: false, availableNext3Days: false, availableWeekends: true },
  { id: "dr-11", name: "Dr. Sneha Joshi", specialty: "Endocrinology", experience: 11, successRate: 98.5, consultations: 8900, imageUrl: "/images/doctors/dr_sneha_joshi.webp", location: "Hormone Care Center", fee: 1400, availableToday: true, availableNext3Days: true, availableWeekends: false },
  { id: "dr-12", name: "Dr. Karthik Raj", specialty: "Urology", experience: 17, successRate: 96.9, consultations: 13400, imageUrl: "/images/doctors/dr_karthik_raj.webp", location: "Advanced Uro Clinic", fee: 2000, availableToday: false, availableNext3Days: true, availableWeekends: false },
  { id: "dr-13", name: "Dr. Pooja Iyer", specialty: "Rheumatology", experience: 13, successRate: 97.4, consultations: 10200, imageUrl: "/images/doctors/dr_pooja_iyer.webp", location: "Joint & Spine Care", fee: 1600, availableToday: true, availableNext3Days: true, availableWeekends: true },
  { id: "dr-14", name: "Dr. Sameer Khan", specialty: "Pulmonology", experience: 19, successRate: 95.5, consultations: 15800, imageUrl: "/images/doctors/dr_sameer_khan.webp", location: "Breathe Easy Clinic", fee: 1900, availableToday: false, availableNext3Days: true, availableWeekends: true },
  { id: "dr-15", name: "Dr. Aisha Sheikh", specialty: "Dentistry", experience: 7, successRate: 99.5, consultations: 22000, imageUrl: "/images/doctors/dr_aisha_sheikh.webp", location: "Perfect Pearly Whites", fee: 500, availableToday: true, availableNext3Days: true, availableWeekends: false },
  { id: "dr-16", name: "Dr. Nitin Rao", specialty: "ENT", experience: 16, successRate: 98.1, consultations: 12700, imageUrl: "/images/doctors/dr_nitin_rao.webp", location: "Sound & Breathe Clinic", fee: 1100, availableToday: false, availableNext3Days: false, availableWeekends: true },
  { id: "dr-17", name: "Dr. Ritu Malhotra", specialty: "Nephrology", experience: 21, successRate: 96.6, consultations: 17200, imageUrl: "/images/doctors/dr_ritu_malhotra.webp", location: "Kidney Care Associates", fee: 2200, availableToday: true, availableNext3Days: true, availableWeekends: false },
  { id: "dr-18", name: "Dr. Vivek Choudhury", specialty: "Plastic Surgery", experience: 14, successRate: 99.2, consultations: 8500, imageUrl: "/images/doctors/dr_vivek_choudhury.webp", location: "Aesthetic Enhancements", fee: 5000, availableToday: false, availableNext3Days: true, availableWeekends: true },
  { id: "dr-19", name: "Dr. Sunita Agarwal", specialty: "Infectious Disease", experience: 24, successRate: 97.8, consultations: 19800, imageUrl: "/images/doctors/dr_sunita_agarwal.webp", location: "Global Health Institute", fee: 2500, availableToday: true, availableNext3Days: false, availableWeekends: false },
  { id: "dr-20", name: "Dr. Deepak Jain", specialty: "General Surgery", experience: 28, successRate: 95.1, consultations: 25400, imageUrl: "/images/doctors/dr_deepak_jain.webp", location: "City Surgical Center", fee: 2800, availableToday: false, availableNext3Days: true, availableWeekends: true },
];

const MedQueueContext = createContext<MedQueueContextType | undefined>(undefined);

export function MedQueueProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const bookAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <MedQueueContext.Provider value={{ doctors: mockDoctors, appointments, bookAppointment, searchQuery, setSearchQuery }}>
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
