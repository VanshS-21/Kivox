"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setIsOpen((prev) => !prev);
        break;
      case "Escape":
        setIsOpen(false);
        containerRef.current?.focus();
        break;
      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
        }
        e.preventDefault();
        break;
      case "ArrowUp":
        if (!isOpen) {
          setIsOpen(true);
        }
        e.preventDefault();
        break;
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b text-left text-lg outline-none transition-colors duration-200 flex items-center justify-between disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${
          hasError ? "border-error text-error" : "border-border text-foreground hover:border-accent focus:border-accent focus:bg-accent-muted/50"
        } ${!value ? "text-muted-foreground/40" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-left pe-4 min-w-0 break-words truncate">{value || placeholder}</span>
        <div
          className="shrink-0 ms-4"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <ChevronDown className="w-4 h-4 opacity-50" />
        </div>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
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
                 {!value && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
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
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
