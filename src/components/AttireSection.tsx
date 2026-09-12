import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { AttireItem } from '../types';
import { CornerFiligree, FiligreeDivider, PaisleyMotif, LotusMotif } from './Ornament';
import { Sparkles, X, Info, ChevronRight } from 'lucide-react';

const attireItems: AttireItem[] = [
  {
    id: 'saree',
    title: 'SAREE',
    subtitle: 'The Timeless Drape',
    description: 'Six yards of grace. Kanjivaram silks, Banarasi brocades, Chanderi, or airy georgettes paired with antique gold ornaments.',
    ornamentType: 'paisley',
    tag: 'Feminine Grace',
    styleAdvice: [
      'Style with temple jewelry or oxidized silver choker',
      'Pleat with crisp precision or drape in traditional Gujarati/Bengali pallu',
      'Accessorize with fresh jasmine gajra in hair',
    ],
  },
  {
    id: 'kurta',
    title: 'KURTA & PAJAMA',
    subtitle: 'Regal Simplicity',
    description: 'Crisp Lucknowi Chikankari, raw silk kurtas with churidar or dhoti pants, elevated with an embroidered Nehru bandi jacket.',
    ornamentType: 'lotus',
    tag: 'Classic Panache',
    styleAdvice: [
      'Pair with a silk or tussar Nehru waistcoat for regal posture',
      'Accent with brass or enameled cufflinks and silk pocket square',
      'Complete with Kolhapuri chappals or embroidered juttis',
    ],
  },
  {
    id: 'lehenga',
    title: 'LEHENGA CHOLI',
    subtitle: 'Celebration of Royalty',
    description: 'Voluminous flared skirts with intricate Zardozi, Gota Patti, mirror embroidery, and sheer organza dupattas.',
    ornamentType: 'royal',
    tag: 'Festive Grandeur',
    styleAdvice: [
      'Pin the dupatta in a graceful side-cape or royal Gujarati fold',
      'Opt for rich jewel tones: emerald, royal plum, crimson or mustard',
      'Adorn with dangling jhumkas and matching maang tikka',
    ],
  },
  {
    id: 'sherwani',
    title: 'SHERWANI & BANDHGALA',
    subtitle: 'Aristocratic Grace',
    description: 'Structured royal high-neck coats, brocade achkans, and draped silk stoles worn by modern aristocrats.',
    ornamentType: 'royal',
    tag: 'Mughal Elegance',
    styleAdvice: [
      'Accessorize with an antique layered pearl mala or brooch',
      'Contrast with a woven Banarasi or Pashmina shawl over one shoulder',
      'Pair with leather mojaris crafted with metallic threadwork',
    ],
  },
  {
    id: 'accessories',
    title: 'ETHNIC ACCESSORIES',
    subtitle: 'Finishing Touches',
    description: 'Ornate Kundan necklaces, jhumkas, silk safas/turbans, Kolhapuri juttis, pocket squares, and embellished potli bags.',
    ornamentType: 'jhumka',
    tag: 'Statement Details',
    styleAdvice: [
      'Incorporate heirloom accessories that carry family legacy',
      'Men can don ceremonial turbans (safas) or silk dupattas',
      'A delicate bindi and glass/metal bangles add cultural resonance',
    ],
  },
  {
    id: 'regional',
    title: 'REGIONAL HERITAGE',
    subtitle: 'From Kashmir to Kerala',
    description: 'Kasavu mundu, Pheran, Mekhela Chador, Bandhani, Pathani, or Garhwali attire — wear your ancestral roots with pride.',
    ornamentType: 'peacock',
    tag: 'Cultural Pride',
    styleAdvice: [
      'Wear the authentic attire of your home state or motherland',
      'Bring authentic regional textiles into the spotlight',
      'Celebrate unity in extraordinary diversity',
    ],
  },
];

export const AttireSection: React.FC = () => {
  const [selectedAttire, setSelectedAttire] = useState<AttireItem | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Tilt calculation on mouse move
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 16;
    const rotY = (x / rect.width) * 16;

    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      scale: 1.02,
      transformPerspective: 1000,
      duration: 0.25,
      ease: 'power1.out',
      overwrite: 'auto',
      force3D: true,
    });
  };

  const handleCardMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      id="attire"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#160A24] via-[#100718] to-[#1D0B2E] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF55]/40 bg-[#160A24] text-[#F3D995] text-[11px] font-cinzel tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3 h-3 text-[#F3D995]" />
            <span>Dress Code Guidelines</span>
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.16em] text-gold-gradient uppercase leading-tight">
            COME DRESSED <br className="hidden sm:inline" />
            <span className="text-gold-bright">IN YOUR CULTURE</span>
          </h2>

          <p className="font-cormorant italic text-xl sm:text-2xl text-[#F3D995] mt-3 font-light tracking-wide">
            Traditional attire encouraged · Express your authentic heritage
          </p>

          <FiligreeDivider className="w-full max-w-sm mt-4" />
        </div>

        {/* Exhibition Art Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attireItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              onClick={() => setSelectedAttire(item)}
              className="interactive group relative rounded-3xl p-8 bg-gradient-to-b from-[#1D0B2E]/80 via-[#160A24]/90 to-[#100718] border border-[#D4AF55]/30 hover:border-[#F3D995] transition-colors duration-500 flex flex-col justify-between min-h-[380px] shadow-[0_10px_35px_rgba(0,0,0,0.5)] cursor-pointer select-none overflow-hidden"
            >
              {/* Corner Filigree */}
              <CornerFiligree position="tl" className="absolute top-2 left-2" size={32} />
              <CornerFiligree position="br" className="absolute bottom-2 right-2" size={32} />

              {/* Background Ornamental Sheen */}
              <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                {item.ornamentType === 'paisley' && <PaisleyMotif size={64} className="text-[#D4AF55]" />}
                {item.ornamentType === 'lotus' && <LotusMotif size={64} className="text-[#D4AF55]" />}
                {item.ornamentType !== 'paisley' && item.ornamentType !== 'lotus' && (
                  <div className="w-16 h-16 rounded-full border border-dashed border-[#D4AF55]" />
                )}
              </div>

              {/* Top Tag & Index */}
              <div className="flex items-center justify-between relative z-10">
                <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans-clean font-semibold bg-[#D4AF55]/15 text-[#F3D995] border border-[#D4AF55]/30">
                  {item.tag}
                </span>
                <span className="font-cinzel text-xs text-[#D4AF55]/70 tracking-widest">
                  EXHIBIT 0{index + 1}
                </span>
              </div>

              {/* Center Typography & Title */}
              <div className="my-6 relative z-10">
                <h3 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-gold-gradient group-hover:text-gold-bright tracking-wider transition-all">
                  {item.title}
                </h3>
                <p className="font-cormorant italic text-lg text-[#F3D995] mt-1">
                  {item.subtitle}
                </p>
                <p className="font-sans-clean text-xs sm:text-sm text-[#FBF7EE]/75 leading-relaxed mt-3 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Bottom Interactive CTA */}
              <div className="pt-4 border-t border-[#D4AF55]/20 flex items-center justify-between text-xs tracking-widest text-[#F3D995] font-sans-clean uppercase relative z-10">
                <span className="flex items-center gap-1.5 group-hover:underline">
                  <Info className="w-3.5 h-3.5" />
                  Styling Tips
                </span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attire Styling Modal / Exhibition Drawer */}
      {selectedAttire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#100718]/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl p-8 bg-gradient-to-b from-[#1D0B2E] via-[#160A24] to-[#100718] border border-[#F3D995]/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            {/* Close button */}
            <button
              onClick={() => setSelectedAttire(null)}
              className="interactive absolute top-5 right-5 p-2 rounded-full border border-[#D4AF55]/40 text-[#F3D995] hover:bg-[#D4AF55]/20 transition-colors"
              aria-label="Close styling guide"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans-clean font-semibold bg-[#D4AF55]/15 text-[#F3D995] border border-[#D4AF55]/30">
                {selectedAttire.tag}
              </span>
              <h3 className="font-cinzel text-3xl font-extrabold text-gold-bright tracking-wider mt-2">
                {selectedAttire.title}
              </h3>
              <p className="font-cormorant italic text-xl text-[#F3D995]">
                {selectedAttire.subtitle}
              </p>
            </div>

            <p className="font-sans-clean text-sm text-[#FBF7EE]/90 leading-relaxed mb-6 font-light">
              {selectedAttire.description}
            </p>

            {/* Styling Advice Points */}
            <div className="space-y-3 pt-4 border-t border-[#D4AF55]/25 mb-8">
              <span className="text-[11px] font-cinzel font-semibold tracking-[0.25em] text-[#D4AF55] uppercase block mb-2">
                Curator Styling Advice:
              </span>
              {selectedAttire.styleAdvice.map((advice, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm font-sans-clean text-[#FBF7EE]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3D995] mt-1.5 flex-shrink-0" />
                  <span>{advice}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedAttire(null)}
              className="interactive w-full py-3 rounded-xl border border-[#D4AF55] bg-gradient-to-r from-[#D4AF55]/20 to-[#B8892D]/30 text-[#F3D995] text-xs font-sans-clean font-semibold tracking-[0.2em] uppercase hover:from-[#D4AF55]/30 hover:to-[#B8892D]/40 transition-all"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
