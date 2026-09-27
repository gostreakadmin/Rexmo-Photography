import type { FC } from 'react';

interface IntroProps {
  onDiscoverStudio: () => void;
}

export const Intro: FC<IntroProps> = ({ onDiscoverStudio }) => {
  return (
    <section id="intro" className="py-24 sm:py-32 bg-[#FFFFFF] border-y border-[#E7E4DE] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Index Marker */}
        <div className="flex items-center justify-between pb-12 border-b border-[#E7E4DE] text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase">
          <div className="flex items-center space-x-3">
            <span className="text-[#A58A62] font-bold">02</span>
            <span>/</span>
            <span>STUDIO PHILOSOPHY</span>
          </div>
          <span>INTENTIONAL VISUAL ARTISTRY</span>
        </div>

        {/* Main Content Grid: Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12 lg:pt-16">
          
          {/* Asymmetric Image Frame (5 cols) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Offset frame background */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#A58A62]/40 -z-10" />

              <div className="overflow-hidden bg-[#F7F6F2] border border-[#E7E4DE] aspect-[4/5] shadow-[0_15px_40px_rgba(0,0,0,0.04)] group">
                <img
                  src="/images/intro-studio.jpg"
                  alt="Rexmo Photography Studio Aesthetic and Intentional Composition"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Editorial Stamp */}
              <div className="absolute -bottom-6 -right-6 bg-[#F7F6F2] border border-[#E7E4DE] p-4 max-w-[200px] shadow-sm hidden sm:block">
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#A58A62]">
                  ARCHIVAL DISCIPLINE
                </p>
                <p className="font-serif text-sm text-[#171717] mt-1 leading-snug">
                  "Every frame balances authentic emotion."
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Text Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 order-1 lg:order-2">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#A58A62] block mb-3">
                EDITORIAL INTEGRITY
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] leading-[1.1] tracking-tight">
                DEFINING <br />
                <span className="italic font-normal text-[#171717]">THE NARRATIVE</span>
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-[#171717] font-serif leading-relaxed font-light">
              "We tell your story with intention and artistry. Every frame balances authentic emotion with thoughtful composition, resulting in imagery that feels both natural and elevated."
            </p>

            <div className="space-y-4 text-sm text-[#6F6F6F] leading-relaxed">
              <p>
                Founded in 1992 by Francis Jeya Balan and carried forward by Creative Director Jesley Frantin, Rexmo Photography approaches each celebration as a bespoke literary heirloom. We do not chase fleeting internet aesthetics; we sculpt photographs that remain breathtaking twenty, thirty, and fifty years into the future.
              </p>
              <p>
                Whether photographing a royal palace wedding in Rajasthan, an ancient temple ceremony in Madurai, a coastal exchange in Kovalam, or a private gathering in London, our eye remains quietly observant, respectful, and artistically exacting.
              </p>
            </div>

            {/* Three Pillar Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E7E4DE]">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#A58A62] block">01 / ARTISTRY</span>
                <p className="text-sm font-serif text-[#171717] font-medium">Deliberate Framing</p>
                <p className="text-xs text-[#6F6F6F]">Light, shadow, and geometry curated like a fashion editorial.</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#A58A62] block">02 / AUTHENTICITY</span>
                <p className="text-sm font-serif text-[#171717] font-medium">Unobtrusive Eye</p>
                <p className="text-xs text-[#6F6F6F]">Allowing tears, glances, and laughter to occur unforced.</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#A58A62] block">03 / ARCHIVAL</span>
                <p className="text-sm font-serif text-[#171717] font-medium">Museum Longevity</p>
                <p className="text-xs text-[#6F6F6F]">Handcrafted Italian and Japanese heirloom fine-art papers.</p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={onDiscoverStudio}
                className="group inline-flex items-center space-x-3 text-xs tracking-[0.25em] uppercase font-semibold text-[#171717] hover:text-[#A58A62] transition-colors"
              >
                <span>DISCOVER THE STUDIO</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
