import { useRef } from "react";
import { motion } from "framer-motion";
import { content } from "../../data/content";
import { useStore } from "../../store/useStore";

const EnergySection = () => {
    const { setCursorType } = useStore();

    return (
        <section className="relative min-h-screen bg-[#0a0a0a] py-20 px-4 md:px-10">

            {/* Header Industrial */}
            <div className="mb-16 border-b border-white/20 pb-4 flex justify-between items-end">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
                    Energy<span className="text-red-600">.</span>
                </h2>
                <span className="font-mono text-xs md:text-sm text-gray-500 text-right">
                    ZEN // LIBIDO <br /> LIVE MEMORIES
                </span>
            </div>

            {/* Grid Asimétrico (Masonry Fake) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[400px]">
                {content.energy.videos.map((videoSrc, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative group overflow-hidden border border-white/10 bg-gray-900 ${index === 0 ? "md:col-span-2" : ""
                            } ${index === 3 ? "md:row-span-2 h-full" : ""}`}
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        {/* Capa de Ruido (Grain) */}
                        <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                        {/* Video */}
                        <video
                            src={videoSrc}
                            muted
                            loop
                            className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                            onMouseOver={e => e.target.play()}
                            onMouseOut={e => e.target.pause()}
                        />

                        {/* Overlay de Texto */}
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <p className="font-mono text-xs text-neon-blue">REC_00{index + 1}.mp4</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default EnergySection;
