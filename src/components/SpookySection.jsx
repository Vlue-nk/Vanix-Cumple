import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SpookySection = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Marquee
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 15,
      ease: "none",
      repeat: -1
    });

    // Glitch Scroll Effect
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      onEnter: () => {
        gsap.fromTo(textRef.current,
          { skewX: 20, opacity: 0, textShadow: "5px 0 red" },
          { skewX: 0, opacity: 1, textShadow: "0px 0 red", duration: 0.5, ease: "rough" }
        );
      }
    });

  }, []);

  const videos = [
    "/assets/video1_halloween.mp4",
    "/assets/video2_halloween.mp4",
    "/assets/video3_halloween.mp4",
    "/assets/video4_halloween.mp4",
    "/assets/video5_halloween.mp4"
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-20 bg-black overflow-hidden flex flex-col justify-center items-center">

      <div ref={textRef} className="mb-10 font-chaos text-4xl text-white/70 tracking-widest uppercase">
        DULCE O TRUCO
      </div>

      {/* Rotated Marquee Container */}
      <div className="w-[120%] -rotate-3 bg-blood-red/10 py-10 border-y border-blood-red/30 backdrop-blur-sm">
        <div ref={marqueeRef} className="flex gap-8 w-max pl-4">
          {[...videos, ...videos].map((src, i) => (
            <div key={i} className="relative w-[320px] aspect-[9/16] bg-black border border-white/10 group overflow-hidden rounded-sm">
              <video
                src={src}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Sin City Highlight Card - Fixed Position or Floating */}
      <div className="absolute top-1/2 left-[10%] w-64 aspect-[3/4] z-20 pointer-events-none mix-blend-lighten hidden md:block">
        <img src="/assets/cartitaxi2_halloween.webp" className="w-full h-full object-cover filter contrast-150 grayscale" alt="Highlight" />
        <div className="absolute inset-0 bg-red-600 mix-blend-color-dodge opacity-20 animate-pulse"></div>
      </div>

    </section>
  );
};

export default SpookySection;
