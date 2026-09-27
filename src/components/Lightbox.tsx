import { useEffect, useCallback, useState, type FC, type TouchEvent } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import type { GalleryItem } from '../data/rexmoData';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev
}) => {
  const currentItem = items[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown, isOpen]);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left -> next
      onNext();
    } else if (diff < -50) {
      // Swiped right -> prev
      onPrev();
    }
    setTouchStartX(null);
  };

  if (!isOpen || !currentItem) return null;

  const total = items.length;
  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen Gallery Viewer"
      className="fixed inset-0 z-50 bg-[#171717]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in text-white select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar: Counter & Controls */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-20">
        <div className="flex items-center space-x-4">
          <span className="font-mono text-xs tracking-widest text-[#A58A62]">
            {currentFormatted} / {totalFormatted}
          </span>
          <span className="text-white/20">|</span>
          <div className="flex items-center space-x-1.5 text-[11px] font-mono tracking-widest text-white/70 uppercase">
            <Tag size={12} className="text-[#A58A62]" />
            <span>{currentItem.category}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-white/80 hover:text-[#A58A62] transition-colors p-2"
        >
          <span>ESC</span>
          <X size={20} />
        </button>
      </div>

      {/* Center Image Container with Navigation Arrows */}
      <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/40 hover:bg-[#A58A62] text-white backdrop-blur-sm transition-all duration-300 transform -translate-y-1/2 top-1/2"
        >
          <ChevronLeft size={24} />
        </button>

        {/* The Image */}
        <div className="max-w-5xl max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center p-2">
          <img
            key={currentItem.image}
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-sm shadow-2xl transition-opacity duration-300"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/40 hover:bg-[#A58A62] text-white backdrop-blur-sm transition-all duration-300 transform -translate-y-1/2 top-1/2"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Bar: Captions & Details */}
      <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-2 z-20">
        <div>
          <h4 className="font-serif text-lg text-white font-normal tracking-wide">
            {currentItem.title}
          </h4>
          <p className="text-white/60 font-light mt-0.5 max-w-xl">
            {currentItem.caption}
          </p>
        </div>

        {currentItem.location && (
          <div className="flex items-center space-x-1.5 font-mono text-[11px] text-[#A58A62]">
            <MapPin size={13} />
            <span>{currentItem.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};
