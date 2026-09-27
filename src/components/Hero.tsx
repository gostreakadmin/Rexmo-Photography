import { useEffect, useState, type FC } from 'react';
import { ArrowDown, Clock } from 'lucide-react';
import { STUDIO_INFO } from '../data/rexmoData';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onExploreWork: () => void;
  onOpenInquiry: () => void;
}

export const Hero: FC<HeroProps> = ({ onExploreWork, onOpenInquiry }) => {
  const [scrollY, setScrollY] = useState(0);
  const [studioTime, setStudioTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Live studio time display (IST)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setStudioTime(new Intl.DateTimeFormat('en-GB', options).format(now) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#F7F6F2] pt-28 pb-12 sm:pb-16"
    >
      {/* Editorial Top Metadata Strip */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-4">
        <div className="flex flex-wrap items-center justify-between border-b border-[#E7E4DE] pb-4 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#6F6F6F] gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A58A62] animate-pulse" />
            <span>FINE ART PHOTOGRAPHY & CINEMA</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span>SOUTH INDIA & INTERNATIONAL</span>
            <span>•</span>
            <span>ESTABLISHED 1992</span>
          </div>
          <div className="flex items-center space-x-2 font-mono text-[#171717]">
            <Clock size={12} className="text-[#A58A62]" />
            <span>{studioTime || 'KOVIL / KOVALAM, TN'}</span>
          </div>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Text Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:space-y-8 z-10 order-2 lg:order-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#EAE7DF] border border-[#E7E4DE] text-[10px] tracking-[0.3em] uppercase text-[#171717] w-fit">
              <span>LEGACY ARCHIVE</span>
              <span>•</span>
              <span className="font-mono">VOL. XXXIV</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-light text-[#171717] leading-[1.05] tracking-tight">
                TIMELESS <br />
                <span className="italic font-normal text-[#A58A62]">STORIES.</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.35em] text-[#6F6F6F] font-medium pt-1">
                REXMO PHOTOGRAPHY • EST. {STUDIO_INFO.established}
              </p>
            </div>

            <blockquote className="border-l-2 border-[#A58A62] pl-4 text-base sm:text-lg text-[#171717]/85 font-serif italic leading-relaxed max-w-md">
              "{STUDIO_INFO.tagline}"
            </blockquote>

            <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed max-w-md">
              Bespoke wedding and portrait cinematography crafted with analog sensibilities, 
              natural emotion, and refined editorial composition.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onExploreWork}
                className="group relative overflow-hidden inline-flex items-center justify-center space-x-3 bg-[#171717] text-[#FFFFFF] px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors duration-300 shadow-sm shimmer-hover"
              >
                <span>EXPLORE OUR WORK</span>
                <span className="text-sm transform group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </button>

              <button
                onClick={onOpenInquiry}
                className="group inline-flex items-center justify-center space-x-2 border border-[#171717] text-[#171717] px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-medium hover:border-[#A58A62] hover:text-[#A58A62] transition-colors duration-300 bg-transparent"
              >
                <span>BEGIN YOUR JOURNEY</span>
                <span className="text-sm transform group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>

            {/* Micro Stats with Animated Counter */}
            <div className="pt-6 border-t border-[#E7E4DE] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#171717]">
                  <AnimatedCounter end={34} suffix="+" />
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F]">Years Legacy</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#171717]">
                  <AnimatedCounter end={1500} suffix="+" />
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F]">Stories Told</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#171717]">4K / Film</p>
                <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F]">Master Quality</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card with Asymmetric Editorial Framing (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative mx-auto max-w-2xl lg:max-w-none">
              
              {/* Decorative Background Offset Border */}
              <div 
                className="absolute inset-0 border border-[#A58A62]/40 translate-x-3 translate-y-3 -z-10 pointer-events-none"
              />

              {/* Main Image Frame */}
              <div 
                data-cursor="explore"
                className="relative overflow-hidden bg-[#EAE7DF] border border-[#E7E4DE] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11] shadow-[0_20px_50px_rgba(0,0,0,0.06)] group"
              >
                <img
                  src="/images/hero.jpg"
                  alt="Rexmo Photography Luxury Wedding Editorial"
                  loading="eager"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translateY(${Math.min(scrollY * 0.04, 30)}px)`
                  }}
                />

                {/* Subtle warm luxury gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                {/* Bottom Overlay Label inside image */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end text-white text-xs">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">PLATE NO. 01</span>
                    <p className="font-serif text-lg sm:text-xl font-light tracking-wide text-white drop-shadow-sm">
                      The Coastal Vow Session
                    </p>
                  </div>
                  <div className="hidden sm:block text-right text-[10px] tracking-widest uppercase font-mono text-white/80">
                    MEDIUM FORMAT ANALOG TONES
                  </div>
                </div>

                {/* Floating Corner Badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#F7F6F2]/90 backdrop-blur-sm px-3.5 py-1.5 border border-[#E7E4DE] text-[10px] tracking-[0.2em] uppercase font-mono text-[#171717]">
                  SINCE 1992
                </div>
              </div>

              {/* Editorial Caption Under Image */}
              <div className="mt-3 flex justify-between items-center text-[11px] tracking-widest text-[#6F6F6F] uppercase">
                <span>AUTHENTIC EMOTION • THOUGHTFUL COMPOSITION</span>
                <span className="font-mono text-[#A58A62]">REXMO STUDIO</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator Strip */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
        <div className="border-t border-[#E7E4DE] pt-4 flex justify-between items-center text-xs tracking-[0.2em] uppercase text-[#6F6F6F]">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[#A58A62]">01</span>
            <span>SCROLL TO DISCOVER</span>
          </div>
          <a
            href="#intro"
            className="flex items-center space-x-1.5 hover:text-[#171717] transition-colors"
          >
            <span>DISCOVER</span>
            <ArrowDown size={14} className="animate-bounce text-[#A58A62]" />
          </a>
        </div>
      </div>
    </section>
  );
};
