import { useState, useRef, useEffect, type FC } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { SupportedLanguage } from '../i18n/translations';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage, currentLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-30">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Studio Language"
        className={`flex items-center space-x-1.5 font-mono text-[11px] uppercase tracking-wider text-[#171717] hover:text-[#A58A62] transition-colors border border-[#E7E4DE] bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-none shadow-sm ${
          compact ? 'text-[10px] px-2 py-1' : ''
        }`}
      >
        <Globe size={13} className="text-[#A58A62] flex-shrink-0" />
        <span className="font-semibold">{currentLanguage.flag}</span>
        {!compact && (
          <span className="hidden sm:inline font-sans text-[11px] text-[#6F6F6F]">
            ({currentLanguage.nativeName})
          </span>
        )}
        <ChevronDown size={11} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E7E4DE] shadow-xl animate-fade-in p-1 text-left origin-top-right">
          <div className="px-3 py-2 border-b border-[#E7E4DE] text-[9px] font-mono tracking-widest uppercase text-[#6F6F6F]">
            SELECT STUDIO REGIONAL LANGUAGE
          </div>

          <div className="py-1">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#F7F6F2] text-[#A58A62] font-semibold'
                      : 'text-[#171717] hover:bg-[#F7F6F2] hover:text-[#A58A62]'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] px-1 py-0.5 bg-[#EAE7DF] text-[#171717]">
                        {lang.code.toUpperCase()}
                      </span>
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className="text-[10px] text-[#6F6F6F]">({lang.label})</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#6F6F6F] pl-6 pt-0.5">
                      {lang.region}
                    </span>
                  </div>

                  {isSelected && <Check size={14} className="text-[#A58A62]" />}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 border-t border-[#E7E4DE] bg-[#F7F6F2] text-[9px] font-mono text-[#6F6F6F]">
            ENGLISH IS DEFAULT
          </div>
        </div>
      )}
    </div>
  );
};
