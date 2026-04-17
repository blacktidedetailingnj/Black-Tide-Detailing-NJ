"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number; // -1 = closed
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const isOpen = index >= 0;
  const total = images.length;

  const [displayIndex, setDisplayIndex] = useState(index);
  const [fading, setFading] = useState(false);
  const fadeDuration = 220;
  const pendingIndex = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (index === displayIndex) return;
    if (fading) {
      pendingIndex.current = index;
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFading(true);
    const timer = setTimeout(() => {
      setDisplayIndex(index);
      setFading(false);
      if (pendingIndex.current !== null && pendingIndex.current !== index) {
        onNavigate(pendingIndex.current);
        pendingIndex.current = null;
      }
    }, fadeDuration);
    return () => clearTimeout(timer);
  }, [index, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setDisplayIndex(index);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + total) % total);
  }, [index, total, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % total);
  }, [index, total, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const current = images[displayIndex >= 0 ? displayIndex : 0];

  const sideBg = "#0B0F14";
  const panelBg = "#111821";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(11, 15, 20, 0.95)" }}
      onClick={onClose}
    >

      {/* ── DESKTOP layout (md+): side buttons outside the image ── */}
      <div
        className="relative hidden md:flex items-stretch w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left panel */}
        <button
          onClick={goPrev}
          aria-label="Previous image"
          className="flex items-center justify-center w-12 shrink-0 rounded-l-2xl border-y border-l border-white/5 text-metallic hover:text-white hover:border-glow/30 transition-all duration-200 group/btn"
          style={{ backgroundColor: sideBg }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform duration-200 group-hover/btn:-translate-x-0.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Centre: image + counter */}
        <div className="relative flex-1 flex flex-col">
          <div
            className="relative w-full overflow-hidden border border-white/25"
            style={{ aspectRatio: "16/9", backgroundColor: panelBg }}
          >
            <Image
              key={displayIndex}
              src={current.src}
              alt={current.alt}
              fill
              sizes="896px"
              className="object-cover"
              priority
              style={{ opacity: fading ? 0 : 1, transition: `opacity ${fadeDuration}ms ease` }}
            />
          </div>
          <div
            className="flex items-center justify-between px-4 py-2 border-x border-b border-white/5"
            style={{ backgroundColor: panelBg }}
          >
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => onNavigate(i)} aria-label={`Go to image ${i + 1}`}
                  className="transition-all duration-200"
                  style={{
                    width: i === index ? "18px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    backgroundColor: i === index ? "#18B6E6" : "rgba(138,143,152,0.3)",
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-medium tracking-widest uppercase text-metallic/60">
              {index + 1} / {total}
            </span>
          </div>
        </div>

        {/* Right panel */}
        <button
          onClick={goNext}
          aria-label="Next image"
          className="flex items-center justify-center w-12 shrink-0 rounded-r-2xl border-y border-r border-white/5 text-metallic hover:text-white hover:border-glow/30 transition-all duration-200 group/btn"
          style={{ backgroundColor: sideBg }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-4 -right-4 flex items-center justify-center w-9 h-9 rounded-full border border-white/25 text-metallic hover:text-white hover:border-glow/40 transition-all duration-200"
          style={{ backgroundColor: sideBg }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── MOBILE layout (<md): full-width, buttons overlaid on image ── */}
      <div
        className="relative flex md:hidden flex-col w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image — edge to edge */}
        <div
          className="relative w-full overflow-hidden border-y border-white/25"
          style={{ aspectRatio: "16/9", backgroundColor: panelBg }}
        >
          <Image
            key={displayIndex}
            src={current.src}
            alt={current.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            style={{ opacity: fading ? 0 : 1, transition: `opacity ${fadeDuration}ms ease` }}
          />

          {/* Overlaid left button */}
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-0 inset-y-0 w-14 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 group/btn"
            style={{ background: "linear-gradient(to right, rgba(11,15,20,0.55), transparent)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-200 group-hover/btn:-translate-x-0.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Overlaid right button */}
          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-0 inset-y-0 w-14 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 group/btn"
            style={{ background: "linear-gradient(to left, rgba(11,15,20,0.55), transparent)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Close button — top right corner of image */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-white transition-all duration-200"
            style={{ backgroundColor: "rgba(11,15,20,0.7)", backdropFilter: "blur(6px)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Counter bar */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b border-white/5"
          style={{ backgroundColor: panelBg }}
        >
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => onNavigate(i)} aria-label={`Go to image ${i + 1}`}
                className="transition-all duration-200"
                style={{
                  width: i === index ? "18px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: i === index ? "#18B6E6" : "rgba(138,143,152,0.3)",
                }}
              />
            ))}
          </div>
          <span className="text-xs font-medium tracking-widest uppercase text-metallic/60">
            {index + 1} / {total}
          </span>
        </div>
      </div>

    </div>
  );
}