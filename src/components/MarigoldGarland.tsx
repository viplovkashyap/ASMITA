import React from 'react';

interface MarigoldGarlandProps {
  side: 'left' | 'right';
  className?: string;
  flowersCount?: number;
}

export const MarigoldGarland: React.FC<MarigoldGarlandProps> = ({
  side,
  className = '',
  flowersCount = 7,
}) => {
  // Alternating between deep saffron orange and golden yellow marigold blooms
  const colors = [
    { main: '#E65100', highlight: '#FFB300', dark: '#BF360C' },
    { main: '#FB8C00', highlight: '#FFE082', dark: '#E65100' },
    { main: '#FF9800', highlight: '#FFF59D', dark: '#F57C00' },
    { main: '#E65100', highlight: '#FFA000', dark: '#B71C1C' },
  ];

  return (
    <div
      className={`pointer-events-none absolute top-0 z-20 flex flex-col items-center ${
        side === 'left' ? 'left-2 sm:left-6 md:left-12 animate-sway-left' : 'right-2 sm:right-6 md:right-12 animate-sway-right'
      } ${className}`}
    >
      {/* Golden hanging thread */}
      <div className="w-[1.5px] h-10 bg-gradient-to-b from-[#F3D995] to-[#B8892D]" />

      {/* Garland flowers stack */}
      <div className="flex flex-col items-center -space-y-3">
        {[...Array(flowersCount)].map((_, i) => {
          const color = colors[i % colors.length];
          const scale = 0.88 + (i % 3) * 0.08;
          const rotation = (i * 47) % 360;

          return (
            <div
              key={i}
              className="relative transition-transform duration-700"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                zIndex: flowersCount - i,
              }}
            >
              {/* Single Marigold Flower SVG */}
              <svg
                width="42"
                height="42"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
              >
                {/* Outer petal layers */}
                {[...Array(12)].map((_, p) => {
                  const angle = (p * 360) / 12;
                  return (
                    <circle
                      key={`p1-${p}`}
                      cx={30 + Math.cos((angle * Math.PI) / 180) * 16}
                      cy={30 + Math.sin((angle * Math.PI) / 180) * 16}
                      r="10"
                      fill={color.dark}
                      opacity="0.9"
                    />
                  );
                })}

                {/* Middle petal layers */}
                {[...Array(10)].map((_, p) => {
                  const angle = (p * 360) / 10 + 15;
                  return (
                    <circle
                      key={`p2-${p}`}
                      cx={30 + Math.cos((angle * Math.PI) / 180) * 11}
                      cy={30 + Math.sin((angle * Math.PI) / 180) * 11}
                      r="8.5"
                      fill={color.main}
                    />
                  );
                })}

                {/* Inner petal highlights */}
                {[...Array(8)].map((_, p) => {
                  const angle = (p * 360) / 8 + 30;
                  return (
                    <circle
                      key={`p3-${p}`}
                      cx={30 + Math.cos((angle * Math.PI) / 180) * 6}
                      cy={30 + Math.sin((angle * Math.PI) / 180) * 6}
                      r="6"
                      fill={color.highlight}
                    />
                  );
                })}

                {/* Dense center core */}
                <circle cx="30" cy="30" r="4.5" fill="#5D4037" />
                <circle cx="30" cy="30" r="3" fill="#E65100" />
              </svg>

              {/* Mango leaf / Ashoka leaf accent occasionally */}
              {i % 2 === 1 && (
                <div
                  className={`absolute top-2 ${
                    i % 4 === 1 ? '-left-3 rotate-[-35deg]' : '-right-3 rotate-[35deg]'
                  } pointer-events-none`}
                >
                  <svg width="18" height="28" viewBox="0 0 20 36" fill="none">
                    <path
                      d="M10 0 C 18 10, 18 26, 10 36 C 2 26, 2 10, 10 0 Z"
                      fill="#2E7D32"
                      stroke="#1B5E20"
                      strokeWidth="0.8"
                    />
                    <path d="M10 2 L10 34" stroke="#81C784" strokeWidth="0.6" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}

        {/* Small brass bell / golden tassel at bottom */}
        <div className="pt-2 flex flex-col items-center">
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
            <path
              d="M8 2 C 5 2, 3 6, 2 12 C 1 15, 0 16, 0 17 L16 17 C 16 16, 15 15, 14 12 C 13 6, 11 2, 8 2 Z"
              fill="#D4AF55"
              stroke="#F3D995"
              strokeWidth="0.8"
            />
            <circle cx="8" cy="19" r="2.5" fill="#F3D995" />
          </svg>
        </div>
      </div>
    </div>
  );
};
