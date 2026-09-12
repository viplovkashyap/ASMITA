import React from 'react';

export const CornerFiligree: React.FC<{
  position?: 'tl' | 'tr' | 'bl' | 'br';
  className?: string;
  size?: number;
}> = ({ position = 'tl', className = '', size = 56 }) => {
  const transform = {
    tl: '',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1, -1)',
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none text-[#D4AF55] ${className}`}
      style={{ transform }}
    >
      {/* Outer border lines */}
      <path
        d="M2 98 L2 2 L98 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <path
        d="M8 98 L8 8 L98 8"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.4"
      />
      {/* Ornate corner flourish */}
      <path
        d="M8 8 C 24 8, 32 20, 32 32 C 32 44, 20 32, 8 8 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Scroll filigree */}
      <path
        d="M2 45 C 15 42, 22 28, 22 18 C 22 12, 17 8, 12 12 C 7 16, 12 25, 20 22 C 28 19, 30 10, 24 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M45 2 C 42 15, 28 22, 18 22 C 12 22, 8 17, 12 12 C 16 7, 25 12, 22 20 C 19 28, 10 30, 4 24"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Center jewel/pearl */}
      <circle cx="16" cy="16" r="3" fill="currentColor" fillOpacity="0.8" />
      <circle cx="28" cy="28" r="2" fill="currentColor" fillOpacity="0.6" />
      <circle cx="40" cy="12" r="1.5" fill="currentColor" fillOpacity="0.5" />
      <circle cx="12" cy="40" r="1.5" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
};

export const FiligreeDivider: React.FC<{
  className?: string;
  width?: string;
}> = ({ className = '', width = 'w-48 sm:w-72' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className={`h-[1px] bg-gradient-to-r from-transparent via-[#D4AF55]/60 to-transparent flex-1`} />
      <svg
        width="44"
        height="18"
        viewBox="0 0 44 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#D4AF55] flex-shrink-0"
      >
        <path
          d="M22 1 C 18 5, 12 7, 2 9 C 12 11, 18 13, 22 17 C 26 13, 32 11, 42 9 C 32 7, 26 5, 22 1 Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="22" cy="9" r="2.5" fill="currentColor" />
        <circle cx="11" cy="9" r="1.5" fill="currentColor" fillOpacity="0.6" />
        <circle cx="33" cy="9" r="1.5" fill="currentColor" fillOpacity="0.6" />
      </svg>
      <div className={`h-[1px] bg-gradient-to-r from-transparent via-[#D4AF55]/60 to-transparent flex-1`} />
    </div>
  );
};

export const PaisleyMotif: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M30 5 C 48 5, 55 24, 55 42 C 55 62, 43 75, 27 75 C 13 75, 5 63, 5 47 C 5 32, 16 23, 22 15 C 26 10, 27 6, 23 3 C 20 1, 16 4, 18 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M30 18 C 42 18, 45 32, 45 44 C 45 56, 38 65, 27 65 C 18 65, 14 58, 14 47 C 14 36, 22 28, 25 24"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <circle cx="27" cy="46" r="4" fill="currentColor" fillOpacity="0.6" />
      <circle cx="37" cy="38" r="2" fill="currentColor" fillOpacity="0.4" />
      <circle cx="35" cy="54" r="2" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
};

export const LotusMotif: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Center petal */}
      <path
        d="M30 4 C 36 12, 38 22, 30 34 C 22 22, 24 12, 30 4 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.2"
      />
      {/* Inner left petal */}
      <path
        d="M30 12 C 20 16, 12 25, 18 34 C 24 32, 28 26, 30 18"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Inner right petal */}
      <path
        d="M30 12 C 40 16, 48 25, 42 34 C 36 32, 32 26, 30 18"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Outer base petals */}
      <path
        d="M18 34 C 8 32, 4 36, 2 37 C 8 38, 18 37, 22 36"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M42 34 C 52 32, 56 36, 58 37 C 52 38, 42 37, 38 36"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="30" cy="34" r="2" fill="currentColor" />
    </svg>
  );
};

export const IecEmblem: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 52 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* College Coat of Arms Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#D4AF55] drop-shadow-[0_2px_12px_rgba(212,175,85,0.3)] flex-shrink-0"
      >
        {/* Outer circular crest */}
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.4" />
        {/* Gear teeth notches around border */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 50 + Math.cos(angle) * 42;
          const y1 = 50 + Math.sin(angle) * 42;
          const x2 = 50 + Math.cos(angle) * 45;
          const y2 = 50 + Math.sin(angle) * 45;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          );
        })}
        {/* Shield outline */}
        <path
          d="M32 30 L68 30 C 68 48, 62 65, 50 74 C 38 65, 32 48, 32 30 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.08"
        />
        {/* Lamp of Knowledge / Diya in shield */}
        <path
          d="M40 50 C 44 54, 56 54, 60 50 C 58 58, 42 58, 40 50 Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <path
          d="M50 40 C 53 43, 53 47, 50 49 C 47 47, 47 43, 50 40 Z"
          fill="#F3D995"
        />
        {/* Book of knowledge pages */}
        <path
          d="M38 60 C 44 58, 50 60, 50 64 C 50 60, 56 58, 62 60"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Text IEC ESTD 1999 */}
        <text
          x="50"
          y="25"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontFamily="'Cinzel', serif"
          fontWeight="700"
          letterSpacing="1"
        >
          IEC
        </text>
        <text
          x="50"
          y="83"
          textAnchor="middle"
          fill="currentColor"
          fontSize="4.5"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="600"
          letterSpacing="1"
        >
          ESTD 1999
        </text>
      </svg>
    </div>
  );
};
