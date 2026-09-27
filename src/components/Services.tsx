import { useState, type FC } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES_DATA, type ServiceItem } from '../data/rexmoData';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenInquiry: (serviceName?: string) => void;
}

export const Services: FC<ServicesProps> = ({ onSelectService, onOpenInquiry }) => {
  const [selectedModalService, setSelectedModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FFFFFF] border-t border-[#E7E4DE] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">04</span>
              <span>/</span>
              <span>BESPOKE OFFERINGS</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              CURATED <br />
              <span className="italic font-normal text-[#A58A62]">COLLECTIONS</span>
            </h2>
          </div>
          <div className="max-w-md text-sm text-[#6F6F6F] leading-relaxed">
            <p>
              Bespoke photography experiences designed for those who appreciate fine art, 
              nuanced light, and preservation-grade storytelling.
            </p>
          </div>
        </div>

        {/* Editorial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-16">
          {SERVICES_DATA.map((service, index) => {
            // Give the first service (Weddings) a prominent 2-column or prominent card layout on desktop
            const isFeatured = index === 0;

            return (
              <div
                key={service.id}
                className={`group flex flex-col justify-between bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-all duration-500 overflow-hidden shadow-sm ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Image Section */}
                <div className={`relative overflow-hidden ${isFeatured ? 'h-[320px] sm:h-[400px]' : 'h-[280px] sm:h-[320px]'}`}>
                  <img
                    src={service.image}
                    alt={`Rexmo ${service.title} Photography`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-mono tracking-widest text-[#171717] uppercase">
                    COLLECTION {service.number}
                  </div>

                  {/* Floating Action Arrow */}
                  <button
                    onClick={() => setSelectedModalService(service)}
                    aria-label={`View details for ${service.title}`}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#171717] group-hover:bg-[#A58A62] group-hover:text-white transition-all duration-300"
                  >
                    <ArrowUpRight size={18} className="transform group-hover:rotate-45 transition-transform duration-300" />
                  </button>

                  {/* Overlay Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#A58A62] uppercase block">
                      {service.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed mb-6 font-light">
                      {service.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 mb-6 border-t border-[#E7E4DE] pt-4">
                      {service.details.slice(0, isFeatured ? 4 : 2).map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#171717]">
                          <Check size={14} className="text-[#A58A62] mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E7E4DE]">
                    <button
                      onClick={() => setSelectedModalService(service)}
                      className="text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:text-[#A58A62] transition-colors flex items-center space-x-1"
                    >
                      <span>VIEW DETAILS</span>
                      <span>→</span>
                    </button>

                    <button
                      onClick={() => onSelectService(service)}
                      className="px-4 py-2 border border-[#171717] text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
                    >
                      INQUIRE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Note */}
        <div className="mt-16 p-8 bg-[#F7F6F2] border border-[#E7E4DE] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#A58A62] uppercase">
              BESPOKE COMMISSIONS
            </span>
            <p className="font-serif text-lg sm:text-xl text-[#171717]">
              Require custom multi-city coverage or an international destination?
            </p>
            <p className="text-xs text-[#6F6F6F]">
              We curate custom travel itineraries across India, the Middle East, and Europe.
            </p>
          </div>
          <button
            onClick={() => onOpenInquiry('Custom Commission')}
            className="px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors flex-shrink-0"
          >
            REQUEST CUSTOM ITINERARY →
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#F7F6F2] border border-[#E7E4DE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
            <button
              onClick={() => setSelectedModalService(null)}
              className="absolute top-6 right-6 text-[#171717] hover:text-[#A58A62] font-mono text-sm tracking-widest"
            >
              [CLOSE ✕]
            </button>

            <span className="text-[10px] font-mono tracking-widest text-[#A58A62] uppercase block mb-1">
              COLLECTION {selectedModalService.number}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light mb-2">
              {selectedModalService.title}
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#6F6F6F] mb-6">
              {selectedModalService.subtitle}
            </p>

            <div className="aspect-[16/9] overflow-hidden border border-[#E7E4DE] mb-6">
              <img
                src={selectedModalService.image}
                alt={selectedModalService.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#171717] leading-relaxed mb-6 font-light">
              {selectedModalService.description}
            </p>

            <h4 className="text-xs font-mono tracking-widest uppercase text-[#A58A62] mb-3">
              WHAT IS INCLUDED:
            </h4>
            <div className="space-y-2.5 mb-8">
              {selectedModalService.details.map((item, i) => (
                <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-[#171717]">
                  <Check size={16} className="text-[#A58A62] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-[#E7E4DE]">
              <button
                onClick={() => {
                  const s = selectedModalService.title;
                  setSelectedModalService(null);
                  onOpenInquiry(s);
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors"
              >
                INQUIRE FOR THIS COLLECTION →
              </button>
              <button
                onClick={() => setSelectedModalService(null)}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#E7E4DE] text-xs uppercase tracking-[0.2em] text-[#6F6F6F] hover:text-[#171717]"
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
