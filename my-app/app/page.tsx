import Image from "next/image";
import Link from "next/link";
import AppButton from "@/components/ui/AppButton";
import ShieldHero from "@/components/ui/ShieldHero";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const services = [
  {
    title: "Service1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Service2",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Service3",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Service4",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder2.png"
            alt="Hero background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-base/40 to-base" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-3xl w-full">

          {/* Logo — smaller on mobile */}
          <Image
            src="/logo.png"
            alt="Black Tide Detailing NJ"
            width={250}
            height={250}
            className="object-contain drop-shadow-2xl relative z-10 w-60 h-60 -mt-16 sm:mt-0 sm:w-60 sm:h-60 md:w-[250px] md:h-[250px]"
          />

          {/* Shield with content */}
          <ShieldHero>
            <p className="text-metallic text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] uppercase flex items-center gap-2 sm:gap-3">
              <span className="block w-5 sm:w-8 h-px bg-metallic/50" />
              Welcome To
              <span className="block w-5 sm:w-8 h-px bg-metallic/50" />
            </p>

            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
              Black Tide<br />
              <span className="text-glow">Detailing NJ</span>
            </h1>

            <p className="text-metallic text-[11px] sm:text-sm tracking-widest uppercase">
              Premium Marine Detailing & Ceramic Coating
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1 sm:mt-2">
              <Link href="/contact">
                <AppButton variant="primary" size="lg" className="!px-5 !py-2 !text-xs sm:!px-10 sm:!py-3 sm:!text-sm md:!px-14 md:!py-4 md:![font-size:1rem]">Book Now</AppButton>
              </Link>
              <Link href="#work">
                <AppButton variant="outline" size="lg" className="!px-5 !py-2 !text-xs sm:!px-10 sm:!py-3 sm:!text-sm md:!px-14 md:!py-4 md:![font-size:1rem]">Our Work</AppButton>
              </Link>
            </div>
          </ShieldHero>

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Our Services</h2>
          <p className="text-metallic mt-4 tracking-wider">Professional marine detailing services, keeping your vessel in pristine condition.</p>
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

      <Footer />
    </main>
  );
}