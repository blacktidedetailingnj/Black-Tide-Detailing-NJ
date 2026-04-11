"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-md border-b border-metallic/20">
      <div className="flex items-center justify-between px-8 py-4 md:justify-center">

        {/* Desktop nav */}
        <ul className="hidden md:flex w-full">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="flex-1 flex flex-col items-center">
                <Link
                  href={link.href}
                  className={`text-base tracking-widest uppercase transition-colors duration-300 py-2 ${
                    isActive
                      ? "text-white font-bold"
                      : "text-white/70 hover:text-glow"
                  }`}
                >
                  {link.label}
                </Link>
                <div className={`h-0.5 w-full transition-all duration-300 ${isActive ? "bg-glow" : "bg-transparent"}`} />
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 mr-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-48" : "max-h-0"}`}>
        <ul className="flex flex-col items-center gap-6 py-6 border-t border-metallic/20">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="flex flex-col items-center">
                <Link
                  href={link.href}
                  className={`text-base tracking-widest uppercase transition-colors duration-300 py-2 ${
                    isActive
                      ? "text-white font-bold"
                      : "text-white/70 hover:text-glow"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                <div className={`h-0.5 w-full transition-all duration-300 ${isActive ? "bg-glow" : "bg-transparent"}`} />
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}