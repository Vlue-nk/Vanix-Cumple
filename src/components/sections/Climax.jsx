import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const Climax = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const photoRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Parallax del Texto de Fondo (Se mueve más lento que el scroll)
            gsap.to(textRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // 2. Revelación majestuosa de la foto
            gsap.fromTo(photoRef.current,
                { scale: 0.8, opacity: 0, y: 100 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%", // Empieza cuando el top de la sección está al 70% del viewport
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full bg-vania-gray overflow-hidden flex items-center justify-center py-20"
        >
            {/* BACKGROUND TYPOGRAPHY (Teleprompter Effect) */}
            <div
                ref={textRef}
                className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none select-none z-0"
            >
                {content.climax.bgText.map((line, i) => (
                    <h1
                        key={i}
                        className="text-[8vw] md:text-[6vw] font-black leading-[0.9] text-center whitespace-nowrap text-outline font-display uppercase"
                    >
                        {line}
                    </h1>
                ))}
            </div>

            {/* MAIN PHOTO FRAME */}
            <div className="relative z-10 p-4 md:p-8 border-t border-b border-white/20 bg-black/20 backdrop-blur-sm">
                <div
                    ref={photoRef}
                    className="relative w-[300px] md:w-[400px] aspect-[9/16] overflow-hidden shadow-2xl shadow-neon-blue/20"
                >
                    {/* Marco decorativo */}
                    <div className="absolute inset-0 border border-white/50 z-20 m-2"></div>

                    <img
                        src={content.climax.mainPhoto}
                        alt="The One"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Date stamp detail */}
                <div className="absolute -bottom-10 right-0 text-xs font-mono text-neon-blue tracking-widest">
                    V.19 // FOREVER
                </div>
            </div>
        </section>
    );
};

export default Climax;
