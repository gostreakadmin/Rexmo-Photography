import { useState, type FC } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Sparkles } from 'lucide-react';
import { FEATURED_STORIES_DATA, type FeaturedStory } from '../data/rexmoData';
import { TiltCard } from './TiltCard';
import { soundEngine } from '../utils/soundEffects';

interface FeaturedStoriesProps {
  onOpenInquiry: (storyTitle?: string) => void;
  onOpenLightbox?: (imgSrc: string) => void;
}

export const FeaturedStories: FC<FeaturedStoriesProps> = ({ onOpenInquiry, onOpenLightbox }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const story: FeaturedStory = FEATURED_STORIES_DATA[currentIndex];

  const handlePrev = () => {
    soundEngine.playShutterClick();
    setCurrentIndex((prev) => (prev === 0 ? FEATURED_STORIES_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundEngine.playShutterClick();
    setCurrentIndex((prev) => (prev === FEATURED_STORIES_DATA.length - 1 ? 0 : prev + 1));
  };

  const handleSelectStory = (idx: number) => {
    soundEngine.playShutterClick();
    setCurrentIndex(idx);
  };

  const handleInquire = () => {
    soundEngine.playGoldenChime();
    onOpenInquiry(`${story.couple} (${story.location})`);
  };

  return (
    <section id="stories" className="py-24 sm:py-32 bg-[#F7F6F2] border-t border-[#E7E4DE] relative overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute right-6 top-12 font-serif text-[120px] lg:text-[180px] text-[#E7E4DE]/30 select-none pointer-events-none leading-none -z-0">
        1992
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">05</span>
              <span>/</span>
              <span>ARCHIVAL NARRATIVES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              FEATURED <br />
              <span className="italic font-normal text-[#A58A62]">
                LOVE STORIES
              </span>
            </h2>
          </div>
          <div className="max-w-md text-sm text-[#6F6F6F] leading-relaxed font-light">
            <p>
              In-depth visual essays documenting real celebrations across coastal palaces, heritage backwaters, and international skylines. Every union is approached as a timeless cinematic monograph.
            </p>
          </div>
        </div>

        {/* Stories Horizontal Index Bar */}
        <div className="flex items-center overflow-x-auto no-scrollbar py-6 border-b border-[#E7E4DE] gap-4 sm:gap-6">
          {FEATURED_STORIES_DATA.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectStory(idx)}
                className={`flex-shrink-0 flex items-center space-x-3 py-2 px-3 transition-all duration-300 border text-left ${
                  isActive
                    ? 'bg-white border-[#A58A62] shadow-sm'
                    : 'bg-transparent border-transparent hover:border-[#E7E4DE] hover:bg-white/50 text-[#6F6F6F]'
                }`}
              >
                <span className={`text-[10px] font-mono tracking-widest ${isActive ? 'text-[#A58A62] font-bold' : 'text-[#6F6F6F]'}`}>
                  0{idx + 1}
                </span>
                <span className={`text-xs font-serif ${isActive ? 'text-[#171717] font-medium' : 'text-[#6F6F6F]'}`}>
                  {item.couple}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Story Spotlight: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-12 items-center">
          
          {/* Left Column: Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <TiltCard maxTilt={3} scale={1.01} glare={true}>
              <div 
                className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#E7E4DE] shadow-md bg-stone-100 group cursor-pointer"
                onClick={() => onOpenLightbox?.(story.coverImage)}
              >
                <img
                  key={story.id}
                  src={story.coverImage}
                  alt={`Rexmo Story: ${story.couple}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 animate-fade-in"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-75" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-mono tracking-widest text-[#171717] uppercase">
                  <Sparkles size={12} className="text-[#A58A62]" />
                  <span>CHAPTER 0{currentIndex + 1} • {story.category}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#A58A62] block">
                      ARCHIVAL MASTERPIECE
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                      {story.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 hidden sm:inline-block">
                    CLICK TO EXPAND ↗
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* Curated Sub-Frames Carousel Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {story.galleryImages.map((imgSrc, imgIdx) => (
                <div
                  key={imgIdx}
                  onClick={() => onOpenLightbox?.(imgSrc)}
                  className="aspect-[4/3] overflow-hidden border border-[#E7E4DE] relative bg-stone-100 group cursor-pointer"
                >
                  <img
                    src={imgSrc}
                    alt={`${story.couple} sub-frame ${imgIdx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[9px] text-white font-mono uppercase tracking-widest">
                    FRAME 0{imgIdx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Quotes (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Index & Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest text-[#A58A62] uppercase">
                STORY {currentIndex + 1} OF {FEATURED_STORIES_DATA.length}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#6F6F6F] uppercase border border-[#E7E4DE] px-2.5 py-1 bg-white">
                {story.category}
              </span>
            </div>

            {/* Couple Title */}
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-light tracking-tight mb-2">
                {story.couple}
              </h3>
              <p className="font-serif text-lg italic text-[#A58A62]">
                "{story.title}"
              </p>
            </div>

            {/* Location & Season Meta */}
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#6F6F6F] border-y border-[#E7E4DE] py-3">
              <div className="flex items-center space-x-1.5">
                <MapPin size={13} className="text-[#A58A62]" />
                <span>{story.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Calendar size={13} className="text-[#A58A62]" />
                <span>{story.date}</span>
              </div>
            </div>

            {/* Client Pull-Quote */}
            <blockquote className="bg-white p-6 border-l-2 border-[#A58A62] shadow-sm relative">
              <span className="font-serif text-4xl text-[#A58A62]/40 absolute top-2 left-3 leading-none select-none">
                “
              </span>
              <p className="font-serif text-base text-[#171717] italic leading-relaxed pt-2 pl-4">
                {story.quote}
              </p>
              <div className="text-[10px] font-mono tracking-widest uppercase text-[#6F6F6F] text-right mt-3">
                — {story.couple}
              </div>
            </blockquote>

            {/* Synopsis */}
            <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed font-light">
              {story.synopsis}
            </p>

            {/* Navigation & CTA Controls */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleInquire}
                className="w-full sm:flex-1 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors shadow-sm shimmer-hover relative overflow-hidden"
              >
                PLAN A CELEBRATION LIKE THIS →
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Chapter"
                  className="w-11 h-11 border border-[#E7E4DE] bg-white text-[#171717] hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-all flex items-center justify-center"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Chapter"
                  className="w-11 h-11 border border-[#E7E4DE] bg-white text-[#171717] hover:border-[#171717] hover:bg-[#171717] hover:text-white transition-all flex items-center justify-center"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
