export default function ShieldHero({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-2xl -mt-6">
      <svg
        viewBox="0 0 800 520"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
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
          d="M 40 20 Q 20 20 20 40 L 20 380 L 400 500 L 780 380 L 780 40 Q 780 20 760 20 Z"
          fill="url(#shieldGrad)"
        />
        {/* Bottom shine */}
        <path
          d="M 20 300 L 20 380 L 400 500 L 780 380 L 780 300 Z"
          fill="url(#bottomShine)"
        />
        {/* Outer border */}
        <path
          d="M 40 20 Q 20 20 20 40 L 20 380 L 400 500 L 780 380 L 780 40 Q 780 20 760 20 Z"
          fill="none"
          stroke="url(#borderGrad)"
          strokeWidth="2.5"
          filter="url(#glow)"
        />
        {/* Inner border */}
        <path
          d="M 52 32 Q 34 32 34 50 L 34 374 L 400 488 L 766 374 L 766 50 Q 766 32 748 32 Z"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        {/* Shiny chevron */}
        <path
          d="M 200 430 L 400 500 L 600 430"
          fill="none"
          stroke="url(#chevronGrad)"
          strokeWidth="2.5"
          filter="url(#chevronGlow)"
        />
        {/* Inner chevron depth */}
        <path
          d="M 250 445 L 400 505 L 550 445"
          fill="none"
          stroke="rgba(200,205,214,0.2)"
          strokeWidth="1"
        />

        {/* Content rendered inside SVG using foreignObject so it scales with the shield */}
        <foreignObject x="60" y="30" width="680" height="420">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              paddingBottom: "32px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}