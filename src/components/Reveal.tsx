import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
  className?: string;
  threshold?: number;
}

export const Reveal: FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.12
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransformStyle = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0 scale-100';

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-8';
      case 'down':
        return 'opacity-0 -translate-y-8';
      case 'left':
        return 'opacity-0 translate-x-8';
      case 'right':
        return 'opacity-0 -translate-x-8';
      case 'zoom':
        return 'opacity-0 scale-95';
      case 'fade':
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out will-change-transform ${getTransformStyle()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};
