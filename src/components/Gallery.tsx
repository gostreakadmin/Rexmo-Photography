import { useState, useMemo, type FC } from 'react';
import { Maximize2 } from 'lucide-react';
import { GALLERY_DATA } from '../data/rexmoData';
import { Lightbox } from './Lightbox';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

export const Gallery: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { t } = useLanguage();

  const categories = [
    { id: 'ALL', label: t('gallery.all', 'ALL') },
    { id: 'WEDDINGS', label: t('services.weddings', 'WEDDINGS') },
    { id: 'MATERNITY', label: t('services.maternity', 'MATERNITY') },
    { id: 'NEWBORN', label: t('services.newborn', 'NEWBORN') },
    { id: 'MODELING', label: t('services.modeling', 'MODELING') },
    { id: 'EVENTS', label: t('services.events', 'EVENTS') }
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'ALL') return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategorySelect = (catId: string) => {
    soundEngine.playShutterClick();
    setSelectedCategory(catId);
  };

  const handleOpenLightbox = (index: number) => {
    soundEngine.playShutterClick();
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    soundEngine.playShutterClick();
    setActiveImageIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    soundEngine.playShutterClick();
    setActiveImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#F7F6F2] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">05</span>
              <span>/</span>
              <span>{t('gallery.tag', 'THE ARCHIVES')}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              {t('gallery.title1', 'SELECTED')} <br />
              <span className="italic font-normal text-[#A58A62]">
                {t('gallery.title2', 'FRAMES')}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed font-light">
            {t('gallery.desc', 'A curated anthology of authentic moments, delicate glances, and emotional legacies preserved in timeless clarity.')}
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-10 border-b border-[#E7E4DE]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                    : 'bg-white/80 text-[#6F6F6F] border-[#E7E4DE] hover:text-[#171717] hover:border-[#171717]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
          <div className="ml-auto hidden sm:block text-[11px] font-mono text-[#6F6F6F]">
            SHOWING {filteredItems.length} FRAMES
          </div>
        </div>

        {/* Dynamic Masonry Columns Grid */}
        <div className="pt-12 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => {
            let aspectClass = 'aspect-[3/4]';
            if (item.orientation === 'landscape') aspectClass = 'aspect-[4/3]';
            if (item.orientation === 'square') aspectClass = 'aspect-[1/1]';
            if (item.orientation === 'wide') aspectClass = 'aspect-[16/10]';

            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                data-cursor="view"
                className="group relative break-inside-avoid overflow-hidden bg-white border border-[#E7E4DE] hover:border-[#A58A62] transition-all duration-500 cursor-pointer shadow-sm"
              >
                <TiltCard maxTilt={4} scale={1.01} glare={true}>
                  {/* Image */}
                  <div className={`relative w-full ${aspectClass} overflow-hidden bg-[#EAE7DF]`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Dark subtle vignette on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Center Eye / Expand Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#171717] flex items-center justify-center backdrop-blur-sm shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 size={18} />
                      </div>
                    </div>

                    {/* Top Category Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase text-[#171717]">
                      {item.category}
                    </div>

                    {/* Bottom Info on Hover */}
                    <div className="absolute bottom-3 left-3 right-3 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-serif text-base font-normal tracking-wide text-white drop-shadow-sm">
                        {item.title}
                      </p>
                      {item.location && (
                        <p className="text-[10px] font-mono tracking-wider text-white/80 uppercase">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                </TiltCard>

                {/* Subtitle bar always visible below */}
                <div className="p-3 bg-white border-t border-[#E7E4DE] flex items-center justify-between text-[11px] text-[#6F6F6F]">
                  <span className="font-serif text-[#171717] text-sm truncate pr-2">
                    {item.title}
                  </span>
                  <span className="font-mono text-[10px] text-[#A58A62] flex-shrink-0">
                    VIEW FRAME ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Complete Archive Banner */}
        <div className="mt-16 text-center border-t border-[#E7E4DE] pt-12">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#6F6F6F] mb-3">
            PRIVATE CLIENT GALLERIES
          </p>
          <p className="font-serif text-xl sm:text-2xl text-[#171717] mb-6 font-light">
            Looking for a private online proofing or print delivery gallery?
          </p>
          <a
            href="mailto:jesleyfrantin@gmail.com?subject=Private%20Gallery%20Access%20Request"
            onClick={() => soundEngine.playGoldenChime()}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] hover:text-[#A58A62] border-b border-[#171717] hover:border-[#A58A62] pb-1 transition-colors"
          >
            <span>REQUEST CLIENT ACCESS CODE</span>
            <span>→</span>
          </a>
        </div>

      </div>

      {/* Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={activeImageIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
