import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useZoneDetector from "../../hooks/useZoneDetector";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const PHRASES = [
    "tus ojos me atrapan",
    "en la oscuridad te busco",
    "espejo de mi alma",
    "mirada eterna",
];

const GazeSection = () => {
    const zoneRef = useZoneDetector('gaze');
    const containerRef = useRef(null);
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [visibleChars, setVisibleChars] = useState(0);
    const [slitHeight, setSlitHeight] = useState(30);

    useEffect(() => {
        const phrase = PHRASES[currentPhrase];
        if (visibleChars < phrase.length) {
            const timer = setTimeout(() => {
                setVisibleChars(v => v + 1);
            }, 80);
            return () => clearTimeout(timer);
        }
    }, [visibleChars, currentPhrase]);

    const handleMouseMove = (e) => {
        const y = e.clientY / window.innerHeight;
        const openAmount = 30 + Math.abs(y - 0.5) * 30;
        setSlitHeight(Math.min(45, openAmount));
    };

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
            ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
            className="relative h-screen w-full bg-transparent overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Dark overlay for this section */}
            <div className="absolute inset-0 bg-black/80 z-0" />

            {/* TOP BLACK BAR with text */}
            <div
                className="absolute top-0 left-0 right-0 bg-black z-20 flex items-end justify-center pb-8"
                style={{
                    height: `calc(50% - ${slitHeight / 2}%)`,
                    transition: "height 0.3s ease-out"
                }}
            >
                <p className="text-2xl md:text-4xl font-serif italic tracking-wider text-center px-8">
                    <span className="text-white/90" style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}>
                        {revealedText}
                    </span>
                    <span className="text-white/10">{hiddenText}</span>
                    <span className="animate-pulse text-blue-400">|</span>
                </p>
            </div>

            {/* THE SLIT */}
            <div
                className="absolute left-0 right-0 z-10 overflow-hidden"
                style={{
                    top: `calc(50% - ${slitHeight / 2}%)`,
                    height: `${slitHeight}%`,
                    transition: "all 0.3s ease-out"
                }}
            >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <video
                    src={content.gaze.video}
                    autoPlay muted loop playsInline
                    className="w-full h-[200%] object-cover"
                    style={{ marginTop: `-${(100 - slitHeight) / 2}%` }}
                />
            </div>

            {/* BOTTOM BLACK BAR */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-black z-20 flex items-start justify-center pt-8"
                style={{
                    height: `calc(50% - ${slitHeight / 2}%)`,
                    transition: "height 0.3s ease-out"
                }}
            >
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono">
                    La Mirada
                </p>
            </div>
        </section>
    );
};

export default GazeSection;
