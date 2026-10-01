import { useState, useEffect, useCallback } from 'react';
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
import { SectionTracker } from './components/SectionTracker';
import { PageTransitionLoader } from './components/PageTransitionLoader';
import type { ServiceItem } from './data/rexmoData';

export function App() {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('WEDDINGS');

  // Smooth scroll handler to target section with sticky header offset
  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 76;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  }, []);

  // Handle initial hash on page load (e.g. /#gallery, /#cinematography)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash) {
      // Delay slightly for DOM readiness
      const timer = setTimeout(() => {
        scrollToSection(hash);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [scrollToSection]);

  // Active section scroll spy using IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'home',
      'intro',
      'philosophy',
      'services',
      'gallery',
      'stories',
      'cinematography',
      'about',
      'destinations',
      'testimonials',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Trigger line slightly below header

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* 1.5-Second Luxury Initial Website Opening Loader with Rexmo Logo */}
      <PageTransitionLoader
        isLoading={isInitialLoading}
        targetPage="home"
        onComplete={() => setIsInitialLoading(false)}
        durationMs={1400}
      />

      {/* Top 2.5px Golden Scroll Reading Progress Bar */}
      <ScrollProgress />

      {/* Luxury Lerping Custom Cursor with Golden Dust Particle Trail (Desktop) */}
      <CustomCursor />

      {/* Subtle Analog Super 8 Film Grain Texture Overlay */}
      <FilmGrain />

      {/* Floating Section Quick-Travel HUD (Desktop right side) */}
      <SectionTracker
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* Top Sticky Luxury Header */}
      <Header
        onOpenInquiry={() => handleOpenInquiry()}
        activePage={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Seamless Single-Page Continuous Experience */}
      <main className="relative z-10 w-full">
        {/* 01. HERO SECTION */}
        <Hero
          onExploreWork={() => scrollToSection('gallery')}
          onOpenInquiry={() => handleOpenInquiry()}
          onWatchCinema={() => scrollToSection('cinematography')}
        />

        {/* 02. INTRO PHILOSOPHY & ARTISTRY */}
        <Intro
          onDiscoverStudio={() => scrollToSection('about')}
        />

        {/* LUXURY INFINITE MARQUEE TICKER TAPE */}
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

        {/* 03. OPTICAL PHILOSOPHY & COLOR GRADING COMPARISON */}
        <Philosophy />

        {/* 04. CURATED SERVICES & COMMISSIONS */}
        <Services
          onSelectService={handleSelectService}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 05. FULL-WIDTH KINETIC 3D FINE ART GALLERY SHOWCASE */}
        <Gallery onNavigate={scrollToSection} />

        {/* 06. ARCHIVAL LOVE STORIES */}
        <FeaturedStories onOpenInquiry={handleOpenInquiry} />

        {/* 07. CINEMATOGRAPHY SUITE WITH INLINE 4K REELS */}
        <Cinematography onOpenInquiry={handleOpenInquiry} />

        {/* 08. STUDIO HERITAGE & FOUNDERS TIMELINE */}
        <About onOpenInquiry={() => handleOpenInquiry()} />

        {/* 09. DESTINATIONS DIRECTORY & MAP LOCATOR */}
        <Destinations onOpenInquiry={handleOpenInquiry} />

        {/* 10. PATRON TESTIMONIALS & CLIENT PRAISES */}
        <Testimonials />

        {/* 11. COMMISSIONS INQUIRY & RESERVATIONS */}
        <Contact initialService={selectedServiceForInquiry} />
      </main>

      {/* Global Universal Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Quick Modal Inquiry */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultService={selectedServiceForInquiry}
      />

      {/* Floating Concierge WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
