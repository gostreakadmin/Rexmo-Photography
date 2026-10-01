import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';

interface CurtainRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  color?: string;
  className?: string;
}

export const CurtainReveal: FC<CurtainRevealProps> = ({
  children,
  delay = 100,
  duration = 700,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setIsDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // After reveal animation completes, remove overlay from DOM
          setTimeout(() => {
            setIsDone(true);
          }, delay + duration + 300);

          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.12 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Underlying Image with gentle cinematic settle */}
      <div
        className="w-full h-full will-change-transform transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: isVisible ? 'scale(1)' : 'scale(1.05)',
          opacity: isVisible ? 1 : 0.85,
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`
        }}
      >
        {children}
      </div>

      {/* Elegant Rexmo Loading Logo Reveal Overlay (Replaces brown shade) */}
      {!isDone && (
        <div
          className={`absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all ease-out`}
          style={{
            opacity: isVisible ? 0 : 1,
            transitionDuration: `${duration}ms`,
            transitionDelay: `${delay}ms`
          }}
        >
          {/* Animated Rexmo Monogram Loading Logo */}
          <div
            className="relative flex items-center justify-center transition-transform ease-out"
            style={{
              transform: isVisible ? 'scale(0.8)' : 'scale(1)',
              transitionDuration: `${duration}ms`,
              transitionDelay: `${delay}ms`
            }}
          >
            {/* Outer Rotating Dashed Aperture Ring */}
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-dashed border-[#A58A62]/60"
              style={{ animation: 'spin 10s linear infinite' }}
            />

            {/* Inner Counter-Rotating Ring */}
            <div
              className="absolute inset-1.5 rounded-full border-t border-b border-[#E5D5B8]/80"
              style={{ animation: 'spin 3s linear infinite reverse' }}
            />

            {/* Central Rexmo 'R' Monogram Badge */}
            <div className="absolute w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#181818]/95 border border-[#A58A62] flex items-center justify-center shadow-lg">
              <span className="font-serif text-sm sm:text-base text-[#A58A62] font-light">
                R
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurtainReveal;
