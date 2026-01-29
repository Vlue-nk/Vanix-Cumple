import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EndSection = () => {
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        const words = text.innerText.split("");
        text.innerText = "";

        words.forEach(char => {
            const span = document.createElement("span");
            span.innerText = char;
            span.style.opacity = 0;
            text.appendChild(span);
        });

        const spanElements = text.querySelectorAll("span");

        gsap.to(spanElements, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
            },
            opacity: 1,
            stagger: 0.05,
            duration: 0.1,
            ease: "none"
        });

    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/bebidas.webp"
                    alt="Cheers"
                    className="w-full h-full object-cover blur-sm brightness-50"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Letter Content */}
            <div className="relative z-10 max-w-2xl px-8 text-center bg-black/20 backdrop-blur-md p-10 rounded-xl border border-white/10 shadow-2xl">
                <p
                    ref={textRef}
                    className="font-mono text-xl md:text-3xl text-white-off leading-relaxed tracking-wide"
                >
                    A pesar de la distancia, siempre estamos en la misma sintonía. Felices 19, amor. - Kevin
                </p>
            </div>

            {/* Footer / Outro Doodle */}
            <div className="absolute bottom-20 flex gap-4 opacity-80 mix-blend-screen">
                <img src="/assets/snoopy_perfil.webp" alt="Snoopy" className="w-16 h-16 object-contain transform -scale-x-100" />
                <img src="/assets/cooky_stand.webp" alt="Cooky" className="w-16 h-16 object-contain" />
            </div>

            <footer className="absolute bottom-4 text-xs text-white/30 font-sans">
                THE VANIAVERSE · 19
            </footer>

        </section>
    );
};

export default EndSection;
