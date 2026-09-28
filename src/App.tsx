import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Philosophy } from './components/Philosophy';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { FeaturedStories } from './components/FeaturedStories';
import { Cinematography } from './components/Cinematography';
import { About } from './components/About';
import { Destinations } from './components/Destinations';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { FilmGrain } from './components/FilmGrain';
import { MarqueeTicker } from './components/MarqueeTicker';
import { PageTransitionLoader } from './components/PageTransitionLoader';
import type { ServiceItem } from './data/rexmoData';
import { Camera, Film, Compass, BookOpen, MessageSquare, Award, ArrowRight } from 'lucide-react';

interface PageBannerProps {
  badge: string;
  title: string;
  subtitle: string;
}

const PageBanner = ({ badge, title, subtitle }: PageBannerProps) => (
  <div className="pt-32 sm:pt-36 pb-12 sm:pb-16 bg-[#F7F6F2] border-b border-[#E7E4DE] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#EAE7DF] border border-[#E7E4DE] text-[10px] tracking-[0.3em] uppercase text-[#171717] w-fit mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A58A62] animate-pulse" />
        <span>{badge}</span>
      </div>
      <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight mb-3">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-[#6F6F6F] max-w-2xl font-light leading-relaxed">
        {subtitle}
      </p>
    </div>
  </div>
);

interface NextPageNavProps {
  primaryLabel: string;
  primaryPage: string;
  secondaryLabel: string;
  secondaryPage: string;
  onNavigate: (page: string) => void;
}

const NextPageNav = ({ primaryLabel, primaryPage, secondaryLabel, secondaryPage, onNavigate }: NextPageNavProps) => (
  <div className="py-12 bg-[#F7F6F2] border-t border-[#E7E4DE]">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-[11px] font-mono tracking-widest text-[#6F6F6F] uppercase">
        CONTINUE EXPLORING ARCHIVES
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => onNavigate(primaryPage)}
          className="px-5 py-2.5 bg-[#171717] text-white hover:bg-[#A58A62] text-[10px] font-mono tracking-widest uppercase transition-colors flex items-center space-x-2 shadow-sm"
        >
          <span>{primaryLabel}</span>
          <ArrowRight size={13} />
        </button>
        <button
          onClick={() => onNavigate(secondaryPage)}
          className="px-5 py-2.5 bg-white border border-[#E7E4DE] text-[#171717] hover:border-[#A58A62] hover:text-[#A58A62] text-[10px] font-mono tracking-widest uppercase transition-colors flex items-center space-x-2"
        >
          <span>{secondaryLabel}</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  </div>
);

export function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages = [
      'home',
      'about',
      'services',
      'gallery',
      'stories',
      'cinematography',
      'destinations',
      'testimonials',
      'contact'
    ];
    if (validPages.includes(hash)) return hash;
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);
  const [targetPage, setTargetPage] = useState<string>('home');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('WEDDINGS');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = [
        'home',
        'about',
        'services',
        'gallery',
        'stories',
        'cinematography',
        'destinations',
        'testimonials',
        'contact'
      ];
      if (validPages.includes(hash) && hash !== currentPage) {
        setTargetPage(hash);
        setIsTransitioning(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  // Page navigation trigger (runs 1.5s loader)
  const navigateToPage = (page: string) => {
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTargetPage(page);
    setIsTransitioning(true);
  };

  // Called when 1.5s page transition finishes
  const handleTransitionComplete = () => {
    setCurrentPage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsTransitioning(false);
  };

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForInquiry(serviceName);
    }
    setInquiryModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForInquiry(service.title);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717] font-sans selection:bg-[#A58A62] selection:text-white relative">
      {/* 1.5-Second Luxury Page Transition Loader with Rexmo Logo */}
      <PageTransitionLoader
        isLoading={isTransitioning}
        targetPage={targetPage}
        onComplete={handleTransitionComplete}
        durationMs={1500}
      />

      {/* Top 2.5px Golden Scroll Reading Progress Bar */}
      <ScrollProgress />

      {/* Luxury Lerping Custom Cursor (Desktop only, auto-disabled on touch) */}
      <CustomCursor />

      {/* Subtle Analog Super 8 Film Grain Texture */}
      <FilmGrain />

      {/* Top Sticky Header */}
      <Header
        onOpenInquiry={() => handleOpenInquiry()}
        activePage={currentPage}
        onNavigate={navigateToPage}
      />

      {/* Dynamic Page Views */}
      <main className="transition-opacity duration-300">
        
        {/* ==================== 1. HOME PAGE ==================== */}
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            <Hero
              onExploreWork={() => navigateToPage('gallery')}
              onOpenInquiry={() => handleOpenInquiry()}
              onWatchCinema={() => navigateToPage('cinematography')}
            />

            <Intro
              onDiscoverStudio={() => navigateToPage('about')}
            />

            {/* Luxury Infinite Marquee Ticker */}
            <MarqueeTicker
              speedSeconds={32}
              variant="gold-border"
              items={[
                'DESTINATION WEDDINGS',
                'FINE ART CINEMATOGRAPHY',
                'COUTURE PORTRAITURE',
                'SUPER 8 ANALOG GRAIN',
                'EDITORIAL MATERNITY',
                'ESTABLISHED 1992',
                'SOUTH INDIA & WORLDWIDE'
              ]}
            />

            <Philosophy />

            {/* Curated Archive Hub Navigation Grid */}
            <section className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#E7E4DE]">
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#E7E4DE] gap-4">
                  <div>
                    <span className="text-[11px] font-mono tracking-[0.25em] text-[#A58A62] uppercase block mb-2">
                      EXPLORE ARCHIVES BY SECTION
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light">
                      Distinct Studio Pages
                    </h2>
                  </div>
                  <p className="text-xs text-[#6F6F6F] max-w-sm font-light">
                    Every aspect of Rexmo has been organized into dedicated monographs for your convenience.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
                  
                  {/* Card 1: Services */}
                  <div
                    onClick={() => navigateToPage('services')}
                    className="p-8 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-white border border-[#E7E4DE] flex items-center justify-center text-[#A58A62] mb-6 group-hover:bg-[#A58A62] group-hover:text-white transition-colors">
                        <Camera size={18} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58A62]">
                        01 / COMMISSIONS
                      </span>
                      <h3 className="font-serif text-2xl text-[#171717] font-light mt-1 mb-3">
                        Services & Collections
                      </h3>
                      <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
                        Multi-day royal wedding suites, pre-wedding destination sessions, and archival albums.
                      </p>
                    </div>
                    <div className="pt-6 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#171717] group-hover:text-[#A58A62] transition-colors">
                      <span>OPEN SERVICES PAGE</span>
                      <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: Gallery */}
                  <div
                    onClick={() => navigateToPage('gallery')}
                    className="p-8 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-white border border-[#E7E4DE] flex items-center justify-center text-[#A58A62] mb-6 group-hover:bg-[#A58A62] group-hover:text-white transition-colors">
                        <Award size={18} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58A62]">
                        02 / PORTFOLIO
                      </span>
                      <h3 className="font-serif text-2xl text-[#171717] font-light mt-1 mb-3">
                        Fine Art Gallery
                      </h3>
                      <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
                        Filterable gallery of wedding rituals, temple bells, royal palace unions, and film stills.
                      </p>
                    </div>
                    <div className="pt-6 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#171717] group-hover:text-[#A58A62] transition-colors">
                      <span>OPEN GALLERY PAGE</span>
                      <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: Cinematography */}
                  <div
                    onClick={() => navigateToPage('cinematography')}
                    className="p-8 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-white border border-[#E7E4DE] flex items-center justify-center text-[#A58A62] mb-6 group-hover:bg-[#A58A62] group-hover:text-white transition-colors">
                        <Film size={18} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58A62]">
                        03 / MOTION
                      </span>
                      <h3 className="font-serif text-2xl text-[#171717] font-light mt-1 mb-3">
                        Cinematography Suite
                      </h3>
                      <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
                        Watch our 6 wedding cinema reels with instant inline YouTube streaming directly on the site.
                      </p>
                    </div>
                    <div className="pt-6 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#171717] group-hover:text-[#A58A62] transition-colors">
                      <span>OPEN CINEMA PAGE</span>
                      <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 4: About */}
                  <div
                    onClick={() => navigateToPage('about')}
                    className="p-8 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-white border border-[#E7E4DE] flex items-center justify-center text-[#A58A62] mb-6 group-hover:bg-[#A58A62] group-hover:text-white transition-colors">
                        <BookOpen size={18} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58A62]">
                        04 / HERITAGE
                      </span>
                      <h3 className="font-serif text-2xl text-[#171717] font-light mt-1 mb-3">
                        Studio Story & Founders
                      </h3>
                      <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
                        The 34-year journey of Francis Jeya Balan and Jesley Frantin preserving living legacies.
                      </p>
                    </div>
                    <div className="pt-6 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#171717] group-hover:text-[#A58A62] transition-colors">
                      <span>OPEN ABOUT PAGE</span>
                      <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 5: Destinations */}
                  <div
                    onClick={() => navigateToPage('destinations')}
                    className="p-8 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-white border border-[#E7E4DE] flex items-center justify-center text-[#A58A62] mb-6 group-hover:bg-[#A58A62] group-hover:text-white transition-colors">
                        <Compass size={18} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58A62]">
                        05 / WORLDWIDE
                      </span>
                      <h3 className="font-serif text-2xl text-[#171717] font-light mt-1 mb-3">
                        Destinations Directory
                      </h3>
                      <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
                        Documenting destination weddings from Chennai and Kochi to Dubai, London, and Paris.
                      </p>
                    </div>
                    <div className="pt-6 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#171717] group-hover:text-[#A58A62] transition-colors">
                      <span>OPEN DESTINATIONS PAGE</span>
                      <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 6: Contact */}
                  <div
                    onClick={() => navigateToPage('contact')}
                    className="p-8 bg-[#171717] text-white border border-[#A58A62] hover:bg-[#1E1E1E] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#2A2A2A] border border-[#A58A62]/40 flex items-center justify-center text-[#A58A62] mb-6 group-hover:bg-[#A58A62] group-hover:text-white transition-colors">
                        <MessageSquare size={18} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#A58A62]">
                        06 / RESERVATIONS
                      </span>
                      <h3 className="font-serif text-2xl text-white font-light mt-1 mb-3">
                        Begin Your Inquiry
                      </h3>
                      <p className="text-xs text-white/70 leading-relaxed font-light">
                        Inquire about date availability, custom commission briefs, and WhatsApp concierge.
                      </p>
                    </div>
                    <div className="pt-6 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#A58A62] group-hover:text-white transition-colors">
                      <span>OPEN CONTACT PAGE</span>
                      <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <Testimonials />
          </div>
        )}

        {/* ==================== 2. ABOUT PAGE ==================== */}
        {currentPage === 'about' && (
          <div className="animate-fade-in">
            <PageBanner
              badge="HERITAGE ARCHIVE • EST. 1992"
              title="The Story Behind Rexmo"
              subtitle="Founded by Francis Jeya Balan and carried forward by Jesley Frantin, our studio has spent over three decades crafting honest, timeless heirloom imagery for discerning families."
            />
            <About onOpenInquiry={() => handleOpenInquiry()} />
            <Philosophy />
            <NextPageNav
              primaryLabel="VIEW SERVICES & COLLECTIONS"
              primaryPage="services"
              secondaryLabel="EXPLORE ARCHIVAL GALLERY"
              secondaryPage="gallery"
              onNavigate={navigateToPage}
            />
          </div>
        )}

        {/* ==================== 3. SERVICES PAGE ==================== */}
        {currentPage === 'services' && (
          <div className="animate-fade-in">
            <PageBanner
              badge="CURATED COMMISSIONS"
              title="Collections & Services"
              subtitle="From comprehensive multi-day royal wedding suites to intimate destination pre-wedding monographs and bespoke archival fine art books."
            />
            <Services
              onSelectService={handleSelectService}
              onOpenInquiry={handleOpenInquiry}
            />
            <NextPageNav
              primaryLabel="EXPLORE ARCHIVAL GALLERY"
              primaryPage="gallery"
              secondaryLabel="WATCH CINEMA FILMS"
              secondaryPage="cinematography"
              onNavigate={navigateToPage}
            />
          </div>
        )}

        {/* ==================== 4. GALLERY PAGE ==================== */}
        {currentPage === 'gallery' && (
          <div className="animate-fade-in">
            <PageBanner
              badge="FINE ART ARCHIVES"
              title="Archival Gallery & Still Works"
              subtitle="Filter our curated collection across royal weddings, sacred temple rituals, couture bridal portraits, and vintage analog film stills."
            />
            <Gallery />
            <NextPageNav
              primaryLabel="READ ARCHIVAL LOVE STORIES"
              primaryPage="stories"
              secondaryLabel="ENTER CINEMATOGRAPHY THEATRE"
              secondaryPage="cinematography"
              onNavigate={navigateToPage}
            />
          </div>
        )}

        {/* ==================== 5. STORIES PAGE ==================== */}
        {currentPage === 'stories' && (
          <div className="animate-fade-in">
            <PageBanner
              badge="LOVE STORIES • VOL. XXXIV"
              title="Archival Love Stories"
              subtitle="Complete monographs documenting sacred temple rites, tranquil backwaters, and starlit dune vows with Super-8 inspired cinema stills."
            />
            <FeaturedStories onOpenInquiry={handleOpenInquiry} />
            <NextPageNav
              primaryLabel="WATCH CINEMA SUITE"
              primaryPage="cinematography"
              secondaryLabel="BOOK YOUR WEDDING STORY"
              secondaryPage="contact"
              onNavigate={navigateToPage}
            />
          </div>
        )}

        {/* ==================== 6. CINEMATOGRAPHY PAGE ==================== */}
        {currentPage === 'cinematography' && (
          <div className="animate-fade-in">
            <PageBanner
              badge="CINEMA SUITE • 4K UHD & SUPER 8"
              title="Cinematic Wedding Films"
              subtitle="Experience our moving pictures documented in 4K resolution with authentic Super 8 emulsion, original master score soundscapes, and instant on-site YouTube streaming."
            />
            <Cinematography onOpenInquiry={handleOpenInquiry} />
            <NextPageNav
              primaryLabel="DISCOVER DESTINATIONS"
              primaryPage="destinations"
              secondaryLabel="READ COUPLE TESTIMONIALS"
              secondaryPage="testimonials"
              onNavigate={navigateToPage}
            />
          </div>
        )}

        {/* ==================== 7. DESTINATIONS PAGE ==================== */}
        {currentPage === 'destinations' && (
          <div className="animate-fade-in">
            <PageBanner
              badge="SOUTH INDIA & WORLDWIDE"
              title="Destinations Directory"
              subtitle="From heritage Chettinad courtyards and Travancore cliffs to Dubai dunes and European palaces, discover our global travel footprint."
            />
            <Destinations onOpenInquiry={handleOpenInquiry} />
            <NextPageNav
              primaryLabel="READ CLIENT PRAISES"
              primaryPage="testimonials"
              secondaryLabel="INQUIRE TRAVEL DATES"
              secondaryPage="contact"
              onNavigate={navigateToPage}
            />
          </div>
        )}

        {/* ==================== 8. TESTIMONIALS PAGE ==================== */}
        {currentPage === 'testimonials' && (
          <div className="animate-fade-in">
            <PageBanner
              badge="AUTHENTIC PRAISES"
              title="Words of Gratitude"
              subtitle="Reflections and genuine letters from the couples and families who have entrusted their most sacred days to the Rexmo archive."
            />
            <Testimonials />
            <NextPageNav
              primaryLabel="BEGIN RESERVATION BRIEF"
              primaryPage="contact"
              secondaryLabel="RETURN TO HOME MONOGRAPH"
              secondaryPage="home"
              onNavigate={navigateToPage}
            />
          </div>
        )}

        {/* ==================== 9. CONTACT PAGE ==================== */}
        {currentPage === 'contact' && (
          <div className="animate-fade-in">
            <PageBanner
              badge="RESERVATIONS OPEN"
              title="Begin Your Journey"
              subtitle="We take on a strictly limited number of commissions each season to ensure undivided artistic dedication to your family's story."
            />
            <Contact initialService={selectedServiceForInquiry} />
            <NextPageNav
              primaryLabel="EXPLORE SERVICES & PACKAGES"
              primaryPage="services"
              secondaryLabel="VIEW GALLERY ARCHIVES"
              secondaryPage="gallery"
              onNavigate={navigateToPage}
            />
          </div>
        )}

      </main>

      {/* Global Universal Footer */}
      <Footer onNavigate={navigateToPage} />

      {/* Quick Modal Inquiry */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultService={selectedServiceForInquiry}
      />

      {/* Floating Concierge */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
