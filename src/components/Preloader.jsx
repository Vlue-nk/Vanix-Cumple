import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, COLORS } from "../store/useStore";

const Preloader = () => {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { setIsLoading } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 19) {
          clearInterval(timer);
          return 19;
        }
        return prev + 1;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count === 19) setLoaded(true);
  }, [count]);

  const handleEnter = () => {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      setIsLoading(false);
      return;
    }

    const audioContext = new AudioContextCtor();
    audioContext.resume().then(() => setIsLoading(false)).catch(() => setIsLoading(false));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0a0a0a 70%, #000000 100%)`
      }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glow behind number */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: `${COLORS.burntOrange}30` }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col items-center">

        {/* Decorative top line */}
        <motion.div
          className="w-24 h-[1px] mb-8"
          style={{ background: `linear-gradient(90deg, transparent, ${COLORS.burntOrange}, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Small text above number */}
        <motion.p
          className="text-xs uppercase tracking-[0.5em] mb-4 font-light"
          style={{ color: `${COLORS.cream}60` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Cumpleaños №
        </motion.p>

        {/* Giant Number with gradient */}
        <motion.h1
          className="text-[20vw] md:text-[15vw] font-display font-black leading-none tracking-tighter"
          style={{
            background: `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.burntOrange} 50%, ${COLORS.cream} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            textShadow: `0 0 80px ${COLORS.burntOrange}40`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          {count < 10 ? `0${count}` : count}
        </motion.h1>

        {/* Progress bar */}
        <div className="relative w-64 h-[2px] mt-8 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${COLORS.burntOrange}, ${COLORS.cream})`
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${(count / 19) * 100}%` }}
            transition={{ ease: "linear" }}
          />

          {/* Snoopy walking */}
          <motion.div
            className="absolute -top-10 w-12 h-12"
            style={{ left: `${(count / 19) * 85}%` }}
            animate={{ rotate: [0, -5, 0, 5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <img
              src="/assets/snoopy_perfil.webp"
              alt="Snoopy"
              className="w-full h-full object-contain drop-shadow-lg"
              style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}
            />
          </motion.div>

          {/* Cooky waiting at the end */}
          <AnimatePresence>
            {count >= 15 && (
              <motion.div
                className="absolute -top-10 right-0 w-12 h-12"
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <img
                  src="/assets/cooky_stand.webp"
                  alt="Cooky"
                  className="w-full h-full object-contain"
                  style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ready text with typing effect */}
        <motion.p
          className="mt-12 text-lg md:text-xl font-serif italic tracking-wide"
          style={{
            color: COLORS.cream,
            textShadow: `0 0 20px ${COLORS.burntOrange}40`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: count === 19 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          ¿Lista para celebrar, <span style={{ color: COLORS.burntOrange }}>Vania</span>?
        </motion.p>

        {/* Enter Button - Premium Style */}
        <AnimatePresence>
          {loaded && (
            <motion.button
              onClick={handleEnter}
              className="mt-8 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl"
                style={{ background: COLORS.burntOrange }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Button content */}
              <span
                className="relative block px-10 py-4 rounded-full font-bold text-sm uppercase tracking-[0.3em] border-2 transition-all duration-300"
                style={{
                  borderColor: COLORS.cream,
                  color: COLORS.cream,
                  background: "transparent",
                }}
              >
                <span className="relative z-10">Entrar al Vaniverso</span>

                {/* Hover fill effect */}
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: COLORS.burntOrange }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Decorative bottom line */}
        <motion.div
          className="w-16 h-[1px] mt-12"
          style={{ background: `linear-gradient(90deg, transparent, ${COLORS.cream}40, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/10" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/10" />
    </motion.div>
  );
};

export default Preloader;
