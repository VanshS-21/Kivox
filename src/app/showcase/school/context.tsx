"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export type SchoolProgram = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  ratio: string;
  milestones: string[];
  image: string;
};

export type InquiryInfo = {
  fullName: string;
  childName: string;
  childAge: string;
  gradeApplying: string;
  email: string;
  phone: string;
  status: "Inquiry Received" | "Under Review" | "Interview Scheduled" | "Accepted";
  dateSubmitted: string;
};

export type AdmissionsChecklist = {
  feePaid: boolean;
  transcriptsSent: boolean;
  recommendationsSent: boolean;
  interviewBooked: boolean;
};

type SchoolContextType = {
  programs: SchoolProgram[];
  inquiry: InquiryInfo | null;
  checklist: AdmissionsChecklist;
  submitInquiry: (info: Omit<InquiryInfo, "status" | "dateSubmitted">) => void;
  toggleChecklistItem: (key: keyof AdmissionsChecklist) => void;
  resetDemo: () => void;
  view: string;
  selectedId: string | undefined;
  changeView: (view: string, id?: string) => void;
};

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const initialPrograms: SchoolProgram[] = [
  {
    id: "early-years",
    title: "Early Years",
    subtitle: "Pre-K — Grade 4",
    description: "Building foundational curiosity, joy in learning, and social-emotional resilience through play-based and structured inquiry.",
    longDescription: "Our Early Years curriculum is designed around high-sensory exploratory environments. We focus on foundational phonics literacy, quantitative numeracy, and emotional self-regulation, using natural classroom frameworks to encourage creative inquiry.",
    ratio: "8:1 Student-Teacher Ratio",
    milestones: [
      "Phonics & emergent literacy recognition",
      "Experiential inquiry and math play loops",
      "Social cooperation & conflict resolution skills",
    ],
    image: "/media/showcase/greenfield-early-years.png",
  },
  {
    id: "middle-school",
    title: "Middle School",
    subtitle: "Grades 5 — 8",
    description: "Fostering independence, critical thinking, and character development during the pivotal early adolescent years.",
    longDescription: "Greenfield's Middle School program acts as a critical bridge. Students shift from guided learning towards independent exploration, utilizing collaborative debate styles, foundational science labs, and leadership team activities.",
    ratio: "7:1 Student-Teacher Ratio",
    milestones: [
      "Advanced algebra and scientific research principles",
      "Persuasive essay composition and oral defense",
      "Creative digital design & robotic coding fundamentals",
    ],
    image: "/media/showcase/greenfield-middle-school.png",
  },
  {
    id: "upper-school",
    title: "Upper School",
    subtitle: "Grades 9 — 12",
    description: "Advanced scholarship, leadership preparation, and rigorous college readiness in a Harkness-driven environment.",
    longDescription: "Our flagship Upper School academic layout utilizes the Harkness roundtable format across all advanced seminars. This structure requires that every student acts as both a critic and a contributor, preparing them directly for university levels.",
    ratio: "6:1 Student-Teacher Ratio",
    milestones: [
      "Advanced placement (AP) or college prep seminar mastery",
      "Original senior capstone dissertation & panel presentation",
      "Ethical civic leadership & community service project execution",
    ],
    image: "/media/showcase/greenfield-upper-school.png",
  },
];

const defaultChecklist: AdmissionsChecklist = {
  feePaid: false,
  transcriptsSent: false,
  recommendationsSent: false,
  interviewBooked: false,
};

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [inquiry, setInquiry] = useState<InquiryInfo | null>(null);
  const [checklist, setChecklist] = useState<AdmissionsChecklist>(defaultChecklist);
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const changeView = useCallback((newView: string, id?: string) => {
    setView(newView);
    setSelectedId(id);
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("view", newView);
      if (id) {
        searchParams.set("id", id);
      } else {
        searchParams.delete("id");
      }
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({ view: newView, id }, "", newUrl);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view") || "home";
      const idParam = params.get("id") || undefined;
      setView(viewParam);
      setSelectedId(idParam);
    };

    // Initialize from URL on mount
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view") || "home";
    const idParam = params.get("id") || undefined;
    setView(viewParam);
    setSelectedId(idParam);

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const submitInquiry = useCallback((info: Omit<InquiryInfo, "status" | "dateSubmitted">) => {
    setInquiry({
      ...info,
      status: "Inquiry Received",
      dateSubmitted: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });
  }, []);

  const toggleChecklistItem = useCallback((key: keyof AdmissionsChecklist) => {
    setChecklist((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }, []);

  const resetDemo = useCallback(() => {
    setInquiry(null);
    setChecklist(defaultChecklist);
  }, []);

  return (
    <SchoolContext.Provider
      value={{
        programs: initialPrograms,
        inquiry,
        checklist,
        submitInquiry,
        toggleChecklistItem,
        resetDemo,
        view,
        selectedId,
        changeView,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error("useSchool must be used within a SchoolProvider");
  }
  return context;
}
