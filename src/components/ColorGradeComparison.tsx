import { useState, useRef, useCallback, useEffect, type FC } from 'react';
import { Sliders, Sparkles } from 'lucide-react';

export const ColorGradeComparison: FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="mt-16 bg-white border border-[#E7E4DE] p-6 sm:p-10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#E7E4DE] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#A58A62] uppercase mb-1">
            <Sparkles size={13} />
            <span>INTERACTIVE MASTER GRADE COMPARISON</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-light">
            The Rexmo Alchemy: Raw Capture to Fine-Art Heirloom
          </h3>
        </div>
        <p className="text-xs text-[#6F6F6F] max-w-xs font-mono uppercase tracking-wider">
          Drag slider horizontally to reveal color grading discipline
        </p>
      </div>

      {/* Comparison Canvas Container */}
      <div
        ref={containerRef}
        data-cursor="explore"
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#171717] mt-8 cursor-ew-resize select-none border border-[#E7E4DE]"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Layer 1: Left / Raw Capture (Desaturated, Flat Log Profile) */}
        <div className="absolute inset-0">
          <img
            src="images/cinematic-nostalgia.jpg"
            alt="Unedited Raw Log Sensor Capture"
            className="w-full h-full object-cover filter contrast-[0.80] brightness-[1.08] saturate-[0.55]"
            draggable={false}
          />
          {/* Label: Raw */}
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-sm text-white px-3 py-1 font-mono text-[10px] tracking-widest uppercase border border-white/20">
            RAW CAMERA PROFILE (FLAT LOG)
          </div>
        </div>

        {/* Layer 2: Right / Rexmo Warm Signature Grade (Clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src="images/cinematic-nostalgia.jpg"
            alt="Rexmo Signature Kodak Emulsion Fine-Art Grade"
            className="w-full h-full object-cover filter contrast-[1.12] saturate-[1.15] sepia-[0.10]"
            draggable={false}
          />
          {/* Label: Signature Grade */}
          <div className="absolute top-4 right-4 bg-[#A58A62] text-white px-3 py-1 font-mono text-[10px] tracking-widest uppercase shadow-md">
            REXMO SIGNATURE WARM GRADE
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#171717] border-2 border-[#A58A62] flex items-center justify-center text-white shadow-xl">
            <Sliders size={15} className="text-[#A58A62] rotate-90" />
          </div>
        </div>

        {/* Instructions pill bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full font-mono text-[9px] tracking-widest uppercase pointer-events-none">
          SLIDE TO COMPARE GRADES
        </div>
      </div>

      {/* Technical Footnote */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-xs text-[#6F6F6F] border-t border-[#E7E4DE] mt-6">
        <div>
          <span className="font-mono text-[#A58A62] block mb-1">01 / DYNAMIC RANGE</span>
          <p>Preserving micro-shadows in silk attire and rich ceremonial textures.</p>
        </div>
        <div>
          <span className="font-mono text-[#A58A62] block mb-1">02 / SKIN TONE FIDELITY</span>
          <p>Tuned specifically for diverse Indian complexions and natural warm undertones.</p>
        </div>
        <div>
          <span className="font-mono text-[#A58A62] block mb-1">03 / KODAK FILM CURVE</span>
          <p>Subtle highlight roll-off reminiscent of vintage 35mm motion picture negative.</p>
        </div>
      </div>
    </div>
  );
};
