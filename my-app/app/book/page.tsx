import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import BookingForm from "@/components/ui/BookingForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a marine detailing quote from Black Tide Detailing NJ. Services include boat washing, full detail packages, oxidation removal, wax, interior cleaning, and monthly maintenance. We come to your marina at the Jersey Shore.",
  openGraph: {
    title: "Request a Quote — Black Tide Detailing NJ",
    description:
      "Request a marine detailing quote. Boat washing, full detail, oxidation removal, wax, interior cleaning at the Jersey Shore. We come to your marina.",
    url: "https://www.blacktidedetailingnj.com/book",
  },
};

export default function BookPage() {
  return (
    <main className="bg-base text-white min-h-screen">
      <NavBar />

      {/* Page hero */}
      <section className="pt-16 pb-12 px-6 text-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Black Tide Detailing NJ logo"
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
          Get a Quote
          <span className="block w-6 h-px bg-metallic/50" />
        </p>
        <h1
          className="font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          <span className="bg-gradient-to-t from-[#18B6E6] to-white bg-clip-text text-transparent">
            Request a Quote
          </span>
        </h1>
        <p className="text-metallic text-sm tracking-wider max-w-md mx-auto text-[18px]">
          Fill out the form below and we&apos;ll get back to you to discuss scheduling and availability.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-metallic/30 to-transparent" />
      </div>

      {/* Booking form (client component) */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <BookingForm />
        </div>
      </section>

      {/* Contact info */}
      <section className="py-5 px-6">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <a
              href="mailto:blacktidedetailingnj@gmail.com"
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl border border-white/20 hover:border-glow/50 hover:bg-glow/5 transition-all duration-200 group w-full"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 text-glow">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1.5 4l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                blacktidedetailingnj@gmail.com
              </span>
            </a>
            <a
              href="tel:+18488882911"
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl border border-white/20 hover:border-glow/50 hover:bg-glow/5 transition-all duration-200 group w-full"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0 text-glow">
                <path d="M3 1.5h3l1.5 3.5-1.75 1a8.5 8.5 0 004.25 4.25l1-1.75L14.5 10v3A1.5 1.5 0 0113 14.5C6.1 14.5 1.5 9.9 1.5 3A1.5 1.5 0 013 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm">
                <span className="text-white/80 group-hover:text-white transition-colors">(848) 888-2</span>
                <span className="text-glow">911</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}