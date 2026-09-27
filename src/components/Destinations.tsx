import { useState, type FC } from 'react';
import { Compass } from 'lucide-react';
import { DESTINATIONS_DATA, type DestinationItem, SERVICE_LOCATIONS_LIST } from '../data/rexmoData';

interface DestinationsProps {
  onOpenInquiry: (destination?: string) => void;
}

export const Destinations: FC<DestinationsProps> = ({ onOpenInquiry }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [activeDestination, setActiveDestination] = useState<DestinationItem>(DESTINATIONS_DATA[0]);

  const regions = ['ALL', 'Tamil Nadu', 'Kerala', 'Karnataka', 'International'];

  const filteredDestinations = selectedRegion === 'ALL'
    ? DESTINATIONS_DATA
    : DESTINATIONS_DATA.filter((d) => d.region === selectedRegion);

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-[#FFFFFF] border-t border-[#E7E4DE] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">08</span>
              <span>/</span>
              <span>DESTINATION DIRECTORY</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              WHERE YOUR <br />
              <span className="italic font-normal text-[#A58A62]">STORY TAKES YOU</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed">
            Exclusive wedding and event commissions across coastal South India, metropolitan palaces, 
            and prestigious international destinations.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-10 border-b border-[#E7E4DE]">
          {regions.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717]'
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
                  onClick={() => setActiveDestination(dest)}
                  className={`p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#F7F6F2] border-[#A58A62] shadow-md ring-1 ring-[#A58A62]/30'
                      : 'bg-white border-[#E7E4DE] hover:border-[#171717]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#A58A62] uppercase mb-1">
                      <span>{dest.region}</span>
                      <span>{dest.tag}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#171717] font-light mb-2">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#6F6F6F] leading-relaxed line-clamp-2">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E7E4DE]/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#171717]">
                      {dest.highlights.length} PREFERRED VENUES
                    </span>
                    <span className="text-[#A58A62]">SELECT →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Destination Detailed Editorial Preview (5 cols) */}
          <div className="lg:col-span-5 bg-[#F7F6F2] border border-[#E7E4DE] p-6 sm:p-8 sticky top-28 shadow-sm">
            <div className="flex items-center space-x-2 text-[#A58A62] text-[11px] font-mono tracking-widest uppercase mb-2">
              <Compass size={14} />
              <span>DESTINATION BRIEFING</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light mb-1">
              {activeDestination.name}
            </h3>
            <span className="text-xs font-mono tracking-widest text-[#6F6F6F] uppercase block mb-6">
              {activeDestination.region} • {activeDestination.tag}
            </span>

            <p className="text-xs sm:text-sm text-[#171717] leading-relaxed mb-6 font-light">
              {activeDestination.description}
            </p>

            <div className="border-t border-[#E7E4DE] pt-4 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#A58A62] mb-3">
                NOTABLE VENUES & CELEBRATION SITES:
              </h4>
              <ul className="space-y-2">
                {activeDestination.highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2 text-xs text-[#171717]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A58A62]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E7E4DE]">
              <button
                onClick={() => onOpenInquiry(`Destination: ${activeDestination.name}`)}
                className="w-full py-3 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors"
              >
                BOOK IN {activeDestination.name.toUpperCase()} →
              </button>
              <p className="text-[10px] text-center font-mono text-[#6F6F6F]">
                CUSTOM TRAVEL PACKAGES AVAILABLE WORLDWIDE
              </p>
            </div>
          </div>

        </div>

        {/* Comprehensive Locations Ticker / Grid */}
        <div className="mt-16 pt-12 border-t border-[#E7E4DE]">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#6F6F6F] block mb-4">
            ALL ACTIVE SERVICE DESTINATIONS:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {SERVICE_LOCATIONS_LIST.map((loc) => (
              <span
                key={loc}
                className="px-3.5 py-1.5 bg-[#F7F6F2] border border-[#E7E4DE] text-xs font-mono text-[#171717]"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
