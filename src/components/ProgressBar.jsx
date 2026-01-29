import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ProgressBar = ({ scrollProgress }) => {
  const containerRef = useRef(null);
  const snoopyRef = useRef(null);
  const cookyRef = useRef(null);

  useEffect(() => {
    // Animate Snoopy and Cooky based on scrollProgress
    // scrollProgress is 0 to 100
    const progress = Math.min(100, Math.max(0, scrollProgress));

    // Position calculation: 
    // They move from left to right.
    // Snoopy is slightly ahead.
    // Cooky is chasing.

    if (containerRef.current) {
      gsap.to(snoopyRef.current, {
        left: `${progress}%`,
        xPercent: -100, // Anchor point
        duration: 0.5,
        ease: 'none'
      });

      gsap.to(cookyRef.current, {
        left: `${Math.max(0, progress - 5)}%`, // Cooky is 5% behind
        xPercent: -100,
        duration: 0.6,
        ease: 'none'
      });
    }

  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 w-full h-16 pointer-events-none z-50 overflow-hidden"
    >
      {/* Línea de progreso (sutil, sin color neón) */}
      <div
        className="absolute bottom-0 left-0 h-1 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%`, background: 'rgba(241,241,239,0.22)' }}
      />

      {/* Snoopy */}
      <div
        ref={snoopyRef}
        className="absolute bottom-1 w-12 h-12"
        style={{ left: '0%' }}
      >
        <img src="/assets/snoopy_perfil.webp" alt="Snoopy" className="w-full h-full object-contain" />
      </div>

      {/* Cooky */}
      <div
        ref={cookyRef}
        className="absolute bottom-1 w-14 h-14"
        style={{ left: '0%' }}
      >
        <img src="/assets/cooky_run.webp" alt="Cooky" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default ProgressBar;
