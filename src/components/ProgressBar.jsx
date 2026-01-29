import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore, COLORS } from '../store/useStore';

const ProgressBar = ({ scrollProgress }) => {
  const { currentZone } = useStore();
  const containerRef = useRef(null);
  const snoopyRef = useRef(null);
  const cookyRef = useRef(null);

  useEffect(() => {
    const progress = Math.min(100, Math.max(0, scrollProgress));

    if (containerRef.current) {
      gsap.to(snoopyRef.current, {
        left: `${progress}%`,
        xPercent: -100,
        duration: 0.5,
        ease: 'none'
      });

      gsap.to(cookyRef.current, {
        left: `${Math.max(0, progress - 5)}%`,
        xPercent: -100,
        duration: 0.6,
        ease: 'none'
      });
    }

  }, [scrollProgress]);

  // Get accent color based on zone
  const getAccentColor = () => {
    switch (currentZone) {
      case 'hero': return COLORS.burntOrange;
      case 'gaze': return COLORS.steelBlue;
      case 'halloween': return COLORS.driedBlood;
      case 'canvas': return '#8B7355';
      case 'multiverse': return '#ff69b4';
      case 'climax': return '#ffffff';
      default: return COLORS.cream;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 w-full h-14 pointer-events-none z-50"
    >
      {/* Gradient fade at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)'
        }}
      />

      {/* Progress line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${getAccentColor()}80, ${getAccentColor()})`,
          boxShadow: `0 0 10px ${getAccentColor()}60`
        }}
      />

      {/* Snoopy - small and subtle */}
      <div
        ref={snoopyRef}
        className="absolute bottom-1 w-8 h-8"
        style={{ left: '0%' }}
      >
        <img
          src="/assets/snoopy_perfil.webp"
          alt="Snoopy"
          className="w-full h-full object-contain opacity-80"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
        />
      </div>

      {/* Cooky - small and subtle */}
      <div
        ref={cookyRef}
        className="absolute bottom-1 w-10 h-10"
        style={{ left: '0%' }}
      >
        <img
          src="/assets/cooky_run.webp"
          alt="Cooky"
          className="w-full h-full object-contain opacity-80"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
        />
      </div>

      {/* Progress percentage */}
      <div
        className="absolute bottom-3 right-4 text-[10px] font-mono uppercase tracking-widest opacity-40"
        style={{ color: COLORS.cream }}
      >
        {Math.round(scrollProgress)}%
      </div>
    </div>
  );
};

export default ProgressBar;
