import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "../../store/useStore";
import useZoneDetector from "../../hooks/useZoneDetector";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const DualitySection = () => {
    const zoneRef = useZoneDetector('rain');
    const containerRef = useRef(null);
    const rainCanvasRef = useRef(null);
    const photo1Ref = useRef(null);
    const photo2Ref = useRef(null);
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);
    const textRef = useRef(null);

    // GSAP Pinning
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                }
            });

            // Photos float in from edges and gather in center
            tl.fromTo(photo1Ref.current,
                { x: -200, y: -100, rotate: -15, opacity: 0 },
                { x: 0, y: 0, rotate: -6, opacity: 1 },
                0
            );
            tl.fromTo(photo2Ref.current,
                { x: 200, y: 50, rotate: 20, opacity: 0 },
                { x: 0, y: 0, rotate: 8, opacity: 1 },
                0.1
            );
            tl.fromTo(video1Ref.current,
                { x: -150, y: 150, rotate: 10, opacity: 0 },
                { x: 0, y: 0, rotate: 3, opacity: 1 },
                0.2
            );
            tl.fromTo(video2Ref.current,
                { x: 150, y: -50, rotate: -10, opacity: 0 },
                { x: 0, y: 0, rotate: -5, opacity: 1 },
                0.3
            );

            // Text fades in
            tl.fromTo(textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1 },
                0.5
            );

            // Then photos separate
            tl.to(photo1Ref.current, { x: -80, y: -30 }, 0.7);
            tl.to(photo2Ref.current, { x: 80, y: 30 }, 0.7);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Rain particles
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

        const drops = [];
        for (let i = 0; i < 120; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 15 + 8,
                speed: Math.random() * 6 + 3,
                opacity: Math.random() * 0.25 + 0.08
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drops.forEach(drop => {
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x + 0.5, drop.y + drop.length);
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
            ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
            className="relative h-screen w-full overflow-hidden bg-transparent"
        >
            {/* Rain */}
            <canvas
                ref={rainCanvasRef}
                className="absolute inset-0 pointer-events-none z-30"
                style={{ opacity: 0.5 }}
            />

            {/* Moodboard Container */}
            <div className="absolute inset-0 flex items-center justify-center">

                {/* Photo 1 */}
                <div ref={photo1Ref} className="absolute top-[15%] left-[10%] w-40 md:w-56 opacity-0">
                    <div className="rotate-[-6deg] hover:rotate-0 transition-all duration-500">
                        <img
                            src={content.duality.rainImages?.[0]}
                            alt="Rain"
                            className="w-full aspect-[3/4] object-cover rounded-sm shadow-2xl border border-white/10"
                        />
                    </div>
                </div>

                {/* Photo 2 */}
                <div ref={photo2Ref} className="absolute top-[20%] right-[12%] w-36 md:w-48 opacity-0">
                    <div className="rotate-[8deg] hover:rotate-0 transition-all duration-500">
                        <img
                            src={content.duality.rainImages?.[1]}
                            alt="Rain 2"
                            className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl border border-white/10"
                        />
                    </div>
                </div>

                {/* Video 1 - Biblioteca */}
                <div ref={video1Ref} className="absolute bottom-[25%] left-[18%] w-48 md:w-64 opacity-0">
                    <div className="rotate-[3deg] hover:rotate-0 transition-all duration-500">
                        <video
                            src="/assets/biblioteca_filtro.mp4"
                            autoPlay muted loop playsInline
                            className="w-full aspect-[9/16] object-cover rounded-sm shadow-2xl border border-white/10"
                        />
                    </div>
                </div>

                {/* Video 2 - Muñecos */}
                <div ref={video2Ref} className="absolute bottom-[20%] right-[15%] w-40 md:w-52 opacity-0">
                    <div className="hover:scale-105 transition-all duration-500">
                        <video
                            src="/assets/muñecos_snoopy.mp4"
                            autoPlay muted loop playsInline
                            className="w-full aspect-square object-cover rounded-lg shadow-2xl border-4 border-white/20"
                        />
                    </div>
                </div>

                {/* Text */}
                <div ref={textRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-20 opacity-0">
                    <h2 className="text-5xl md:text-7xl font-display font-light text-white/50 tracking-[0.3em] uppercase">
                        Lluvia
                    </h2>
                    <p className="mt-4 text-gray-500 font-serif italic text-lg">
                        Melancolía confortable
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DualitySection;
