import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const MultiverseSection = () => {
  const [scared, setScared] = useState(false);
  const balloonRef = useRef(null);
  const pennywiseRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Balloon float animation
    gsap.to(balloonRef.current, {
      y: -50,
      rotation: 5,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  const handleBalloonClick = () => {
    setScared(true);

    // 1. Pop balloon
    gsap.to(balloonRef.current, { scale: 1.5, opacity: 0, duration: 0.1 });

    // 2. Glitch effect on container
    const tl = gsap.timeline();

    tl.to(containerRef.current, {
      backgroundColor: "#8a0303",
      duration: 0.1,
      yoyo: true,
      repeat: 5
    });

    // 3. Show Pennywise Face briefly
    tl.fromTo(pennywiseRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.2, ease: "elastic.out" }
    );
    tl.to(pennywiseRef.current, { opacity: 0, duration: 0.5, delay: 1 });

    // 4. Reset bg
    tl.to(containerRef.current, { backgroundColor: "#e6e6fa", duration: 0.5 });

    // Play Sound (Placeholder)
    // const audio = new Audio('/assets/pennywise_laugh.mp3');
    // audio.play();
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-pastel-lilac flex flex-col items-center justify-center overflow-hidden transition-colors"
    >
      {/* Background BTS/Cute elements */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${scared ? 'opacity-0' : 'opacity-20'}`}>
        {/* Decorative floating shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full blur-xl animate-bounce"></div>
      </div>

      {/* Cooky Character */}
      <div className="relative z-10 mt-20">
        <img
          src={scared ? "/assets/cooky_shocked.webp" : "/assets/cooky_stand.webp"}
          alt="Cooky"
          className="w-48 md:w-64 object-contain transition-all duration-300"
        />
      </div>

      {/* Red Balloon */}
      {!scared && (
        <div
          ref={balloonRef}
          onClick={handleBalloonClick}
          className="absolute bottom-[-10%] z-20 cursor-pointer hover:scale-105 transition-transform"
        >
          <img src="/assets/pennywise_balloon.webp" alt="Red Balloon" className="w-20 md:w-32 drop-shadow-2xl" />
        </div>
      )}

      {/* Pennywise Jumpscare Overlay */}
      <div
        ref={pennywiseRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-30"
      >
        <img src="/assets/pennywise_face.webp" alt="Pennywise" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
      </div>

    </section>
  );
};

export default MultiverseSection;
