import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

const DualitySection = () => {
    const { setCurrentTheme } = useStore();
    const containerRef = useRef(null);
    const rainCanvasRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Floating photo transforms - they move together/apart on scroll
    const photo1X = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50]);
    const photo1Y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -80]);
    const photo2X = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -60]);
    const photo2Y = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, 100]);
    const photo3X = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, -30]);
    const photo3Y = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -120]);
    const photo4Rotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);

    useEffect(() => {
        setCurrentTheme('rain');
    }, [setCurrentTheme]);

    // Rain particles effect
    useEffect(() => {
        const canvas = rainCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        // Rain drops
        const drops = [];
        for (let i = 0; i < 150; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 8 + 4,
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drops.forEach(drop => {
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x + 1, drop.y + drop.length);
                ctx.strokeStyle = `rgba(180, 200, 220, ${drop.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                drop.y += drop.speed;
                if (drop.y > canvas.height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * canvas.width;
                }
            });

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[200vh] w-full overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #0f1419 0%, #1c2833 50%, #0d1117 100%)"
            }}
        >
            {/* Rain canvas overlay */}
            <canvas
                ref={rainCanvasRef}
                className="fixed inset-0 pointer-events-none z-30"
                style={{ opacity: 0.6 }}
            />

            {/* Sticky moodboard container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">

                {/* Background blur - Cama photo (largest, blurry memory) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={content.duality.himImage}
                        alt="Memory"
                        className="w-full h-full object-cover opacity-20 blur-md scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1419]/80 to-[#0f1419]" />
                </div>

                {/* Floating Moodboard */}
                <div className="relative w-full max-w-6xl h-[80vh] mx-auto z-10">

                    {/* Photo 1 - Lluvia 1 */}
                    <motion.div
                        className="absolute top-[10%] left-[5%] w-48 md:w-64"
                        style={{ x: photo1X, y: photo1Y }}
                    >
                        <div className="relative rotate-[-6deg] hover:rotate-0 transition-all duration-500">
                            <img
                                src={content.duality.rainImages?.[0]}
                                alt="Rain moment"
                                className="w-full aspect-[3/4] object-cover rounded-sm shadow-2xl border border-white/10"
                            />
                            <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />
                        </div>
                    </motion.div>

                    {/* Photo 2 - Lluvia 2 */}
                    <motion.div
                        className="absolute top-[15%] right-[10%] w-40 md:w-56"
                        style={{ x: photo2X, y: photo2Y }}
                    >
                        <div className="relative rotate-[8deg] hover:rotate-0 transition-all duration-500">
                            <img
                                src={content.duality.rainImages?.[1]}
                                alt="Rain moment 2"
                                className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl border border-white/10"
                            />
                            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                        </div>
                    </motion.div>

                    {/* Video - Biblioteca */}
                    <motion.div
                        className="absolute bottom-[20%] left-[15%] w-56 md:w-72"
                        style={{ x: photo3X, y: photo3Y }}
                    >
                        <div className="relative rotate-[3deg] hover:rotate-0 transition-all duration-500">
                            <video
                                src={content.intimacy?.libraryVideo || "/assets/biblioteca_filtro.mp4"}
                                autoPlay muted loop playsInline
                                className="w-full aspect-[9/16] object-cover rounded-sm shadow-2xl border border-white/10"
                            />
                            <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay" />
                        </div>
                    </motion.div>

                    {/* Video - Muñecos */}
                    <motion.div
                        className="absolute bottom-[15%] right-[8%] w-44 md:w-60"
                        style={{ rotate: photo4Rotate }}
                    >
                        <div className="relative hover:scale-105 transition-all duration-500">
                            <video
                                src={content.intimacy?.dollsGif || "/assets/muñecos_snoopy.mp4"}
                                autoPlay muted loop playsInline
                                className="w-full aspect-square object-cover rounded-lg shadow-2xl border-4 border-white/20"
                            />
                        </div>
                    </motion.div>

                    {/* Rain video background element */}
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-80 md:w-96 opacity-40 z-0">
                        <video
                            src={content.duality.rainVideo}
                            autoPlay muted loop playsInline
                            className="w-full aspect-video object-cover rounded-lg blur-[2px]"
                        />
                    </div>

                    {/* Text overlay */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-20"
                        style={{ opacity: useTransform(scrollYProgress, [0.3, 0.6], [0, 1]) }}
                    >
                        <h2 className="text-5xl md:text-7xl font-display font-light text-white/60 tracking-[0.3em] uppercase">
                            Lluvia
                        </h2>
                        <p className="mt-4 text-gray-500 font-serif italic text-lg">
                            Melancolía confortable
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DualitySection;
