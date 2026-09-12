import React from 'react';

interface DiyaProps {
  className?: string;
  size?: number;
  glow?: boolean;
  intensity?: 'gentle' | 'vibrant';
}

export const Diya: React.FC<DiyaProps> = ({
  className = '',
  size = 64,
  glow = true,
  intensity = 'vibrant',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 0.9 }}
    >
      {/* Radiant ambient aura */}
      {glow && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full pointer-events-none blur-xl transition-all"
          style={{
            width: size * 1.6,
            height: size * 1.6,
            background:
              intensity === 'vibrant'
                ? 'radial-gradient(circle, rgba(255,158,27,0.45) 0%, rgba(212,175,85,0.2) 50%, rgba(184,137,45,0) 75%)'
                : 'radial-gradient(circle, rgba(255,170,50,0.3) 0%, rgba(212,175,85,0.12) 50%, rgba(184,137,45,0) 70%)',
          }}
        />
      )}

      <svg
        viewBox="0 0 100 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          {/* Flame Gradient */}
          <linearGradient id="flameGrad" x1="50" y1="5" x2="50" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF3A8" />
            <stop offset="55%" stopColor="#FF9E1B" />
            <stop offset="90%" stopColor="#D9381E" />
            <stop offset="100%" stopColor="#5E0F00" />
          </linearGradient>

          {/* Inner Core Flame */}
          <linearGradient id="flameCore" x1="50" y1="18" x2="50" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFF275" />
            <stop offset="100%" stopColor="#FF8B00" />
          </linearGradient>

          {/* Brass Lamp Gradient */}
          <linearGradient id="brassGrad" x1="15" y1="45" x2="85" y2="78" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F3D995" />
            <stop offset="35%" stopColor="#D4AF55" />
            <stop offset="70%" stopColor="#8C6517" />
            <stop offset="100%" stopColor="#E7C873" />
          </linearGradient>

          {/* Base Rim Gradient */}
          <linearGradient id="rimGrad" x1="30" y1="76" x2="70" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B8892D" />
            <stop offset="50%" stopColor="#F3D995" />
            <stop offset="100%" stopColor="#69480B" />
          </linearGradient>
        </defs>

        {/* Flickering Flame Group */}
        <g className="animate-flame" style={{ transformOrigin: '50px 45px' }}>
          {/* Outer flame */}
          <path
            d="M50 4 C 41 16, 36 28, 41 38 C 45 44, 55 44, 59 38 C 64 28, 59 16, 50 4 Z"
            fill="url(#flameGrad)"
          />
          {/* Inner intense flame core */}
          <path
            d="M50 16 C 45 23, 43 30, 46 36 C 48 40, 52 40, 54 36 C 57 30, 55 23, 50 16 Z"
            fill="url(#flameCore)"
          />
          {/* Wick */}
          <line x1="50" y1="36" x2="50" y2="46" stroke="#4A1E02" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Traditional Diya Brass Bowl */}
        <path
          d="M14 48 C 16 66, 32 76, 50 76 C 68 76, 84 66, 86 48 C 76 53, 58 55, 50 55 C 42 55, 24 53, 14 48 Z"
          fill="url(#brassGrad)"
          stroke="#F3D995"
          strokeWidth="1.2"
        />

        {/* Oil reservoir surface */}
        <ellipse cx="50" cy="50" rx="32" ry="5.5" fill="#422502" stroke="#8C6517" strokeWidth="0.8" />
        <ellipse cx="50" cy="50.5" rx="28" ry="4" fill="#6A3B04" fillOpacity="0.85" />
        {/* Golden reflection on oil */}
        <ellipse cx="50" cy="49" rx="16" ry="2" fill="#FFA500" fillOpacity="0.6" />

        {/* Ornate engraved pattern on Diya body */}
        <path
          d="M26 58 C 34 68, 66 68, 74 58"
          stroke="#F3D995"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          strokeOpacity="0.8"
        />
        <circle cx="50" cy="65" r="2.5" fill="#F3D995" />
        <circle cx="40" cy="63" r="1.5" fill="#F3D995" fillOpacity="0.8" />
        <circle cx="60" cy="63" r="1.5" fill="#F3D995" fillOpacity="0.8" />

        {/* Pedestal Base */}
        <path
          d="M34 76 L30 84 C 42 87, 58 87, 70 84 L66 76 Z"
          fill="url(#rimGrad)"
          stroke="#D4AF55"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
};
