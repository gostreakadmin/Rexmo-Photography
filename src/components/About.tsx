import type { FC } from 'react';
import { TIMELINE_DATA } from '../data/rexmoData';
import { TiltCard } from './TiltCard';
import { TextReveal } from './TextReveal';
import { CurtainReveal } from './CurtainReveal';
import { Magnetic } from './Magnetic';
import { useLanguage } from '../context/LanguageContext';
import { soundEngine } from '../utils/soundEffects';

interface AboutProps {
  onOpenInquiry: () => void;
}

export const About: FC<AboutProps> = ({ onOpenInquiry }) => {
  const { t } = useLanguage();

  const handleInquire = () => {
    soundEngine.playGoldenChime();
    onOpenInquiry();
  };

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#F7F6F2] border-t border-[#E7E4DE] relative">
      <div className="w-full max-w-[96vw] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#E7E4DE] gap-6">
          <div>
            <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#6F6F6F] uppercase mb-3">
              <span className="text-[#A58A62] font-bold">07</span>
              <span>/</span>
              <span>{t('about.tag', 'HERITAGE & CONTINUITY')}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] tracking-tight">
              <TextReveal text={t('about.title1', 'A LEGACY')} delay={100} />
              <br />
              <span className="italic font-normal text-[#A58A62]">
                <TextReveal text={t('about.title2', 'SINCE 1992')} delay={250} />
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#6F6F6F] leading-relaxed font-light">
            Over three decades of unyielding devotion to fine-art wedding storytelling, passing the torch 
            from founder to creative director with unbroken fidelity.
          </p>
        </div>

        {/* Dual Leader Editorial Profile Cards wrapped in 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-16">
          
          {/* Card 1: Founder Francis Jeya Balan */}
          <TiltCard maxTilt={5} scale={1.01} glare={true}>
            <div className="group bg-white border border-[#E7E4DE] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow relative h-full">
              <div>
                <CurtainReveal color="gold" delay={150} direction="right">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE7DF] border border-[#E7E4DE] mb-6">
                    <img
                      src="images/founder-francis.jpg"
                      alt="Francis Jeya Balan - Founder of Rexmo Photography"
                      loading="lazy"
                      className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:filter-none transition-all duration-700"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#171717]/85 backdrop-blur-sm text-white px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
                      FOUNDER • 1992
                    </div>
                  </div>
                </CurtainReveal>

                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-[#A58A62] uppercase block">
                    THE FOUNDATION
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171717]">
                    Francis Jeya Balan
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F]">
                    {t('about.founder_title', 'Founder & Master Photographer')}
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#6F6F6F] leading-relaxed font-light">
                  <p>
                    Francis Jeya Balan founded Rexmo in 1992 with a deep passion for wedding photography, dedicating himself to documenting life's most meaningful celebrations with elegance and emotion.
                  </p>
                  <p>
                    His commitment to excellence, discipline, and artistic integrity laid an enduring foundation for the brand. Though he is no longer with us, his vision for timeless and refined wedding storytelling continues to inspire every single shutter click.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7E4DE] text-xs font-serif italic text-[#171717]">
                "Rexmo stands today as a living tribute to his legacy—classic, graceful, and enduring."
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Creative Director Jesley Frantin */}
          <TiltCard maxTilt={5} scale={1.01} glare={true}>
            <div className="group bg-white border border-[#E7E4DE] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow relative h-full">
              <div>
                <CurtainReveal color="dark" delay={250} direction="left">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE7DF] border border-[#E7E4DE] mb-6">
                    <img
                      src="images/director-jesley.jpg"
                      alt="Jesley Frantin - Creative Director of Rexmo Photography"
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#A58A62] text-white px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
                      CREATIVE DIRECTION
                    </div>
                  </div>
                </CurtainReveal>

                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-[#A58A62] uppercase block">
                    THE CONTEMPORARY VISION
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171717]">
                    Jesley Frantin
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#6F6F6F]">
                    {t('about.director_title', 'Creative Director & Lead Cinematographer')}
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#6F6F6F] leading-relaxed font-light">
                  <p>
                    {t('about.director_p1', "Carrying his father's torch forward, Jesley combines three decades of studio heritage with modern European editorial styling and cinematic pacing.")}
                  </p>
                  <p>
                    {t('about.director_p2', 'Trained in visual arts and cinematography, he oversees every major commission personally—from color grading each master file to crafting bespoke royal wedding collections.')}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7E4DE] text-xs font-serif italic text-[#171717]">
                "Our philosophy is simple: create images that our couples' grandchildren will admire with equal wonder."
              </div>
            </div>
          </TiltCard>

        </div>

        {/* Timeline Section */}
        <div className="pt-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#A58A62] block mb-2">
              HERITAGE TIMELINE
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#171717]">
              Thirty-Four Years of Preservation
            </h3>
          </div>

          <div className="relative border-l border-[#E7E4DE] ml-4 sm:ml-8 md:mx-auto md:max-w-3xl space-y-12 pl-6 sm:pl-8">
            {TIMELINE_DATA.map((milestone) => (
              <div key={milestone.year} className="relative group">
                {/* Year Marker Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#EAE7DF] border-2 border-[#A58A62] group-hover:bg-[#A58A62] group-hover:scale-125 transition-all shadow-sm" />

                <div className="bg-white border border-[#E7E4DE] p-6 sm:p-8 hover:border-[#A58A62] hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs sm:text-sm text-[#A58A62] font-semibold tracking-wider">
                      {milestone.year}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#6F6F6F] uppercase">
                      {milestone.title}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#171717] font-light mb-2">
                    {milestone.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed mb-4 font-light">
                    {milestone.description}
                  </p>
                  {milestone.quote && (
                    <blockquote className="border-l-2 border-[#A58A62] pl-3 text-xs font-serif italic text-[#171717]/80">
                      "{milestone.quote}"
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20 p-8 sm:p-10 bg-white border border-[#E7E4DE] text-center max-w-2xl mx-auto space-y-4 shadow-sm">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#A58A62]">
            PRESERVING YOUR MOMENTS
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-light">
            Ready to entrust your story to our studio?
          </h3>
          <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
            We accept a limited number of celebrations each season to ensure uncompromising artistic focus.
          </p>
          <div className="pt-2">
            <Magnetic strength={0.3} radius={70}>
              <button
                onClick={handleInquire}
                className="px-8 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#A58A62] transition-colors shimmer-hover relative overflow-hidden shadow-sm inline-block"
              >
                {t('about.cta', 'INQUIRE FOR YOUR DATE →')}
              </button>
            </Magnetic>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
