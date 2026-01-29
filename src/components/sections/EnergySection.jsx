import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore, COLORS } from "../../store/useStore";
import useZoneDetector from "../../hooks/useZoneDetector";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const EnergySection = () => {
    const { setCursorType, setGlobalVolume } = useStore();
    const zoneRef = useZoneDetector('party');
    const containerRef = useRef(null);
    const lightTrailRef = useRef(null);
    const gridRef = useRef(null);
    const titleRef = useRef(null);

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

            // Title slides in
            tl.fromTo(titleRef.current,
                { x: -200, opacity: 0 },
                { x: 0, opacity: 1 },
                0
            );

            // Grid scales up from small
            tl.fromTo(gridRef.current,
                { scale: 0.7, opacity: 0 },
                { scale: 1, opacity: 1 },
                0.1
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Light trail effect
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
            const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#ffffff"];
            for (let i = 0; i < 2; i++) {
                trails.push({
                    x: x + (Math.random() - 0.5) * 8,
                    y: y + (Math.random() - 0.5) * 8,
                    radius: Math.random() * 2.5 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: Math.random() * 1.5 + 0.5
                });
            }
        };

        const handleMouseMove = (e) => addTrail(e.clientX, e.clientY);
        canvas.addEventListener("mousemove", handleMouseMove);

        const render = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            trails.forEach((t, index) => {
                t.life -= 0.015;
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
        setCursorType("play");
    };

    const stopVideo = (e) => {
        e.target.muted = true;
        setGlobalVolume(1.0);
        setCursorType("default");
    };

    return (
        <section
            ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
            className="relative h-screen w-full overflow-hidden bg-transparent"
        >
            {/* Light trail canvas */}
            <canvas
                ref={lightTrailRef}
                className="absolute inset-0 pointer-events-none z-50"
                style={{ mixBlendMode: "screen" }}
            />

            {/* Content container */}
            <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-10 py-10">

                {/* Header */}
                <div ref={titleRef} className="mb-8 border-b border-white/20 pb-4 flex justify-between items-end opacity-0">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white">
                        Energía<span className="text-red-500">.</span>
                    </h2>
                    <span className="font-mono text-xs md:text-sm text-gray-500 text-right">
                        RECUERDOS EN VIVO
                    </span>
                </div>

                {/* Video Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1 opacity-0"
                    style={{ maxHeight: "70vh" }}
                >
                    {content.energy.videos.slice(0, 6).map((videoSrc, index) => (
                        <div
                            key={index}
                            className={`relative group overflow-hidden border border-white/10 bg-gray-900 ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                                }`}
                            onMouseEnter={() => setCursorType("play")}
                            onMouseLeave={() => setCursorType("default")}
                        >
                            <video
                                src={videoSrc}
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                                onMouseEnter={playVideo}
                                onMouseLeave={stopVideo}
                            />

                            {/* Glitch overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="absolute inset-0 bg-red-500/10 mix-blend-screen translate-x-[2px]" />
                                <div className="absolute inset-0 bg-cyan-500/10 mix-blend-screen -translate-x-[2px]" />
                            </div>

                            {/* Audio badge */}
                            <div className="absolute bottom-2 right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                🔊 AUDIO
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EnergySection;
