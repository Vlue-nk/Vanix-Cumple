import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const BG_WORDS = ["SIEMPRE", "JUNTOS", "FOREVER", "TE AMO", "ETERNO", "MI VIDA"];

const Climax = () => {
    const { setCurrentTheme } = useStore();
    const containerRef = useRef(null);
    const photoRef = useRef(null);
    const inkMaskRef = useRef(null);
    const [inkProgress, setInkProgress] = useState(0);

    useEffect(() => {
        setCurrentTheme('climax');
    }, [setCurrentTheme]);

    // GSAP Pinning with high friction (slow scroll)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=500%", // Very long pin for contemplation
                    pin: true,
                    scrub: 3, // High friction - 3 second smooth
                    onUpdate: (self) => {
                        // Ink reveal progress
                        setInkProgress(self.progress);
                    }
                }
            });

            // Photo emerges slowly
            tl.fromTo(photoRef.current,
                { scale: 0.7, opacity: 0 },
                { scale: 1, opacity: 1 },
                0
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Generate ink mask path based on progress
    const generateInkPath = () => {
        const p = Math.min(inkProgress * 1.5, 1); // Speed up reveal

        // Organic blob that expands
        const size = p * 100;
        const wobble1 = Math.sin(p * 10) * 5;
        const wobble2 = Math.cos(p * 8) * 8;

        return `
            M 50,${50 - size / 2}
            Q ${50 + size / 2 + wobble1},${50 - size / 3} ${50 + size / 2},50
            Q ${50 + size / 2 + wobble2},${50 + size / 3} 50,${50 + size / 2}
            Q ${50 - size / 2 + wobble1},${50 + size / 3} ${50 - size / 2},50
            Q ${50 - size / 2 + wobble2},${50 - size / 3} 50,${50 - size / 2}
            Z
        `;
    };

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-black overflow-hidden"
        >
            {/* Teleprompter background - infinite scroll */}
            <div className="absolute inset-0 flex flex-col items-center pointer-events-none select-none overflow-hidden opacity-[0.08]">
                <motion.div
                    className="flex flex-col items-center"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                >
                    {[...BG_WORDS, ...BG_WORDS, ...BG_WORDS, ...BG_WORDS].map((word, i) => (
                        <h1
                            key={i}
                            className="text-[20vw] md:text-[16vw] font-black leading-[0.75] text-center whitespace-nowrap font-display uppercase text-gray-800"
                        >
                            {word}
                        </h1>
                    ))}
                </motion.div>
            </div>

            {/* Photo with ink reveal mask */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                    {/* Decorative frames */}
                    <motion.div
                        className="absolute -inset-6 border border-white/10"
                        style={{ opacity: inkProgress }}
                    />
                    <motion.div
                        className="absolute -inset-12 border border-white/5"
                        style={{ opacity: inkProgress * 0.5 }}
                    />

                    {/* Photo container with SVG mask */}
                    <div
                        ref={photoRef}
                        className="relative w-[280px] md:w-[360px] aspect-[9/16] overflow-hidden"
                        style={{ opacity: 0 }}
                    >
                        {/* The SVG mask */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 100 177.78"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <clipPath id="inkReveal">
                                    <path ref={inkMaskRef} d={generateInkPath()} />
                                </clipPath>
                            </defs>
                        </svg>

                        {/* Photo clipped by ink mask */}
                        <div
                            className="w-full h-full"
                            style={{
                                clipPath: inkProgress > 0.7 ? 'none' : 'url(#inkReveal)'
                            }}
                        >
                            <img
                                src={content.climax.mainPhoto}
                                alt="The One"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Subtle glow */}
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-purple-900/20 mix-blend-overlay pointer-events-none"
                            style={{ opacity: inkProgress }}
                        />

                        {/* Inner frame */}
                        <div
                            className="absolute inset-3 border border-white/20 pointer-events-none"
                            style={{ opacity: inkProgress }}
                        />
                    </div>

                    {/* Date stamp */}
                    <motion.div
                        className="absolute -bottom-10 right-0 text-xs font-mono text-blue-400/50 tracking-widest"
                        style={{ opacity: inkProgress }}
                    >
                        V.19 // FOREVER
                    </motion.div>
                </div>
            </div>

            {/* Audio indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-20"
                style={{ opacity: Math.min(inkProgress * 2, 1) }}
            >
                <p className="text-xs text-gray-600 font-mono uppercase tracking-[0.3em]">
                    🎵 Rosemary - Deftones
                </p>
                <p className="text-[10px] text-gray-700 mt-2 italic">
                    Respira. Contempla.
                </p>
            </motion.div>

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 40%, black 100%)"
                }}
            />
        </section>
    );
};

export default Climax;
