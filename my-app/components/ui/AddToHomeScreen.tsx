"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function AddToHomeScreen() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSTooltip, setShowIOSTooltip] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsIOS(
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window.navigator as Navigator & { standalone?: boolean }).standalone
    );

    setIsInstalled(window.matchMedia("(display-mode: standalone)").matches);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstalled(true);
    }
  };

  if (isInstalled || (!deferredPrompt && !isIOS)) return null;

  return (
    <div className="relative">
      <button
        onClick={isIOS ? () => setShowIOSTooltip((v) => !v) : handleAndroidInstall}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#18B6E6]/40 bg-[#18B6E6]/10 text-[#18B6E6] text-sm font-semibold uppercase tracking-widest hover:bg-[#18B6E6]/20 hover:border-[#18B6E6]/70 transition-all duration-200"
        aria-label="Add to Home Screen"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="12" y1="7" x2="12" y2="13" />
          <polyline points="9 11 12 14 15 11" />
        </svg>
        Add to Home Screen
      </button>

      {isIOS && showIOSTooltip && (
        <div className="absolute bottom-full mb-3 left-0 w-64 bg-[#0a1628] border border-[#18B6E6]/30 rounded-xl p-4 shadow-xl z-50 text-sm text-white/80 leading-relaxed">
          <button
            onClick={() => setShowIOSTooltip(false)}
            className="absolute top-2 right-3 text-white/40 hover:text-white/80 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
          Tap{" "}
          <svg className="inline mx-1 mb-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <strong className="text-white">Share</strong> in Safari, then select{" "}
          <strong className="text-white">&quot;Add to Home Screen&quot;</strong>.
          <div className="absolute -bottom-2 left-6 w-3 h-3 bg-[#0a1628] border-r border-b border-[#18B6E6]/30 rotate-45" />
        </div>
      )}
    </div>
  );
}