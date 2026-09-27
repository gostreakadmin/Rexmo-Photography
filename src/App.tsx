import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Philosophy } from './components/Philosophy';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Cinematography } from './components/Cinematography';
import { About } from './components/About';
import { Destinations } from './components/Destinations';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
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
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717] font-sans selection:bg-[#A58A62] selection:text-white">
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

        {/* 3. Cinematic Nostalgia & Philosophy */}
        <Philosophy />

        {/* 4. Curated Collections & Services */}
        <Services
          onSelectService={handleSelectService}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 5. Featured Gallery & Archives with Lightbox */}
        <Gallery />

        {/* 6. Cinematic Motion & Wedding Films */}
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
