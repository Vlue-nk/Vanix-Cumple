import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

const SpookySection = () => {
    const { setCurrentTheme } = useStore();
    const containerRef = useRef(null);

    useEffect(() => {
        setCurrentTheme('halloween');
    }, [setCurrentTheme]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden flex flex-col justify-center py-20"
            style={{
                background: "linear-gradient(180deg, #0a0505 0%, #1a0808 50%, #0a0505 100%)"
            }}
        >
            {/* Glitch Title */}
            <motion.h2
                className="text-6xl md:text-9xl font-display font-bold text-center mb-16 z-10 glitch-text"
                data-text="SPOOKY SZN"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,50,50,0.6)"
                }}
            >
                SPOOKY SZN
            </motion.h2>

            {/* Sin City Photo - Joker/Carti */}
            <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] mb-20 z-10 px-4">
                <motion.div
                    className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Base image - High contrast B&W */}
                    <img
                        src={content.spooky.taxiImage}
                        alt="Halloween Joker"
                        className="w-full h-full object-cover"
                        style={{
                            filter: "grayscale(100%) contrast(150%) brightness(0.9)"
                        }}
                    />

                    {/* Color mask overlay - Only red shows through */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${content.spooky.taxiImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            mixBlendMode: "color",
                            filter: "saturate(3) contrast(1.5)",
                            // This creates the "Sin City" effect - only reds pop
                            maskImage: "linear-gradient(black, black)",
                        }}
                    />

                    {/* Red tint glow */}
                    <div className="absolute inset-0 bg-red-900/30 mix-blend-overlay pointer-events-none" />

                    {/* Film grain */}
                    <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                        }}
                    />
                </motion.div>

                {/* Decorative text */}
                <div className="absolute -bottom-4 -right-4 text-red-600/60 font-mono text-xs uppercase tracking-widest rotate-90 origin-bottom-right">
                    HALLOWEEN 2024
                </div>
            </div>

            {/* Infinite Marquee Videos */}
            <div className="relative w-full -rotate-2 bg-red-950/30 border-y border-red-800/50 py-8 overflow-hidden">
                <div className="flex gap-6 animate-marquee-spooky whitespace-nowrap">
                    {/* Duplicate for infinite loop */}
                    {[...content.spooky.marqueeVideos, ...content.spooky.marqueeVideos].map((videoSrc, i) => (
                        <div
                            key={i}
                            className="w-[200px] md:w-[280px] aspect-[9/16] inline-block rounded-md overflow-hidden border border-red-800/40 bg-black flex-shrink-0 group"
                        >
                            <video
                                src={videoSrc}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee animation */}
            <style>{`
                @keyframes marquee-spooky {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-spooky {
                    animation: marquee-spooky 30s linear infinite;
                }
            `}</style>

            {/* Ambient blood drip effect */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-950/40 to-transparent pointer-events-none" />
        </section>
    );
};

export default SpookySection;
