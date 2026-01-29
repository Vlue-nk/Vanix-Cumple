import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";

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
    }, 150); // Velocidad del contador

    return () => clearInterval(timer);
  }, [setIsLoading]);

  useEffect(() => {
    // Cuando el contador llegue a 19, habilitamos el botón ENTER
    if (count === 19) setLoaded(true);
  }, [count]);

  const handleEnter = () => {
    // Inicializamos el audio context (requerido por autoplay policies)
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      setIsLoading(false);
      return;
    }

    const audioContext = new AudioContextCtor();
    audioContext
      .resume()
      .then(() => {
        setIsLoading(false); // Aquí recién quitamos el preloader
      })
      .catch(() => {
        // Si falla, igual dejamos entrar (no bloqueamos la app)
        setIsLoading(false);
      });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-vania-black text-white overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative w-full max-w-4xl px-10">
        {/* Contador Gigante */}
        <h1 className="text-[15vw] font-bold leading-none tracking-tighter text-center opacity-90 font-display">
          {count < 10 ? `0${count}` : count}
        </h1>

        {/* Línea de suelo */}
        <div className="w-full h-[2px] bg-white/20 mt-4 relative">
          {/* Snoopy caminando */}
          <motion.div
            className="absolute -top-12 w-16 h-16"
            animate={{ left: `${(count / 19) * 90}%` }}
            transition={{ ease: "linear" }}
          >
            {/* Reemplaza src con tu gif de snoopy caminando */}
            <img src="/assets/snoopy_perfil.webp" alt="Snoopy" className="w-full h-full object-contain grayscale invert" />
          </motion.div>

          {/* Cooky apareciendo al final */}
          {count === 19 && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute -top-12 left-[92%] w-16 h-16"
            >
              {/* Reemplaza src con tu png de Cooky */}
              <img src="/assets/cooky_stand.webp" alt="Cooky" className="w-full h-full object-contain" />
            </motion.div>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: count === 19 ? 1 : 0 }}
          className="text-center mt-10 text-xl font-light tracking-widest uppercase text-neon-blue"
        >
          Ready to celebrate, Vania?
        </motion.p>

        {/* BOTÓN ENTER (Solo aparece cuando carga) */}
        <AnimatePresence>
          {loaded && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleEnter}
              className="mt-10 px-8 py-3 bg-white text-black font-bold text-xl uppercase tracking-widest hover:bg-neon-blue hover:text-white transition-colors rounded-full z-50 pointer-events-auto"
            >
              Enter Vaniaverse
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Preloader;
