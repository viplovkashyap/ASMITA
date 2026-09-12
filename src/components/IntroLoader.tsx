import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Diya } from './Diya';
import { Mandala } from './Mandala';
import { FiligreeDivider, CornerFiligree, IecEmblem } from './Ornament';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diyaRef = useRef<HTMLDivElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const iecRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const enterBtnRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Keep enter screen open or automatically transition after brief pause
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power3.inOut',
            delay: 0.6,
            onComplete,
          });
        },
      });
      timelineRef.current = tl;

      // 1. Initial State
      gsap.set([mandalaRef.current, ornamentRef.current, iecRef.current, titleRef.current, subtitleRef.current, enterBtnRef.current], {
        opacity: 0,
        y: 20,
      });

      // 2. Diya appears in darkness & flame ignites
      tl.fromTo(
        diyaRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
      // 3. Mandala rings radiate outward behind diya
      .to(
        mandalaRef.current,
        { opacity: 0.35, scale: 1, duration: 1, ease: 'power2.out' },
        '-=0.3'
      )
      // 4. Filigree ornaments & corners draw in
      .to(
        ornamentRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
      // 5. IEC College branding
      .to(
        iecRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      // 6. ASMITA typography grand reveal
      .fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.88, letterSpacing: '0.1em' },
        { opacity: 1, scale: 1, letterSpacing: '0.28em', y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      )
      // 7. Ethnic Day script
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      // 8. Invitation Enter CTA
      .to(
        enterBtnRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#100718] text-[#FBF7EE] px-4 overflow-hidden"
    >
      {/* Ornate Corner Accents */}
      <div className="absolute inset-4 sm:inset-8 pointer-events-none border border-[#D4AF55]/20 rounded-lg">
        <CornerFiligree position="tl" className="absolute top-2 left-2" size={48} />
        <CornerFiligree position="tr" className="absolute top-2 right-2" size={48} />
        <CornerFiligree position="bl" className="absolute bottom-2 left-2" size={48} />
        <CornerFiligree position="br" className="absolute bottom-2 right-2" size={48} />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="interactive absolute top-6 right-6 z-50 text-[11px] font-sans-clean tracking-[0.25em] uppercase text-[#D4AF55]/70 hover:text-[#F3D995] transition-colors duration-300 px-3 py-1.5 rounded-full border border-[#D4AF55]/30 hover:border-[#F3D995]"
      >
        Skip Intro ✕
      </button>

      {/* Background Rotating Mandala */}
      <div ref={mandalaRef} className="absolute pointer-events-none">
        <Mandala size={640} opacity={0.3} speedSec={80} />
      </div>

      {/* Main Content Composition */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* The Sacred Diya */}
        <div ref={diyaRef} className="mb-4">
          <Diya size={76} intensity="vibrant" />
        </div>

        {/* IEC College Identity */}
        <div ref={iecRef} className="flex flex-col items-center mb-4">
          <IecEmblem size={44} className="mb-2" />
          <p className="text-[10px] sm:text-xs tracking-[0.3em] font-cinzel text-[#D4AF55] uppercase font-semibold">
            IEC College of Engineering & Technology
          </p>
          <p className="text-[9px] tracking-[0.25em] text-[#FBF7EE]/60 uppercase font-sans-clean mt-0.5">
            Greater Noida · ESTD 1999
          </p>
        </div>

        {/* Ornate Divider */}
        <div ref={ornamentRef} className="w-full my-2">
          <FiligreeDivider width="w-48" />
        </div>

        {/* ASMITA Title */}
        <h1
          ref={titleRef}
          className="font-cinzel text-5xl sm:text-7xl font-extrabold text-gold-gradient asmita-emboss tracking-[0.28em] my-1 select-none"
        >
          ASMITA
        </h1>

        {/* Ethnic Day Calligraphy */}
        <p
          ref={subtitleRef}
          className="font-script text-3xl sm:text-4xl text-[#F3D995] tracking-wider mb-4"
        >
          Ethnic Day
        </p>

        {/* Enter Invitation Note */}
        <div ref={enterBtnRef} className="flex flex-col items-center">
          <p className="text-xs tracking-[0.25em] text-[#FBF7EE]/80 uppercase font-sans-clean mb-4">
            Wednesday, 16 September 2026
          </p>
          <button
            onClick={handleSkip}
            className="interactive group relative px-6 py-2.5 rounded-full border border-[#D4AF55] bg-[#D4AF55]/10 hover:bg-[#D4AF55]/25 text-[#F3D995] text-xs font-sans-clean tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,85,0.25)]"
          >
            Enter The Celebration →
          </button>
        </div>
      </div>
    </div>
  );
};
