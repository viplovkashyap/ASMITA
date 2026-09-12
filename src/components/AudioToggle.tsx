import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!isPlaying) {
      // Start Procedural Indian Ambient Tanpura Drones (Root Pa + Sa: ~146.8Hz D3, 220Hz A3, 293.66Hz D4)
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.065, ctx.currentTime + 3); // Soft ambient volume
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Indian Tanpura resonant frequencies (in D)
        const frequencies = [146.83, 220.0, 293.66, 440.0, 587.33];
        const oscList: OscillatorNode[] = [];

        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO detune for natural acoustic shimmer
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.value = 0.2 + idx * 0.15;
          lfoGain.gain.value = 1.5;
          lfo.connect(osc.detune);
          lfo.start();

          filter.type = 'lowpass';
          filter.frequency.value = 1200;

          osc.connect(filter);
          if (panner) {
            panner.pan.value = ((idx - 2) / 3) * 0.5;
            filter.connect(panner);
            panner.connect(masterGain);
          } else {
            filter.connect(masterGain);
          }

          osc.start();
          oscList.push(osc);
        });

        oscillatorsRef.current = oscList;
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio could not be initialized:', err);
      }
    } else {
      // Fade out smoothly
      if (audioCtxRef.current && gainNodeRef.current) {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore already stopped
            }
          });
          oscillatorsRef.current = [];
          setIsPlaying(false);
        }, 850);
      } else {
        setIsPlaying(false);
      }
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`interactive group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF55]/40 bg-[#160A24]/70 hover:bg-[#1D0B2E] hover:border-[#F3D995] text-[#D4AF55] hover:text-[#F3D995] transition-all duration-300 text-xs tracking-wider uppercase font-sans-clean ${className}`}
      title={isPlaying ? 'Mute ambient sound' : 'Enable ambient sitar/tanpura harmony'}
      aria-label={isPlaying ? 'Mute sound' : 'Unmute ambient sound'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden sm:inline text-[11px] font-medium tracking-widest text-[#F3D995]">
            Sound On
          </span>
          <span className="flex gap-0.5 items-center h-2.5">
            <span className="w-0.5 h-2 bg-[#F3D995] animate-bounce" style={{ animationDuration: '0.6s' }} />
            <span className="w-0.5 h-3 bg-[#F3D995] animate-bounce" style={{ animationDuration: '0.9s' }} />
            <span className="w-0.5 h-1.5 bg-[#F3D995] animate-bounce" style={{ animationDuration: '0.7s' }} />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
          <span className="hidden sm:inline text-[11px] opacity-70 group-hover:opacity-100 font-medium tracking-widest">
            Ambience
          </span>
        </>
      )}
    </button>
  );
};
