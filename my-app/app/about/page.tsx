"use client";

import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AppButton from "@/components/ui/AppButton";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { scrollRevealStyles } from "@/lib/animationStyles";

export default function AboutPage() {
  useScrollReveal();

  return (
    <>
      <style>{scrollRevealStyles}</style>

      <main className="bg-base text-white min-h-screen">
        <NavBar />

        {/* HERO */}
        <section className="relative pt-36 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.png"
              alt="Marine detailing background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-base/80 via-base/60 to-base" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Image
              src="/logo.png"
              alt="Black Tide Detailing NJ"
              width={250}
              height={250}
              priority
              className="object-contain mx-auto mb-6 drop-shadow-2xl"
            />
            <p className="text-metallic uppercase tracking-[0.35em] text-sm mb-4">
              Our Story
            </p>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              <span className="bg-gradient-to-t from-[#18B6E6] to-white bg-clip-text text-transparent">
                The Standard for Marine<br />Detailing in NJ
              </span>
            </h1>
            <p className="text-metallic text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              At Blacktide Detailing, our passion for the water runs deep — rooted in family, forged on the water, and brought to the Jersey Shore.
            </p>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-24 px-6 reveal reveal-from-right">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.png"
                alt="Our story — family roots on the water"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-base/40 to-transparent" />
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[#18B6E6] uppercase tracking-[0.3em] text-sm font-bold">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                Born on the Water
              </h2>
              <p className="text-metallic leading-relaxed text-base md:text-lg">
                Coming from a family of fishermen, some of our earliest memories were made on boats — learning the craft, respecting the ocean, and working side by side restoring vessels with our father. What began as helping out quickly grew into a true passion: bringing life back to worn, weathered boats and experiencing the pride of watching them return to the water.
              </p>
              <p className="text-metallic leading-relaxed text-base md:text-lg">
                That feeling never left. Over time, we pursued marine detailing professionally, refining our skills and commitment to quality. Today, we&apos;re proud to bring that same dedication and passion to our new home at the Jersey Shore — honored to serve this community and help fellow boaters protect, restore, and maintain their vessels at the highest standard.
              </p>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="py-24 px-6 bg-secondary/20 reveal reveal-from-left">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-[#18B6E6] uppercase tracking-[0.3em] text-sm font-bold">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                Protecting What You&apos;ve<br />Invested In
              </h2>
              <p className="text-metallic leading-relaxed text-base md:text-lg">
                At Black Tide Detailing, our mission is to deliver exceptional marine detailing and restorations with precision, integrity, and a deep respect for the water. We are committed to using eco-friendly, marine-safe products that protect both your vessel and the environment.
              </p>
              <p className="text-metallic leading-relaxed text-base md:text-lg">
                Our goal is to save boat owners time while providing long-lasting results that preserve and enhance the life of every boat we service. As a licensed and trusted business, we take pride in bringing each vessel to its highest potential — restoring beauty, protecting value, and ensuring it stands the test of time.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.png"
                alt="Our mission — restoring boats to their best"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-base/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center reveal reveal-from-left">
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              <span className="bg-gradient-to-t from-[#18B6E6] to-white bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-metallic text-lg leading-relaxed">
              Let us bring your vessel back to life. Get in touch today and experience the Black Tide standard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              <Link href="/contact">
                <AppButton variant="primary" size="lg">Book a Detail</AppButton>
              </Link>
              <Link href="/">
                <AppButton variant="outline" size="lg">See Our Work</AppButton>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}