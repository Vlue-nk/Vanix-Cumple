import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const cookyRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, delay: 0.2 }
    );

    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1 },
      "-=1.0"
    );

    tl.fromTo(cookyRef.current,
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.5"
    );


    // Scroll Parallax
    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      yPercent: 20,
      scale: 1.1
    });

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 30%",
        scrub: true,
      },
      yPercent: -50,
      opacity: 0,
      filter: "blur(10px)"
    });

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-premium-dark">

      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div ref={imageRef} className="w-full h-full relative">
          <img
            src="/assets/yan_foto.webp"
            alt="Committed"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85"></div>
          {/* Duotono sutil (premium, sin neón) */}
          <div className="absolute inset-0 opacity-40" style={{ background: 'linear-gradient(135deg, rgba(230,230,230,0.12), rgba(255,255,255,0))', mixBlendMode: 'overlay' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center mix-blend-screen">
        <h1 ref={titleRef} className="text-[12vw] md:text-[15vw] leading-none font-editorial font-bold text-white tracking-tight drop-shadow-2xl">
          COMMITTED
        </h1>
      </div>

      {/* Decorative Cooky */}
      <div className="absolute top-[20%] right-[10%] z-20 mix-blend-normal">
        <img
          ref={cookyRef}
          src="/assets/cooky_stand.webp"
          alt="Cooky"
          className="w-24 md:w-32 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-pulse"
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-xs font-mono uppercase tracking-widest">Explora</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
      </div>

    </section>
  );
};

export default HeroSection;
