"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useFitness } from "./context";
import FitnessHomeView from "./home-view";
import BookTrialPage from "./book/view";
import ClassDetailPage from "./classes/view";
import MemberPortalPage from "./member/view";
import PricingPage from "./pricing/view";
import SchedulePage from "./schedule/view";
import TrainersPage from "./trainers/view";

export default function FitnessSPA() {
  const { view } = useFitness();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[80vh] bg-[#050505]" />;
  }

  switch (view) {
    case "schedule":
      return <SchedulePage />;
    case "trainers":
      return <TrainersPage />;
    case "pricing":
      return <PricingPage />;
    case "book":
      return <BookTrialPage />;
    case "member":
      return <MemberPortalPage />;
    case "class-detail":
      return <ClassDetailPage />;
    case "home":
    default:
      return <FitnessHomeView />;
  }
}
