import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mandala } from './Mandala';
import { Diya } from './Diya';
import { MarigoldGarland } from './MarigoldGarland';
import { FiligreeDivider, CornerFiligree, IecEmblem } from './Ornament';
import { Calendar, MapPin, Sparkles, ArrowDown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onEnterClick: () => void;
  onJoinClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterClick, onJoinClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sweepRef = useRef<HTMLSpanElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Subtle Animated Light Sweep across ASMITA title
      if (sweepRef.current) {
        gsap.fromTo(
          sweepRef.current,
          { x: '-120%', opacity: 0 },
          {
            x: '240%',
            opacity: 0.6,
            duration: 3.5,
            repeat: -1,
            repeatDelay: 4,
            ease: 'power2.inOut',
          }
        );
      }

      // 2. Parallax & Scroll Transition on ScrollTrigger
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              y: -progress * 140,
              opacity: 1 - progress * 1.1,
              scale: 1 - progress * 0.12,
            });
          }
          if (mandalaRef.current) {
            gsap.set(mandalaRef.current, {
              rotation: progress * 65,
              scale: 1 + progress * 0.35,
              opacity: 0.35 - progress * 0.28,
            });
          }
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              y: -progress * 60,
              opacity: 1 - progress * 0.9,
            });
          }
        },
      });

      // 3. Magnetic Hover Effect on CTA Button
      const btn = buttonRef.current;
      if (btn) {
        const handleBtnMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.32,
            y: y * 0.32,
            duration: 0.35,
            ease: 'power2.out',
          });
        };

        const handleBtnMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
          });
        };

        btn.addEventListener('mousemove', handleBtnMouseMove);
        btn.addEventListener('mouseleave', handleBtnMouseLeave);

        return () => {
          btn.removeEventListener('mousemove', handleBtnMouseMove);
          btn.removeEventListener('mouseleave', handleBtnMouseLeave);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden bg-radial from-[#1D0B2E]/60 via-[#160A24] to-[#100718]"
    >
      {/* Hanging Vertical Marigold Garlands from upper left and right */}
      <MarigoldGarland side="left" flowersCount={8} />
      <MarigoldGarland side="right" flowersCount={8} />

      {/* Ornate Framing Border with Corner Filigree */}
      <div className="absolute inset-3 sm:inset-6 md:inset-10 pointer-events-none border border-[#D4AF55]/25 rounded-2xl">
        <CornerFiligree position="tl" className="absolute top-2 left-2" size={48} />
        <CornerFiligree position="tr" className="absolute top-2 right-2" size={48} />
        <CornerFiligree position="bl" className="absolute bottom-2 left-2" size={48} />
        <CornerFiligree position="br" className="absolute bottom-2 right-2" size={48} />
      </div>

      {/* Large Sacred Geometry Mandala behind ASMITA */}
      <div
        ref={mandalaRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none"
      >
        <Mandala size="min(85vw, 750px)" opacity={0.28} speedSec={140} />
      </div>

      {/* Ambient Lighting Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,85,0.08)_0%,rgba(16,7,24,0.75)_70%,rgba(16,7,24,0.98)_100%)]" />

      {/* Central Hero Composition */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        {/* Top College Header & Crest */}
        <div className="flex flex-col items-center mb-6">
          <IecEmblem size={56} className="mb-3" />
          <h2 className="text-xs sm:text-sm md:text-base font-cinzel font-semibold tracking-[0.28em] text-[#F3D995] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            IEC College of Engineering & Technology
          </h2>
          <div className="flex items-center gap-2 mt-1.5 text-[10px] sm:text-xs tracking-[0.24em] text-[#FBF7EE]/70 uppercase font-sans-clean">
            <span>Greater Noida</span>
            <span className="w-1 h-1 rounded-full bg-[#D4AF55]" />
            <span>ESTD 1999</span>
          </div>
          <p className="mt-1 text-[11px] tracking-[0.22em] text-[#D4AF55]/80 uppercase font-sans-clean">
            Presented by Spearheads Student Council
          </p>
        </div>

        {/* SAVE THE DATE Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4AF55]/40 bg-[#160A24]/80 backdrop-blur-sm mb-4 shadow-[0_2px_15px_rgba(212,175,85,0.12)]">
          <Sparkles className="w-3 h-3 text-[#F3D995]" />
          <span className="text-[10px] sm:text-xs font-cinzel font-semibold tracking-[0.3em] text-[#F3D995] uppercase">
            Save The Date
          </span>
          <Sparkles className="w-3 h-3 text-[#F3D995]" />
        </div>

        {/* ENORMOUS ASMITA TITLE WITH METALLIC SHEEN */}
        <div className="relative my-2 select-none" data-cursor="asmita">
          {/* Background duplicate for glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 font-cinzel text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-[0.16em] sm:tracking-[0.2em] text-[#D4AF55] blur-2xl opacity-20"
          >
            ASMITA
          </div>

          <h1
            ref={titleRef}
            className="relative font-cinzel text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-[0.16em] sm:tracking-[0.2em] text-gold-bright asmita-emboss leading-none overflow-hidden"
          >
            ASMITA
            {/* Light Sweep Highlight */}
            <span
              ref={sweepRef}
              className="absolute inset-y-0 w-24 sm:w-36 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-25deg] pointer-events-none"
            />
          </h1>
        </div>

        {/* Elegant Calligraphic "Ethnic Day" */}
        <p className="font-script text-4xl sm:text-6xl md:text-7xl text-[#F3D995] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] -mt-2 sm:-mt-6 mb-6 tracking-wide">
          Ethnic Day
        </p>

        {/* Ornate Filigree Divider */}
        <FiligreeDivider className="w-full max-w-sm mb-6" />

        {/* Event Key Coordinates */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm tracking-[0.22em] text-[#FBF7EE] font-sans-clean uppercase mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#F3D995]" />
            <span className="font-semibold text-[#F3D995]">Wednesday, 16 September 2026</span>
          </div>
          <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-[#D4AF55]/60" />
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F3D995]" />
            <span>Seminar Hall · F Block</span>
          </div>
        </div>

        {/* Poetic Tagline */}
        <p className="font-cormorant italic text-lg sm:text-2xl text-[#FBF7EE]/90 max-w-xl mx-auto mb-8 font-light tracking-wider">
          &ldquo;An evening of culture, tradition &amp; celebration&rdquo;
        </p>

        {/* Bottom Ceremonial Diya & Dual CTA Buttons */}
        <div className="flex flex-col items-center gap-6">
          <Diya size={54} intensity="gentle" />

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full justify-center">
            {/* Primary CTA: JOIN ASMITA */}
            <button
              onClick={onJoinClick}
              className="interactive group relative inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-4 rounded-full border border-[#F3D995] bg-gradient-to-r from-[#D4AF55]/30 via-[#B8892D]/55 to-[#D4AF55]/30 hover:from-[#D4AF55]/50 hover:to-[#B8892D]/75 text-white text-xs sm:text-sm font-sans-clean font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_30px_rgba(212,175,85,0.35)] hover:shadow-[0_6px_40px_rgba(243,217,149,0.55)] min-w-[210px]"
            >
              <span className="relative z-10">JOIN ASMITA</span>
              <ArrowRight className="relative z-10 w-4 h-4 text-[#F3D995] group-hover:text-white transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA: Enter / Explore */}
            <button
              ref={buttonRef}
              onClick={onEnterClick}
              className="interactive group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 rounded-full border border-[#D4AF55]/50 bg-[#160A24]/70 hover:bg-[#1D0B2E] text-[#F3D995] hover:text-white text-xs sm:text-sm font-sans-clean font-medium tracking-[0.22em] uppercase transition-all duration-300 min-w-[210px]"
            >
              <span className="relative z-10">EXPLORE EVENT</span>
              <ArrowDown className="relative z-10 w-4 h-4 text-[#F3D995] group-hover:text-white transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
