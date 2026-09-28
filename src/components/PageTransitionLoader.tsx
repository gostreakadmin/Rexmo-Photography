import { useState, useEffect, type FC } from 'react';
import { soundEngine } from '../utils/soundEffects';

interface PageTransitionLoaderProps {
  isLoading: boolean;
  targetPage: string;
  onComplete: () => void;
  durationMs?: number;
}

const PAGE_LABELS: Record<string, string> = {
  home: 'Home & Editorial Monograph',
  about: 'Heritage & Studio Timeline',
  services: 'Curated Services & Collections',
  gallery: 'Featured Fine Art Archives',
  stories: 'Archival Love Stories',
  cinematography: 'Cinematography Suite & Reels',
  destinations: 'Destinations Directory',
  testimonials: 'Client Praises & Monograph',
  contact: 'Studio Reservation & Inquiries'
};

export const PageTransitionLoader: FC<PageTransitionLoaderProps> = ({
  isLoading,
  targetPage,
  onComplete,
  durationMs = 1500
}) => {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
      setProgress(0);
      soundEngine.playShutterClick();

      // Animate progress smoothly from 0 to 100 over durationMs
      const startTime = performance.now();
      let animFrameId: number;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const currentProgress = Math.min((elapsed / durationMs) * 100, 100);
        setProgress(currentProgress);

        if (elapsed < durationMs) {
          animFrameId = requestAnimationFrame(animate);
        } else {
          soundEngine.playGoldenChime();
          onComplete();
          setTimeout(() => {
            setShouldRender(false);
          }, 200);
        }
      };

      animFrameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animFrameId);
      };
    } else {
      setShouldRender(false);
      setProgress(0);
    }
  }, [isLoading, durationMs, onComplete]);

  if (!shouldRender) return null;

  const targetLabel = PAGE_LABELS[targetPage] || targetPage.toUpperCase();

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#121212] flex flex-col items-center justify-center select-none transition-opacity duration-300 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      {/* Subtle Analog Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Luxury Golden Glow Radial Ambient */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#A58A62]/10 blur-[120px] pointer-events-none" />

      {/* Center Logo & Branding Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        
        {/* Animated Rexmo Luxury Monogram Emblem */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
          {/* Subtle Outer Pulsing Halo */}
          <div className="absolute inset-0 rounded-full border border-[#A58A62]/20 animate-ping" />
          
          {/* Rotating Outer Camera Aperture Ring */}
          <div 
            className="absolute inset-0 rounded-full border border-dashed border-[#A58A62]/40"
            style={{ animation: 'spin 12s linear infinite' }}
          />

          {/* Inner Accent Ring with Counter-Spin */}
          <div 
            className="absolute inset-2.5 rounded-full border-t border-b border-[#E5D5B8]/60"
            style={{ animation: 'spin 4s linear infinite reverse' }}
          />

          {/* Central Matte Emblem Box */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#181818] border border-[#A58A62]/80 flex items-center justify-center shadow-[0_0_40px_rgba(165,138,98,0.3)]">
            <span className="font-serif text-3xl sm:text-4xl text-[#A58A62] font-light tracking-wider">
              R
            </span>
          </div>
        </div>

        {/* Brand Typographic Title */}
        <div className="space-y-2 mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.35em] text-white font-light uppercase">
            REXMO
          </h2>
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.45em] text-[#A58A62] uppercase">
            PHOTOGRAPHY • EST. 1992
          </p>
          <div className="flex items-center justify-center space-x-2 pt-1 text-[9px] font-mono tracking-widest text-white/40 uppercase">
            <span>SOUTH INDIA</span>
            <span>•</span>
            <span>WORLDWIDE</span>
          </div>
        </div>

        {/* 1.5-Second Progress Bar */}
        <div className="w-56 sm:w-72 h-[2.5px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#8E7552] via-[#D4AF37] to-[#F5E6C8] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(212,175,55,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Loading Message */}
        <div className="mt-5 space-y-1">
          <p className="text-[10px] font-mono tracking-[0.25em] text-white/70 uppercase">
            OPENING PAGE: <span className="text-[#A58A62] font-semibold">{targetLabel}</span>
          </p>
          <p className="text-[8px] font-mono tracking-[0.3em] text-white/30 uppercase">
            LOADING ARCHIVAL STILLS & MASTER SCORES • {Math.round(progress)}%
          </p>
        </div>

      </div>
    </div>
  );
};
