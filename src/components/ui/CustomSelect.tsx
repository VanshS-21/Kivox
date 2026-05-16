"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

interface CustomSelectProps {
  id: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  options: readonly string[];
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
}

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  hasError = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-0 py-4 bg-transparent border-0 border-b text-left studio-h3-sans outline-none transition-colors duration-200 flex items-center justify-between disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${
          hasError ? "border-error text-error" : "border-border text-foreground hover:border-accent focus:border-accent focus:bg-accent-muted/50"
        } ${!value ? "text-muted-foreground/40" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{value || placeholder}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
          className="shrink-0 ml-4"
        >
          <ChevronDown className="w-4 h-4 opacity-50" />
        </motion.div>
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="absolute z-50 w-full mt-1 bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden py-1 max-h-60 overflow-y-auto"
            role="listbox"
          >
            {/* Optional empty state option for Timeline */}
            {placeholder === "Choose a timeline" && (
               <li
                 role="option"
                 aria-selected={!value}
                 onClick={() => {
                   onChange(undefined);
                   setIsOpen(false);
                 }}
                 className={`px-4 py-4 studio-body cursor-pointer transition-colors duration-200 flex items-center justify-between ${
                   !value ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                 }`}
               >
                 {placeholder}
                 {!value && (
                   <motion.div
                     layoutId="check"
                     className="w-1.5 h-1.5 rounded-full bg-accent"
                   />
                 )}
               </li>
            )}
            {options.map((option) => {
              const isSelected = value === option;
              return (
                <li
                  key={option}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-4 studio-body cursor-pointer transition-colors duration-200 flex items-center justify-between ${
                    isSelected ? "bg-accent/10 text-accent font-medium" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {option}
                  {isSelected && (
                    <motion.div
                      layoutId="check"
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                    />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
