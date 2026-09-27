import { useState, useEffect, type FC } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/rexmoData';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

export const Testimonials: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();
  const current = TESTIMONIALS_DATA[currentIndex];

  const handleNext = () => {
    soundEngine.playShutterClick();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    soundEngine.playShutterClick();
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#F7F6F2] border-t border-[#E7E4DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">09</span>
              <span>/</span>
              <span>{t('testimonials.tag', 'PATRON STORIES')}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              {t('testimonials.title1', 'WORDS FROM')} <br />
              <span className="italic font-normal text-[#A58A62]">
                {t('testimonials.title2', 'OUR CLIENTS')}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed font-light">
            Honest reflections from couples and families whose legacies we had the honor to capture.
          </p>
        </div>

        {/* Big Editorial Quote Slider with 3D Tilt */}
        <div 
          className="pt-16 max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <TiltCard maxTilt={3} scale={1.01} glare={true}>
            <div className="bg-white border border-[#E7E4DE] p-8 sm:p-14 relative shadow-sm overflow-hidden">
              
              {/* Subtle Auto-Rotation Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E7E4DE]">
                <div
                  key={currentIndex}
                  className={`h-full bg-[#A58A62] ${!isPaused ? 'animate-[marquee_7s_linear_1]' : 'w-full'}`}
                  style={{ animationDuration: '7s' }}
                />
              </div>

              {/* Elegant Quotation Mark */}
              <Quote size={48} className="text-[#A58A62]/30 mb-6" />

              <div className="min-h-[160px] flex items-center">
                <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#171717] leading-snug tracking-wide italic transition-opacity duration-300">
                  "{current.quote}"
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#E7E4DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#171717] font-medium">
                    {current.author}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#6F6F6F] uppercase tracking-widest mt-1">
                    <span className="text-[#A58A62] font-semibold">{current.category}</span>
                    {current.location && (
                      <>
                        <span>•</span>
                        <span>{current.location}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center space-x-3 self-end sm:self-auto">
                  <span className="font-mono text-xs text-[#6F6F6F] mr-2">
                    0{currentIndex + 1} / 0{TESTIMONIALS_DATA.length}
                  </span>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 border border-[#E7E4DE] rounded-full flex items-center justify-center text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-10 h-10 border border-[#E7E4DE] rounded-full flex items-center justify-center text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Dots */}
              <div className="flex space-x-2 mt-6 justify-center">
                {TESTIMONIALS_DATA.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundEngine.playShutterClick();
                      setCurrentIndex(i);
                    }}
                    aria-label={`Jump to quote ${i + 1}`}
                    className={`h-1.5 transition-all duration-300 ${
                      i === currentIndex ? 'w-8 bg-[#A58A62]' : 'w-2 bg-[#E7E4DE] hover:bg-[#A58A62]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </TiltCard>
        </div>

      </div>
    </section>
  );
};
