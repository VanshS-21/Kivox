"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useSchool } from "./context";
import SchoolHomeView from "./home-view";
import SchoolAdmissionsView from "./admissions/view";
import SchoolInquiryView from "./inquiry/view";
import SchoolParentStatusView from "./parent-status/view";
import SchoolProgramsView from "./programs/view";
import SchoolProgramDetailView from "./programs/detail-view";

export default function SchoolSPA() {
  const { view } = useSchool();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[80vh] bg-oklch(0.985 0.004 90)" />;
  }

  switch (view) {
    case "programs":
      return <SchoolProgramsView />;
    case "program-detail":
      return <SchoolProgramDetailView />;
    case "admissions":
      return <SchoolAdmissionsView />;
    case "inquiry":
      return <SchoolInquiryView />;
    case "parent-status":
      return <SchoolParentStatusView />;
    case "home":
    default:
      return <SchoolHomeView />;
  }
}
