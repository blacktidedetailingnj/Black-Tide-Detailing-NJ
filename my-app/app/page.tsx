"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppButton from "@/components/ui/AppButton";
import ShieldHero from "@/components/ui/ShieldHero";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { heroAnimationStyles, scrollRevealStyles } from "@/lib/animationStyles";

const services = [
  {
    title: "Basic Wash Package",
    description: "A thorough exterior rinse and hand wash to remove salt, grime, and buildup from every outing.",
  },
  {
    title: "Full Detail Package (Most Popular)",
    description: "Our complete interior and exterior treatment, restoring your vessel to its best condition inside and out.",
  },
  {
    title: "Wax",
    description: "Long-lasting protection against UV, salt, and oxidation.",
  },
  {
    title: "Interior Cleaning",
    description: "Deep cleaning of cabin, upholstery, carpets, and surfaces leaving the inside as sharp as the outside.",
  },
  {
    title: "Oxidation Removal",
    description: "We compound and polish away oxidation and faded gelcoat, bringing dull surfaces back to life.",
  },
  {
    title: "Monthly Maintenance",
    description: "Keep your boat in top shape year-round with a recurring maintenance plan tailored to your schedule.",
  },
];

const galleryImages = [
  { src: "/placeholder.png", alt: "Boat detail 1" },
  { src: "/placeholder.png", alt: "Boat detail 2" },
  { src: "/placeholder.png", alt: "Boat detail 3" },
  { src: "/placeholder.png", alt: "Boat detail 4" },
  { src: "/placeholder.png", alt: "Boat detail 5" },
  { src: "/placeholder.png", alt: "Boat detail 6" },
];

export default function HomePage() {
  useScrollReveal();
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Smooth scroll to #work if navigated here with that hash (e.g. from About page)
  useEffect(() => {
    if (window.location.hash === "#work") {
      const el = document.getElementById("work");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, []);

  const handleWorkScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById("work");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{scrollRevealStyles + heroAnimationStyles}</style>

      <main className="bg-base text-white min-h-screen">
        <NavBar />

        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/placeholder2.png"
              alt="Hero background"
              fill
              className="object-cover opacity-70 hero-bg-img"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-base/40 to-base" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-3xl w-full md:translate-y-8">
            <div className="hero-item hero-item-1">
              <Image
                src="/logo.png"
                alt="Black Tide Detailing NJ"
                width={250}
                height={250}
                priority
                className="object-contain drop-shadow-2xl w-48 h-48 -mt-16 sm:mt-0 sm:w-56 sm:h-56 md:w-[250px] md:h-[250px]"
              />
            </div>

            <ShieldHero>
              <div className="hero-item hero-item-2">
                <p
                  className="text-metallic uppercase flex items-center gap-2"
                  style={{ fontSize: "clamp(0.7rem, 2vw, 0.875rem)", letterSpacing: "0.35em" }}
                >
                  <span className="hero-line block w-4 sm:w-6 h-px bg-metallic/50" />
                  Welcome To
                  <span className="hero-line block w-4 sm:w-6 h-px bg-metallic/50" />
                </p>
              </div>

              <div className="hero-item hero-item-3">
                <h1
                  className="font-black uppercase tracking-tight leading-none"
                  style={{ fontSize: "clamp(1.6rem, 5.5vw, 3.75rem)" }}
                >
                  <span className="bg-gradient-to-t from-[#18B6E6] to-white bg-clip-text text-transparent">
                    Black Tide<br />
                    Detailing NJ
                  </span>
                </h1>
              </div>

              <div className="hero-item hero-item-4">
                <p
                  className="text-metallic uppercase leading-snug max-w-[80%] mx-auto"
                  style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.95rem)", letterSpacing: "0.08em" }}
                >
                  Premium Marine Detailing
                </p>
              </div>

              <div className="hero-item hero-item-5 flex flex-col md:flex-row gap-2 md:gap-3 mt-1 w-[70%] md:w-full justify-center items-center mx-auto">
                <Link href="/contact" className="hero-btn w-full md:w-auto">
                  <AppButton
                    variant="primary"
                    size="lg"
                    className="w-full md:w-auto !px-3 !py-1.5 ![font-size:0.7rem] sm:!px-8 sm:!py-3 sm:!text-sm md:!px-10 md:!py-4 md:![font-size:1rem]"
                  >
                    Book Now
                  </AppButton>
                </Link>
                <a href="#work" onClick={handleWorkScroll} className="hero-btn w-full md:w-auto">
                  <AppButton
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto !px-3 !py-1.5 ![font-size:0.7rem] sm:!px-8 sm:!py-3 sm:!text-sm md:!px-10 md:!py-4 md:![font-size:1rem]"
                  >
                    Our Work
                  </AppButton>
                </a>
              </div>
            </ShieldHero>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24 px-6 max-w-6xl mx-auto reveal reveal-from-left">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Our Services</h2>
            <p className="text-glow mt-4 tracking-wider text-base md:text-lg">
              Professional marine detailing services, keeping your vessel in pristine condition.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-brand-blue/30 border border-metallic/20 rounded-2xl p-8 flex flex-col gap-4 hover:border-glow/50 hover:bg-brand-blue/50 transition-all duration-300 group"
              >
                <h3 className="text-lg font-bold uppercase tracking-wider group-hover:text-glow transition-colors">
                  {service.title}
                </h3>
                <p className="text-metallic text-base leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section id="work" className="py-24 px-6 bg-secondary/20 reveal reveal-from-right">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Our Work</h2>
              <p className="text-glow mt-4 tracking-wider text-base md:text-lg">
                See our marine detailing transformations
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-glow/0 group-hover:bg-glow/10 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/contact">
                <AppButton variant="outline" size="lg">Request a Quote</AppButton>
              </Link>
            </div>
          </div>
        </section>

        {/* LIGHTBOX */}
        <GalleryLightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={setLightboxIndex}
        />

        <Footer />
      </main>
    </>
  );
}