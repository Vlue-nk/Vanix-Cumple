import { useRef } from "react";
import { content } from "../../data/content";

const GazeSection = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-vania-black overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 z-0 opacity-50">
                <video
                    src={content.gaze.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="relative z-10 text-center mix-blend-difference">
                {content.gaze.phrases.map((phrase, index) => (
                    <h2 key={index} className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter uppercase">
                        {phrase}
                    </h2>
                ))}
            </div>
        </section>
    );
};

export default GazeSection;
