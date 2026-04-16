"use client";

import { cn } from "@/lib/utils";

interface ServiceButtonProps {
  label: string;
  checked: boolean;
  onClick: () => void;
}

export default function ServiceButton({ label, checked, onClick }: ServiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200",
        checked
          ? "border-[#18B6E6] bg-[#18B6E6]/20 text-white font-bold shadow-[0_0_16px_#18B6E630]"
          : "border-white/40 bg-transparent text-metallic hover:border-[#18B6E6]/60 hover:bg-transparent hover:text-white"
      )}
    >
      <span className="flex items-center gap-2.5">
        <span
          className={cn(
            "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-200",
            checked
              ? "bg-[#18B6E6] border-[#18B6E6]"
              : "border-white/50 bg-transparent"
          )}
        >
          {checked && (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M1.5 4.5l2 2 4-4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {label}
      </span>
    </button>
  );
}