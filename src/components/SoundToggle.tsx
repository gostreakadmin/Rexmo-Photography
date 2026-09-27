import { useState, useEffect, type FC } from 'react';
import { VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export const SoundToggle: FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [enabled, setEnabled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setEnabled(soundEngine.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = soundEngine.toggle();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      title={enabled ? 'Mute Studio Sound FX' : 'Enable Mechanical Shutter Sound FX'}
      aria-label="Toggle Studio Sounds"
      className={`group flex items-center space-x-2 font-mono text-[11px] uppercase tracking-wider transition-all border border-[#E7E4DE] bg-white/80 backdrop-blur-sm px-2.5 py-1.5 shadow-sm ${
        enabled
          ? 'text-[#A58A62] border-[#A58A62]/40 bg-[#F7F6F2]'
          : 'text-[#6F6F6F] hover:text-[#171717]'
      } ${compact ? 'text-[10px] px-2 py-1' : ''}`}
    >
      {enabled ? (
        <>
          <div className="flex items-end space-x-0.5 h-3">
            <span className="w-0.5 bg-[#A58A62] animate-[float-slow_0.6s_ease-in-out_infinite] h-2" />
            <span className="w-0.5 bg-[#A58A62] animate-[float-slow_0.9s_ease-in-out_infinite_0.15s] h-3" />
            <span className="w-0.5 bg-[#A58A62] animate-[float-slow_0.7s_ease-in-out_infinite_0.3s] h-1.5" />
          </div>
          <span className="hidden sm:inline font-mono">{t('sound.on', 'SOUND: ON')}</span>
        </>
      ) : (
        <>
          <VolumeX size={13} className="text-[#6F6F6F] group-hover:text-[#171717]" />
          <span className="hidden sm:inline font-mono">{t('sound.off', 'SOUND: OFF')}</span>
        </>
      )}
    </button>
  );
};
