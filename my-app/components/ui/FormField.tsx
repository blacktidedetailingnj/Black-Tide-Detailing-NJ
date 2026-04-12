"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, multiline = false, rows = 5, className, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    const sharedInputClass = cn(
      // Base
      "peer w-full bg-transparent pt-5 pb-2 px-4 text-white text-sm tracking-wide",
      "border border-white/60 rounded-xl",
      "placeholder-transparent",
      "outline-none transition-all duration-300",
      // Focus
      "focus:border-glow focus:shadow-[0_0_0_1px_#18B6E6,0_0_16px_#18B6E640]",
      // Error
      error && "border-red-500/70 focus:border-red-400 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.6)]",
      className
    );

    const labelClass = cn(
      "absolute left-4 text-metallic/60 transition-all duration-200 pointer-events-none select-none",
      // Floated state (when focused or has value)
      "peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-glow",
      "peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[0.65rem] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:uppercase",
      // Default (placeholder-shown = field is empty)
      "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-wide",
      multiline && "peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0",
      error
        ? "peer-focus:text-red-400 peer-not-placeholder-shown:text-red-400/70"
        : "peer-not-placeholder-shown:text-metallic/50"
    );

    return (
      <div className="relative w-full group">
        {multiline ? (
          <textarea
            id={fieldId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            placeholder=" "
            className={cn(sharedInputClass, "resize-none")}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            aria-invalid={!!error}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            ref={ref as React.Ref<HTMLInputElement>}
            placeholder=" "
            className={cn(sharedInputClass, "h-14")}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            aria-invalid={!!error}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        <label htmlFor={fieldId} className={labelClass}>
          {label}
        </label>

        {/* Bottom accent line */}
        <div
          className={cn(
            "absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-300 scale-x-0 origin-center",
            "peer-focus:scale-x-100",
            error ? "bg-red-400" : "bg-glow"
          )}
        />

        {error && (
          <p
            id={`${fieldId}-error`}
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
);

FormField.displayName = "FormField";
export default FormField;