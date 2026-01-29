import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useZoneDetector from "../../hooks/useZoneDetector";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const BG_WORDS = ["SIEMPRE", "JUNTOS", "FOREVER", "TE AMO", "ETERNO", "MI VIDA"];

const Climax = () => {
    const zoneRef = useZoneDetector('climax');
    const containerRef = useRef(null);
    const photoRef = useRef(null);
    const [inkProgress, setInkProgress] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=500%",
                    pin: true,
                    scrub: 3,
                    onUpdate: (self) => {
                        setInkProgress(self.progress);
                    }
                }
            });

            tl.fromTo(photoRef.current,
                { scale: 0.7, opacity: 0 },
                { scale: 1, opacity: 1 },
                0
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const generateInkPath = () => {
        const p = Math.min(inkProgress * 1.5, 1);
        const size = p * 100;
        const w1 = Math.sin(p * 10) * 5;
        const w2 = Math.cos(p * 8) * 8;

        return `M 50,${50 - size / 2} Q ${50 + size / 2 + w1},${50 - size / 3} ${50 + size / 2},50 Q ${50 + size / 2 + w2},${50 + size / 3} 50,${50 + size / 2} Q ${50 - size / 2 + w1},${50 + size / 3} ${50 - size / 2},50 Q ${50 - size / 2 + w2},${50 - size / 3} 50,${50 - size / 2} Z`;
    };

    return (
        <section
            ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
            id="climax"
            className="relative h-screen w-full bg-transparent overflow-hidden"
        >
            {/* Dark overlay for climax */}
            <div className="absolute inset-0 bg-black/90 z-0" />

            {/* Teleprompter */}
            <div className="absolute inset-0 flex flex-col items-center pointer-events-none select-none overflow-hidden opacity-[0.08] z-[1]">
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

            {/* Photo with ink mask */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                    <motion.div className="absolute -inset-6 border border-white/10" style={{ opacity: inkProgress }} />
                    <motion.div className="absolute -inset-12 border border-white/5" style={{ opacity: inkProgress * 0.5 }} />

                    <div
                        ref={photoRef}
                        className="relative w-[280px] md:w-[360px] aspect-[9/16] overflow-hidden"
                        style={{ opacity: 0 }}
                    >
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 177.78" preserveAspectRatio="none">
                            <defs>
                                <clipPath id="inkReveal">
                                    <path d={generateInkPath()} />
                                </clipPath>
                            </defs>
                        </svg>

                        <div
                            className="w-full h-full"
                            style={{ clipPath: inkProgress > 0.7 ? 'none' : 'url(#inkReveal)' }}
                        >
                            <img
                                src={content.climax.mainPhoto}
                                alt="The One"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute inset-3 border border-white/20 pointer-events-none" style={{ opacity: inkProgress }} />
                    </div>

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
            </motion.div>

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none z-30"
                style={{ background: "radial-gradient(ellipse at center, transparent 40%, black 100%)" }}
            />
        </section>
    );
};

export default Climax;
