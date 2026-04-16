"use client";

import { useEffect, useState } from "react";

export default function CallButton() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <a
      href="tel:+18488882911"
      aria-label="Give us a call"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: scrolled ? "44px" : "48px",
        width: scrolled ? "44px" : "160px",
        borderRadius: "9999px",
        backgroundColor: "#18B6E6",
        boxShadow: "0 0 24px #18B6E660",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textDecoration: "none",
        transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease",
        WebkitTapHighlightColor: "transparent",
        gap: scrolled ? "0" : "8px",
        paddingLeft: scrolled ? "0" : "20px",
        paddingRight: scrolled ? "0" : "20px",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M3 1.5h3l1.5 3.5-1.75 1a8.5 8.5 0 004.25 4.25l1-1.75L14.5 10v3A1.5 1.5 0 0113 14.5C6.1 14.5 1.5 9.9 1.5 3A1.5 1.5 0 013 1.5z"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          color: "white",
          fontWeight: "700",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: scrolled ? 0 : 1,
          maxWidth: scrolled ? "0px" : "120px",
          overflow: "hidden",
          transition: "opacity 0.2s ease, max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        Give Us a Call
      </span>
    </a>
  );
}