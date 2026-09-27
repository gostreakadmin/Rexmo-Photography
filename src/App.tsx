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
import type { ServiceItem } from './data/rexmoData';

export function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('WEDDINGS');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track active section on scroll
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
      const scrollPosition = window.scrollY + 200;

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

  // Handle initial hash and query param navigation (?to=section or ?y=offset)
  useEffect(() => {
    const handleNavigation = () => {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to') || window.location.hash.replace('#', '');
      const y = params.get('y');

      if (y) {
        window.scrollTo(0, parseInt(y, 10));
      } else if (to) {
        const element = document.getElementById(to);
        if (element) {
          window.scrollTo(0, element.offsetTop - 80);
        }
      }
    };

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForInquiry(serviceName);
    }
    setInquiryModalOpen(true);
  };

  const handleExploreWork = () => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDiscoverStudio = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForInquiry(service.title);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717] font-sans selection:bg-[#A58A62] selection:text-white relative">
      {/* Top 2.5px Golden Scroll Reading Progress Bar */}
      <ScrollProgress />

      {/* Luxury Lerping Custom Cursor (Desktop only, auto-disabled on touch) */}
      <CustomCursor />

      {/* Subtle Analog Super 8 Film Grain Texture */}
      <FilmGrain />

      {/* Top Sticky Header */}
      <Header
        onOpenInquiry={() => handleOpenInquiry()}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Full-screen Cinematic Hero */}
        <Hero
          onExploreWork={handleExploreWork}
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* 2. Editorial Introduction */}
        <Intro
          onDiscoverStudio={handleDiscoverStudio}
        />

        {/* Luxury Infinite Marquee Ticker 1 */}
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

        {/* 3. Cinematic Nostalgia & Philosophy (Includes Interactive Color Grade Slider) */}
        <Philosophy />

        {/* 4. Curated Collections & Services */}
        <Services
          onSelectService={handleSelectService}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 5. Featured Gallery & Archives with Lightbox */}
        <Gallery />

        {/* 6. Featured Archival Love Stories Monograph */}
        <FeaturedStories
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 7. Cinematic Motion & Wedding Films */}
        <Cinematography
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 7. About Us & Heritage Timeline (Francis Jeya Balan & Jesley Frantin) */}
        <About
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* 8. Destinations Directory (South India & International) */}
        <Destinations
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Luxury Infinite Marquee Ticker 2: Global Destinations */}
        <MarqueeTicker
          direction="right"
          speedSeconds={40}
          variant="subtle"
          items={[
            'TAMIL NADU',
            'KERALA',
            'KARNATAKA',
            'DUBAI',
            'ABU DHABI',
            'LONDON',
            'PARIS',
            'MALDIVES',
            'SINGAPORE',
            'ARCHIVAL FINE ART BOOKS'
          ]}
        />

        {/* 9. Authentic Client Testimonials */}
        <Testimonials />

        {/* 10. Contact & Final Reservation Brief */}
        <Contact
          initialService={selectedServiceForInquiry}
        />
      </main>

      {/* Footer */}
      <Footer />

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
