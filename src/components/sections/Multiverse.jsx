import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "../../store/useStore";

gsap.registerPlugin(ScrollTrigger);

const Multiverse = () => {
  const [scared, setScared] = useState(false);
  const [bloodPhase, setBloodPhase] = useState(0); // 0: none, 1: dripping, 2: fade
  const { setCurrentTheme, setCursorType } = useStore();
  const containerRef = useRef(null);
  const balloonRef = useRef(null);
  const screamAudio = useRef(null);
  const distortedAudio = useRef(null);
  const [proximity, setProximity] = useState(1); // 0 = close, 1 = far
  const [balloonNoise, setBalloonNoise] = useState({ x: 0, y: 0 });

  useEffect(() => {
    screamAudio.current = new Audio("/assets/pennywise_laugh.mp3");
    distortedAudio.current = new Audio("/assets/committed.mp3");
    if (distortedAudio.current) {
      distortedAudio.current.volume = 0.3;
      distortedAudio.current.loop = true;
    }
  }, []);

  // Balloon floating noise animation
  useEffect(() => {
    const noiseInterval = setInterval(() => {
      setBalloonNoise({
        x: Math.sin(Date.now() / 800) * 8 + Math.sin(Date.now() / 400) * 3,
        y: Math.sin(Date.now() / 600) * 15 + Math.sin(Date.now() / 300) * 5
      });
    }, 50);
    return () => clearInterval(noiseInterval);
  }, []);

  // Mouse proximity detection
  const handleMouseMove = (e) => {
    if (!balloonRef.current || scared) return;

    const rect = balloonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    const maxDistance = 400;

    const newProximity = Math.min(1, distance / maxDistance);
    setProximity(newProximity);

    // Distort audio when close
    if (distortedAudio.current) {
      distortedAudio.current.playbackRate = 0.5 + newProximity * 0.5;
    }
  };

  // GSAP Pinning
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScream = () => {
    if (screamAudio.current) {
      screamAudio.current.volume = 1.0;
      screamAudio.current.play();
    }
    if (distortedAudio.current) {
      distortedAudio.current.pause();
    }

    setScared(true);
    setCurrentTheme('halloween');

    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);

    // Blood sequence
    setTimeout(() => setBloodPhase(1), 600);
    setTimeout(() => setBloodPhase(2), 2500);
    setTimeout(() => {
      setScared(false);
      setBloodPhase(0);
    }, 4000);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: "linear-gradient(180deg, #fce4ec 0%, #e8f5e9 50%, #fff8e1 100%)"
      }}
    >
      {/* Cute deco - fades with proximity */}
      <div className="absolute top-10 left-10 transition-opacity duration-300" style={{ opacity: proximity * 0.5 }}>
        <img src="/assets/cooky_stand.webp" alt="Cooky" className="h-20" />
      </div>
      <div className="absolute bottom-10 right-10 transition-opacity duration-300" style={{ opacity: proximity * 0.5 }}>
        <img src="/assets/snoopy_perfil.webp" alt="Snoopy" className="h-16" />
      </div>

      {/* Darkness overlay - increases when close to balloon */}
      <div
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 z-10"
        style={{ opacity: (1 - proximity) * 0.6 }}
      />

      {/* The Balloon */}
      {!scared && (
        <div
          ref={balloonRef}
          className="relative z-20 cursor-pointer"
          onMouseEnter={() => setCursorType("balloon")}
          onMouseLeave={() => setCursorType("default")}
          onClick={handleScream}
          style={{
            transform: `translate(${balloonNoise.x}px, ${balloonNoise.y}px)`,
            filter: `saturate(${0.5 + proximity * 0.5})`
          }}
        >
          {/* Wrong shadow - doesn't match physics */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/30 rounded-full blur-xl"
            style={{
              transform: `translateX(${-balloonNoise.x * 1.5}px) scale(${1 + (1 - proximity) * 0.3})`
            }}
          />

          {/* Balloon with vibration on proximity */}
          <motion.img
            src="/assets/pennywise_balloon.webp"
            alt="Globo"
            className="w-48 md:w-64"
            animate={{
              scale: [1, 1.05, 1],
              rotate: proximity < 0.3 ? [-2, 2, -2] : 0
            }}
            transition={{
              scale: { repeat: Infinity, duration: 1.2 },
              rotate: { repeat: Infinity, duration: 0.1 }
            }}
          />

          {/* Warning - more urgent when close */}
          <motion.p
            className="text-center mt-6 font-mono text-lg tracking-[0.3em] transition-colors"
            style={{ color: proximity < 0.5 ? "#ff0000" : "#9ca3af" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: proximity < 0.5 ? 0.3 : 2 }}
          >
            NO TOCAR
          </motion.p>
        </div>
      )}

      {/* JUMPSCARE - Instant cut (0ms) */}
      <AnimatePresence>
        {scared && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* White strobe flash */}
            <motion.div
              className="absolute inset-0 bg-white z-10"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />

            {/* Pennywise - aggressive shake */}
            <motion.img
              src="/assets/pennywise_face.webp"
              className="w-full h-full object-cover md:object-contain"
              animate={{
                scale: 1.3,
                x: [0, -15, 15, -15, 0],
                y: [0, 8, -8, 8, 0]
              }}
              transition={{
                x: { repeat: Infinity, duration: 0.05 },
                y: { repeat: Infinity, duration: 0.06 }
              }}
            />

            {/* Liquid Blood SVG */}
            {bloodPhase >= 1 && (
              <svg
                className="absolute inset-0 w-full h-full z-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  fill="#8B0000"
                  initial={{
                    d: "M0,0 L100,0 Q95,2 90,0 Q80,3 70,0 Q60,2 50,0 Q40,3 30,0 Q20,2 10,0 Q5,3 0,0 Z"
                  }}
                  animate={{
                    d: "M0,0 L100,0 L100,100 L0,100 Z"
                  }}
                  transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                />
              </svg>
            )}

            {/* Fade to black */}
            {bloodPhase >= 2 && (
              <motion.div
                className="absolute inset-0 bg-black z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Multiverse;
