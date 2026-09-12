import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { AudioToggle } from './AudioToggle';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  onJoinClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, onJoinClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section
      const sections = ['hero', 'the-day', 'culture-motion', 'attire', 'event-details', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', id: 'hero' },
    { label: 'THE DAY', id: 'the-day' },
    { label: 'CULTURE', id: 'culture-motion' },
    { label: 'ATTIRE', id: 'attire' },
    { label: 'DETAILS', id: 'event-details' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-8 py-3.5 sm:py-5 ${
          scrolled
            ? 'bg-[#100718]/85 backdrop-blur-md border-b border-[#D4AF55]/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3 sm:py-4'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* ASMITA Logo & Date Stamp */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="interactive flex items-center gap-3 text-left focus:outline-none group"
            aria-label="ASMITA Home"
          >
            <div className="relative">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.22em] text-gold-gradient transition-all duration-300 group-hover:brightness-125">
                ASMITA
              </span>
              <span className="block font-script text-xs sm:text-sm text-[#F3D995] -mt-1 tracking-wider">
                Ethnic Day
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#D4AF55]/30 text-[10px] tracking-[0.2em] uppercase text-[#FBF7EE]/60 font-sans-clean">
              <span>IEC College</span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF55]" />
              <span className="text-[#F3D995]">16.09.2026</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs tracking-[0.2em] font-sans-clean">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`interactive relative py-1 transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-[#F3D995] font-semibold'
                    : 'text-[#FBF7EE]/70 hover:text-[#F3D995]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F3D995] to-transparent" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action: Ambient Audio & Join / Save Date Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <AudioToggle />

            {onJoinClick && (
              <button
                onClick={onJoinClick}
                className="interactive inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF55]/30 via-[#B8892D]/40 to-[#D4AF55]/30 hover:from-[#D4AF55]/50 hover:to-[#B8892D]/60 border border-[#F3D995]/80 text-white text-[11px] sm:text-xs font-sans-clean font-semibold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(212,175,85,0.25)]"
              >
                <span>JOIN ASMITA</span>
              </button>
            )}

            <button
              onClick={() => handleLinkClick('the-day')}
              className="interactive hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#160A24]/70 hover:bg-[#1D0B2E] border border-[#D4AF55]/40 text-[#F3D995] text-xs font-sans-clean tracking-wider transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>SAVE DATE</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="interactive md:hidden p-2 rounded-full border border-[#D4AF55]/40 bg-[#160A24]/70 text-[#F3D995] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#100718]/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center px-6 py-12 transition-all">
          <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
            <span className="font-cinzel text-3xl font-bold tracking-[0.25em] text-gold-gradient">
              ASMITA
            </span>
            <span className="font-script text-2xl text-[#F3D995] -mt-4">
              Ethnic Day 2026
            </span>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF55] to-transparent my-1" />

            <nav className="flex flex-col space-y-3 w-full">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-2 text-sm tracking-[0.25em] font-sans-clean transition-colors ${
                    activeSection === link.id
                      ? 'text-[#F3D995] font-semibold bg-[#D4AF55]/10 rounded-lg'
                      : 'text-[#FBF7EE]/80 hover:text-[#F3D995]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {onJoinClick && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onJoinClick();
                  }}
                  className="interactive py-3 mt-2 rounded-xl bg-gradient-to-r from-[#D4AF55]/30 via-[#B8892D]/50 to-[#D4AF55]/30 border border-[#F3D995] text-white text-xs font-sans-clean font-bold tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(212,175,85,0.3)]"
                >
                  REGISTER / JOIN ASMITA
                </button>
              )}
            </nav>

            <div className="pt-4 border-t border-[#D4AF55]/20 w-full flex flex-col items-center gap-2 text-xs text-[#FBF7EE]/60 font-sans-clean">
              <p>Wednesday, 16 September 2026</p>
              <p>Seminar Hall, F Block · IEC Campus</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
