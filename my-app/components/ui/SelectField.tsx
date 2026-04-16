"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onSelect: (val: string) => void;
  onBlur: () => void;
  error?: string;
  options: string[];
}

export default function SelectField({
  id,
  label,
  value,
  onSelect,
  onBlur,
  error,
  options,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && open) {
        setOpen(false);
        onBlur();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onBlur, open]);

  const hasValue = !!value;
  const isFloated = hasValue || open;

  return (
    <div className="relative w-full" ref={ref}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "peer w-full text-left bg-transparent h-14",
          "border rounded-xl px-4 text-sm transition-all duration-300",
          "flex items-center justify-between gap-2",
          "outline-none",
          open && "shadow-[0_0_0_1px_#18B6E6,0_0_16px_#18B6E640]",
          error
            ? "border-red-500/70"
            : open
            ? "border-glow"
            : "border-white/60",
          hasValue ? "text-white pt-5 pb-2" : "text-transparent pt-0 pb-0"
        )}
      >
        <span className={hasValue ? "text-white" : "text-transparent"}>
          {value}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`shrink-0 text-metallic/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Floating label */}
      <label
        htmlFor={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "absolute left-4 pointer-events-none select-none transition-all duration-200",
          isFloated
            ? "top-2 text-[0.65rem] tracking-widest uppercase"
            : "top-1/2 -translate-y-1/2 text-sm tracking-wide",
          error
            ? isFloated ? "text-red-400/70" : "text-metallic/60"
            : isFloated
            ? open ? "text-glow" : "text-metallic/50"
            : "text-metallic/60"
        )}
      >
        {label}
      </label>

      {/* Bottom accent line — matches FormField */}
      <div
        className={cn(
          "absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-300 scale-x-0 origin-center",
          open && "scale-x-100",
          error ? "bg-red-400" : "bg-glow"
        )}
      />

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-1.5 w-full bg-[#0f1e2e] border border-metallic/20 rounded-xl overflow-hidden shadow-xl">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === opt
                    ? "text-white bg-[#18B6E6]/20"
                    : "text-metallic hover:bg-white/5 hover:text-white"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Error message — matches FormField */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 ml-1 text-xs text-red-400/90 tracking-wide flex items-center gap-1.5"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="4.5" stroke="currentColor" />
            <path d="M5 3v2.5M5 7h.01" stroke="currentColor" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}