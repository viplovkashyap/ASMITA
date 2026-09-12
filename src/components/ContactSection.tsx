import React, { useState } from 'react';
import { FiligreeDivider, CornerFiligree } from './Ornament';
import { Phone, MessageSquare, Copy, Check, UserCheck, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopy = (phone: string, raw: string) => {
    navigator.clipboard.writeText(raw);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const contacts = [
    {
      role: 'FACULTY COORDINATOR',
      name: 'Amit Kumar Yadav',
      phone: '+91 73883 62269',
      rawPhone: '+917388362269',
      whatsapp: '917388362269',
      designation: 'Faculty Coordinator, ASMITA 2026',
      department: 'IEC College of Engineering & Technology',
      badgeIcon: ShieldCheck,
    },
    {
      role: 'VICE PRESIDENT, SPEARHEADS',
      name: 'Kavya Aulakh',
      phone: '+91 78279 78907',
      rawPhone: '+917827978907',
      whatsapp: '917827978907',
      designation: 'Vice President, Spearheads Student Council',
      department: 'Student Affairs & Cultural Directorate',
      badgeIcon: UserCheck,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#100718] via-[#160A24] to-[#1D0B2E] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="text-xs font-cinzel font-semibold tracking-[0.3em] text-[#D4AF55] uppercase mb-2">
            Organizing Committee
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.18em] text-gold-gradient uppercase">
            FOR QUERIES, PLEASE CONTACT
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#F3D995] mt-2 font-light">
            Spearheads Student Council &amp; Faculty Leadership
          </p>
          <FiligreeDivider className="w-full max-w-sm mt-4" />
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className="interactive relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#1D0B2E]/90 to-[#100718]/95 border border-[#D4AF55]/40 hover:border-[#F3D995] shadow-[0_15px_45px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Corner Filigree */}
              <CornerFiligree position="tl" className="absolute top-2 left-2" size={32} />
              <CornerFiligree position="br" className="absolute bottom-2 right-2" size={32} />

              <div>
                {/* Role Pill */}
                <div className="flex items-center gap-2 mb-4">
                  <contact.badgeIcon className="w-4 h-4 text-[#F3D995]" />
                  <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.25em] text-[#D4AF55] uppercase">
                    {contact.role}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#FBF7EE] tracking-wide mb-1">
                  {contact.name}
                </h3>
                <p className="text-xs text-[#F3D995] font-sans-clean font-medium tracking-wider">
                  {contact.designation}
                </p>
                <p className="text-xs text-[#FBF7EE]/60 font-sans-clean mt-0.5">
                  {contact.department}
                </p>

                {/* Phone Display */}
                <div className="mt-8 p-4 rounded-2xl bg-[#100718] border border-[#D4AF55]/25 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#D4AF55]/15 text-[#F3D995]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] tracking-widest text-[#D4AF55]/80 uppercase block">
                        DIRECT CONTACT
                      </span>
                      <a
                        href={`tel:${contact.rawPhone}`}
                        className="interactive font-mono text-base sm:text-lg font-bold text-[#F3D995] hover:text-white transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(contact.name, contact.phone)}
                    className="interactive p-2 rounded-lg text-[#D4AF55] hover:text-[#F3D995] hover:bg-[#D4AF55]/10 transition-colors"
                    title="Copy phone number"
                    aria-label={`Copy ${contact.name}'s phone number`}
                  >
                    {copiedPhone === contact.name ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons: Call & WhatsApp */}
              <div className="mt-6 pt-6 border-t border-[#D4AF55]/20 flex gap-3">
                <a
                  href={`tel:${contact.rawPhone}`}
                  className="interactive flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D4AF55] bg-gradient-to-r from-[#D4AF55]/20 to-[#B8892D]/30 hover:from-[#D4AF55]/35 hover:to-[#B8892D]/50 text-[#F3D995] hover:text-white text-xs font-semibold tracking-wider font-sans-clean transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                    `Hello ${contact.name}, I have a query regarding ASMITA — Ethnic Day 2026 at IEC College.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D4AF55]/40 bg-[#100718]/80 hover:bg-[#100718] text-[#FBF7EE] hover:text-[#F3D995] text-xs font-medium tracking-wider font-sans-clean transition-all duration-300"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#F3D995]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Spearheads Student Council Identity Footer */}
        <div className="mt-16 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF55]/30 bg-[#160A24]/60 text-xs text-[#FBF7EE]/80 font-sans-clean tracking-wider">
            <span>Official Event Production by</span>
            <span className="font-semibold text-[#F3D995]">Spearheads Student Council</span>
          </div>
        </div>
      </div>
    </section>
  );
};
