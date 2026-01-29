import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "../../data/content";

const DualitySection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // Parallax leve
    const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">

            {/* --- LADO A: HIM (GOTHIC ROMANCE) --- */}
            {/* Usamos clip-path para cortar la pantalla en diagonal */}
            <div
                className="absolute inset-0 z-10 bg-[#1a0524] flex items-center justify-center overflow-hidden"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            >
                <div className="absolute inset-0 opacity-40 mix-blend-screen">
                    <video src={content.duality.himVideo} autoPlay muted loop className="w-full h-full object-cover grayscale brightness-50" />
                </div>

                <motion.div style={{ y: y1 }} className="relative z-20 text-center">
                    <img
                        src={content.duality.himImage}
                        alt="HIM Era"
                        className="w-64 h-80 object-cover border-4 border-[#4B0082] shadow-[0_0_30px_rgba(75,0,130,0.6)] rotate-[-6deg]"
                    />
                    <h2 className="text-6xl font-display text-white mt-4 tracking-tighter opacity-80 mix-blend-overlay">HIM</h2>
                </motion.div>
            </div>

            {/* --- LADO B: DEFTONES (DIGITAL BATH) --- */}
            <div className="absolute inset-0 z-0 bg-[#001f3f] flex items-center justify-center overflow-hidden">
                {/* Fondo de lluvia */}
                <div className="absolute inset-0 opacity-50">
                    <video src={content.duality.rainVideo} autoPlay muted loop className="w-full h-full object-cover opacity-60" />
                </div>

                <motion.div style={{ y: y2 }} className="relative z-20 translate-x-20 translate-y-20 flex flex-col items-end">
                    <div className="flex gap-4 mb-4">
                        {content.duality.rainImages.map((img, i) => (
                            <img key={i} src={img} alt="Rain" className="w-40 h-56 object-cover border border-cyan-900 opacity-80" />
                        ))}
                    </div>
                    <h2 className="text-6xl font-display text-cyan-200 tracking-widest uppercase opacity-80 blur-[1px]">Deftones</h2>
                </motion.div>
            </div>

            {/* Línea divisoria decorativa */}
            <div className="absolute inset-0 pointer-events-none z-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.2" strokeDasharray="5,5" />
                </svg>
            </div>

        </section>
    );
};

export default DualitySection;
