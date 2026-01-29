import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

const EnergySection = () => {
    const { setCurrentTheme, setCursorType, setGlobalVolume } = useStore();
    const containerRef = useRef(null);
    const lightTrailRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Chromatic aberration on fast scroll
    const chromaOffset = useTransform(scrollYProgress, [0, 0.5, 1], [0, 3, 0]);

    useEffect(() => {
        setCurrentTheme('party');
    }, [setCurrentTheme]);

    // Light trail cursor effect
    useEffect(() => {
        const canvas = lightTrailRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationId;
        const trails = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const addTrail = (x, y) => {
            // Sparkler colors
            const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#ffffff"];
            for (let i = 0; i < 3; i++) {
                trails.push({
                    x: x + (Math.random() - 0.5) * 10,
                    y: y + (Math.random() - 0.5) * 10,
                    radius: Math.random() * 3 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1,
                    vx: (Math.random() - 0.5) * 2,
                    vy: Math.random() * 2 + 1
                });
            }
        };

        const handleMouseMove = (e) => {
            addTrail(e.clientX, e.clientY);
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        const render = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            trails.forEach((t, index) => {
                t.life -= 0.02;
                t.x += t.vx;
                t.y += t.vy;
                t.radius *= 0.98;

                if (t.life <= 0) {
                    trails.splice(index, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
                    ctx.fillStyle = t.color;
                    ctx.globalAlpha = t.life;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    const playVideo = (e) => {
        e.target.muted = false;
        e.target.play();
        setGlobalVolume(0.15);
    };

    const stopVideo = (e) => {
        e.target.muted = true;
        setGlobalVolume(1.0);
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-black py-20 px-4 md:px-10"
        >
            {/* Light trail canvas */}
            <canvas
                ref={lightTrailRef}
                className="fixed inset-0 pointer-events-none z-50"
                style={{ mixBlendMode: "screen" }}
            />

            {/* Strobe flash overlay */}
            <motion.div
                className="fixed inset-0 bg-white pointer-events-none z-40"
                animate={{ opacity: [0, 0, 0.1, 0, 0, 0.05, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />

            {/* Header */}
            <div className="relative z-10 mb-16 border-b border-white/20 pb-4 flex justify-between items-end">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
                    Energy<span className="text-red-500">.</span>
                </h2>
                <span className="font-mono text-xs md:text-sm text-gray-500 text-right">
                    ZEN // LIBIDO <br /> LIVE MEMORIES
                </span>
            </div>

            {/* Video Grid with Chromatic Aberration */}
            <motion.div
                className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[400px]"
                style={{
                    filter: chromaOffset.get() > 0
                        ? `drop-shadow(${chromaOffset.get()}px 0 0 rgba(255,0,0,0.5)) drop-shadow(-${chromaOffset.get()}px 0 0 rgba(0,255,255,0.5))`
                        : "none"
                }}
            >
                {content.energy.videos.map((videoSrc, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative group overflow-hidden border border-white/10 bg-gray-900 ${index === 0 ? "md:col-span-2" : ""
                            } ${index === 3 ? "md:row-span-2 h-full" : ""}`}
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        {/* Grain overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        {/* Video */}
                        <video
                            src={videoSrc}
                            muted
                            loop
                            className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                            onMouseEnter={playVideo}
                            onMouseLeave={stopVideo}
                        />

                        {/* Glitch effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="absolute inset-0 bg-red-500/10 mix-blend-screen translate-x-[2px]" />
                            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-screen -translate-x-[2px]" />
                        </div>

                        {/* Label */}
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-30">
                            <p className="font-mono text-xs text-cyan-400">REC_00{index + 1}.mp4</p>
                        </div>

                        {/* Audio badge */}
                        <div className="absolute bottom-2 right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-30">
                            🔊 AUDIO ON
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default EnergySection;
