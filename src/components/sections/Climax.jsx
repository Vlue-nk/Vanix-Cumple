import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

// Teleprompter text
const BG_WORDS = ["TE AMO", "SIEMPRE", "FOREVER", "MI VIDA", "ETERNO", "JUNTOS", "TE AMO", "SIEMPRE"];

const Climax = () => {
    const { setCurrentTheme } = useStore();
    const sectionRef = useRef(null);
    const photoRef = useRef(null);
    const [blurAmount, setBlurAmount] = useState(20);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Slow reveal - blur goes from 20 to 0
    const blur = useTransform(scrollYProgress, [0.2, 0.5], [20, 0]);
    const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.85, 1]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

    useEffect(() => {
        const unsubscribe = blur.on("change", (v) => {
            setBlurAmount(Math.max(0, v));
        });
        return () => unsubscribe();
    }, [blur]);

    useEffect(() => {
        setCurrentTheme('climax');
    }, [setCurrentTheme]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[300vh] w-full bg-black overflow-hidden"
        >
            {/* Sticky container for pinning effect */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* BACKGROUND TYPOGRAPHY (Teleprompter - Infinite upward) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                    <motion.div
                        className="flex flex-col items-center"
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    >
                        {[...BG_WORDS, ...BG_WORDS].map((word, i) => (
                            <h1
                                key={i}
                                className="text-[15vw] md:text-[12vw] font-black leading-[0.85] text-center whitespace-nowrap text-gray-900 font-display uppercase"
                                style={{
                                    WebkitTextStroke: "1px rgba(40,40,40,0.5)",
                                    color: "transparent"
                                }}
                            >
                                {word}
                            </h1>
                        ))}
                    </motion.div>
                </div>

                {/* MAIN PHOTO - Slow Blur Reveal */}
                <motion.div
                    className="relative z-10 p-6 md:p-10"
                    style={{ opacity, scale }}
                >
                    <div className="relative">
                        {/* Decorative frame layers */}
                        <div className="absolute -inset-4 border border-white/10" />
                        <div className="absolute -inset-8 border border-white/5" />

                        <motion.div
                            ref={photoRef}
                            className="relative w-[280px] md:w-[380px] aspect-[9/16] overflow-hidden shadow-2xl"
                            style={{
                                filter: `blur(${blurAmount}px)`,
                                transition: "filter 0.1s ease-out"
                            }}
                        >
                            {/* Inner frame */}
                            <div className="absolute inset-0 border border-white/30 z-20 m-3" />

                            <img
                                src={content.climax.mainPhoto}
                                alt="The One"
                                className="w-full h-full object-cover"
                            />

                            {/* Subtle glow overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-purple-900/10 mix-blend-overlay" />
                        </motion.div>

                        {/* Date stamp */}
                        <motion.div
                            className="absolute -bottom-8 right-0 text-xs font-mono text-blue-400/60 tracking-widest"
                            style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
                        >
                            V.19 // FOREVER
                        </motion.div>
                    </div>
                </motion.div>

                {/* Audio hint */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-20"
                    style={{ opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]) }}
                >
                    <p className="text-xs text-gray-600 font-mono uppercase tracking-[0.3em]">
                        🎵 Rosemary - Deftones
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Climax;
