import { useState, useRef } from 'react';

const VideoCard = ({ src, alt }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm break-inside-avoid mb-4 group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="eye"
    >
      <video
        ref={videoRef}
        src={src}
        loop
        autoPlay
        muted
        playsInline
        className={`w-full object-cover transition-all duration-500 ${isHovered ? 'filter-none scale-105' : 'grayscale brightness-75 contrast-125 scale-100'}`}
      />

      {/* Noise overlay only when not hovered? or always for Brutalist vibe? */}
      {!isHovered && <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>}
    </div>
  );
};

const EnergySection = () => {
  const videos = [
    "/assets/zen1_concierto.mp4",
    "/assets/libido1_concierto.mp4",
    "/assets/zen2_concierto.mp4",
    "/assets/libido2_concierto.mp4",
    "/assets/zen3_concierto.mp4",
    "/assets/libido3_concierto.mp4",
    // Add more from file list if needed
  ];

  return (
    <section className="relative w-full min-h-screen bg-blood-red py-20 px-4 md:px-10">
      <h2 className="text-8xl font-black font-chaos text-black mb-12 tracking-tighter uppercase opacity-80 mix-blend-multiply">
        PURE ENERGY
      </h2>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {videos.map((src, i) => (
          <VideoCard key={i} src={src} />
        ))}
      </div>

      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default EnergySection;
