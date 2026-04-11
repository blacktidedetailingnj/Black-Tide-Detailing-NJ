import Image from "next/image";
import Link from "next/link";
import AppButton from "@/components/ui/AppButton";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const services = [
  {
    title: "Full Detail",
    description: "Complete interior and exterior marine detailing from bow to stern.",
  },
  {
    title: "Ceramic Coating",
    description: "Long-lasting ceramic protection that repels water, salt, and UV damage.",
  },
  {
    title: "Paint Correction",
    description: "Remove swirls, oxidation, and scratches to restore your hull's shine.",
  },
  {
    title: "Maintenance Plans",
    description: "Scheduled upkeep packages to keep your vessel show-ready all season.",
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
  return (
    <main className="bg-base text-white min-h-screen">
      <NavBar />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.png"
            alt="Hero background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-base/40 to-base" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <Image src="/logo.png" alt="Black Tide Detailing NJ" width={200} height={200} className="object-contain drop-shadow-2xl" />
          <p className="text-glow text-sm tracking-[0.4em] uppercase">Welcome to</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Black Tide<br />
            <span className="text-glow">Detailing NJ</span>
          </h1>
          <p className="text-metallic text-lg tracking-widest uppercase">
            Premium Marine Detailing & Ceramic Coating
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/contact">
              <AppButton variant="primary" size="lg">Book Now</AppButton>
            </Link>
            <Link href="#work">
              <AppButton variant="outline" size="lg">Our Work</AppButton>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-glow text-sm tracking-[0.4em] uppercase mb-3">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-brand-blue/30 border border-metallic/20 rounded-2xl p-8 flex flex-col gap-4 hover:border-glow/50 hover:bg-brand-blue/50 transition-all duration-300 group"
            >
              <h3 className="text-lg font-bold uppercase tracking-wider group-hover:text-glow transition-colors">{service.title}</h3>
              <p className="text-metallic text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="work" className="py-24 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-glow text-sm tracking-[0.4em] uppercase mb-3">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Our Work</h2>
            <p className="text-metallic mt-4 tracking-wider">See our marine detailing transformations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-glow/0 group-hover:bg-glow/10 transition-all duration-300" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact">
              <AppButton variant="outline" size="lg">Book Your Detail</AppButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Ready to Make Your<br />
            <span className="text-glow">Vessel Shine?</span>
          </h2>
          <p className="text-metallic tracking-wider">Serving NJ marinas and waterways. Get a free quote today.</p>
          <Link href="/contact">
            <AppButton variant="primary" size="lg">Get a Free Quote</AppButton>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}