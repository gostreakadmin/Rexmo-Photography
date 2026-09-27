import { useState, type FC, type FormEvent } from 'react';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO, SERVICES_DATA } from '../data/rexmoData';

interface ContactProps {
  initialService?: string;
}

export const Contact: FC<ContactProps> = ({ initialService = '' }) => {
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">10</span>
              <span>/</span>
              <span>COMMISSIONS & INQUIRIES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              YOUR STORY <br />
              <span className="italic font-normal text-[#A58A62]">STARTS HERE.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed">
            "Let's create something timeless together." <br />
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
              <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-colors">
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
                <p className="text-xs text-[#6F6F6F] mb-4">
                  Direct communication with Creative Director Jesley Frantin.
                </p>
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs uppercase font-mono tracking-widest text-[#171717] hover:text-[#A58A62] font-semibold"
                >
                  <span>CHAT ON WHATSAPP ({STUDIO_INFO.phoneFormatted})</span>
                  <span>→</span>
                </a>
              </div>

              {/* Direct Email Box */}
              <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE] hover:border-[#A58A62] transition-colors">
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
                <p className="text-xs text-[#6F6F6F] mb-4">
                  For detailed briefs, RFP proposals, and moodboard submissions.
                </p>
                <a
                  href={`mailto:${STUDIO_INFO.email}`}
                  className="inline-flex items-center space-x-2 text-xs uppercase font-mono tracking-widest text-[#171717] hover:text-[#A58A62] font-semibold"
                >
                  <span>{STUDIO_INFO.email}</span>
                  <span>→</span>
                </a>
              </div>

              {/* Physical Studio Address */}
              <div className="p-6 bg-[#F7F6F2] border border-[#E7E4DE]">
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

          {/* Right Column: Interactive Booking & Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7F6F2] border border-[#E7E4DE] p-8 sm:p-12 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 size={48} className="text-[#A58A62] mx-auto animate-bounce" />
                <h3 className="font-serif text-3xl text-[#171717] font-light">
                  Thank You For Your Inquiry
                </h3>
                <p className="text-sm text-[#6F6F6F] max-w-md mx-auto leading-relaxed">
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
                    Commission A Session
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                      Full Name *
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
                      Email Address *
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
                      Phone / WhatsApp *
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
                      Collection / Service
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
                      <option value="Cinematography Only">06 — WEDDING CINEMATOGRAPHY ONLY</option>
                      <option value="Destination Commission">07 — INTERNATIONAL DESTINATION</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Event Date */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                      Estimated Date / Month
                    </label>
                    <input
                      type="text"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      placeholder="e.g. November 2026 or Spring"
                      className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                      Event City or Destination
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

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#171717]">
                    Tell Us About Your Vision & Celebration
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any special venues, cultural rituals, aesthetic preferences, or guest size..."
                    className="w-full px-4 py-3 bg-white border border-[#E7E4DE] focus:border-[#A58A62] focus:outline-none text-xs text-[#171717] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>SEND INQUIRY VIA WHATSAPP</span>
                    <Send size={14} />
                  </button>

                  <a
                    href={`mailto:${STUDIO_INFO.email}?subject=Rexmo%20Photography%20Inquiry`}
                    className="w-full sm:w-auto px-6 py-4 border border-[#171717] text-center text-xs uppercase tracking-[0.2em] font-medium text-[#171717] hover:border-[#A58A62] hover:text-[#A58A62] transition-colors"
                  >
                    EMAIL DIRECTLY
                  </a>
                </div>

                <p className="text-[10px] font-mono text-[#6F6F6F] pt-2">
                  CONFIDENTIALITY ASSURED • WE RESPECT YOUR PRIVACY AND NEVER SHARE YOUR DETAILS.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
