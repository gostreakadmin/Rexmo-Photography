import React from 'react';
import { Film, Sparkles, Sliders, Eye } from 'lucide-react';
import { ColorGradeComparison } from './ColorGradeComparison';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

export const Philosophy: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Film,
      title: "Digital Precision & Analog Soul",
      description: "Harnessing ultra-sharp 4K optical sensors paired with handcrafted color profiles inspired by vintage Kodak Portra, Fuji 400H, and rich Kodachrome emulsions."
    },
    {
      icon: Eye,
      title: "Editorial Composition",
      description: "Composing every frame with painterly awareness of leading lines, atmospheric negative space, sculptural shadows, and architectural balance."
    },
    {
      icon: Sparkles,
      title: "Natural, Unforced Emotion",
      description: "Never stiff. We direct with gentle whispers and unobtrusive distance, capturing the involuntary smiles, quiet hand squeezes, and joyful tears."
    },
    {
      icon: Sliders,
      title: "Timeless Storytelling",
      description: "Immune to short-lived social media editing trends. Our color grading honors skin tones, authentic floral pigments, and golden twilight."
    }
  ];

  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-[#F7F6F2] relative overflow-hidden">
      <div className="w-full max-w-[96vw] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">03</span>
              <span>/</span>
              <span>{t('philosophy.tag', 'THE PHILOSOPHY')}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              {t('philosophy.title1', 'CINEMATIC')} <br />
              <span className="italic font-normal text-[#A58A62]">
                {t('philosophy.title2', 'NOSTALGIA')}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed font-light">
            {t('philosophy.desc', 'Where old-world craftsmanship converges with state-of-the-art optical engineering to produce visual poetry for generations.')}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-16">
          
          {/* Left Large Image with 3D Tilt Card (7 cols) */}
          <div className="lg:col-span-7">
            <TiltCard maxTilt={5} scale={1.01} glare={true}>
              <div 
                data-cursor="explore"
                className="relative group overflow-hidden border border-[#E7E4DE] bg-[#EAE7DF] shadow-[0_20px_50px_rgba(0,0,0,0.05)] cursor-pointer"
                onClick={() => soundEngine.playShutterClick()}
              >
                <img
                  src="images/cinematic-nostalgia.jpg"
                  alt="Vintage camera optics and Rexmo analog aesthetic"
                  loading="lazy"
                  className="w-full h-[450px] sm:h-[550px] object-cover object-center group-hover:scale-105 group-hover:rotate-[0.5deg] transition-all duration-1000 ease-out"
                />
                
                {/* Overlay Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#A58A62]">
                      OPTICAL HERITAGE
                    </span>
                    <p className="font-serif text-xl sm:text-2xl font-light mt-1">
                      The Art of The Decisive Moment
                    </p>
                  </div>
                  <div className="hidden sm:block font-mono text-[10px] tracking-widest text-white/70">
                    SINCE 1992 • REXMO ARCHIVES
                  </div>
                </div>

                {/* Top Film Frame Stamp */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-[#171717]">
                  EMULSION GRAIN & LUXURY LIGHT
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right 4 Pillars (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  onMouseEnter={() => soundEngine.playShutterClick()}
                  className="group p-6 bg-white border border-[#E7E4DE] hover:border-[#A58A62] hover:shadow-md transition-all duration-300 relative shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs text-[#A58A62]">0{idx + 1}</span>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#171717] group-hover:text-[#A58A62] transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                    <Icon size={18} className="text-[#6F6F6F] group-hover:text-[#A58A62] transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed pl-7 font-light">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Interactive Editorial Color Grading Comparison Slider */}
        <ColorGradeComparison />

      </div>
    </section>
  );
};
