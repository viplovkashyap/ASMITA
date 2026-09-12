import React, { useMemo } from 'react';

interface PetalFieldProps {
  count?: number;
  className?: string;
}

export const PetalField: React.FC<PetalFieldProps> = ({ count = 10, className = '' }) => {
  // Generate random static properties for petals
  const petals = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      left: 5 + (i * 90) / count + (Math.random() * 5 - 2.5),
      duration: 14 + Math.random() * 12,
      delay: -(Math.random() * 18),
      size: 14 + Math.random() * 10,
      rotation: Math.random() * 360,
      type: i % 3 === 0 ? 'marigold' : 'rose',
      opacity: 0.35 + Math.random() * 0.35,
    }));
  }, [count]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-10 ${className}`}
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: `-5%`,
            opacity: petal.opacity,
            willChange: 'transform',
            animation: `petalFall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
            }}
          >
            {petal.type === 'rose' ? (
              <path
                d="M15 2 C 26 2, 28 20, 26 32 C 22 38, 8 38, 4 32 C 2 20, 4 2, 15 2 Z"
                fill="url(#roseGrad)"
              />
            ) : (
              <path
                d="M15 2 C 24 6, 26 22, 22 35 C 18 39, 12 39, 8 35 C 4 22, 6 6, 15 2 Z"
                fill="url(#marigoldPetalGrad)"
              />
            )}
          </svg>
        </div>
      ))}

      {/* Reusable SVG Gradients */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E91E63" />
            <stop offset="60%" stopColor="#C2185B" />
            <stop offset="100%" stopColor="#880E4F" />
          </linearGradient>
          <linearGradient id="marigoldPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="50%" stopColor="#FFA000" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translate3d(0, -10px, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(25px, 50vh, 0) rotate(180deg);
          }
          100% {
            transform: translate3d(-20px, 105vh, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
