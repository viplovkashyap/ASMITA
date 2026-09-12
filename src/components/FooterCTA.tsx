import React from 'react';
import { Diya } from './Diya';
import { Mandala } from './Mandala';
import { FiligreeDivider, CornerFiligree, IecEmblem } from './Ornament';
import { Calendar, ArrowUp, ArrowRight, Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

interface FooterCTAProps {
  onScrollToTop: () => void;
  onSaveDate: () => void;
  onJoinClick: () => void;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({
  onScrollToTop,
  onSaveDate,
  onJoinClick,
}) => {
  return (
    <footer className="relative min-h-screen py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-radial from-[#1D0B2E] via-[#160A24] to-[#100718] flex flex-col justify-between items-center text-center overflow-hidden border-t border-[#D4AF55]/30">
      {/* Background Sacred Mandala */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <Mandala size="min(92vw, 850px)" opacity={0.18} speedSec={150} />
      </div>

      {/* Ornate Frame Border */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 pointer-events-none border border-[#D4AF55]/20 rounded-3xl">
        <CornerFiligree position="tl" className="absolute top-2 left-2" size={42} />
        <CornerFiligree position="tr" className="absolute top-2 right-2" size={42} />
        <CornerFiligree position="bl" className="absolute bottom-2 left-2" size={42} />
        <CornerFiligree position="br" className="absolute bottom-2 right-2" size={42} />
      </div>

      {/* Top Brand Emblem */}
      <div className="relative z-10 flex flex-col items-center">
        <IecEmblem size={48} className="mb-2" />
        <span className="text-[10px] sm:text-xs font-cinzel font-semibold tracking-[0.3em] text-[#D4AF55] uppercase">
          IEC College of Engineering &amp; Technology
        </span>
        <span className="text-[9px] tracking-[0.2em] text-[#FBF7EE]/60 uppercase font-sans-clean">
          Greater Noida · ESTD 1999
        </span>
      </div>

      {/* Central Dramatic Finale Composition */}
      <div className="relative z-10 my-auto py-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Sacred Flickering Diya in the heart of the finale */}
        <div className="mb-5">
          <Diya size={68} intensity="vibrant" />
        </div>

        {/* Huge ASMITA */}
        <div className="relative select-none" data-cursor="asmita">
          <div
            aria-hidden="true"
            className="absolute inset-0 font-cinzel text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-[0.18em] text-[#D4AF55] blur-xl opacity-20"
          >
            ASMITA
          </div>
          <h2 className="relative font-cinzel text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-[0.18em] text-gold-bright asmita-emboss leading-none">
            ASMITA
          </h2>
        </div>

        {/* Elegant Script */}
        <p className="font-script text-4xl sm:text-6xl md:text-7xl text-[#F3D995] -mt-2 sm:-mt-5 mb-4">
          Ethnic Day
        </p>

        {/* COME. CELEBRATE. BELONG. */}
        <div className="my-2">
          <p className="font-cinzel text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.32em] text-[#FBF7EE] uppercase">
            COME. CELEBRATE. BELONG.
          </p>
          <p className="font-cormorant italic text-base sm:text-xl text-[#D4AF55] mt-1">
            An evening of culture, tradition &amp; celebration
          </p>
        </div>

        <FiligreeDivider className="w-full max-w-xs my-5" />

        {/* Key Event Coordinates */}
        <div className="text-xs sm:text-sm font-sans-clean tracking-[0.28em] text-[#FBF7EE] uppercase space-y-1 mb-8">
          <p className="font-bold text-[#F3D995]">WEDNESDAY, 16 SEPTEMBER 2026</p>
          <p className="text-[#FBF7EE]/80">SEMINAR HALL · F BLOCK</p>
          <p className="text-[11px] text-[#D4AF55]">GREATER NOIDA, UTTAR PRADESH</p>
        </div>

        {/* Secondary Callout for Registration: READY TO BE PART OF ASMITA? */}
        <div className="mb-6 max-w-md mx-auto">
          <h3 className="font-cinzel text-base sm:text-lg md:text-xl font-bold tracking-[0.28em] text-[#F3D995] uppercase">
            READY TO BE PART OF ASMITA?
          </h3>
          <p className="font-cormorant italic text-sm sm:text-base text-[#FBF7EE]/80 mt-1">
            Step forward. Share your culture. Celebrate together.
          </p>
        </div>

        {/* Final CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {/* Primary CTA: JOIN ASMITA / REGISTER NOW */}
          <button
            onClick={onJoinClick}
            className="interactive group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full border border-[#F3D995] bg-gradient-to-r from-[#D4AF55]/30 via-[#B8892D]/60 to-[#D4AF55]/30 hover:from-[#D4AF55]/50 hover:to-[#B8892D]/80 text-white text-xs sm:text-sm font-sans-clean font-bold tracking-[0.26em] uppercase transition-all duration-300 shadow-[0_4px_35px_rgba(212,175,85,0.4)] hover:shadow-[0_6px_45px_rgba(243,217,149,0.6)]"
          >
            <span className="relative z-10">REGISTER FOR ASMITA</span>
            <ArrowRight className="relative z-10 w-4 h-4 text-[#F3D995] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Add to Calendar */}
          <button
            onClick={onSaveDate}
            className="interactive inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#D4AF55]/50 bg-[#160A24]/80 hover:bg-[#1D0B2E] text-[#F3D995] hover:text-white text-xs font-sans-clean font-semibold tracking-[0.22em] uppercase transition-all duration-300"
          >
            <Calendar className="w-4 h-4 text-[#F3D995]" />
            <span>Add to Calendar</span>
          </button>

          {/* Back to Top */}
          <button
            onClick={onScrollToTop}
            className="interactive inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[#D4AF55]/30 bg-[#100718]/80 hover:bg-[#160A24] text-[#F3D995] hover:text-white text-xs font-sans-clean font-medium tracking-[0.2em] uppercase transition-all duration-300"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Top</span>
          </button>
        </div>
      </div>

      {/* ===================== CREATOR CREDIT (SECTION 14) ===================== */}
      <div className="relative z-10 w-full max-w-2xl pt-10 pb-4 border-t border-[#D4AF55]/20 flex flex-col items-center text-center">
        <p className="text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-[0.32em] text-[#D4AF55] uppercase mb-1">
          DESIGNED &amp; DEVELOPED BY
        </p>
        <p className="text-xs sm:text-sm font-sans-clean tracking-[0.22em] text-[#FBF7EE] uppercase font-medium">
          Viplov <span className="text-[#D4AF55] mx-1">·</span> B.Tech 2nd Year
        </p>

        {/* Creator Social / Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3 text-[11px] font-sans-clean tracking-wider text-[#FBF7EE]/70">
          <a
            href="mailto:viplov7@icloud.com"
            className="interactive inline-flex items-center gap-1.5 hover:text-[#F3D995] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="Email Viplov"
          >
            <Mail className="w-3.5 h-3.5 text-[#D4AF55]" />
            <span>Email</span>
          </a>
          <span className="text-[#D4AF55]/40">·</span>
          <a
            href="https://github.com/viplovk"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive inline-flex items-center gap-1.5 hover:text-[#F3D995] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5 text-[#D4AF55]" />
            <span>GitHub</span>
          </a>
          <span className="text-[#D4AF55]/40">·</span>
          <a
            href="https://linkedin.com/in/viplov7"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive inline-flex items-center gap-1.5 hover:text-[#F3D995] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#D4AF55]" />
            <span>LinkedIn</span>
          </a>
          <span className="text-[#D4AF55]/40">·</span>
          <a
            href="https://x.com/vishuk30"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive inline-flex items-center gap-1.5 hover:text-[#F3D995] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="X Profile"
          >
            <Twitter className="w-3.5 h-3.5 text-[#D4AF55]" />
            <span>X</span>
          </a>
          <span className="text-[#D4AF55]/40">·</span>
          <a
            href="https://instagram.com/studymaterialboy"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive inline-flex items-center gap-1.5 hover:text-[#F3D995] hover:-translate-y-0.5 transition-all duration-200"
            aria-label="Instagram Profile"
          >
            <Instagram className="w-3.5 h-3.5 text-[#D4AF55]" />
            <span>Instagram</span>
          </a>
        </div>

        {/* Copyright notice */}
        <p className="text-[10px] tracking-[0.25em] text-[#FBF7EE]/40 uppercase font-sans-clean mt-4">
          &copy; 2026 ASMITA <span className="mx-1">·</span> Spearheads Student Council <span className="mx-1">·</span> IEC-CET
        </p>
      </div>
    </footer>
  );
};
