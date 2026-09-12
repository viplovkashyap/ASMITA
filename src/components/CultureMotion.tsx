import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaisleyMotif, LotusMotif, FiligreeDivider } from './Ornament';
import { Mandala } from './Mandala';
import { ChevronLeft, ChevronRight, ArrowDown, MoveHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CultureItem {
  id: string;
  word: string;
  sub: string;
  description: string;
  hindi: string;
  icon: 'paisley' | 'lotus' | 'mandala';
  highlight: string;
}

const culturalWords: CultureItem[] = [
  {
    id: 'culture',
    word: 'CULTURE',
    hindi: 'संस्कृति',
    sub: 'The Living Tapestry',
    description: 'A timeless symphony of regional languages, ceremonial attire, ritual floor arts, and ancestral philosophies passed down through centuries.',
    icon: 'mandala',
    highlight: 'Heritage & Roots',
  },
  {
    id: 'tradition',
    word: 'TRADITION',
    hindi: 'परंपरा',
    sub: 'Rooted in Reverence',
    description: 'Preserving sacred craft, artisanal handloom weaves, classical ragas, and ceremonial diya flames that connect generations in unbroken continuity.',
    icon: 'paisley',
    highlight: 'Eternal Flame',
  },
  {
    id: 'identity',
    word: 'IDENTITY',
    hindi: 'पहचान',
    sub: 'Soul of ASMITA',
    description: 'Honoring individual pride, regional lineage, and the unmistakable dignity of our roots. ASMITA is the mirror in which your culture shines.',
    icon: 'lotus',
    highlight: 'Individual Pride',
  },
  {
    id: 'heritage',
    word: 'HERITAGE',
    hindi: 'विरासत',
    sub: 'Vedic & Royal Splendor',
    description: 'Woven Banarasi brocades, terracotta crafts, Rajputana arches, and timeless narratives etched forever in stone and memory.',
    icon: 'mandala',
    highlight: 'Architectural Grace',
  },
  {
    id: 'celebration',
    word: 'CELEBRATION',
    hindi: 'उत्सव',
    sub: 'Rhythm of Colors',
    description: 'High-energy dhol beats, swirling lehenga skirts, shared smiles, and the heady scent of fresh marigolds filling the Seminar Hall.',
    icon: 'paisley',
    highlight: 'Joy & Music',
  },
  {
    id: 'together',
    word: 'TOGETHER',
    hindi: 'एकता',
    sub: 'One Vibrant Campus',
    description: 'Engineering minds, visionary faculty, and student councils from across India uniting in collective warmth under one glorious celebratory roof.',
    icon: 'lotus',
    highlight: 'Unity in Diversity',
  },
];

export const CultureMotion: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  // Helper to get total horizontal scroll distance
  const getScrollDistance = useCallback(() => {
    if (!trackRef.current) return window.innerWidth * 1.8;
    return Math.max(600, trackRef.current.scrollWidth - window.innerWidth + 120);
  }, []);

  // Desktop Pinned Horizontal Scroll with GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        // Reset track position before re-measuring
        gsap.set(track, { x: 0 });

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'culture-scroll-trigger',
            trigger: container,
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollProgress(p);
              const idx = Math.min(
                culturalWords.length - 1,
                Math.floor(p * (culturalWords.length + 0.5))
              );
              setActiveCardIndex(idx);
            },
          },
        });

        // Horizontal Trackpad / Shift+Wheel translation to vertical page scroll
        const handleWheel = (e: WheelEvent) => {
          // If user scrolls horizontally on a trackpad or shifts wheel
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) {
            e.preventDefault();
            window.scrollBy({ top: e.deltaX * 1.1, behavior: 'auto' });
          }
        };

        const containerEl = containerRef.current;
        if (containerEl) {
          containerEl.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
          if (containerEl) {
            containerEl.removeEventListener('wheel', handleWheel);
          }
          if (tween.scrollTrigger) {
            tween.scrollTrigger.kill();
          }
        };
      });
    }, sectionRef);

    // Refresh ScrollTrigger once fonts and layout have fully settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [getScrollDistance]);

  // Navigate to a specific card via smooth scrolling
  const scrollToCard = (index: number) => {
    // Check if on desktop with ScrollTrigger
    const st = ScrollTrigger.getById('culture-scroll-trigger');
    if (st && window.innerWidth >= 768) {
      const step = (st.end - st.start) / culturalWords.length;
      const targetScroll = st.start + index * step + 15;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else if (mobileScrollRef.current) {
      // Mobile horizontal snap scroll
      const container = mobileScrollRef.current;
      const cardWidth = container.offsetWidth * 0.88;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setActiveCardIndex(index);
    }
  };

  const handleNext = () => {
    const nextIdx = Math.min(culturalWords.length - 1, activeCardIndex + 1);
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, activeCardIndex - 1);
    scrollToCard(prevIdx);
  };

  const handleSkipToAttire = () => {
    const attireEl = document.getElementById('attire');
    if (attireEl) {
      attireEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mouse Drag to Scroll (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = window.scrollY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    // Drag left means scroll forward (down); drag right means scroll backward (up)
    window.scrollTo({
      top: dragStartScroll.current - deltaX * 1.5,
      behavior: 'auto',
    });
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Mobile horizontal scroll listener for pagination dots
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, offsetWidth } = mobileScrollRef.current;
    const cardWidth = offsetWidth * 0.88;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(culturalWords.length - 1, Math.max(0, index)));
  };

  return (
    <section
      id="culture-motion"
      ref={sectionRef}
      className="relative bg-[#160A24] overflow-hidden select-none"
    >
      {/* ======================= DESKTOP PINNED VIEW (>= 768px) ======================= */}
      <div
        ref={containerRef}
        className="hidden md:block w-full min-h-screen relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {/* Top Header Bar with Live Scrubber & Navigation Controls */}
        <div className="pt-20 pb-3 px-8 lg:px-12 flex items-center justify-between border-b border-[#D4AF55]/20 bg-[#100718]/90 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#F3D995] animate-ping" />
            <h2 className="text-xs lg:text-sm font-cinzel tracking-[0.28em] text-[#D4AF55] uppercase font-bold">
              CULTURE IN MOTION
            </h2>
            <span className="hidden lg:inline-block text-[11px] font-sans-clean text-[#FBF7EE]/40 tracking-widest pl-2">
              · THE ETHOS OF ASMITA
            </span>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Card Navigator Dots */}
            <div className="hidden lg:flex items-center gap-1.5 bg-[#160A24]/90 px-3 py-1.5 rounded-full border border-[#D4AF55]/30">
              {culturalWords.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => scrollToCard(idx)}
                  className={`interactive px-2 py-0.5 rounded-full text-[10px] font-cinzel font-semibold tracking-wider transition-all duration-200 ${
                    activeCardIndex === idx
                      ? 'bg-[#D4AF55] text-[#100718] shadow-[0_0_10px_rgba(212,175,85,0.4)]'
                      : 'text-[#FBF7EE]/60 hover:text-[#F3D995]'
                  }`}
                  aria-label={`Jump to ${item.word}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={activeCardIndex === 0}
                className="interactive p-2 rounded-full border border-[#D4AF55]/40 bg-[#160A24]/80 text-[#F3D995] hover:bg-[#D4AF55]/20 hover:border-[#F3D995] disabled:opacity-30 disabled:pointer-events-none transition-all"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={activeCardIndex === culturalWords.length - 1}
                className="interactive p-2 rounded-full border border-[#D4AF55]/40 bg-[#160A24]/80 text-[#F3D995] hover:bg-[#D4AF55]/20 hover:border-[#F3D995] disabled:opacity-30 disabled:pointer-events-none transition-all"
                aria-label="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Drag Hint Pill */}
            <div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D4AF55]/20 bg-[#100718]/60 text-[10px] tracking-wider text-[#FBF7EE]/60 uppercase">
              <MoveHorizontal className="w-3 h-3 text-[#D4AF55]" />
              <span>Scroll or Drag</span>
            </div>
          </div>
        </div>

        {/* Dynamic Gold Progress Line directly under header */}
        <div className="w-full h-[2px] bg-[#1D0B2E] relative z-20">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF55] via-[#F3D995] to-[#D4AF55] transition-all duration-100 shadow-[0_0_8px_rgba(243,217,149,0.7)]"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>

        {/* The Horizontal Runway Track */}
        <div
          ref={trackRef}
          className={`flex flex-row items-center h-[calc(100vh-140px)] px-10 lg:px-16 space-x-8 lg:space-x-12 will-change-transform ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {culturalWords.map((item, index) => (
            <div
              key={item.word}
              className={`flex-shrink-0 w-[460px] lg:w-[560px] xl:w-[620px] h-[72vh] min-h-[440px] max-h-[560px] rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-[#1D0B2E]/95 via-[#160A24]/90 to-[#100718]/95 border transition-all duration-300 relative flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden ${
                activeCardIndex === index
                  ? 'border-[#F3D995]/80 shadow-[0_0_35px_rgba(212,175,85,0.2)]'
                  : 'border-[#D4AF55]/30 hover:border-[#D4AF55]/60'
              }`}
            >
              {/* Background Sacred Mandala Watermark */}
              <div className="absolute -right-16 -bottom-16 pointer-events-none opacity-15 transition-opacity duration-700">
                <Mandala size={340} speedSec={70} />
              </div>

              {/* Top Row: Index, Tag & Hindi script */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-xs tracking-[0.25em] text-[#D4AF55] font-bold">
                    0{index + 1}
                  </span>
                  <span className="text-[#D4AF55]/40">·</span>
                  <span className="text-[11px] font-sans-clean tracking-wider text-[#F3D995] uppercase font-medium px-2 py-0.5 rounded-full bg-[#D4AF55]/10 border border-[#D4AF55]/30">
                    {item.highlight}
                  </span>
                </div>
                <span className="text-3xl lg:text-4xl font-serif-luxury text-[#F3D995]/40 hover:text-[#F3D995]/90 transition-colors">
                  {item.hindi}
                </span>
              </div>

              {/* Center Motif & Giant Word */}
              <div className="my-auto relative z-10">
                <div className="text-[#D4AF55] mb-3 opacity-80">
                  {item.icon === 'paisley' && <PaisleyMotif size={44} />}
                  {item.icon === 'lotus' && <LotusMotif size={44} />}
                  {item.icon === 'mandala' && (
                    <div className="w-11 h-11 rounded-full border border-[#D4AF55] flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#D4AF55]/50 animate-pulse" />
                    </div>
                  )}
                </div>

                <h3 className="font-cinzel text-5xl lg:text-6xl xl:text-7xl font-black tracking-[0.12em] text-gold-gradient leading-none">
                  {item.word}
                </h3>
                <p className="font-cormorant text-xl lg:text-2xl text-[#F3D995] italic mt-2 font-light">
                  {item.sub}
                </p>
              </div>

              {/* Bottom Description */}
              <div className="pt-5 border-t border-[#D4AF55]/20 relative z-10">
                <p className="text-xs lg:text-sm font-sans-clean text-[#FBF7EE]/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Runway Ending Cap with direct link to Attire Section */}
          <div className="flex-shrink-0 w-[380px] lg:w-[440px] h-[72vh] min-h-[440px] max-h-[560px] rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-[#1A0B2B] to-[#100718] border border-[#F3D995]/50 flex flex-col justify-center items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#D4AF55]/10 via-transparent to-transparent pointer-events-none" />
            
            <span className="font-script text-4xl lg:text-5xl text-[#F3D995] mb-2">
              Asmita 2026
            </span>
            <h4 className="font-cinzel text-sm lg:text-base tracking-[0.25em] text-[#D4AF55] uppercase font-bold mb-3">
              CELEBRATE IN GRANDEUR
            </h4>
            <FiligreeDivider className="w-40 mb-6" />
            
            <p className="text-xs font-sans-clean text-[#FBF7EE]/80 max-w-xs leading-relaxed mb-6 font-light">
              Immerse yourself in our collective legacy. Discover the traditional dress codes that bring our heritage to life.
            </p>

            <button
              onClick={handleSkipToAttire}
              className="interactive inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#F3D995] bg-gradient-to-r from-[#D4AF55]/30 to-[#B8892D]/40 text-white hover:text-[#F3D995] text-xs font-sans-clean tracking-[0.2em] uppercase font-semibold transition-all shadow-[0_0_20px_rgba(212,175,85,0.25)] hover:shadow-[0_0_30px_rgba(243,217,149,0.45)]"
            >
              <span>ATTIRE EXHIBITION</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#F3D995]" />
            </button>
          </div>
        </div>

        {/* Bottom Floating Indicator Bar */}
        <div className="absolute bottom-4 left-0 right-0 px-8 lg:px-12 flex items-center justify-between text-xs font-sans-clean text-[#FBF7EE]/50 z-20 pointer-events-none">
          <div className="pointer-events-auto">
            <span className="text-[#D4AF55] font-cinzel font-semibold">
              CARD {activeCardIndex + 1} OF {culturalWords.length}
            </span>
          </div>

          <button
            onClick={handleSkipToAttire}
            className="pointer-events-auto interactive inline-flex items-center gap-1.5 text-[11px] tracking-widest text-[#D4AF55] hover:text-white uppercase transition-colors"
          >
            <span>Skip To Attire Guide</span>
            <ArrowDown className="w-3 h-3 text-[#F3D995]" />
          </button>
        </div>
      </div>

      {/* ======================= MOBILE HORIZONTAL TOUCH SNAP CAROUSEL (< 768px) ======================= */}
      <div className="md:hidden py-14 px-4">
        {/* Mobile Header */}
        <div className="text-center mb-6">
          <p className="text-[10px] font-cinzel tracking-[0.3em] text-[#D4AF55] uppercase font-bold mb-1">
            CULTURE IN MOTION
          </p>
          <h2 className="text-3xl font-cinzel font-bold text-gold-gradient tracking-wider">
            THE ETHOS
          </h2>
          <p className="font-cormorant italic text-sm text-[#F3D995] mt-1">
            Swipe to explore the pillars of ASMITA
          </p>
          <FiligreeDivider className="w-36 mt-2 mx-auto" />
        </div>

        {/* Horizontal Snap Track */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 space-x-4 px-2 no-scrollbar"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {culturalWords.map((item, index) => (
            <div
              key={item.word}
              className="flex-shrink-0 w-[84vw] max-w-[340px] snap-center rounded-2xl p-6 bg-gradient-to-br from-[#1D0B2E] via-[#160A24] to-[#100718] border border-[#D4AF55]/40 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[380px]"
            >
              {/* Background Faint Mandala */}
              <div className="absolute -right-10 -bottom-10 pointer-events-none opacity-10">
                <Mandala size={220} speedSec={80} />
              </div>

              {/* Top Row */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#D4AF55] font-bold">
                  0{index + 1} · {item.highlight}
                </span>
                <span className="text-2xl text-[#F3D995]/60 font-serif-luxury">
                  {item.hindi}
                </span>
              </div>

              {/* Center Motif & Word */}
              <div className="my-auto relative z-10">
                <div className="text-[#D4AF55] mb-2 opacity-80">
                  {item.icon === 'paisley' && <PaisleyMotif size={36} />}
                  {item.icon === 'lotus' && <LotusMotif size={36} />}
                  {item.icon === 'mandala' && (
                    <div className="w-9 h-9 rounded-full border border-[#D4AF55] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#D4AF55]/40" />
                    </div>
                  )}
                </div>

                <h3 className="font-cinzel text-3xl font-extrabold text-gold-gradient tracking-wider mb-1">
                  {item.word}
                </h3>
                <p className="font-cormorant text-lg text-[#F3D995] italic">
                  {item.sub}
                </p>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-[#D4AF55]/20 relative z-10">
                <p className="text-xs font-sans-clean text-[#FBF7EE]/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Final Mobile Slide: Call to Action */}
          <div className="flex-shrink-0 w-[84vw] max-w-[340px] snap-center rounded-2xl p-6 bg-gradient-to-br from-[#1D0B2E] to-[#100718] border border-[#F3D995]/60 shadow-xl flex flex-col justify-center items-center text-center min-h-[380px]">
            <span className="font-script text-4xl text-[#F3D995] mb-2">
              Asmita 2026
            </span>
            <h4 className="font-cinzel text-sm tracking-[0.25em] text-[#D4AF55] uppercase font-bold mb-3">
              CELEBRATE IN GRANDEUR
            </h4>
            <FiligreeDivider className="w-32 mb-4" />
            <p className="text-xs font-sans-clean text-[#FBF7EE]/70 mb-5 font-light">
              Wednesday, 16 September 2026<br />Seminar Hall, F Block
            </p>
            <button
              onClick={handleSkipToAttire}
              className="interactive px-5 py-2.5 rounded-full border border-[#F3D995] bg-[#D4AF55]/20 text-[#F3D995] text-xs font-sans-clean font-semibold tracking-wider uppercase"
            >
              Continue to Attire ↓
            </button>
          </div>
        </div>

        {/* Mobile Pagination Dots and Chevrons */}
        <div className="flex items-center justify-between mt-2 px-2">
          <button
            onClick={handlePrev}
            disabled={activeCardIndex === 0}
            className="p-1.5 rounded-full border border-[#D4AF55]/40 text-[#F3D995] disabled:opacity-20"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {culturalWords.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCardIndex === idx
                    ? 'w-5 bg-[#D4AF55] shadow-[0_0_6px_rgba(212,175,85,0.7)]'
                    : 'bg-[#D4AF55]/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={activeCardIndex === culturalWords.length - 1}
            className="p-1.5 rounded-full border border-[#D4AF55]/40 text-[#F3D995] disabled:opacity-20"
            aria-label="Next card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
