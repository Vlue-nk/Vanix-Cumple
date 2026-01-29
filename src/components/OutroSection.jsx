import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OutroSection = () => {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);

  // List of "Random Memories"
  const memories = [
    "/assets/filtro1_universidad.mp4",
    "/assets/filtro2_universidad.mp4",
    "/assets/filtro3_universidad.mp4",
    "/assets/filtro4_universidad.mp4",
    "/assets/filtro5_universidad.mp4",
    "/assets/filtro6_universidad.mp4",
    "/assets/filtro7_universidad.mp4",
    "/assets/filtro8_universidad.mp4",
    "/assets/filtro9_universidad.mp4",
    "/assets/filtro10_universidad.mp4",
    "/assets/esperando_rest.mp4",
    "/assets/docca_comida.mp4",
    "/assets/ultsalida_parque.mp4"
  ];

  useEffect(() => {
    const strip = stripRef.current;
    const totalWidth = strip.scrollWidth;
    const windowWidth = window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalWidth}`, // Scroll amount proportional to width
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Horizontal Scroll
    tl.to(strip, {
      x: -(totalWidth - windowWidth),
      ease: "none"
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#111] overflow-hidden flex items-center">

      {/* Film Strip Container */}
      <div ref={stripRef} className="flex items-center gap-0 pl-[50vw]">
        {memories.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 mx-4">
            {/* Film Holes Top/Bottom */}
            <div className="absolute top-[-20px] left-0 w-full h-[20px] bg-black border-dashed border-b-2 border-white/30 flex justify-between px-2">
              {[...Array(6)].map((_, k) => <div key={k} className="w-2 h-3 bg-white/20 rounded-sm" />)}
            </div>
            <div className="absolute bottom-[-20px] left-0 w-full h-[20px] bg-black border-dashed border-t-2 border-white/30 flex justify-between px-2">
              {[...Array(6)].map((_, k) => <div key={k} className="w-2 h-3 bg-white/20 rounded-sm" />)}
            </div>

            {/* Video Content */}
            <div className="w-[300px] md:w-[400px] h-[500px] md:h-[600px] bg-black border-x-8 border-black overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
              <video
                src={src}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 font-mono text-xs bg-black text-white px-2 opacity-50">
                REC 00:0{i}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 font-chaos text-sm">
        SCROLL TO REMEMBER
      </div>

    </section>
  );
};

export default OutroSection;
