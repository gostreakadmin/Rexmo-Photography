import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/rexmoData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3">
      {/* Editorial Tooltip Pill */}
      {showTooltip && (
        <div className="bg-[#171717] text-white px-4 py-2 text-[11px] font-mono tracking-wider uppercase border border-[#A58A62] shadow-xl flex items-center space-x-2 animate-fade-in">
          <span>CHAT WITH CREATIVE DIRECTOR</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={STUDIO_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Direct WhatsApp Concierge"
        className="w-13 h-13 rounded-full bg-[#171717] text-white hover:bg-[#A58A62] border border-[#A58A62]/40 shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group p-3"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
};
