import React, { useState } from 'react';
import { IntroLoader } from './components/IntroLoader';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { DateSection } from './components/DateSection';
import { CultureMotion } from './components/CultureMotion';
import { AttireSection } from './components/AttireSection';
import { EventDetails } from './components/EventDetails';
import { ContactSection } from './components/ContactSection';
import { FooterCTA } from './components/FooterCTA';
import { ThreeCanvas } from './components/ThreeCanvas';
import { PetalField } from './components/PetalField';
import { CustomCursor } from './components/CustomCursor';
import { RegistrationModal } from './components/RegistrationModal';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [modalTrigger, setModalTrigger] = useState<HTMLElement | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRegistration = (e?: React.MouseEvent) => {
    if (e) {
      setModalTrigger(e.currentTarget as HTMLElement);
    }
    setIsRegistrationOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#100718] text-[#FBF7EE] selection:bg-[#B8892D]/30 selection:text-[#F3D995] overflow-x-hidden font-sans-clean">
      {/* Desktop Custom Golden Cursor */}
      <CustomCursor />

      {/* Cinematic 3D Floating Particle Mandala Canvas (GPU-throttled for low-end devices) */}
      <ThreeCanvas />

      {/* Floating Ambient Indian Flower Petals (Optimized count) */}
      <PetalField count={10} />

      {/* Intro Loader (Invitation Experience with Skip button) */}
      {!introFinished && (
        <IntroLoader onComplete={() => setIntroFinished(true)} />
      )}

      {/* Minimal Floating Navigation */}
      <Navigation
        onNavigate={scrollToSection}
        onJoinClick={handleOpenRegistration}
      />

      {/* Main Single-Page Experience */}
      <main className="relative z-10">
        {/* 1. Hero: The Wow Moment */}
        <Hero
          onEnterClick={() => scrollToSection('the-day')}
          onJoinClick={handleOpenRegistration}
        />

        {/* 2. The Day: Monumental '16' & Live Countdown */}
        <DateSection />

        {/* 3. Culture in Motion: Horizontal Scroll Storytelling */}
        <CultureMotion />

        {/* 4. Come Dressed In Your Culture: Attire Exhibition */}
        <AttireSection />

        {/* 5. Everything You Need To Know: Event Details & Itinerary */}
        <EventDetails />

        {/* 6. Contact: Faculty Coordinator & Vice President, Spearheads */}
        <ContactSection />
      </main>

      {/* 7. Dramatic Final Experience, Registration CTA & Creator Credit */}
      <FooterCTA
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onSaveDate={() => scrollToSection('the-day')}
        onJoinClick={handleOpenRegistration}
      />

      {/* 8. Registration / Participation Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={handleCloseRegistration}
        triggerElement={modalTrigger}
      />
    </div>
  );
}
