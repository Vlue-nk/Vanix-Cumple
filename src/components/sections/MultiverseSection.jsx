import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

const MultiverseSection = () => {
    const [isNightmare, setIsNightmare] = useState(false);
    const { setCursorType } = useStore();

    // Audio Refs
    const pennywiseAudioRef = useRef(new Audio(content.multiverse.pennywiseAudio));

    const handleBalloonClick = () => {
        // 1. Play Sound
        pennywiseAudioRef.current.volume = 1.0;
        pennywiseAudioRef.current.play().catch(e => console.error("Audio error:", e));

        // 2. Trigger Visual Chaos
        setIsNightmare(true);

        // 3. Reset after chaos (opcional, o dejarlo en modo pesadilla hasta scroll)
        setTimeout(() => {
            setIsNightmare(false);
        }, 4000); // 4 segundos de terror
    };

    return (
        <section
            className={`relative h-screen w-full overflow-hidden transition-colors duration-700 ease-in-out ${isNightmare ? 'bg-black' : 'bg-[#E6E6FA]'}`} // Lila pastel vs Negro
            onMouseEnter={() => setCursorType('balloon')}
            onMouseLeave={() => setCursorType('default')}
        >

            {/* --- LAYER 1: CUTE UNIVERSE (Visible por defecto) --- */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
                animate={{ opacity: isNightmare ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            >
                {/* BTS / Cooky Vibe */}
                <h2 className="text-6xl font-bold text-white drop-shadow-lg tracking-tight mb-8">
                    The <span className="text-bts-purple">Magic</span> Shop
                </h2>

                <div className="flex gap-4">
                    {/* Fotos de Jungkook flotando */}
                    {content.multiverse.floatingPics.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="w-48 h-64 rounded-xl overflow-hidden shadow-xl border-4 border-white rotate-3"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, delay: idx * 0.5, ease: "easeInOut" }}
                        >
                            {item.endsWith('.mp4') ? (
                                <video src={item} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                            ) : (
                                <img src={item} alt="JK" className="w-full h-full object-cover" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Cooky Character */}
                <motion.img
                    src={content.multiverse.cooky}
                    alt="Cooky"
                    className="absolute bottom-10 right-10 w-32 drop-shadow-2xl"
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            </motion.div>


            {/* --- LAYER 2: THE BALLOON TRIGGER --- */}
            {!isNightmare && (
                <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
                    initial={{ y: 200 }}
                    whileInView={{ y: -100 }} // Sube al hacer scroll
                    transition={{ duration: 10, ease: "linear" }}
                    onClick={handleBalloonClick}
                    whileHover={{ scale: 1.1 }}
                >
                    {/* Renderizamos un globo rojo con CSS o SVG */}
                    <motion.img
                        src={content.multiverse.balloon}
                        alt="Balloon"
                        className="w-24 drop-shadow-2xl"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    />
                    <p className="text-center text-xs text-gray-500 mt-24 uppercase tracking-widest font-bold">Touch Me</p>
                </motion.div>
            )}


            {/* --- LAYER 3: NIGHTMARE UNIVERSE (Hidden until triggered) --- */}
            <AnimatePresence>
                {isNightmare && (
                    <motion.div
                        className="absolute inset-0 z-30 bg-black flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Overlay de Sangre / Rojo */}
                        <div className="absolute inset-0 bg-red-900 mix-blend-multiply animate-pulse" />

                        {/* Glitch Text */}
                        <h1
                            className="text-9xl font-black text-white glitch-text animate-shake z-40 font-display"
                            data-text="YOU'LL FLOAT TOO"
                        >
                            YOU'LL FLOAT TOO
                        </h1>

                        {/* Cooky Asustado (Opcional si tienes la imagen) */}
                        {/* <img src="/assets/cooky_scared.png" className="absolute bottom-0 left-0 w-64 grayscale contrast-200" /> */}

                        {/* Ruido Visual (TV Static) */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover mix-blend-overlay"></div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default MultiverseSection;
