import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

const CanvasSection = () => {
    const { setCurrentTheme } = useStore();
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [dateProgress, setDateProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Date drawing animation based on scroll
    const strokeDashoffset = useTransform(scrollYProgress, [0.2, 0.6], [400, 0]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            setDateProgress(v);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    useEffect(() => {
        setCurrentTheme('canvas');
    }, [setCurrentTheme]);

    // Canvas paint effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const particles = [];

        // Watercolor-like brush
        const addWatercolor = (x, y) => {
            const colors = [
                "rgba(139, 90, 43, 0.15)",    // Sepia
                "rgba(70, 130, 180, 0.12)",   // Steel Blue
                "rgba(188, 143, 143, 0.14)", // Rosy Brown
                "rgba(107, 142, 35, 0.10)",  // Olive Drab
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
                x, y,
                radius: Math.random() * 40 + 20,
                color,
                life: 1,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            addWatercolor(e.clientX - rect.left, e.clientY - rect.top);
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        const render = () => {
            // Fade trail
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";

            particles.forEach((p, index) => {
                p.life -= 0.008;
                p.radius += 0.5;
                p.x += p.vx;
                p.y += p.vy;

                if (p.life <= 0) {
                    particles.splice(index, 1);
                } else {
                    // Soft watercolor blob
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                    gradient.addColorStop(0, p.color);
                    gradient.addColorStop(1, "transparent");

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.globalAlpha = p.life * 0.6;
                    ctx.fill();
                }
            });

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[200vh] w-full overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #fdfbf7 0%, #f5efe6 50%, #ebe4d8 100%)"
            }}
        >
            {/* Paper texture overlay */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3CfeDiffuseLighting lighting-color='%23fff' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Sticky content */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">

                {/* Handwritten Date - SVG with stroke animation */}
                <motion.svg
                    className="absolute z-10 w-full max-w-4xl px-8"
                    viewBox="0 0 500 100"
                    style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
                >
                    <motion.text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-8xl"
                        fill="none"
                        stroke="#8B7355"
                        strokeWidth="1"
                        fontFamily="Georgia, serif"
                        fontStyle="italic"
                        style={{
                            strokeDasharray: 400,
                            strokeDashoffset: strokeDashoffset
                        }}
                    >
                        17 · 03 · 2025
                    </motion.text>
                </motion.svg>

                {/* Video with paint splash mask */}
                <div className="relative z-20">
                    <div
                        className="w-[350px] h-[450px] md:w-[400px] md:h-[520px] overflow-hidden"
                        style={{
                            clipPath: "url(#paintMask)",
                            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.2))"
                        }}
                    >
                        <video
                            src={content.canvas.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* SVG Paint Splash Mask */}
                    <svg className="absolute" width="0" height="0">
                        <defs>
                            <clipPath id="paintMask" clipPathUnits="objectBoundingBox">
                                <path d="M0.1,0.05 Q0.0,0.1 0.05,0.3 Q0.0,0.5 0.08,0.7 Q0.02,0.85 0.15,0.95 Q0.3,1.0 0.5,0.98 Q0.7,1.02 0.85,0.92 Q0.98,0.8 0.95,0.6 Q1.0,0.4 0.92,0.2 Q0.95,0.05 0.8,0.02 Q0.6,0.0 0.4,0.03 Q0.2,0.0 0.1,0.05 Z" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                {/* Interactive canvas layer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-30 cursor-crosshair"
                    style={{ mixBlendMode: "multiply" }}
                />

                {/* Instruction */}
                <motion.p
                    className="absolute bottom-12 text-gray-500 text-sm uppercase tracking-[0.3em] font-mono z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Mueve el cursor para pintar
                </motion.p>
            </div>
        </section>
    );
};

export default CanvasSection;
