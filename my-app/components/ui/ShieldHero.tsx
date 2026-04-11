"use client";

export default function ShieldHero({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl -mt-6 flex items-center justify-center">
      <svg
        viewBox="0 0 800 660"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0B0F14" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="borderGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8CDD6" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#9CA3AF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C8CDD6" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="chevronGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6B7280" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#D1D5DB" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F3F4F6" stopOpacity="1" />
            <stop offset="70%" stopColor="#D1D5DB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6B7280" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="bottomShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0" />
            <stop offset="100%" stopColor="#C8CDD6" stopOpacity="0.15" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="chevronGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shield fill */}
        <path
          d="M 40 20 Q 20 20 20 40 L 20 510 L 400 640 L 780 510 L 780 40 Q 780 20 760 20 Z"
          fill="url(#shieldGrad)"
        />
        {/* Bottom shine */}
        <path
          d="M 20 400 L 20 510 L 400 640 L 780 510 L 780 400 Z"
          fill="url(#bottomShine)"
        />
        {/* Outer border */}
        <path
          d="M 40 20 Q 20 20 20 40 L 20 510 L 400 640 L 780 510 L 780 40 Q 780 20 760 20 Z"
          fill="none"
          stroke="url(#borderGrad)"
          strokeWidth="2.5"
          filter="url(#glow)"
        />
        {/* Inner border */}
        <path
          d="M 52 32 Q 34 32 34 50 L 34 504 L 400 628 L 766 504 L 766 50 Q 766 32 748 32 Z"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        {/* Shiny chevron */}
        <path
          d="M 200 570 L 400 640 L 600 570"
          fill="none"
          stroke="url(#chevronGrad)"
          strokeWidth="2.5"
          filter="url(#chevronGlow)"
        />
        {/* Inner chevron depth */}
        <path
          d="M 250 585 L 400 645 L 550 585"
          fill="none"
          stroke="rgba(200,205,214,0.2)"
          strokeWidth="1"
        />
      </svg>

      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center gap-1 sm:gap-3 px-[14%] pt-14 pb-[28%] sm:px-[16%] sm:pt-16 sm:pb-[22%] md:pt-20 md:pb-[20%]">
        {children}
      </div>
    </div>
  );
}