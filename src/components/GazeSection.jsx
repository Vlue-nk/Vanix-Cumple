import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GazeSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Expand video from small to full width
    tl.fromTo(videoRef.current,
      { width: "30%", borderRadius: "2rem" },
      { width: "100%", borderRadius: "0rem", duration: 1, ease: "power2.out" }
    );

    // Text animation (typewriter-ish fade)
    tl.fromTo(textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.5"
    );

  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#121212] flex flex-col items-center justify-center py-20"
      data-cursor="eye" // Trigger custom cursor
    >
      <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/trend_ojos.mp4"
          muted
          loop
          autoPlay
          playsInline
          className="h-full object-cover shadow-2xl"
        />
      </div>

      <div className="mt-12 text-center text-white-off">
        <p ref={textRef} className="text-4xl font-serif italic text-stroke">
          "Mi vista favorita…"
        </p>
      </div>
    </section>
  );
};

export default GazeSection;
