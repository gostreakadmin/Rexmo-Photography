import { useState, useEffect, type FC } from 'react';
import { soundEngine } from '../utils/soundEffects';

interface SectionItem {
  id: string;
  num: string;
  name: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'home', num: '01', name: 'HERO' },
  { id: 'intro', num: '02', name: 'PHILOSOPHY' },
  { id: 'philosophy', num: '03', name: 'CINEMATIC' },
  { id: 'services', num: '04', name: 'COLLECTIONS' },
  { id: 'gallery', num: '05', name: 'ARCHIVE' },
  { id: 'stories', num: '06', name: 'STORIES' },
  { id: 'cinematography', num: '07', name: 'CINEMA' },
  { id: 'about', num: '08', name: 'HERITAGE' },
  { id: 'destinations', num: '09', name: 'TRAVEL' },
  { id: 'testimonials', num: '10', name: 'PRAISES' },
  { id: 'contact', num: '11', name: 'INQUIRY' }
];

export const SectionTracker: FC<{ activeSection: string; onSelectSection: (id: string) => void }> = ({
  activeSection,
  onSelectSection
}) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show tracker once scrolled down past top banner (e.g. 150px)
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    soundEngine.playShutterClick();
    onSelectSection(id);
  };

  return (
    <aside
      aria-label="Section quick navigator"
      className={`fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end space-y-2 pointer-events-auto transition-all duration-500 select-none ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none'
      }`}
    >
      <div className="bg-[#171717]/80 backdrop-blur-md border border-[#E7E4DE]/20 p-2.5 rounded-full flex flex-col items-center space-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredSection === sec.id;

          return (
            <div
              key={sec.id}
              className="relative flex items-center justify-end"
              onMouseEnter={() => setHoveredSection(sec.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Tooltip on hover */}
              <div
                className={`absolute right-7 px-2.5 py-1 bg-[#171717] text-white text-[9px] font-mono tracking-widest uppercase rounded shadow-lg border border-[#A58A62]/40 whitespace-nowrap pointer-events-none transition-all duration-200 ${
                  isHovered ? 'opacity-100 -translate-x-1' : 'opacity-0 translate-x-2'
                }`}
              >
                <span className="text-[#A58A62] mr-1.5">{sec.num}</span>
                <span>{sec.name}</span>
              </div>

              {/* Dot / Pill Button */}
              <button
                onClick={() => handleClick(sec.id)}
                aria-label={`Jump to section ${sec.name}`}
                className={`relative flex items-center justify-center transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? 'w-2.5 h-6 bg-[#A58A62] shadow-[0_0_10px_rgba(165,138,98,0.7)]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/70 hover:scale-125'
                }`}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default SectionTracker;
