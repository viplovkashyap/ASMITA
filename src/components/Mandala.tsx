import React from 'react';

interface MandalaProps {
  className?: string;
  size?: number | string;
  opacity?: number;
  spinning?: boolean;
  spinDirection?: 'normal' | 'reverse';
  speedSec?: number;
}

export const Mandala: React.FC<MandalaProps> = ({
  className = '',
  size = 500,
  opacity = 0.25,
  spinning = true,
  spinDirection = 'normal',
  speedSec = 120,
}) => {
  const petals = 16;
  const innerPetals = 8;
  const subPetals = 24;

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full text-[#D4AF55] ${
          spinning
            ? spinDirection === 'normal'
              ? 'animate-mandala-slow'
              : 'animate-mandala-reverse'
            : ''
        }`}
        style={{
          opacity,
          animationDuration: `${speedSec}s`,
        }}
      >
        <defs>
          <radialGradient id="mandalaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F3D995" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#D4AF55" stopOpacity="0.15" />
            <stop offset="80%" stopColor="#B8892D" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#B8892D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background glow */}
        <circle cx="300" cy="300" r="280" fill="url(#mandalaGlow)" />

        {/* Outermost dotted rim */}
        <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.5" />
        <circle cx="300" cy="300" r="275" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
        <circle cx="300" cy="300" r="260" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />

        {/* Outer 24 Petals Ring */}
        {[...Array(subPetals)].map((_, i) => {
          const angle = (i * 360) / subPetals;
          return (
            <g key={`sub-${i}`} transform={`rotate(${angle} 300 300)`}>
              <path
                d="M300 40 C 314 80, 320 120, 300 160 C 280 120, 286 80, 300 40 Z"
                stroke="currentColor"
                strokeWidth="0.8"
                fill="currentColor"
                fillOpacity="0.04"
              />
              <circle cx="300" cy="50" r="2.5" fill="currentColor" fillOpacity="0.7" />
            </g>
          );
        })}

        {/* Mid 16 Elaborate Lotus Petals */}
        {[...Array(petals)].map((_, i) => {
          const angle = (i * 360) / petals;
          return (
            <g key={`mid-${i}`} transform={`rotate(${angle} 300 300)`}>
              {/* Pointed Mughal arch petal */}
              <path
                d="M300 75 C 330 135, 345 200, 300 240 C 255 200, 270 135, 300 75 Z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="currentColor"
                fillOpacity="0.08"
              />
              {/* Inner petal vein */}
              <path
                d="M300 100 L300 215"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeOpacity="0.6"
              />
              <path
                d="M300 140 C 315 160, 320 180, 300 200"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeOpacity="0.5"
              />
              <path
                d="M300 140 C 285 160, 280 180, 300 200"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeOpacity="0.5"
              />
              <circle cx="300" cy="85" r="3" fill="currentColor" fillOpacity="0.8" />
            </g>
          );
        })}

        {/* Concentric Geometric Circles & Pearls */}
        <circle cx="300" cy="300" r="190" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
        <circle cx="300" cy="300" r="175" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" strokeOpacity="0.6" />
        <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />

        {/* Inner 8 Sacred Lotus Petals */}
        {[...Array(innerPetals)].map((_, i) => {
          const angle = (i * 360) / innerPetals;
          return (
            <g key={`inner-${i}`} transform={`rotate(${angle} 300 300)`}>
              <path
                d="M300 160 C 335 190, 340 250, 300 270 C 260 250, 265 190, 300 160 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.14"
              />
              <circle cx="300" cy="175" r="3.5" fill="currentColor" />
            </g>
          );
        })}

        {/* Central Sunburst / Star */}
        <circle cx="300" cy="300" r="85" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.9" />
        <circle cx="300" cy="300" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* 8-pointed star */}
        <path
          d="M300 220 L320 280 L380 300 L320 320 L300 380 L280 320 L220 300 L280 280 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <circle cx="300" cy="300" r="30" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="12" fill="currentColor" fillOpacity="0.9" />
      </svg>
    </div>
  );
};
