import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "../../store/useStore";
import useZoneDetector from "../../hooks/useZoneDetector";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const CanvasSection = () => {
    const zoneRef = useZoneDetector('canvas');
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const dateRef = useRef(null);
    const videoRef = useRef(null);

    // GSAP Pinning with scroll-controlled animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    scrub: 1,
                }
            });

            // Date draws itself (stroke-dashoffset)
            tl.fromTo(dateRef.current,
                { strokeDashoffset: 400 },
                { strokeDashoffset: 0 },
                0
            );

            // Video scales and rotates into view
            tl.fromTo(videoRef.current,
                { scale: 0.7, rotate: -10, opacity: 0 },
                { scale: 1, rotate: 3, opacity: 1 },
                0
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Interactive canvas paint
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const particles = [];

        const addWatercolor = (x, y) => {
            const colors = [
                "rgba(139, 90, 43, 0.12)",
                "rgba(70, 130, 180, 0.10)",
                "rgba(188, 143, 143, 0.12)",
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
                x, y,
                radius: Math.random() * 35 + 15,
                color,
                life: 1,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5
            });
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            addWatercolor(e.clientX - rect.left, e.clientY - rect.top);
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        const render = () => {
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";

            particles.forEach((p, index) => {
                p.life -= 0.006;
                p.radius += 0.3;
                p.x += p.vx;
                p.y += p.vy;

                if (p.life <= 0) {
                    particles.splice(index, 1);
                } else {
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                    gradient.addColorStop(0, p.color);
                    gradient.addColorStop(1, "transparent");

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.globalAlpha = p.life * 0.5;
                    ctx.fill();
                }
            });

            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <section
            ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
            className="relative h-screen w-full overflow-hidden bg-transparent"
        >
            {/* Cream overlay for light section */}
            <div
                className="absolute inset-0 z-0"
                style={{ background: `linear-gradient(180deg, ${COLORS.cream}90 0%, ${COLORS.offWhite}90 100%)` }}
            />

            {/* Paper texture */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`
                }}
            />

            {/* SVG Date - handwritten stroke animation */}
            <svg className="absolute inset-0 z-10 w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="xMidYMid meet">
                <text
                    ref={dateRef}
                    x="50%"
                    y="20%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="none"
                    stroke="#8B7355"
                    strokeWidth="1"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fontSize="48"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                >
                    17 · 03 · 2025
                </text>
            </svg>

            {/* Video with paint splash mask */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div
                    ref={videoRef}
                    className="w-[300px] h-[400px] md:w-[380px] md:h-[500px] overflow-hidden opacity-0"
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

                <svg className="absolute" width="0" height="0">
                    <defs>
                        <clipPath id="paintMask" clipPathUnits="objectBoundingBox">
                            <path d="M0.1,0.05 Q0.0,0.1 0.05,0.3 Q0.0,0.5 0.08,0.7 Q0.02,0.85 0.15,0.95 Q0.3,1.0 0.5,0.98 Q0.7,1.02 0.85,0.92 Q0.98,0.8 0.95,0.6 Q1.0,0.4 0.92,0.2 Q0.95,0.05 0.8,0.02 Q0.6,0.0 0.4,0.03 Q0.2,0.0 0.1,0.05 Z" />
                        </clipPath>
                    </defs>
                </svg>
            </div>

            {/* Interactive canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-30 cursor-crosshair"
                style={{ mixBlendMode: "multiply" }}
            />

            {/* Instruction */}
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm uppercase tracking-[0.3em] font-mono z-40">
                Dibuja con el cursor ✎
            </p>
        </section>
    );
};

export default CanvasSection;
