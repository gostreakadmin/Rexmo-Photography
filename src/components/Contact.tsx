import { useState, type FC, type FormEvent } from 'react';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO, SERVICES_DATA } from '../data/rexmoData';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

interface ContactProps {
  initialService?: string;
}

export const Contact: FC<ContactProps> = ({ initialService = '' }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'WEDDINGS',
    eventDate: '',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    soundEngine.playGoldenChime();
    setSubmitted(true);

    // Build pre-filled WhatsApp text
    const text = encodeURIComponent(
      `Hello Jesley,\n\nI would like to inquire about photography services.\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Collection:* ${formData.service}\n*Event Date:* ${formData.eventDate || 'Flexible'}\n*Location:* ${formData.location || 'Not specified'}\n\n*Message:* ${formData.message}`
    );

    // Automatically trigger direct WhatsApp dispatch
    window.open(`https://wa.me/919442788952?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FFFFFF] border-t border-[#E7E4DE] relative">
      <div className="w-full max-w-[96vw] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">10</span>
              <span>/</span>
              <span>{t('contact.tag', 'COMMISSIONS & INQUIRIES')}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              {t('contact.title1', 'YOUR STORY')} <br />
              <span className="italic font-normal text-[#A58A62]">
                {t('contact.title2', 'STARTS HERE.')}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed font-light">
            "{t('contact.quote', "Let's create something timeless together.")}" <br />
            Share your vision and timeline. We accept a limited number of celebrations each season to ensure a deeply curated experience.
          </p>
        </div>

        {/* 2-Column Split: Info on Left, Inquiry Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16">
          
          {/* Left Column: Direct Studio Contact (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#A58A62] block">
                DIRECT STUDIO CONNECTIONS
              </span>

              {/* Direct WhatsApp Box */}
              <div 
                className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-colors shadow-sm"
                onMouseEnter={() => soundEngine.playShutterClick()}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#6F6F6F]">
                      FASTEST RESPONSE
                    </span>
                    <h3 className="font-serif text-lg text-[#171717]">WhatsApp Concierge</h3>
                  </div>
                </div>
                <p className="text-xs text-[#6F6F6F] mb-4 font-light">
                  Direct communication with Creative Director Jesley Frantin.
                </p>
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playGoldenChime()}
                  className="inline-flex items-center space-x-2 text-xs uppercase font-mono tracking-widest text-[#171717] hover:text-[#A58A62] font-semibold"
                >
                  <span>{t('contact.whatsapp_btn', 'CHAT ON WHATSAPP (+91 94427 88952)')}</span>
                  <span>→</span>
                </a>
              </div>

              {/* Direct Email Box */}
              <div 
                className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-colors shadow-sm"
                onMouseEnter={() => soundEngine.playShutterClick()}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#6F6F6F]">
                      OFFICIAL INQUIRIES
                    </span>
                    <h3 className="font-serif text-lg text-[#171717]">Direct Studio Email</h3>
                  </div>
                </div>
                <p className="text-xs text-[#6F6F6F] mb-4 font-light">
                  For detailed briefs, RFP proposals, and moodboard submissions.
                </p>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  onClick={() => soundEngine.playGoldenChime()}
                  className="inline-flex items-center space-x-2 text-xs uppercase font-mono tracking-widest text-[#171717] hover:text-[#A58A62] font-semibold"
                >
                  <span>{STUDIO_INFO.email}</span>
                  <span>→</span>
                </a>
              </div>

              {/* Physical Studio Address */}
              <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#6F6F6F]">
                      HEADQUARTERS
                    </span>
                    <h3 className="font-serif text-lg text-[#171717]">Kanyakumari Studio</h3>
                  </div>
                </div>
                <p className="text-xs text-[#171717] leading-relaxed font-mono">
                  {STUDIO_INFO.address.line1} <br />
                  {STUDIO_INFO.address.area}, {STUDIO_INFO.address.district} <br />
                  {STUDIO_INFO.address.state}, {STUDIO_INFO.address.pincode}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7E4DE] text-[11px] font-mono text-[#6F6F6F]">
              <span>OFFICE HOURS: MON — SAT (10:00 AM — 08:00 PM IST)</span>
            </div>
          </div>

          {/* Right Column: Interactive Booking & Inquiry Form (7 cols) wrapped in 3D Tilt */}
          <div className="lg:col-span-7">
            <TiltCard maxTilt={3} scale={1.008} glare={true}>
              <div className="bg-[#F7F6F2] border border-[#E7E4DE] p-8 sm:p-12 shadow-sm">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 size={48} className="text-[#A58A62] mx-auto animate-bounce" />
                    <h3 className="font-serif text-3xl text-[#171717] font-light">
                      Thank You For Your Inquiry
                    </h3>
                    <p className="text-sm text-[#6F6F6F] max-w-md mx-auto leading-relaxed font-light">
                      Your details have been recorded and WhatsApp has opened to connect you directly with Jesley Frantin. We review every brief personally within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-mono uppercase tracking-widest text-[#A58A62] hover:underline"
                      >
                        SUBMIT ANOTHER INQUIRY
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#A58A62] block mb-2">
                        RESERVATION BRIEF
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-light">
                        {t('contact.form_title', 'Commission A Session')}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                          {t('contact.name', 'Full Name')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                          {t('contact.email', 'Email Address')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. eleanor@vance.com"
                          className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone / WhatsApp */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                          {t('contact.phone', 'Phone / WhatsApp')} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors"
                        />
                      </div>

                      {/* Service Category */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                          {t('contact.service', 'Collection / Service')} *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors"
                        >
                          {SERVICES_DATA.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.number} — {s.title} ({s.subtitle})
                            </option>
                          ))}
                          <option value="Destination Wedding">Destination Wedding Commission</option>
                          <option value="Cinema Film Only">Cinematography / Wedding Film</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Event Date */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                          {t('contact.date', 'Estimated Date / Month')}
                        </label>
                        <input
                          type="text"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          placeholder="e.g. November 2026 or Spring"
                          className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors"
                        />
                      </div>

                      {/* City / Venue */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                          {t('contact.city', 'Event City or Destination')}
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Chennai, Kovalam, or Dubai"
                          className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message / Vision */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                        {t('contact.message', 'Tell Us About Your Vision & Celebration')}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share your wedding timeline, venues, aesthetic preferences, and any meaningful details..."
                        className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group w-full py-4 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#A58A62] transition-colors flex items-center justify-center space-x-3 shadow-md shimmer-hover relative overflow-hidden"
                    >
                      <span>{t('contact.submit', 'SUBMIT COMMISSION REQUEST →')}</span>
                      <Send size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                    </button>

                    <p className="text-[10px] font-mono text-[#6F6F6F] text-center uppercase tracking-wider">
                      CONFIDENTIAL & SECURE • DIRECT RESPONSE WITHIN 24 HOURS
                    </p>
                  </form>
                )}
              </div>
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
};
