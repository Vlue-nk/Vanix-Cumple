import { useRef, useEffect } from "react";
import gsap from "gsap";
import { content } from "../../data/content";

const OutroSection = () => {
    const stripRef = useRef(null);

    // Animación: Scroll Horizontal Infinito (Lento y Nostálgico)
    useEffect(() => {
        gsap.to(stripRef.current, {
            x: "-50%",
            duration: 40, // Muy lento, para apreciar los recuerdos
            ease: "linear",
            repeat: -1,
        });
    }, []);

    return (
        <div className="relative bg-black text-white">

            {/* --- PARTE 1: FILM STRIP (Random Memories) --- */}
            <section className="py-24 border-t border-white/10 overflow-hidden">
                <h3 className="text-center text-xs font-mono text-gray-500 mb-8 uppercase tracking-[0.3em]">
                    Random Files · Core Memories
                </h3>

                {/* Film Strip Container */}
                <div className="relative w-full rotate-2 scale-105 bg-black py-4 border-y-4 border-dashed border-gray-800">
                    <div ref={stripRef} className="flex gap-8 w-max px-4">
                        {/* Duplicamos para loop infinito */}
                        {[...content.outro.memories, ...content.outro.memories].map((src, i) => (
                            <div key={i} className="relative w-64 aspect-[9/16] bg-gray-900 rounded-sm overflow-hidden border-x-8 border-black shadow-lg grayscale hover:grayscale-0 transition-all duration-500">
                                <video
                                    src={src}
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover opacity-80 hover:opacity-100"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PARTE 2: THE END (Dedicatoria) --- */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Fondo borroso (Bebidas) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={content.end.finalImage}
                        alt="Cheers"
                        className="w-full h-full object-cover opacity-40 blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                </div>

                <div className="relative z-10 max-w-2xl px-8 text-center">
                    <p className="text-2xl md:text-3xl font-light italic text-white leading-relaxed mb-10 font-serif">
                        "{content.end.dedication}"
                    </p>

                    <div className="w-16 h-[1px] bg-white/50 mx-auto mb-10"></div>

                    {/* Ilustración Final (Snoopy & Cooky) */}
                    <div className="flex justify-center items-end gap-4 opacity-80">
                        <img src={content.multiverse.cooky} alt="Cooky" className="h-16 object-contain" />
                        <img src={content.preloader.snoopy} alt="Snoopy" className="h-14 object-contain scale-x-[-1]" /> {/* Snoopy mirando a Cooky */}
                    </div>

                    <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest">
                        Made with ❤️ for Vania's 19th
                    </p>
                </div>
            </section>
        </div>
    );
};

export default OutroSection;
