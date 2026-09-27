import { useEffect, useState, type FC } from 'react';

export const ScrollProgress: FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2.5px] z-[100] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#A58A62] via-[#C2AB88] to-[#A58A62] relative transition-all duration-75 ease-out shadow-[0_0_8px_rgba(165,138,98,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Leading edge shimmer pulse */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#A58A62]" />
      </div>
    </div>
  );
};
