import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

// Arctic Monkeys quotes for the scroll
const QUOTES = [
    "I just wanted to be one of those ghosts...",
    "You're rarer than a can of dandelion and burdock",
    "And those dreamers let us know...",
    "I've been so busy being yours",
    "Call off the search for your soul, or put it on hold again",
];

const GazeSection = () => {
    const { setCurrentTheme } = useStore();
    const containerRef = useRef(null);
    const [showFlashback, setShowFlashback] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Quote index based on scroll
    const quoteIndex = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7, 0.9], [0, 1, 2, 3, 4]);
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const unsubscribe = quoteIndex.on("change", (v) => {
            setCurrentQuote(Math.round(v));
        });
        return () => unsubscribe();
    }, [quoteIndex]);

    useEffect(() => {
        setCurrentTheme('gaze');
    }, [setCurrentTheme]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[250vh] w-full bg-[#0d1117] overflow-hidden"
        >
            {/* Sticky viewport container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Dark overlay with slit */}
                <div className="absolute inset-0 z-10">
                    {/* Top black bar */}
                    <div className="absolute top-0 left-0 right-0 h-[35%] bg-black" />
                    {/* Bottom black bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-black" />
                </div>

                {/* The slit/viewport - Eyes video */}
                <div className="relative z-0 w-full h-[30vh] overflow-hidden">
                    <video
                        src={content.gaze.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover scale-150"
                    />

                    {/* Subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
                </div>

                {/* Floating quotes - Arctic Monkeys */}
                <motion.div
                    className="absolute z-20 text-center px-8"
                    key={currentQuote}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="text-2xl md:text-4xl font-serif italic text-white/80 max-w-3xl leading-relaxed">
                        "{QUOTES[currentQuote]}"
                    </p>
                    <span className="block mt-4 text-xs text-gray-500 uppercase tracking-[0.3em] font-mono">
                        Arctic Monkeys
                    </span>
                </motion.div>

                {/* Picture-in-picture flashback (Salchipapa) */}
                <motion.div
                    className="absolute bottom-8 right-8 z-30 cursor-pointer"
                    onHoverStart={() => setShowFlashback(true)}
                    onHoverEnd={() => setShowFlashback(false)}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className={`w-32 h-48 md:w-40 md:h-56 rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl transition-all duration-500 ${showFlashback ? 'opacity-100' : 'opacity-40'}`}>
                        <video
                            src={content.gaze.videoWait}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-[10px] text-gray-500 text-center mt-2 uppercase tracking-widest">
                        Flashback
                    </p>
                </motion.div>

                {/* Grain overlay */}
                <div
                    className="absolute inset-0 z-40 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                    }}
                />
            </div>
        </section>
    );
};

export default GazeSection;
