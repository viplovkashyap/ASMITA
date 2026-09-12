import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mandala } from './Mandala';
import { FiligreeDivider, CornerFiligree } from './Ornament';
import { Calendar, Clock, MapPin, Building2, Bell, Share2, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const DateSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Live Countdown to 16 September 2026
  const targetDate = new Date('2026-09-16T15:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, targetDate - now);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-controlled rotation & reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        onUpdate: (self) => {
          if (mandalaRef.current) {
            gsap.set(mandalaRef.current, {
              rotation: self.progress * 90,
            });
          }
        },
      });

      // Mouse Parallax on the monumental '16' (optimized for low-end devices)
      let ticking = false;
      const handleMouseMove = (e: MouseEvent) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          if (!numberRef.current) return;
          const rect = sectionRef.current?.getBoundingClientRect();
          if (!rect) return;

          // Only react when section is currently in viewport
          if (rect.top > window.innerHeight || rect.bottom < 0) return;

          const x = (e.clientX - (rect.left + rect.width / 2)) * 0.025;
          const y = (e.clientY - (rect.top + rect.height / 2)) * 0.025;

          gsap.to(numberRef.current, {
            x,
            y,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calendar .ics download
  const handleAddToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ASMITA Ethnic Day//IEC College//EN',
      'BEGIN:VEVENT',
      'SUMMARY:ASMITA — Ethnic Day 2026',
      'DESCRIPTION:An evening of culture, tradition & celebration hosted by Spearheads Student Council at IEC College of Engineering & Technology, Greater Noida. Traditional attire encouraged.',
      'LOCATION:Seminar Hall, F Block, IEC College of Engineering & Technology, Greater Noida',
      'DTSTART:20260916T093000Z',
      'DTEND:20260916T143000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'ASMITA-Ethnic-Day-2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Calendar URL generator
  const handleGoogleCalendar = () => {
    const title = encodeURIComponent('ASMITA — Ethnic Day 2026');
    const details = encodeURIComponent(
      'An evening of culture, tradition & celebration. Hosted by Spearheads Student Council. Traditional attire encouraged.'
    );
    const location = encodeURIComponent('Seminar Hall, F Block, IEC College of Engineering & Technology, Greater Noida');
    const dates = '20260916T093000Z/20260916T143000Z';
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ASMITA — Ethnic Day 2026',
        text: 'Join us for ASMITA — Ethnic Day on Wednesday, 16 September 2026 at IEC College, Seminar Hall, F Block!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="the-day"
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#100718] via-[#160A24] to-[#1D0B2E] overflow-hidden"
    >
      {/* Decorative Frame */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-xs sm:text-sm font-cinzel font-semibold tracking-[0.3em] text-[#D4AF55] uppercase mb-2">
            Mark Your Calendar
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-bold text-gold-gradient tracking-[0.2em] uppercase">
            THE DAY
          </h2>
          <FiligreeDivider className="w-full max-w-xs mt-4" />
        </div>

        {/* Editorial Layout: Left Big Sculpted '16' & Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Monumental '16' with Rotating Sacred Mandala */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px]">
            {/* Rotating Sacred Mandala Backdrop */}
            <div
              ref={mandalaRef}
              className="absolute pointer-events-none select-none z-0"
            >
              <Mandala size="min(88vw, 520px)" opacity={0.35} speedSec={90} />
            </div>

            {/* Monumental '16' Object */}
            <div
              ref={numberRef}
              className="relative z-10 flex flex-col items-center text-center select-none"
            >
              <span
                className="font-cinzel text-[9rem] sm:text-[14rem] md:text-[16rem] font-black leading-none text-gold-bright asmita-emboss tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                style={{
                  WebkitTextStroke: '1px rgba(243,217,149,0.3)',
                }}
              >
                16
              </span>

              <div className="-mt-4 sm:-mt-8 flex flex-col items-center">
                <span className="font-cinzel text-2xl sm:text-4xl font-bold tracking-[0.32em] text-[#F3D995] uppercase">
                  SEPTEMBER
                </span>
                <span className="font-sans-clean text-base sm:text-xl font-light tracking-[0.4em] text-[#FBF7EE]/80 uppercase mt-1">
                  2026 · WEDNESDAY
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Details Card */}
          <div
            ref={detailsRef}
            className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8 p-6 sm:p-10 rounded-2xl bg-[#160A24]/70 border border-[#D4AF55]/30 backdrop-blur-md relative shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Card Filigree Corners */}
            <CornerFiligree position="tl" className="absolute top-2 left-2" size={36} />
            <CornerFiligree position="tr" className="absolute top-2 right-2" size={36} />
            <CornerFiligree position="bl" className="absolute bottom-2 left-2" size={36} />
            <CornerFiligree position="br" className="absolute bottom-2 right-2" size={36} />

            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-[#D4AF55]/20 pb-4">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF55] font-sans-clean font-semibold block">
                  Official Schedule
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-gold-gradient">
                  Celebration Itinerary
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-sans-clean tracking-wider uppercase border border-[#D4AF55]/40 bg-[#D4AF55]/10 text-[#F3D995]">
                Annual Fest
              </span>
            </div>

            {/* Spec Items */}
            <div className="space-y-5 text-sm font-sans-clean">
              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#D4AF55]/30 bg-[#100718] text-[#F3D995] flex-shrink-0 mt-0.5">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF55]/80 block font-semibold">
                    DATE
                  </span>
                  <p className="text-base font-semibold text-[#FBF7EE]">
                    Wednesday, 16 September 2026
                  </p>
                  <p className="text-xs text-[#FBF7EE]/60 mt-0.5">
                    Gates open at 3:00 PM IST · Ceremonial diya lighting at 3:45 PM
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#D4AF55]/30 bg-[#100718] text-[#F3D995] flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF55]/80 block font-semibold">
                    VENUE
                  </span>
                  <p className="text-base font-semibold text-[#FBF7EE]">
                    Seminar Hall, F Block
                  </p>
                  <p className="text-xs text-[#FBF7EE]/60 mt-0.5">
                    Central Auditorium Wing · Air Conditioned Grand Hall
                  </p>
                </div>
              </div>

              {/* College */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#D4AF55]/30 bg-[#100718] text-[#F3D995] flex-shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF55]/80 block font-semibold">
                    COLLEGE
                  </span>
                  <p className="text-base font-semibold text-[#FBF7EE]">
                    IEC College of Engineering &amp; Technology
                  </p>
                  <p className="text-xs text-[#FBF7EE]/60 mt-0.5">
                    Plot No. 4, Knowledge Park-I, Greater Noida, Uttar Pradesh 201310
                  </p>
                </div>
              </div>
            </div>

            {/* Live Event Countdown */}
            <div className="pt-4 border-t border-[#D4AF55]/20">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#F3D995]" />
                <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#F3D995]">
                  Time Remaining Until ASMITA
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HOURS', val: timeLeft.hours },
                  { label: 'MINUTES', val: timeLeft.minutes },
                  { label: 'SECONDS', val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#100718]/80 border border-[#D4AF55]/25 flex flex-col items-center justify-center"
                  >
                    <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#F3D995]">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] tracking-wider text-[#FBF7EE]/60 font-sans-clean mt-0.5">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Add to Calendar & Google Calendar */}
            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={handleAddToCalendar}
                className="interactive flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#D4AF55] bg-gradient-to-r from-[#D4AF55]/20 to-[#B8892D]/30 hover:from-[#D4AF55]/35 hover:to-[#B8892D]/50 text-[#F3D995] hover:text-[#FFFFFF] text-xs font-semibold tracking-wider font-sans-clean transition-all duration-300 shadow-[0_2px_12px_rgba(212,175,85,0.15)]"
              >
                <Bell className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={handleGoogleCalendar}
                className="interactive inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#D4AF55]/40 bg-[#100718]/60 hover:bg-[#100718] text-[#FBF7EE]/90 hover:text-[#F3D995] text-xs font-medium tracking-wider font-sans-clean transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-[#F3D995]" />
                <span>Google Calendar</span>
              </button>

              <button
                onClick={handleShare}
                className="interactive inline-flex items-center justify-center p-3 rounded-xl border border-[#D4AF55]/40 bg-[#100718]/60 hover:bg-[#100718] text-[#F3D995] transition-colors duration-300"
                title="Share event link"
                aria-label="Share event link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
