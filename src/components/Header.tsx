import { useState, useEffect, type FC, type MouseEvent } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/rexmoData';
import { SoundToggle } from './SoundToggle';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

interface HeaderProps {
  onOpenInquiry: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Header: FC<HeaderProps> = ({ onOpenInquiry, activePage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', page: 'home' },
    { label: 'ABOUT', page: 'about' },
    { label: 'SERVICES', page: 'services' },
    { label: 'GALLERY', page: 'gallery' },
    { label: 'CINEMATOGRAPHY', page: 'cinematography' },
    { label: 'DESTINATIONS', page: 'destinations' },
    { label: 'STORIES', page: 'stories' },
    { label: 'CONTACT', page: 'contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    soundEngine.playShutterClick();
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const handleInquiryClick = () => {
    soundEngine.playGoldenChime();
    onOpenInquiry();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F6F2]/95 backdrop-blur-md py-3.5 border-b border-[#E7E4DE] shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
            : 'bg-gradient-to-b from-[#F7F6F2]/90 via-[#F7F6F2]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="group flex flex-col items-start text-left focus:outline-none flex-shrink-0"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-light text-[#171717] group-hover:text-[#A58A62] transition-colors uppercase">
              REXMO
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.4em] text-[#6F6F6F] font-sans -mt-1 uppercase">
              PHOTOGRAPHY • EST. {STUDIO_INFO.established}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <a
                  key={link.page}
                  href={`#${link.page}`}
                  onClick={(e) => handleNavClick(e, link.page)}
                  className={`text-[11px] tracking-[0.2em] font-medium transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#6F6F6F] hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A58A62] transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Tools: Sound Toggle, and Inquire Button */}
          <div className="hidden lg:flex items-center space-x-3.5 flex-shrink-0">
            {/* Studio Sound Effects Toggle */}
            <SoundToggle />

            {/* Inquire CTA */}
            <button
              onClick={handleInquiryClick}
              className="group relative inline-flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase font-semibold text-[#171717] px-5 py-2 border border-[#171717] hover:border-[#A58A62] hover:text-white transition-all duration-300 overflow-hidden shadow-sm"
            >
              <span className="absolute inset-0 bg-[#A58A62] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-10" />
              <span>{t('nav.inquire', 'INQUIRE')}</span>
              <span className="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                →
              </span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <SoundToggle compact />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-1.5 text-[#171717] hover:text-[#A58A62] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-[#F7F6F2] transition-all duration-500 lg:hidden flex flex-col justify-between p-6 sm:p-10 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '0', height: '100dvh' }}
      >
        <div className="flex justify-between items-center pt-2 border-b border-[#E7E4DE] pb-5">
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.2em] font-light text-[#171717]">
              REXMO
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#6F6F6F]">
              EST. {STUDIO_INFO.established}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-1.5 text-[#171717] focus:outline-none"
            >
              <X size={26} />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-4 my-auto overflow-y-auto py-4">
          {navLinks.map((link, idx) => (
            <a
              key={link.page}
              href={`#${link.page}`}
              onClick={(e) => handleNavClick(e, link.page)}
              className="group flex items-baseline justify-between py-2 border-b border-[#E7E4DE]/60"
            >
              <div className="flex items-baseline space-x-3">
                <span className="text-[10px] font-mono text-[#A58A62]">
                  0{idx + 1}
                </span>
                <span className={`font-serif text-xl sm:text-2xl tracking-[0.12em] transition-all duration-300 ${
                  activePage === link.page ? 'text-[#A58A62] font-normal translate-x-2' : 'text-[#171717] group-hover:text-[#A58A62] group-hover:translate-x-2'
                }`}>
                  {link.label}
                </span>
              </div>
              <ArrowUpRight
                size={16}
                className="text-[#6F6F6F] group-hover:text-[#A58A62] group-hover:rotate-45 transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* Mobile Footer Area */}
        <div className="pt-5 border-t border-[#E7E4DE]">
          <div className="flex flex-col space-y-2 mb-4">
            <p className="text-[10px] uppercase font-mono tracking-widest text-[#6F6F6F]">DIRECT STUDIO INQUIRIES</p>
            <a
              href={`mailto:${STUDIO_INFO.email}`}
              className="text-xs font-mono text-[#171717] hover:text-[#A58A62]"
            >
              {STUDIO_INFO.email}
            </a>
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#171717] hover:text-[#A58A62]"
            >
              WhatsApp: {STUDIO_INFO.phoneFormatted}
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleInquiryClick();
            }}
            className="w-full py-3.5 bg-[#171717] text-[#FFFFFF] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#A58A62] transition-colors"
          >
            {t('hero.cta.journey', 'BEGIN YOUR INQUIRY →')}
          </button>
        </div>
      </div>
    </>
  );
};
