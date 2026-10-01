import { useEffect, useState, useRef, type FC } from 'react';
import { ArrowDown, Clock, Play } from 'lucide-react';
import { STUDIO_INFO } from '../data/rexmoData';
import { AnimatedCounter } from './AnimatedCounter';
import { GoldenParticles } from './GoldenParticles';
import { TiltCard } from './TiltCard';
import { ApertureBadge } from './ApertureBadge';
import { TextReveal } from './TextReveal';
import { Magnetic } from './Magnetic';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

interface HeroProps {
  onExploreWork: () => void;
  onOpenInquiry: () => void;
  onWatchCinema?: () => void;
}

export const Hero: FC<HeroProps> = ({ onExploreWork, onOpenInquiry, onWatchCinema }) => {
  const [scrollY, setScrollY] = useState(0);
  const [studioTime, setStudioTime] = useState('');
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isLockedVideo, setIsLockedVideo] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  const handleHeroMouseEnter = () => {
    setIsHeroHovered(true);
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  };

  const handleHeroMouseLeave = () => {
    setIsHeroHovered(false);
    if (heroVideoRef.current && !isLockedVideo) {
      heroVideoRef.current.pause();
    }
  };

  const handleToggleLockVideo = () => {
    soundEngine.playShutterClick();
    setIsLockedVideo((prev) => {
      const next = !prev;
      if (next && heroVideoRef.current) {
        heroVideoRef.current.play().catch(() => {});
      } else if (!next && !isHeroHovered && heroVideoRef.current) {
        heroVideoRef.current.pause();
      }
      return next;
    });
  };

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

  const handleExplore = () => {
    soundEngine.playShutterClick();
    onExploreWork();
  };

  const handleInquire = () => {
    soundEngine.playGoldenChime();
    onOpenInquiry();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#F7F6F2] pt-28 pb-12 sm:pb-16"
    >
      {/* Floating Golden Dust Particles Canvas */}
      <GoldenParticles count={30} className="z-0" />

      {/* Editorial Top Metadata Strip */}
      <div className="w-full max-w-[96vw] mx-auto px-3 sm:px-6 lg:px-8 pt-4 relative z-10">
        <div className="flex flex-wrap items-center justify-between border-b border-[#E7E4DE] pb-4 text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#6F6F6F] gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A58A62] animate-pulse" />
            <span>{t('hero.strip', 'FINE ART PHOTOGRAPHY & CINEMA')}</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span>{t('hero.regions', 'SOUTH INDIA & INTERNATIONAL')}</span>
            <span>•</span>
            <span>{t('hero.established', 'ESTABLISHED 1992')}</span>
          </div>
          <div className="flex items-center space-x-2 font-mono text-[#171717]">
            <Clock size={12} className="text-[#A58A62]" />
            <span>{studioTime || 'KOVIL / KOVALAM, TN'}</span>
          </div>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="w-full max-w-[96vw] mx-auto px-3 sm:px-6 lg:px-8 my-auto py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Text Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:space-y-8 z-10 order-2 lg:order-1">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#EAE7DF] border border-[#E7E4DE] text-[10px] tracking-[0.3em] uppercase text-[#171717] w-fit">
                <span>{t('hero.badge', 'LEGACY ARCHIVE • VOL. XXXIV')}</span>
              </div>
              
              {/* Rotating Lens Aperture Badge with Magnetic Attraction */}
              <div className="hidden sm:block">
                <Magnetic strength={0.25} radius={60}>
                  <ApertureBadge size={64} />
                </Magnetic>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-light text-[#171717] leading-[1.05] tracking-tight">
                <TextReveal text={t('hero.title1', 'TIMELESS')} delay={100} />
                <br />
                <span className="italic font-normal text-[#A58A62]">
                  <TextReveal text={t('hero.title2', 'STORIES.')} delay={300} />
                </span>
              </h1>
              <p className="text-xs uppercase tracking-[0.35em] text-[#6F6F6F] font-medium pt-1 font-mono">
                REXMO PHOTOGRAPHY • EST. {STUDIO_INFO.established}
              </p>
            </div>

            <blockquote className="border-l-2 border-[#A58A62] pl-4 text-base sm:text-lg text-[#171717]/85 font-serif italic leading-relaxed max-w-md">
              "{t('hero.tagline', STUDIO_INFO.tagline)}"
            </blockquote>

            <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed max-w-md font-light">
              {t('hero.subtitle', 'Bespoke wedding and portrait cinematography crafted with analog sensibilities, natural emotion, and refined editorial composition.')}
            </p>

            {/* CTAs with Magnetic Attraction & Shimmer */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Magnetic strength={0.3} radius={70}>
                <button
                  onClick={handleExplore}
                  className="group relative overflow-hidden inline-flex items-center justify-center space-x-3 bg-[#171717] text-[#FFFFFF] px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors duration-300 shadow-sm shimmer-hover w-full sm:w-auto"
                >
                  <span>{t('hero.cta.explore', 'EXPLORE OUR WORK')}</span>
                  <span className="text-sm transform group-hover:translate-x-1.5 transition-transform duration-300">
                    →
                  </span>
                </button>
              </Magnetic>

              <Magnetic strength={0.3} radius={70}>
                <button
                  onClick={handleInquire}
                  className="group inline-flex items-center justify-center space-x-2 border border-[#171717] text-[#171717] px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-medium hover:border-[#A58A62] hover:text-[#A58A62] transition-colors duration-300 bg-transparent w-full sm:w-auto"
                >
                  <span>{t('hero.cta.journey', 'BEGIN YOUR JOURNEY')}</span>
                  <span className="text-sm transform group-hover:translate-x-1.5 transition-transform duration-300">
                    →
                  </span>
                </button>
              </Magnetic>
            </div>

            {/* Micro Stats with Animated Counter */}
            <div className="pt-6 border-t border-[#E7E4DE] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#171717]">
                  <AnimatedCounter end={34} suffix="+" />
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F]">
                  {t('hero.stat.years', 'Years Legacy')}
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#171717]">
                  <AnimatedCounter end={1500} suffix="+" />
                </p>
                <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F]">
                  {t('hero.stat.stories', 'Stories Told')}
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#171717]">4K / Film</p>
                <p className="text-[10px] uppercase tracking-wider text-[#6F6F6F]">
                  {t('hero.stat.master', 'Master Quality')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card with 3D Tilt Card and Asymmetric Editorial Framing (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative mx-auto max-w-2xl lg:max-w-none">
              
              {/* Decorative Background Offset Border */}
              <div 
                className="absolute inset-0 border border-[#A58A62]/40 translate-x-3 translate-y-3 -z-10 pointer-events-none"
              />

              {/* Main Image/Video Frame wrapped in 3D TiltCard */}
              <TiltCard maxTilt={5} scale={1.01} glare={true}>
                <div 
                  data-cursor="play"
                  onClick={() => {
                    soundEngine.playShutterClick();
                    if (onWatchCinema) {
                      onWatchCinema();
                    } else {
                      const cinemaEl = document.getElementById('cinematography');
                      if (cinemaEl) {
                        cinemaEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  onMouseEnter={handleHeroMouseEnter}
                  onMouseLeave={handleHeroMouseLeave}
                  className="relative overflow-hidden bg-[#171717] border border-[#E7E4DE] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11] shadow-[0_20px_50px_rgba(0,0,0,0.06)] group cursor-pointer"
                >
                  {/* Still Photo Layer */}
                  <img
                    src="images/hero.jpg"
                    alt="Rexmo Photography Luxury Wedding Editorial"
                    loading="eager"
                    className={`w-full h-full object-cover object-center transform transition-all duration-700 ease-out ${
                      isHeroHovered || isLockedVideo ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                    style={{
                      transform: `translateY(${Math.min(scrollY * 0.04, 30)}px)`
                    }}
                  />

                  {/* Cinema Video Layer (Starts playing on hover) */}
                  <video
                    ref={heroVideoRef}
                    src="videos/ambient-teaser.mp4"
                    poster="images/hero.jpg"
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                      isHeroHovered || isLockedVideo ? 'opacity-95 scale-105' : 'opacity-0 pointer-events-none'
                    }`}
                  />

                  {/* Subtle warm luxury gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

                  {/* Hover Status & Lock Toggle Button */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center space-x-2">
                    <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 border border-white/20 text-white text-[10px] font-mono tracking-widest uppercase shadow-md">
                      {isHeroHovered || isLockedVideo ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                          <span>PLAYING ON HOVER</span>
                        </>
                      ) : (
                        <>
                          <Play size={10} className="fill-white" />
                          <span>KEEP CURSOR TO PLAY</span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleLockVideo();
                      }}
                      className="hidden sm:inline-flex items-center px-2.5 py-1.5 bg-black/50 hover:bg-[#A58A62] backdrop-blur-md border border-white/20 text-[9px] font-mono tracking-widest text-white/90 uppercase transition-colors"
                      title="Lock continuous video playback"
                    >
                      {isLockedVideo ? 'UNLOCK' : 'LOCK LOOP'}
                    </button>
                  </div>

                  {/* Bottom Overlay Label inside image */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end text-white text-xs z-10 pointer-events-none">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">
                        {isHeroHovered || isLockedVideo ? 'LIVE 4K CINEMA TEASER' : 'PLATE NO. 01'}
                      </span>
                      <p className="font-serif text-lg sm:text-xl font-light tracking-wide text-white drop-shadow-sm">
                        {isHeroHovered || isLockedVideo ? 'Motion Poem: Kovalam Twilight' : 'The Coastal Vow Session'}
                      </p>
                    </div>
                    <div className="hidden sm:block text-right text-[10px] tracking-widest uppercase font-mono text-white/80">
                      {isHeroHovered || isLockedVideo ? 'SUPER 8 GRAIN & 2.39:1' : 'MEDIUM FORMAT ANALOG TONES'}
                    </div>
                  </div>

                  {/* Floating Corner Badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#F7F6F2]/90 backdrop-blur-sm px-3.5 py-1.5 border border-[#E7E4DE] text-[10px] tracking-[0.2em] uppercase font-mono text-[#171717] z-10 pointer-events-none">
                    SINCE 1992
                  </div>
                </div>
              </TiltCard>

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
      <div className="w-full max-w-[96vw] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="border-t border-[#E7E4DE] pt-4 flex justify-between items-center text-xs tracking-[0.2em] uppercase text-[#6F6F6F]">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[#A58A62]">01</span>
            <span>{t('hero.scroll', 'SCROLL TO DISCOVER')}</span>
          </div>
          <a
            href="#intro"
            onClick={() => soundEngine.playShutterClick()}
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
