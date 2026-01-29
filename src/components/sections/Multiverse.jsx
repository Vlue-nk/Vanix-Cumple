import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../../data/content";
import { useStore } from "../../store/useStore";

const Multiverse = () => {
  const [scared, setScared] = useState(false);
  const [showBlood, setShowBlood] = useState(false);
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const { setCurrentTheme, setCursorType } = useStore();
  const screamAudio = useRef(null);

  useEffect(() => {
    screamAudio.current = new Audio(content.pennywiseScare?.scream || "/assets/pennywise_laugh.mp3");
  }, []);

  const handleScream = () => {
    if (screamAudio.current) {
      screamAudio.current.volume = 1.0;
      screamAudio.current.play();
    }
    setScared(true);
    setCurrentTheme('halloween');

    // Vibración del navegador (si es compatible)
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);

    // Secuencia de efectos
    setTimeout(() => setShowBlood(true), 800);
    setTimeout(() => setFadeToBlack(true), 2500);
    setTimeout(() => {
      setScared(false);
      setShowBlood(false);
      setFadeToBlack(false);
    }, 4000);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fce4ec 0%, #e8f5e9 50%, #fff8e1 100%)"
      }}
    >
      {/* Cute deco - BT21 characters */}
      <div className="absolute top-10 left-10 opacity-50">
        <img src={content.multiverse?.cooky || "/assets/cooky_stand.webp"} alt="Cooky" className="h-20" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-50">
        <img src={content.preloader?.snoopy || "/assets/snoopy_perfil.webp"} alt="Snoopy" className="h-16" />
      </div>

      {/* GLOBO (Grande, Latiendo) */}
      {!scared && (
        <motion.div
          className="cursor-pointer z-20 group relative"
          onMouseEnter={() => setCursorType("balloon")}
          onMouseLeave={() => setCursorType("default")}
          onClick={handleScream}
        >
          {/* Balloon with heartbeat */}
          <motion.img
            src={content.multiverse?.balloon || "/assets/pennywise_balloon.webp"}
            alt="Globo"
            className="w-56 md:w-72 drop-shadow-2xl"
            animate={{ scale: [1, 1.08, 1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />

          {/* Warning text */}
          <motion.p
            className="text-center mt-8 font-mono text-gray-400 text-lg tracking-[0.3em] group-hover:text-red-600 transition-colors"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            NO TOCAR
          </motion.p>

          {/* Cursor hint */}
          <p className="text-center mt-2 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
            🏃 RUN
          </p>
        </motion.div>
      )}

      {/* JUMPSCARE OVERLAY */}
      <AnimatePresence>
        {scared && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Pennywise Face - Aggressive shake */}
            <motion.img
              src={content.multiverse?.scareFace || "/assets/pennywise_face.webp"}
              className="w-full h-full object-cover md:object-contain"
              initial={{ scale: 0.3, rotate: -10 }}
              animate={{
                scale: [1.3, 1.2, 1.3, 1.2],
                rotate: [0, -3, 3, -3, 0],
                x: [0, -10, 10, -10, 0],
                y: [0, 5, -5, 5, 0]
              }}
              transition={{
                scale: { duration: 0.3, ease: "easeOut" },
                rotate: { repeat: Infinity, duration: 0.1 },
                x: { repeat: Infinity, duration: 0.05 },
                y: { repeat: Infinity, duration: 0.07 }
              }}
            />

            {/* Blood SVG Dripping */}
            {showBlood && (
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,0 L100,0 L100,100 L0,100 Z"
                    fill="#8B0000"
                    initial={{ d: "M0,0 L100,0 Q90,-5 80,0 Q60,-3 40,0 Q20,-5 0,0 L0,0 Z" }}
                    animate={{ d: "M0,0 L100,0 Q95,40 100,100 L0,100 Q5,40 0,0 Z" }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                  />
                </svg>
              </motion.div>
            )}

            {/* Fade to black */}
            {fadeToBlack && (
              <motion.div
                className="absolute inset-0 bg-black z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Multiverse;
