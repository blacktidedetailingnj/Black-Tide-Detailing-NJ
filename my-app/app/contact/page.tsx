"use client";

import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import ContactCard from "@/components/ui/ContactCard";
import Image from "next/image";

const CONTACT_ITEMS = [
  {
    label: "Phone",
    value: "(848) 888-2911",
    href: "tel:+18488882911",
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 1.5h3l1.5 3.5-1.75 1a8.5 8.5 0 004.25 4.25l1-1.75L14.5 10v3A1.5 1.5 0 0113 14.5C6.1 14.5 1.5 9.9 1.5 3A1.5 1.5 0 013 1.5z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "blacktidedetailingnj@gmail.com",
    href: "mailto:blacktidedetailingnj@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1.5 4l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@blacktidedetailingnj",
    href: "https://www.instagram.com/blacktidedetailingnj/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="bg-base text-white min-h-screen">
      <NavBar />

      {/* Page hero */}
      <section className="pt-16 pb-12 px-6 text-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Black Tide Detailing NJ"
            width={350}
            height={350}
            className="object-contain mx-auto mb-6 drop-shadow-2xl w-40 h-40 sm:w-52 sm:h-52 md:w-[220px] md:h-[220px] cursor-pointer"
          />
        </Link>
        <p
          className="text-metallic uppercase flex items-center justify-center gap-2 mb-4"
          style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.8rem)", letterSpacing: "0.35em" }}
        >
          <span className="block w-6 h-px bg-metallic/50" />
          Get In Touch
          <span className="block w-6 h-px bg-metallic/50" />
        </p>
        <h1
          className="font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          <span className="bg-gradient-to-t from-[#18B6E6] to-white bg-clip-text text-transparent">
            Contact Us
          </span>
        </h1>
        <p className="text-white text-sm tracking-wider max-w-md mx-auto text-[20px]">
          Have a question or want to follow us? Reach out through any of the channels below.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-metallic/30 to-transparent" />
      </div>

      {/* Contact cards */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {CONTACT_ITEMS.map((item) => (
            <ContactCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}