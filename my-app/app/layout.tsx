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
  title: "Black Tide Detailing NJ",
  description: "Black Tide Detailing NJ offers professional mobile marine detailing services at the Jersey Shore. Specializing in boat washing, full detailing, oxidation removal, and interior cleaning. We come to your marina.",
  icons: {
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Black Tide Detailing NJ",
    description: "Professional mobile marine detailing services at the Jersey Shore.",
    url: "https://www.yourdomain.com",
    siteName: "Black Tide Detailing NJ",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Black Tide Detailing NJ",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Black Tide Detailing NJ",
    description: "Professional mobile marine detailing services at the Jersey Shore.",
    images: ["/logo.png"],
  },
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
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
        <CallButton />
      </body>
    </html>
  );
}