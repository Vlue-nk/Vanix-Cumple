import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "../../store/useStore";
import useZoneDetector from "../../hooks/useZoneDetector";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const SpookySection = () => {
    const zoneRef = useZoneDetector('halloween');
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const photoRef = useRef(null);
    const marqueeRef = useRef(null);

    // GSAP Pinning
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 1,
                }
            });

            // Title glitches in
            tl.fromTo(titleRef.current,
                { scale: 0.5, opacity: 0, filter: "blur(10px)" },
                { scale: 1, opacity: 1, filter: "blur(0px)" },
                0
            );

            // Photo slides up with Sin City effect
            tl.fromTo(photoRef.current,
                { y: 200, opacity: 0, filter: "grayscale(0%)" },
                { y: 0, opacity: 1, filter: "grayscale(100%) contrast(150%)" },
                0.2
            );

            // Marquee rotates into view
            tl.fromTo(marqueeRef.current,
                { rotate: 10, opacity: 0 },
                { rotate: -2, opacity: 1 },
                0.4
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
            className="relative h-screen w-full overflow-hidden flex flex-col justify-center bg-transparent"
        >
            {/* Dark red overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{ background: `linear-gradient(180deg, ${COLORS.charcoal} 0%, ${COLORS.driedBlood}40 50%, ${COLORS.charcoal} 100%)` }}
            />
            {/* Title */}
            <h2
                ref={titleRef}
                className="text-6xl md:text-9xl font-display font-black uppercase text-center mb-12 z-10 opacity-0"
                style={{
                    color: COLORS.driedBlood,
                    textShadow: `0 0 60px ${COLORS.driedBlood}80, 0 0 120px ${COLORS.driedBlood}40`,
                    letterSpacing: '-0.05em',
                }}
            >
                SPOOKY SZN
            </h2>

            {/* Sin City Photo */}
            <div ref={photoRef} className="relative w-full max-w-2xl mx-auto aspect-[4/3] mb-12 z-10 px-4 opacity-0">
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
                    <img
                        src={content.spooky.taxiImage}
                        alt="Halloween"
                        className="w-full h-full object-cover"
                    />

                    {/* Red color overlay for Sin City effect */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${content.spooky.taxiImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            mixBlendMode: "color",
                            filter: "saturate(3)",
                        }}
                    />

                    <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay" />
                </div>
            </div>

            {/* Marquee */}
            <div
                ref={marqueeRef}
                className="relative w-full bg-red-950/30 border-y border-red-800/50 py-6 overflow-hidden opacity-0"
            >
                <motion.div
                    className="flex gap-4 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                >
                    {[...content.spooky.marqueeVideos, ...content.spooky.marqueeVideos].map((videoSrc, i) => (
                        <div
                            key={i}
                            className="w-[180px] md:w-[220px] aspect-[9/16] inline-block rounded-md overflow-hidden border border-red-800/40 bg-black flex-shrink-0"
                        >
                            <video
                                src={videoSrc}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Blood drip */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-red-950/40 to-transparent pointer-events-none" />
        </section>
    );
};

export default SpookySection;
