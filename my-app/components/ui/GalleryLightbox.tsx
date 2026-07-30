"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  type?: "image" | "video";
  aspect?: string;
  poster?: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number; // -1 = closed
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function MuteIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {muted ? (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}

export default function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const isOpen = index >= 0;
  const total = images.length;
  const isDesktop = useIsDesktop();

  const [displayIndex, setDisplayIndex] = useState(index);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("galleryVideoMuted") === "true";
  });
  const [volume, setVolume] = useState(() => {
    if (typeof window === "undefined") return 1;
    const stored = localStorage.getItem("galleryVideoVolume");
    const saved = stored !== null ? Number(stored) : NaN;
    return Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : 1;
  });
  const fadeDuration = 220;
  const pendingIndex = useRef<number | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    localStorage.setItem("galleryVideoMuted", String(muted));
  }, [muted]);

  useEffect(() => {
    localStorage.setItem("galleryVideoVolume", String(volume));
  }, [volume]);

  useEffect(() => {
    if (mobileVideoRef.current) {
      mobileVideoRef.current.volume = volume;
    }
  }, [volume, displayIndex]);

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
    window.dispatchEvent(new Event("lightboxopen"));
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      const html = document.documentElement;
      const prevScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = prevScrollBehavior;
      window.dispatchEvent(new Event("lightboxclose"));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const current = images[displayIndex >= 0 ? displayIndex : 0];

  const sideBg = "#0B0F14";
  const panelBg = "#111821";

  const [aw, ah] = (current.aspect || "16/9").split("/").map(Number);
  const boxWidth = `min(85vw, calc(85vh * ${aw} / ${ah}))`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ backgroundColor: "rgba(11, 15, 20, 0.95)" }}
      onClick={onClose}
    >

      {/* ── DESKTOP layout (md+): side buttons outside the image ── */}
      <div
        className="relative hidden md:flex items-stretch mx-4"
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
        <div className="relative flex flex-col">
          <div
            className="relative mx-auto overflow-hidden border border-white/25"
            style={{
              width: boxWidth,
              aspectRatio: current.aspect || "16/9",
              backgroundColor: panelBg,
            }}
          >
            {current.type === "video" ? (
              <video
                key={displayIndex}
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                autoPlay={isDesktop}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: fading ? 0 : 1, transition: `opacity ${fadeDuration}ms ease` }}
              />
            ) : (
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
            )}
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
          style={{ aspectRatio: current.aspect || "16/9", maxHeight: "85vh", backgroundColor: panelBg }}
        >
          {current.type === "video" ? (
            <>
              <video
                ref={mobileVideoRef}
                key={displayIndex}
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                autoPlay={!isDesktop}
                muted={muted}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: fading ? 0 : 1, transition: `opacity ${fadeDuration}ms ease` }}
              />
              {/* iOS's native video controls have no volume slider, so provide one */}
              <div
                className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(11,15,20,0.7)", backdropFilter: "blur(6px)" }}
              >
                <button
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="flex items-center justify-center text-white shrink-0"
                >
                  <MuteIcon muted={muted} />
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setVolume(v);
                    setMuted(v === 0);
                  }}
                  aria-label="Volume"
                  className="w-16 accent-[#18B6E6]"
                />
              </div>
            </>
          ) : (
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
          )}

          {/* Overlaid left button — kept clear of the native video control bar */}
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-0 top-0 w-14 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 group/btn"
            style={{
              bottom: current.type === "video" ? "52px" : 0,
              background: "linear-gradient(to right, rgba(11,15,20,0.55), transparent)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-200 group-hover/btn:-translate-x-0.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Overlaid right button — kept clear of the native video control bar */}
          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-0 top-0 w-14 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 group/btn"
            style={{
              bottom: current.type === "video" ? "52px" : 0,
              background: "linear-gradient(to left, rgba(11,15,20,0.55), transparent)",
            }}
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