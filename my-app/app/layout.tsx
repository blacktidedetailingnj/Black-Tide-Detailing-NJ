import type { Metadata } from "next";
import { Barlow_Condensed, Space_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import CallButton from "@/components/ui/CallButton";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blacktidedetailingnj.com"),
  title: {
    default: "Black Tide Detailing NJ — Professional Marine Detailing at the Jersey Shore",
    template: "%s — Black Tide Detailing NJ",
  },
  description:
    "Black Tide Detailing NJ offers professional mobile marine detailing at the Jersey Shore. Boat washing, full detailing, oxidation removal, wax, and interior cleaning. We come to your marina.",
  keywords: [
    "marine detailing NJ",
    "boat detailing New Jersey",
    "mobile marine detailing Jersey Shore",
    "boat washing NJ",
    "oxidation removal boat NJ",
    "yacht detailing NJ",
    "boat wax NJ",
    "Black Tide Detailing",
  ],
  authors: [{ name: "Black Tide Detailing NJ" }],
  creator: "Black Tide Detailing NJ",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.blacktidedetailingnj.com",
    siteName: "Black Tide Detailing NJ",
    title: "Black Tide Detailing NJ — Professional Marine Detailing at the Jersey Shore",
    description:
      "Professional mobile marine detailing at the Jersey Shore. Boat washing, full detailing, oxidation removal, wax, and interior cleaning. We come to your marina.",
    images: [
      {
        url: "/og-image.png", // Create a 1200x630 branded image and place it in /public
        width: 1200,
        height: 630,
        alt: "Black Tide Detailing NJ — Marine Detailing at the Jersey Shore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Tide Detailing NJ — Professional Marine Detailing at the Jersey Shore",
    description:
      "Professional mobile marine detailing at the Jersey Shore. We come to your marina.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// LocalBusiness JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Black Tide Detailing NJ",
  image: "https://www.blacktidedetailingnj.com/logo.png",
  "@id": "https://www.blacktidedetailingnj.com",
  url: "https://www.blacktidedetailingnj.com",
  telephone: "+18488882911",
  email: "blacktidedetailingnj@gmail.com",
  description:
    "Professional mobile marine detailing services at the Jersey Shore. Specializing in boat washing, full detailing, oxidation removal, wax, and interior cleaning.",
  areaServed: [
    {
      "@type": "State",
      name: "New Jersey",
    },
    {
      "@type": "Place",
      name: "Jersey Shore, NJ",
    },
  ],
  serviceType: [
    "Marine Detailing",
    "Boat Washing",
    "Oxidation Removal",
    "Boat Waxing",
    "Interior Boat Cleaning",
    "Monthly Boat Maintenance",
  ],
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/blacktidedetailingnj/",
    "https://www.facebook.com/people/BlackTide-Detailing/pfbid0d6zH66aJWX4nb9dYsyZtUd8h7FYTfvetfwbxvxUhGHSVyajyozG7EDT7fAGYNw6Tl/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased scroll-smooth overflow-x-hidden`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
        <CallButton />
      </body>
    </html>
  );
}