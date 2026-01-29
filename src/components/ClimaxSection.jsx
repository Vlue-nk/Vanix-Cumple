import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ClimaxSection = () => {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const prompterRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // 1. Teleprompter Text Scroll (Vertical opposite to scroll)
    // Move text UP as we scroll DOWN? Or move it visually behind?
    tl.to(prompterRef.current, {
      yPercent: -50,
      ease: "none"
    }, 0);

    // 2. Parallax Photo (Reverse direction - moves "up" relative to container?)
    // "Mientras ella baja, la foto sube ligeramente" -> conventional parallax
    tl.to(photoRef.current, {
      y: -100,
      scale: 1.05,
      ease: "none"
    }, 0);

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-white text-black overflow-hidden flex items-center justify-center">

      {/* Teleprompter Background */}
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none select-none">
        <div ref={prompterRef} className="text-center font-editorial font-bold text-8xl md:text-[10rem] leading-tight space-y-10 whitespace-nowrap">
          <div>TE AMO</div>
          <div>SIEMPRE</div>
          <div>NOSOTROS</div>
          <div>19 AÑOS</div>
          <div>MI PERSONA FAVORITA</div>
          <div>TE AMO</div>
          <div>SIEMPRE</div>
          <div>NOSOTROS</div>
          <div>19 AÑOS</div>
        </div>
      </div>

      {/* Central Photo */}
      <div className="relative z-10 p-4 border-2 border-black/80 shadow-2xl bg-white transform rotate-2">
        <div ref={photoRef} className="w-[300px] md:w-[400px] h-[500px] md:h-[600px] overflow-hidden">
          <img
            src="/assets/LAFOTO.webp"
            alt="19"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Decorative border lines */}
        <div className="absolute inset-2 border border-black/50 pointer-events-none"></div>
      </div>

    </section>
  );
};

export default ClimaxSection;
