import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS } from "../../store/useStore";
import useZoneDetector from "../../hooks/useZoneDetector";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const zoneRef = useZoneDetector('hero');
  const containerRef = useRef(null);
  const textLeftRef = useRef(null);
  const photoRightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(textLeftRef.current, { y: -300, ease: "none" }, 0);
      tl.to(photoRightRef.current, { y: -80, ease: "none" }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el) => { containerRef.current = el; zoneRef.current = el; }}
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 grid grid-cols-2">

        {/* LEFT - Text */}
        <div
          ref={textLeftRef}
          className="flex flex-col justify-center pl-8 md:pl-16 z-20"
        >
          <div className="overflow-hidden">
            <motion.h1
              className="text-[14vw] md:text-[11vw] font-display font-black leading-[0.85] tracking-tighter"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: COLORS.offWhite,
                mixBlendMode: "difference",
                marginLeft: "-0.03em",
              }}
            >
              NUESTRO
            </motion.h1>
          </div>

          <div className="overflow-hidden mt-[-0.15em]">
            <motion.h1
              className="text-[18vw] md:text-[15vw] font-display font-black leading-[0.8] tracking-tighter italic"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "transparent",
                WebkitTextStroke: `2px ${COLORS.cream}`,
                mixBlendMode: "difference",
                marginLeft: "-0.05em",
              }}
            >
              PACTO
            </motion.h1>
          </div>

          <motion.p
            className="mt-10 text-sm md:text-base font-serif italic max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ color: COLORS.burntOrange }}
          >
            Cap. 01 — El Inicio
          </motion.p>
        </div>

        {/* RIGHT - Photo */}
        <div className="flex items-center justify-center relative">
          <motion.div
            ref={photoRightRef}
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div
                className="relative w-[260px] md:w-[340px] aspect-[3/5] overflow-hidden shadow-2xl"
                style={{ boxShadow: `0 30px 60px -20px rgba(0,0,0,0.6)` }}
              >
                <img
                  src={content.hero.image}
                  alt="Nosotros"
                  className="w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${COLORS.burntOrange}20 0%, transparent 40%)`
                  }}
                />

                <div
                  className="absolute inset-2 pointer-events-none"
                  style={{ border: `1px solid ${COLORS.cream}30` }}
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.3em] font-mono"
                style={{ color: `${COLORS.cream}60` }}
              >
                Áreas Verdes
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.3em] font-mono"
          style={{ color: `${COLORS.steelBlue}80` }}
        >
          ↓ Scroll
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
