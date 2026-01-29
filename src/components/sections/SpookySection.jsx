import { content } from "../../data/content";

const SpookySection = () => {
    return (
        <section className="relative min-h-screen bg-vania-black overflow-hidden flex flex-col justify-center py-20">
            {/* Glitch Title */}
            <h2 className="text-6xl md:text-9xl font-display font-bold text-transparent text-outline text-center mb-10 z-10 animate-pulse">
                SPOOKY SZN
            </h2>

            {/* Taxi Image (Sin City Style) */}
            <div className="relative w-full max-w-4xl mx-auto aspect-video mb-20 z-10 grayscale hover:grayscale-0 transition-all duration-500">
                <img
                    src={content.spooky.taxiImage}
                    alt="Spooky Taxi"
                    className="w-full h-full object-cover rounded-lg shadow-2xl shadow-red-900/50"
                />
                <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Marquee Videos */}
            <div className="relative w-full -rotate-3 bg-red-900/20 border-y border-red-500/50 py-10 overflow-hidden">
                <div className="flex gap-4 animate-marquee whitespace-nowrap">
                    {/* Duplicate for infinite loop */}
                    {[...content.spooky.marqueeVideos, ...content.spooky.marqueeVideos].map((videoSrc, i) => (
                        <div key={i} className="w-[300px] aspect-[9/16] inline-block rounded-md overflow-hidden border border-red-500/30 bg-black">
                            <video
                                src={videoSrc}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover opacity-70"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS for Marquee - inline for simplicity or added to index.css */}
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default SpookySection;
