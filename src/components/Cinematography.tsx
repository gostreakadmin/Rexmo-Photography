import { useState, type FC } from 'react';
import { Play, Film, Volume2, X, Clapperboard } from 'lucide-react';

interface CinematographyProps {
  onOpenInquiry: (category?: string) => void;
}

export const Cinematography: FC<CinematographyProps> = ({ onOpenInquiry }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="cinematography" className="py-24 sm:py-32 bg-[#FFFFFF] border-t border-[#E7E4DE] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">06</span>
              <span>/</span>
              <span>MOTION PICTURES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              CINEMATIC <br />
              <span className="italic font-normal text-[#A58A62]">MOTION</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed">
            Immersive wedding films captured in 4K resolution, married with vintage Super 8 grain, 
            rich ambient audio, and intentional poetic rhythm.
          </p>
        </div>

        {/* Hero Cinema Preview Card */}
        <div className="pt-16">
          <div 
            data-cursor="play"
            onClick={() => setIsVideoModalOpen(true)}
            className="relative group overflow-hidden bg-[#171717] border border-[#E7E4DE] shadow-2xl cursor-pointer"
          >
            
            {/* Background Feature Image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
              <img
                src="/images/gallery-feature-1.jpg"
                alt="Rexmo Cinematic Wedding Films"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            </div>

            {/* Play Button Trigger in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoModalOpen(true);
                }}
                aria-label="Play Rexmo Cinema Showreel"
                className="group/btn relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#A58A62] hover:border-[#A58A62] transition-all duration-300 transform group-hover:scale-110 shadow-2xl mb-4"
              >
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                <Play size={32} className="ml-1 fill-white" />
              </button>

              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#A58A62] mb-1">
                4K UHD & SUPER 8 EMULSION
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-light tracking-wide max-w-xl">
                "The Symphony of Stolen Glances"
              </h3>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/70 mt-2">
                DIRECTED BY JESLEY FRANTIN • 2026 REEL
              </p>
            </div>

            {/* Micro Details Bar inside Frame */}
            <div className="hidden sm:flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur-sm border-t border-white/10 text-white/70 text-xs font-mono">
              <div className="flex items-center space-x-6">
                {/* Animated Equalizer Wave */}
                <div className="flex items-end space-x-1 h-3.5" title="Live Ambient Audio Track">
                  <span className="w-0.5 bg-[#A58A62] animate-[float-slow_0.8s_ease-in-out_infinite] h-2" />
                  <span className="w-0.5 bg-[#A58A62] animate-[float-slow_1.2s_ease-in-out_infinite_0.2s] h-3.5" />
                  <span className="w-0.5 bg-[#A58A62] animate-[float-slow_0.9s_ease-in-out_infinite_0.4s] h-1.5" />
                  <span className="w-0.5 bg-[#A58A62] animate-[float-slow_1.1s_ease-in-out_infinite_0.1s] h-3" />
                  <span className="w-0.5 bg-[#A58A62] animate-[float-slow_0.7s_ease-in-out_infinite_0.3s] h-2" />
                </div>
                <span>SOUNDSCAPE: BESPOKE SCORE & AMBIENT AUDIO</span>
                <span>•</span>
                <span>ASPECT RATIO: 2.39:1 ANAMORPHIC</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoModalOpen(true);
                }}
                className="text-[#A58A62] hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>WATCH FULL SHOWREEL</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cinematography Highlights 3-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] space-y-2">
            <div className="flex items-center space-x-2 text-[#A58A62] mb-1">
              <Film size={18} />
              <span className="font-mono text-xs uppercase tracking-wider">01 / Super 8 Textures</span>
            </div>
            <h4 className="font-serif text-lg text-[#171717] font-medium">Analog Warmth</h4>
            <p className="text-xs text-[#6F6F6F] leading-relaxed">
              We blend crisp high-definition digital cinema with real analog grain and color profiles for unmatched nostalgic emotion.
            </p>
          </div>

          <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] space-y-2">
            <div className="flex items-center space-x-2 text-[#A58A62] mb-1">
              <Volume2 size={18} />
              <span className="font-mono text-xs uppercase tracking-wider">02 / Immersive Audio</span>
            </div>
            <h4 className="font-serif text-lg text-[#171717] font-medium">Bespoke Sound Design</h4>
            <p className="text-xs text-[#6F6F6F] leading-relaxed">
              Vows whispered in trembling voices, temple nadaswaram echoes, and quiet laughter recorded with broadcast audio fidelity.
            </p>
          </div>

          <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] space-y-2">
            <div className="flex items-center space-x-2 text-[#A58A62] mb-1">
              <Clapperboard size={18} />
              <span className="font-mono text-xs uppercase tracking-wider">03 / Pacing</span>
            </div>
            <h4 className="font-serif text-lg text-[#171717] font-medium">Editorial Narrative</h4>
            <p className="text-xs text-[#6F6F6F] leading-relaxed">
              Crafted not as a generic music video, but as a short-film documentary celebrating your unique family heritage.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-12 text-center">
          <button
            onClick={() => onOpenInquiry('Cinematography')}
            className="group inline-flex items-center space-x-3 bg-[#171717] text-white px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors"
          >
            <span>COMMISSION A WEDDING FILM</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

      </div>

      {/* Video Modal Player */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          <div className="relative w-full max-w-5xl bg-black border border-white/20 aspect-[16/9] shadow-2xl overflow-hidden">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 text-white/80 hover:text-white font-mono text-xs uppercase tracking-widest bg-black/50 px-3 py-1.5 border border-white/20 flex items-center space-x-1"
            >
              <span>CLOSE</span>
              <X size={16} />
            </button>

            {/* Video Player Display: Cinematic Presentation */}
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-[#1a1917] to-black">
              <div className="w-16 h-16 rounded-full border border-[#A58A62] flex items-center justify-center text-[#A58A62] mb-4">
                <Play size={28} className="ml-1" />
              </div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#A58A62] mb-2">
                REXMO CINEMA REEL
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-light mb-4">
                "Echoes of South India & Beyond"
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-lg mb-6 leading-relaxed">
                4K digital cinema master preview. For private full-length 20-30 minute wedding film showcases, please connect directly with our creative director.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.youtube.com/@rexmophotography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#A58A62] text-white text-xs uppercase tracking-widest hover:bg-[#8e7552] transition-colors"
                >
                  VIEW ON YOUTUBE CHANNEL →
                </a>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onOpenInquiry('Wedding Cinema');
                  }}
                  className="px-6 py-2.5 border border-white/30 text-white text-xs uppercase tracking-widest hover:border-white transition-colors"
                >
                  INQUIRE FOR CINEMATOGRAPHY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
