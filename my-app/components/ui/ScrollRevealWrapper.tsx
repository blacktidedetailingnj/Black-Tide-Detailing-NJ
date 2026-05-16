"use client";

import { useEffect } from "react";

interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  threshold?: number;
}

export default function ScrollRevealWrapper({
  children,
  threshold = 0.15,
}: ScrollRevealWrapperProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return <>{children}</>;
}