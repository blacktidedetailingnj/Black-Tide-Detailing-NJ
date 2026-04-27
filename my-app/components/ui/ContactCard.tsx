import { ReactNode } from "react";

interface ContactCardProps {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
}

export default function ContactCard({ label, value, href, icon }: ContactCardProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-5 px-6 py-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-glow/50 hover:bg-glow/5 transition-all duration-300 group"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-glow group-hover:border-glow/40 group-hover:bg-glow/10 transition-all duration-300">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span
          className="text-glow uppercase tracking-widest"
          style={{ fontSize: "0.65rem", letterSpacing: "0.15em" }}
        >
          {label}
        </span>
        <span className="text-white transition-colors duration-200 text-sm truncate">
          {value}
        </span>
      </div>

      {/* Arrow */}
      <div className="ml-auto flex-shrink-0 text-white/20 group-hover:text-glow group-hover:translate-x-1 transition-all duration-300">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}