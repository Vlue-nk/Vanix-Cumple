import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DualitySection = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- Water Ripple Setup on Canvas (Right Side) ---
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let ripples = [];

    const resize = () => {
      width = canvas.width = leftRef.current.offsetWidth // Using half width roughly
      height = canvas.height = canvas.offsetHeight;
    };
    // Simple resize for now, real implementation needs debouncer
    resize();

    // Animation Loop for Ripples
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // Draw generic rain effect
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ripples.forEach((r, i) => {
        r.r += 0.5;
        r.a -= 0.01;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 200, 255, ${r.a})`;
        ctx.stroke();
        if (r.a <= 0) ripples.splice(i, 1);
      });
      // Add random ripples
      if (Math.random() > 0.9) {
        ripples.push({ x: Math.random() * width, y: Math.random() * height, r: 0, a: 0.5 });
      }
      requestAnimationFrame(animate);
    };
    animate();

    // --- GSAP Split Scroll ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Parallax Opposite Direction
    tl.to(leftRef.current, { yPercent: 10, ease: "none" }, 0);
    tl.to(rightRef.current, { yPercent: -10, ease: "none" }, 0);

    // Floating elements
    gsap.to(".floater-him", {
      y: 20, rotation: 2, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut"
    });
    gsap.to(".floater-def", {
      y: -20, rotation: -2, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut"
    });

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] flex overflow-hidden">

      {/* Left Polarity: HIM (Gothic/Purple) */}
      <div ref={leftRef} className="w-1/2 bg-[#1a051d] relative flex flex-col items-center justify-center p-10 z-10">
        <div className="absolute inset-0 bg-[url('/assets/lluvia_foto1.webp')] bg-cover opacity-10 mix-blend-overlay"></div>
        <h2 className="text-[5vw] font-serif text-pastel-lilac mb-10 tracking-widest text-stroke opacity-80">HIM</h2>

        <div className="floater-him relative w-[80%] aspect-[3/4] border border-white/10 p-2 bg-white/5 backdrop-blur-sm shadow-2xl skew-y-2 group">
          <img src="/assets/cama_foto.webp" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Gothic" />
          <div className="absolute -bottom-10 -left-10 font-chaos text-xs text-blood-red opacity-0 group-hover:opacity-100 transition-opacity">
            VIOLET DREAM
          </div>
        </div>
      </div>

      {/* Right Polarity: Deftones (Blue/Water) */}
      <div ref={rightRef} className="w-1/2 bg-[#05101a] relative flex flex-col items-center justify-center p-10 z-10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />

        <h2 className="text-[5vw] font-serif text-sky-300 mb-10 tracking-widest text-stroke opacity-80">DEFTONES</h2>

        <div className="floater-def relative w-[70%] aspect-video border border-sky-500/20 p-1 bg-sky-900/10 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,255,0.2)] -skew-y-2 group">
          <video src="/assets/nocheparque_sentados.mp4" autoPlay muted loop className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Center Divider Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent z-20"></div>

    </section>
  );
};

export default DualitySection;
