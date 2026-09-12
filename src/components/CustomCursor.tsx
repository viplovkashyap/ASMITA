import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [hoverState, setHoverState] = useState<'normal' | 'pointer' | 'asmita'>('normal');
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch-only devices
    if ('ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1)) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
      isMoving = true;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="asmita"]')) {
        setHoverState('asmita');
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive')
      ) {
        setHoverState('pointer');
      } else {
        setHoverState('normal');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Optimized lerp loop for smooth trailing ring
    let frameId: number;
    const updateRing = () => {
      // Only recalculate if difference is noticeable
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;

      if (isMoving || Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        ringX += dx * 0.22;
        ringY += dy * 0.22;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }

      frameId = requestAnimationFrame(updateRing);
    };
    frameId = requestAnimationFrame(updateRing);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  if (isTouch) return null;

  return (
    <>
      {/* Central Gold Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full pointer-events-none z-[9999] transition-opacity duration-200 ${
          visible ? 'opacity-100' : 'opacity-0'
        } ${
          isClicking ? 'scale-75' : 'scale-100'
        } ${
          hoverState === 'asmita'
            ? 'bg-[#FFFFFF] shadow-[0_0_10px_#F3D995]'
            : 'bg-[#F3D995] shadow-[0_0_6px_#D4AF55]'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Smooth Lag Gold Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-all duration-200 ease-out border ${
          visible ? 'opacity-100' : 'opacity-0'
        } ${
          isClicking ? 'scale-90 opacity-70' : 'scale-100'
        } ${
          hoverState === 'asmita'
            ? 'w-16 h-16 -ml-8 -mt-8 border-[#F3D995] bg-[#F3D995]/15 backdrop-blur-[1px] shadow-[0_0_20px_rgba(243,217,149,0.3)]'
            : hoverState === 'pointer'
            ? 'w-10 h-10 -ml-5 -mt-5 border-[#D4AF55] bg-[#D4AF55]/10'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border-[#D4AF55]/60'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
