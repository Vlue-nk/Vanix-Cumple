import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "../../store/useStore";
import { content } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { setCurrentTrack, setCurrentTheme } = useStore();
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);
  const dustCanvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setCurrentTrack(content.hero.audio);
    setCurrentTheme(content.hero.theme);
  }, [setCurrentTrack, setCurrentTheme]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dust particles
  useEffect(() => {
    const canvas = dustCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP Pinning
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

      // Text parallax
      tl.to(textRef.current, { y: -100, opacity: 0.3 }, 0);
      // Photo scales and moves
      tl.to(photoRef.current, { y: -50, scale: 1.1 }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Calculate parallax offsets (mirror effect - moves opposite)
  const photoOffsetX = (mousePos.x - 0.5) * -40;
  const photoOffsetY = (mousePos.y - 0.5) * -30;
  const textOffsetX = (mousePos.x - 0.5) * 15;
  const textOffsetY = (mousePos.y - 0.5) * 10;

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Breathing gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #e94560 100%)",
            "linear-gradient(135deg, #0f3460 0%, #e94560 30%, #1a1a2e 70%, #16213e 100%)",
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #e94560 100%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dust particles */}
      <canvas
        ref={dustCanvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Giant glass typography */}
      <motion.div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none overflow-hidden"
        style={{
          transform: `translate(${textOffsetX}px, ${textOffsetY}px)`
        }}
      >
        <h1
          className="text-[18vw] md:text-[22vw] font-display font-black leading-[0.85] text-center tracking-tighter select-none"
          style={{
            color: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            textShadow: "0 0 80px rgba(233, 69, 96, 0.3)"
          }}
        >
          COMPROMETIDOS
        </h1>
      </motion.div>

      {/* Floating photo with mouse parallax */}
      <motion.div
        ref={photoRef}
        className="relative z-30"
        style={{
          transform: `translate(${photoOffsetX}px, ${photoOffsetY}px)`
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Geometric frame */}
        <div className="absolute -inset-4 border border-white/20 rotate-3" />
        <div className="absolute -inset-8 border border-white/10 -rotate-2" />

        <div className="relative w-[280px] md:w-[380px] aspect-[3/4] shadow-2xl overflow-hidden">
          <img
            src={content.hero.image}
            alt="Nosotros"
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Caption */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-sm md:text-base font-serif italic text-white/60 tracking-wide">
            Cap. 01 — El Inicio
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <p className="text-xs text-white/40 uppercase tracking-[0.3em] font-mono">
          Scroll para recordar
        </p>
      </motion.div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </section>
  );
};

export default Hero;
