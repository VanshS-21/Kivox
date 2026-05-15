"use client";

import { motion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 0.7, 
        ease: easeOutExpo,
        // Add a tiny delay so the browser has a split second to render the DOM before animating
        delay: 0.05 
      }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
