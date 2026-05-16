import type { Metadata } from "next";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import HomePageClient from "@/components/ui/HomePageClient";

export const metadata: Metadata = {
  title: "Professional Mobile Marine Detailing at the Jersey Shore",
  description:
    "Black Tide Detailing NJ delivers premium mobile marine detailing at the Jersey Shore. Boat washing, full detail packages, oxidation removal, wax, interior cleaning, and monthly maintenance. We come to your marina.",
  openGraph: {
    title: "Black Tide Detailing NJ — Mobile Marine Detailing at the Jersey Shore",
    description:
      "Premium mobile marine detailing at the Jersey Shore. Boat washing, full detail, oxidation removal, wax, and interior cleaning. We come to your marina.",
    url: "https://www.blacktidedetailingnj.com",
  },
};

export default function HomePage() {
  return (
    <main className="bg-base text-white min-h-screen">
      <NavBar />
      <HomePageClient />
      <Footer />
    </main>
  );
}