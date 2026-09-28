import type { FC } from 'react';
import { ArrowUp, Share2 } from 'lucide-react';
import { STUDIO_INFO } from '../data/rexmoData';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Cinematography', page: 'cinematography' },
    { label: 'Destinations', page: 'destinations' },
    { label: 'Stories', page: 'stories' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <footer className="bg-[#171717] text-white pt-20 pb-12 border-t border-white/10 relative">
      <div className="w-full max-w-[96vw] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => {
                if (onNavigate) onNavigate('home');
              }}
              className="flex flex-col cursor-pointer group"
            >
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-light text-white group-hover:text-[#A58A62] transition-colors uppercase">
                REXMO
              </span>
              <span className="text-[10px] tracking-[0.4em] text-[#A58A62] font-mono uppercase mt-0.5">
                PHOTOGRAPHY • EST. {STUDIO_INFO.established}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed font-light pt-2">
              Bespoke luxury wedding photography and fine-art cinematography studio. 
              Preserving sacred emotional heritage across South India and international destinations.
            </p>

            <div className="pt-2 text-xs font-mono text-white/50">
              FOUNDED BY FRANCIS JEYA BALAN (1992) <br />
              CREATIVE DIRECTION BY JESLEY FRANTIN
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#A58A62] block mb-2">
              NAVIGATION
            </span>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) onNavigate(link.page);
                    }}
                    className="text-xs text-white/70 hover:text-[#A58A62] transition-colors uppercase tracking-widest font-mono"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio Coordinates (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#A58A62] block mb-2">
              STUDIO ARCHIVE
            </span>
            <div className="space-y-2 text-xs text-white/70 leading-relaxed font-mono">
              <p className="text-white">
                {STUDIO_INFO.address.line1} <br />
                {STUDIO_INFO.address.area}, {STUDIO_INFO.address.district} <br />
                {STUDIO_INFO.address.state}, {STUDIO_INFO.address.pincode}
              </p>
              <p className="pt-2">
                <span className="text-white/40">EMAIL:</span>{' '}
                <a href={`mailto:${STUDIO_INFO.email}`} className="text-white hover:text-[#A58A62]">
                  {STUDIO_INFO.email}
                </a>
              </p>
              <p>
                <span className="text-white/40">WHATSAPP:</span>{' '}
                <a href={STUDIO_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#A58A62]">
                  {STUDIO_INFO.phoneFormatted}
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-4 flex items-center space-x-4">
              {/* Instagram */}
              <a
                href={STUDIO_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-[#A58A62] hover:border-[#A58A62] transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={STUDIO_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-[#A58A62] hover:border-[#A58A62] transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={STUDIO_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-[#A58A62] hover:border-[#A58A62] transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href={STUDIO_INFO.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-[#A58A62] hover:border-[#A58A62] transition-colors"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-mono tracking-wider gap-4">
          <p>
            © 2026 REXMO PHOTOGRAPHY. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center space-x-2 text-white/70 hover:text-[#A58A62] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
};
