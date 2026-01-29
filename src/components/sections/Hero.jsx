import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

const Hero = () => {
  const { setCurrentTrack, setCurrentTheme } = useStore();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax diferenciado - texto sube más rápido que imagen
  const yText = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [5, -2]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setCurrentTrack(content.hero.audio);
    setCurrentTheme(content.hero.theme);
  }, [setCurrentTrack, setCurrentTheme]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] w-full flex items-start justify-center px-6 md:px-20 pt-32 pb-40"
    >
      {/* Pin container for visual content */}
      <div className="sticky top-20 max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center z-10">

        {/* COLUMNA TEXTO (Izquierda) - Display Condensed */}
        <motion.div
          className="md:col-span-5 flex flex-col justify-center order-2 md:order-1"
          style={{ y: yText, opacity: opacityText }}
        >
          <div className="overflow-hidden mb-6">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
              className="block text-sm md:text-base font-serif italic tracking-wider text-gray-500"
            >
              — Cap. 01: El Inicio
            </motion.span>
          </div>

          {/* Tipografía Display Enorme Condensada */}
          <motion.h1
            className="text-7xl md:text-[10rem] font-display font-black leading-[0.85] text-gray-900 mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            NUESTRO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 italic font-light">
              PACTO
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-500 max-w-md font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Un viaje a través de nuestras memorias, sonidos y momentos.
            <span className="block mt-2 text-gray-400 italic">Desliza suavemente para recordar.</span>
          </motion.p>

          {/* Audio indicator */}
          <motion.div
            className="mt-8 flex items-center gap-3 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex gap-[2px] items-end h-4">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-gray-400 rounded-full"
                  animate={{ height: [4, 14, 8, 16, 4] }}
                  transition={{ repeat: Infinity, duration: 0.8 + i * 0.1, ease: "easeInOut" }}
                />
              ))}
            </div>
            <span className="text-xs uppercase tracking-widest font-mono">Now Playing: Committed</span>
          </motion.div>
        </motion.div>

        {/* COLUMNA IMAGEN (Derecha) - Flotante con inclinación */}
        <motion.div
          className="md:col-span-7 relative order-1 md:order-2"
          style={{ y: yImage, rotate: rotateImage }}
        >
          {/* Marco Decorativo offset */}
          <div className="absolute top-[-15px] right-[-15px] w-full h-full border border-gray-300/40 rounded-sm z-0" />
          <div className="absolute top-[-30px] right-[-30px] w-full h-full border border-gray-200/20 rounded-sm z-0" />

          <motion.div
            className="relative overflow-hidden aspect-[4/5] shadow-2xl rounded-sm"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
          >
            <img
              src={content.hero.image}
              alt="Nosotros"
              className="w-full h-full object-cover"
            />

            {/* Overlay elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

            {/* Grain overlay para textura */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
              }}
            />
          </motion.div>

          {/* Tarjeta flotante con ubicación */}
          <motion.div
            className="absolute -bottom-8 -left-8 bg-white p-5 shadow-xl max-w-xs hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Ubicación</p>
            <p className="text-gray-900 font-semibold text-lg">Áreas Verdes</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
