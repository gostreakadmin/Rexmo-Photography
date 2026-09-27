import { useState, type FC } from 'react';
import { soundEngine } from '../utils/soundEffects';

interface ApertureBadgeProps {
  size?: number;
  className?: string;
}

export const ApertureBadge: FC<ApertureBadgeProps> = ({ size = 80, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playShutterClick();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="explore"
      className={`relative inline-flex items-center justify-center cursor-pointer select-none group ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      title="Rexmo Optical Lens Aperture - Est. 1992"
    >
      {/* Rotating Circular Text Ring */}
      <svg
        className={`absolute inset-0 w-full h-full text-[#A58A62] transition-transform duration-1000 ${
          isHovered ? 'animate-[spin_4s_linear_infinite]' : 'animate-[spin_24s_linear_infinite]'
        }`}
        viewBox="0 0 100 100"
      >
        <path
          id="apertureTextPath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[7.5px] font-mono tracking-[0.22em] uppercase fill-[#6F6F6F] group-hover:fill-[#A58A62] transition-colors">
          <textPath href="#apertureTextPath">
            • REXMO STUDIO • EST. 1992 • OPTICAL SOUL •
          </textPath>
        </text>
      </svg>

      {/* Center 8-Blade Aperture Blades */}
      <div
        className={`w-8 h-8 rounded-full border border-[#A58A62] flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-500 shadow-sm ${
          isHovered ? 'scale-110 border-[#171717]' : ''
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-5 h-5 text-[#A58A62] group-hover:text-[#171717] transition-all duration-700 ${
            isHovered ? 'rotate-90 scale-95' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Geometric Aperture Blades */}
          <circle cx="12" cy="12" r="10" stroke="#E7E4DE" />
          <path d="m14.31 8 5.74 9.94" />
          <path d="M9.69 8h11.48" />
          <path d="m7.38 12 5.74-9.94" />
          <path d="M9.69 16 3.95 6.06" />
          <path d="M14.31 16H2.83" />
          <path d="m16.62 12-5.74 9.94" />
          {/* Central f-stop dot */}
          <circle cx="12" cy="12" r="1.5" fill="#A58A62" />
        </svg>
      </div>
    </div>
  );
};
