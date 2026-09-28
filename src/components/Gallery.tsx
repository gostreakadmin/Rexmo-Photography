import { useState, useMemo, useRef, useEffect, useCallback, type FC } from 'react';
import { 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin,
  ArrowDown,
  Camera,
  Film
} from 'lucide-react';
import { GALLERY_DATA } from '../data/rexmoData';
import { Lightbox } from './Lightbox';
import { TiltCard } from './TiltCard';
import { soundEngine } from '../utils/soundEffects';

interface GalleryProps {
  onNavigate?: (page: string) => void;
}

export const Gallery: FC<GalleryProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Full-Width Kinetic Scroll Showcase Index
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const showcaseContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'ALL', label: 'ALL ARCHIVES' },
    { id: 'WEDDINGS', label: 'ROYAL WEDDINGS' },
    { id: 'MATERNITY', label: 'MATERNITY' },
    { id: 'NEWBORN', label: 'NEWBORN' },
    { id: 'MODELING', label: 'EDITORIAL' },
    { id: 'EVENTS', label: 'CURATED CELEBRATIONS' }
  ];

  // Filter items based on category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'ALL') return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const totalCount = filteredItems.length;
  const isAtLastPhoto = showcaseIndex === totalCount - 1;
  const progressPercentage = totalCount > 0 ? ((showcaseIndex + 1) / totalCount) * 100 : 0;

  // Window resize handler for responsive card sizing
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Frame navigation methods
  const handleNextPhoto = useCallback(() => {
    setShowcaseIndex((prev) => {
      if (prev < totalCount - 1) {
        soundEngine.playShutterClick();
        return prev + 1;
      }
      return prev;
    });
  }, [totalCount]);

  const handlePrevPhoto = useCallback(() => {
    setShowcaseIndex((prev) => {
      if (prev > 0) {
        soundEngine.playShutterClick();
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleSelectThumbnail = useCallback((index: number) => {
    if (index === showcaseIndex) return;
    soundEngine.playShutterClick();
    setShowcaseIndex(index);
  }, [showcaseIndex]);

  const handleOpenLightbox = (index: number) => {
    soundEngine.playShutterClick();
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleCategorySelect = (catId: string) => {
    soundEngine.playShutterClick();
    setSelectedCategory(catId);
    setShowcaseIndex(0);
    // Smooth scroll back to top of showcase if category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToClientSection = () => {
    soundEngine.playGoldenChime();
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    const section = document.getElementById('gallery-client-suite');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // =========================================================================
  // STRICT PAGE SCROLL LOCKING UNTIL REACHING THE LAST PHOTO:
  // 1. Until showcaseIndex === lastPhoto:
  //    - document.documentElement & body overflow are set to 'hidden' (no page scrolling!)
  //    - wheel events anywhere on the screen are intercepted with e.preventDefault()
  //    - user scrolling DOWN advances photos smoothly with debounce/threshold
  //    - user scrolling UP steps backwards through photos
  // 2. ONLY when showcaseIndex === lastPhoto:
  //    - document overflow unlocks to 'auto'
  //    - scrolling DOWN allows the page to scroll down into the client suite & footer!
  // 3. When scrolled down in client suite, scrolling UP back to top (scrollY <= 15)
  //    re-engages photo scrolling and locks page scroll if user scrolls up past frame!
  // =========================================================================
  useEffect(() => {
    if (lightboxOpen) return;

    // Apply or release page body overflow lock
    const applyScrollLock = () => {
      const atTop = window.scrollY <= 15;
      if (atTop && !isAtLastPhoto) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };

    applyScrollLock();

    let lastScrollTime = 0;
    const cooldownMs = 280; // Silky responsive transition between frames
    let accumulatedDelta = 0;
    const deltaThreshold = 35; // Sensitive to mouse wheel & trackpad gestures

    const handleWindowWheel = (e: WheelEvent) => {
      // If user has already scrolled down into the client portal section:
      if (window.scrollY > 20) {
        // If user scrolls back UP to the very top:
        if (window.scrollY <= 30 && e.deltaY < 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // We are at the gallery showcase stage
      const now = performance.now();

      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (showcaseIndex < totalCount - 1) {
          // Strictly prevent vertical page movement!
          e.preventDefault();
          accumulatedDelta += Math.abs(e.deltaY);

          if (accumulatedDelta >= deltaThreshold && now - lastScrollTime > cooldownMs) {
            lastScrollTime = now;
            accumulatedDelta = 0;
            handleNextPhoto();
          }
        } else {
          // AT LAST PHOTO: Unlock page scroll so user can scroll down naturally!
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
          // Do not call e.preventDefault(); allows normal page scroll to next section
        }
      } else if (e.deltaY < 0) {
        // Scrolling UP
        if (showcaseIndex > 0) {
          // Strictly prevent vertical page movement, rewind photo
          e.preventDefault();
          accumulatedDelta += Math.abs(e.deltaY);

          if (accumulatedDelta >= deltaThreshold && now - lastScrollTime > cooldownMs) {
            lastScrollTime = now;
            accumulatedDelta = 0;
            handlePrevPhoto();
          }
        } else {
          // At first photo, prevent scrolling past the top
          e.preventDefault();
        }
      }
    };

    // Mobile Touch Navigation
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 20) return;

      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const diffY = touchStartY - touchY;
      const diffX = touchStartX - touchX;

      // Primary swipe gesture (vertical or horizontal)
      const primaryDiff = Math.abs(diffX) > Math.abs(diffY) ? diffX : diffY;
      const now = performance.now();

      if (Math.abs(primaryDiff) > 35 && now - lastScrollTime > cooldownMs) {
        if (primaryDiff > 0) {
          // Swipe up / swipe left -> Next
          if (showcaseIndex < totalCount - 1) {
            e.preventDefault();
            lastScrollTime = now;
            handleNextPhoto();
            touchStartY = touchY;
            touchStartX = touchX;
          } else {
            // At last photo, allow scrolling down
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
          }
        } else {
          // Swipe down / swipe right -> Prev
          if (showcaseIndex > 0) {
            e.preventDefault();
            lastScrollTime = now;
            handlePrevPhoto();
            touchStartY = touchY;
            touchStartX = touchX;
          }
        }
      } else if (showcaseIndex < totalCount - 1 && window.scrollY <= 20) {
        // Keep page locked while in showcase
        e.preventDefault();
      }
    };

    // Keyboard Arrow navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (window.scrollY > 20) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (showcaseIndex < totalCount - 1) {
          e.preventDefault();
          handleNextPhoto();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (showcaseIndex > 0) {
          e.preventDefault();
          handlePrevPhoto();
        }
      }
    };

    window.addEventListener('wheel', handleWindowWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [showcaseIndex, totalCount, isAtLastPhoto, lightboxOpen, handleNextPhoto, handlePrevPhoto]);

  // Dimension helpers for the edge-to-edge staggered horizontal layout (matching the video)
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const cardWidth = isMobile 
    ? Math.min(viewportWidth * 0.94, 440) 
    : isTablet 
    ? Math.min(viewportWidth * 0.76, 700) 
    : Math.min(viewportWidth * 0.64, 1050);

  // Spacing between card centers: tight overlap creates continuous edge-to-edge flow with minimal side gaps
  const cardSpacing = isMobile ? cardWidth * 0.84 : cardWidth * 0.68;

  // Alternating vertical offsets for the organic high-fashion collage spread seen in the video
  const getStaggerY = (diff: number) => {
    if (diff === 0) return 0;
    if (diff === -1) return -26; // Left card floats slightly higher
    if (diff === 1) return 30;   // Right card floats slightly lower
    if (diff === -2) return 22;  // Far left floats lower
    if (diff === 2) return -22;  // Far right floats higher
    return (diff % 2 === 0 ? 16 : -16);
  };

  const getRotateY = (diff: number) => {
    if (diff === 0) return 0;
    if (diff === -1) return 10;
    if (diff === 1) return -10;
    if (diff === -2) return 16;
    if (diff === 2) return -16;
    return diff > 0 ? -20 : 20;
  };

  const getScale = (diff: number) => {
    if (diff === 0) return 1;
    if (Math.abs(diff) === 1) return 0.88;
    if (Math.abs(diff) === 2) return 0.74;
    return 0.6;
  };

  const getOpacity = (diff: number) => {
    if (diff === 0) return 1;
    if (Math.abs(diff) === 1) return 0.78;
    if (Math.abs(diff) === 2) return 0.45;
    return 0;
  };

  const getZIndex = (diff: number) => {
    return 30 - Math.abs(diff) * 5;
  };

  return (
    <div id="gallery" className="bg-[#090909] text-white relative min-h-screen w-full select-none">
      
      {/* ========================================================================= */}
      {/* 1. FULL-WIDTH, FULL-PAGE IMMERSIVE SCROLL-ANIMATED SHOWCASE STAGE          */}
      {/* ========================================================================= */}
      <div 
        ref={showcaseContainerRef}
        className="relative w-full h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 pb-3 px-1 sm:px-2 overflow-hidden"
      >
        {/* Top Gold Progress Track across full width */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-50 pointer-events-none">
          <div 
            className="h-full bg-gradient-to-r from-[#8E7552] via-[#C9B28F] to-[#E5D5B8] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(201,178,143,0.6)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Ambient Golden Fog / Lens Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] bg-[#A58A62]/10 rounded-full blur-[190px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.94)_100%)] pointer-events-none" />

        {/* Technical Grid Crosshair Overlay (Inspired by User's Video) */}
        <div className="absolute inset-x-4 top-20 bottom-16 border border-white/[0.04] pointer-events-none hidden md:block" />
        
        {/* Studio Technical Viewfinder Annotations (Corners) */}
        <div className="absolute top-20 left-4 sm:left-8 z-30 pointer-events-none hidden sm:flex flex-col text-[10px] font-mono tracking-widest text-white/50 uppercase">
          <div className="flex items-center space-x-2 text-[#A58A62]">
            <span className="w-1.5 h-1.5 bg-[#A58A62] rounded-full animate-ping" />
            <span className="font-semibold">EST. 2014 • ROYAL HERITAGE</span>
          </div>
          <span className="text-white/40 mt-0.5">MOTION / STILLS • SIGNAL 01</span>
        </div>

        <div className="absolute top-20 right-4 sm:right-8 z-30 pointer-events-none hidden sm:flex flex-col items-end text-[10px] font-mono tracking-widest text-white/50 uppercase">
          <span className="text-white font-serif tracking-[0.2em] text-sm text-[#E5D5B8]">THE REXMO STUDIOS</span>
          <span className="text-[#A58A62] mt-0.5">CURATED MASTER ARCHIVE</span>
        </div>

        {/* ========================================================================= */}
        {/* TOP EDITORIAL FILTER STRIP & NAVIGATION BAR                                */}
        {/* ========================================================================= */}
        <div className="relative z-30 w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 border-b border-white/10 pb-2.5 px-2">
          
          {/* Brand & Plate Index */}
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#A58A62] animate-pulse" />
            <span className="font-serif text-base sm:text-lg tracking-[0.25em] text-white font-light uppercase">
              REXMO ARCHIVE
            </span>
            <span className="text-white/20 text-xs">•</span>
            <span className="text-[11px] font-mono tracking-widest text-[#A58A62]">
              FRAME {String(showcaseIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
            </span>
          </div>

          {/* Minimalist Category Selectors */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar max-w-full py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest rounded-full transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#A58A62] text-white shadow-[0_0_12px_rgba(165,138,98,0.4)] font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Lightbox Enlarge Action */}
          <button
            onClick={() => handleOpenLightbox(showcaseIndex)}
            className="hidden lg:flex items-center space-x-2 text-[10px] font-mono tracking-widest text-white/70 hover:text-[#A58A62] transition-colors"
          >
            <Maximize2 size={13} className="text-[#A58A62]" />
            <span>FULLSCREEN APERTURE</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* KINETIC HORIZONTAL 3D COLLAGE STAGE (CONTINUOUS SMOOTH GLIDE LIKE VIDEO)   */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full flex-1 flex items-center justify-center overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {filteredItems.map((item, idx) => {
            const diff = idx - showcaseIndex;
            // Only render items within visible spread (-2 to +2) for silky 60fps performance
            if (Math.abs(diff) > 2) return null;

            const isActive = diff === 0;
            const xOffset = diff * cardSpacing;
            const yOffset = getStaggerY(diff);
            const rotY = getRotateY(diff);
            const scaleVal = getScale(diff);
            const opacityVal = getOpacity(diff);
            const zIndexVal = getZIndex(diff);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isActive) {
                    handleOpenLightbox(idx);
                  } else {
                    handleSelectThumbnail(idx);
                  }
                }}
                className={`absolute top-1/2 left-1/2 select-none cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-90'
                }`}
                style={{
                  width: `${cardWidth}px`,
                  zIndex: zIndexVal,
                  opacity: opacityVal,
                  transform: `translate3d(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px), 0) scale(${scaleVal}) rotateY(${rotY}deg)`,
                  filter: isActive ? 'none' : 'grayscale(20%) brightness(0.85)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {isActive ? (
                  <TiltCard maxTilt={3} scale={1.01} glare={true}>
                    <div className="relative overflow-hidden bg-black border-2 border-[#A58A62] rounded-sm shadow-[0_30px_90px_rgba(0,0,0,0.98)] group aspect-[16/10] w-full">
                      
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="eager"
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-104"
                      />

                      {/* Technical Leica Viewfinder Framing Corner Brackets */}
                      <div className="absolute top-2 left-2 text-[#A58A62] font-mono text-xs pointer-events-none select-none">┌</div>
                      <div className="absolute top-2 right-2 text-[#A58A62] font-mono text-xs pointer-events-none select-none">┐</div>
                      <div className="absolute bottom-2 left-2 text-[#A58A62] font-mono text-xs pointer-events-none select-none">└</div>
                      <div className="absolute bottom-2 right-2 text-[#A58A62] font-mono text-xs pointer-events-none select-none">┘</div>

                      {/* Vignette Shadow Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/40 pointer-events-none" />

                      {/* Top Film Stock Tag */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[9px] sm:text-[10px] font-mono tracking-widest text-white/90 uppercase pointer-events-none z-10">
                        <div className="flex items-center space-x-2 bg-black/75 backdrop-blur-md px-2.5 py-1 border border-white/20">
                          <Camera size={11} className="text-[#A58A62]" />
                          <span>REXMO 5074 • {item.category}</span>
                        </div>
                        <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 border border-white/20 text-[#A58A62] font-semibold">
                          PLATE {String(idx + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Center Viewfinder Enlarge Indicator on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-black/80 backdrop-blur-md border border-[#A58A62] text-white flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                          <Maximize2 size={18} className="text-[#A58A62]" />
                        </div>
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 z-10 pointer-events-none">
                        <div className="space-y-1 max-w-xl">
                          {item.location && (
                            <div className="flex items-center space-x-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#A58A62]">
                              <MapPin size={11} />
                              <span>{item.location}</span>
                            </div>
                          )}
                          <h3 className="font-serif text-xl sm:text-3xl text-white font-light tracking-wide drop-shadow-xl leading-tight">
                            "{item.title}"
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-white/80 font-light leading-relaxed hidden sm:block max-w-md font-serif italic drop-shadow-md">
                            "{item.caption || 'Medium-format analog heritage preservation.'}"
                          </p>
                        </div>

                        <div className="hidden sm:block text-right">
                          <span className="text-[9px] font-mono tracking-widest text-white/60 uppercase block">
                            EXPAND VIEW ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                ) : (
                  // Passive Surrounding Cards in Staggered 3D Spread
                  <div className="relative overflow-hidden bg-black/80 border border-white/20 rounded-sm shadow-2xl group aspect-[16/10] w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                    
                    {/* Directional Indicator Tag */}
                    <div className={`absolute bottom-2 ${diff < 0 ? 'left-2.5' : 'right-2.5'} flex items-center space-x-1 text-[8px] sm:text-[9px] font-mono text-white/80 uppercase bg-black/80 backdrop-blur-sm px-2 py-0.5 border border-white/10`}>
                      {diff < 0 ? (
                        <>
                          <ChevronLeft size={11} className="text-[#A58A62]" />
                          <span>PREV: {item.title.slice(0, 14)}...</span>
                        </>
                      ) : (
                        <>
                          <span>NEXT: {item.title.slice(0, 14)}...</span>
                          <ChevronRight size={11} className="text-[#A58A62]" />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM TECHNICAL HUD: ARROWS, DYNAMIC LOCK STATUS & STRIP                  */}
        {/* ========================================================================= */}
        <div className="relative z-30 w-full space-y-2 pt-1 px-1">
          
          {/* Status Row */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/70">
            
            {/* Arrow Nav Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPhoto}
                disabled={showcaseIndex === 0}
                aria-label="Previous frame"
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  showcaseIndex === 0
                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                    : 'border-white/30 text-white hover:bg-[#A58A62] hover:border-[#A58A62] active:scale-95'
                }`}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={handleNextPhoto}
                disabled={isAtLastPhoto}
                aria-label="Next frame"
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  isAtLastPhoto
                    ? 'border-white/10 text-white/20 cursor-not-allowed'
                    : 'border-white/30 text-white hover:bg-[#A58A62] hover:border-[#A58A62] active:scale-95'
                }`}
              >
                <ChevronRight size={15} />
              </button>
              <span className="text-[9px] font-mono text-white/40 ml-1 hidden md:inline">
                SCROLL WHEEL OR ARROW KEYS
              </span>
            </div>

            {/* DYNAMIC SCROLL LOCK STATUS NOTIFIER */}
            <div className="text-center flex items-center space-x-2">
              {isAtLastPhoto ? (
                <button
                  onClick={scrollToClientSection}
                  className="bg-[#A58A62] hover:bg-[#b89a6f] text-black font-semibold px-4 py-1 text-[10px] sm:text-[11px] flex items-center space-x-2 animate-bounce rounded-full shadow-[0_0_20px_rgba(165,138,98,0.7)] transition-transform active:scale-95 cursor-pointer"
                >
                  <Sparkles size={13} className="text-black" />
                  <span>LAST FRAME REACHED • SCROLL DOWN TO REVEAL CLIENT SUITE</span>
                  <ArrowDown size={13} />
                </button>
              ) : (
                <div className="flex items-center space-x-2 text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[9px] sm:text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A58A62] animate-ping" />
                  <span>SCROLL MOUSE WHEEL TO ANIMATE PHOTOS</span>
                  <span className="hidden sm:inline text-white/40">(PAGE LOCKED UNTIL LAST PHOTO)</span>
                </div>
              )}
            </div>

            {/* Exif Tag & Plate Counter */}
            <div className="flex items-center space-x-3 text-right">
              <span className="hidden lg:inline text-[9px] text-white/40 font-mono">
                LEICA 50MM F/0.95 • 1/1000S
              </span>
              <span className="font-mono text-[#A58A62] font-semibold text-[11px]">
                {showcaseIndex + 1} / {totalCount}
              </span>
            </div>
          </div>

          {/* Continuous Multi-Segmented Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex gap-0.5">
            {filteredItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectThumbnail(idx)}
                className={`h-full flex-1 transition-all duration-300 ${
                  idx === showcaseIndex
                    ? 'bg-[#A58A62] shadow-[0_0_8px_#A58A62]'
                    : idx < showcaseIndex
                    ? 'bg-white/40'
                    : 'bg-white/10 hover:bg-white/30'
                }`}
                title={`Jump to frame ${idx + 1}`}
              />
            ))}
          </div>

          {/* Edge-to-Edge Mini Thumbnails Ribbon */}
          <div className="w-full flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
            {filteredItems.map((item, idx) => {
              const isSelected = idx === showcaseIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectThumbnail(idx)}
                  className={`relative flex-shrink-0 w-12 sm:w-16 aspect-[16/10] overflow-hidden border transition-all duration-300 ${
                    isSelected
                      ? 'border-[#A58A62] ring-2 ring-[#A58A62]/60 scale-105 opacity-100'
                      : 'border-white/15 opacity-40 hover:opacity-80'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[7px] font-mono text-center text-white py-0.2">
                    0{idx + 1}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. POST-SHOWCASE SECTION (REVEALED ONLY AFTER REACHING LAST PHOTO)         */}
      {/* ========================================================================= */}
      <section 
        id="gallery-client-suite"
        className="py-20 sm:py-28 bg-[#111111] border-t border-white/10 text-white relative z-20"
      >
        <div className="w-full max-w-[96vw] mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-16 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#A58A62] uppercase mb-2">
                <Film size={12} />
                <span>PRIVATE CLIENT ARCHIVE</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                Private Online Proofing & High-Res Portals
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-light mt-3 leading-relaxed max-w-lg">
                Are you an existing Rexmo client looking for your password-protected wedding proofing gallery, raw selection catalog, or archival print ordering suite?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="mailto:jesleyfrantin@gmail.com?subject=Private%20Client%20Gallery%20Access"
                onClick={() => soundEngine.playGoldenChime()}
                className="px-6 py-4 bg-[#A58A62] hover:bg-[#8e7552] text-white text-xs font-mono uppercase tracking-[0.2em] transition-colors text-center shadow-lg"
              >
                REQUEST PRIVATE ACCESS KEY →
              </a>
              <button
                onClick={() => {
                  soundEngine.playShutterClick();
                  if (onNavigate) onNavigate('contact');
                }}
                className="px-6 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white text-xs font-mono uppercase tracking-[0.2em] transition-colors text-center"
              >
                INQUIRE STUDIO DATES
              </button>
            </div>
          </div>

          {/* Quick Nav to other pages */}
          <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono uppercase tracking-widest text-white/60">
            <span>EXPLORE OTHER MONOGRAPHS</span>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate && onNavigate('stories')}
                className="hover:text-[#A58A62] transition-colors flex items-center space-x-1"
              >
                <span>LOVE STORIES ARCHIVE</span>
                <span>→</span>
              </button>
              <button
                onClick={() => onNavigate && onNavigate('cinematography')}
                className="hover:text-[#A58A62] transition-colors flex items-center space-x-1"
              >
                <span>CINEMATOGRAPHY SUITE</span>
                <span>→</span>
              </button>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className="hover:text-[#A58A62] transition-colors flex items-center space-x-1"
              >
                <span>COMMISSION BRIEF</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Interactive Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onNext={() => {
          soundEngine.playShutterClick();
          setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
        }}
        onPrev={() => {
          soundEngine.playShutterClick();
          setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        }}
      />
    </div>
  );
};
