import { useEffect, useState, useRef, type FC } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: FC<AnimatedCounterProps> = ({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  decimals = 0,
  className = ''
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTimestamp: number | null = null;
          const startValue = 0;

          // easeOutExpo function for smooth luxurious slowdown
          const easeOutExpo = (t: number): number => {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          };

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const current = startValue + (end - startValue) * easedProgress;

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
