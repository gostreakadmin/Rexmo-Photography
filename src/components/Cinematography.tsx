import { useState, useRef, type FC } from 'react';
import { Play, Film, Volume2, X, Clapperboard, Sparkles, MonitorPlay, Maximize2 } from 'lucide-react';
import { CINEMA_FILMS_DATA, type CinemaFilmItem } from '../data/rexmoData';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

interface CinematographyProps {
  onOpenInquiry: (category?: string) => void;
}

interface FilmstripCardProps {
  film: CinemaFilmItem;
  index: number;
  isSelected: boolean;
  onSelect: (film: CinemaFilmItem) => void;
  onWatch: (film: CinemaFilmItem) => void;
}

const FilmstripCard: FC<FilmstripCardProps> = ({ film, index, isSelected, onSelect, onWatch }) => {
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playShutterClick();
    onSelect(film);
    if (cardVideoRef.current) {
      cardVideoRef.current.currentTime = 0;
      cardVideoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardVideoRef.current) {
      cardVideoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onWatch(film)}
      className={`group/card border p-3 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-[#F7F6F2] border-[#A58A62] shadow-md ring-1 ring-[#A58A62]/40'
          : 'bg-white border-[#E7E4DE] hover:border-[#A58A62]/50 hover:bg-[#F7F6F2]/30'
      }`}
    >
      {/* Video Container with Hover Playback */}
      <div className="relative aspect-[16/9] overflow-hidden bg-black mb-3">
        <video
          ref={cardVideoRef}
          src={film.localVideo || '/videos/ambient-teaser.mp4'}
          poster={film.coverImage}
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-80 scale-100'
          }`}
        />
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${isHovered ? 'opacity-0' : 'opacity-40'}`} />

        {/* Live Hover Badge */}
        {isHovered && (
          <div className="absolute top-2 right-2 bg-black/85 backdrop-blur-sm px-2 py-0.5 text-[8px] font-mono tracking-widest text-[#A58A62] uppercase flex items-center space-x-1.5 z-10 border border-[#A58A62]/40 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
            <span>PLAYING ON HOVER</span>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono text-white tracking-widest z-10">
          {film.duration}
        </div>

        {/* Chapter Badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-[#171717] tracking-widest uppercase z-10">
          REEL 0{index + 1}
        </div>

        {/* Play Icon (visible when not hovered) */}
        {!isHovered && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center shadow-lg group-hover/card:bg-[#A58A62] group-hover/card:border-[#A58A62] transition-colors">
              <Play size={13} className="ml-0.5 fill-white" />
            </div>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div>
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#A58A62] block mb-1">
          {film.couple}
        </span>
        <h4 className="font-serif text-base text-[#171717] font-light leading-snug line-clamp-1 mb-1">
          {film.title}
        </h4>
        <p className="text-[11px] text-[#6F6F6F] font-mono">
          {film.location}
        </p>
      </div>

      {/* Trigger Action */}
      <div className="pt-3 mt-3 border-t border-[#E7E4DE] flex items-center justify-between text-[10px] font-mono">
        <span className="text-[#6F6F6F]">{film.aspectRatio}</span>
        <span className="text-[#A58A62] group-hover/card:text-[#171717] font-semibold tracking-wider transition-colors">
          {isHovered ? 'CLICK FOR FULL 4K ↗' : 'KEEP CURSOR TO PLAY →'}
        </span>
      </div>
    </div>
  );
};

export const Cinematography: FC<CinematographyProps> = ({ onOpenInquiry }) => {
  const [activeFilm, setActiveFilm] = useState<CinemaFilmItem>(CINEMA_FILMS_DATA[0]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isScreenHovered, setIsScreenHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  const handleMouseEnterScreen = () => {
    setIsScreenHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeaveScreen = () => {
    setIsScreenHovered(false);
    if (videoRef.current && !isPlayingInline) {
      videoRef.current.pause();
    }
  };

  const handlePlayActiveFilm = (film?: CinemaFilmItem) => {
    soundEngine.playShutterClick();
    if (film) {
      setActiveFilm(film);
    }
    setIsVideoModalOpen(true);
  };

  const handleSelectFilm = (film: CinemaFilmItem) => {
    setActiveFilm(film);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isScreenHovered || isPlayingInline) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleToggleInlinePlay = () => {
    soundEngine.playShutterClick();
    if (videoRef.current) {
      if (isPlayingInline) {
        videoRef.current.pause();
        setIsPlayingInline(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlayingInline(true);
        }).catch(() => {
          setIsVideoModalOpen(true);
        });
      }
    } else {
      setIsVideoModalOpen(true);
    }
  };

  const handleInquireCinema = () => {
    soundEngine.playGoldenChime();
    onOpenInquiry(`Cinematography: ${activeFilm.title}`);
  };

  return (
    <section id="cinematography" className="py-24 sm:py-32 bg-[#FFFFFF] border-t border-[#E7E4DE] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">06</span>
              <span>/</span>
              <span>{t('cinema.tag', 'MOTION PICTURES')}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              {t('cinema.title1', 'CINEMATIC')} <br />
              <span className="italic font-normal text-[#A58A62]">
                {t('cinema.title2', 'MOTION')}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed font-light">
            {t('cinema.desc', 'Immersive wedding films captured in 4K resolution, married with vintage Super 8 grain, rich ambient audio, and intentional poetic rhythm.')}
          </p>
        </div>

        {/* Hero Cinema Theatre Screen: Autoplays when cursor is placed over it! */}
        <div className="pt-16">
          <TiltCard maxTilt={3} scale={1.01} glare={true}>
            <div 
              data-cursor="play"
              onMouseEnter={handleMouseEnterScreen}
              onMouseLeave={handleMouseLeaveScreen}
              className="relative group overflow-hidden bg-[#171717] border border-[#E7E4DE] shadow-2xl cursor-pointer"
            >
              {/* Screen Area: 21/9 Cinematic Anamorphic Ratio */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black">
                
                {/* Background Ambient Video Loop */}
                <video
                  key={activeFilm.id}
                  ref={videoRef}
                  src={activeFilm.localVideo}
                  poster={activeFilm.coverImage}
                  autoPlay={isScreenHovered || isPlayingInline}
                  loop
                  muted
                  playsInline
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${
                    isScreenHovered || isPlayingInline ? 'opacity-95 scale-102' : 'opacity-80 scale-100'
                  }`}
                />

                {/* Dark Cinematic Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

                {/* Letterbox Bars Emulation */}
                <div className="absolute top-0 left-0 right-0 h-3 sm:h-5 bg-black/90 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-5 bg-black/90 pointer-events-none" />

                {/* Top Corner HUD Badges */}
                <div className="absolute top-6 left-6 flex items-center space-x-3 pointer-events-none">
                  <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/20 text-[10px] font-mono tracking-widest text-[#A58A62] uppercase">
                    <span className={`w-2 h-2 rounded-full ${isScreenHovered || isPlayingInline ? 'bg-red-500 animate-ping' : 'bg-white/60'} inline-block`} />
                    <span>{isScreenHovered || isPlayingInline ? 'LIVE PLAYING (CURSOR HOVER)' : 'REC 4K PRORES'}</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/20 text-[10px] font-mono tracking-widest text-white/80 uppercase hidden sm:block">
                    {activeFilm.aspectRatio}
                  </div>
                </div>

                <div className="absolute top-6 right-6 hidden sm:flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/20 text-[10px] font-mono tracking-widest text-white/80 uppercase pointer-events-none">
                  <Sparkles size={12} className="text-[#A58A62]" />
                  <span>SUPER 8 EMULSION</span>
                </div>

                {/* Play Button Trigger in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <button
                    onClick={() => handlePlayActiveFilm()}
                    aria-label={`Play film: ${activeFilm.title}`}
                    className={`group/btn relative rounded-full border border-white/40 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#A58A62] hover:border-[#A58A62] transition-all duration-300 transform shadow-2xl mb-4 ${
                      isScreenHovered || isPlayingInline ? 'w-16 h-16 sm:w-18 sm:h-18 scale-90' : 'w-20 h-20 sm:w-24 sm:h-24 group-hover:scale-110'
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                    <Play size={isScreenHovered || isPlayingInline ? 24 : 32} className="ml-1 fill-white" />
                  </button>

                  <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#A58A62] mb-1">
                    {isScreenHovered ? 'HOVER PLAYING • ' : ''}{activeFilm.tag} • DURATION {activeFilm.duration}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl text-white font-light tracking-wide max-w-2xl drop-shadow-md">
                    "{activeFilm.title}"
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/80 mt-2">
                    FEATURING {activeFilm.couple} • {activeFilm.location}
                  </p>
                </div>

                {/* Micro Bottom HUD Details Bar */}
                <div className="hidden sm:flex absolute bottom-5 left-8 right-8 justify-between items-center z-10 text-white/70 text-xs font-mono">
                  <div className="flex items-center space-x-6">
                    {/* Animated Equalizer Wave */}
                    <div className="flex items-end space-x-1 h-3.5" title="Live Ambient Audio Track">
                      <span className={`w-0.5 bg-[#A58A62] h-2 ${isScreenHovered || isPlayingInline ? 'animate-[float-slow_0.8s_ease-in-out_infinite]' : ''}`} />
                      <span className={`w-0.5 bg-[#A58A62] h-3.5 ${isScreenHovered || isPlayingInline ? 'animate-[float-slow_1.2s_ease-in-out_infinite_0.2s]' : ''}`} />
                      <span className={`w-0.5 bg-[#A58A62] h-1.5 ${isScreenHovered || isPlayingInline ? 'animate-[float-slow_0.9s_ease-in-out_infinite_0.4s]' : ''}`} />
                      <span className={`w-0.5 bg-[#A58A62] h-3 ${isScreenHovered || isPlayingInline ? 'animate-[float-slow_1.1s_ease-in-out_infinite_0.1s]' : ''}`} />
                      <span className={`w-0.5 bg-[#A58A62] h-2 ${isScreenHovered || isPlayingInline ? 'animate-[float-slow_0.7s_ease-in-out_infinite_0.3s]' : ''}`} />
                    </div>
                    <span>SOUNDSCAPE: ORIGINAL MASTER SCORE</span>
                    <span>•</span>
                    <span>TIMECODE 00:03:42:18</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleInlinePlay();
                      }}
                      className="px-3 py-1 bg-black/60 border border-white/20 text-white/90 hover:text-white hover:border-[#A58A62] transition-colors flex items-center space-x-1.5 text-[10px]"
                    >
                      <MonitorPlay size={12} />
                      <span>{isPlayingInline ? 'PAUSE LOOP' : 'LOCK CONTINUOUS LOOP'}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayActiveFilm();
                      }}
                      className="text-[#A58A62] hover:text-white transition-colors flex items-center space-x-1.5"
                    >
                      <span>EXPAND THEATRE</span>
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Cinematography Filmstrip Reel: 4 Interactive Chapters with HOVER-TO-PLAY */}
        <div className="mt-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E4DE] text-[11px] font-mono tracking-widest uppercase text-[#6F6F6F]">
            <span>HOVER ANY REEL TO PREVIEW MOTION</span>
            <span>{CINEMA_FILMS_DATA.length} ARCHIVAL REELS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {CINEMA_FILMS_DATA.map((film, index) => (
              <FilmstripCard
                key={film.id}
                film={film}
                index={index}
                isSelected={film.id === activeFilm.id}
                onSelect={handleSelectFilm}
                onWatch={handlePlayActiveFilm}
              />
            ))}
          </div>
        </div>

        {/* Cinematography Highlights 3-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] space-y-2">
            <div className="flex items-center space-x-2 text-[#A58A62] mb-1">
              <Film size={18} />
              <span className="font-mono text-xs uppercase tracking-wider">01 / Super 8 Textures</span>
            </div>
            <h4 className="font-serif text-lg text-[#171717] font-medium">Analog Warmth</h4>
            <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
              We blend crisp high-definition digital cinema with real analog grain and color profiles for unmatched nostalgic emotion.
            </p>
          </div>

          <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] space-y-2">
            <div className="flex items-center space-x-2 text-[#A58A62] mb-1">
              <Volume2 size={18} />
              <span className="font-mono text-xs uppercase tracking-wider">02 / Immersive Audio</span>
            </div>
            <h4 className="font-serif text-lg text-[#171717] font-medium">Bespoke Sound Design</h4>
            <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
              Vows whispered in trembling voices, temple nadaswaram echoes, and quiet laughter recorded with broadcast audio fidelity.
            </p>
          </div>

          <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] space-y-2">
            <div className="flex items-center space-x-2 text-[#A58A62] mb-1">
              <Clapperboard size={18} />
              <span className="font-mono text-xs uppercase tracking-wider">03 / Pacing</span>
            </div>
            <h4 className="font-serif text-lg text-[#171717] font-medium">Editorial Narrative</h4>
            <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
              Crafted not as a generic music video, but as a short-film documentary celebrating your unique family heritage.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-12 text-center">
          <button
            onClick={handleInquireCinema}
            className="group inline-flex items-center space-x-3 bg-[#171717] text-white px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors shadow-sm shimmer-hover relative overflow-hidden"
          >
            <span>{t('cinema.cta', 'COMMISSION A WEDDING FILM')}</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform">→</span>
          </button>
        </div>

      </div>

      {/* Fullscreen Video Modal Theatre Player */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-8 animate-fade-in">
          <div className="relative w-full max-w-5xl bg-black border border-white/20 shadow-2xl flex flex-col overflow-hidden max-h-[95vh]">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#171717] border-b border-white/10 text-white">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#A58A62] uppercase block">
                  REXMO CINEMA SUITE • 4K UHD
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-light">
                  {activeFilm.title} — {activeFilm.couple}
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-white/80 hover:text-white font-mono text-xs uppercase tracking-widest bg-white/10 px-3 py-1.5 border border-white/20 flex items-center space-x-1 transition-colors"
              >
                <span>CLOSE</span>
                <X size={16} />
              </button>
            </div>

            {/* Main Video Viewport: 16/9 Responsive Frame */}
            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex-shrink-0">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeFilm.youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                title={activeFilm.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Bottom Chapter Switcher Strip */}
            <div className="px-6 py-4 bg-[#111111] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase mr-2 flex-shrink-0">
                  SWITCH REEL:
                </span>
                {CINEMA_FILMS_DATA.map((film, fIdx) => (
                  <button
                    key={film.id}
                    onClick={() => {
                      soundEngine.playShutterClick();
                      setActiveFilm(film);
                    }}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider flex-shrink-0 border transition-colors ${
                      activeFilm.id === film.id
                        ? 'bg-[#A58A62] text-white border-[#A58A62]'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    0{fIdx + 1} {film.couple}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <a
                  href={`https://www.youtube.com/watch?v=${activeFilm.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                >
                  OPEN ON YOUTUBE ↗
                </a>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    handleInquireCinema();
                  }}
                  className="px-4 py-2 bg-[#A58A62] text-white text-[10px] font-mono uppercase tracking-widest hover:bg-[#8e7552] transition-colors"
                >
                  COMMISSION FILM →
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
