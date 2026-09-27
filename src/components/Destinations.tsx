import { useState, type FC } from 'react';
import { Compass } from 'lucide-react';
import { DESTINATIONS_DATA, type DestinationItem, SERVICE_LOCATIONS_LIST } from '../data/rexmoData';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

interface DestinationsProps {
  onOpenInquiry: (destination?: string) => void;
}

export const Destinations: FC<DestinationsProps> = ({ onOpenInquiry }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [activeDestination, setActiveDestination] = useState<DestinationItem>(DESTINATIONS_DATA[0]);
  const { t } = useLanguage();

  const regions = ['ALL', 'Tamil Nadu', 'Kerala', 'Karnataka', 'International'];

  const filteredDestinations = selectedRegion === 'ALL'
    ? DESTINATIONS_DATA
    : DESTINATIONS_DATA.filter((d) => d.region === selectedRegion);

  const handleSelectRegion = (region: string) => {
    soundEngine.playShutterClick();
    setSelectedRegion(region);
  };

  const handleSelectDestination = (dest: DestinationItem) => {
    soundEngine.playShutterClick();
    setActiveDestination(dest);
  };

  const handleInquire = () => {
    soundEngine.playGoldenChime();
    onOpenInquiry(activeDestination.name);
  };

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-[#FFFFFF] border-t border-[#E7E4DE] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">08</span>
              <span>/</span>
              <span>{t('destinations.tag', 'DESTINATION DIRECTORY')}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              {t('destinations.title1', 'WHERE YOUR')} <br />
              <span className="italic font-normal text-[#A58A62]">
                {t('destinations.title2', 'STORY TAKES YOU')}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed font-light">
            {t('destinations.desc', 'Exclusive wedding and event commissions across coastal South India, metropolitan palaces, and prestigious international destinations.')}
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-10 border-b border-[#E7E4DE]">
          {regions.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => handleSelectRegion(region)}
                className={`px-4 py-2 text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                    : 'bg-[#F7F6F2] text-[#6F6F6F] border-[#E7E4DE] hover:text-[#171717] hover:border-[#171717]'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* Interactive Destinations Showcase: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 items-start">
          
          {/* Left Column: Destination Cards List (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDestinations.map((dest) => {
              const isSelected = activeDestination.name === dest.name;
              return (
                <div
                  key={dest.name}
                  onClick={() => handleSelectDestination(dest)}
                  className={`p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#F7F6F2] border-[#A58A62] shadow-md ring-1 ring-[#A58A62]/30'
                      : 'bg-white border-[#E7E4DE] hover:border-[#A58A62]/50 hover:bg-[#F7F6F2]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#6F6F6F] mb-2">
                      <span className="text-[#A58A62] font-semibold">{dest.region}</span>
                      <span>{dest.tag}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#171717] font-light mb-2">
                      {dest.name}
                    </h3>

                    <p className="text-xs text-[#6F6F6F] leading-relaxed line-clamp-2 font-light">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E7E4DE] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#6F6F6F]">{dest.highlights.length} PREFERRED VENUES</span>
                    <span className={`uppercase tracking-wider ${isSelected ? 'text-[#A58A62] font-bold' : 'text-[#171717]'}`}>
                      {isSelected ? 'ACTIVE •' : 'SELECT →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Destination Briefing Detail Box (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <TiltCard maxTilt={4} scale={1.01} glare={true}>
              <div className="bg-[#F7F6F2] border border-[#E7E4DE] p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#A58A62] uppercase">
                  <Compass size={14} className="animate-spin duration-3000" />
                  <span>DESTINATION BRIEFING</span>
                </div>

                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light mb-1">
                    {activeDestination.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F]">
                    {activeDestination.region} • {activeDestination.tag}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#171717] leading-relaxed font-light">
                  {activeDestination.description}
                </p>

                {/* Venues */}
                <div className="border-t border-[#E7E4DE] pt-4 space-y-3">
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#6F6F6F]">
                    NOTABLE VENUES & CELEBRATION SITES:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#171717] font-light">
                    {activeDestination.highlights.map((venue: string) => (
                      <li key={venue} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A58A62]" />
                        <span>{venue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Destination CTA */}
                <div className="border-t border-[#E7E4DE] pt-4">
                  <button
                    onClick={handleInquire}
                    className="w-full py-3.5 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors shadow-sm shimmer-hover relative overflow-hidden"
                  >
                    INQUIRE FOR {activeDestination.name.toUpperCase()} →
                  </button>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>

        {/* Global Cities Strip */}
        <div className="mt-16 pt-8 border-t border-[#E7E4DE] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#6F6F6F] uppercase tracking-wider">
          <span className="text-[#A58A62]">TRAVEL HUBS AVAILABLE:</span>
          {SERVICE_LOCATIONS_LIST.map((loc) => (
            <span key={loc} className="hover:text-[#171717] transition-colors">
              {loc}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
