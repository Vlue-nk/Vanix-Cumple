import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        tl.to(textRef.current, { y: -200, opacity: 0.5 }, 0);
        tl.to(imageRef.current, { scale: 1.1, filter: "grayscale(100%)" }, 0);
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-vania-black">
            {/* Background Image con Filtro Duotone (CSS) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/40 to-neon-orange/40 mix-blend-multiply z-10" />
                <img
                    ref={imageRef}
                    src={content.hero.image}
                    alt="Committed"
                    className="h-full w-full object-cover grayscale contrast-125"
                />
            </div>

            {/* Glass Title */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div
                    ref={textRef}
                    className="backdrop-blur-md bg-white/5 border border-white/10 p-10 rounded-3xl"
                >
                    <h1 className="text-[10vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-display leading-none">
                        {content.hero.title}
                    </h1>

                    {/* Detalle Cooky (Decorativo) */}
                    <div className="absolute -top-10 -right-5 animate-bounce">
                        <span className="text-4xl">🐰</span> {/* Placeholder para Cooky Icon */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
