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
    <>
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
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div className={`fixed inset-0 z-[100] bg-base flex flex-col transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        
        {/* Close button */}
        <div className="flex justify-end px-8 py-6 border-b border-metallic/20">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-white/70 hover:text-glow transition-colors duration-300 text-3xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="border-b border-metallic/20">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center px-8 py-6 text-xl tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? "text-white font-bold" : "text-white/70 hover:text-glow"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}