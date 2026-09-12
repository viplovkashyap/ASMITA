import React from 'react';
import { FiligreeDivider, CornerFiligree } from './Ornament';
import { Calendar, MapPin, Building, Sparkles, Shirt, Music, Award, Utensils } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const scheduleItems = [
    {
      time: '03:00 PM',
      title: 'Grand Welcome & Reception',
      desc: 'Arrival of students & faculty. Traditional sandalwood tika and fresh marigold garland greetings at the grand portal.',
      icon: Sparkles,
    },
    {
      time: '03:45 PM',
      title: 'Auspicious Diya Lighting',
      desc: 'Inaugural lamp lighting ceremony by college dignitaries, spearheads faculty, and student council members.',
      icon: Sparkles,
    },
    {
      time: '04:15 PM',
      title: 'Classical & Folk Rhythms',
      desc: 'Captivating showcase of Indian classical and regional dance forms — from Kathak to Bhangra and Garba.',
      icon: Music,
    },
    {
      time: '05:15 PM',
      title: 'The Ethnic Runway',
      desc: 'The spotlight cultural ramp walk celebrating regional ensembles and crowning the Best Dressed Cultural Icons.',
      icon: Award,
    },
    {
      time: '06:30 PM',
      title: 'Traditional Feast & Conviviality',
      desc: 'Savor artisanal Indian festive delicacies, sweets, and celebration photography at the ornamental booth.',
      icon: Utensils,
    },
  ];

  return (
    <section
      id="event-details"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#1D0B2E] via-[#160A24] to-[#100718] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#D4AF55] uppercase mb-2">
            Essential Information
          </span>
          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.18em] text-gold-gradient uppercase">
            EVERYTHING YOU NEED TO KNOW
          </h2>
          <FiligreeDivider className="w-full max-w-sm mt-4" />
        </div>

        {/* High-Fashion Editorial Key Spec Rows with Thin Gold Dividers */}
        <div className="border-t border-[#D4AF55]/40 mb-16">
          {/* Row 1: Event & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4AF55]/30 divide-y md:divide-y-0 md:divide-x divide-[#D4AF55]/30">
            <div className="p-6 sm:p-8 flex items-start gap-4">
              <div className="p-3 rounded-full border border-[#D4AF55]/40 bg-[#160A24] text-[#F3D995] flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF55] uppercase block">
                  EVENT
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FBF7EE] mt-1">
                  ASMITA — Ethnic Day 2026
                </h3>
                <p className="font-cormorant italic text-base text-[#F3D995] mt-0.5">
                  &ldquo;An evening of culture, tradition &amp; celebration&rdquo;
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex items-start gap-4">
              <div className="p-3 rounded-full border border-[#D4AF55]/40 bg-[#160A24] text-[#F3D995] flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF55] uppercase block">
                  DATE &amp; TIME
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FBF7EE] mt-1">
                  Wednesday, 16 September 2026
                </h3>
                <p className="text-xs text-[#FBF7EE]/70 font-sans-clean mt-1">
                  Gates open at 03:00 PM IST · Concludes at 07:30 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Venue & College */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4AF55]/30 divide-y md:divide-y-0 md:divide-x divide-[#D4AF55]/30">
            <div className="p-6 sm:p-8 flex items-start gap-4">
              <div className="p-3 rounded-full border border-[#D4AF55]/40 bg-[#160A24] text-[#F3D995] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF55] uppercase block">
                  VENUE
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FBF7EE] mt-1">
                  Seminar Hall, F Block
                </h3>
                <p className="text-xs text-[#FBF7EE]/70 font-sans-clean mt-1">
                  IEC Main Campus · Air Conditioned Auditorium Wing
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex items-start gap-4">
              <div className="p-3 rounded-full border border-[#D4AF55]/40 bg-[#160A24] text-[#F3D995] flex-shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF55] uppercase block">
                  COLLEGE &amp; HOST
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FBF7EE] mt-1">
                  IEC College of Engg. &amp; Tech.
                </h3>
                <p className="text-xs text-[#FBF7EE]/70 font-sans-clean mt-1">
                  Greater Noida · Spearheads Student Council
                </p>
              </div>
            </div>
          </div>

          {/* Row 3: Attire & Eligibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4AF55]/30 divide-y md:divide-y-0 md:divide-x divide-[#D4AF55]/30">
            <div className="p-6 sm:p-8 flex items-start gap-4">
              <div className="p-3 rounded-full border border-[#D4AF55]/40 bg-[#160A24] text-[#F3D995] flex-shrink-0">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF55] uppercase block">
                  ATTIRE REQUIREMENT
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FBF7EE] mt-1">
                  Traditional Attire Encouraged
                </h3>
                <p className="text-xs text-[#FBF7EE]/70 font-sans-clean mt-1">
                  Saree, Kurta, Lehenga, Sherwani, or your native state traditional dress
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex items-start gap-4">
              <div className="p-3 rounded-full border border-[#D4AF55]/40 bg-[#160A24] text-[#F3D995] flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#D4AF55] uppercase block">
                  ATTENDANCE
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FBF7EE] mt-1">
                  All Students &amp; Faculty Welcome
                </h3>
                <p className="text-xs text-[#FBF7EE]/70 font-sans-clean mt-1">
                  Please carry your college identity card for swift entry validation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chronological Itinerary Section */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-[#160A24]/60 border border-[#D4AF55]/30 backdrop-blur-md">
          <CornerFiligree position="tl" className="absolute top-2 left-2" size={36} />
          <CornerFiligree position="tr" className="absolute top-2 right-2" size={36} />

          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.3em] font-cinzel font-semibold text-[#D4AF55] uppercase">
              Chronicle of Celebrations
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient mt-1">
              Event Itinerary &amp; Timeline
            </h3>
          </div>

          <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-[#F3D995] before:via-[#D4AF55]/40 before:to-transparent">
            {scheduleItems.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 pl-1 sm:pl-2">
                {/* Timeline Dot */}
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-[#F3D995] bg-[#100718] flex items-center justify-center text-[#F3D995] z-10 flex-shrink-0 shadow-[0_0_12px_rgba(212,175,85,0.4)]">
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                <div className="flex-1 pb-4 border-b border-[#D4AF55]/15">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#FBF7EE]">
                      {item.title}
                    </h4>
                    <span className="text-xs font-mono font-semibold tracking-wider text-[#F3D995] px-2.5 py-0.5 rounded-full bg-[#D4AF55]/15 border border-[#D4AF55]/30 w-fit">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans-clean text-[#FBF7EE]/70 font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
