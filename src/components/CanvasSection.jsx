import { useEffect, useRef, useState } from 'react';

const CanvasSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    // Set canvas size
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      // Fill with coating initially (to be scratched off)
      // Or in this prompt: "Paint on top to reveal date hidden in background?"
      // Prompt says: "Mancha la web con pintura... revelando la fecha"
      // So we paint OFF the "white bone" background to transparent? Or paint ON color?
      // "Mientras el usuario mueve el mouse... mancha la web con pintura azul y roja... revelando la fecha"
      // Interpretation: The date is text on the bg. We are painting strokes that are semi-transparent or blend mode?
      // Or simple scratch card: Cover is White, we scratch to reveal Video/Date underneath?
      // Let's go with: Date is on base layer. Canvas is transparent on top. We draw strokes of Red/Blue paint.
      // Wait, "revelando la fecha" implies the date was hidden.
      // So: Top layer is Opaque White/Bone. Mouse erases (scratches) to reveal Date & Video underneath.

      ctx.fillStyle = '#F5F5F0'; // White bone
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const draw = (e) => {
      // Setup for "erasing" or "painting"
      // Let's do "Painting" that uses composite operation to "erase" the top layer?
      // "destination-out" makes it transparent.

      const { x, y } = getPos(e);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, Math.PI * 2);
      ctx.fill();

      // Optional: Draw splatters of color on edges of the stroke for style?
      // For now, simple reveal is safest.
    };

    const onMouseMove = (e) => {
      draw(e);
    };

    canvas.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-paper overflow-hidden flex items-center justify-center">

      {/* Hidden Content (Revealed by painting/scratching) */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <video
          src="/assets/pintura_manos.mp4"
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <h2 className="relative z-10 text-[10vw] font-bold font-editorial text-black/80 mix-blend-multiply text-center">
          17.03.2025
        </h2>
      </div>

      {/* Canvas Layer (The "Paper" to interact with) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 cursor-crosshair"
      />

      <div className="absolute bottom-10 left-10 z-20 pointer-events-none text-black/50 font-mono">
        Mueve el cursor para revelar
      </div>

    </section>
  );
};

export default CanvasSection;
