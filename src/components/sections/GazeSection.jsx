import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

// Short poetic phrases (original, not song lyrics)
const PHRASES = [
    "tus ojos me atrapan",
    "en la oscuridad te busco",
    "espejo de mi alma",
    "mirada eterna",
    "te veo sin verte",
];

const GazeSection = () => {
    const { setCurrentTheme } = useStore();
    const containerRef = useRef(null);
    const slitRef = useRef(null);
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [visibleChars, setVisibleChars] = useState(0);
    const [slitHeight, setSlitHeight] = useState(15); // vh

    useEffect(() => {
        setCurrentTheme('gaze');
    }, [setCurrentTheme]);

    // Letter by letter reveal
    useEffect(() => {
        const phrase = PHRASES[currentPhrase];
        if (visibleChars < phrase.length) {
            const timer = setTimeout(() => {
                setVisibleChars(v => v + 1);
            }, 80);
            return () => clearTimeout(timer);
        }
    }, [visibleChars, currentPhrase]);

    // Pulsing slit (simulating bass)
    useEffect(() => {
        const pulseInterval = setInterval(() => {
            setSlitHeight(h => {
                const pulse = 15 + Math.sin(Date.now() / 300) * 2;
                return pulse;
            });
        }, 50);

        return () => clearInterval(pulseInterval);
    }, []);

    // GSAP Pinning with scroll-controlled animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        // Change phrase based on progress
                        const idx = Math.floor(self.progress * PHRASES.length);
                        const newIdx = Math.min(idx, PHRASES.length - 1);
                        if (newIdx !== currentPhrase) {
                            setCurrentPhrase(newIdx);
                            setVisibleChars(0);
                        }
                    }
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [currentPhrase]);

    const phrase = PHRASES[currentPhrase];
    const revealedText = phrase.slice(0, visibleChars);
    const hiddenText = phrase.slice(visibleChars);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-black overflow-hidden"
        >
            {/* Blurred background layer */}
            <div className="absolute inset-0 z-0">
                <video
                    src={content.gaze.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-10 blur-xl scale-125"
                />
            </div>

            {/* The keyhole slit - cinematic scope */}
            <div
                ref={slitRef}
                className="absolute left-0 right-0 z-20 overflow-hidden"
                style={{
                    top: `calc(50% - ${slitHeight / 2}vh)`,
                    height: `${slitHeight}vh`,
                    transition: "height 0.1s ease-out"
                }}
            >
                {/* Slit borders for keyhole effect */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <video
                    src={content.gaze.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-[100vh] object-cover -mt-[calc(50vh-7.5vh)]"
                />
            </div>

            {/* Top darkness */}
            <div
                className="absolute top-0 left-0 right-0 bg-black z-10"
                style={{
                    height: `calc(50% - ${slitHeight / 2}vh)`,
                    transition: "height 0.1s ease-out"
                }}
            />

            {/* Bottom darkness */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-black z-10"
                style={{
                    height: `calc(50% - ${slitHeight / 2}vh)`,
                    transition: "height 0.1s ease-out"
                }}
            />

            {/* Text in the top black area - letter by letter */}
            <motion.div
                className="absolute z-30 left-0 right-0 flex justify-center"
                style={{
                    top: `calc(50% - ${slitHeight / 2}vh - 80px)`
                }}
            >
                <p className="text-2xl md:text-4xl font-serif italic tracking-wider">
                    <span className="text-white/90">{revealedText}</span>
                    <span className="text-white/10">{hiddenText}</span>
                    <span className="animate-pulse text-white/60">|</span>
                </p>
            </motion.div>

            {/* Attribution */}
            <div
                className="absolute z-30 left-0 right-0 flex justify-center"
                style={{
                    bottom: `calc(50% - ${slitHeight / 2}vh - 60px)`
                }}
            >
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
                    La Mirada
                </p>
            </div>

            {/* Vignette */}
            <div
                className="absolute inset-0 z-40 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 30%, black 100%)"
                }}
            />

            {/* Subtle grain */}
            <div
                className="absolute inset-0 z-50 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />
        </section>
    );
};

export default GazeSection;
