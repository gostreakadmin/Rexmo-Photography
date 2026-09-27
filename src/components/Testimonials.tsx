import { useState, useEffect, type FC } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/rexmoData';

export const Testimonials: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = TESTIMONIALS_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#F7F6F2] border-t border-[#E7E4DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">09</span>
              <span>/</span>
              <span>PATRON STORIES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              WORDS FROM <br />
              <span className="italic font-normal text-[#A58A62]">OUR CLIENTS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed">
            Honest reflections from couples and families whose legacies we had the honor to capture.
          </p>
        </div>

        {/* Big Editorial Quote Slider */}
        <div className="pt-16 max-w-4xl mx-auto">
          <div className="bg-white border border-[#E7E4DE] p-8 sm:p-14 relative shadow-sm">
            
            {/* Elegant Quotation Mark */}
            <Quote size={48} className="text-[#A58A62]/30 mb-6" />

            <div className="min-h-[160px] flex items-center">
              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#171717] leading-snug tracking-wide italic">
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
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Jump to review ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 ${
                    i === currentIndex ? 'w-8 bg-[#A58A62]' : 'w-2 bg-[#E7E4DE]'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
