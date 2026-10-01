import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';

interface TextRevealProps {
  children?: ReactNode;
  text?: string;
  delay?: number; // Base delay in ms
  staggerMs?: number; // Stagger per word in ms
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  shimmer?: boolean;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  text,
  delay = 0,
  staggerMs = 60,
  className = '',
  as: Component = 'div',
  shimmer = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // If text string is provided, split by words for staggered reveal
  if (text) {
    const words = text.split(' ');

    return (
      <Component
        ref={containerRef}
        className={`inline-block ${shimmer ? 'relative overflow-hidden' : ''} ${className}`}
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
          >
            <span
              className="inline-block will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: isVisible
                  ? 'translate3d(0, 0, 0) rotate(0deg)'
                  : 'translate3d(0, 115%, 0) rotate(3deg)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay + idx * staggerMs}ms`
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // If arbitrary children are provided, wrap whole block
  return (
    <Component ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        className="will-change-transform transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: isVisible
            ? 'translate3d(0, 0, 0)'
            : 'translate3d(0, 40px, 0)',
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${delay}ms`
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default TextReveal;
