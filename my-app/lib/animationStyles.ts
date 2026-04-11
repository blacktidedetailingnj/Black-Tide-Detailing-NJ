export const scrollRevealStyles = `
  .reveal {
    opacity: 0;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal-from-left  { transform: translateX(-60px); }
  .reveal-from-right { transform: translateX(60px); }
  .reveal-visible {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const heroAnimationStyles = `
  @keyframes kenBurns {
    from { transform: scale(1); }
    to   { transform: scale(1.08); }
  }
  .hero-bg-img {
    animation: kenBurns 12s ease-in-out forwards;
    transform-origin: center center;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-item {
    opacity: 0;
    animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .hero-item-1 { animation-delay: 0.15s; }
  .hero-item-2 { animation-delay: 0.40s; }
  .hero-item-3 { animation-delay: 0.60s; }
  .hero-item-4 { animation-delay: 0.80s; }
  .hero-item-5 { animation-delay: 1.00s; }

  @keyframes shimmer {
    0%   { opacity: 0.3; }
    50%  { opacity: 0.9; }
    100% { opacity: 0.3; }
  }
  .hero-line {
    animation: shimmer 3s ease-in-out infinite;
    animation-delay: 1.2s;
  }

  .hero-btn {
    transition: transform 0.2s ease;
  }
  .hero-btn:hover {
    transform: translateY(-2px);
  }
`;
