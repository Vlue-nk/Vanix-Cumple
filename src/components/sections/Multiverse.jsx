import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore, COLORS } from "../../store/useStore";
import useZoneDetector from "../../hooks/useZoneDetector";

gsap.registerPlugin(ScrollTrigger);

const Multiverse = () => {
  const {
    isScareActive,
    setIsScareActive,
    setCursorType,
    bloodPhase,
    setBloodPhase,
    lenisRef,
    setCurrentTheme
  } = useStore();

  const zoneRef = useZoneDetector('multiverse');
  const containerRef = useRef(null);
  const balloonRef = useRef(null);

  // Audio refs
  const screamAudio = useRef(null);
  const popAudio = useRef(null);
  const impactAudio = useRef(null);

  // Balloon state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [balloonOffset, setBalloonOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    screamAudio.current = new Audio("/assets/pennywise_laugh.mp3");
    popAudio.current = new Audio("/assets/pop.mp3");
    impactAudio.current = new Audio("/assets/impact.mp3");
  }, []);

  // Mouse tracking for balloon repel effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!balloonRef.current || isScareActive) return;

      const rect = balloonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      // If mouse is within 200px, balloon moves away
      if (distance < 200) {
        const repelStrength = (200 - distance) / 200;
        setBalloonOffset({
          x: -dx * repelStrength * 0.3,
          y: -dy * repelStrength * 0.3
        });
      } else {
        setBalloonOffset({ x: 0, y: 0 });
      }

      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isScareActive]);

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

  const triggerBloodSequence = () => {
    // === STATE 2: THE SCARE ===

    // Block scroll immediately
    setIsScareActive(true);

    // POP sound
    if (popAudio.current) {
      popAudio.current.volume = 0.9;
      popAudio.current.play().catch(() => { });
    }

    // Scream + Impact at MAX volume after tiny delay
    setTimeout(() => {
      if (screamAudio.current) {
        screamAudio.current.volume = 1.0;
        screamAudio.current.play().catch(() => { });
      }
      if (impactAudio.current) {
        impactAudio.current.volume = 1.0;
        impactAudio.current.play().catch(() => { });
      }
    }, 50);

    // Vibrate
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);

    // === STATE 3: BLOOD TRANSITION (After 500ms of Pennywise) ===
    setTimeout(() => {
      // Start blood covering
      setBloodPhase(1);
    }, 500);

    // === THE MAGIC SWAP (When fully red) ===
    setTimeout(() => {
      setBloodPhase(2); // Full coverage

      // While user sees only red, teleport to Climax
      if (lenisRef) {
        lenisRef.scrollTo('#climax', { immediate: true });
      } else {
        // Fallback
        const climaxEl = document.getElementById('climax');
        if (climaxEl) {
          window.scrollTo({ top: climaxEl.offsetTop, behavior: 'instant' });
        }
      }

      // Change theme to climax
      setCurrentTheme('climax');

    }, 1500);

    // === THE REVEAL (Blood slides down) ===
    setTimeout(() => {
      setBloodPhase(3);
    }, 2500);

    // === CLEANUP ===
    setTimeout(() => {
      setBloodPhase(0);
      setIsScareActive(false);
    }, 4000);
  };

  return (
    <>
      <section
        ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
        id="multiverse"
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent"
      >
        {/* Light pastel overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(180deg, ${COLORS.lilacPastel}90 0%, #dda0dd90 50%, ${COLORS.lilacPastel}90 100%)`
          }}
        />

        {/* Cute decorations - smaller */}
        <div className="absolute top-8 left-8 opacity-50 z-10">
          <img src="/assets/cooky_stand.webp" alt="Cooky" className="h-10" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-50 z-10">
          <img src="/assets/snoopy_perfil.webp" alt="Snoopy" className="h-8" />
        </div>

        {/* THE BALLOON - Complex behavior */}
        {!isScareActive && (
          <motion.div
            ref={balloonRef}
            className="relative cursor-pointer z-20"
            onMouseEnter={() => setCursorType("balloon")}
            onMouseLeave={() => setCursorType("default")}
            onClick={triggerBloodSequence}
            style={{
              x: balloonOffset.x,
              y: balloonOffset.y
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {/* Float animation */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {/* Heartbeat animation */}
              <motion.img
                src="/assets/pennywise_balloon.webp"
                alt="Globo"
                className="w-56 md:w-72 drop-shadow-2xl"
                animate={{
                  scale: [1, 1.06, 1, 1.06, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 1]
                }}
              />
            </motion.div>

            {/* Warning text */}
            <motion.p
              className="text-center mt-8 font-mono text-xl tracking-[0.2em]"
              style={{ color: COLORS.charcoal }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎈 Toca el globo
            </motion.p>
          </motion.div>
        )}
      </section>

      {/* JUMPSCARE OVERLAY (Pennywise) */}
      <AnimatePresence>
        {isScareActive && bloodPhase < 2 && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden"
            style={{ background: COLORS.charcoal }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {/* Pennywise with shake */}
            <motion.img
              src="/assets/pennywise_face.webp"
              className="w-full h-full object-cover"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{
                scale: 1.2,
                opacity: 1,
                x: [0, -15, 15, -15, 15, -10, 10, 0],
                y: [0, 8, -8, 8, -8, 5, -5, 0],
              }}
              transition={{
                scale: { duration: 0.15 },
                opacity: { duration: 0.1 },
                x: { duration: 0.4, ease: "linear" },
                y: { duration: 0.4, ease: "linear" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Multiverse;
