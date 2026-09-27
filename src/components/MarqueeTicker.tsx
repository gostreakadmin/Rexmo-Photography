import type { FC } from 'react';

interface MarqueeTickerProps {
  items: string[];
  direction?: 'left' | 'right';
  speedSeconds?: number;
  variant?: 'light' | 'subtle' | 'gold-border';
  className?: string;
}

export const MarqueeTicker: FC<MarqueeTickerProps> = ({
  items,
  direction = 'left',
  speedSeconds = 35,
  variant = 'light',
  className = ''
}) => {
  // Double the items array to ensure seamless looping without gap
  const repeatedItems = [...items, ...items, ...items, ...items];

  const bgClasses = {
    light: 'bg-white border-y border-[#E7E4DE] text-[#171717]',
    subtle: 'bg-[#F7F6F2] border-y border-[#E7E4DE] text-[#171717]',
    'gold-border': 'bg-[#FFFFFF] border-y border-[#A58A62]/30 text-[#171717]'
  }[variant];

  const animationStyle = {
    animation: `marquee ${speedSeconds}s linear infinite ${direction === 'right' ? 'reverse' : 'normal'}`
  };

  return (
    <div
      className={`relative w-full overflow-hidden py-3.5 sm:py-4 select-none group ${bgClasses} ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex w-max space-x-8 sm:space-x-12 animate-marquee group-hover:[animation-play-state:paused]"
        style={animationStyle}
      >
        {repeatedItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center space-x-6 sm:space-x-8 flex-shrink-0"
          >
            <span className="font-serif text-sm sm:text-base tracking-[0.2em] uppercase font-light text-[#171717]/90">
              {item}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A58A62]" />
          </div>
        ))}
      </div>
    </div>
  );
};
