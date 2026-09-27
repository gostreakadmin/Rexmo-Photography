import { useState, type FC, type FormEvent } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/rexmoData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const InquiryModal: FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'WEDDINGS'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService,
    eventDate: '',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const text = encodeURIComponent(
      `Hello Jesley,\n\nI would like to inquire about Rexmo Photography services.\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Collection:* ${formData.service}\n*Date:* ${formData.eventDate || 'Flexible'}\n*Location:* ${formData.location || 'TBD'}\n\n*Notes:* ${formData.message}`
    );

    window.open(`https://wa.me/919442788952?text=${text}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div className="bg-[#F7F6F2] border border-[#E7E4DE] max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 text-[#171717] hover:text-[#A58A62] p-2"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 size={44} className="text-[#A58A62] mx-auto animate-bounce" />
            <h3 className="font-serif text-3xl text-[#171717] font-light">
              Inquiry Dispatched
            </h3>
            <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed">
              WhatsApp has opened with your reservation details. Jesley Frantin or our lead studio concierge will respond shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-mono hover:bg-[#A58A62] transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#A58A62] block mb-1">
                RESERVATION REQUEST
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-light">
                Begin Your Journey
              </h3>
              <p className="text-xs text-[#6F6F6F] mt-1 font-light">
                Share your details below to receive our bespoke collection pricing guide.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#171717] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 bg-white border border-[#E7E4DE] text-xs text-[#171717] focus:border-[#A58A62] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#171717] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@address.com"
                    className="w-full px-4 py-2.5 bg-white border border-[#E7E4DE] text-xs text-[#171717] focus:border-[#A58A62] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#171717] block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 94427 88952"
                    className="w-full px-4 py-2.5 bg-white border border-[#E7E4DE] text-xs text-[#171717] focus:border-[#A58A62] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#171717] block mb-1">
                    Desired Collection
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-[#E7E4DE] text-xs text-[#171717] focus:border-[#A58A62] focus:outline-none"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.number} — {s.title}
                      </option>
                    ))}
                    <option value="Cinematography">06 — CINEMATOGRAPHY ONLY</option>
                    <option value="Custom Destination">07 — INTERNATIONAL DESTINATION</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#171717] block mb-1">
                    Event Date / Month
                  </label>
                  <input
                    type="text"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    placeholder="e.g. November 2026"
                    className="w-full px-4 py-2.5 bg-white border border-[#E7E4DE] text-xs text-[#171717] focus:border-[#A58A62] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#171717] block mb-1">
                  Location / Destination City
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Chennai, Kovalam, Dubai"
                  className="w-full px-4 py-2.5 bg-white border border-[#E7E4DE] text-xs text-[#171717] focus:border-[#A58A62] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#171717] block mb-1">
                  Celebration Vision or Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe your celebration..."
                  className="w-full px-4 py-2.5 bg-white border border-[#E7E4DE] text-xs text-[#171717] focus:border-[#A58A62] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors flex items-center justify-center space-x-2"
              >
                <span>SEND DIRECT VIA WHATSAPP</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
