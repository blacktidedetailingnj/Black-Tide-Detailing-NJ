import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base border-t border-metallic/20 py-10 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Image src="/logo.png" alt="Black Tide Detailing NJ" width={60} height={60} className="object-contain opacity-80" />
        <p className="text-metallic text-sm tracking-widest uppercase">
          © {new Date().getFullYear()} Black Tide Detailing NJ. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/about" className="text-metallic text-sm hover:text-glow transition-colors tracking-widest uppercase">About</Link>
          <Link href="/contact" className="text-metallic text-sm hover:text-glow transition-colors tracking-widest uppercase">Contact</Link>
        </div>
      </div>
    </footer>
  );
}