import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useStore, COLORS } from "../../store/useStore";
import useZoneDetector from "../../hooks/useZoneDetector";
import { content } from "../../data/content";

const OutroSection = () => {
    const { setGlobalVolume } = useStore();
    const zoneRef = useZoneDetector('sunset');
    const stripRef = useRef(null);
    const [displayedText, setDisplayedText] = useState("");
    const dedication = content.end?.dedication || "Para ti, que eres mi universo. Gracias por cada momento, cada risa, cada abrazo. Te amo infinito. — V.";

    // Film strip animation
    useEffect(() => {
        if (!stripRef.current) return;

        gsap.to(stripRef.current, {
            x: "-50%",
            duration: 50,
            ease: "linear",
            repeat: -1,
        });
    }, []);

    // Typewriter effect
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= dedication.length) {
                setDisplayedText(dedication.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 60);

        return () => clearInterval(interval);
    }, [dedication]);

    // Audio fade out on scroll to end
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = window.scrollY / scrollHeight;

            // Fade out audio in last 5% of page
            if (scrollProgress > 0.95) {
                const fadeVolume = Math.max(0, 1 - ((scrollProgress - 0.95) / 0.05));
                setGlobalVolume(fadeVolume);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [setGlobalVolume]);

    const containerRef = useRef(null);

    return (
        <section
            ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
            className="relative text-white bg-transparent"
        >
            {/* Sunset gradient overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(180deg, ${COLORS.charcoal} 0%, ${COLORS.burntOrange}60 50%, #6b3a5c 100%)`
                }}
            />
            {/* --- PARTE 1: FILM STRIP (Random Memories) --- */}
            <section className="py-24 border-t border-white/10 overflow-hidden">
                <h3 className="text-center text-xs font-mono text-gray-500 mb-8 uppercase tracking-[0.3em]">
                    Random Files · Core Memories
                </h3>

                {/* Film Strip Container */}
                <div className="relative w-full rotate-1 scale-105 py-4 border-y-4 border-dashed border-gray-800">
                    {/* Sprocket holes */}
                    <div className="absolute top-0 left-0 right-0 h-4 flex justify-around">
                        {Array(20).fill(0).map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-black rounded-sm" />
                        ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-4 flex justify-around">
                        {Array(20).fill(0).map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-black rounded-sm" />
                        ))}
                    </div>

                    <div ref={stripRef} className="flex gap-6 w-max px-4 py-4">
                        {/* Duplicate for infinite loop */}
                        {[...(content.outro?.memories || []), ...(content.outro?.memories || [])].map((src, i) => (
                            <div
                                key={i}
                                className="relative w-52 md:w-64 aspect-[9/16] bg-gray-900 rounded-sm overflow-hidden border-x-8 border-black shadow-lg group"
                            >
                                <video
                                    src={src}
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity sepia group-hover:sepia-0"
                                />
                                {/* Film grain */}
                                <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PARTE 2: THE END (Dedicatoria) --- */}
            <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20">

                {/* Fondo borroso (Bebidas) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={content.end?.finalImage || "/assets/bebidas.webp"}
                        alt="Cheers"
                        className="w-full h-full object-cover opacity-30 blur-md scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 max-w-2xl px-8 text-center">
                    {/* Typewriter dedication */}
                    <motion.p
                        className="text-xl md:text-2xl font-light italic text-white/90 leading-relaxed mb-10 font-serif min-h-[120px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        "{displayedText}"
                        <span className="animate-pulse">|</span>
                    </motion.p>

                    <div className="w-16 h-[1px] bg-white/50 mx-auto mb-10" />

                    {/* Ilustración Final (Snoopy & Cooky) */}
                    <motion.div
                        className="flex justify-center items-end gap-6 opacity-80"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        <img
                            src={content.multiverse?.cooky || "/assets/cooky_stand.webp"}
                            alt="Cooky"
                            className="h-14 md:h-20 object-contain"
                        />
                        <span className="text-2xl">❤️</span>
                        <img
                            src={content.preloader?.snoopy || "/assets/snoopy_perfil.webp"}
                            alt="Snoopy"
                            className="h-12 md:h-16 object-contain scale-x-[-1]"
                        />
                    </motion.div>

                    <motion.p
                        className="mt-12 text-[10px] text-gray-500 uppercase tracking-[0.2em]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 3 }}
                    >
                        Made with ❤️ for Vania's 19th
                    </motion.p>

                    {/* Final silence indicator */}
                    <motion.div
                        className="mt-16 flex items-center justify-center gap-2 text-gray-600"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 4 }}
                    >
                        <div className="flex gap-1 items-end h-4">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-[2px] bg-gray-600 rounded-full"
                                    animate={{ height: [8, 4, 2, 4, 2] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3 + i * 0.5,
                                        delay: i * 0.1,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-mono">fading to silence...</span>
                    </motion.div>
                </div>
            </section>
        </section>
    );
};

export default OutroSection;
